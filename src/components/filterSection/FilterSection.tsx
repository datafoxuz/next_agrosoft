import React, { useState } from "react";
import FilterSelect from "../filterSelect/FilterSelect";

import styles from "./filtersection.module.scss";

import ClearIcon from "@mui/icons-material/Clear";

const FilterSection = ({ active = false }: { active?: boolean }) => {
  const [item, setItem] = useState<string>("bir");

  const data = ["bir", "ikki", "uch"];

  return (
    <div className={styles.filter_section} data-type={active}>
      <div className={styles.section}>
        <div className={styles.wrapper}>
          <h3 className={styles.title}>Kategoriya</h3>
          <FilterSelect item={item} setItem={setItem} data={data} />
        </div>
        <div className={styles.wrapper}>
          <h3 className={styles.title}>Location</h3>
          <div className={styles.selects}>
            <FilterSelect item={item} setItem={setItem} data={data} />
            <FilterSelect item={item} setItem={setItem} data={data} />
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.wrapper}>
          <h3 className={styles.title}>Narx</h3>
          <div className={styles.inputs}>
            <input
              type="number"
              placeholder="Min price"
              className={styles.input}
            />
            <input
              type="number"
              placeholder="Max price"
              className={styles.input}
            />
          </div>
        </div>
        <div className={styles.wrapper}>
          <h3 className={styles.title}>Weight (Kg)</h3>
          <div className={styles.inputs}>
            <input
              type="number"
              placeholder="Min weight"
              className={styles.input}
            />
            <input
              type="number"
              placeholder="Max weight"
              className={styles.input}
            />
          </div>
        </div>
      </div>

      <div className={styles.checkbox_wrapper}>
        <input type="checkbox" id="price" name="price" />
        <label htmlFor="price">Price is negotiable</label>
      </div>

      <button type="button" className={styles.clear_button}>
        <ClearIcon className={styles.icon} /> Filterlarni tozalash
      </button>

      <div className={styles.buttons}>
        <button type="button">Filterni qo’llash</button>
        <button type="button" className={styles.cancel_button}>
          Bekor qilish
        </button>
      </div>
    </div>
  );
};

export default FilterSection;
