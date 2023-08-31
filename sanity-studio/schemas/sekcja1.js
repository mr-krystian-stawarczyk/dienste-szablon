export default {
  name: 'sekcja1',
  title: 'Sekcja1',
  type: 'document',

  fields: [
    {
      name: 'backgroundType',
      title: 'Typ Tła',
      type: 'string',
      options: {
        list: [
          {title: 'Kolor', value: 'color'},
          {title: 'Zdjecie', value: 'image'},
        ],
      },
    },
    {
      name: 'backgroundColor',
      title: 'Kolor Tła',
      type: 'string',
      description: 'Wybierz jaki kolor ma mieć tło sekcji.',
      options: {
        list: [
          {title: 'Biały', value: 'white'},
          {title: 'Czarny', value: 'black'},
          {title: 'Czerwony', value: '#9B2335'},
          {title: 'Zielony', value: '#88B04B'},
          {title: 'Niebieski', value: '#34568B'},
          {title: 'Różowy', value: '#F7CAC9'},
          {title: 'Żółty', value: '#EFC050'},
          {title: 'Pomarańczowy', value: '#DD4124'},
          {title: 'Fioletowy', value: '#6B5B95'},
          {title: 'Turkusowy', value: '#45B8AC'},
          // Dodaj więcej opcji kolorów, jeśli potrzebujesz
        ],
      },
      hidden: ({parent}) => parent && parent.backgroundType === 'image',
    },
    {
      name: 'backgroundImage',
      title: 'Zdjecie Tło',
      type: 'image',
      description: 'Wybierz zdjęcie na tło komponentu.',
      hidden: ({parent}) => parent && parent.backgroundType === 'color',
    },

    {
      name: 'textColor',
      title: 'Kolor Tekstu',
      type: 'string',
      description: 'Wybierz kolor tekstu.',
      options: {
        list: [
          {title: 'Biały', value: 'white'},
          {title: 'Czarny', value: 'black'},
          {title: 'Czerwony', value: '#9B2335'},
          {title: 'Zielony', value: '#88B04B'},
          {title: 'Niebieski', value: '#34568B'},
          {title: 'Różowy', value: '#F7CAC9'},
          {title: 'Żółty', value: '#EFC050'},
          {title: 'Pomarańczowy', value: '#DD4124'},
          {title: 'Fioletowy', value: '#6B5B95'},
          {title: 'Turkusowy', value: '#45B8AC'},
          // Dodaj więcej opcji kolorów, jeśli potrzebujesz
        ],
      },
    },
    {
      name: 'textDuzy',
      title: 'Text Duży',
      type: 'string',
      description: 'Wpisz główny tekst duży.',
    },
    {
      name: 'textMaly',
      title: 'Text Maly',
      type: 'string',
      description: 'Wpisz główny tekst mały.',
    },
    {
      name: 'button1Text',
      title: 'Tekst Przycisku 1',
      type: 'string',
      description:
        'Najlepiej użyć tekst jak: Poznaj nas, o nas itp. ponieważ po wciśnięciu przycisku animacja odsyła nas do sekcji poniżej.',
    },
    {
      name: 'button2Text',
      title: 'Tekst Przycisku 2',
      type: 'string',
      description:
        'Najlepiej użyć test jak: Produkty, oferta itp. ponieważ przycisk odsyła nas bezpośrednio do podstrony produktów.',
    },
    {
      name: 'buttonBackground',
      title: 'Kolor Tła Przycisków',
      type: 'string',
      description: 'Wybierz kolor tła przycisków.',
      options: {
        list: [
          {title: 'Biały', value: 'white'},
          {title: 'Czarny', value: 'black'},
          {title: 'Czerwony', value: '#9B2335'},
          {title: 'Zielony', value: '#88B04B'},
          {title: 'Niebieski', value: '#34568B'},
          {title: 'Różowy', value: '#F7CAC9'},
          {title: 'Żółty', value: '#EFC050'},
          {title: 'Pomarańczowy', value: '#DD4124'},
          {title: 'Fioletowy', value: '#6B5B95'},
          {title: 'Turkusowy', value: '#45B8AC'},
          // Dodaj więcej opcji kolorów, jeśli potrzebujesz
        ],
      },
    },
    {
      name: 'buttonTextColor',
      title: 'Kolor Tekstu Przycisków',
      type: 'string',
      description: 'Wybierz kolor tekstu przycisków.',
      options: {
        list: [
          {title: 'Biały', value: 'white'},
          {title: 'Czarny', value: 'black'},
          {title: 'Czerwony', value: '#9B2335'},
          {title: 'Zielony', value: '#88B04B'},
          {title: 'Niebieski', value: '#34568B'},
          {title: 'Różowy', value: '#F7CAC9'},
          {title: 'Żółty', value: '#EFC050'},
          {title: 'Pomarańczowy', value: '#DD4124'},
          {title: 'Fioletowy', value: '#6B5B95'},
          {title: 'Turkusowy', value: '#45B8AC'},
          // Dodaj więcej opcji kolorów, jeśli potrzebujesz
        ],
      },
    },
  ],
}
