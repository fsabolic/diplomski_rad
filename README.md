https://fsabolic.github.io/diplomski_rad/diplomski_rad/
# Vizualizacija eksplozija korištenjem čestičnog modela

Ovaj projekt predstavlja diplomski rad za završetak diplomskog studija "Informatičko i programsko inženjerstvo" na Fakultetu organizacije i informatike. Cilj diplomskog rada je što vjernije vizualizirati eksplozije čestica koristeći razne tehnike i parametre na čestičnom modelu. Sam projekt se sastoji od nekoliko različitih implementacija kojima se pokušava što točnije prikazati kretanje čestica nakon eksplozije.

### Struktura projekta

```
diplomski_rad
    ├── assets
    ├── centar_eksplozije
    │   ├── coulomb_eksplozija
    │   │   ├── coulomb_jednostruka_eksplozija
    │   │   └── coulomb_visestruka_eksplozija
    │   ├── gauss_eksplozija
    │   └── pravilna_eksplozija
    ├── css
    ├── efekt_atomske_gljive
    │   ├── jedan_potencijal
    │   │   ├── nepokretni_privlancni_potencijal
    │   │   │   ├── bez_x
    │   │   │   └── sa_x
    │   │   └── pokretni_privlancni_potencijal
    │   │       └── jednako_pomicanje
    │   │           ├── bez_x
    │   │           └── sa_x
    ├── klase
    └── skripte
```
**Opisi foldera:**

- **diplomski_rad**: Root folder koji sadrži sve ostale.
    - **assets**: Contains various asset files used in the project.
    - **centar_eksplozije**: Sadrži vizualizacije eksplozija koje se šire iz klika miša.
        - **coulomb_eksplozija**: Sadrži vizualizacije eksplozija koje se temelje na djelovanju Coulombovog potencijala.
            - **coulomb_jednostruka_eksplozija**: Vizualizacija eksplozije u kojoj se čestice jednom stvaraju u prstenu oko odbojnog potencijala koji djeluje na njih.
            - **coulomb_visestruka_eksplozija**: Vizualizacija eksplozije u kojoj se čestice stvaraju nekoliko puta u prstenu oko odbojnog potencijala koji svakom iteracijom sve slabije djeluje na skupove čestica koji se stvaraju.
        - **gauss_eksplozija**: Vizualizacija eksplozije u kojoj čestice dobivaju nasumične vrijednosti za brzinu i položaj na temelju Gaussove raspodjele (umjesto uniformne).
        - **pravilna_eksplozija**: Jednostavna vizualizacija eksplozije u kojoj su čestice ravnomjerno raspoređene u kružnicu.
    - **css**: Sadrži CSS stil za vizualizacije.
    - **efekt_atomske_gljive**: Sadrži vizualizacije efekta atomske gljive.
        - **jedan_potencijal**: Sadrži vizualizacije ostvarene s jednim potencijalom.
            - **nepokretni_privlancni_potencijal**: Sadrži vizualizacije koje koriste jedan potencijal koji se ne miče.
                - **bez_x**: Vizualizacije u kojima potencijal ne djeluje na x komponentu.
                - **sa_x**: Vizualizacije u kojima potencijal djeluje na x komponentu.
            - **pokretni_privlancni_potencijal**: Sadrži vizualizacije koje koriste jedan potencijal koji se miče po y-osi.
                - **jednako_pomicanje**: VIzualizacije u kojima je pomicanje čestice jednoliko u jednom smjeru.
                    - **bez_x**: Vizualizacije u kojima potencijal ne djeluje na x komponentu.
                    - **sa_x**: Vizualizacije u kojima potencijal djeluje na x komponentu.
    - **klase**: Sadrži klase koje se koriste u svim vizualizacijama.
    - **skripte**: Sadrži skripte koje se koriste u svim vizualizacijama.

