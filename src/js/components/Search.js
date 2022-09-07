export class Search {
  constructor(searchFormEl,
    {searchFormClassActive, searchFormClassSuccess, searchFieldSel, searchBtnSubmitSel, searchBtnResetSel},
    {alertTplSel, alertSel, alertHeaderSel, alertBodySel, alertHeaderMess, alertBodyMess},
    resultRender
  ) {
    this._searchForm = searchFormEl;
    this._searchFormClassActive = searchFormClassActive;
    this._searchFormClassSuccess = searchFormClassSuccess;
    this._searchField = searchFormEl.querySelector(searchFieldSel);
    this._searchBtnSubmit = searchFormEl.querySelector(searchBtnSubmitSel);
    this._searchBtnReset = searchFormEl.querySelector(searchBtnResetSel);
    this._alertTpl = document.querySelector(alertTplSel).content;
    this._alert = this._alertTpl.querySelector(alertSel).cloneNode(true);
    this._alertHeader =  this._alert.querySelector(alertHeaderSel);
    this._alertBody =  this._alert.querySelector(alertBodySel);
    this._alertHeaderMess = alertHeaderMess;
    this._alertBodyMess = alertBodyMess;
    this._tabData = [];
    this._tabDataHandled = [];
    this._sourceEl = null;
    this._resultEl = null;
    this._resultRender = resultRender;
  }

  _createEl(textContent, tagName, className = '') {
    const elem = document.createElement(tagName);
    if(className) {
      elem.classList.add(className);
    }
    elem.textContent = textContent;
    return elem;
  }

  _removeEl(el) {
    el.remove();
    el = null;
  }

  _isTextFound(el, text) {
    const elTextContent = el.textContent.toLowerCase();
    if (elTextContent.indexOf(text) != -1) {
      return true;
    }
    return false;
  }

  _getTabIds(arr) {
    const tabIdArr = [];
    for (let i = 0; i <= arr.length - 1; i++) {
      if(arr[i] != arr[i - 1]) {
        tabIdArr.push(arr[i]);
      }
    }
    return tabIdArr;
  }

  _replaceMatch(el, match) {
    const elem = {
      node: el.cloneNode(false),
      content: el.textContent.toLowerCase().split(match).join('//divider//')
    };

    let contentArr = elem.content.split('//').filter(item => Boolean(item));
    contentArr = contentArr.map((item, index, arr) => {
      switch(item == 'divider') {
        case true:
          if(index == 0) {
            return this._createEl(match.replace(match[0], match[0].toUpperCase()), 'span', 'highlighted');
          } else {
            return this._createEl(match, 'span', 'highlighted');
          }
          break;

        case false:
          if(index == 0) {
            return item.replace(item[0], item[0].toUpperCase());
          } else {
            return item;
          }
          break;
      }
    });

    const string = this._createEl('', 'span');
    contentArr.forEach(contentArrEl => {
      string.append(contentArrEl);
    });

    elem.node.append(string);
    return elem.node;
  }

  _toggleSearchFormSuccess(value) {
    if(value) {
      this._searchForm.classList.add(this._searchFormClassSuccess);
    } else {
      this._searchForm.classList.remove(this._searchFormClassSuccess);
    }
  }

  _toggleSearchFormActive(value) {
    if(value) {
      this._searchForm.classList.add(this._searchFormClassActive);
    } else {
      this._searchForm.classList.remove(this._searchFormClassActive);
    }
  }

  _resetSearchForm() {
    this._searchBtnSubmit.disabled = true;
    this._sourceEl.style = null;
    this._removeEl(this._resultEl);
    this._removeEl(this._alert);
    this._toggleSearchFormActive(false);
    this._toggleSearchFormSuccess(false);
  }

  getTabData(arr) {
    this._tabData = arr;
  }

  showAlert(el) {
    const alertHeaderMessArr = this._alertHeaderMess.split('//');
    this._alertHeader.textContent = null;
    alertHeaderMessArr.forEach(alertHeaderMessArrEl => {
      this._alertHeader.append(this._createEl(alertHeaderMessArrEl, 'span'));
    });
    this._alertBody.textContent = this._alertBodyMess;
    el.before(this._alert);
  }

  handleSearchResult({source, result}) {
    this._sourceEl = source;
    this._resultEl = result;
  }

  setEventListeners() {
    this._searchForm.addEventListener('submit', e => {
      e.preventDefault();
      if(this._sourceEl && this._resultEl) {
        this._resetSearchForm();
      };

      const searchFieldValue = this._searchField.value.toLowerCase();
      this._tabDataHandled = this._tabData.filter(item => this._isTextFound(item.title, searchFieldValue) || this._isTextFound(item.desc, searchFieldValue));

      const _isFound = Boolean(this._tabDataHandled.length);
      this._toggleSearchFormActive(_isFound);
      this._toggleSearchFormSuccess(_isFound);
      this._resultRender({
        isFound: _isFound,
        tabIds: this._getTabIds(this._tabDataHandled.map(item => item.tab)),
        tabData: this._tabDataHandled.map(item => {
          return {
            el: item.el,
            tab: item.tab,
            title: this._replaceMatch(item.title, searchFieldValue),
            desc: this._replaceMatch(item.desc, searchFieldValue)
          }
        })
      });
    });

    this._searchForm.addEventListener('reset', e => {
      this._resetSearchForm();
    });

    this._searchField.addEventListener('input', e => {
      if(e.target.value.length > 0) {
        this._searchBtnSubmit.disabled = false;
        this._toggleSearchFormActive(true);
      } else {
        this._resetSearchForm();
      }
    });
  }
}
