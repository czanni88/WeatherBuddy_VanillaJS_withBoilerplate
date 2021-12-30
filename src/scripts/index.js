//Standalone runtime for Regenerator-compiled generator and async functions.
import regeneratorRuntime from "regenerator-runtime";
import "../styles/main.scss";
import {
  handleSearch,
  handleLocalStorage,
  addItem,
  clearList,
  handleSuggestions,
} from "./functions";

const searchForm = document.querySelector(".searchForm");
const addItems = document.querySelector(".itemsListContainer");
const clearButton = document.querySelector(".clearButton");
const suggestionButton = document.querySelector(".suggestionButton");

searchForm.addEventListener("submit", handleSearch);
addItems.addEventListener("submit", addItem);
clearButton.addEventListener("click", clearList);
suggestionButton.addEventListener("click", handleSuggestions);

const savedData = JSON.parse(localStorage.getItem("data"));
const savedItems = JSON.parse(localStorage.getItem("items"));
if (savedData && savedItems) {
  handleLocalStorage(savedData, savedItems);
} else if (savedData) {
  handleLocalStorage(savedData);
}
