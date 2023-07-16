import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import "./App.css";
import EmojiTable from "./components/EmojiTable";
import { setEmojis } from "./store";
import Header from "./components/Header";

const apiUrl = "https://emojihub.yurace.pro/api/all";
const emojisPerPage = 10;

function App() {
  const dispatch = useDispatch();
  const emojis = useSelector((state) => state.emojis);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    fetchEmojis();
  }, []);

  useEffect(() => {
    const uniqueCategories = [
      ...new Set(emojis.map((emoji) => emoji.category)),
    ];
    setAllCategories(["all", ...uniqueCategories]);
  }, [emojis]);

  useEffect(() => {
    setCurrentPage(1); // Reset to the first page when the search text changes
  }, [searchText]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  useEffect(() => {
    displayEmojis();
  }, [emojis, currentPage, selectedCategory, searchText]);

  async function fetchEmojis() {
    try {
      const response = await axios.get(apiUrl);
      dispatch(setEmojis(response.data));
    } catch (error) {
      console.error("Error fetching emojis:", error);
    }
  }

  function filterEmojis() {
    const selectedEmojis =
      selectedCategory === "all"
        ? emojis
        : emojis.filter((emoji) => emoji.category === selectedCategory);
    return searchText.trim() === ""
      ? selectedEmojis
      : selectedEmojis.filter((emoji) =>
          emoji.name.toLowerCase().includes(searchText.toLowerCase())
        );
  }

  function displayEmojis() {
    const startIndex = (currentPage - 1) * emojisPerPage;
    const endIndex = currentPage * emojisPerPage;
    const filteredEmojis = filterEmojis();

    if (!emojis || emojis.length === 0) {
      return <p>Loading...</p>; // Add a loading indicator when data is being fetched
    }

    return filteredEmojis.slice(startIndex, endIndex);
  }

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  function handlePrevPage() {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  }

  function handleNextPage() {
    const totalEmojis = filterEmojis().length;
    const totalPages = Math.ceil(totalEmojis / emojisPerPage);
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  }

  return (
    <div className="App">
      <Header
        searchText={searchText}
        onSearchTextChange={setSearchText}
        allCategories={allCategories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <main>
        <div className="emoji-container">
          <EmojiTable emojis={displayEmojis()} />
        </div>
        <div className="pagination">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            &laquo; Prev
          </button>
          <button onClick={handleNextPage}>Next &raquo;</button>
        </div>
      </main>
    </div>
  );
}

export default App;
