import * as Global from "./component/_global";
import NotFound from "./page/not-found.jsx";
import Template1 from "./page/template1.jsx";

import m from "mithril";

Global.loadStyle();

var root = document.getElementById("root");
m.route(root, "/not-found", {
  "/template1": Template1,
  "/not-found": NotFound
});
