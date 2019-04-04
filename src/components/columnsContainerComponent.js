export class ColumnsContainerComponent extends HTMLElement {

  connectedCallback () {
    const _styles = `{
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      align-items: stretch;
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
