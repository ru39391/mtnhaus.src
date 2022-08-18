import { Accordion } from '../components/Accordion';

const accordionArr = Array.from(document.querySelectorAll('.accordion'));
const accordionConfig = {
  accordionTogglerSelector: '.accordion__title',
  accordionActiveClass: 'accordion_active'
};

accordionArr.forEach(accordionArrEl => {
  const accordion = new Accordion(accordionArrEl, accordionConfig);
  accordion.setEventListeners();
});
