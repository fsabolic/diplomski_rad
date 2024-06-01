class Konzola {
  static paused = false;
  static brzina = 1000;
  static prviFrame = false;
  static brojacCestica = 0;
  static pocetnoStanjeCestica = null;
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
  static start() {
    Konzola.paused = false;
  }
  static stop() {
    Konzola.paused = true;
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

    return cesticeProxy;
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
  static spremiPocetnoStanjeCestica(cestice) {
    Konzola.cesticeSave = cestice;
    Konzola.pocetnoStanjeCestica = cestice.map((cestica) => {
      let deepCopy = Konzola.deepClone(cestica);
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

    Konzola.cesticeSave.push(
      ...this.postaviSlojCestica(
        this.brojCesticaSloja,
        this.xminCestica,
        this.xmaxCestica,
        this.yminCestica,
        this.ymaxCestica
      )
    );

    Konzola.pocetnoStanjePotencijala.map((p) => {
      let deepCopy = Konzola.deepClone(p);
      Konzola.potencijalSave.push(deepCopy);
    });
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

  static postaviGravitaciju(gravitacija) {
    Konzola.gravitacija = gravitacija;
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
    Konzola.otpor = otpor;
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

  static postaviSlojCestica(
    brojCesticaSloja,
    xminCestica,
    xmaxCestica,
    yminCestica,
    ymaxCestica
  ) {
    this.brojCesticaSloja = brojCesticaSloja;
    this.xminCestica = xminCestica;
    this.xmaxCestica = xmaxCestica;
    this.yminCestica = yminCestica;
    this.ymaxCestica = ymaxCestica;
    let generiraneCestice = generirajStacionarneCestice(
      brojCesticaSloja,
      xminCestica,
      xmaxCestica,
      yminCestica,
      ymaxCestica
    );

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
}
