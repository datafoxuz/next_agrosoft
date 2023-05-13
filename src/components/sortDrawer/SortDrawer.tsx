import { SwipeableDrawer } from "@mui/material";
import React, { useContext, useState } from "react";

//style
import styles from "./sortdrawer.module.scss";

import FilterAltIcon from "@mui/icons-material/FilterAlt";

const SortDrawer = () => {
  const [tabId, setTabId] = useState(1);

  //navigate

  const [state, setState] = useState({
    bottom: false,
  });

  const toggleDrawer =
    (anchor: string, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const tabItems = [
    {
      text: "Популярные сейчас",
      index: 1,
      filter: "popular",
    },
    {
      text: "Новинки",
      index: 2,
      filter: "new",
    },
    {
      text: "Самые скачиваемые",
      index: 3,
      filter: "downloaded",
    },
    {
      text: "Набирающие популярносить",
      index: 4,
      filter: "growing",
    },
  ];

  return (
    <div className={styles.burger_Pmenu}>
      <React.Fragment key={"bottom"}>
        <button onClick={toggleDrawer("bottom", true)}>
          <FilterAltIcon className={styles.icon} />
        </button>
        <SwipeableDrawer
          anchor={"bottom"}
          open={state["bottom"]}
          onClose={toggleDrawer("bottom", false)}
          onOpen={toggleDrawer("bottom", true)}
        >
          <div className={styles.sort_drawer}>
            <h3 className={styles.title}>Saralash</h3>
            <div className={styles.sort_items}>
              {tabItems.map((item, index) => (
                <p
                  className={`${styles.item} ${
                    tabId === item.index ? styles.item_active : ``
                  } `}
                >
                  {item.text}
                </p>
              ))}
            </div>
            <div className="top-line"></div>
          </div>
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
};

export default SortDrawer;
