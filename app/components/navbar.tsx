"use client";

import { useState } from "react";
import ValorantLogo from "../../assets/valorant.svg";
import SearchIcon from "../../assets/search.svg";
import styles from "./navbar.module.css";
import Search from "./search";

export const NavBar = () => {
  const [isSearchVisible, setSearchVisible] = useState(false);

  const handleSearchClick = () => {
    setSearchVisible(!isSearchVisible);
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.logoContainer}>
        <a href="/search">
          <ValorantLogo className={styles.logo} />
        </a>
      </div>
      <div>
        <div
          className={
            isSearchVisible
              ? styles.searchIconContainerSearchVisible
              : styles.searchIconContainer
          }
          onClick={handleSearchClick}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearchClick();
          }}
          tabIndex={0}
        >
          <SearchIcon
            className={
              isSearchVisible
                ? styles.searchIconSearchVisible
                : styles.searchIcon
            }
          />
        </div>
        <div
          className={
            isSearchVisible
              ? styles.searchComponentVisible
              : styles.searchComponent
          }
        >
          {isSearchVisible && <Search />}
        </div>
      </div>
    </nav>
  );
};
