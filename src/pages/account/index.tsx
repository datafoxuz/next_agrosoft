import { FilterSelect, SNavbar } from "@/components";
import React, { useState } from "react";
import CardsCollection from "@/components/cardsCollection/CardsCollection";
import { cardsForExample } from "@/data";
import SEO from "@/layouts/seo/seo";
import FilterDrawer from "./components/filterDrawer/filterDrawer";
import Image from "next/image";

import styles from "./profile.module.scss";

import defaultImg from "@/assets/images/default_image.png";

const index = () => {
  const [tabId, setTabId] = useState<number>(1);
  const [contentTab, setContentTab] = useState<string>("a");
  const [item, setItem] = useState<string>("bir");

  const data = ["bir", "ikki", "uch"];

  const siteWay = [
    {
      title: "Bosh sahifa",
      url: "/",
    },
    {
      title: "Akkount ma’lumotlari",
      url: "/account",
    },
  ];

  const sidebarLinks = [
    {
      title: "Shaxsiy ma’lumotlar",
      tabId: 1,
    },
    {
      title: "Boshqa ma’lumotlar",
      tabId: 2,
    },
    {
      title: "Saqlanganlar",
      tabId: 3,
    },
    {
      title: "Mahsulotlarim",
      tabId: 4,
    },
  ];

  const contentTabLinks = [
    {
      title: "Ma’qola",
      id: "a",
    },
    {
      title: "Yangiliklar",
      id: "b",
    },
    {
      title: "Agrokasalliklar",
      id: "c",
    },
    {
      title: "Mahsulotlar",
      id: "d",
    },
  ];

  return (
    <SEO metaTitle="Account">
      <div className={styles.profile}>
        <SNavbar siteWay={siteWay} title="Akkount ma’lumotlari" account />

        <div className={styles.profile_wrapper}>
          <div className={styles.sidebar}>
            {sidebarLinks.map((item, index) => (
              <p
                className={styles.item}
                key={index}
                data-active={item.tabId == tabId}
                onClick={() => setTabId(item.tabId)}
              >
                {item.title}
              </p>
            ))}
          </div>

          {tabId == 1 ? (
            <div className={styles.content}>
              <h3 className={styles.title}>Shaxsiy ma’lumotlar</h3>

              <div className={styles.image_container}>
                <div className={styles.account_image}>
                  <Image
                    src={defaultImg.src}
                    alt="default image"
                    className={styles.image}
                    width={84}
                    height={84}
                  />
                </div>
                <label className={styles.image_label} htmlFor="imageUpload">
                  Add photo
                </label>
                <input
                  id="imageUpload"
                  accept="image/png, image/gif, image/jpeg"
                  type="file"
                />
              </div>

              <form className={styles.form}>
                <div className={styles.input_label}>
                  <label>Profession</label>
                  <input type="text" placeholder="Raxmatov Shoxrux" />
                </div>
                <div className={styles.input_label}>
                  <label>Phone</label>
                  <input type="text" placeholder="+99897 888 99 33" />
                </div>
                <div className={styles.input_label}>
                  <label>Email</label>
                  <input type="text" placeholder="mygmail@gmail.com" />
                </div>

                <div className={styles.button_wrapper}>
                  <button type="button">O’zgarishlarni saqlash</button>
                  <button type="button" className={styles.cancel_button}>
                    Bekor qilish
                  </button>
                </div>
              </form>
            </div>
          ) : tabId == 2 ? (
            <div className={styles.content}>
              <h3 className={styles.title}>
                <form className={styles.form}>
                  <div className={styles.input_label}>
                    <label htmlFor="prof">Profession</label>
                    <input type="text" id="prof" placeholder="Agronom" />
                  </div>
                  <div className={styles.input_label}>
                    <label htmlFor="farm">Farms territory (in hectars)</label>
                    <input type="text" id="farm" placeholder="23" />
                  </div>

                  <div className={styles.input_label}>
                    <label htmlFor="farm">Location</label>

                    <div className={styles.selects}>
                      <FilterSelect
                        item={item}
                        setItem={setItem}
                        strData={data}
                      />
                      <FilterSelect
                        item={item}
                        setItem={setItem}
                        strData={data}
                      />
                    </div>
                  </div>

                  <div className={styles.button_wrapper}>
                    <button type="button">O’zgarishlarni saqlash</button>
                    <button type="button" className={styles.cancel_button}>
                      Bekor qilish
                    </button>
                  </div>
                </form>
              </h3>
            </div>
          ) : tabId == 3 ? (
            <div className={styles.content}>
              <div className={styles.content_head}>
                <h3 className={styles.title}>Saqlanganlar</h3>

                <div className={styles.tab_titles}>
                  {contentTabLinks.map((item) => (
                    <h3
                      className={styles.title}
                      key={item.id}
                      data-active={item.id == contentTab}
                      onClick={() => setContentTab(item.id)}
                    >
                      {item.title}
                    </h3>
                  ))}
                </div>

                <FilterDrawer />
              </div>

              {contentTab == "a" ? (
                <CardsCollection data={cardsForExample} account />
              ) : contentTab == "b" ? (
                <p>Cards</p>
              ) : contentTab == "c" ? (
                <CardsCollection data={cardsForExample} account />
              ) : (
                <CardsCollection data={cardsForExample} account />
              )}
            </div>
          ) : tabId == 4 ? (
            <div className={styles.content}>
              <h3 className={styles.title}>Mahsulotlarim</h3>
              <CardsCollection data={cardsForExample} account />
            </div>
          ) : null}
        </div>
      </div>
    </SEO>
  );
};

export default index;
