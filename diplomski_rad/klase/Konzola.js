class Konzola {
  static platnoHTML = null;
  static brojacCesticaHTML = null;
  static gravInputHTML = null;
  static otporInputHTML = null;
  static brojCesticaSlojaHTML = null;
  static xminCesticaHTML = null;
  static xmaxCesticaHTML = null;
  static yminCesticaHTML = null;
  static ymaxCesticaHTML = null;

  static gks = null;
  static paused = false;
  static brzina = 1000;
  static prviFrame = false;
  static brojacCestica = 0;
  static cesticeSave = null;
  static pocetnoStanjePotencijala = null;
  static potencijalSave = null;
  static topGranica = true;
  static leftGranica = true;
  static bottomGranica = true;
  static rightGranica = true;
  static gravitacija = new Fizika(9.81);
  static otpor = new Otpor(0.47);

  static brojCesticaSloja = 3500;
  static xminCestica = 0;
  static xmaxCestica = 10;
  static yminCestica = 0;
  static ymaxCestica = 10;

  static preciznostSimulacije = 1;

  static initKonzola(defaultVrijednosti, parametri) {
    let klikEksplozija = parametri.klikEksplozija;
    let gksXmin = parametri.gksXmin;
    let gksXmax = parametri.gksXmax;
    let gksYmin = parametri.gksYmin;
    let gksYmax = parametri.gksYmax;
    let listaPotencijala = parametri.listaPotencijala;
    let preciznostSimulacije = parametri.preciznostSimulacije;
    let prviFrame = parametri.prviFrame;
    this.platnoHTML = document.getElementById("canvas");
    this.brojacCesticaHTML = document.getElementById("particle-counter-value");
    document.getElementById("particle-number-setter-value").value =
      defaultVrijednosti.brEksplozije;
    this.gravInputHTML = document.getElementById("gravity-setter-value");
    this.gravInputHTML.value = defaultVrijednosti.gravitacija;
    this.otporInputHTML = document.getElementById("resistance-setter-value");
    this.otporInputHTML.value = defaultVrijednosti.otpor;
    let postavljeneGranice = document.getElementsByClassName("border-item");

    let topGranicaHTML = document.getElementById("top");
    let leftGranicaHTML = document.getElementById("left");
    let bottomGranicaHTML = document.getElementById("bottom");
    let rightGranicaHTML = document.getElementById("right");

    topGranicaHTML.className =
      "border-item" + (defaultVrijednosti.granice.top ? "" : "-selected");
    leftGranicaHTML.className =
      "border-item" + (defaultVrijednosti.granice.left ? "" : "-selected");
    bottomGranicaHTML.className =
      "border-item" + (defaultVrijednosti.granice.bottom ? "" : "-selected");
    rightGranicaHTML.className =
      "border-item" + (defaultVrijednosti.granice.right ? "" : "-selected");

    let nepostavljeneGranice = document.getElementsByClassName(
      "border-item-selected"
    );
    let granice = [...postavljeneGranice, ...nepostavljeneGranice];
    for (let i = 0; i < granice.length; i++) {
      let postaviGranicu = granice[i].classList.contains("border-item");
      switch (granice[i].id) {
        case "top":
          Konzola.topGranica = postaviGranicu;
          break;
        case "right":
          Konzola.rightGranica = postaviGranicu;
          break;
        case "bottom":
          Konzola.bottomGranica = postaviGranicu;
          break;
        case "left":
          Konzola.leftGranica = postaviGranicu;
          break;
      }
    }

    this.brojCesticaSlojaHTML = document.getElementById(
      "particle-layer-number-setter-value"
    );
    this.brojCesticaSlojaHTML.value = defaultVrijednosti.velicinaSloja;

    this.xminCesticaHTML = document.getElementById(
      "particle-layer-xmin-setter-value"
    );
    this.xminCesticaHTML.value = defaultVrijednosti.xminSloja;
    this.xmaxCesticaHTML = document.getElementById(
      "particle-layer-xmax-setter-value"
    );

    this.xmaxCesticaHTML.value = defaultVrijednosti.xmaxSloja;
    this.yminCesticaHTML = document.getElementById(
      "particle-layer-ymin-setter-value"
    );

    this.yminCesticaHTML.value = defaultVrijednosti.yminSloja;
    this.ymaxCesticaHTML = document.getElementById(
      "particle-layer-ymax-setter-value"
    );

    this.ymaxCesticaHTML.value = defaultVrijednosti.ymaxSloja;
    let cesticeArray = [];

    this.cesticeSave = new Proxy(cesticeArray, {
      set: function (target, key, value) {
        if (key === "length") {
          Konzola.brojacCesticaHTML.textContent = value;
        }
        target[key] = value;
        return true;
      },
    });

    Konzola.postaviGKS(gksXmin, gksXmax, gksYmin, gksYmax);
    Konzola.postaviKlik(klikEksplozija);
    Konzola.postaviGranice();
    Konzola.postaviGravitaciju();
    Konzola.postaviOtpor();
    Konzola.postaviPreciznostSimulacije(preciznostSimulacije);
    Konzola.spremiPocetnoStanjePotencijala(listaPotencijala);
    Konzola.postaviSlojCestica();
    Konzola.postaviPotencijale();
    Konzola.postaviHTML();
  }
  static postaviGKS(gksXmin, gksXmax, gksYmin, gksYmax) {
    this.gks = new GlobalniKoordinatniSustav(
      this.platnoHTML,
      gksXmin,
      gksXmax,
      gksYmin,
      gksYmax
    );
  }
  static postaviHTML() {}
  static postaviKlik(klikEksplozija) {
    this.platnoHTML.addEventListener(
      "click",
      (event) => {
        klikEksplozija(event, this.gks, this.cesticeSave, 1000);
      },
      false
    );
  }

  static azurirajBrzinuSimulacije(value) {
    Konzola.brzina = value;
  }

  static skaliraj(brzina) {
    brzina = Math.abs(brzina - 1001);
    return ((brzina - 1) / (1000 - 1)) * (30 - 1) + 1;
  }

  static postaviBrojac(element) {
    let cesticeArray = [];

    let cesticeProxy = new Proxy(cesticeArray, {
      set: function (target, key, value) {
        if (key === "length") {
          element.textContent = value;
        }
        target[key] = value;
        return true;
      },
    });

    this.cesticeSave = cesticeProxy;
    return this.cesticeSave;
  }

  static spremiPocetnoStanjePotencijala(potencijali) {
    if (!Array.isArray(potencijali)) {
      potencijali = [potencijali];
    }
    Konzola.potencijalSave = potencijali;
    Konzola.pocetnoStanjePotencijala = potencijali.map((p) => {
      let deepCopy = Konzola.deepClone(p);
      return deepCopy;
    });
  }

  //kod za deep copy preuzet s:
  //https://saturncloud.io/blog/what-is-the-most-efficient-way-to-deep-clone-an-object-in-javascript/
  //https://stackoverflow.com/questions/77353410/how-to-deep-clone-with-prototype-chain
  static deepClone(objekt) {
    if (objekt === null || typeof objekt !== "object") {
      return objekt;
    }

    let kopija = Object.create(Object.getPrototypeOf(objekt));

    for (let key in objekt) {
      if (Object.prototype.hasOwnProperty.call(objekt, key)) {
        kopija[key] = Konzola.deepClone(objekt[key]);
      }
    }

    return kopija;
  }

  static postaviGranice() {
    let postavljeneGranice = document.getElementsByClassName("border-item");
    let nepostavljeneGranice = document.getElementsByClassName(
      "border-item-selected"
    );
    let granice = [...postavljeneGranice, ...nepostavljeneGranice];
    for (let i = 0; i < granice.length; i++) {
      let postaviGranicu = granice[i].classList.contains("border-item");
      switch (granice[i].id) {
        case "top":
          Konzola.topGranica = postaviGranicu;
          break;
        case "right":
          Konzola.rightGranica = postaviGranicu;
          break;
        case "bottom":
          Konzola.bottomGranica = postaviGranicu;
          break;
        case "left":
          Konzola.leftGranica = postaviGranicu;
          break;
      }
    }
  }
  static granicaClick(event) {
    let odabranaGranica = event.target;
    if (odabranaGranica.className == "border-item") {
      odabranaGranica.className = "border-item-selected";
    } else {
      odabranaGranica.className = "border-item";
    }

    switch (odabranaGranica.id) {
      case "top":
        Konzola.topGranica = !Konzola.topGranica;
        break;
      case "right":
        Konzola.rightGranica = !Konzola.rightGranica;
        break;
      case "bottom":
        Konzola.bottomGranica = !Konzola.bottomGranica;
        break;
      case "left":
        Konzola.leftGranica = !Konzola.leftGranica;
        break;
    }
  }

  static promjenaGravitacije(event) {
    let vrijednostGravitacije = event.target.value;
    if (
      vrijednostGravitacije < 0 ||
      vrijednostGravitacije > 100000 ||
      isNaN(vrijednostGravitacije) ||
      !vrijednostGravitacije
    ) {
      vrijednostGravitacije = 9.81;
    }
    Konzola.gravitacija = new Fizika(Number.parseFloat(vrijednostGravitacije));
  }

  static postaviGravitaciju() {
    Konzola.gravitacija = new Fizika(this.gravInputHTML.value);
  }

  static promjenaOtpora(event) {
    let vrijednostOtpora = event.target.value;
    if (
      vrijednostOtpora < 0 ||
      vrijednostOtpora > 100000 ||
      isNaN(vrijednostOtpora) ||
      !vrijednostOtpora
    ) {
      vrijednostOtpora = 0.47;
    }
    Konzola.otpor = new Otpor(Number.parseFloat(vrijednostOtpora));
  }

  static postaviOtpor(otpor) {
    Konzola.otpor = new Otpor(this.otporInputHTML.value);
  }

  static postaviPotencijale() {
    let selection = document.getElementById("selector");

    for (let i = 0; i < this.potencijalSave.length; i++) {
      let option = document.createElement("option");
      option.className = "potential-selector-option";
      option.value = this.potencijalSave[i].id;
      option.textContent =
        this.potencijalSave[i].id +
        " [" +
        this.potencijalSave[i].constructor.name +
        "]";
      selection.appendChild(option);
      if (i == 0) {
        Konzola.postaviHTMLPotencijal(1);
      }
    }
    selection.selectedIndex = 0;
    selection.addEventListener("change", (event) => {
      let potencijalId = event.explicitOriginalTarget.value;
      Konzola.postaviHTMLPotencijal(potencijalId);
    });
  }

  static postaviHTMLPotencijal(potencijalId) {
    let odabraniPotencijal = this.potencijalSave.find(
      (element) => potencijalId == element.id
    );

    let atributiPotencijala =
      document.getElementsByClassName("potential-settings")[0];
    for (let j = 0; j < atributiPotencijala.children.length; j++) {
      let child = atributiPotencijala.children[j];
      switch (child.id) {
        case "charge-setter":
          child.querySelector("#charge-setter-value").value =
            odabraniPotencijal.naboj;
          break;
        case "coefficient-setter":
          child.querySelector("#coefficient-setter-value").value =
            odabraniPotencijal.k;
          break;
        case "distance-coefficient-setter":
          child.querySelector("#distance-coefficient-setter-value").value =
            odabraniPotencijal.potencijalUdaljenosti;
          break;
        case "potential-position-setter":
          child.querySelector("#potential-x-position-setter-value").value =
            odabraniPotencijal.r.x;
          child.querySelector("#potential-y-position-setter-value").value =
            odabraniPotencijal.r.y;
          break;
      }
    }
  }

  static promjenaNaboja(event) {
    let selector = document.getElementById("selector");
    let trenutniPotencijal = this.potencijalSave.find(
      (element) => selector.options[selector.selectedIndex].value == element.id
    );

    let trenutniPocetniPotencijal = this.pocetnoStanjePotencijala.find(
      (element) => selector.options[selector.selectedIndex].value == element.id
    );

    trenutniPocetniPotencijal.naboj = event.target.value;
    trenutniPotencijal.naboj = event.target.value;
  }

  static promjenaKoeficijenta(event) {
    let selector = document.getElementById("selector");
    let trenutniPotencijal = this.potencijalSave.find(
      (element) => selector.options[selector.selectedIndex].value == element.id
    );
    let trenutniPocetniPotencijal = this.pocetnoStanjePotencijala.find(
      (element) => selector.options[selector.selectedIndex].value == element.id
    );

    trenutniPocetniPotencijal.k = event.target.value;
    trenutniPotencijal.k = event.target.value;
  }

  static promjenaKoeficijentaUdaljenosti(event) {
    let selector = document.getElementById("selector");
    let trenutniPotencijal = this.potencijalSave.find(
      (element) => selector.options[selector.selectedIndex].value == element.id
    );
    let trenutniPocetniPotencijal = this.pocetnoStanjePotencijala.find(
      (element) => selector.options[selector.selectedIndex].value == element.id
    );

    trenutniPocetniPotencijal.potencijalUdaljenosti = event.target.value;
    trenutniPotencijal.potencijalUdaljenosti = event.target.value;
  }

  static promjenaPozicijePotencijalaX(event) {
    let selector = document.getElementById("selector");
    let trenutniPotencijal = this.potencijalSave.find(
      (element) => selector.options[selector.selectedIndex].value == element.id
    );
    let trenutniPocetniPotencijal = this.pocetnoStanjePotencijala.find(
      (element) => selector.options[selector.selectedIndex].value == element.id
    );

    trenutniPocetniPotencijal.r.x = event.target.value;
    trenutniPotencijal.r.x = event.target.value;
  }
  static promjenaPozicijePotencijalaY(event) {
    let selector = document.getElementById("selector");
    let trenutniPotencijal = this.potencijalSave.find(
      (element) => selector.options[selector.selectedIndex].value == element.id
    );
    let trenutniPocetniPotencijal = this.pocetnoStanjePotencijala.find(
      (element) => selector.options[selector.selectedIndex].value == element.id
    );

    trenutniPocetniPotencijal.r.y = event.target.value;
    trenutniPotencijal.r.y = event.target.value;
  }

  static postaviSlojCestica() {
    this.brojCesticaSloja = Number.parseInt(this.brojCesticaSlojaHTML.value);
    this.xminCestica = Number.parseFloat(this.xminCesticaHTML.value);
    this.xmaxCestica = Number.parseFloat(this.xmaxCesticaHTML.value);
    this.yminCestica = Number.parseFloat(this.yminCesticaHTML.value);
    this.ymaxCestica = Number.parseFloat(this.ymaxCesticaHTML.value);
    let generiraneCestice = generirajStacionarneCestice(
      this.brojCesticaSloja,
      this.xminCestica,
      this.xmaxCestica,
      this.yminCestica,
      this.ymaxCestica
    );

    for (let i = 0; i < generiraneCestice.length; i++)
      this.cesticeSave.push(generiraneCestice[i]);
    return generiraneCestice;
  }
  static promjenaCesticaSloja(event) {
    this.brojCesticaSloja = Number.parseInt(event.target.value);
  }
  static promjenaXMinSloja(event) {
    this.xminCestica = Number.parseFloat(event.target.value);
  }
  static promjenaXMaxSloja(event) {
    this.xmaxCestica = Number.parseFloat(event.target.value);
  }
  static promjenaYMinSloja(event) {
    this.yminCestica = Number.parseFloat(event.target.value);
  }
  static promjenaYMaxSloja(event) {
    this.ymaxCestica = Number.parseFloat(event.target.value);
  }

  static postaviPreciznostSimulacije(value) {
    this.preciznostSimulacije = Number.parseInt(value);
  }

  static start() {
    Konzola.paused = false;
  }
  static stop() {
    Konzola.paused = true;
  }
  static reload() {
    location.reload(true);
  }

  static reset() {
    while (Konzola.cesticeSave.length > 0) {
      Konzola.cesticeSave.pop();
    }
    while (Konzola.potencijalSave.length > 0) {
      Konzola.potencijalSave.pop();
    }

    this.postaviSlojCestica(
      this.brojCesticaSloja,
      this.xminCestica,
      this.xmaxCestica,
      this.yminCestica,
      this.ymaxCestica
    );

    Konzola.pocetnoStanjePotencijala.map((p) => {
      let deepCopy = Konzola.deepClone(p);
      Konzola.potencijalSave.push(deepCopy);
    });
  }
}
