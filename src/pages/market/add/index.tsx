import React, { FormEvent, useEffect, useState } from "react";
import { baseUrl } from "@/data";
import { useTranslation } from "next-i18next";
import SEO from "@/layouts/seo/seo";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const SNavbar = dynamic(() => import("@/components/secondNavbar/SecondNavbar"))

import styles from "./add.module.scss";
import AddIcon from "@mui/icons-material/Add";

type Option = { id: number; name: string };

const AddProduct = ({
  categories,
  units,
  countries,
}: {
  categories: Option[];
  units: Option[];
  countries: Option[];
}) => {
  const { t } = useTranslation("common");
  const router = useRouter();

  ///states=================================================
  const [typeId, setTypeId] = useState<number>(1); // 1 = sell, 2 = buy
  const [categoryId, setCategoryId] = useState<string>("");
  const [unitId, setUnitId] = useState<string>(units[0] ? String(units[0].id) : "1");
  const [name, setName] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [lowPrice, setLowPrice] = useState<string>("");
  const [highPrice, setHighPrice] = useState<string>("");
  const [lowWeight, setLowWeight] = useState<string>("");
  const [highWeight, setHighWeight] = useState<string>("");
  const [isNegotiable, setIsNegotiable] = useState<boolean>(false);
  const [image, setImage] = useState<File | null | undefined>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [countryId, setCountryId] = useState<string>(countries[0] ? String(countries[0].id) : "");
  const [regions, setRegions] = useState<Option[]>([]);
  const [regionId, setRegionId] = useState<string>("");

  // Load regions of the selected country.
  useEffect(() => {
    if (!countryId) return;
    setRegionId("");
    fetch(`${baseUrl}/data/${countryId}/regions`, { headers: { "Accept-Language": router.locale || "uz" } })
      .then((r) => r.json())
      .then((j) => setRegions(j?.data?.regions ?? []))
      .catch(() => setRegions([]));
  }, [countryId, router.locale]);

  const siteWay = [
    {
      title: t("main_topics.main_page"),
      url: "/",
    },
    {
      title: t("main_topics.market"),
      url: "/market",
    },
    {
      title: t("buttons.add_product"),
      url: router.pathname,
    },
  ];

  const addProduct = async (image: File) => {
    const userToken = localStorage.getItem("userToken");
    if (!userToken) {
      router.push("/login");
      return;
    }
    const auth = { Authorization: `Bearer ${userToken}`, Accept: "application/json" };

    try {
      // 1) upload the main image
      const fileData = new FormData();
      fileData.append("file", image);
      const up = await fetch(`${baseUrl}/file/upload`, { method: "POST", headers: auth, body: fileData });
      const upJson = await up.json().catch(() => null);
      const imageId = upJson?.data?.file?.id;
      if (!up.ok || !imageId) throw new Error(upJson?.error?.message || `Upload error ${up.status}`);

      // 2) create the product (goes to moderation)
      const body = {
        name,
        description: desc,
        low_price: isNegotiable ? null : Number(lowPrice),
        high_price: isNegotiable ? null : Number(highPrice || lowPrice),
        low_amount: Number(lowWeight),
        high_amount: Number(highWeight || lowWeight),
        is_negotiable: isNegotiable ? 1 : 0,
        amount_type_id: unitId,
        category_id: Number(categoryId),
        country_id: Number(countryId),
        region_id: Number(regionId),
        type_id: typeId,
        main_image_id: imageId,
        image_list: [imageId],
      };
      const res = await fetch(`${baseUrl}/marketplace/create-product`, {
        method: "POST",
        headers: { ...auth, "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json().catch(() => null);
      if (!res.ok || json?.success === false) throw new Error(json?.error?.message || `Error ${res.status}`);

      handleClearInputs();
      toast.success(typeof json?.data === "string" ? json.data : t("add_product.title"));
    } catch (error) {
      setIsLoading(false);
      toast.error(error instanceof Error ? error.message : "Failed to add product");
    }
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const pricesOk = isNegotiable || (lowPrice && highPrice);
    if (!image) {
      toast.error(t("buttons.set_main_img"));
      return;
    }
    if (name && desc && pricesOk && lowWeight && highWeight && categoryId && countryId && regionId) {
      setIsLoading(true);
      await addProduct(image);
    }
  }

  //helper functions

  function handleBack() {
    router.push("/market");
    handleClearInputs();
  }

  const handleSetImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setImage(event.target.files[0]);
    }
  };

  function handleClearInputs() {
    setName("");
    setDesc("");
    setImage(null);
    setLowPrice("");
    setHighPrice("");
    setLowWeight("");
    setHighWeight("");
    setIsNegotiable(false);
    setIsLoading(false);
  }

  return (
    <SEO metaTitle={`${t("buttons.add_product")} - AgroSoft`} noindex>
      <SNavbar siteWay={siteWay} title={`${t("main_topics.market")}`} />
      <div className={styles.add_product}>
        <h3 className={styles.main_title}>{t("add_product.title")}</h3>
        <div className={styles.checkbox_wrapper}>
          <div
            className={styles.checkbox}
            data-check={typeId == 1}
            onClick={() => setTypeId(1)}
          >
            <span className={styles.circle}></span>
            <p className={styles.text}>{t("add_product.sell")}</p>
          </div>
          <div
            className={styles.checkbox}
            data-check={typeId == 2}
            onClick={() => setTypeId(2)}
          >
            <span className={styles.circle}></span>
            <p className={styles.text}>{t("add_product.buy")}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.about}>
            <h3 className={styles.title}>{t("add_product.about_product")}</h3>
            <input
              type="text"
              name="name"
              className={styles.input}
              placeholder={`${t("add_product.product_name")}`}
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <textarea
              className={styles.textarea}
              placeholder={`${t("add_product.about_product")}`}
              name="description"
              required
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />


            {image ? (
              <div className={styles.label}>
                <div className={styles.add_file} onClick={() => setImage(null)}>
                  <AddIcon className={styles.icon} />
                  {image.name.length > 20
                    ? `${image.name.slice(0, 20)}...`
                    : image.name}
                </div>
              </div>
            ) : (
              <label htmlFor="image" className={styles.label} data-err={!image}>
                <div className={styles.add_file}>
                  <AddIcon />
                  {t("buttons.set_main_img")}
                </div>
              </label>
            )}

            <input
              onChange={(e) => handleSetImage(e)}
              id="image"
              accept="image/png, image/gif, image/jpeg"
              type="file"
              className={styles.file_input}
              defaultValue=""
            />
          </div>

          <div className={styles.category}>
            <h3 className={styles.title}>
              {t("second_navbar.filter.category")}
            </h3>
            <select
              className={styles.input}
              required
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option value="" disabled>
                {t("second_navbar.filter.category")}
              </option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.price}>
            <h3 className={styles.title}>{t("second_navbar.filter.price")}</h3>
            <div className={styles.input_wrapper}>
              <input
                type="number"
                placeholder={`${t("second_navbar.filter.min_price")}`}
                name="low_price"
                required={!isNegotiable}
                disabled={isNegotiable}
                value={lowPrice}
                onChange={(e) => setLowPrice(e.target.value)}
              />
              <input
                type="number"
                placeholder={`${t("second_navbar.filter.max_price")}`}
                name="high_price"
                required={!isNegotiable}
                disabled={isNegotiable}
                value={highPrice}
                onChange={(e) => setHighPrice(e.target.value)}
              />
            </div>
            <div className={styles.checkbox_wrapper}>
              <input
                type="checkbox"
                id="price"
                name="price"
                checked={isNegotiable}
                onChange={(e) => setIsNegotiable(e.target.checked)}
              />
              <label htmlFor="price">
                {t("second_navbar.filter.price_is_negotiable")}
              </label>
            </div>
          </div>

          <div className={styles.weight}>
            <h3 className={styles.title}>
              {t("second_navbar.filter.weight")}
            </h3>
            <div className={styles.input_wrapper}>
              <input
                type="number"
                placeholder={`${t("second_navbar.filter.min_weight")}`}
                name="weight"
                required
                value={lowWeight}
                onChange={(e) => setLowWeight(e.target.value)}
              />
              <input
                type="number"
                placeholder={`${t("second_navbar.filter.max_weight")}`}
                name="weight"
                required
                value={highWeight}
                onChange={(e) => setHighWeight(e.target.value)}
              />
              <select
                className={styles.input}
                value={unitId}
                onChange={(e) => setUnitId(e.target.value)}
                aria-label={`${t("second_navbar.filter.weight")}`}
              >
                {units.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.location}>
            <h3 className={styles.title}>{`${t(
              "second_navbar.filter.location"
            )}`}</h3>

            <div className={styles.input_wrapper}>
              <select
                className={styles.input}
                required
                value={countryId}
                onChange={(e) => setCountryId(e.target.value)}
              >
                {countries.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <select
                className={styles.input}
                required
                value={regionId}
                onChange={(e) => setRegionId(e.target.value)}
              >
                <option value="" disabled>
                  {t("second_navbar.filter.location")}
                </option>
                {regions.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.input_wrapper}>
            {isLoading ? (
              <>
                <button type="button" className={styles.load_btn}>
                  {`${t("buttons.confirm")}`}
                </button>
                <button
                  type="button"
                  className={`${styles.cancel_button} ${styles.load_btn}`}
                >
                  {`${t("buttons.cancel")}`}
                </button>
              </>
            ) : (
              <>
                <button type="submit">{`${t("buttons.confirm")}`}</button>
                <button
                  type="button"
                  className={styles.cancel_button}
                  onClick={() => handleBack()}
                >
                  {`${t("buttons.cancel")}`}
                </button>
              </>
            )}
          </div>
        </form>

        <p className={styles.agree_text}>{t("add_product.confirm_text")}</p>
      </div>
    </SEO>
  );
};

export async function getServerSideProps({ locale }: { locale: string }) {
  const headers = { "Accept-Language": locale, Accept: "application/json" };
  const get = (url: string) =>
    fetch(url, { headers }).then((r) => r.json()).catch(() => null);

  const [cats, countriesRes, unitsRes] = await Promise.all([
    get(`${baseUrl}/marketplace/categories?perPage=100`),
    get(`${baseUrl}/data/countries`),
    get("https://api.agrosoft.uz/units.json"),
  ]);

  return {
    props: {
      categories: (cats?.data?.categories ?? []).map(
        (c: { id: number; title?: string; name?: string }) => ({ id: c.id, name: c.title ?? c.name ?? "" })
      ),
      countries: countriesRes?.data?.countries ?? [],
      units: Array.isArray(unitsRes) ? unitsRes : [{ id: 1, name: "kg" }],
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default AddProduct;
