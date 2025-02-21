import Player from "../../../entities/player";
import getCoordsInPercent from "../../../shared/helpers/getCoordsInContainer";

/**
 * 
 * @param {HTMLElement} elem - родительский html элемент
 */
export const initGameMap = (elem) => {
  if (!elem || elem.nodeType !== Node.ELEMENT_NODE) {
    throw Error(`arg elem is ${elem}`);
  }

  const playerEl = elem.querySelector('.game-map__figure');
  const playerInst = new Player(playerEl);
}
