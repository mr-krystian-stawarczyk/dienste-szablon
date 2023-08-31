export default {
  name: 'porady2',
  title: 'Porady2',
  type: 'document',
  fields: [
    {
      name: 'backgroundColor',
      title: 'Kolor Tła',
      type: 'string',
      description:
        'Wybierz jaki kolor ma mieć tło sekcji. Ważne wszystkie artykuly musza miec ustawione taki sam kolor tla!',
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
      name: 'image',
      title: 'Zdjęcie Karty',
      type: 'image', // Added the image type field
      description: 'Dodaj zdjęcie karty sekcji najlepiej 400x400px.',
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
      name: 'data',
      title: 'Data Napisania',
      type: 'string',
      description:
        'Dodaj Datę strona będzie sortować artykuły według najnowszej daty DD-MM-RR Zeby dobrze sortowało.',
    },
    {
      name: 'textMaly1',
      title: 'Text Maly1',
      type: 'string',
      description: 'Wpisz główny tekst mały.',
    },
    {
      name: 'textMaly2',
      title: 'Text Maly2',
      type: 'string',
      description: 'Wpisz główny tekst mały.',
    },
    {
      name: 'textMaly3',
      title: 'Text Maly3',
      type: 'string',
      description: 'Wpisz główny tekst mały.',
    },
  ],
}
