export default {
  name: 'policy',
  title: 'Sekcja Polityka',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Tytuł, W tej sekcji policy muszą znaleść się wszystkie informacje o firmie.',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Polityki prywatnosci, wysyłki, dane firmy, prawne itp.',
    },
  ],
}
