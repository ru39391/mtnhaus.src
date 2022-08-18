/* svg */
const requireAll = (e) => {
  e.keys().forEach(e);
}
requireAll(require.context('../img/icons/', true, /\.svg$/));

fetch(`img/icons/icons.svg`).then(res => {
  return res.text();
});