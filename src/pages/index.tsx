import styles from "@/styles/home.module.scss";
import SEO from "@/layouts/seo/seo";

export default function Home() {
  return (
    <SEO>
      <div className={styles.main}></div>
    </SEO>
  );
}
