import coordsJSON from "../../data/coords.json";

export default class Player {
  #keyCoord = 0;

  constructor(elem) {
    if (!elem || elem.nodeType !== Node.ELEMENT_NODE) {
      throw Error(`arg elem is ${elem}`);
    }

    this.elem = elem;
    this.#setPosition();
  }

  goNextPoint() {

  }

  #setPosition() {
    if (!this.elem) return;

    const coords = coordsJSON[this.#keyCoord];

    this.elem.style.left = `calc(${coords.x}% - ${this.elem.offsetWidth / 2}px)`;
    this.elem.style.top = `calc(${coords.y}% - ${this.elem.offsetHeight}px)`;
  }
}
