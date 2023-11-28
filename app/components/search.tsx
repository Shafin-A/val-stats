"use client";

import React, { useState, ChangeEvent } from "react";
import styles from "./search.module.css";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { useRouter } from "next/navigation";
import { getPlayerAccount } from "../../apis/api";
import { Card, TextInput } from "@tremor/react";
import { PlayerGameNameClient } from "./playerGameNameClient";
import { PlayerTagLineClient } from "./playerTaglineClient";
import SearchIcon from "../../assets/search.svg";

interface SearchProps {
  suggestions?: string[];
}

const Search = ({ suggestions }: SearchProps) => {
  const router = useRouter();

  const [inputValue, setInputValue] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState(
    [] as string[]
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (suggestions) {
      if (value === "") {
        setFilteredSuggestions([]);
      } else {
        const filtered = suggestions.filter((suggestion) =>
          suggestion.toLowerCase().includes(value.toLowerCase())
        );

        setFilteredSuggestions(filtered);
      }
    }
  };

  const handleSearch = async (suggestion: string) => {
    const playerNameTag = suggestion.split("#");
    const playerAccount = await getPlayerAccount(
      playerNameTag[0],
      playerNameTag[1]
    );
    const encoded = encodeURIComponent(suggestion);
    router.push(`/player/${encoded}/${playerAccount.puuid}`);
  };

  const handleSuggestionClick = (suggestion: string): void => {
    handleSearch(suggestion);
  };

  // Render a single suggestion item
  const RenderSuggestion = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const suggestion = filteredSuggestions[index];

    const splitSuggestion = suggestion.split("#");

    const gameName = splitSuggestion[0];
    const tagLine = splitSuggestion[1];

    return (
      <div
        style={style}
        className={styles.suggestions_item}
        onClick={() => handleSuggestionClick(suggestion)}
        onMouseDown={(e) => e.preventDefault()}
      >
        <PlayerGameNameClient gameName={gameName} />{" "}
        <PlayerTagLineClient tagLine={tagLine} />
      </div>
    );
  };

  return (
    <div
      className={styles.search_container}
      onBlur={() => setFilteredSuggestions([])}
    >
      <TextInput
        icon={SearchIcon}
        type="text"
        placeholder="Search for a name#tag..."
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={(e) => e.key === "Enter" && handleSearch(inputValue)}
      />
      {filteredSuggestions.length > 0 && (
        <div
          className={styles.suggestions_container + " " + styles.custom_scroll}
        >
          <AutoSizer>
            {({ height, width }) => (
              <List
                className={styles.suggestions_list}
                height={height}
                width={width}
                itemCount={filteredSuggestions.length}
                itemSize={40}
              >
                {RenderSuggestion}
              </List>
            )}
          </AutoSizer>
        </div>
      )}
    </div>
  );
};

export default Search;
