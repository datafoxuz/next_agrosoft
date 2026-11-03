import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { baseUrl } from "@/data";

import styles from "./filtersection.module.scss";

import ClearIcon from "@mui/icons-material/Clear";

type Option = { id: number; name: string; slug?: string };

const FILTER_KEYS = [
  "region_id",
  "price_min",
  "price_max",
  "weight_min",
  "weight_max",
  "negotiable",
] as const;

function q(v: string | string[] | undefined): string {
  return Array.isArray(v) ? v[0] ?? "" : v ?? "";
}

/** Marketplace filter. Applies filters as query params on /market/{category}. */
const FilterSection = ({ active = false }: { active?: boolean }) => {
  const { t } = useTranslation("common");
  const router = useRouter();

  const [categories, setCategories] = useState<Option[]>([]);
  const [regions, setRegions] = useState<Option[]>([]);

  const [category, setCategory] = useState<string>(q(router.query.product));
  const [regionId, setRegionId] = useState<string>(q(router.query.region_id));
  const [priceMin, setPriceMin] = useState<string>(q(router.query.price_min));
  const [priceMax, setPriceMax] = useState<string>(q(router.query.price_max));
  const [weightMin, setWeightMin] = useState<string>(q(router.query.weight_min));
  const [weightMax, setWeightMax] = useState<string>(q(router.query.weight_max));
  const [negotiable, setNegotiable] = useState<boolean>(
    q(router.query.negotiable) === "1"
  );

  useEffect(() => {
    const headers = { "Accept-Language": router.locale || "uz" };
    fetch(`${baseUrl}/marketplace/categories?perPage=100`, { headers })
      .then((r) => r.json())
      .then((j) =>
        setCategories(
          (j?.data?.categories ?? []).map(
            (c: { id: number; title?: string; name?: string; slug: string }) => ({
              id: c.id,
              name: c.title ?? c.name ?? "",
              slug: c.slug,
            })
          )
        )
      )
      .catch(() => setCategories([]));
    fetch(`${baseUrl}/data/1/regions`, { headers })
      .then((r) => r.json())
      .then((j) => setRegions(j?.data?.regions ?? []))
      .catch(() => setRegions([]));
  }, [router.locale]);

  function apply() {
    const slug = category || q(router.query.product) || categories[0]?.slug;
    if (!slug) return;
    const values: Record<(typeof FILTER_KEYS)[number], string> = {
      region_id: regionId,
      price_min: priceMin,
      price_max: priceMax,
      weight_min: weightMin,
      weight_max: weightMax,
      negotiable: negotiable ? "1" : "",
    };
    const query: Record<string, string> = {};
    FILTER_KEYS.forEach((k) => {
      if (values[k]) query[k] = values[k];
    });
    router.push({ pathname: `/market/${slug}`, query });
  }

  function clear() {
    setRegionId("");
    setPriceMin("");
    setPriceMax("");
    setWeightMin("");
    setWeightMax("");
    setNegotiable(false);
    const slug = q(router.query.product);
    if (slug) router.push(`/market/${slug}`);
  }

  return (
    <div className={styles.filter_section} data-type={active}>
      <div className={styles.section}>
        <div className={styles.wrapper}>
          <h3 className={styles.title}>{t("second_navbar.filter.category")}</h3>
          <div className={styles.inputs}>
            <select
              className={styles.input}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              aria-label={`${t("second_navbar.filter.category")}`}
            >
              <option value="">{t("second_navbar.filter.category")}</option>
              {categories.map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className={styles.wrapper}>
          <h3 className={styles.title}>{t("second_navbar.filter.location")}</h3>
          <div className={styles.inputs}>
            <select
              className={styles.input}
              value={regionId}
              onChange={(e) => setRegionId(e.target.value)}
              aria-label={`${t("second_navbar.filter.location")}`}
            >
              <option value="">{t("second_navbar.filter.location")}</option>
              {regions.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.wrapper}>
          <h3 className={styles.title}>{t("second_navbar.filter.price")}</h3>
          <div className={styles.inputs}>
            <input
              type="number"
              min={0}
              placeholder={`${t("second_navbar.filter.min_price")}`}
              className={styles.input}
              value={priceMin}
              disabled={negotiable}
              onChange={(e) => setPriceMin(e.target.value)}
            />
            <input
              type="number"
              min={0}
              placeholder={`${t("second_navbar.filter.max_price")}`}
              className={styles.input}
              value={priceMax}
              disabled={negotiable}
              onChange={(e) => setPriceMax(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.wrapper}>
          <h3 className={styles.title}>{t("second_navbar.filter.weight")}</h3>
          <div className={styles.inputs}>
            <input
              type="number"
              min={0}
              placeholder={`${t("second_navbar.filter.min_weight")}`}
              className={styles.input}
              value={weightMin}
              onChange={(e) => setWeightMin(e.target.value)}
            />
            <input
              type="number"
              min={0}
              placeholder={`${t("second_navbar.filter.max_weight")}`}
              className={styles.input}
              value={weightMax}
              onChange={(e) => setWeightMax(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className={styles.checkbox_wrapper}>
        <input
          type="checkbox"
          id="filter_negotiable"
          checked={negotiable}
          onChange={(e) => setNegotiable(e.target.checked)}
        />
        <label htmlFor="filter_negotiable">
          {t("second_navbar.filter.price_is_negotiable")}
        </label>
      </div>

      <button type="button" className={styles.clear_button} onClick={clear}>
        <ClearIcon className={styles.icon} /> {t("second_navbar.filter.clear")}
      </button>

      <div className={styles.buttons}>
        <button type="button" onClick={apply}>
          {t("buttons.filter")}
        </button>
        <button type="button" className={styles.cancel_button} onClick={clear}>
          {t("buttons.cancel")}
        </button>
      </div>
    </div>
  );
};

export default FilterSection;
