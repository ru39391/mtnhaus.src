import { Tab } from '../components/Tab';

const tabContentArr = Array.from(document.querySelectorAll('.tab-content'));
const tabConfig = {
  tabTogglerSelector: '.tab-panel__link',
  tabTogglerActiveClass: 'tab-panel__link_active',
  tabPaneSelector: '.tab-pane',
  tabPaneActiveClass: 'tab-pane_active'
};

tabContentArr.forEach(tabContentArrEl => {
  const tabContent = new Tab(tabContentArrEl, tabConfig);
  tabContent.setEventListeners();
});
