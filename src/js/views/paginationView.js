//import icons from './../img/icons.svg' // Parcel 1
import icons from 'url:./../../img/icons.svg'; // Parcel 2

import View from './view.js';
import { RES_PER_PAGE } from './../config';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerRender(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = Number(btn.dataset.goto);

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(this._data.results.length / RES_PER_PAGE);
    //console.log(numPages);

    // Page 1 and there are others pages
    if (currentPage === 1 && numPages > 1) {
      return this._generateMarkupForButtonForward();
    }

    // Last page
    if (currentPage === numPages && numPages > 1) {
      return this._generateMarkupForButtonBack();
    }

    // Other page
    if (currentPage < numPages && currentPage != 1) {
      return `${this._generateMarkupForButtonBack()}${this._generateMarkupForButtonForward()}`;
    }

    // Page 1, and there aren't others pages
    return '';
  }

  _generateMarkupForButtonBack() {
    return `
      <button data-goto="${
        this._data.page - 1
      }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${this._data.page - 1}</span>
      </button>`;
  }

  _generateMarkupForButtonForward() {
    return `
      <button data-goto="${
        this._data.page + 1
      }" class="btn--inline pagination__btn--next">
        <span>Page ${this._data.page + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>`;
  }
}

export default new PaginationView();
