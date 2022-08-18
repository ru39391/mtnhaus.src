export class Tab {
  constructor(tabContentEl, {tabTogglerSelector, tabTogglerActiveClass, tabPaneSelector, tabPaneActiveClass}) {
    this._tabContent = tabContentEl;
    this._tabTogglersArr = Array.from(this._tabContent.querySelectorAll(tabTogglerSelector));
    this._tabPanesArr = Array.from(this._tabContent.querySelectorAll(tabPaneSelector));
    this._tabTogglerActiveClass = tabTogglerActiveClass;
    this._tabPaneActiveClass = tabPaneActiveClass;
  }

  _enableEl(el, className) {
    el.classList.add(className);
  }

  _disableEl(el, className) {
    el.classList.remove(className);
  }

  _isActiveEl(el, className) {
    return el.classList.contains(className);
  }

  _setActive(el, arr, className) {
    const elActive = arr.find(item => this._isActiveEl(item, className));
    if(elActive) {
      this._disableEl(elActive, className);
    }
    this._enableEl(el, className);
  }

  _toggleItems(item, arr) {
    this._setActive(item, arr, this._tabTogglerActiveClass);

    const targetId = item.getAttribute('data-target');
    const tabPaneTarget = this._tabContent.querySelector(targetId);
    this._setActive(tabPaneTarget, this._tabPanesArr, this._tabPaneActiveClass);
  }

  setEventListeners() {
    this._tabTogglersArr.forEach((tabTogglerEl, tabTogglerIndex, tabTogglersArr) => {
      tabTogglerEl.addEventListener('click', e => {
        e.preventDefault();
        this._toggleItems(e.currentTarget, tabTogglersArr);
      });
    });
  }
}
