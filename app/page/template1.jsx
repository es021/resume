import m from "mithril";

function _h_item(id, content) {
  return m("div", { id: id, class: "h-item" }, content);
}

function _hi_item(icon, text) {
  return m("div", { class: "hi-item" }, [
    m("i", { class: `fas fa-${icon} icon-left` }, null),
    text
  ]);
}

var __ = {
  view: () => {
    let hItem = m("div", { class: "h-info" }, [
      _h_item("uni", "IOWA STATE UNIVERSITY"),
      _h_item("name", "SITI HUWAIDA"),
      _h_item("info", [
        _hi_item("phone", "+6010-9052569"),
        _hi_item("envelope", "sitihuwaida94@gmail.com"),
        _hi_item(
          "home",
          "A1-18-01, Kenwingston Residence, Persiaran Bestari <br>63000 Cyberjaya, Selangor"
        )
      ])
    ]);

    let image = m(
      "div",
      {
        class: "h-image",
        style: `background-image: url('image/huwaida.jpg');
                background-position: center;
                background-size:cover;
                width: 190px;`
      },
      null
    );

    let toRet = m("div", { class: "header" }, [hItem, image]);

    return toRet;
  }
};


/**
 * <div class="header">
                <div class="h-info">
                    <div class="h-item" id="uni">IOWA STATE UNIVERSITY</div>
                    <div class="h-item" id="name">SITI HUWAIDA</div>
                    <div class="h-item" id="info">
                        <div class="hi-item">
                            <i class="fas fa-phone icon-left"></i>
                            +6010-9052569</div>
                        <div class="hi-item">
                            <i class="fas fa-envelope icon-left"></i>
                            sitihuwaida94@gmail.com</div>
                        <div class="hi-item">
                            <i class="fas fa-home icon-left"></i>
                            A1-18-01, Kenwingston Residence, Persiaran Bestari <br>63000 Cyberjaya,
                            Selangor</div>
                    </div>
                </div>
                <div class="h-image" style="background-image: url('image/huwaida.jpg');
                background-position: center;
                background-size:cover;
                width: 190px;
                ">
                </div>
            </div>
 */
export default __;
