// Setting this up as a private property
const _apiRequest = Symbol('_apiRequest');

export class DeckService {

  /**
   * Makes initial call to the DeckOfCards API to get a unique deck ID
   */
  initDeck () {
    return this[_apiRequest]('GET', 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then( res => JSON.parse(res.response))
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