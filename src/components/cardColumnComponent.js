const _suit = Symbol('_suit');
const _symbol = Symbol('_symbol');
const _isRed = Symbol('_isRed');

export class CardColumnComponent extends HTMLElement {

  connectedCallback () {
    const _styles = `{
      border: 1px solid #ccc;
      border-radius: 5px;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      justify-content: space-evenly;
      padding: 16px;
      margin: 16px;
      width: 100%;
    }
    .suit {
      display: flex;
      align-self: center;
      font-size: 3rem;
    }
    .is-red {
      color: #ef2333;
    }`;
  
    const _template = `
      <style>:host ${ _styles }</style>
      <div class="suit ${ this[_isRed] ? 'is-red' : '' }">
        ${ this[_symbol] }
      </div>
      <slot></slot>
    `;

    const tmpl = document.createElement('template');
    tmpl.innerHTML = _template;

    const shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.appendChild(tmpl.content.cloneNode(true));
  }

  get [_suit] () {
    return this.getAttribute('suit')
  }

  get [_symbol] () {
    return this.getAttribute('symbol')
  }

  get [_isRed] () {
    return JSON.parse(this.getAttribute('is-red'))
  }
}
