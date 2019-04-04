import { SuitsEnum } from "../enums/index.js";

const _suit = Symbol('_suit');
const _value = Symbol('_value');
const _symbol = Symbol('_symbol');
const _isRed = Symbol('_isRed');

export class CardComponent extends HTMLElement {

  connectedCallback () {
    const _styles = `{
      line-height: 1.5rem;
      padding: 10px 16px;
      margin: 8px 16px;
      background-color: #fff;
      box-shadow: 0px 3px 3px -2px #888;
      border-radius: 5px;
    }
    .suit {
      font-size: 2rem;
    }
    .is-red {
      color: #ef2333;
    }`
  
    const _template = `
      <style>:host ${ _styles }</style>
      <div class="${ this[_isRed] ? 'is-red' : '' }">
        <span class="suit">
          ${this[_symbol]}
        </span>
        <span>${this[_value]}</span>
      </div>
    `

    const tmpl = document.createElement('template');
    tmpl.innerHTML = _template;

    const shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.appendChild(tmpl.content.cloneNode(true));
  }

  get [_suit] () {
    return this.getAttribute('suit');
  }

  get [_value] () {
    return this.getAttribute('value');
  }

  get [_symbol] () {
    return SuitsEnum[this[_suit]].symbol;
  }

  get [_isRed] () {
    return SuitsEnum[this[_suit]].isRed;
  }
}
