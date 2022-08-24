import { Accordion } from '../components/Accordion';
import {accordionConfig} from '../utils/constants';

const search = {
  form: document.querySelector('.search-form'),
  field: document.querySelector('.search-form__field'),
  submitBtn: document.querySelector('.search-form__btn_type_submit'),
  closeBtn: document.querySelector('.search-form__btn_type_close'),
  alert: document.querySelector('.alert')
};

const tabContentWrapper = document.querySelector('.tab-content__wrapper');
const accordionsArr = Array.from(document.querySelectorAll('.accordion'));
const accordionParamsArr = accordionsArr.map(item => {
  return {
    item: item,
    tab: item.parentNode.id,
    title: item.querySelector('.accordion__title'),
    desc: item.querySelector('.accordion__desc')
  }
});

function resetSearchForm() {
  search.submitBtn.disabled = true;
  search.form.classList.remove('search-form_active');
  search.closeBtn.classList.remove('search-form__btn_visible');
  search.alert.classList.remove('alert_visible');
  tabContentWrapper.classList.remove('tab-content__wrapper_disabled');
  accordionsArr.forEach(accordionsArrEl => {
    accordionsArrEl.style = null;
  });
}

function replaceWithItem(el, matched) {
  const elem = {
    item: el.cloneNode(false),
    content: el.textContent.split(' ')
  };

  const span = document.createElement('span');
  span.classList.add('matched');
  span.textContent = `${matched}\u00A0`;

  const content = elem.content.map(item => {
    if(item == matched) {
      return span;
    } else {
      return `${item}\u00A0`;
    }
  });
  content.forEach(contentEl => {
    elem.item.append(contentEl);
  });

  return el.replaceWith(elem.item);
}

function setVisible(el, arr) {
  const elActive = arr.find(item => item.item == el);
  if(elActive && elActive.item == el) {
    el.style = null;
  } else {
    el.style.display = 'none';
  }
}

search.form.addEventListener('submit', e => {
  e.preventDefault();
  const formValue = search.field.value;
  let matchedArr = accordionParamsArr.filter(item => item.title.textContent.indexOf(formValue) != -1 || item.desc.textContent.indexOf(formValue) != -1);

  if(matchedArr.length) {
    search.form.classList.add('search-form_active');
    search.closeBtn.classList.add('search-form__btn_visible');
    tabContentWrapper.classList.remove('tab-content__wrapper_disabled');

    matchedArr = matchedArr.map(item => {
      return {
        item: item.item,
        tab: item.tab,
        title: replaceWithItem(item.title, formValue),
        desc: replaceWithItem(item.desc, formValue)
      }
    });
    accordionsArr.forEach(accordionsArrEl => {
      setVisible(accordionsArrEl, matchedArr);
    });
    matchedArr.forEach(matchedArrEl => {
      const accordion = new Accordion(matchedArrEl.item, accordionConfig);
      accordion.setEventListeners();
    });
  } else {
    search.alert.classList.add('alert_visible');
    search.closeBtn.classList.add('search-form__btn_visible');
    tabContentWrapper.classList.remove('tab-content__wrapper_disabled');
  }
});

search.field.addEventListener('input', e => {
  if(e.target.value.length > 0) {
    search.submitBtn.disabled = false;
    tabContentWrapper.classList.add('tab-content__wrapper_disabled');
  } else {
    resetSearchForm();
  }
});

search.closeBtn.addEventListener('click', () => {
  search.field.value = '';
  resetSearchForm();
  document.location.reload();
});
