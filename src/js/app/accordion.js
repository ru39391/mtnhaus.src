import { Accordion } from '../components/Accordion';
import {accordionConfig} from '../utils/constants';

const accordionArr = Array.from(document.querySelectorAll('.accordion'));
accordionArr.forEach(accordionArrEl => {
  const accordion = new Accordion(accordionArrEl, accordionConfig);
  accordion.setEventListeners();
});
