export default {
  name: 'Navbar',
  title: 'Pasek Nawygacyjny',
  type: 'document',

  fields: [
    {
      name: 'logoTextColor',
      title: 'Kolor Nazwy Loga',
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
      name: 'imageLogo',
      title: 'Logo Firmy',
      type: 'image', // Added the image type field
      description: 'Dodaj zdjęcie karty sekcji najlepiej 400x400px.',
    },
    {
      name: 'nazwaFirmy',
      title: 'Nazwa Firmy',
      type: 'string',
      description: 'Wpisz główny tekst duży.',
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
