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
  constructor(param) {
    this.d = huwaida.body;
    this.d = { ...this.d, ...param };
  }
  title(txt, icon) {
    return m("div.b-title", [getIconLeft(icon), txt]);
  }
  section(id, mTitle, mBody) {
    return m("div", { id: id, class: "section" }, [mTitle, mBody]);
  }
  objective() {
    return this.section(
      "objective",
      this.title("Objective", "bullseye"),
      m("p", this.d.objective)
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
    return this.tableContent(
      "curricular",
      "Curriculars",
      "list",
      this.d.curricular
    );
  }
  experience() {
    return this.tableContent(
      "experience",
      "Experiences",
      "suitcase",
      this.d.experience
    );
  }
  aboutMe() {
    return this.section(
      "about-me",
      this.title("About Me", "user"),
      m("ul.simple-list", [
        simplelist_li("Name", this.d.name),
        simplelist_li("Date of Birth", this.d.dob),
        simplelist_li("Nationality", this.d.nationality),
        simplelist_li("Sponsor", this.d.sponsor)
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
  var paramBody = {
    objective:
      "Looking for admin position with One Diversity Sdn. Bhd. to utilize my skills and experiences"
  };

  function getEditDataBody(key, btnLabel, promptLabel) {
    return m(
      ".edit-data",
      m(
        "button",
        {
          onclick: () => {
            var obj = prompt(promptLabel, paramBody[key]);
            if (obj != null) {
              paramBody[key] = obj;
            }
          }
        },
        btnLabel
      )
    );
  }

  return {
    view: () => {
      let header = new Header();
      let body = new Body(paramBody);
      return m("div", [
        getEditDataBody(
          "objective",
          "Edit Objective",
          "Enter custom objective"
        ),
        header.view(),
        body.view()
      ]);
    }
  };
}

export default __;
