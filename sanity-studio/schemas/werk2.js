export default {
  name: 'werk2',
  title: 'Werk 2',
  type: 'document',
  fields: [
    {
      name: 'image',
      title: 'Zdjęcie Karty',
      type: 'image', // Added the image type field
      description: 'Dodaj zdjęcie karty sekcji najlepiej 400x400px.',
    },

    {
      name: 'textDuzy',
      title: 'Text Duży',
      type: 'string',
      description: 'Wpisz główny tekst duży.',
    },
  ],
}
