import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function Header({
  searchText,
  onSearchTextChange,
  allCategories,
  selectedCategory,
  onCategoryChange,
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header>
      <h1>Emoji List</h1>

      <button className="menu-button menu-icon" onClick={handleMenuToggle}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <div className={`menu-items ${menuOpen ? "open" : ""}`}>
        <div className="search-bar">
          <input
            type="text"
            value={searchText}
            onChange={(e) => onSearchTextChange(e.target.value)}
            placeholder="Search by name..."
          />
        </div>
        <div className="filter">
          <label htmlFor="category">Filter by Category:</label>
          <select
            id="category"
            value={selectedCategory}
            onChange={onCategoryChange}
          >
            {allCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
}

export default Header;
