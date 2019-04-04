# Four Kings Code Challenge

## Draw All The Kings!

Use the endpoint: 

`https://deckofcardsapi.com/api/deck/new/draw/?count=0'

to shuffle a new deck of cards. This will return a deck_id property which you will then use to draw 2 cards from the deck. Use the endpoint 

`https://deckofcardsapi.com/api/deck/{{deck_id}}/draw/?count=2`

to draw two cards from the deck. You must insert the deck_id from the response from calling the first into the `{{deck_id}}` url in order to draw cards from that deck. Draw cards every second until you get all of the Kings and then stop drawing cards.

Keep track of the cards drawn and have some way of alerting the user when all of the kings are drawn.

Sort the drawn cards into suits and sort them like so : `[ACE, 2, 3, 4, 5, 6, 7, 8, 9, 10, JACK, QUEEN, KING]` for each suit.