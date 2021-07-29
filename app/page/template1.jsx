import m from "mithril";
import huwaida from "../data/huwaida";

function getIconLeft(icon) {
  return m("i", { class: `fas fa-${icon} icon-left` }, null);
}

function getIcon(icon, className = "") {
  return m("i", { class: `fas fa-${icon} ${className}` }, null);
}

function getIconFab(icon, className = "") {
  return m("i", { class: `fab fa-${icon} ${className}` }, null);
}

function simplelist_li(label, val) {
  return m("li", [m("div.li-label", label), m("div.li-val", val)]);
}

function levellist_li(label, level = 0, toplevel = 0) {
  let levelArr = [];
  for (var i = 1; i <= toplevel; i++) {
    levelArr.push(getIcon("star", i <= level ? "selected" : ""));
  }
  return m("li", [m("div.li-label", label), m("div.li-level", levelArr)]);
}

function table_li(label, val) {
  return m("li", [m("div.li-label", label), m("div.li-val", val)]);
}

class Header {
  constructor() {
    this.d = huwaida.header;
  }
  _h_item(id, content) {
    return m("div", { id: id, class: "h-item" }, content);
  }
  _hi_item(icon, text) {
    return m("div", { class: "hi-item" }, [getIconLeft(icon), m.trust(text)]);
  }
  view() {
    let hItem = m("div", { class: "h-info" }, [
      this._h_item("uni", this.d.university),
      this._h_item("name", this.d.name),
      this._h_item("info", [
        this._hi_item("phone", this.d.phone),
        this._hi_item("envelope", this.d.email),
        this._hi_item("home", this.d.address)
      ])
    ]);

    let image = m(
      "div",
      {
        class: "h-image",
        style: `background-image: url('${this.d.image}');
                background-position: center;
                background-size:cover;
                width: 160px;`
      },
      null
    );

    let header = m("div", { class: "header-app" }, [hItem, image]);
    return header;
  }
}

class Body {
  constructor(defaultParam, customParam) {
    this.d = { ...defaultParam, ...customParam };
  }
  title(txt, icon) {
    return m("div.b-title", [getIconLeft(icon), txt]);
  }
  section(id, mTitle, mBody) {
    return m("div", { id: id, class: "section" }, [mTitle, mBody]);
  }
  objective() {
    let text = this.d.objective;
    text = text.replace("{{POSITION}}", this.d.position)
    text = text.replace("{{COMPANY}}", this.d.company)
    return this.section(
      "objective",
      this.title("Objective", "bullseye"),
      m("p", text)
    );
  }
  level(id, title, icon, data) {
    let li = data.map((d, i) => {
      return levellist_li(d.label, d.level, 10);
    });
    return this.section(id, this.title(title, icon), m("ul.level-list", li));
  }
  tableContent(id, title, icon, data) {
    /**
     * data {title, duration, location, detail}
     */

    let list = data.map((d, i) => {
      let detail = null;
      if (Array.isArray(d.detail)) {
        detail = m("ul.basic", [
          d.detail.map((dd, di) => {
            return m("li", dd);
          })
        ]);
      } else {
        detail = m("p", d.detail);
      }

      return table_li(
        [m("b", d.title), m("br"), d.duration],
        [m("b", d.location), m("br"), detail]
      );
    });

    return this.section(
      id,
      this.title(title, icon),
      m("ul.table-list", [list])
    );
  }
  education() {
    return this.tableContent(
      "education",
      "Educations",
      "graduation-cap",
      this.d.education
    );
  }
  curricular() {
    let list = this.d.curricular.map((d, i) => {
      return m("li", [
        m("div.cur-title", [d.title, m("span.cur-duration", " (" + d.duration + ")")]),
      ]);
    });

    return this.section(
      "curricular",
      this.title("Curricular", "list"),
      m("ul.list-curricular", [list])
    );
  }
  experience() {
    let items = this.d.experience.map((d, i) => {
      let list = d.detail.map((_d, _i) => {
        return m("li", _d);
      });
      return m("div", { style: "font-size:13px" }, [
        m("b", d.title),
        m("br"),
        m("span", d.location),
        m("span", { style: "margin-left:7px; color:#3c3b3b;", }, "(" + d.duration + ")"),
        m("ul", { style: "margin-left:-22px;" }, list)
      ])
    })
    return this.section(
      "experience",
      this.title("Experiences", "suitcase"),
      m("div", { style: "margin-top:7px;" }, items)
    );

    // return this.tableContent(
    //   "experience",
    //   "Experiences",
    //   "suitcase",
    //   this.d.experience
    // );
  }
  aboutMe() {
    return this.section(
      "about-me",
      this.title("About Me", "user"),
      m("ul.simple-list", [
        simplelist_li("Name", this.d.name),
        simplelist_li("Date of Birth", this.d.dob),
        simplelist_li("Nationality", this.d.nationality),
        simplelist_li("Sponsor", this.d.sponsor),
        simplelist_li("Last Drawn Salary", this.d.last_salary),
      ])
    );
  }
  proSkill() {
    return this.level(
      "pro-skill",
      "Professional Skills",
      "file-alt",
      this.d.proSkill
    );
  }
  personalSkill() {
    return this.level(
      "personal-skill",
      "Personal Skills",
      "star",
      this.d.personalSkill
    );
  }
  language() {
    return this.level("languages", "Languages", "language", this.d.language);
  }
  reference() {
    /**
     * data {name, title, tel, email}
     */
    let list = this.d.reference.map((d, i) => {
      return m("li", [
        m("div.ref-name", d.name),
        m("div.ref-title", d.title),
        m("div.ref-tel", d.tel),
        m("div.ref-email", d.email)
      ]);
    });

    return this.section(
      "reference",
      this.title("References", "share-alt"),
      m("ul.list-ref", [list])
    );
  }
  socialMedia() {
    /**
     * data {icon, val}
     */
    let list = this.d.socialMedia.map((d, i) => {
      return m("li", [
        m(
          "div.soc-icon",
          { style: `background : ${d.color}` },
          getIconFab(d.icon)
        ),
        m("div.soc-val", m("a", { href: d.val, target: "_blank" }, d.val))
      ]);
    });

    return this.section(
      "social-media",
      this.title("Social Media", "wifi"),
      m("ul.list-social-media", [list])
    );
  }
  view() {
    let body = m("div.body", [
      m("div.b-left", [
        this.aboutMe(),
        this.proSkill(),
        this.personalSkill(),
        this.language(),
        this.reference(),
        this.socialMedia()
      ]),
      m("div.b-right", [this.objective(), this.education(), this.experience(), this.curricular()])
    ]);
    return body;
  }
}

// var __ = {
//   view: () => {
//     let header = new Header();
//     let body = new Body({
//       objective: "Asdasd"
//     });

//     return m("div", [header.view(), body.view()]);
//     //return m("div", [ body.view()]);
//   }
// };

function __(initialVnode) {
  var defaultParam = huwaida.body;
  var customParam = {
    position: defaultParam.position,
    company: defaultParam.company,
  };

  function getEditDataBody(key, btnLabel, promptLabel) {
    return m(
      "button",
      {
        onclick: () => {
          var obj = prompt(promptLabel, customParam[key]);
          if (obj != null) {
            customParam[key] = obj;
          }
        }
      },
      btnLabel
    );
  }

  return {
    view: () => {
      let header = new Header();
      let body = new Body(defaultParam, customParam);
      return m("div", [
        m(
          "div.edit-data-container",
          [
            getEditDataBody(
              "objective",
              "Edit Objective",
              "Enter custom objective"
            ),
            m("br"),
            getEditDataBody(
              "position",
              "Edit Position",
              "Enter custom position"
            ),
            m("br"),
            getEditDataBody(
              "company",
              "Edit Company",
              "Enter custom company"
            )
          ]
        ),
        header.view(),
        body.view()
      ]);
    }
  };
}

export default __;
