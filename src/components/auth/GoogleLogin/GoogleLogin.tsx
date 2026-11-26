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

/** Sign in on the site: Google or Telegram (through the AgroSoft bot). */
const GoogleLogin = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { setUser } = useMyContext();
  const buttonRef = useRef<HTMLDivElement>(null);
  const [scriptReady, setScriptReady] = useState(false);
  const [loading, setLoading] = useState(false);

  const [tgWaiting, setTgWaiting] = useState(false);
  const tgTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  // data: the API envelope {success, data: {token, user}}
  const finish = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (data: any) => {
      setUser(data);
      localStorage.setItem("userToken", data.data.token);
      localStorage.setItem("userData", JSON.stringify(data));
      setCookie(null, "userToken", data.data.token, { maxAge: 30 * 24 * 60 * 60, path: "/" });
      const back = typeof router.query.back === "string" && router.query.back.startsWith("/") ? router.query.back : "/";
      router.push(back);
    },
    [router, setUser]
  );

  useEffect(() => () => {
    if (tgTimer.current) clearInterval(tgTimer.current);
  }, []);

  // Telegram: one-time bot link (t.me/<bot>?start=auth_...), then poll until the user presses Start.
  const onTelegram = async () => {
    const tab = window.open("about:blank", "_blank");
    try {
      const { data } = await request(`/auth/telegram/start`, "POST", JSON.stringify({}), {});
      const { token, url, expires_in } = data.data as { token: string; url: string; expires_in: number };
      if (tab) tab.location.href = url;
      else window.location.href = url;
      setTgWaiting(true);
      const until = Date.now() + expires_in * 1000;
      if (tgTimer.current) clearInterval(tgTimer.current);
      tgTimer.current = setInterval(async () => {
        try {
          const res = await request(`/auth/telegram/check`, "POST", JSON.stringify({ token }), {});
          const status = res.data?.data?.status;
          if (status === "ok") {
            clearInterval(tgTimer.current!);
            finish(res.data);
          } else if (status === "expired" || Date.now() > until) {
            clearInterval(tgTimer.current!);
            setTgWaiting(false);
            toast.error(t("auth.telegram_expired"));
          }
        } catch {
          // network hiccup: keep polling
        }
      }, 2500);
    } catch (error) {
      tab?.close();
      toast.error(error instanceof ApiError || error instanceof Error ? error.message : t("messages.unexpected_error"));
    }
  };

  const onCredential = useCallback(
    async ({ credential }: { credential: string }) => {
      setLoading(true);
      try {
        const { data } = await request(`/auth/google`, "POST", JSON.stringify({ credential }), {});
        finish(data);
      } catch (error) {
        toast.error(error instanceof ApiError || error instanceof Error ? error.message : t("messages.unexpected_error"));
        setLoading(false);
      }
    },
    [finish, t]
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

      <div className={styles.or}>
        <span>{t("auth.or")}</span>
      </div>
      <button type="button" className={styles.telegram_button} onClick={onTelegram} aria-busy={tgWaiting}>
        <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
          <path fill="currentColor" d="M9.04 15.47 8.9 19.4c.41 0 .59-.18.8-.39l1.93-1.84 4 2.93c.73.4 1.25.19 1.45-.68l2.63-12.33c.24-1.08-.39-1.5-1.1-1.24L3.17 9.6c-1.05.41-1.03 1-.18 1.26l3.95 1.23 9.17-5.78c.43-.28.83-.13.5.16z" />
        </svg>
        {t("auth.telegram_btn")}
      </button>
      {tgWaiting ? <p className={styles.google_note}>{t("auth.telegram_wait")}</p> : null}

      <p className={styles.google_note}>{t("auth.google_terms")}</p>
    </div>
  );
};

export default GoogleLogin;
