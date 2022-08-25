import { Search } from '../components/Search';
import { Tab } from '../components/Tab';
import { Accordion } from '../components/Accordion';
import {tabConfig, accordionConfig} from '../utils/constants';

const tabContent = document.querySelector('.tab-content');
const accordionsArr = Array.from(document.querySelectorAll('.accordion'));
const accordionParamsArr = accordionsArr.map(item => {
  return {
    item: item,
    tab: item.parentNode.id,
    title: item.querySelector('.accordion__title'),
    desc: item.querySelector('.accordion__desc')
  }
});

const searchForm = document.querySelector('.search-form');
const tabContentWrapper = document.querySelector('.tab-content__wrapper');
const searchFormConfig = {
  searchFormClassActive: 'search-form_active',
  searchFormClassSuccess: 'search-form_success',
  searchFieldSel: '.search-form__field',
  searchBtnSubmitSel: '.search-form__btn_type_submit',
  searchBtnResetSel: '.search-form__btn_type_close'
};
const alertConfig = {
  alertTplSel: '.alert-tpl',
  alertSel: '.alert',
  alertHeaderSel: '.alert__heading',
  alertBodySel: '.alert__content',
  alertHeaderMess: `Sorry!//We can't find a match.`,
  alertBodyMess: 'Please review the word or try another search.'
};

if(searchForm) {
  const search = new Search(searchForm, searchFormConfig, alertConfig, {
    resultRender: ({isFound, tabIds, tabData}) => {
      if(!isFound) {
        search.showAlert(tabContentWrapper);
      } else {
        const tabParams = {
          toggler: tabContent.querySelector(tabConfig.tabTogglerSelector),
          pane: tabContent.querySelector(tabConfig.tabPaneSelector)
        };
        const tabHolderParams = {
          panel: tabParams.toggler.parentNode,
          wrapper: tabParams.pane.parentNode
        };
        const tabResultParams = {
          content: tabContent.cloneNode(false),
          panel: tabHolderParams.panel.cloneNode(false),
          wrapper: tabHolderParams.wrapper.cloneNode(false)
        }

        const accordionArr = tabData.map((item, index, arr) => {
          const accordionElem = {
            parentId: item.tab,
            wrapper: item.item.cloneNode(false)
          };
          accordionElem.wrapper.append(item.title);
          accordionElem.wrapper.append(item.desc);
          return accordionElem;
        });

        const tabsArr = tabIds.map((item, index, arr) => {
          const tabElem = {
            toggler: tabParams.toggler.cloneNode(false),
            pane: tabParams.pane.cloneNode(false)
          };

          tabElem.toggler.setAttribute('data-target',`#${item}`);
          tabElem.toggler.textContent = item;
          tabElem.pane.id = item;

          if(index == 0) {
            return tabElem;
          } else {
            tabElem.toggler.classList.remove(tabConfig.tabTogglerActiveClass);
            tabElem.pane.classList.remove(tabConfig.tabPaneActiveClass);
            return tabElem;
          }
        });

        tabsArr.forEach(tabsArrEl => {
          tabResultParams.panel.append(tabsArrEl.toggler);
          tabResultParams.wrapper.append(tabsArrEl.pane);
        });

        accordionArr.forEach(accordionArrEl => {
          const tabPane = tabResultParams.wrapper.querySelector(`#${accordionArrEl.parentId}`);
          tabPane.append(accordionArrEl.wrapper);
          const accordion = new Accordion(accordionArrEl.wrapper, accordionConfig);
          accordion.setEventListeners();
        });

        tabResultParams.content.append(tabResultParams.panel);
        tabResultParams.content.append(tabResultParams.wrapper);

        const tabContentResult = new Tab(tabResultParams.content, tabConfig);
        tabContentResult.setEventListeners();
        tabContent.before(tabResultParams.content);

        //tabContent.style.display = 'none';
      }
    }
  });
  search.setEventListeners();
  search.getTabData(accordionParamsArr);
  console.log(search);
}
