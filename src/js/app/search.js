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
    title: item.querySelector('.accordion__title').textContent.toLowerCase(),
    desc: item.querySelector('.accordion__desc').textContent.toLowerCase()
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
  const formValue = search.field.value.toLowerCase();
  let matchedArr = accordionParamsArr.filter(item => item.title.indexOf(formValue) != -1 || item.desc.indexOf(formValue) != -1);

  if(matchedArr.length) {
    search.form.classList.add('search-form_active');
    search.closeBtn.classList.add('search-form__btn_visible');
    search.alert.classList.remove('alert_visible');
    tabContentWrapper.classList.remove('tab-content__wrapper_disabled');

    matchedArr = matchedArr.map(item => {
      return {
        item: item.item,
        tab: item.tab,
        title: item.title,
        desc: item.desc
      }
    });
    accordionsArr.forEach(accordionsArrEl => {
      setVisible(accordionsArrEl, matchedArr);
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
});
