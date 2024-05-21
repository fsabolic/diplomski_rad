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

  static spremiPocetnoStanjePotencijala(potencijal) {
    Konzola.potencijalSave = potencijal;
    Konzola.pocetnoStanjePotencijala = Konzola.deepClone(potencijal);
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
    location.reload();
  }

  static reset() {
    while (Konzola.cesticeSave.length > 0) {
      Konzola.cesticeSave.pop();
    }

    Konzola.pocetnoStanjeCestica.map((cestica) => {
      let deepCopy = Konzola.deepClone(cestica);
      Konzola.cesticeSave.push(deepCopy);
    });

    if (Konzola.pocetnoStanjePotencijala != null) {
      for (let key in Konzola.pocetnoStanjePotencijala) {
        Konzola.potencijalSave[key] = Konzola.pocetnoStanjePotencijala[key];
      }
      Konzola.pocetnoStanjePotencijala = Konzola.deepClone(
        Konzola.potencijalSave
      );
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
}
