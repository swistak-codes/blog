export const categories = new Set([
  'Algorytmy',
  'Sortowanie',
  'Grafika komputerowa',
  'Gry',
  'Matematyka',
  'Liczby pierwsze',
  'Programowanie',
  'Przetwarzanie danych',
  'Struktury danych',
  'Świat rzeczywisty a IT',
  'Data i czas',
  'Sztuczna inteligencja',
  'Teoria informatyki',
  'Zagadki logiczne',
  'Grafy',
  'Listy',
  'Logika',
  'Problemy obliczeniowe',
]);

export const categoryChildrenRelations: Map<string, string[]> = new Map([
  ['Algorytmy', ['Sortowanie', 'Problemy obliczeniowe']],
  ['Matematyka', ['Liczby pierwsze', 'Logika']],
  ['Świat rzeczywisty a IT', ['Data i czas']],
]);

export const categoryParentRelations: Map<string, string> = (() => {
  const result = new Map<string, string>();

  for (const [parent, children] of categoryChildrenRelations) {
    for (const child of children) {
      result.set(child, parent);
    }
  }

  return result;
})();
