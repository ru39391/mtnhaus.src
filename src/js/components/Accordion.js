export class Accordion {
  constructor(accordionEl, {accordionTogglerSelector, accordionActiveClass}) {
    this._accordion = accordionEl;
    this._accordionActiveClass = accordionActiveClass;
    this._accordionToggler = this._accordion.querySelector(accordionTogglerSelector);
  }

  _open() {
    this._accordion.classList.add(this._accordionActiveClass);
  }

  _close() {
    this._accordion.classList.remove(this._accordionActiveClass);
  }

  _toggle() {
    if (this._accordion.classList.contains(this._accordionActiveClass)) {
      this._close();
    } else {
      this._open();
    }
  }

  setEventListeners() {
    this._accordionToggler.addEventListener('click', () => {
      this._toggle();
    });
  }
}
