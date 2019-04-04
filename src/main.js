import { DeckService } from './services/index.js';
import { ColumnsContainerComponent, CardColumnComponent } from './components/index.js';
import { SuitsEnum } from './enums/index.js';

window.customElements.define('card-column', CardColumnComponent);
window.customElements.define('columns-container', ColumnsContainerComponent);

window.addEventListener('DOMContentLoaded', function onReadyHandler () {

  const shadowRoot = document.querySelector('#app-root').attachShadow({mode: 'open'})
  shadowRoot.appendChild(buildCardColumns());

  main();

  function main () {

    const deckService = new DeckService();
    const state = {
      deckId: null
    }
    deckService.initDeck().then( res => state.deckId = res.deck_id)
  }

  function buildCardColumns() {
    const columnsContainer = document.createElement('columns-container')
    columnsContainer.innerHTML = `
      <card-column
        suit="${SuitsEnum.HEARTS.name}"
        symbol="${SuitsEnum.HEARTS.symbol}"
        is-red="${SuitsEnum.HEARTS.isRed}">
      </card-column>
      <card-column
        suit="${SuitsEnum.CLUBS.name}"
        symbol="${SuitsEnum.CLUBS.symbol}"
        is-red="${SuitsEnum.CLUBS.isRed}">
      </card-column>
      <card-column
        suit="${SuitsEnum.DIAMONDS.name}"
        symbol="${SuitsEnum.DIAMONDS.symbol}"
        is-red="${SuitsEnum.DIAMONDS.isRed}">
      </card-column>
      <card-column
        suit="${SuitsEnum.SPADES.name}"
        symbol="${SuitsEnum.SPADES.symbol}"
        is-red="${SuitsEnum.SPADES.isRed}">
      </card-column>
    `;
    return columnsContainer
  }
});