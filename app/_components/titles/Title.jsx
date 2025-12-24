import styles from "./titles.module.scss";

export function Title({ margin, text }) {
  return (
    <div className={styles.title} style={{ margin: margin }}>
      {text}
    </div>
  );
}
