export const app = {
  settings: {
    color: 'teal',
    variant: 'outlined',
    density: 'comfortable',
    alertDensity: 'comfortable',
    chips: true,
    maxChip: 1,
    btnSizeStart: 'large',
    closableChips: true,
    default: {
      quiz: 'words',
      trans: 'ru-en',
      mod: 'manual',
    },
    itemsQuiz: [
      {name: 'Words', code: 'words'},
      {name: 'Irregular verbs', code: 'verbs'},
      {name: 'Random', code: 'random'},
    ],
    itemsTrans: [
      {name: 'Russian to English', code: 'ru-en'},
      {name: 'English to Russian', code: 'en-ru'},
    ],
    itemsMods: [
      {name: 'Manual input', code: 'manual'},
      {name: 'Selection from the list', code: 'list'},
    ],
  },

}
