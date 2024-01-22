"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { request } from "@/lib/request";
import { toast } from "react-toastify";
import { imageUpload } from "@/utils/helperFunctions";
import { useRouter } from "next/router";
import { useMyContext } from "@/hooks/useMyContext";

import styles from "../../profile.module.scss";

import defaultImg from "@/assets/images/default_image.png";
import LogoutModal from "@/components/logoutModal/LogoutModal";

const PersonalInfo = () => {
  const { setUser, user } = useMyContext();
  const { t } = useTranslation("common");
  const router = useRouter();

  //states ======================
  const [fname, setFName] = useState<string>("");
  const [lname, setLName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [image, setImage] = useState<File | undefined | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);

  useEffect(() => {
    setFName(user?.data.firstname ? user.data.firstname : "");
    setLName(user?.data.lastname ? user.data.lastname : "");
    setPhone(user?.data.phone ? user.data.phone : "");
    setEmail(user?.data.email ? user.data.email : "");
  }, [user]);

  async function updateInfo(mainId: number) {
    let body: {
      firstname: string;
      lastname: string;
      photo_file_id: number;
      phone: string;
      email: string;
    } = {
      firstname: fname,
      lastname: lname,
      photo_file_id: mainId,
      phone,
      email,
    };

    const { response, data } = await request(
      `/users/update`,
      "PUT",
      JSON.stringify(body),
      false,
      router.locale,
      {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      }
    );

    if (response.status === 200) {
      setImage(null);
      setIsLoading(false);
      toast.success("Foydalanuvchi ma'lumotlari yangilandi.");
      setUser(data);
    } else {
      setIsLoading(false);
      toast.error(`Error status: ${response.status}`);
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (image) {
      setIsLoading(true);
      await imageUpload(image).then((mainId) => updateInfo(mainId));
    } else {
      setIsLoading(true);
      if (user) {
        updateInfo(user.data.photo_id);
      }
    }
  }

  //helper functions==============================================================

  function handleSetImage(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files.length > 0) {
      setImage(event.target.files[0]);
    }
  }

  return (
    <div className={styles.content}>
      <h3 className={styles.title}>{t("account.personal_info.title")}</h3>

      <div className={styles.image_container}>
        <label className={styles.image_label} htmlFor="imageUpload">
          <div
            className={styles.account_image}
            style={{
              backgroundImage: image
                ? `url(${URL.createObjectURL(image)})`
                : user?.data.photo
                ? `url(${user.data.photo})`
                : `url(${defaultImg.src})`,
            }}
          ></div>
          <p>{t("buttons.add_img")}</p>
        </label>
        <input
          id="imageUpload"
          accept="image/png, image/gif, image/jpeg"
          type="file"
          onChange={(e) => handleSetImage(e)}
        />
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.input_label}>
          <label>{t("main_topics.default_name")}</label>
          <input
            name="name"
            value={fname}
            onChange={(e) => setFName(e.target.value)}
            type="text"
            placeholder="Raxmatov Shoxrux"
          />
        </div>
        <div className={styles.input_label}>
          <label>{t("main_topics.default_name")}</label>
          <input
            name="name"
            value={lname}
            onChange={(e) => setLName(e.target.value)}
            type="text"
            placeholder="Raxmatov Shoxrux"
          />
        </div>
        <div className={styles.input_label}>
          <label>{t("account.personal_info.phone")}</label>
          <input
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="phone"
            placeholder="+99897 888 99 33"
          />
        </div>
        <div className={styles.input_label}>
          <label>{t("account.personal_info.email")}</label>
          <input
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="mygmail@gmail.com"
          />
        </div>

        {isLoading ? (
          <div className={styles.button_wrapper}>
            <button type="button" className={styles.load_btn}>
              {t("buttons.save_changes")}
            </button>
            <button
              type="button"
              className={`${styles.cancel_button} ${styles.load_btn}`}
            >
              {t("buttons.cancel")}
            </button>
          </div>
        ) : (
          <div className={styles.button_wrapper}>
            <div className={styles.two_buttons}>
              <button type="submit">{t("buttons.save_changes")}</button>
              <button type="button" className={styles.cancel_button}>
                {t("buttons.cancel")}
              </button>
            </div>
            <LogoutModal isOpen={isShowModal} setIsOpen={setIsShowModal} />
          </div>
        )}
      </form>
    </div>
  );
};

export default PersonalInfo;
