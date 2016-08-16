class DOMNodeCollection {
  constructor (nodes) {
    this.htmlElements = Array.from(nodes);
  }

  addClass (cl) {
    this.each(function (el) {
      el.classList.add(cl);
    });
  }

  append (arg) {
    this.each(function(el){
      if(arg instanceof DOMNodeCollection){
        arg.each(function(childEl) {
          el.appendChild(childEl.cloneNode(true));
        });
      } else if(arg instanceof HTMLElement){
        el.appendChild(arg.cloneNode(true));
      } else if(typeof arg === 'string') {
        el.innerHTML += arg;
      }
    });
  }

  attr (attr, val) {
    if (val){
      this.each(function (el){
        el.setAttribute(attr, val);
      });
    } else {
      return this.htmlElements[0].getAttribute(attr);
    }
  }

  children () {
    let children = [];
    this.each(function(el) {
      children = children.concat(Array.from(el .querySelectorAll('*')));
    });
    return new DOMNodeCollection(children);
  }

  each (cb) {
    this.htmlElements.forEach(cb);
  }

  empty () {
    this.html("");
  }

  find (selector) {
    let results = [];
    this.each(function (el) {
      if (el.tagName.toLowerCase() === selector.toLowerCase()) {
        results.push(el);
      }
    });
    return new DOMNodeCollection(results);
  }

  html (arg) {
    if(typeof arg === 'string'){
      this.each( function (el) {
        el.innerHTML = arg;
      });
    } else {
      return this.htmlElements[0].innerHTML;
    }
  }

  off (evt, handler) {
    this.each(function(el) {
      el.removeEventListener(evt, handler);
    });
  }

  on (evt, handler) {
    this.each(function(el) {
      el.addEventListener(evt, handler);
    });
  }

  parent () {
    let parents = [];
    this.each(function (el) {
      parent = el.parentNode;
      if (!parents.includes(parent)){
        parents.push(parent);
      }
    });
    return new DOMNodeCollection(parents);
  }

  removeClass (cl) {
    this.each(function (el){
      el.classList.remove(cl);
    });
  }

  remove () {
    this.each(function (el) {
      el.parentNode.removeChild(el);
    });
    this.htmlElements = [];
    return true;
  }
}

module.exports = DOMNodeCollection;
