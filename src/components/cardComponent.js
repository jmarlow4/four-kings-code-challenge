export class CardComponent extends HTMLElement {

  connectedCallback () {
    const _styles = `{
      padding: 16px;
      margin: 16px;
      width: 120px;
      background-color: #fff;
      box-shadow: 0px 3px 3px -2px #888;
      border-radius: 5px;
    }`
  
    const _template = `
      <style>:host ${_styles}</style>
      <div></div>
    `

    const tmpl = document.createElement('template');
    tmpl.innerHTML = _template;

    const shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.appendChild(tmpl.content.cloneNode(true));
  }
}
