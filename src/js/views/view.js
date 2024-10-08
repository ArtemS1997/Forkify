//import icons from './../img/icons.svg' // Parcel 1
import icons from 'url:./../../img/icons.svg'; // Parcel 2

export default class View {
  _data;

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      console.log('hehehehehe');
      return this.renderError();
    }
    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();
    //console.log('markup', markup);
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return;
    }

    this._data = data;
    const newMarkup = this._generateMarkup();
    const newDom = document.createRange().createContextualFragment(newMarkup);

    const newElemets = Array.from(newDom.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    //if (Array.isArray(data)) console.log(newDom.querySelectorAll('*'));

    newElemets.forEach((newEl, i) => {
      const curEl = curElements[i];
      // Update Text
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() != ''
      ) {
        curEl.textContent = newEl.textContent;
      }

      //Update attributes
      if (!newEl.isEqualNode(curEl)) {
        //if (Array.isArray(data))
        //console.log(newEl.isEqualNode(curEl), newEl, curEl);
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderSpinner() {
    const markup = `
    <div class="spinner">
      <svg>
        <use href="#icon-loader"></use>
       </svg>
    </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);

    //<use href="${icons}#icon-loader"></use>
    // <svg>
    //     <use href="${icons}#icon-loader"></use>
    //   </svg>
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }
}
