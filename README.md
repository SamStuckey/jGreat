# jGreat

jGreat is a lightweight DOM manipulation library designed to provide basic traversal, manipulation, and event listening functionality, as well as create XML requests.

### Technical Details
```
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
`$g.ajax (options)` - creates an asynchronous AJAX query with the following default values:
```
  async: true,
  contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
  method: 'GET',
```

`$g.extend(...objects)` - merge multiple objects into a target object.  Used to selectively overwrite `$g.ajax()` defaults with options for querying.

### Constructor
`$g(nodes)` - takes a single DOM node or a collection of DOM nodes and returns a `DOMNodeCollection`

### traversal
`children` - Returns a `DOMNodeCollection` of all children of all elements in the DOM.
  - each child will natively have a `children` attribute.

`find(selector)` - Returns a `DOMNodeCollection` of all descendants of any nodes matching a passed in `selector` argument.

`each(function)` - Iterate over all Nodes in a DOMNodeCollection and pass them to a provided function.

`parent()` - Returns a `DOMNodeCollection` of the `parent`s of each of the DOM nodes.


### DOM manipulation
`addClass(className)` - Add a class to elements of a DOMNodeCollection.

`append(children)` - Append `children` elements to elements of a DOMNodeCollection.

`attr(attrName, value)` - Set an attribute on elements of a DOMNodeCollection.  The attribute's value will be equal to the provided value.

`empty()` - Set DOM elements to empty strings.

`on(eventName, callback)` - add an event listener to elements of a DOMNodeCollection with a specific callback.

`off(eventName, callback)` - remove a callback for an event from elements of a DOMNodeCollection.

`remove()` - Remove DOM elements from the DOM.

`removeClass(className)` - Remove a provided `class` from elements of a DOMNodeCollection.
