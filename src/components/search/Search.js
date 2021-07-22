import React, { useState } from "react";
import "./search.css";

function Search({ setResult }) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setResult(query);
  };

  return (
    <div className="search">
      <form onSubmit={handleSubmit} autoComplete="off" className="search__form">
        <input
          type="text"
          placeholder="Поиск"
          className="search__input"
          value={query}
          onChange={handleChange}
        />
        <button className="search__button">Найти</button>
      </form>
    </div>
  );
}

export default Search;
