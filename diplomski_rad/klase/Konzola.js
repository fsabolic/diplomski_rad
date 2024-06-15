class Konzola {
  //Kljucni HTML elementi
  static platnoHTML = null;
  static brojacCesticaHTML = null;
  static brojEksplozijeHTML = null;
  static gravInputHTML = null;
  static otporInputHTML = null;
  static topGranicaHTML = null;
  static leftGranicaHTML = null;
  static bottomGranicaHTML = null;
  static rightGranicaHTML = null;
  static preciznostHTML = null;
  static vrstaKlikaHTML = null;
  static brojCesticaSlojaHTML = null;
  static xminCesticaHTML = null;
  static xmaxCesticaHTML = null;
  static yminCesticaHTML = null;
  static ymaxCesticaHTML = null;
  static potencijaliHTML = null;

  //Parametri
  static preciznostSimulacije = 1;
  static prviFrame = false;
  static paused = false;
  static brzina = 1000;
  static gks = null;
  static topGranica = true;
  static leftGranica = true;
  static bottomGranica = true;
  static rightGranica = true;
  static brojCesticaEksplozije = 1000;
  static gravitacija = new Fizika(9.81);
  static otpor = new Otpor(0.47);
  static potencijalSave = null;
  static brojCesticaSloja = 0;
  static xminCestica = 0;
  static xmaxCestica = 10;
  static yminCestica = 0;
  static ymaxCestica = 10;

  //Varijable klase
  static brojacCestica = 0;
  static cesticeSave = null;
  static pocetnoStanjePotencijala = null;
  static posljednjiDodaniEventListener = null;

  static initKonzola(parametri) {
    if (parametri == null) {
      throw Error("Parametri simulacije nisu definirani");
    }
    this.dohvatiKljucneHtmlElemente();
    this.postaviDefaultVrijednosti(parametri);
    this.postaviDefaultHtmlVrijednosti(parametri);

    this.postaviEksplozijuNaKlik(parametri.klikEksplozija);
  }

  static dohvatiKljucneHtmlElemente() {
    this.platnoHTML = this.vratiElementIliError("canvas", "Platno");
    this.brojacCesticaHTML = this.vratiElementIliError(
      "particle-counter-value",
      "Brojač čestica"
    );
    this.brojEksplozijeHTML = this.vratiElementIliError(
      "particle-number-setter-value",
      "Broj eksplozije"
    );
    this.gravInputHTML = this.vratiElementIliError(
      "gravity-setter-value",
      "Ulaz za gravitaciju"
    );
    this.otporInputHTML = this.vratiElementIliError(
      "resistance-setter-value",
      "Ulaz za otpor"
    );
    this.topGranicaHTML = this.vratiElementIliError("top", "Gornja granica");
    this.leftGranicaHTML = this.vratiElementIliError("left", "Lijeva granica");
    this.bottomGranicaHTML = this.vratiElementIliError(
      "bottom",
      "Donja granica"
    );
    this.rightGranicaHTML = this.vratiElementIliError("right", "Desna granica");
    this.preciznostHTML = this.vratiElementIliError(
      "simulation-precision-value",
      "Preciznost simulacije"
    );
    this.vrstaKlikaHTML = this.vratiElementIliError(
      "click-handler-radio",
      "Radnja na klik"
    );

    this.brojCesticaSlojaHTML = this.vratiElementIliError(
      "particle-layer-number-setter-value",
      "Broj čestica sloja"
    );
    this.xminCesticaHTML = this.vratiElementIliError(
      "particle-layer-xmin-setter-value",
      "Xmin čestica"
    );
    this.xmaxCesticaHTML = this.vratiElementIliError(
      "particle-layer-xmax-setter-value",
      "Xmax čestica"
    );
    this.yminCesticaHTML = this.vratiElementIliError(
      "particle-layer-ymin-setter-value",
      "Ymin čestica"
    );
    this.ymaxCesticaHTML = this.vratiElementIliError(
      "particle-layer-ymax-setter-value",
      "Ymax čestica"
    );
    this.potencijaliHTML = this.vratiElementIliError(
      "selector",
      "Odabir potencijala"
    );
  }

  static vratiElementIliError(id, poruka) {
    let element = document.getElementById(id);
    if (element == null) {
      throw Error(poruka + " (#" + id + ") " + "mora biti definiran");
    }
    return element;
  }

  static postaviDefaultVrijednosti(parametri) {
    this.preciznostSimulacije = Number.parseInt(parametri.preciznostSimulacije);
    this.gks = new GlobalniKoordinatniSustav(
      this.platnoHTML,
      parametri.gksXmin,
      parametri.gksXmax,
      parametri.gksYmin,
      parametri.gksYmax
    );
    this.topGranica = parametri.granice.top;
    this.rightGranica = parametri.granice.right;
    this.bottomGranica = parametri.granice.bottom;
    this.leftGranica = parametri.granice.left;
    this.brojCesticaEksplozije = parametri.brEksplozije;
    this.gravitacija = new Fizika(parametri.gravitacija);
    this.otpor = new Otpor(parametri.otpor);
    this.brojCesticaSloja = parametri.velicinaSloja;
    this.xminCestica = parametri.xminSloja;
    this.xmaxCestica = parametri.xmaxSloja;
    this.yminCestica = parametri.yminSloja;
    this.ymaxCestica = parametri.ymaxSloja;
    this.prviFrame = parametri.prviFrame;
    this.spremiIPostaviPotencijale(parametri.listaPotencijala);
    this.postaviProxyZaCestice();
    this.postaviSlojCestica();
  }

  static spremiIPostaviPotencijale(potencijali) {
    if (!Array.isArray(potencijali)) potencijali = [potencijali];
    this.potencijalSave = potencijali;
    this.pocetnoStanjePotencijala = potencijali.map((p) => {
      let deepCopy = this.deepClone(p);
      return deepCopy;
    });
  }

  //kod za deep copy preuzet s:s
  //https://saturncloud.io/blog/what-is-the-most-efficient-way-to-deep-clone-an-object-in-javascript/
  //https://stackoverflow.com/questions/77353410/how-to-deep-clone-with-prototype-chain
  static deepClone(objekt) {
    if (objekt === null || typeof objekt !== "object") {
      return objekt;
    }

    let kopija = Object.create(Object.getPrototypeOf(objekt));

    for (let key in objekt) {
      if (Object.prototype.hasOwnProperty.call(objekt, key)) {
        kopija[key] = this.deepClone(objekt[key]);
      }
    }

    return kopija;
  }

  static postaviProxyZaCestice() {
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
  }

  static postaviSlojCestica() {
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

  static postaviDefaultHtmlVrijednosti(defaultVrijednosti) {
    this.brojEksplozijeHTML.value = defaultVrijednosti.brEksplozije;
    this.gravInputHTML.value = defaultVrijednosti.gravitacija;
    this.otporInputHTML.value = defaultVrijednosti.otpor;
    this.topGranicaHTML.className =
      "border-item" + (defaultVrijednosti.granice.top ? "" : "-selected");
    this.leftGranicaHTML.className =
      "border-item" + (defaultVrijednosti.granice.left ? "" : "-selected");
    this.bottomGranicaHTML.className =
      "border-item" + (defaultVrijednosti.granice.bottom ? "" : "-selected");
    this.rightGranicaHTML.className =
      "border-item" + (defaultVrijednosti.granice.right ? "" : "-selected");

    this.preciznostHTML.value = defaultVrijednosti.preciznostSimulacije;

    for (let i = 0; i < this.vrstaKlikaHTML.children.length; i++) {
      if (
        this.vrstaKlikaHTML.children[i].value ==
        defaultVrijednosti.klikEksplozija.name
      ) {
        this.vrstaKlikaHTML.children[i].checked = true;
      }
    }

    this.brojCesticaSlojaHTML.value = defaultVrijednosti.velicinaSloja;
    this.xminCesticaHTML.value = defaultVrijednosti.xminSloja;
    this.xmaxCesticaHTML.value = defaultVrijednosti.xmaxSloja;
    this.yminCesticaHTML.value = defaultVrijednosti.yminSloja;
    this.ymaxCesticaHTML.value = defaultVrijednosti.ymaxSloja;
    this.postaviHtmlPotencijale();
  }

  static postaviHtmlPotencijale() {
    for (let i = 0; i < this.potencijalSave.length; i++) {
      let option = this.stvortiHtmlPotencijal(this.potencijalSave[i]);
      this.potencijaliHTML.appendChild(option);
      if (i == 0) {
        this.postaviHtmlPotencijal(1);
      }
    }
    this.potencijaliHTML.selectedIndex = 0;
    this.potencijaliHTML.addEventListener("change", (event) => {
      let potencijalId = event.explicitOriginalTarget.value;
      this.postaviHtmlPotencijal(potencijalId);
    });
  }

  static stvortiHtmlPotencijal(potencijal) {
    let option = document.createElement("option");
    option.className = "potential-selector-option";
    option.value = potencijal.id;
    option.textContent =
      potencijal.id + " [" + potencijal.constructor.name + "]";
    return option;
  }
  static postaviHtmlPotencijal(potencijalId) {
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
        case "max-distance-setter":
          child.querySelector("#max-distance-setter-value").value =
            odabraniPotencijal.maxUdaljenost;
          break;
        case "min-distance-setter":
          child.querySelector("#min-distance-setter-value").value =
            odabraniPotencijal.minUdaljenost;
          break;
        case "x-influence-setter":
          child.querySelector("#x-influence-setter-value").value =
            odabraniPotencijal.xMnozitelj;
          break;
        case "potential-y-position-setter":
          child.querySelector("#potential-y-position-setter-value").value =
            odabraniPotencijal.r.y;
          break;
        case "potential-x-position-setter":
          child.querySelector("#potential-x-position-setter-value").value =
            odabraniPotencijal.r.x;
          break;
      }
    }
  }
  /*
  static postaviEksplozijuNaKlik(klikEksplozija) {
    this.postaviNaPlatnoKlik((event) => {
      klikEksplozija(event, this.gks, this.cesticeSave, 1000);
    });
  }
  */

  /*
  static postaviEksplozijuNaKlik(klikEksplozija) {
    this.postaviNaPlatnoKlik(async (event) => {
      let centar = dohvatiPozicijuKlika(event);
      let dobiveneCestice = await klikEksplozija(
        centar[0],
        centar[1],
        this.brojCesticaEksplozije
      );
      for (let i = 0; i < this.brojCesticaEksplozije; i++) {
        this.cesticeSave.push(dobiveneCestice[i]);
      }

      function dohvatiPozicijuKlika(event) {
        let canvasGranica = window.getComputedStyle(Konzola.platnoHTML);
        let centarX = event.clientX - Konzola.platnoHTML.offsetLeft;
        let centarY = event.clientY - Konzola.platnoHTML.offsetTop;
        let centar = Konzola.gks.transformirajPiksele(
          centarX - parseFloat(canvasGranica.borderLeftWidth),
          centarY - parseFloat(canvasGranica.borderRightWidth)
        );
        return centar;
      }
    });
  }
*/
  static postaviEksplozijuNaKlik(klikEksplozija) {
    this.postaviNaPlatnoKlik((event) => {
      let centar = dohvatiPozicijuKlika(event);
      klikEksplozija(
        centar[0],
        centar[1],
        this.brojCesticaEksplozije,
        this.cesticeSave
      );

      function dohvatiPozicijuKlika(event) {
        let canvasGranica = window.getComputedStyle(Konzola.platnoHTML);
        let centarX = event.clientX - Konzola.platnoHTML.offsetLeft;
        let centarY = event.clientY - Konzola.platnoHTML.offsetTop;
        let centar = Konzola.gks.transformirajPiksele(
          centarX - parseFloat(canvasGranica.borderLeftWidth),
          centarY - parseFloat(canvasGranica.borderRightWidth)
        );
        return centar;
      }
    });
  }

  static praznaFunkcija() {
    console.log(123123123);
  }

  static postaviPotencaijalNaKlik() {
    this.postaviNaPlatnoKlik((event) => {
      let pozicijaPotencijala = dohvatiPozicijuKlika(event);
      let noviPotencijal = new CoulombovPotencijal(
        0,
        new Vektor2D(pozicijaPotencijala[0], pozicijaPotencijala[1]),
        1,
        2
      );
      this.potencijalSave.push(noviPotencijal);
      this.pocetnoStanjePotencijala.push(noviPotencijal);
      this.potencijaliHTML.appendChild(
        this.stvortiHtmlPotencijal(noviPotencijal)
      );

      function dohvatiPozicijuKlika(event) {
        let canvasGranica = window.getComputedStyle(Konzola.platnoHTML);
        let centarX = event.clientX - Konzola.platnoHTML.offsetLeft;
        let centarY = event.clientY - Konzola.platnoHTML.offsetTop;
        let centar = Konzola.gks.transformirajPiksele(
          centarX - parseFloat(canvasGranica.borderLeftWidth),
          centarY - parseFloat(canvasGranica.borderRightWidth)
        );
        return centar;
      }
    });
  }
  static postaviNaPlatnoKlik(klikEventHandler) {
    if (this.posljednjiDodaniEventListener != null)
      this.platnoHTML.removeEventListener(
        "click",
        this.posljednjiDodaniEventListener,
        false
      );
    this.platnoHTML.addEventListener("click", klikEventHandler, false);
    this.posljednjiDodaniEventListener = klikEventHandler;
  }

  static brzinaSimulacijeSliderEventHandler(value) {
    this.brzina = value;
  }

  static preciznostInputFocusoutEventHandler(event) {
    this.preciznostSimulacije = event.target.value;
  }

  static skalirajBrzinuSlidera(brzina) {
    brzina = Math.abs(brzina - 1001);
    return ((brzina - 1) / (1000 - 1)) * (30 - 1) + 1;
  }

  static brojEksplozijeInputFocusoutEventHandler(event) {
    this.brojCesticaEksplozije = event.target.value;
  }

  static granicaClickEventHandler(event) {
    let odabranaGranica = event.target;
    if (odabranaGranica.className == "border-item") {
      odabranaGranica.className = "border-item-selected";
    } else {
      odabranaGranica.className = "border-item";
    }

    switch (odabranaGranica.id) {
      case "top":
        this.topGranica = !this.topGranica;
        break;
      case "right":
        this.rightGranica = !this.rightGranica;
        break;
      case "bottom":
        this.bottomGranica = !this.bottomGranica;
        break;
      case "left":
        this.leftGranica = !this.leftGranica;
        break;
    }
  }

  static gravitacijaInputFocusoutEventHandler(event) {
    let vrijednostGravitacije = event.target.value;
    if (
      vrijednostGravitacije < 0 ||
      vrijednostGravitacije > 100000 ||
      isNaN(vrijednostGravitacije) ||
      !vrijednostGravitacije
    ) {
      vrijednostGravitacije = 9.81;
    }
    this.gravitacija = new Fizika(Number.parseFloat(vrijednostGravitacije));
  }

  static otporInputFocusoutEventHandler(event) {
    let vrijednostOtpora = event.target.value;
    if (
      vrijednostOtpora < 0 ||
      vrijednostOtpora > 100000 ||
      isNaN(vrijednostOtpora) ||
      !vrijednostOtpora
    ) {
      vrijednostOtpora = 0.47;
    }
    this.otpor = new Otpor(Number.parseFloat(vrijednostOtpora));
  }

  static klikMetodaSelectEventHandler(event) {
    switch (event) {
      case "pravilnaEksplozija":
        this.postaviEksplozijuNaKlik(pravilnaEksplozija);
        break;

      case "gaussEksplozija":
        this.postaviEksplozijuNaKlik(gaussEksplozija);
        break;

      case "coulombEksplozija":
        this.postaviEksplozijuNaKlik(coulombEksplozija);
        break;

      case "visestrukiCoulombEksplozija":
        this.postaviEksplozijuNaKlik(visestrukiCoulombEksplozija);
        break;
      case "dp":
        this.postaviPotencaijalNaKlik();
        break;
    }
  }

  static pronadiOdabraniPotencijal(listaPotencijala) {
    let indexTrenutnogPotencijala = selector.selectedIndex;
    let odabraniPotencijal = selector.options[indexTrenutnogPotencijala];
    let pronadeniPotencijal = listaPotencijala.find(
      (element) => odabraniPotencijal.value == element.id
    );

    return pronadeniPotencijal;
  }

  static onButtonClickEventHandler() {
    let trenutniPotencijal = this.pronadiOdabraniPotencijal(
      this.potencijalSave
    );
    let trenutniPocetniPotencijal = this.pronadiOdabraniPotencijal(
      this.pocetnoStanjePotencijala
    );
    if (trenutniPotencijal == null || trenutniPocetniPotencijal == null) return;
    trenutniPocetniPotencijal.ukljuci = 1;
    trenutniPotencijal.ukljuci = 1;
  }

  static offButtonClickEventHandler() {
    let trenutniPotencijal = this.pronadiOdabraniPotencijal(
      this.potencijalSave
    );
    let trenutniPocetniPotencijal = this.pronadiOdabraniPotencijal(
      this.pocetnoStanjePotencijala
    );
    if (trenutniPotencijal == null || trenutniPocetniPotencijal == null) return;
    trenutniPocetniPotencijal.ukljuci = 0;
    trenutniPotencijal.ukljuci = 0;
  }

  static nabojInputFocusoutEventHandler(event) {
    let vrijednost = Number.parseInt(event.target.value);
    let trenutniPotencijal = this.pronadiOdabraniPotencijal(
      this.potencijalSave
    );
    let trenutniPocetniPotencijal = this.pronadiOdabraniPotencijal(
      this.pocetnoStanjePotencijala
    );
    if (trenutniPotencijal == null || trenutniPocetniPotencijal == null) return;
    trenutniPocetniPotencijal.naboj = vrijednost;
    trenutniPotencijal.naboj = vrijednost;
  }

  static koeficijentInputFocusoutEventHandler(event) {
    let vrijednost = Number.parseFloat(event.target.value);
    let trenutniPotencijal = this.pronadiOdabraniPotencijal(
      this.potencijalSave
    );
    let trenutniPocetniPotencijal = this.pronadiOdabraniPotencijal(
      this.pocetnoStanjePotencijala
    );

    if (trenutniPotencijal == null || trenutniPocetniPotencijal == null) return;
    trenutniPocetniPotencijal.k = vrijednost;
    trenutniPotencijal.k = vrijednost;
  }

  static koeficijentUdaljenostiInputFocusoutEventHandler(event) {
    let vrijednost = Number.parseFloat(event.target.value);
    let trenutniPotencijal = this.pronadiOdabraniPotencijal(
      this.potencijalSave
    );
    let trenutniPocetniPotencijal = this.pronadiOdabraniPotencijal(
      this.pocetnoStanjePotencijala
    );

    if (trenutniPotencijal == null || trenutniPocetniPotencijal == null) return;
    trenutniPocetniPotencijal.potencijalUdaljenosti = vrijednost;
    trenutniPotencijal.potencijalUdaljenosti = vrijednost;
  }

  static maxUdaljenostInputFocusoutEventHandler(event) {
    let vrijednost = Number.parseFloat(event.target.value);
    let trenutniPotencijal = this.pronadiOdabraniPotencijal(
      this.potencijalSave
    );
    let trenutniPocetniPotencijal = this.pronadiOdabraniPotencijal(
      this.pocetnoStanjePotencijala
    );

    if (trenutniPotencijal == null || trenutniPocetniPotencijal == null) return;
    trenutniPocetniPotencijal.maxUdaljenost = vrijednost;
    trenutniPotencijal.maxUdaljenost = vrijednost;
  }

  static minUdaljenostInputFocusoutEventHandler(event) {
    let vrijednost = Number.parseFloat(event.target.value);
    let trenutniPotencijal = this.pronadiOdabraniPotencijal(
      this.potencijalSave
    );
    let trenutniPocetniPotencijal = this.pronadiOdabraniPotencijal(
      this.pocetnoStanjePotencijala
    );

    if (trenutniPotencijal == null || trenutniPocetniPotencijal == null) return;
    trenutniPocetniPotencijal.minUdaljenost = vrijednost;
    trenutniPotencijal.minUdaljenost = vrijednost;
  }

  static utjecajXInputFocusoutEventHandler(event) {
    let vrijednost = Number.parseFloat(event.target.value);
    let trenutniPotencijal = this.pronadiOdabraniPotencijal(
      this.potencijalSave
    );
    let trenutniPocetniPotencijal = this.pronadiOdabraniPotencijal(
      this.pocetnoStanjePotencijala
    );

    if (trenutniPotencijal == null || trenutniPocetniPotencijal == null) return;
    trenutniPocetniPotencijal.xMnozitelj = vrijednost;
    trenutniPotencijal.xMnozitelj = vrijednost;
  }

  static xKoordinataInputFocusoutEventHandler(event) {
    let vrijednost = Number.parseFloat(event.target.value);
    let trenutniPotencijal = this.pronadiOdabraniPotencijal(
      this.potencijalSave
    );
    let trenutniPocetniPotencijal = this.pronadiOdabraniPotencijal(
      this.pocetnoStanjePotencijala
    );

    if (trenutniPotencijal == null || trenutniPocetniPotencijal == null) return;
    trenutniPocetniPotencijal.r.x = vrijednost;
    trenutniPotencijal.r.x = vrijednost;
  }
  static yKoordinataInputFocusoutEventHandler(event) {
    let vrijednost = Number.parseFloat(event.target.value);
    let trenutniPotencijal = this.pronadiOdabraniPotencijal(
      this.potencijalSave
    );
    let trenutniPocetniPotencijal = this.pronadiOdabraniPotencijal(
      this.pocetnoStanjePotencijala
    );

    if (trenutniPotencijal == null || trenutniPocetniPotencijal == null) return;
    trenutniPocetniPotencijal.r.y = vrijednost;
    trenutniPotencijal.r.y = vrijednost;
  }

  static slojCesticaInputFocusoutEventHandler(event) {
    this.brojCesticaSloja = Number.parseInt(event.target.value);
  }
  static xMinSlojaInputFocusoutEventHandler(event) {
    this.xminCestica = Number.parseFloat(event.target.value);
  }
  static xMaxSlojaInputFocusoutEventHandler(event) {
    this.xmaxCestica = Number.parseFloat(event.target.value);
  }
  static yMinSlojaInputFocusoutEventHandler(event) {
    this.yminCestica = Number.parseFloat(event.target.value);
  }
  static yMaxSlojaInputFocusoutEventHandler(event) {
    this.ymaxCestica = Number.parseFloat(event.target.value);
  }

  static pokreniButtonClickEventHandler() {
    this.paused = false;
  }
  static pauzirajButtonClickEventHandler() {
    this.paused = true;
  }
  static reloadButtonClickEventHandler() {
    location.reload(true);
  }

  static resetButtonClickEventHandler() {
    while (this.cesticeSave.length > 0) {
      this.cesticeSave.pop();
    }
    while (this.potencijalSave.length > 0) {
      this.potencijalSave.pop();
    }

    this.postaviSlojCestica(
      this.brojCesticaSloja,
      this.xminCestica,
      this.xmaxCestica,
      this.yminCestica,
      this.ymaxCestica
    );

    this.pocetnoStanjePotencijala.map((p) => {
      let deepCopy = this.deepClone(p);
      this.potencijalSave.push(deepCopy);
    });
  }
}
