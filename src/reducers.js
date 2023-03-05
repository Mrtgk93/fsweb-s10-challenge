import { BASLANGIC_DEGER, NOT_EKLE, NOT_SIL } from "./actions";

const s10chLocalStorageKey = "s10ch";

const baslangicDegerleri = {
  notlar: [
    {
      id: "75g1IyB8JLehAr0Lr5v3p",
      date: "Fri Feb 03 2023 09:40:27 GMT+0300 (GMT+03:00)",
      body: "Bugün hava çok güzel!|En iyi arkadaşımın en iyi arkadaşı olduğumu öğrendim :)|Kedim iyileşti!",
    },
  ],
};

function localStorageStateYaz(key, data) {
  localStorage.setItem(s10chLocalStorageKey, JSON.stringify(data));
}

function localStorageStateOku(key) {
  return JSON.parse(localStorage.getItem(s10chLocalStorageKey));
}

function baslangicNotlariniGetir(key) {
  const eskiNotlar = localStorage.getItem(s10chLocalStorageKey);

  if (eskiNotlar) {
    return localStorageStateOku(key);
  } else {
    return baslangicDegerleri;
  }
}

export function alfred(state = baslangicDegerleri, action) {
  switch (action.type) {
    case NOT_EKLE:
      let newArr = {
        ...state,
        notlar: [...state.notlar, action.payload],
      };
      localStorageStateYaz(s10chLocalStorageKey, newArr.notlar);

      return {
        ...state,
        notlar: [...state.notlar, action.payload],
      };
    case NOT_SIL:
      const filteredNot = {
        ...state,
        notlar: state.notlar.filter((item) => action.payload !== item.id),
      };
      localStorageStateYaz(s10chLocalStorageKey, filteredNot);
      return filteredNot;

    case BASLANGIC_DEGER:
      return baslangicNotlariniGetir(s10chLocalStorageKey);

    default:
      return state;
  }
}
