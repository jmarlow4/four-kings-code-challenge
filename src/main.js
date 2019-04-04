import { DeckService } from './services/index.js';
import {
  ColumnsContainerComponent,
  CardColumnComponent,
  CardComponent
} from './components/index.js';
import { SuitsEnum } from './enums/index.js';

window.customElements.define('columns-container', ColumnsContainerComponent);
window.customElements.define('card-column', CardColumnComponent);
window.customElements.define('card-element', CardComponent);

window.addEventListener('DOMContentLoaded', function onReadyHandler () {

  const shadowRoot = document.querySelector('#app-root').attachShadow({mode: 'open'})
  shadowRoot.appendChild(buildCardColumns());

  main();

  function main () {

    const deckService = new DeckService();

    deckService.getDeckId()
      .then( deckId => {
        let kingCount = 0;
        let cardCount = 0;
        const loopInterval = setInterval( () => {
          if (cardCount >= 52 || kingCount >= 4) {
            clearInterval(loopInterval)
          } else {
            deckService.drawTwoCards(deckId)
            .then( (cards) => {
              cards.map( card => {
                const parentColumnSelector =
                  `card-column[suit=${SuitsEnum[card.suit].name}]`;
                const parentColumn = shadowRoot.querySelector(parentColumnSelector);
                const cardElem = document.createElement('card-element');
                cardElem.setAttribute('suit', card.suit);
                cardElem.setAttribute('value', card.value);
                parentColumn.appendChild(cardElem);
                cardCount++;
                if (card.value === 'KING') {
                  kingCount++;
                }
              })
            })
          }
          console.log(kingCount)
        }, 1000)
      })
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