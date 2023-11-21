"use client";

import React, { useState, ChangeEvent } from "react";
import styles from "./search.module.css";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { useRouter } from "next/navigation";

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

  const handleSearch = (suggestion: string) => {
    const encoded = encodeURIComponent(suggestion);
    router.push(`/player/${encoded}`);
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

    return (
      <div
        style={style}
        className={styles.suggestions_item}
        onClick={() => handleSuggestionClick(suggestion)}
        onMouseDown={(e) => e.preventDefault()}
      >
        {suggestion}
      </div>
    );
  };

  return (
    <div
      className={styles.search_container}
      style={{ width: suggestions && "50%" }}
      onBlur={() => setFilteredSuggestions([])}
    >
      <input
        className={styles.text_field}
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
