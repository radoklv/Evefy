import Form from "@/components/form/form";
import styles from "./page.module.css";

export default async function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Form />
      </main>
    </div>
  );
}
