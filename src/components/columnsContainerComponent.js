export class ColumnsContainerComponent extends HTMLElement {

  connectedCallback () {
    const _styles = `{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-top: 40px;
      align-items: stretch;
      margin: 40px auto 0;
      max-width: 1200px;
      min-width: 884px;
    }`
  
    const _template = `
      <style>:host ${ _styles }</style>
      <slot></slot>
    `

    const tmpl = document.createElement('template');
    tmpl.innerHTML = _template;

    const shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.appendChild(tmpl.content.cloneNode(true));
  }
}
