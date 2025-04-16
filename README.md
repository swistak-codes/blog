# Blog świstak.codes

Repozytorium zawiera publiczną kopię kodu bloga [świstak.codes](https://swistak.codes/). Jest to bezpośrednia kopia brancha `main`, więc kod zawarty tutaj zawiera zawsze najnowszą, publicznie dostępną wersję bloga.

***UWAGA!*** 

Z racji, że jest to automatyczna kopia kodu, nie przyjmuję w tym repozytorium żadnych pull requestów. Jeśli chcesz zasugerować zmiany, skorzystaj z dyskusji. Polecam jednak najpierw przeczytać zalinkowany niżej artykuł, gdzie opisuję kod oraz dlaczego wygląda tak, a nie inaczej.

## Istotne linki

- Blog: <https://swistak.codes/>
- Jeśli chcesz wiedzieć więcej o kodzie i decyzji pójścia w open-source, przeczytaj ten artykuł: <https://swistak.codes/offtopic/opensource/>
- Jeśli widzisz błąd lub chcesz zasugerować zmianę w kodzie, otwórz nową dyskusję na GitHubie: <https://github.com/orgs/swistak-codes/discussions/new/choose>

## Instrukcje techniczne

### Wymagania

- NodeJS LTS
- Docker (do testowania builda produkcyjnego)

### Instalacja zależności (przed pierwszym uruchomieniem)

`npm install`

### Uruchomienie wersji dev

`npm start`

### Uruchomienie unit testów

Unit testy aktualnie zostały wyłączone i skrypt uruchamiający je został usunięty.

### Przygotowanie apki do builda produkcyjnego

```
npm run rss:fix
npm start
npm run scrape:all
```

### Tworzenie nowego artykułu

1. Skopiuj dowolny folder w /src/\_posts/content i nazwij nowy odpowiednio wg schematu ([data]-[slug])
2. Podstawa to article.mdx i index.ts, reszta plików to zwykle customowe assety artykułu. Plik mdx zawiera treść, a index.ts definicję artykułu.
3. Zmień nazwę eksportowanej zmiennej w index.ts
4. Usuń starą treść z article.mdx. Możesz też już uzupełnić metadane (obiekt meta na początku pliku)
5. Zaimportuj i wyeksportuj nowy artykuł w /src/\_posts/all-posts.ts
6. Uruchom skrypt `npm run generate-pages`, aby wygenerować stronę na blogu z artykułem
7. Uzupełnij podobne posty w /src/blog/\_posts/meta/similar-posts.ts
