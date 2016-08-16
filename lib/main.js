const DOMNodeCollection = require("./dom_node_collection.js");

let _loadedCallbacks = [];
let _loaded = [];

$g = function(el){
  if (typeof el === 'function') {
    registerCallback(el);
    return;
  } else if (typeof el === 'string'){
    return getNodes();
  } else if (el instanceof HTMLElement){
    return new DOMNodeCollection(el);
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
  $g.functions.forEach((func) => {
    func.call();
  });
});

getNodes  = function () {
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
