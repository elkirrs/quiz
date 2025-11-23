export const modalVerb = [
  {
    name: 'To be going to',
    rule: [
      {
        en: 'I <span class="text-red">am going to</span> visit my parents next week.',
        ru: 'Я собираюсь навестить своих родителей на следующей неделе.',
      },
      {
        en: 'Matt <span class="text-red">is going to</span> help me with my work.',
        ru: 'Мэтт собирается помочь мне с моей работой.',
      },
      {
        en: 'Ann and Sam <span class="text-red">are going to</span> buy this car.',
        ru: 'Энн и Сэм собираются купить эту машину.',
      },
      {
        en: 'She <span class="text-red">was going to be</span> here.',
        ru: 'Она собиралась сюда прийти.',
      },
      {
        en: 'They <span class="text-red">were going to</span> travel but they couldn’t.',
        ru: 'Они собирались путешествовать, но у них не получилось.'
      }
    ],
    use: [
      {text: 'Запланированные действия'},
      {text: 'Приказ'},
    ],
    markers: 'To be going to',
    schema: [
      [
        '@', ['is', 'are'], 'going to', '*'
      ],
      [
        '@', ['was', 'were'], 'going to', '*'
      ],
    ],
  },

]
