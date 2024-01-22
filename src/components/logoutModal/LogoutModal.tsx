import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import styles from "./logoutmodal.module.scss";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { destroyCookie } from "nookies";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/router";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: "4px",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  border: "1px solid #DFEDEB",
  p: "48px",
};

export default function LogoutModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
}) {
  const router = useRouter();
  const { t } = useTranslation("common");
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleLogout = () => {
    localStorage.clear();
    router.push("/");
    window.location.reload();
    destroyCookie({}, "userToken");
  };

  return (
    <div>
      <button
        type="button"
        className={styles.logout_button}
        onClick={handleOpen}
      >
        {/* <Image src={logout.src} width={17} height={17} alt="logout icon" /> */}
        <span>{t("buttons.exit")}</span>
        <LogoutIcon />
      </button>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2 className={styles.main_text}>{t("auth.logout_title")}</h2>

          <div className={styles.button_wrapper}>
            <button
              className={`${styles.button} ${styles.logout_btn}`}
              onClick={() => handleLogout()}
            >
              {t("buttons.exit")}
            </button>
            <button
              className={`${styles.button} ${styles.cancel_btn}`}
              onClick={handleClose}
            >
              {t("buttons.cancel")}
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
