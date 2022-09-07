import { Tab } from '../components/Tab';
import {tabConfig} from '../utils/constants';

const tabContentArr = Array.from(document.querySelectorAll('.tab-content'));
tabContentArr.forEach(tabContentArrEl => {
  const tabContent = new Tab(tabContentArrEl, tabConfig);
  tabContent.setEventListeners();
});
