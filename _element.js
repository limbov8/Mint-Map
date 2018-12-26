import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `mint-map`
 * 
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class MintMap extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <h2>Hello [[prop1]]!</h2>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'mint-map',
      },
    };
  }
}

window.customElements.define('mint-map', MintMap);
