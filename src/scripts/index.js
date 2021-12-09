//Standalone runtime for Regenerator-compiled generator and async functions.
import regeneratorRuntime from 'regenerator-runtime';
import '../styles/main.scss';
import { handleSearch, handleLocalStorage, handleItemsList } from './functions';

const form = document.querySelector('.searchForm');

const itemsListForm = document.querySelector('.itemsListForm');

form.addEventListener('submit', handleSearch);

itemsListForm.addEventListener('submit', handleItemsList);

const savedData = JSON.parse(localStorage.getItem('data'));
const savedItems = JSON.parse(localStorage.getItem('items'));
if (savedData && savedItems) {
  handleLocalStorage(savedData, savedItems);
}
