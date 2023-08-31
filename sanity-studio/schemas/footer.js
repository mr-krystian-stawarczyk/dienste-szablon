export default {
  name: 'footer',
  title: 'Dolna Stopka Nawigacji',
  type: 'document',
  fields: [
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
      name: 'nazwaFirmy',
      title: 'Nazwa Firmy',
      type: 'string',
      description: 'Do użycia all rights reserved.',
    },

    {
      name: 'email',
      title: 'Email',
      type: 'string',
      description: 'Wpisz główny tekst duży.',
    },
    {
      name: 'fbLink',
      title: 'FB Link',
      type: 'string',
      description:
        'Podaj Link FB. / Ważne! - jeżeli nie masz linku do którejś platformy nie wprowadzaj.',
    },
    {
      name: 'snLink',
      title: 'Snap Link',
      type: 'string',
      description: 'Podaj Snapchat Link.',
    },
    {
      name: 'istaLink',
      title: 'Instagram Link',
      type: 'string',
      description: 'Podaj Instagram Link.',
    },
  ],
}
