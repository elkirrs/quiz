export const rules = [
  {
    name: 'Past Simple',
    rule: {
      positive: {
        en: 'He work<span class="text-red">ed</span> yesterday.',
        ru: 'Он работал вчера.',
      },
      negative: {
        en: 'He <span class="text-red">didn\'t</span> work yesterday.',
        ru: 'Он не работал вчера.',
      },
      question: {
        en: '<span class="text-red">Did</span> he work yesterday?',
        ru: 'Он работал вчера?',
      },
    },
    use: [
      {text: 'Непродолжительные действия в конкретный момент в прошлом'},
      {text: 'Действия, завершенные в прошлом'},
      {text: 'Действия, которые не могут повториться'},
      {text: 'Последовательные действия в прошлом'},
    ],
    markers: 'yesterday, the day before yesterday, ' +
      'just now, the other day, ' +
      'last week, last decade, last century, ' +
      'an hour ago, two weeks ago, ' +
      'in 1992, at 6 o\'clock',
    schema: {
      positive: [
        '@',
        [
          '<span class="text-size">V</span><span class="sub">ed</span>',
          '<span class="text-size">V</span><span class="sub">2</span>',
        ],
        '*'

      ],
      negative: [
        '@',
        'didn\'t',
        '<span class="text-size">V</span>',
        '*'
      ],
      question: [
        'Did',
        '@',
        '<span class="text-size">V</span>',
        '*',
        '?'
      ],
    },
  },
  {
    name: 'Present Simple',
    rule: {
      positive: {
        en: ' He work<span class="text-red">s</span> every day.',
        ru: 'Он работает каждый день',
      },
      negative: {
        en: 'He do<span class="text-red">es</span>n\'t work every day.',
        ru: 'Он не работает каждый день.',
      },
      question: {
        en: 'Do<span class="text-red">es</span> he work every day?',
        ru: 'Он работает каждый день?',
      },
    },
    use: [
      {text: 'Общие утверждения'},
      {text: 'Общеизвестные факты '},
      {text: 'Регулярно повторяющиеся действия'},
      {text: 'Расписания и договоренности'},
      {text: 'Инструкции'},
      {text: 'Комментарии'},
      {text: 'С недлительными глаголами'},
      {text: 'В заголовках'},
    ],
    markers: 'always, often, usually, regularly,' +
      'sometimes, seldom, rarely, never,' +
      'every day, twice a week,' +
      'from time to time,' +
      'four times a month, three times a week,' +
      'at the weekend, at 7 o\'clock,' +
      'on Mondays, on Sundays',
    schema: {
      positive: [
        '@',
        [
          '<span class="text-size">V</span>',
          '<span class="text-size">V</span><span class="sub">s</span>',
        ],
        '*'
      ],
      negative: [
        '@',
        [
          'don\'t',
          'doesn\'t',
        ],
        '<span class="text-size">V</span>',
        '*'
      ],
      question: [
        [
          'Do',
          'Does'
        ],
        '@',
        '<span class="text-size">V</span>',
        '*',
        '?'
      ],
    },
  },
  {
    name: 'Future Simple',
    rule: {
      positive: {
        en: 'He <span class="text-red">will</span> work tomorrow.',
        ru: 'Он будет работать завтра.',
      },
      negative: {
        en: 'He <span class="text-red">won\'t</span> work tomorrow.',
        ru: 'Он не будет работать завтра.',
      },
      question: {
        en: '<span class="text-red">Will</span> he work tomorrow?',
        ru: 'Он будет работать завтра?',
      },
    },
    use: [
      {text: 'Общее будущее'},
      {text: 'Предположения о будущем'},
      {text: 'Обещания, опасения, надежды'},
      {text: 'Прогнозы на будущее'},
      {text: 'Спонтанные решения'},
    ],
    markers: 'tomorrow, tonight, later, ' +
      'the day after tomorrow, ' +
      'next week, next year, ' +
      'in a week, in two days, ' +
      'in one of these days, ' +
      'soon, as soon as',
    schema: {
      positive: [
        '@',
        'will',
        '<span class="text-size">V</span>',
        '*'
      ],
      negative: [
        '@',
        'won\'t',
        '<span class="text-size">V</span>',
        '*'
      ],
      question: [
        'Will',
        '@',
        '<span class="text-size">V</span>',
        '*',
        '?'
      ],
    },
  },
  {
    name: 'Past Continuous',
    rule: {
      positive: {
        en: 'He <span class="text-red">was</span> work<span class="text-red">ing</span> at six o\'clock.',
        ru: 'Он работал в шесть часов.',
      },
      negative: {
        en: 'He <span class="text-red">wasn\'t</span> work<span class="text-red">ing</span> at six o\'clock.',
        ru: 'Он не работал в шесть часов.',
      },
      question: {
        en: '<span class="text-red">Was</span> he work<span class="text-red">ing</span> at six o\'clock?',
        ru: 'Он работал в шесть часов?',
      },
    },
    use: [
      {text: 'Продолжительные действия в конкретный момент времени в прошлом'},
      {text: 'Одновременные действия в прошлом'},
      {text: 'Выражение неодобрения'},
      {text: 'Запланированные действия, которые не произошли'},
    ],
    markers: 'while, when, as, ' +
      'all morning, all day, all night, ' +
      'last Monday, last week, ' +
      'at that moment, ' +
      'at the same time ',
    schema: {
      positive: [
        '@', ['was', 'were'], '<span class="text-size">V</span><span class="sub">ing</span>', '*'
      ],
      negative: [
        '@', ['wasn\'t', 'weren\'t'], '<span class="text-size">V</span><span class="sub">ing</span>', '*'
      ],
      question: [
        ['Was', 'Were'], '@', '<span class="text-size">V</span><span class="sub">ing</span>', '*', '?'
      ],
    },
  },
  {
    name: 'Present Continuous',
    rule: {
      positive: {
        en: 'He <span class="text-red">is</span> work<span class="text-red">ing</span> now.',
        ru: 'Он работает в данный момент.',
      },
      negative: {
        en: 'He<span class="text-red">\'s not</span> work<span class="text-red">ing</span> now.',
        ru: 'Он не работает сейчас (в данный момент).',
      },
      question: {
        en: '<span class="text-red">Is</span> he work<span class="text-red">ing</span> now?',
        ru: 'Он сейчас работает?',
      },
    },
    use: [
      {text: 'Действия, происходящие здесь и сейчас '},
      {text: 'Действия around now '},
      {text: 'Планы на ближайшее будущее'},
      {text: 'Меняющиеся обстоятельства'},
      {text: 'Негативный окрас действий '},
    ],
    markers: 'now, right now, ' +
      'still, currently, ' +
      'at the moment, at present, ' +
      'this morning, this afternoon, ' +
      'today, tonight, these days, ' +
      'nowadays ',
    schema: {
      positive: [
        '@', ['am', 'is', 'are'], '<span class="text-size">V</span><span class="sub">ing</span>', '*',
      ],
      negative: [
        '@', ['am not', 'isn\'t', 'aren\'t'], '<span class="text-size">V</span><span class="sub">ing</span>', '*',
      ],
      question: [
        ['Am', 'Is', 'Are'], '@', '<span class="text-size">V</span><span class="sub">ing</span>', '*', '?'
      ],
    },
  },
  {
    name: 'Future Continuous',
    rule: {
      positive: {
        en: 'He <span class="text-red">will be</span> work<span class="text-red">ing</span> at eight o\'clock.',
        ru: 'Он будет работать в восемь часов.',
      },
      negative: {
        en: 'He <span class="text-red">won\'t be</span> work<span class="text-red">ing</span> at eight o\'clock.',
        ru: 'Он не будет работать в восемь часов.',
      },
      question: {
        en: '<span class="text-red">Will</span> he <span class="text-red">be</span> work<span class="text-red">ing</span> at eight o\'clock?',
        ru: 'Он будет работать в восемь часов? ',
      },
    },
    use: [
      {text: 'Продолжительные действия в конкретный момент времени в будущем '},
      {text: 'Одновременные действия в будущем'},
      {text: 'События, которые непременно произойдут'},
      {text: 'Запланированные действия'},
      {text: 'Вежливый вопрос о планах на будущее'},
    ],
    markers: 'this time tomorrow, ' +
      'the same time next week, ' +
      'at 5 o\'clock, at that moment, ' +
      'meanwhile, meantime, in the mean time, ' +
      'all night, all the time, the whole evening, ' +
      'during this time, during the day, ' +
      'for 2 hours, for week, ' +
      'from 10 a.m. to 11 a.m. tomorrow, ' +
      'from two till three ',
    schema: {
      positive: [
        '@', 'will', 'be', '<span class="text-size">V</span><span class="sub">ing</span>', '*'
      ],
      negative: [
        '@', 'won\'t', 'be', '<span class="text-size">V</span><span class="sub">ing</span>', '*'
      ],
      question: [
        'Will', '@', 'be', '<span class="text-size">V</span><span class="sub">ing</span>', '*', '?'
      ],
    },
  },
  {
    name: 'Past Perfect',
    rule: {
      positive: {
        en: 'He <span class="text-red">had</span> finish<span class="text-red">ed</span> his report by six o\'clock yesterday.',
        ru: 'Oн закончил свой отчет к шести вечера вчера.',
      },
      negative: {
        en: 'He <span class="text-red">hadn\'t</span> finish<span class="text-red">ed</span> his report by six o\'clock yesterday.',
        ru: 'Oн не закончил свой отчет к шести вечера вчера. ',
      },
      question: {
        en: '<span class="text-red">Had</span> he finish<span class="text-red">ed</span> his report by six o\'clock yesterday?',
        ru: 'Oн закончил свой отчет к шести вечера вчера? ',
      },
    },
    use: [
      {text: 'Действия, предшествующие другим действиям в прошлом'},
      {text: 'Видимый результат в прошлом'},
      {text: 'Hardly... when и No sooner...than'},
    ],
    markers: 'before, before the moment, ' +
      'no sooner… than, hardly… when, ' +
      'by two o’clock, by half past six, ' +
      'by that time, by evening, ' +
      'by the 2nd of july',
    schema: {
      positive: [
        '@', 'had', [
          '<span class="text-size">V</span><span class="sub">ed</span>',
          '<span class="text-size">V</span><span class="sub">3</span>'
        ], '*'
      ],
      negative: [
        '@', 'hadn\'t', [
          '<span class="text-size">V</span><span class="sub">ed</span>',
          '<span class="text-size">V</span><span class="sub">3</span>'
        ], '*'
      ],
      question: [
        'Had', '@', [
          '<span class="text-size">V</span><span class="sub">ed</span>',
          '<span class="text-size">V</span><span class="sub">3</span>'
        ], '*', '?'
      ],
    },
  },
  {
    name: 'Present Perfect',
    rule: {
      positive: {
        en: 'He <span class="text-red">has</span> finish<span class="text-red">ed</span> his report by 3 o\'clock today.',
        ru: 'Он закончил свой отчет сегодня до трех дня. ',
      },
      negative: {
        en: 'He <span class="text-red">hasn\'t</span> finish<span class="text-red">ed</span> his report by 3 o\'clock today.',
        ru: 'Он не закончил свой отчет сегодня до трех дня',
      },
      question: {
        en: '<span class="text-red">Has</span> he finish<span class="text-red">ed</span> his report by 3 o\'clock today?',
        ru: 'Он закончил свой отчет сегодня до трех дня? ',
      },
    },
    use: [
      {text: 'Завершенные действия с акцентом на результат '},
      {text: 'Незавершенные действия '},
    ],
    markers: 'ever, never, once, before, today, ' +
      'often, lately, already, ' +
      'yet, not yet, just, so far, ' +
      'many times, several times, ' +
      'this week, this afternoon, ' +
      'for an hour, for a long time, ' +
      'since twelve o’clock, since 12 April ',
    schema: {
      positive: [
        '@', ['have', 'has'], [
          '<span class="text-size">V</span><span class="sub">ed</span>',
          '<span class="text-size">V</span><span class="sub">3</span>'
        ], '*'
      ],
      negative: [
        '@', ['haven\'t', 'hasn\'t'], [
          '<span class="text-size">V</span><span class="sub">ed</span>',
          '<span class="text-size">V</span><span class="sub">3</span>'
        ], '*'
      ],
      question: [
        ['Have', 'Has'], '@', [
          '<span class="text-size">V</span><span class="sub">ed</span>',
          '<span class="text-size">V</span><span class="sub">3</span>'
        ], '*', '?'
      ],
    },
  },
  {
    name: 'Future Perfect',
    rule: {
      positive: {
        en: 'He <span class="text-red">will have</span> finish<span class="text-red">ed</span> his report by 6 o\'clock tomorrow.',
        ru: 'Он закончит свой отчет завтра к шести.',
      },
      negative: {
        en: 'He <span class="text-red">won\'t have</span> finish<span class="text-red">ed</span> his report by 6 o\'clock tomorrow.',
        ru: 'Он не закончит свой отчет завтра к шести.',
      },
      question: {
        en: '<span class="text-red">Will</span> he <span class="text-red">have</span> finish<span class="text-red">ed</span> his report by 6 o\'clock tomorrow?',
        ru: 'Он закончит свой отчет завтра к шести?',
      },
    },
    use: [
      {text: 'Завершенные действия в будущем'},
    ],
    markers: 'before, till, until, ' +
      'by then, by the time, ' +
      'by 3 p.m, by 5 o’clock, ' +
      'by tomorrow, by next week ',
    schema: {
      positive: [
        '@', 'will', 'have', [
          '<span class="text-size">V</span><span class="sub">ed</span>',
          '<span class="text-size">V</span><span class="sub">3</span>'
        ], '*'
      ],
      negative: [
        '@', 'won\'t', 'have', [
          '<span class="text-size">V</span><span class="sub">ed</span>',
          '<span class="text-size">V</span><span class="sub">3</span>'
        ], '*'
      ],
      question: [
        'Will', '@', 'have', [
          '<span class="text-size">V</span><span class="sub">ed</span>',
          '<span class="text-size">V</span><span class="sub">3</span>'
        ], '*', '?'
      ],
    },
  },
  {
    name: 'Past Perfect Continuous ',
    rule: {
      positive: {
        en: 'He <span class="text-red">had been</span> work<span class="text-red">ing</span> for an hour when I came.',
        ru: 'Oн работал уже в течение часа к тому моменту, как я пришел.',
      },
      negative: {
        en: 'He <span class="text-red">hadn\'t been</span> work<span class="text-red">ing</span> for an hour when I came.',
        ru: 'Он не поработал (целый) час, когда я пришел. ',
      },
      question: {
        en: '<span class="text-red">Had</span> he <span class="text-red">been</span> work<span class="text-red">ing</span> for an hour when I came?',
        ru: 'Он уже поработал (целый) час, когда я пришел? ',
      },
    },
    use: [
      {text: 'Продолжительные действия, завершенные до определенного момента в прошлом'},
    ],
    markers: 'before, till, untill, ' +
      'all day, all year, ' +
      'for an hour, for a day, ' +
      'since 5 o’clock, since 1991, ' +
      'since last week, since last century ',
    schema: {
      positive: [
        '@', 'had', 'been', '<span class="text-size">V</span><span class="sub">ing</span>', '*'
      ],
      negative: [
        '@', 'hadn\'t', 'been', '<span class="text-size">V</span><span class="sub">ing</span>', '*'

      ],
      question: [
        'Had', '@', 'been', '<span class="text-size">V</span><span class="sub">ing</span>', '*', '?'
      ],
    },
  },
  {
    name: 'Present Perfect Continuous ',
    rule: {
      positive: {
        en: 'He <span class="text-red">has been</span> work<span class="text-red">ing</span> for an hour (аlready).',
        ru: 'Он работает уже в течение часа.',
      },
      negative: {
        en: 'He <span class="text-red">hasn\'t been</span> work<span class="text-red">ing</span> for an hour.',
        ru: 'Он не работал в течение часа.',
      },
      question: {
        en: '<span class="text-red">Has</span> he <span class="text-red">been</span> work<span class="text-red">ing</span> for an hour?',
        ru: 'Он работает уже в течение часа?',
      },
    },
    use: [
      {text: 'Действия, начатые в прошлом и продолжающиеся в данный момент времени я'},
      {text: 'Злость, недовольство, раздражение'},
    ],
    markers: 'all day, all morning, all night long, ' +
      'for half an hour, for 2 hours, ' +
      'since 10 o’clock, since yesterday, ' +
      'since last month, since 1991, ' +
      'since + action in past simple, ' +
      'lately, recently ',
    schema: {
      positive: [
        '@', ['have', 'has'], 'been', '<span class="text-size">V</span><span class="sub">ing</span>', '*'
      ],
      negative: [
        '@', ['haven\'t', 'hasn\'t'], 'been', '<span class="text-size">V</span><span class="sub">ing</span>', '*'

      ],
      question: [
        ['Have', 'Has'], '@', 'been', '<span class="text-size">V</span><span class="sub">ing</span>', '*', '?'
      ],
    },
  },
  {
    name: 'Future Perfect Continuous',
    rule: {
      positive: {
        en: 'He <span class="text-red">will have been</span> work<span class="text-red">ing</span> in this office for two years by March.',
        ru: 'Oн проработает два года в этом офисе к марту. ',
      },
      negative: {
        en: 'He <span class="text-red">won\'t have been</span> work<span class="text-red">ing</span> in this office for two years by March.',
        ru: 'Oн не проработает два года в этом офисе к марту.',
      },
      question: {
        en: '<span class="text-red">Will</span> he <span class="text-red">have been</span> work<span class="text-red">ing</span> in this office for two years by March?',
        ru: 'Проработает ли он два года в этом офисе к марту?',
      },
    },
    use: [
      {text: 'Продолжительные действия, которые продлятся до определенного момента в будущем'},
    ],
    markers: 'till, until, ' +
      'for 2 hours, for 1 year, ' +
      'by the end of the hour, ' +
      'by the end of the day, ' +
      'by the end of the year ',
    schema: {
      positive: [
        '@', 'will', 'have', 'been', '<span class="text-size">V</span><span class="sub">ing</span>', '*'
      ],
      negative: [
        '@', 'won\'t', 'have', 'been', '<span class="text-size">V</span><span class="sub">ing</span>', '*'

      ],
      question: [
        'Will', '@', 'have', 'been', '<span class="text-size">V</span><span class="sub">ing</span>', '*', '?'
      ],
    },
  },
]
