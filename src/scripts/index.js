//Standalone runtime for Regenerator-compiled generator and async functions.
import regeneratorRuntime from 'regenerator-runtime';
import '../styles/main.scss';
import { handleSearch } from './fetch2.js';

const form = document.querySelector('.form');

form.addEventListener('submit', handleSearch);
