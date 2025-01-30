import styles from "../components/NavBar.module.css";
import "@fontsource/golos-text"; // Defaults to weight 400

export function NavBar() {
  return (
    <div className={styles.outerDiv}>
      <div className={styles.navBar}>
        <div className={styles.logo}>
          <img max-width="176px" max-height="97.81px" src="/homework_logo.svg" alt="logo" />
        </div>
        <div className={styles.menu}>
          <div className={styles.options}>About Us</div>
          <div className={styles.options}>What We Do</div>
          <div className={styles.options}>Get Involved</div>
          <div className={styles.options}>Stay Connected</div>
          <div className={styles.options}>
            <button className={styles.button}>Donate</button>
          </div>
        </div>
      </div>
    </div>
  );
}
