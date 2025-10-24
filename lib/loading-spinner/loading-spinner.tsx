"use client";
import styles from "./loading-spinner.module.scss";

function LoadingSpinner() {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.loader}></div>
    </div>
  );
}

export default LoadingSpinner;
