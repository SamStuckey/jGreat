let _loadedCallbacks = [];
let _loaded = [];

// Respnds to string, function, or HTMLELement as input.
// Will register functions as callbacks, or return a DOMNodeCollection
$g = function(el){
  if (typeof el === 'function') {
    registerCallback(el);
    return;
  } else if (el instanceof HTMLElement){
    new DOMNodeCollection(el);
  } else if (typeof el === 'string'){
    return getMatchingNodes(el);
  }
};

$g.ajax = function (options) {
  const request = new XMLHttpRequest();
  const defaults = {
    async: true,
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    data: {},
    method: 'GET',
    URL: "",
    success: () => {},
    error: () => {},
    statusCode: {},
    headers: {}
  };
  options = $g.extend(defaults, options);

  request.open(options.method, options.url, options.async);
  request.onload((e) => {
    if (xhr.status === 200) {
      options.success(request.response);
    } else {
      options.error(request.response);
    }
  });

  xhr.send(JSON.stringify(options.data));
};

$g.extend = function (...objects) {
  let result = {};
  objects.forEach(function(el) {
    for (let key in el) {
      result[key] = el[key];
    }
  });
  return result;
};

document.addEventListener("DOMContentLoaded", function() {
  _loaded = true;
  _loadedCallbacks.forEach((func) => {
    func.call();
  });
});

getMatchingNodes  = function (el) {
  const elements = document.querySelectorAll(el);
  const nodes = Array.from(elements);
  return new DOMNodeCollection(nodes);
};

registerCallback = function (cb) {
  if (_loaded) {
    cb();
  } else {
    _loadedCallbacks.push(el);
  }
};

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
