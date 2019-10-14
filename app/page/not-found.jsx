import m from "mithril";

var __ = {
  view: () => {
    return m("main", [m("h1", {}, "Not Found")]);
  }
};

export default __;

/**
  oninit: function(vnode) {
    console.log("oninit", "initialized");
  },
  oncreate: function(vnode) {
    console.log("oncreate", "DOM created");
  },
  onbeforeupdate: function(newVnode, oldVnode) {
    return true;
  },
  onupdate: function(vnode) {
    console.log("onupdate", "DOM updated");
  },
  onbeforeremove: function(vnode) {
    console.log("onbeforeremove", "exit animation can start");
    return new Promise(function(resolve) {
      // call after animation completes
      resolve();
    });
  },
  onremove: function(vnode) {
    console.log("onremove", "removing DOM element");
  },
 */
