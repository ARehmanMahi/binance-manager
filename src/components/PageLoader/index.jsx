import styles from "./PageLoader.module.css";

const PageLoader = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.loader}>Loading</h1>
    </div>
  );
};

export default PageLoader;
