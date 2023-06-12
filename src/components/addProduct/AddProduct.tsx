import React, { useState } from "react";
import FilterSelect from "../filterSelect/FilterSelect";
import { questionTypes } from "@/data/interfaces";

import styles from "./addproduct.module.scss";

import AddIcon from "@mui/icons-material/Add";

const AddProduct = ({
  state,
  setState,
}: {
  state: questionTypes;
  setState: (v: questionTypes) => void;
}) => {
  const [item, setItem] = useState<string>("bir");
  const [check, setCheck] = useState<number>(1);

  const data: string[] = ["bir", "ikki", "uch"];

  return (
    <div className={styles.add_product}>
      <h3 className={styles.main_title}>Mahsulot qo’shish</h3>
      <div className={styles.checkbox_wrapper}>
        <div
          className={styles.checkbox}
          data-check={check == 1}
          onClick={() => setCheck(1)}
        >
          <span className={styles.circle}></span>
          <p className={styles.text}>Sotish</p>
        </div>
        <div
          className={styles.checkbox}
          data-check={check == 2}
          onClick={() => setCheck(2)}
        >
          <span className={styles.circle}></span>
          <p className={styles.text}>Sotib olish</p>
        </div>
      </div>

      <div className={styles.about}>
        <h3 className={styles.title}>Mahsulot haqida</h3>
        <input
          type="text"
          className={styles.input}
          placeholder="Write your product name"
        />
        <textarea className={styles.textarea} placeholder="Description" />

        <div className={styles.input_wrapper}>
          <input type="number" placeholder="Narx" className={styles.price} />
          <FilterSelect item={item} setItem={setItem} strData={data} />
        </div>

        <button type="button" className={styles.add_file}>
          <AddIcon />
          Rasm qo’shish
        </button>
      </div>

      <div className={styles.category}>
        <h3 className={styles.title}>Kategoriya</h3>
        <FilterSelect item={item} setItem={setItem} strData={data} mb />
      </div>

      <div className={styles.price}>
        <h3 className={styles.title}>Narx</h3>
        <div className={styles.input_wrapper}>
          <input type="number" placeholder="Min price" />
          <input type="number" placeholder="Max price" />
        </div>
        <div className={styles.checkbox_wrapper}>
          <input type="checkbox" id="price" name="price" />
          <label htmlFor="price">Price is negotiable</label>
        </div>
      </div>

      <div className={styles.weight}>
        <h3 className={styles.title}>Weight (KG)</h3>
        <div className={styles.input_wrapper}>
          <input type="number" placeholder="Min weight" />
          <input type="number" placeholder="Max weight" />
        </div>
      </div>

      <div className={styles.location}>
        <h3 className={styles.title}>Location</h3>

        <div className={styles.input_wrapper}>
          <FilterSelect item={item} setItem={setItem} strData={data} />
          <FilterSelect item={item} setItem={setItem} strData={data} />
        </div>
      </div>

      <div className={styles.input_wrapper}>
        <button type="button">Tasdiqlash</button>
        <button
          type="button"
          className={styles.cancel_button}
          onClick={() => setState({ ...state, active: false })}
        >
          Bekor qilish
        </button>
      </div>

      <p className={styles.agree_text}>
        By confirming, I agree to the <span>Terms and conditions</span>
      </p>
    </div>
  );
};

export default AddProduct;
