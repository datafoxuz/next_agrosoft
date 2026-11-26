import React, { useCallback, useEffect, useRef, useState } from "react";
import Script from "next/script";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { setCookie } from "nookies";
import { toast } from "react-toastify";

import { request, ApiError } from "@/lib/request";
import { useMyContext } from "@/hooks/useMyContext";
import styles from "../auth.module.scss";

/** OAuth client (Web application) from Google Cloud Console; the button is hidden without it. */
export const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "221659603103-tq8o71k5ep5m5e1u84j4emd0guarc0k1.apps.googleusercontent.com"; // Firebase project agrosoftuz, Web client

type GoogleId = {
  initialize: (o: { client_id: string; callback: (r: { credential: string }) => void; ux_mode?: string }) => void;
  renderButton: (el: HTMLElement, o: Record<string, unknown>) => void;
};
declare global {
  interface Window {
    google?: { accounts: { id: GoogleId } };
  }
}

/** The only way to sign in on the site: "Sign in with Google". */
const GoogleLogin = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { setUser } = useMyContext();
  const buttonRef = useRef<HTMLDivElement>(null);
  const [scriptReady, setScriptReady] = useState(false);
  const [loading, setLoading] = useState(false);

  const onCredential = useCallback(
    async ({ credential }: { credential: string }) => {
      setLoading(true);
      try {
        const { data } = await request(`/auth/google`, "POST", JSON.stringify({ credential }), {});
        setUser(data);
        localStorage.setItem("userToken", data.data.token);
        localStorage.setItem("userData", JSON.stringify(data));
        setCookie(null, "userToken", data.data.token, { maxAge: 30 * 24 * 60 * 60, path: "/" });
        const back = typeof router.query.back === "string" && router.query.back.startsWith("/") ? router.query.back : "/";
        router.push(back);
      } catch (error) {
        toast.error(error instanceof ApiError || error instanceof Error ? error.message : t("messages.unexpected_error"));
        setLoading(false);
      }
    },
    [router, setUser, t]
  );

  useEffect(() => {
    if (!scriptReady || !GOOGLE_CLIENT_ID || !buttonRef.current || !window.google) return;
    window.google.accounts.id.initialize({ client_id: GOOGLE_CLIENT_ID, callback: onCredential });
    buttonRef.current.innerHTML = "";
    window.google.accounts.id.renderButton(buttonRef.current, {
      theme: "outline",
      size: "large",
      shape: "pill",
      text: "continue_with",
      width: 300,
      locale: router.locale || "uz",
    });
  }, [scriptReady, onCredential, router.locale]);

  return (
    <div className={styles.modal}>
      <h3 className={styles.title}>{t("auth.login")}</h3>
      <p className={styles.google_text}>{t("auth.google_text")}</p>

      {GOOGLE_CLIENT_ID ? (
        <>
          <Script src="https://accounts.google.com/gsi/client" strategy="afterInteractive" onReady={() => setScriptReady(true)} />
          <div className={styles.google_button} aria-busy={loading}>
            <div ref={buttonRef} />
          </div>
          {loading ? <p className={styles.google_note}>{t("auth.google_wait")}</p> : null}
        </>
      ) : (
        <p className={styles.google_note}>{t("auth.google_unavailable")}</p>
      )}

      <p className={styles.google_note}>{t("auth.google_terms")}</p>
    </div>
  );
};

export default GoogleLogin;
