import { View } from './Viwe';
import icons from 'url:../img/icons.svg';

class paginationViw extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }
  _generatMarkup() {
    const curPage = this._data.page;

    const numpage = Math.ceil(
      this._data.result.length / this._data.resultPerPage
    );

    // page1 there are other pages
    if (curPage === 1 && numpage > 1)
      return `
  <button  data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
    <span>Page ${curPage + 1}</span>
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-right"></use>
    </svg>
  </button> `;

    // last page
    if (curPage === numpage)
      return ` <button data-goto="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${curPage - 1}</span>
        </button>`;

    // other pages
    if (curPage < numpage) {
      return `<button data-goto="${
        curPage + 1
      }" class="btn--inline pagination__btn--next">
      <span>Page ${curPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button> 
     <button data-goto="${
       curPage - 1
     }" class="btn--inline pagination__btn--prev">
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-left"></use>
    </svg>
    <span>Page ${curPage - 1}</span>
  </button>`;
    }
    // page1 there are NO other page
    return '';
  }
}
export default new paginationViw();
