//Standalone runtime for Regenerator-compiled generator and async functions.
import regeneratorRuntime from 'regenerator-runtime';
import '../styles/main.scss';
import { handleSearch, handleNewSearch, handleLocalStorage, handleItemsList } from './functions';

const form = document.querySelector('.searchForm');
const clear = document.querySelector('.weatherHeadline');
const itemsListForm = document.querySelector(".itemsListForm");

form.addEventListener('submit', handleSearch); // Fetch file
clear.addEventListener('click', handleNewSearch); // Function file
itemsListForm.addEventListener("click", handleItemsList);


const savedData = JSON.parse(localStorage.getItem('data'));

if (savedData) {
  handleLocalStorage(savedData);
}
