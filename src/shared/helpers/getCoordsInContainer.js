/**
 * 
 * @param {object} param0 
 * @param {number} param0.x - x coord
 * @param {number} param0.y - y coord
 * @param {HTMLElement} param0.el - родительский html элемент
 * @return - возвращает координаты в процентном соотношении относительно родительского контейнера
 */
const getCoordsInPercent = ({ x, y, el }) => {
  const xPercent = el.offsetWidth / 100;
  const yPercent = el.offsetHeight / 100;
  return {
    x: x / xPercent,
    y: y / yPercent,
  }
}

export default getCoordsInPercent;
