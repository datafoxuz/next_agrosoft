import React, { FormEvent, useState } from "react";
import { useTranslation } from "next-i18next";
import SEO from "@/layouts/seo/seo";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { request } from "@/lib/request";
import { toast } from "react-toastify";
import { imageUpload } from "@/utils/helperFunctions";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const SNavbar = dynamic(() => import("@/components/secondNavbar/SecondNavbar"))
const FilterSelect = dynamic(() => import("@/components/filterSelect/FilterSelect"))

import styles from "./add.module.scss";
import AddIcon from "@mui/icons-material/Add";

const AddProduct = () => {
  const { t } = useTranslation("common");
  const router = useRouter();

  ///states=================================================
  const [item, setItem] = useState<string>("bir");
  const [category, setCategory] = useState<number>(1);
  const [name, setName] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [lowPrice, setLowPrice] = useState<string>("");
  const [highPrice, setHighPrice] = useState<string>("");
  const [lowWeight, setLowWeight] = useState<string>("");
  const [highWeight, setHighWeight] = useState<string>("");
  const [isNegotiable, setIsNegotiable] = useState<boolean>(false);
  const [image, setImage] = useState<File | null | undefined>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dataSc: string[] = ["bir", "ikki", "uch"];

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

  const addProduct = async (mainId: number) => {
    let body: {
      name: string;
      description: string;
      price: string;
      low_price: string;
      high_price: string;
      low_amount: string;
      high_amount: string;
      is_negotiable: boolean;
      main_image_id: number;
    } = {
      name,
      description: desc,
      price,
      low_price: lowPrice,
      high_price: highPrice,
      low_amount: lowWeight,
      high_amount: highWeight,
      is_negotiable: isNegotiable,
      main_image_id: mainId,
    };
    const userToken = localStorage.getItem("userToken");

    const { response } = await request(
      `/marketplace/create-product`,
      "POST",
      JSON.stringify(body),
      false,
      router.locale,
      {
        Authorization: `Bearer ${userToken}`,
      }
    );

    if (response.status == 200) {
      handleClearInputs();
      toast.success("Savol yaratildi!");
    } else {
      setIsLoading(false);
      toast.error(`Error status: ${response.status}`);
    }
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (image) {
      setIsLoading(true);
      await imageUpload(image).then((id) => addProduct(id));
    }
  }

  //helper functions

  function handleBack() {
    router.push("/market");
    handleClearInputs();
  }

  const handleSetImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setImage(file);
    }

    console.log(event.target.files && event.target.files.length > 0);
  };

  function handleClearInputs() {
    setName("");
    setDesc("");
    setImage(null);
    setPrice("");
    setLowPrice("");
    setHighPrice("");
    setLowWeight("");
    setHighWeight("");
    setIsNegotiable(false);
    setIsLoading(false);
  }

  return (
    <SEO metaTitle={`${t("buttons.add_product")} - AgroSoft`}>
      <SNavbar siteWay={siteWay} title={`${t("main_topics.market")}`} />
      <div className={styles.add_product}>
        <h3 className={styles.main_title}>{t("add_product.title")}</h3>
        <div className={styles.checkbox_wrapper}>
          <div
            className={styles.checkbox}
            data-check={category == 1}
            onClick={() => setCategory(1)}
          >
            <span className={styles.circle}></span>
            <p className={styles.text}>{t("add_product.sell")}</p>
          </div>
          <div
            className={styles.checkbox}
            data-check={category == 2}
            onClick={() => setCategory(2)}
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

            <div className={styles.input_wrapper}>
              <input
                type="number"
                placeholder={`${t("second_navbar.filter.price")}`}
                name="price"
                className={styles.price}
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <FilterSelect item={item} setItem={setItem} strData={dataSc} />
            </div>

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
            <FilterSelect item={item} setItem={setItem} strData={[""]} mb />
          </div>

          <div className={styles.price}>
            <h3 className={styles.title}>{t("second_navbar.filter.price")}</h3>
            <div className={styles.input_wrapper}>
              <input
                type="number"
                placeholder={`${t("second_navbar.filter.min_price")}`}
                name="price"
                required
                value={lowPrice}
                onChange={(e) => setLowPrice(e.target.value)}
              />
              <input
                type="number"
                placeholder={`${t("second_navbar.filter.max_price")}`}
                name="price"
                required
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
              {t("second_navbar.filter.weight")} (KG)
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
                placeholder={`${`${t("second_navbar.filter.max_price")}`}`}
                name="weight"
                required
                value={highWeight}
                onChange={(e) => setHighWeight(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.location}>
            <h3 className={styles.title}>{`${t(
              "second_navbar.filter.location"
            )}`}</h3>

            <div className={styles.input_wrapper}>
              <FilterSelect item={item} setItem={setItem} strData={[""]} />
              <FilterSelect item={item} setItem={setItem} strData={[""]} />
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
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default AddProduct;
