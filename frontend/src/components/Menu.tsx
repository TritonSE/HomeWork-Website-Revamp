import React from "react";

import styles from "./Menu.module.css"; // Assuming you have a separate CSS file

export function Menu() {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.menu}>
        <li className={styles.menuItem}>
          Item 1
          <ul className={styles.subMenu}>
            <li>Sub-item 1-1</li>
            <li>Sub-item 1-2</li>
            <li>Sub-item 1-3</li>
          </ul>
        </li>
        <li className={styles.menuItem}>Item 2</li>
        <li className={styles.menuItem}>Item 3</li>
      </ul>
    </nav>
  );
}
