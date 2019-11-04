import m from "mithril";

function getIconLeft(icon) {
  return m("i", { class: `fas fa-${icon} icon-left` }, null);
}

function getIcon(icon, className = "") {
  return m("i", { class: `fas fa-${icon} ${className}` }, null);
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
    this.d = {
      image: "image/huwaida.jpg",
      university: "Iowa State University",
      name: "Siti Huwaida",
      phone: "+6010-9052569",
      email: "sitihuwaida94@gmail.com",
      address:
        "A1-18-01, Kenwingston Residence, Persiaran Bestari 63000 Cyberjaya, Selangor"
    };
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
      reference: [
        {
          name: "Dr. Bethlin Hartmann",
          title: "Senior Lecturer",
          tel: "+1 (515) 294-8190",
          email: "bethlin@iastate.edu"
        },
        {
          name: "Dr. Oleg Zarechnyy",
          title: "Lecturer",
          tel: "+1 (515) 294-0096",
          email: "olegzar@iastate.edu"
        }
      ],
      experience: [
        {
          title: "Server",
          duration: "Sept 2015 - July 2018",
          location: "ISU Dining",
          detail:
            "Serving food to customers, as well as communicating efficiently with customers. Learned to work under pressure in fast paced working environment, while maintaining good relationship with customers and co-workers"
        },
        {
          title: "Site Engineer",
          duration: "Jan 2018 - May 2018",
          location: "C.E. Capstone Project",
          detail:
            "Designed and developed site for Ames Wellness Center project. Working with other team members, especially geotechnical engineer and architecture to develop the project site. Self-learned Auto CAD Civil 3D software and completed technical design within a month. Learned to work under pressure while holding up commitments for other senior projects and classes."
        },
        {
          title: "Highway Designer",
          duration: "Jan 2018 - May 2018",
          location: "Highway Design Class",
          detail:
            "Working with team members to design and develop highway in all aspects (speed limit, vertical and horizontal curve, etc). Responsible inhandling all software related processes to work onthe design for the team."
        }
      ],
      socialMedia: [
        {
          icon: "linkedin-in",
          color: "blue",
          val: "http://linkedin.com/in/siti-huwaida-muhammad-ghanisma-815498128"
        }
      ],
      education: [
        {
          title: "Bachelor Of Civil Engineering",
          duration: "2014 - 2018",
          location:
            "INTI International University, Nilai, Malaysia - Iowa State University, Ames, United States",
          detail:
            "Civil engineering oriented syllabus with additional subjects: Technical Communication, Engr Statistics, Speech Communication, etc."
        },
        {
          title: "International Baccalaureate Diploma",
          duration: "2012 - 2014",
          location: "Kolej MARA Banting",
          detail:
            "General sciences courses related to engineering – Physics, Chemistry, Mathematics, Malay Language (Higher Level) and Information Technology in a Global Society, English Language (Standard Level)"
        }
      ],
      name: "Siti Huwaida Muhammad Ghanisma",
      dob: "15 January 1994",
      nationality: "Malaysian",
      sponsor: "MARA",
      objective:
        "Looking for admin position with One Diversity Sdn. Bhd. to utilize my skills and experiences",
      proSkill: [
        { label: "AutoCAD Civil 3D", level: 3 },
        { label: "AutoCAD Revit", level: 4 },
        { label: "Microsoft Word", level: 7 },
        { label: "Microsoft Excel", level: 7 },
        { label: "Microsoft Office", level: 8 }
      ],
      personalSkill: [
        { label: "Communication", level: 8 },
        { label: "Team Working", level: 9 }
      ],
      language: [{ label: "English", level: 8 }, { label: "Malay", level: 9 }]
    };
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
      return table_li(
        [m("b", d.title), m("br"), d.duration],
        [m("b", d.location), m("br"), m("p", d.detail)]
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
          getIcon(d.icon)
        ),
        m("div.soc-val", m("a", { href: d.val, target: "_blank" }, d.val))
      ]);
    });

    return this.section(
      "social-media",
      this.title("Social Media", "home"),
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
      m("div.b-right", [this.objective(), this.experience(), this.education()])
    ]);
    return body;
  }
}

var __ = {
  view: () => {
    let header = new Header();
    let body = new Body();
    return m("div", [header.view(), body.view()]);
  }
};

export default __;
