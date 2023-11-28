import ValorantLogo from "../../assets/valorant.svg";
import styles from "./navbar.module.css";
import { SearchBar } from "./searchBar";

export const NavBar = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.logoContainer}>
        <a href="/search">
          <ValorantLogo className={styles.logo} />
        </a>
      </div>
      <div className={styles.search_container}>
        <SearchBar />
      </div>
    </nav>
  );
};
