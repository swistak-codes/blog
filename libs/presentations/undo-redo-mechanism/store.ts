import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';

interface OneArrayState {
  history: number[];
  pointer: number;
}

interface TwoArrayState {
  past: number[];
  current: number | null;
  future: number[];
}

// stan oparty na jednej tablicy
export const useOneArrayStore = create<OneArrayState>(() => ({
  history: [],
  pointer: -1,
}));

// stan oparty na oddzielnych tablicach
export const useTwoArrayStore = create<TwoArrayState>(() => ({
  past: [],
  current: null,
  future: [],
}));

// funkcja resetująca stan aplikacji
export const reset = () => {
  useOneArrayStore.setState(useOneArrayStore.getInitialState());
  useTwoArrayStore.setState(useTwoArrayStore.getInitialState());
};

// funkcja generująca nową liczbę
export const generateValue = () => {
  const oldValue = useTwoArrayStore.getState().current;
  let value: number;
  // pętla w celu zapewnienia, że nowa liczba będzie różna od aktualnej
  do {
    value = Math.trunc(Math.random() * 100);
  } while (value === oldValue);

  // ustawienie nowego elementu w scenariuszu jednej tablicy
  useOneArrayStore.setState((state) => {
    // tworzymy nowy stan przez kopię starego
    const newState: OneArrayState = { ...state };
    if (state.pointer > 0) {
      // jeśli cofaliśmy się (wskaźnik większy od zera)
      // to zostawiamy jedynie fragment tablicy od wskaźnika do jej końca
      newState.history = state.history.slice(state.pointer);
    }
    // wskaźnik przenosimy na start
    newState.pointer = 0;
    // nową wartość wstawiamy na początek tablicy
    newState.history = [value, ...newState.history];
    return newState;
  });

  // ustawienie nowego elementu w scenariuszu oddzielnych tablic
  useTwoArrayStore.setState((state) => {
    // tworzymy nowy stan przez kopię starego
    const newState: TwoArrayState = { ...state };
    if (state.current !== null) {
      // wstawiamy aktualny stan do przeszłości,
      // tylko jeśli istniał
      newState.past = [state.current, ...state.past];
    }
    // czyścimy przyszłość
    newState.future = [];
    // ustawiamy nową aktualną wartość
    newState.current = value;
    return newState;
  });
};

export const undo = () => {
  // cofanie w scenariuszu jednej tablicy
  useOneArrayStore.setState((state) => {
    // tworzymy nowy stan przez kopię starego
    const newState: OneArrayState = { ...state };
    // cofnięcie to jedynie przesunięcie wskaźnika do przodu
    newState.pointer++;
    return newState;
  });
  // cofanie w scenariuszu oddzielnych tablic
  useTwoArrayStore.setState((state) => {
    // tworzymy nowy stan przez kopię starego
    const newState: TwoArrayState = { ...state };
    // dodajemy na początek przyszłości aktualny stan
    // `!` to adnotacja dla TypeScript, że jesteśmy pewni, że wartość nie jest null
    newState.future = [state.current!, ...state.future];
    // wyciągamy pierwszy element z przeszłości i pobieramy pozostałe elementy
    const [current, ...rest] = state.past;
    // przypisujemy nowe wartości dla aktualnego elementu i przeszłości
    newState.current = current;
    newState.past = rest;
    return newState;
  });
};

export const redo = () => {
  // ponawianie w scenariuszu jednej tablicy
  useOneArrayStore.setState((state) => {
    // tworzymy nowy stan przez kopię starego
    const newState: OneArrayState = { ...state };
    // ponowienie to jedynie przesunięcie wskaźnika do tyłu
    newState.pointer--;
    return newState;
  });
  // ponawianie w scenariuszu oddzielnych tablic
  useTwoArrayStore.setState((state) => {
    // tworzymy nowy stan przez kopię starego
    const newState: TwoArrayState = { ...state };
    // dodajemy na początek przeszłości aktualny stan
    // `!` to adnotacja dla TypeScript, że jesteśmy pewni, że wartość nie jest null
    newState.past = [state.current!, ...state.past];
    // wyciągamy pierwszy element z przyszłości i pobieramy pozostałe elementy
    const [current, ...rest] = state.future;
    // przypisujemy nowe wartości dla aktualnego elementu i przyszłości
    newState.current = current;
    newState.future = rest;
    return newState;
  });
};

// reaktywna wartość określająca, czy możemy wykonać operację cofnięcia
export const useCanUndo = () => {
  // dla jednej tablicy musimy pobrać wskaźnik i historię
  const { history, pointer } = useOneArrayStore();
  // dla oddzielnych tablic potrzebujemy jedynie tablicę z przeszłością
  const past = useTwoArrayStore(useShallow((state) => state.past));

  // przy jednej tablicy sprawdzamy, czy za wskaźnikiem są jakieś elementy
  const canUndoOne = history.length - pointer > 0;
  // przy oddzielnych, czy przeszłość ma jakiekolwiek elementy
  const canUndoTwo = past.length > 0;

  return canUndoOne && canUndoTwo;
};

// reaktywna wartość określająca, czy możemy wykonać operację ponowienia
export const useCanRedo = () => {
  // dla jednej tablicy wystarczy pobrać wskaźnik
  const pointer = useOneArrayStore(useShallow((state) => state.pointer));
  // dla oddzielnych tablic potrzebujemy jedynie tablicę z przyszłością
  const future = useTwoArrayStore(useShallow((state) => state.future));

  // przy jednej tablicy sprawdzamy, czy wskaźnik nie jest na początku
  const canRedoOne = pointer > 0;
  // przy oddzielnych, czy przyszłość ma jakiekolwiek elementy
  const canRedoTwo = future.length > 0;

  return canRedoOne && canRedoTwo;
};

// reaktywna aktualna wartość
export const useCurrent = () => {
  // dla jednej tablicy musimy pobrać wskaźnik i historię
  const { history, pointer } = useOneArrayStore();
  // zwracamy wartość wskazywaną przez wskaźnik
  return history[pointer];

  // w przypadku oddzielnych tablic wystarczy odczytać wartość aktualną
  // return useTwoArrayStore(useShallow((state) => state.current));
};
