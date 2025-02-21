// styles
import "./styles.scss";
import "./widgets/game-map/styles.scss";

// js
import { initGameMap } from "./widgets/game-map"

const gameMapEl = document.querySelector('.game-map');
if (gameMapEl) {
  initGameMap(gameMapEl);
};
