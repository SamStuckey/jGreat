# jGreat

jGreat is a lightweight DOM manipulation library designed to provide basic traversal, manipulation, and event listening functionality, as well as create AJAX requests.

### Technical Details
The core function of the jGreat library is `$g`, which allows for various input types and will perform
a specific function for each.
  - `$g(HTMLElement)` A user can pass in an HTML element, which will create an instance of
  DOMNodeCollection containing that element.  This will allow the user to use any of jGreat's available methods
  on that object.  

  e.g.
  ```html
  <h1>jGreat Rules!</h1>
  <ul class="reasons-why">
    <li>low overhead</li>
  </ul>
  ```
  jGreat lets you append an element to a list.
  ```js
  $g('<li>').append('<li>super cool</li>');
  ```
  will change your output to be the equivalent of
  ```html
  <h1>jGreat Rules!</h1>
  <ul class="reasons-why">
    <li>low overhead</li>
    <li>super cool</li>
  </ul>
  ```
  - `$g(selector)` You can also pass in a string or selector. This will treat the input as a query parameter and
  search the DOM for any matching elements.  jGreat will wrap the element in a DOMNodeCollection, giving you access
  to all of its available methods.

  e.g.
  ```js
  $g('h1').remove();
  ```
  This will find all `<h1>` tags and remove those elements from the DOM using jGreat's `remove()` method.

  - `$g(function)` jGreat will recognize functions passed using `$g()` as call backs to be executed when the document is ready and the DOM content has loaded.  
  Functions passed in in this manner will be put in a queue and executed in the order in which they were received.

  e.g.
  ```js
  $g( () => alert('dogs > cats') )
  ```
  This will pass `alert()` in to a queue to be called when the document is loaded.


```js
$g = function(el){
  if (typeof el === 'function') {
    registerCallback(el);
    return;
  } else if (typeof el === 'string'){
    return getMatchingNodes();
  } else if (el instanceof HTMLElement){
    return new DOMNodeCollection(el);
  }
};
```

### Public API
`$g.ajax (options)` - creates an asynchronous AJAX query with flexible query parameters and sensible defaults:
```js
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
```

`$g.extend(...objects)` - merge multiple objects into a target object.  Used to selectively overwrite `$g.ajax()` defaults with options for querying.

### Constructor
`$g(nodes)` - takes a single DOM node or a collection of DOM nodes and returns a `DOMNodeCollection`.  

### traversal
`children` - Returns a `DOMNodeCollection` of all children of all elements in the DOM.
  - each child will natively have a `children` attribute.

`find(selector)` - Returns a `DOMNodeCollection` of all descendants of any nodes matching a passed in `selector` argument.

`each(function)` - Iterates over all Nodes in a DOMNodeCollection and pass them to a provided function.  

`parent()` - Returns a `DOMNodeCollection` of the `parent`s of each of the DOM nodes.


### DOM manipulation
`addClass(className)` - Add a class to elements of a DOMNodeCollection.

`append(children)` - Append `children` elements to elements of a DOMNodeCollection. It fluidly handles input of multiple types, including `DOMNodeCollection`s, an `HTMLElement`, or a `string`.

```js
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
```

`attr(attrName, value)` - Set an attribute on elements of a DOMNodeCollection.  The attribute's value will be equal to the provided value.

`empty()` - Set DOM elements to empty strings.

`on(eventName, callback)` - add an event listener to elements of a DOMNodeCollection with a specific callback.

`off(eventName, callback)` - remove a callback for an event from elements of a DOMNodeCollection.

`remove()` - Remove DOM elements from the DOM.

```js
remove () {
  this.each(function (el) {
    el.parentNode.removeChild(el);
  });
  this.htmlElements = [];
  return true;
}
```

`removeClass(className)` - Remove a provided `class` from elements of a DOMNodeCollection.  This is useful for dynamically updating CSS styles.

## How to use jGreat in your project
Inside of your project folder, clone this repo:
```
git clone https://github.com/SamStuckey/jGreat.git
```
This will add the jGreat library to your project.  Then just require the jGreat main.js file in the <head> of your index.html:
```
<head>
  <script type="text/javascript" src="jGreat/lib/main.js" charset="utf-8"></script>
</head>
```
Now all of the jGreat functionality will be available for you to use in your project!
