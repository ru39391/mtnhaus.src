import { Search } from '../components/Search';
import { Tab } from '../components/Tab';
import { Accordion } from '../components/Accordion';
import { tabConfig, accordionConfig, tabContent, searchFormConfig, alertConfig } from '../utils/constants';

const accordionsArr = Array.from(document.querySelectorAll('.accordion'));
const accordionParamsArr = accordionsArr.map(item => {
  return {
    el: item,
    tab: item.parentNode.id,
    title: item.querySelector('.accordion__title'),
    desc: item.querySelector('.accordion__desc')
  }
});

const searchForm = document.querySelector('.search-form');
if (searchForm) {
  const search = new Search(searchForm, searchFormConfig, alertConfig,
    ({ isFound, tabIds, tabData }) => {
      if (!isFound) {
        search.showAlert(tabContent.wrapper);
        tabContent.item.style = null;
      } else {
        const tabParams = {
          toggler: tabContent.item.querySelector(tabConfig.tabTogglerSelector),
          pane: tabContent.item.querySelector(tabConfig.tabPaneSelector)
        };
        const tabHolderParams = {
          panel: tabParams.toggler.parentNode,
          wrapper: tabParams.pane.parentNode
        };
        const tabResultParams = {
          content: tabContent.item.cloneNode(false),
          panel: tabHolderParams.panel.cloneNode(false),
          wrapper: tabHolderParams.wrapper.cloneNode(false)
        }

        const accordionArr = tabData.map((item, index, arr) => {
          const {el, tab, title, desc} = item;
          const accordionElem = {
            parentId: tab,
            wrapper: el.cloneNode(false)
          };
          accordionElem.wrapper.append(title);
          accordionElem.wrapper.append(desc);
          return accordionElem;
        });

        const tabsArr = tabIds.map((item, index, arr) => {
          const tabElem = {
            toggler: tabParams.toggler.cloneNode(false),
            pane: tabParams.pane.cloneNode(false)
          };

          tabElem.toggler.setAttribute('data-target', `#${item}`);
          tabElem.toggler.textContent = item;
          tabElem.pane.id = item;

          if (index == 0) {
            tabElem.toggler.classList.add(tabConfig.tabTogglerActiveClass);
            tabElem.pane.classList.add(tabConfig.tabPaneActiveClass);
          } else {
            tabElem.toggler.classList.remove(tabConfig.tabTogglerActiveClass);
            tabElem.pane.classList.remove(tabConfig.tabPaneActiveClass);
          }
          return tabElem;
        });

        tabsArr.forEach(tabsArrEl => {
          const {toggler, pane} = tabsArrEl;
          tabResultParams.panel.append(toggler);
          tabResultParams.wrapper.append(pane);
        });

        accordionArr.forEach(accordionArrEl => {
          const {parentId, wrapper} = accordionArrEl;

          const tabPane = tabResultParams.wrapper.querySelector(`#${parentId}`);
          tabPane.append(wrapper);

          const accordion = new Accordion(wrapper, accordionConfig);
          accordion.setEventListeners();
        });

        tabResultParams.content.append(tabResultParams.panel);
        tabResultParams.content.append(tabResultParams.wrapper);

        const tabContentResult = new Tab(tabResultParams.content, tabConfig);
        tabContentResult.setEventListeners();
        tabContent.item.before(tabResultParams.content);

        tabContent.item.style.display = 'none';
        search.handleSearchResult({
          source: tabContent.item,
          result: tabResultParams.content
        });
      }
    }
  );
  search.setEventListeners();
  search.getTabData(accordionParamsArr);
}
