import { PostMetadata } from '@swistak-codes/types';
import * as p from '../content/all-posts';

export const similarPosts: Map<PostMetadata, PostMetadata[]> = new Map([
  [
    p.listyNZTD.meta,
    [
      p.tabliceListy.meta,
      p.listyZDowiazaniami.meta,
      p.wyszukiwanieWListach.meta,
    ],
  ],
  [
    p.tabliceListy.meta,
    [p.listyNZTD.meta, p.listyZDowiazaniami.meta, p.sortowanie1.meta],
  ],
  [
    p.listyZDowiazaniami.meta,
    [p.listyNZTD.meta, p.tabliceListy.meta, p.grafyWprowadzenie.meta],
  ],

  [
    p.sztucznaInteligencja.meta,
    [p.testowanieSi.meta, p.kolkoKrzyzyk.meta, p.sudoku.meta],
  ],
  [
    p.testowanieSi.meta,
    [p.sztucznaInteligencja.meta, p.kolkoKrzyzyk.meta, p.problemSkoczka.meta],
  ],

  [
    p.matematyka01.meta,
    [
      p.sposobyZapisywaniaLiczb.meta,
      p.liczbyWymierne.meta,
      p.systemyLiczbowe.meta,
    ],
  ],
  [
    p.sposobyZapisywaniaLiczb.meta,
    [p.matematyka01.meta, p.liczbyWymierne.meta, p.systemyLiczbowe.meta],
  ],
  [
    p.liczbyWymierne.meta,
    [
      p.matematyka01.meta,
      p.sposobyZapisywaniaLiczb.meta,
      p.systemyLiczbowe.meta,
    ],
  ],
  [
    p.systemyLiczbowe.meta,
    [
      p.matematyka01.meta,
      p.sposobyZapisywaniaLiczb.meta,
      p.liczbyRzymskie.meta,
    ],
  ],

  [
    p.nieliczbyJakoLiczby.meta,
    [
      p.obrazyBMP.meta,
      p.jakKomputerZapisujeDzwiek.meta,
      p.tekstowyZapisDanych.meta,
    ],
  ],
  [
    p.obrazyBMP.meta,
    [p.nieliczbyJakoLiczby.meta, p.kolory.meta, p.operacjeNaBarwach.meta],
  ],
  [
    p.tekstowyZapisDanych.meta,
    [
      p.nieliczbyJakoLiczby.meta,
      p.jakKomputerZapisujeDzwiek.meta,
      p.obrazyBMP.meta,
    ],
  ],

  [
    p.wyszukiwanieWListach.meta,
    [p.listyNZTD.meta, p.tabliceListy.meta, p.listyZDowiazaniami.meta],
  ],

  [
    p.sortowanie1.meta,
    [p.sortowanie2.meta, p.sortowanie3.meta, p.sortowanie4.meta],
  ],
  [
    p.sortowanie2.meta,
    [p.sortowanie1.meta, p.tabliceListy.meta, p.sortowanie4.meta],
  ],
  [
    p.sortowanie3.meta,
    [p.sortowanie1.meta, p.sortowanie2.meta, p.listyNZTD.meta],
  ],
  [
    p.sortowanie4.meta,
    [p.sortowanie1.meta, p.grafyWprowadzenie.meta, p.sortowanie5.meta],
  ],
  [
    p.sortowanie5.meta,
    [p.sortowanie1.meta, p.sortowanie4.meta, p.wyszukiwanieWListach.meta],
  ],
  [
    p.sortowanie6.meta,
    [p.sortowanie1.meta, p.resztaZDzielenia.meta, p.sortowanie7.meta],
  ],
  [
    p.sortowanie7.meta,
    [
      p.sortowanie1.meta,
      p.liczbyPierwszeProsteSposoby.meta,
      p.sortowanie9.meta,
    ],
  ],
  [
    p.sortowanie9.meta,
    [p.sortowanie2.meta, p.komputerWKomputerze.meta, p.obrazyBMP.meta],
  ],

  [
    p.rekurencja.meta,
    [p.derekursywacja.meta, p.sortowanie5.meta, p.iteracja.meta],
  ],
  [
    p.derekursywacja.meta,
    [p.rekurencja.meta, p.sortowanie5.meta, p.przechodzeniePoGrafie.meta],
  ],

  [
    p.jakRysujeLinie.meta,
    [p.jakRysujeOkregi.meta, p.obrazyBMP.meta, p.przeksztalcenia2D.meta],
  ],
  [
    p.jakRysujeOkregi.meta,
    [p.jakRysujeLinie.meta, p.spirale.meta, p.przeksztalcenia2D.meta],
  ],

  [p.saper.meta, [p.kolkoKrzyzyk.meta, p.sudoku.meta, p.kryptarytmy.meta]],

  [
    p.komputerWKomputerze.meta,
    [p.duzeLiczbyPierwsze.meta, p.nieliczbyJakoLiczby.meta, p.wiezeHanoi.meta],
  ],
  [
    p.jakKomputerZapisujeDzwiek.meta,
    [p.nieliczbyJakoLiczby.meta, p.tekstowyZapisDanych.meta, p.kolory.meta],
  ],

  [
    p.przeksztalcenia2D.meta,
    [p.przeksztalcenia3D.meta, p.kolory.meta, p.operacjeNaBarwach.meta],
  ],
  [
    p.przeksztalcenia3D.meta,
    [p.przeksztalcenia2D.meta, p.kolory.meta, p.rysowanieRoslin3d.meta],
  ],

  [
    p.jakKomputerMierzyCzas.meta,
    [
      p.jakKomputerPrzechowujeDate.meta,
      p.czasTrudny1.meta,
      p.dzienTygodnia.meta,
    ],
  ],
  [
    p.jakKomputerPrzechowujeDate.meta,
    [p.jakKomputerMierzyCzas.meta, p.czasTrudny1.meta, p.dzienTygodnia.meta],
  ],
  [
    p.czasTrudny1.meta,
    [
      p.czasTrudny2.meta,
      p.jakKomputerMierzyCzas.meta,
      p.jakKomputerPrzechowujeDate.meta,
    ],
  ],
  [
    p.czasTrudny2.meta,
    [
      p.czasTrudny1.meta,
      p.dzienTygodnia.meta,
      p.jakKomputerPrzechowujeDate.meta,
    ],
  ],
  [
    p.dzienTygodnia.meta,
    [
      p.jakKomputerMierzyCzas.meta,
      p.jakKomputerPrzechowujeDate.meta,
      p.czasTrudny1.meta,
    ],
  ],

  [
    p.resztaZDzielenia.meta,
    [p.matematyka01.meta, p.wyszukiwanieWListach.meta, p.calkiOznaczone.meta],
  ],
  [p.kolkoKrzyzyk.meta, [p.sudoku.meta, p.saper.meta, p.kryptarytmy.meta]],
  [
    p.wiezeHanoi.meta,
    [p.sudoku.meta, p.problemSkoczka.meta, p.liczbyPierwszeProsteSposoby.meta],
  ],
  [
    p.kryptarytmy.meta,
    [p.sudoku.meta, p.wiezeHanoi.meta, p.problemSkoczka.meta],
  ],
  [
    p.sudoku.meta,
    [p.wiezeHanoi.meta, p.kolkoKrzyzyk.meta, p.problemSkoczka.meta],
  ],

  [
    p.calkiOznaczone.meta,
    [p.resztaZDzielenia.meta, p.matematyka01.meta, p.duzeLiczbyPierwsze.meta],
  ],

  [
    p.kolory.meta,
    [p.operacjeNaBarwach.meta, p.obrazyBMP.meta, p.gradienty.meta],
  ],
  [
    p.operacjeNaBarwach.meta,
    [p.kolory.meta, p.obrazyBMP.meta, p.jakRysujeOkregi.meta],
  ],

  [
    p.rysowanieRoslin.meta,
    [p.rysowanieRoslin3d.meta, p.jakRysujeLinie.meta, p.obrazyBMP.meta],
  ],
  [
    p.rysowanieRoslin3d.meta,
    [p.rysowanieRoslin.meta, p.przeksztalcenia3D.meta, p.rysowanieGrafow.meta],
  ],

  [
    p.liczbyPierwszeProsteSposoby.meta,
    [
      p.liczbyPierwszeProsteSposobyZnajdowanie.meta,
      p.duzeLiczbyPierwsze.meta,
      p.szybkieSzukanieLiczbPierwszych.meta,
    ],
  ],
  [
    p.liczbyPierwszeProsteSposobyZnajdowanie.meta,
    [
      p.liczbyPierwszeProsteSposoby.meta,
      p.duzeLiczbyPierwsze.meta,
      p.szybkieSzukanieLiczbPierwszych.meta,
    ],
  ],
  [
    p.duzeLiczbyPierwsze.meta,
    [
      p.liczbyPierwszeProsteSposoby.meta,
      p.szybkieSzukanieLiczbPierwszych.meta,
      p.porownanieTestowPierwszosci.meta,
    ],
  ],
  [
    p.szybkieSzukanieLiczbPierwszych.meta,
    [
      p.porownanieTestowPierwszosci.meta,
      p.liczbyPierwszeProsteSposobyZnajdowanie.meta,
      p.duzeLiczbyPierwsze.meta,
    ],
  ],

  [
    p.porownanieTestowPierwszosci.meta,
    [
      p.duzeLiczbyPierwsze.meta,
      p.szybkieSzukanieLiczbPierwszych.meta,
      p.liczbyPierwszeProsteSposoby.meta,
    ],
  ],

  [
    p.grafyWprowadzenie.meta,
    [
      p.sposobyReprezentacjiGrafow.meta,
      p.przechodzeniePoGrafie.meta,
      p.listyNZTD.meta,
    ],
  ],
  [
    p.sposobyReprezentacjiGrafow.meta,
    [
      p.grafyWprowadzenie.meta,
      p.przechodzeniePoGrafie.meta,
      p.tabliceListy.meta,
    ],
  ],
  [
    p.przechodzeniePoGrafie.meta,
    [
      p.praktykaPrzechodzeniePoGrafie.meta,
      p.sposobyReprezentacjiGrafow.meta,
      p.problemSkoczka.meta,
    ],
  ],
  [
    p.praktykaPrzechodzeniePoGrafie.meta,
    [
      p.przechodzeniePoGrafie.meta,
      p.grafyWprowadzenie.meta,
      p.szukanieSciezekGraf.meta,
    ],
  ],
  [
    p.szukanieSciezekGraf.meta,
    [
      p.szybkieSzukanieSciezek.meta,
      p.praktykaPrzechodzeniePoGrafie.meta,
      p.problemSkoczka.meta,
    ],
  ],
  [
    p.szybkieSzukanieSciezek.meta,
    [
      p.szukanieSciezekGraf.meta,
      p.praktykaPrzechodzeniePoGrafie.meta,
      p.saper.meta,
    ],
  ],
  [
    p.rysowanieGrafow.meta,
    [p.rysowanieRoslin.meta, p.jakRysujeOkregi.meta, p.grafyWprowadzenie.meta],
  ],
  [
    p.problemSkoczka.meta,
    [p.grafyWprowadzenie.meta, p.wiezeHanoi.meta, p.sudoku.meta],
  ],
  [
    p.liczbyRzymskie.meta,
    [p.systemyLiczbowe.meta, p.matematyka01.meta, p.calkiOznaczone.meta],
  ],
  [p.nwd.meta, [p.matematyka01.meta, p.liczbyRzymskie.meta, p.listyNZTD.meta]],
  [
    p.iteracja.meta,
    [p.rekurencja.meta, p.derekursywacja.meta, p.listyNZTD.meta],
  ],
  [
    p.szybkiePotegowanie.meta,
    [p.nwd.meta, p.pierwiastkowanie.meta, p.onp.meta],
  ],
  [
    p.pierwiastkowanie.meta,
    [p.szybkiePotegowanie.meta, p.nwd.meta, p.calkiOznaczone.meta],
  ],
  [
    p.zegarAnalogowy.meta,
    [p.jakRysujeOkregi.meta, p.zegarBinarny.meta, p.jakKomputerMierzyCzas.meta],
  ],
  [p.spirale.meta, [p.bezier.meta, p.jakRysujeOkregi.meta, p.obrotyGry.meta]],
  [
    p.sumyKontrolne.meta,
    [
      p.tekstowyZapisDanych.meta,
      p.matematyka01.meta,
      p.liczbyPierwszeProsteSposoby.meta,
    ],
  ],
  [p.obrotyGry.meta, [p.saper.meta, p.kolkoKrzyzyk.meta, p.spirale.meta]],
  [
    p.dzielIZwyciezajMnozenie.meta,
    [p.wyszukiwanieWListach.meta, p.pierwiastkowanie.meta, p.sortowanie5.meta],
  ],
  [
    p.maturaProbna2022.meta,
    [
      p.liczbyPierwszeProsteSposobyZnajdowanie.meta,
      p.matematyka01.meta,
      p.iteracja.meta,
    ],
  ],
  [
    p.onp.meta,
    [p.onp2.meta, p.pierwiastkowanie.meta, p.szybkiePotegowanie.meta],
  ],
  [
    p.onp2.meta,
    [p.onp.meta, p.dzielIZwyciezajMnozenie.meta, p.szybkiePotegowanie.meta],
  ],
  [
    p.podstawyLogiki.meta,
    [p.szybkiePotegowanie.meta, p.kwantyfikatory.meta, p.zbioryTs.meta],
  ],
  [
    p.kwantyfikatory.meta,
    [p.podstawyLogiki.meta, p.teoriaZbiorow.meta, p.iteracja.meta],
  ],
  [
    p.teoriaZbiorow.meta,
    [p.iteracja.meta, p.podstawyLogiki.meta, p.zbioryTs.meta],
  ],
  [
    p.zbioryTs.meta,
    [p.podstawyLogiki.meta, p.teoriaZbiorow.meta, p.zegarAnalogowy.meta],
  ],
  [
    p.podobienstwoStringi.meta,
    [p.tekstowyZapisDanych.meta, p.szukanieSciezekGraf.meta, p.iteracja.meta],
  ],
  [
    p.obserwator.meta,
    [p.zbioryTs.meta, p.iteracja.meta, p.scentralizowanyObserwator.meta],
  ],
  [
    p.scentralizowanyObserwator.meta,
    [p.obserwator.meta, p.iteracja.meta, p.fluxRedux.meta],
  ],
  [
    p.fluxRedux.meta,
    [p.obserwator.meta, p.scentralizowanyObserwator.meta, p.zbioryTs.meta],
  ],
  [
    p.bezier.meta,
    [p.spirale.meta, p.otoczkaWypukla.meta, p.przeksztalcenia2D.meta],
  ],
  [
    p.otoczkaWypukla.meta,
    [p.bezier.meta, p.rysowanieRoslin.meta, p.obrotyGry.meta],
  ],
  [
    p.ackermann.meta,
    [p.rekurencja.meta, p.derekursywacja.meta, p.iteracja.meta],
  ],
  [
    p.mierzenieCzasuWykonania.meta,
    [p.jakKomputerMierzyCzas.meta, p.czasTrudny1.meta, p.iteracja.meta],
  ],
  [
    p.gradienty.meta,
    [p.kolory.meta, p.operacjeNaBarwach.meta, p.obrazyBMP.meta],
  ],
  [
    p.zegarBinarny.meta,
    [
      p.zegarAnalogowy.meta,
      p.jakKomputerPrzechowujeDate.meta,
      p.jakKomputerMierzyCzas.meta,
    ],
  ],
  [
    p.symbolNewtona.meta,
    [p.bezier.meta, p.pierwiastkowanie.meta, p.rekurencja.meta],
  ],
  [
    p.maturaProbna2023.meta,
    [
      p.maturaProbna2022.meta,
      p.szybkiePotegowanie.meta,
      p.resztaZDzielenia.meta,
    ],
  ],
  [
    p.kompresjaObrazow.meta,
    [p.obrazyBMP.meta, p.kompresjaWideo.meta, p.jakKomputerZapisujeDzwiek.meta],
  ],
  [
    p.kompresjaWideo.meta,
    [
      p.kompresjaObrazow.meta,
      p.jakKomputerZapisujeDzwiek.meta,
      p.nieliczbyJakoLiczby.meta,
    ],
  ],
  [
    p.programistyczneDziwactwa.meta,
    [p.nieliczbyJakoLiczby.meta, p.matematyka01.meta, p.zbioryTs.meta],
  ],
  [
    p.zliczanieUnikalnych.meta,
    [p.listyNZTD.meta, p.sortowanie1.meta, p.kryptarytmy.meta],
  ],
  [
    p.macierzePodstawy.meta,
    [p.podstawyLogiki.meta, p.matematyka01.meta, p.macierzeWyznacznik.meta],
  ],
  [
    p.macierzeWyznacznik.meta,
    [
      p.macierzePodstawy.meta,
      p.dzielIZwyciezajMnozenie.meta,
      p.calkiOznaczone.meta,
    ],
  ],
]);
