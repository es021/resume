import m from "mithril";

function getIcon(icon) {
  return m("i", { class: `fas fa-${icon} icon-left` }, null)
}

function simplelist_li(label, val) {
  return m("li", [
    m("div.li-label", label),
    m("div.li-val", val),
  ])
}

function table_li(label, val) {
  return m("li", [
    m("div.li-label", label),
    m("div.li-val", val),
  ])
}

class Header {
  constructor() {
    this.d = {
      image: "image/huwaida.jpg",
      university: "Iowa State University",
      name: "Siti Huwaida",
      phone: "+6010-9052569",
      email: "sitihuwaida94@gmail.com",
      address: "A1-18-01, Kenwingston Residence, Persiaran Bestari 63000 Cyberjaya, Selangor",
    }
  }
  _h_item(id, content) {
    return m("div", { id: id, class: "h-item" }, content);
  }
  _hi_item(icon, text) {
    return m("div", { class: "hi-item" }, [
      getIcon(icon),
      m.trust(text)
    ]);
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
                width: 190px;`
      },
      null
    );

    let header = m("div", { class: "header" }, [hItem, image]);
    return header;
  }
}


class Body {
  constructor() {
    this.d = {
      experience: [
        {
          title: "Server", duration: "Sept 2015 - July 2018", location: "ISU Dining",
          detail: "Serving food to customers, as well as communicating efficiently with customers. Learned to work under pressure in fast pacedworking environment, while maintaining good relationship with customers and co-workers"
        },
        {
          title: "Server 2", duration: "Sept 2015 - July 2018", location: "ISU Dining",
          detail: "Serving food to customers, as well as communicating efficiently with customers. Learned to work under pressure in fast pacedworking environment, while maintaining good relationship with customers and co-workers"
        }
      ],
      name: "Siti Huwaida Muhammad Ghanisma",
      dob: "15 January 1994",
      nationality: "Malaysian",
      sponsor: "MARA",
      objective: "Looking for admin position with One Diversity Sdn. Bhd. to utilize my skills and experiences"
    }
  }
  title(txt, icon) {
    return m("div.b-title", [
      getIcon(icon),
      txt
    ])
  }
  section(id, mTitle, mBody) {
    return m("div", { id: id, class: "section" }, [
      mTitle,
      mBody
    ])
  }
  objective() {
    return this.section(
      "objective",
      this.title("Objective", "star"),
      m("p", this.d.objective),
    )
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
      ]),
    )
  }
  experience() {
    let list = this.d.experience.map((d, i) => {
      return table_li(
        [m("b", d.title), m("br"), d.duration],
        [m("b", d.location), m("br"), m("p", d.detail)]
      )
    })

    return this.section(
      "experience",
      this.title("Experiences", "suitcase"),
      m("ul.table-list", [
        list
      ]),
    )
  }
  view() {
    let body = m("div.body",
      [
        m("div.b-left",
          [
            this.aboutMe()
          ]
        ),
        m("div.b-right",
          [
            this.objective(),
            this.experience()
          ]
        ),
      ]
    );
    return body;
  }
}

var __ = {
  view: () => {
    let header = new Header();
    let body = new Body();
    return m("div", [header.view(), body.view()]);
  }
}

export default __;
