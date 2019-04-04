// Setting this up as a private property
const _apiRequest = Symbol('_apiRequest');

export class DeckService {

  /**
   * Makes initial call to the DeckOfCards API to get a unique deck ID
   */
  async getDeckId () {
    const res = await this[_apiRequest]('GET', 'https://deckofcardsapi.com/api/deck/new/draw/?count=0');
    return JSON.parse(res.response).deck_id;
  }

  async drawTwoCards (deckId) {
    const res = await this[_apiRequest]('GET', `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`);
    return JSON.parse(res.response).cards;
  }

  /**
   * Wraps a normal XHR request in a promise and makes it easier
   * to work with. Strange syntax is because of symbol pointer,
   * making this method private.
   */
  [_apiRequest] = (method, url) => {

    var request = new XMLHttpRequest();
  
    return new Promise(function (resolve, reject) {
  
      request.onreadystatechange = function () {
  
        if (request.readyState !== 4) return;
  
        if (request.status >= 200 && request.status < 300) {
          resolve(request);
        } else {
          reject({
            status: request.status,
            statusText: request.statusText
          });
        }
  
      };
  
      request.open(method || 'GET', url, true);

      request.send();
  
    });
  };

}