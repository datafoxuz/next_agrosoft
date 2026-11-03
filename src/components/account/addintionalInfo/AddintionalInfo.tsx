import React, { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { toast } from "react-toastify";
import { baseUrl } from "@/data";
import { useMyContext } from "@/hooks/useMyContext";
import { fetchMe, updateMe } from "@/lib/userApi";

import styles from "@/pages/account/profile.module.scss";

type Option = { id: number; name: string };

type ProfileUser = {
  profession?: string | null;
  territory?: number | null;
  country_id?: number | null;
  region_id?: number | null;
};

const AddintionalInfo = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { user, setUser } = useMyContext();
  const me = (user?.data?.user ?? {}) as ProfileUser;

  const [profession, setProfession] = useState<string>("");
  const [territory, setTerritory] = useState<string>("");
  const [countryId, setCountryId] = useState<string>("");
  const [regionId, setRegionId] = useState<string>("");
  const [countries, setCountries] = useState<Option[]>([]);
  const [regions, setRegions] = useState<Option[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function resetFromUser() {
    setProfession(me.profession ?? "");
    setTerritory(me.territory != null ? String(me.territory) : "");
    setCountryId(me.country_id ? String(me.country_id) : "");
    setRegionId(me.region_id ? String(me.region_id) : "");
  }

  // Prefill from the logged-in user.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(resetFromUser, [user]);

  useEffect(() => {
    fetch(`${baseUrl}/data/countries`, {
      headers: { "Accept-Language": router.locale || "uz" },
    })
      .then((r) => r.json())
      .then((j) => {
        const list: Option[] = j?.data?.countries ?? [];
        setCountries(list);
        setCountryId((prev) => prev || (list[0] ? String(list[0].id) : ""));
      })
      .catch(() => setCountries([]));
  }, [router.locale]);

  useEffect(() => {
    if (!countryId) return setRegions([]);
    fetch(`${baseUrl}/data/${countryId}/regions`, {
      headers: { "Accept-Language": router.locale || "uz" },
    })
      .then((r) => r.json())
      .then((j) => setRegions(j?.data?.regions ?? []))
      .catch(() => setRegions([]));
  }, [countryId, router.locale]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await updateMe(
        {
          profession: profession.trim() || null,
          territory: territory ? Number(territory) : null,
          country_id: countryId ? Number(countryId) : null,
          region_id: regionId ? Number(regionId) : null,
        },
        router.locale
      );
      setUser(await fetchMe(router.locale));
      toast.success(typeof res?.data === "string" ? res.data : t("buttons.save_changes"));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Error");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={styles.content}>
      <h3 className={styles.title}>{t("account.other_info.title")}</h3>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.input_label}>
          <label htmlFor="prof">{t("account.other_info.profession")}</label>
          <input
            type="text"
            id="prof"
            maxLength={100}
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
          />
        </div>
        <div className={styles.input_label}>
          <label htmlFor="farm">
            {t("account.other_info.farms_territory")}
          </label>
          <input
            type="number"
            id="farm"
            min={0}
            step="0.01"
            value={territory}
            onChange={(e) => setTerritory(e.target.value)}
          />
        </div>

        <div className={styles.input_label}>
          <label htmlFor="country">{t("second_navbar.filter.location")}</label>

          <div className={styles.selects}>
            <select
              id="country"
              value={countryId}
              onChange={(e) => {
                setCountryId(e.target.value);
                setRegionId("");
              }}
            >
              {countries.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <select
              aria-label={`${t("second_navbar.filter.location")}`}
              value={regionId}
              onChange={(e) => setRegionId(e.target.value)}
            >
              <option value="">—</option>
              {regions.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.button_wrapper}>
          <button type="submit" className={isLoading ? styles.load_btn : ""} disabled={isLoading}>
            {t("buttons.save_changes")}
          </button>
          <button type="button" className={styles.cancel_button} onClick={resetFromUser}>
            {t("buttons.cancel")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddintionalInfo;
