class UnremovableSpan extends HTMLSpanElement {
  #nSibling;
  #pSibling;
  #parent;
  #prevContent;

  constructor() {
    super();
  }

  connectedCallback() {
    this.#nSibling = this.nextSibling;
    this.#pSibling = this.previousSibling;
    this.#parent = this.parentElement;

    this.textContent = 'You won\'t be able to remove this element!';
  }

  disconnectedCallback() {
    this.#prevContent = this.textContent;

    if (document.querySelector('html').contains(this.#pSibling)) {
      this.#pSibling.after(this);
    } else if (document.querySelector('html').contains(this.#nSibling)) {
      this.#nSibling.insertBefore(this.textContent, this);
    } else if (document.querySelector('html').contains(this.#parent)) {
      this.#parent.appendChild(this);
    }
  }
}

customElements.define('unremovable-span', UnremovableSpan, {
  extends: 'span'
});

class UnremovableBody extends HTMLBodyElement {
  constructor() {
    super();
  }

  disconnectedCallback() {
    document.querySelector('html').appendChild(this);
  }
}

customElements.define('unremovable-body', UnremovableBody, {
  extends: 'body'
});

class UnremovableStyle extends HTMLStyleElement {
  #nSibling;
  #pSibling;
  #parent;

  constructor() {
    super();
  }

  connectedCallback() {
    this.#nSibling = this.nextSibling;
    this.#pSibling = this.previousSibling;
    this.#parent = this.parentElement;

    this.textContent = `
    span {
      display: inline-block;
      font-size: 30px;
      font-family: sans-serif;
      padding: 15px;
      border-radius: 10px;
      margin: 10px;
      background: #343a40;
      color: #fff;
    }`;
  }

  disconnectedCallback() {
    if (document.querySelector('html').contains(this.#pSibling)) {
      this.#pSibling.after(this);
    } else if (document.querySelector('html').contains(this.#nSibling)) {
      this.#nSibling.insertBefore(this.textContent, this);
    } else if (document.querySelector('html').contains(this.#parent)) {
      this.#parent.appendChild(this);
    }
  }
}

customElements.define('unremovable-style', UnremovableStyle, {
  extends: 'style'
});

class UnremovableHead extends HTMLHeadElement {
  #nSibling;
  #pSibling;
  #parent;

  constructor() {
    super();
  }

  connectedCallback() {
    this.#nSibling = this.nextSibling;
    this.#pSibling = this.previousSibling;
    this.#parent = this.parentElement;
  }

  disconnectedCallback() {
    document.querySelector('html').insertAdjacentElement('afterbegin', this);
  }
}

customElements.define('unremovable-head', UnremovableHead, {
  extends: 'head'
});

class UnremovableTitle extends HTMLTitleElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.textContent = `😂 !!!Fun!!! Unremovable Dom!`;
  }

  disconnectedCallback() {
    document.querySelector('head').insertAdjacentElement('beforeend', this);
  }
}

customElements.define('unremovable-title', UnremovableTitle, {
  extends: 'title'
});

class UnremovableMeta extends HTMLMetaElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.setAttribute('charset', 'utf-8');
  }

  disconnectedCallback() {
    document.querySelector('head').insertAdjacentElement('afterbegin', this);
  }
}

customElements.define('unremovable-meta', UnremovableMeta, {
  extends: 'meta'
});