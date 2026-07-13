"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { request } from "@/lib/request";
import { toast } from "react-toastify";
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
  const [fname, setFName] = useState<string>();
  const [lname, setLName] = useState<string>();
  const [phone, setPhone] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [image, setImage] = useState<File | undefined | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);

  useEffect(() => {
    setFName(user?.data.user.firstname ? user.data.user.firstname : "");
    setLName(user?.data.user.lastname ? user.data.user.lastname : "");
    setPhone(user?.data.user.phone ? user.data.user.phone : "");
    setEmail(user?.data.user.email ? user.data.user.email : "");
  }, [user]);

  async function updateInfo() {
    const formData = new FormData();
    formData.append("firstname", fname || "");
    formData.append("lastname", lname || "");
    formData.append("phone", phone || "");
    if (image) {
      formData.append("photo", image);
    }

    const userToken = localStorage.getItem("userToken");

    try {
      const response = await fetch(`/api/users/update`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
        body: formData,
      });

      setIsLoading(false);

      if (response.ok) {
        setImage(null);
        toast.success("Foydalanuvchi ma'lumotlari yangilandi.");
      } else {
        toast.error(`Error status: ${response.status}`);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("Failed to update profile");
      console.error("Error:", error);
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    updateInfo();
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
                : user?.data.user.photo
                ? `url(${user.data.user.photo})`
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
          <label>{t("account.personal_info.firstname")}</label>
          <input
            name="firstname"
            value={fname}
            onChange={(e) => setFName(e.target.value)}
            type="text"
            placeholder="Shoxrux"
          />
        </div>
        <div className={styles.input_label}>
          <label>{t("account.personal_info.lastname")}</label>
          <input
            name="lastname"
            value={lname}
            onChange={(e) => setLName(e.target.value)}
            type="text"
            placeholder="Raxmatov"
          />
        </div>
        <div className={styles.input_label}>
          <label>{t("account.personal_info.phone")}</label>
          <input
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="phone"
            placeholder="+99890 000 00 00"
          />
        </div>
        <div className={styles.input_label}>
          <label>{t("account.personal_info.email")}</label>
          <input
            name="email"
            value={email}
            type="email"
            placeholder="mygmail@gmail.com"
            disabled
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
