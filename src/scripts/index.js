//Standalone runtime for Regenerator-compiled generator and async functions.
import regeneratorRuntime from 'regenerator-runtime';
import '../styles/main.scss';
import { handleSearch, handleLocalStorage, addItem } from './functions';

const searchForm = document.querySelector('.searchForm');
const addItems = document.querySelector('.itemsListContainer');

searchForm.addEventListener('submit', handleSearch);
addItems.addEventListener('submit', addItem);

const savedData = JSON.parse(localStorage.getItem('data'));
const savedItems = JSON.parse(localStorage.getItem('items'));
if (savedData && savedItems) {
  handleLocalStorage(savedData, savedItems);
}
