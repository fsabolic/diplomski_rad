# Vizualizacija eksplozija korištenjem čestičnog modela
Ovaj projekt predstavlja diplomski rad za završetak diplomskog studija "Informatičko i programsko inženjerstvo" na Fakultetu organizacije i informatike. Cilj diplomskog rada je što točnije vizualizirati eksplozije čestica koristeći razne tehnike i parametre na čestičnom modelu. Sam projekt se sastoji od nekoliko različitih implementacija kojima se pokušava što točnije prikazati kretanje čestica nakon eksplozije.
### Struktura projekta
**diplomski_rad**  
&nbsp;&nbsp;&nbsp;&nbsp;├── **centar_eksplozije**  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── **coulomb_eksplozija**  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;├── **coulomb_jednostruka_eksplozija**  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;└── *skripte*  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;└── **coulomb_visestruka_eksplozija**  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── *skripte*  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── **gauss_eksplozija**  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── *skripte*  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── **pravilna_eksplozija**  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── *skripte*  
&nbsp;&nbsp;&nbsp;&nbsp;├── **css**  
&nbsp;&nbsp;&nbsp;&nbsp;└── **klase** 






**Opisi foldera:**

- **diplomski_rad**: Root folder koji sadrži sve ostale.
- **centar_eksplozije**: Sadrži vizualizacije eksplozija koje se šire iz klika miša.
  - **coulomb_eksplozija**: Sadrži vizualizacije eksplozija koje se temelje na djelovanju Coulombovog potencijala.
    - **coulomb_jednostruka_eksplozija**: Vizualizacija eksplozije u kojoj se čestice jednom stvaraju u prstenu oko odbojnog potencijala koji djeluje na njih.
    - **coulomb_visestruka_eksplozija**: Vizualizacija eksplozije u kojoj se čestice stvaraju nekoliko puta u prstenu oko odbojnog potencijala koji svakom iteracijom sve slabije djeluje na skupove čestica koji se stvaraju.
  - **gauss_eksplozija**: Vizualizacija eksplozije u kojoj čestice dobivaju nasumične vrijednosti za brzinu i položaj na temelju Gaussove raspodjele (umjesto uniformne).
  - **pravilna_eksplozija**: Jednostavna vizualizacija eksplozije u kojoj su čestice ravnomjerno raspoređene u kružnicu.
- **css**: Sadrži CSS stil za vizualizacije
- **klase**: Sadrži klase koje se koriste u svim vizualizacijama
