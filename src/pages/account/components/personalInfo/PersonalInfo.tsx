import React, { FormEvent, useState } from "react";
import { useTranslation } from "next-i18next";
import { request } from "@/lib/request";
import { toast } from "react-toastify";
import { imageUpload } from "@/utils/helperFunctions";
import { useRouter } from "next/router";
import { useMyContext } from "@/hooks/useMyContext";

import styles from "../../profile.module.scss";

import defaultImg from "@/assets/images/default_image.png";

const PersonalInfo = () => {
  const {setUser, user} = useMyContext();
  const { t } = useTranslation("common");
  const router = useRouter();

  //states ======================
  const [fname, setFName] = useState<string>(
    user?.data.firstname ? user.data.firstname : ""
  );
  const [lname, setLName] = useState<string>(
    user?.data.lastname ? user.data.lastname : ""
  );
  const [phone, setPhone] = useState<string>(
    user?.data.phone ? user.data.phone : ""
  );
  const [email, setEmail] = useState<string>(
    user?.data.email ? user.data.email : ""
  );
  const [image, setImage] = useState<File | undefined | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
      {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      }
    );

    if (response.status === 200) {
      setImage(null);
      setIsLoading(false);
      toast.success("Foydalanuvchi ma'lumotlari yangilandi.");
      setUser(data)
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
    }else{
      setIsLoading(true);
      if(user){
        updateInfo(user.data.photo_id)
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
        <label className={styles.image_label} htmlFor="imageUpload">
          {t("buttons.add_img")}
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
            <button type="button" className={styles.load_btn}>{t("buttons.save_changes")}</button>
            <button type="button" className={`${styles.cancel_button} ${styles.load_btn}`}>
              {t("buttons.cancel")}
            </button>
          </div>
        ) : (
          <div className={styles.button_wrapper}>
            <button type="submit">{t("buttons.save_changes")}</button>
            <button type="button" className={styles.cancel_button}>
              {t("buttons.cancel")}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default PersonalInfo;
