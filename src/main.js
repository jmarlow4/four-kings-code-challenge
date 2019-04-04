import { DeckService } from './services/index.js';
import {
  ColumnsContainerComponent,
  CardColumnComponent,
  CardComponent
} from './components/index.js';
import { SuitsEnum, CardVals } from './enums/index.js';

window.customElements.define('columns-container', ColumnsContainerComponent);
window.customElements.define('card-column', CardColumnComponent);
window.customElements.define('card-element', CardComponent);

window.addEventListener('DOMContentLoaded', function onReadyHandler () {

  const cardLimit = 52;
  const kingLimit = 4;
  const intervalTime = 1000;
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

          // Close it up once "win" condition is achieved
          if (cardCount >= cardLimit || kingCount >= kingLimit) {
            clearInterval(loopInterval);
            alert('Finished!')
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

                // retrieve card value to test against
                const cardValue = CardVals.indexOf(card.value)

                // This is where it gets a little hairy. In order to find the correct
                // position where we'll insert the card, we need to "clean" the childNodes
                // array since we can't perform maps on it normally.
                const cleanedArray = [...parentColumn.children].map( child => {
                  // This checks against the default 'text' child, meaning if its
                  // a true childNode, into which we'll only be inserting cards,
                  // then we want an array only of the card values
                  if (!!child.attributes) {
                    return CardVals.indexOf(child.attributes.value.value)
                  }
                })

                // This is where we find the correct position to push the card into.
                // None of this is done with DOM elements so the performance isn't hit
                // too badly.
                cleanedArray.push(cardValue)
                cleanedArray.sort( (a, b) => a - b )
                const insertAt = cleanedArray.indexOf(cardValue)

                // Finally, put it where its supposed to go.
                parentColumn.insertBefore(cardElem, parentColumn.childNodes[insertAt]);

                cardCount++;
                if (card.value === 'KING') {
                  kingCount++;
                }
              })
            })
          }
        }, intervalTime)
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