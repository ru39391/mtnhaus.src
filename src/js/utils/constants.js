export const alertConfig = {
  alertTplSel: '.alert-tpl',
  alertSel: '.alert',
  alertHeaderSel: '.alert__heading',
  alertBodySel: '.alert__content',
  alertHeaderMess: `Sorry!//We can't find a match.`,
  alertBodyMess: 'Please review the word or try another search.'
};

export const searchFormConfig = {
  searchFormClassActive: 'search-form_active',
  searchFormClassSuccess: 'search-form_success',
  searchFieldSel: '.search-form__field',
  searchBtnSubmitSel: '.search-form__btn_type_submit',
  searchBtnResetSel: '.search-form__btn_type_close'
};

export const accordionConfig = {
  accordionTogglerSelector: '.accordion__title',
  accordionActiveClass: 'accordion_active'
};

export const tabConfig = {
  tabTogglerSelector: '.tab-panel__link',
  tabTogglerActiveClass: 'tab-panel__link_active',
  tabPaneSelector: '.tab-pane',
  tabPaneActiveClass: 'tab-pane_active'
};

export const tabContent = {
  item: document.querySelector('.tab-content'),
  wrapper: document.querySelector('.tab-content__wrapper')
};
