export const rules = [

  // can and could
  {
    name: 'Can и Could',
    times: [
      {
        name: 'Прошедшее',
        example: [
          {
            first: "Could",
            second: "Simple / Perfect Infinitive"
          },
          {
            first: 'I <span class="text-red">could</span> swim when I was 10.',
            second: 'Я мог плавать, когда мне было 10.'
          },
          {
            first: 'You <span class="text-red">could</span> have helped us.',
            second: 'Ты бы мог нам и помочь (тогда).'
          }
        ]
      },
      {
        name: 'Настоящее',
        example: [
          {
            first: "Can / Could",
            second: "Simple Infinitive"
          },
          {
            first: 'I <span class="text-red">can</span> swim.',
            second: 'Я умею (могу) плавать.'
          },
          {
            first: 'You <span class="text-red">could</span> help us.',
            second: 'Ты бы мог нам помочь (сейчас).'
          }
        ]
      },
      {
        name: 'Будущее',
        example: [
          {
            first: "Will be able to",
            second: ""
          },
          {
            first: 'I <span class="text-red">will be able to</span> swim soon.',
            second: 'Я смогу плавать скоро.'
          }
        ]
      }
    ],
    uses: [
      {
        name: 'Утверждение',
        example: [
          {
            first: 'I <span class="text-red">can</span> swim.',
            second: 'Я умею плавать'
          },
          {
            first: 'You <span class="text-red">can</span> use my pen.',
            second: 'Ты можешь попользоваться моей ручкой.'
          },
          {
            first: 'We <span class="text-red">could</span> run fast when we were young.',
            second: 'Мы могли быстро бегать, когда были молодыми.'
          },
          {
            first: 'You <span class="text-red">could</span> be quiet at least. I’m trying to work.',
            second: 'Ты мог бы вести себя тихо хотя бы. Я пытаюсь ',
          }
        ]
      },
      {
        name: 'Отрицание',
        example: [
          {
            first: 'I <span class="text-red">can not</span> find the key to my car.',
            second: 'Я не могу найти ключ к своей машине.'
          },
          {
            first: 'Jack <span class="text-red">could not</span> have said it.',
            second: 'Не может быть, чтобы Джек сказал такое.'
          },
          {
            first: 'My brother <span class="text-red">can’t</span> dance',
            second: 'Мой брат не умеет танцевать.'
          }
        ]
      },
      {
        name: 'Вопрос',
        example: [
          {
            first: '<span class="text-red">Can</span> I speak to your boss?',
            second: 'Можно я поговорю с твоим боссом?'
          },
          {
            first: '<span class="text-red">Could</span> they read when they were 5?',
            second: 'Они могли читать, когда им было по 5 лет?'
          },
          {
            first: '<span class="text-red">Can’t</span> you be quiet? I’m studying! ',
            second: 'Ты не можешь помолчать? Я учусь!'
          },
          {
            first: 'Could you switch off the air conditioning? ',
            second: 'Не мог бы ты выключить кондиционер?'
          }
        ]
      }
    ],
    features: [
      {
        name: 'Возможность',
        example: [
          {
            first: 'Harry Potter can talk to snakes.',
            second: 'Гарри Поттер может говорить со змеями.'
          },
          {
            first: 'I could dance all night long when I was young.',
            second: 'Я мог танцевать всю ночь, когда был молод.'
          },
          {
            first: 'Could Alex dance the waltz at the high school?',
            second: 'Алекс мог танцевать вальс в старшей школе?'
          }
        ]
      },
      {
        name: 'Факты',
        example: [
          {
            first: 'It can be pretty difficult to find a job these days',
            second: 'В эти дни найти работу может быть очень сложно'
          },
          {
            first: 'Children can’t buy alcohol and cigarettes.',
            second: 'Дети не могут покупать спиртное и сигареты.'
          },
          {
            first: 'You can drive only when you have your driving license.',
            second: 'Можно водить машину, только когда у тебя есть водительские права.'
          },
        ],
      },
      {
        name: 'Разрешения',
        example: [
          {
            first: 'Can I speak to your boss?',
            second: 'Можно я поговорю с твоим боссом?'
          },
          {
            first: 'Could I use your notes?',
            second: 'Можно я воспользуюсь твоими записями?'
          },
          {
            first: 'She said you could not.',
            second: 'Она сказала, что нельзя.'
          }
        ]
      },
      {
        name: 'Недовольства',
        example: [
          {
            first: 'You could speak more distinctly without your chewing-gum.',
            second: 'Ты мог бы говорить более разборчиво без своей жевательной резинки.',
          },
          {
            first: 'We could go to the party today',
            second: 'Мы могли бы сходить на вечеринку сегодня. (но мы не пойдем)',
          },
          {
            first: 'She could have explained us how to do this work.',
            second: 'Она бы могла объяснить, как делать эту работу.',
          }
        ]
      },
      {
        name: 'Сомнение',
        example: [
          {
            first: 'Can she be right?',
            second: 'Неужели она права?',
          },
          {
            first: 'Can she be telling the truth?',
            second: 'Неужели она говорит правду (сейчас)?',
          },
          {
            first: 'Could she have been living with him for 5 years?',
            second: 'Неужели это правда, что она прожила с ним 5 лет?',
          }
        ]
      },
      {
        name: 'Выражение невероятности',
        example: [
          {
            first: 'Ann can not be right.',
            second: 'Не может быть, чтобы Энн была права.',
          },
          {
            first: 'Ann couldn’t be telling the truth.',
            second: 'Энн вряд ли говорит правду (сейчас).',
          },
          {
            first: 'Ann couldn’t have been living with Matt for 5 years.',
            second: 'Не может быть, чтобы Энн прожила с Мэттом 5 лет.',
          }
        ]
      },
      {
        name: 'Устойчивые выражения',
        example: [
          {
            first: 'I can’t help laughing! This TV-show is so funny!',
            second: 'Не могу сдержать смех! Это шоу такое смешное!',
          },
          {
            first: 'Jack couldn’t help smiling when he saw her.',
            second: 'Он не мог сдержать улыбки, когда видел ее.',
          },
          {
            first: 'I can’t but refuse your offer.',
            second: 'Мне ничего не остается, как отклонить ваше предложение.',
          }
          ,
          {
            first: 'She couldn’t but ask him about it.',
            second: 'Ей ничего не оставалось делать, как спросить его об этом.',
          }
          ,
          {
            first: 'I can’t possibly do it.',
            second: 'Я просто не могу это сделать.',
          }
        ]
      },
      {
        name: 'To be able to',
        example: [
          {
            first: 'I can play football.',
            second: 'Я могу (умею) играть в футбол. (физическая способность)',
          },
          {
            first: 'I’m able to play football today.',
            second: 'Я могу поиграть в футбол сегодня. (возможность)',
          },
          {
            first: 'I will be able to play football next week.',
            second: 'Я смогу поиграть в футбол на следующей неделе',
          }
        ]
      }
    ],
    rules: [
      {
        name: 'Правило',
        text: "Модальный глагол can можно перевести как «могу», «можно», «не может быть», «неужели…?». Он употребляется для выражения умения, физической возможности, разрешения, просьбы, запрета, уверенности или сомнения в чем-то, невероятности чего-то. Модальный глагол can в прошедшем времени или при согласовании времен меняется на could. Can не имеет формы будущего времени, в этом случае вместо него используется будущая форма конструкции to be able to."
      }
    ]
  },

  // should and ought to
  {
    name: 'Should и Ought to',
    times: [
      {
        name: 'Прошедшее',
        example: [
          {
            first: "Perfect / Perfect Continuous",
            second: ""
          },
          {
            first: 'You <span class="text-red">should</span> have done it.',
            second: 'Ты должен был это сделать.'
          },
          {
            first: 'You <span class="text-red">ought to</span> have been studying harder last year.',
            second: 'Ты должен был учиться усерднее в прошлом году.'
          }
        ]
      },
      {
        name: 'Настоящее',
        example: [
          {
            first: "Simple / Continuous Infinitive",
            second: ""
          },
          {
            first: 'You <span class="text-red">should</span> do it now.',
            second: 'Ты должен сделать это сейчас.'
          },
          {
            first: 'You <span class="text-red">ought to</span> be studying harder.',
            second: 'Ты должен учиться усерднее (сейчас).'
          }
        ]
      },
      {
        name: 'Будущее',
        example: [
          {
            first: "Simple Infinitive",
            second: ""
          },
          {
            first: 'You <span class="text-red">should</span> do it tomorrow.',
            second: 'Ты должен будешь сделать это завтра.'
          },
          {
            first: 'You <span class="text-red">ought to</span> help your parents when they are old.',
            second: 'Ты должен будешь помогать своим родителям, когда они состарятся.'
          }
        ]
      }
    ],
    uses: [
      {
        name: 'Утверждение',
        example: [
          {
            first: 'It’s late already. You <span class="text-red">should</span> go to bed.',
            second: 'Уже поздно. Ты должен идти спать.'
          },
          {
            first: 'We <span class="text-red">should</span> stop him! He is going to commit a crime!',
            second: 'Мы должны остановить его! Он намерен совершить преступление!'
          },
          {
            first: 'Don’t forget your coat. It <span class="text-red">should</span> be chilly outside.',
            second: 'Не забудь свой плащ. На улице, должно быть, прохладно.'
          }
        ]
      },
      {
        name: 'Отрицание',
        example: [
          {
            first: 'You <span class="text-red">should not</span> go outside late.',
            second: 'Тебе не следует выходить из дому поздно.'
          },
          {
            first: 'Those children <span class="text-red">shouldn’t be playing</span> near the road.',
            second: 'Тем детям не стоит играть возле дороги.'
          },
          {
            first: 'Don’t take your coat. It <span class="text-red">oughtn’t to be</span> cold outside.',
            second: 'Не бери свой плащ. На улице не должно быть холодно.'
          },
        ]
      },
      {
        name: 'Вопрос',
        example: [
          {
            first: '<span class="text-red">Ought</span> we to help everyone who is in need?',
            second: 'Должны ли мы помогать всем, кто в нужде?'
          },
          {
            first: '<span class="text-red">Should</span> I come to your house and help you?',
            second: 'Нужно ли мне прийти к тебе и помочь?'
          },
          {
            first: 'Why are you here? <span class="text-red">Shouldn’t</span> you <span class="text-red">be studying</span> now?',
            second: 'Почему ты здесь? Разве ты не должен учиться сейчас?'
          },
          {
            first: '<span class="text-red">Shouldn’t</span> she <span class="text-red">have gone</span> to the party?',
            second: 'Ей стоило пойти на вечеринку, не так ли?'
          }
        ]
      }
    ],
     features: [
      {
        name: 'Should или Ought to',
        example: [
          {
            first: 'I ought to marry Kate because I truly love her.',
            second: 'Я должен жениться на Кейт, потому что я действительно люблю ее.'
          },
                  {
            first: 'You should come on time tomorrow.',
            second: 'Ты должен прийти вовремя завтра.'
          },
                  {
            first: 'It should be difficult to live in a foreign country',
            second: 'Должно быть, жить в чужой стране – это сложно.'
          }
        ]
      },
            {
        name: 'Should или Must',
        example: [
          {
            first: 'You should be on time tomorrow.',
            second: 'Ты должен (постараться) прийти вовремя завтра.'
          },
                   {
            first: 'You must be on time tomorrow.',
            second: 'Ты обязан прийти вовремя завтра.'
          },
                   {
            first: 'He shouldn’t go out without us.',
            second: 'Ему не следует выходить из дома без нас.'
          },
                   {
            first: 'He mustn’t go out without us.',
            second: 'Ему запрещается выходить из дома без нас.'
          }
        ]
      },
            {
        name: 'Should в конструкциях',
        example: [
          {
            first: 'Janice demands that Jack should apologize to her.',
            second: 'Дженис требует, чтобы Джек извинился перед ней.'
          },
                    {
            first: 'My parents insisted that we should have dinner with them.',
            second: 'Мои родители настояли, чтобы мы ужинали с ними.'
          },
                    {
            first: 'It’s strange that Paul should be rude. He is usually really polite.',
            second: 'Это странно, что Пол грубит. Он обычно очень вежлив.'
          },
                    {
            first: 'I was surprised that Matt should behave like that',
            second: 'Я удивился, что Мэтт так себя вел.'
          },
                    {
            first: 'If you should see Tom tonight, can you tell him to phone me?',
            second: 'Если вдруг ты встретишь Тома сегодня вечером, ты можешь ему передать, чтобы он мне позвонил?'
          },
                    {
            first: 'If it should rain, can you bring in the washing from the garden?',
            second: 'Если вдруг пойдет дождь, ты можешь занести постиранное белье со двора?'
          },
          {
            first: "Should it be sunny, can you hang out the washing in the garden?",
            second: "Если вдруг будет солнечно, ты можешь вывесить во дворе белье?"
          }
        ]
      }
    ],
    rules: [
      {
        name: 'Правило',
        text: "Модальные глаголы should и ought to используются только в одной форме настоящего времени для всех лиц. В большинстве случаев они неразличимы по смыслу и могут свободно заменять друг друга. Should и ought to выражают моральную обязанность, долг, совет, предположения, ожидания и переводятся как «должен», «следует», «следовало бы», «скорее всего».<br>"

              + "После ought всегда употребляется инфинитив смыслового глагола с частицей to, а после should частица to не используется никогда. Они никогда не изменяются в непрямой речи.<br>"

              + "После should и ought to могут использоваться глаголы во всех формах инфинитива: Simple Infinitive, Continuous Infinitive, Perfect Infinitive, Perfect Continuous Infinitive."
      }
    ]
  },
// need
  {
    name: 'Need',
    times: [
      {
        name: 'Прошедшее',
        example: [
          {
            first: "Simple Infinitive",
            second: ""
          },
          {
            first: 'You needed to work.',
            second: 'Тебе нужно было работать.'
          },
        ]
      },
      {
        name: 'Настоящее',
        example: [
          {
            first: "Simple Infinitive",
            second: ""
          },
          {
            first: 'You needn\'t work.',
            second: 'Тебе не обязательно работать.'
          },
          {
            first: 'Perfect Infinitive',
            second: ''
          },
                    {
            first: 'You needn\'t have worked.',
            second: 'Тебе не обязательно было работать.'
          }
        ]
      },
      {
        name: 'Будущее',
        example: [
          {
            first: "Simple Infinitive",
            second: ""
          },
          {
            first: 'You will need to work.',
            second: 'Тебе нужно будет работать.'
          },
        ]
      }
    ],
    uses: [
      {
        name: 'Утверждение',
        example: [
          {
            first: 'I need hardly say that I will do anything for you.',
            second: 'Вряд ли нужно говорить, что я сделаю ради тебя все.'
          },
          {
            first: 'They need hardly hurry. They still have plenty of time before their flight.',
            second: 'Им вряд ли нужно торопиться. У них еще полно времени перед вылетом.'
          },
          {
            first: 'You need scarcely explain this material to students. They know it well.',
            second: 'Едва ли тебе нужно объяснять этот материал студентам. Они знают его хорошо.'
          }
        ]
      },
      {
        name: 'Отрицание',
        example: [
          {
            first: 'I hope you can hear me so I need not shout.',
            second: 'Я надеюсь, вы можете меня слышать, поэтому мне не нужно кричать.'
          },
          {
            first: 'You need not be afraid of my dog.',
            second: 'Тебе незачем бояться мою собаку.'
          },
          {
            first: 'Jack needn’t come here every day.',
            second: 'Джеку нет необходимости приходить сюда каждый день.'
          }
        ]
      },
      {
        name: 'Вопрос',
        example: [
          {
            first: 'Need I repeat my question? ',
            second: 'Нужно ли мне повторять свой вопрос?'
          },
          {
            first: 'No, you needn’t. You can go.',
            second: 'Нет, не нужно. Ты можешь идти.'
          },
          {
            first: 'Need they really come here? I don’t feel comfortable in their company. ',
            second: 'Им обязательно приходить сюда? Я не чувствую себя комфортно в их компании.'
          }
        ]
      }
    ],
     features: [
      {
        name: 'Need и need to',
        example: [
          {
            first: 'Need we stay here longer?',
            second: 'Нужно ли (действительно) нам оставаться тут дольше? (Need как модальный глагол)'
          },
                   {
            first: 'Do we need to stay here longer?',
            second: 'Нужно ли нам оставаться тут дольше? (Need как смысловой глагол)'
          },
        ]
      },
            {
        name: 'Need c Present Perfect',
        example: [
          {
            first: 'I needn’t have gone to the library. It was closed.',
            second: 'Напрасно я пошел в библиотеку. Она была закрыта.'
          },
                   {
            first: 'We needn\'t have hurried. The concert hasn’t started yet anyway. ',
            second: 'Не нужно было нам торопиться. Все равно концерт еще не начался.'
          },
                   {
            first: 'He needn’t have said that, I suppose.',
            second: 'Мне кажется, он напрасно сказал это.'
          }
        ]
      }
    ],
    rules: [
      {
        name: 'Правило',
        text: "Модальный глагол need используется для выражения необходимости совершить определенное действие. Как правило, используется только в вопросительных и отрицательных предложениях.<br>"
               + "В качестве модального глагол need употребляется с первой формой глагола (простым инфинитивом) без частицы to и имеет только форму настоящего времени (Present Simple). В прошедшем и будущем временах модальный глагол need заменяется на смысловой глагол to need (нужно)."
      }
    ]
  },


// dare
  {
    name: 'Dare',
    times: [
      {
        name: 'Прошедшее',
        example: [
          {
            first: "dared",
            second: ""
          },
          {
            first: 'He <span class="text-red">dared not</span> do that.',
            second: 'Он не посмел сделать этого.'
          },
          {
            first: 'How <span class="text-red">dared</span> you do this?',
            second: 'Как ты посмел сделать такое?'
          }
        ]
      },
      {
        name: 'Настоящее',
        example: [
          {
            first: "dare",
            second: ""
          },
          {
            first: 'And he <span class="text-red">dare</span> do that!',
            second: 'И он смеет еще делать это!'
          },
          {
            first: 'How <span class="text-red">dare</span> you do this?',
            second: 'Как ты смеешь делать такое?'
          }
        ]
      },
      {
        name: 'Будущее',
        example: [
          {
            first: "will dare to",
            second: ""
          },
          {
            first: 'I don\'t think he <span class="text-red">will dare to</span> do it.',
            second: 'Не думаю, что он рискнет сделать это.'
          },
          {
            first: 'He <span class="text-red">won\'t dare to</span> do it.',
            second: 'Он не рискнет сделать это.'
          }
        ]
      }
    ],
    uses: [
      {
        name: 'Утверждение',
        example: [
          {
            first: 'And he <span class="text-red">dare</span> come here!',
            second: 'И у него еще хватает наглости приходить сюда!'
          },
          {
            first: 'I <span class="text-red">dare say</span> soon we will find some solutions to solve this problem.',
            second: 'Я считаю, что скоро мы найдем решения для этой проблемы.'
          },
          {
            first: 'I <span class="text-red">dare say</span> Matt had to work hard to get this job.',
            second: 'Мне кажется, Мэтту пришлось очень потрудиться, чтобы получить эту работу.'
          }
        ]
      },
      {
        name: 'Отрицание',
        example: [
          {
            first: 'You <span class="text-red">dare not</span> behave yourself like that!',
            second: 'Не смей так себя вести!'
          },
          {
            first: 'I <span class="text-red">dared not</span> show up at Jean’s house',
            second: 'Я не отваживалась появляться в доме Жана.'
          },
          {
            first: 'You <span class="text-red">daren’t</span> go there without me! ',
            second: 'Ты не посмеешь пойти туда без меня!'
          }
        ]
      },
      {
        name: 'Вопрос',
        example: [
          {
            first: '<span class="text-red">Dare</span> you lie to me?',
            second: 'Ты смеешь врать мне?'
          },
          {
            first: 'How <span class="text-red">dare</span> Paul insult you?',
            second: ' Как Пол смеет оскорбить тебя?'
          },
          {
            first: 'How <span class="text-red">dared</span> you do this?',
            second: ' Как только ты посмел сделать это?'
          }
        ]
      }
    ],
     features: [
      {
        name: 'Dared not и Didn\'t dare',
        example: [
          {
            first: 'We didn’t <span class="text-red">dare</span> say anything against it.',
            second: 'Мы не решились противоречить этому.'
          },
                  {
            first: 'He didn’t <span class="text-red">dare</span> tell her all the truth about himself.',
            second: 'Он не решился рассказать ей всю правду о себе.'
          },
                  {
            first: 'I know you didn’t <span class="text-red">dare</span> give the order to charge the bridge until you saw us on the other side',
            second: 'Я знаю, что ты не решался отдать приказ опустить мост, пока не увидел нас на другом берегу. (Бернард Шоу)'
          }
        ]
      },
            {
        name: 'Dare и Dare to',
        example: [
          {
            first: 'Ann doesn’t <span class="text-red">dare to</span> complain about her boss’s attitude.',
            second: 'Энн не решается пожаловаться на отношение к ней ее босса.'
          },
                  {
            first: 'How did he <span class="text-red">dare to</span> open his mouth even?',
            second: 'Как он вообще посмел открыть свой рот?'
          },
                  {
            first: 'My friend <span class="text-red">dared</span> me to kiss a stranger.',
            second: 'Мой друг поспорил, что я не поцелую незнакомого парня.'
          },
                  {
            first: 'You <span class="text-red">dare not</span> behave yourself like that!',
            second: 'Ты не посмеешь так себя вести!'
          },
                  {
            first: 'He <span class="text-red">dare not</span> come here! ',
            second: 'Он не посмеет приходить сюда!'
          },
                  {
            first: 'How <span class="text-red">dare</span> he!',
            second: 'Как он смеет!'
          }
        ]
      },
            {
        name: 'Daresay',
        example: [
          {
            first: 'Ann has got a lot of admirers. I <span class="text-red">daresay</span> she is very beautiful and smart.',
            second: 'У Энн много поклонников. Она действительно очень красивая и умная.'
          },
                  {
            first: 'Jack earns a lot money but I <span class="text-red">daresay</span> he deserves it.',
            second: 'Джек зарабатывает много денег, но, честно говоря, он этого достоин.'
          },
                  {
            first: 'I <span class="text-red">daresay</span> we will finish this project soon.',
            second: 'Я считаю, что мы скоро закончим этот проект.'
          }
        ]
      }
    ],
    rules: [
      {
        name: 'Правило',
        text: "Модальный глагол dare имеет форму настоящего (dare) и прошедшего времени (dared), но не присоединяет к себе окончание -s, и переводится как «иметь смелость» сделать что-либо, «сметь», «иметь наглость», «решаться на».<br>"

              + "Модальный глагол dare может полностью заменяться на смысловой глагол dare (to). После модального глагола dare используется только простой инфинитив смыслового глагола без частицы to."
      }
    ]
  },

// must
  {
    name: 'Must',
    times: [
      {
        name: 'Прошедшее',
        example: [
          {
            first: "Simple Infinitive",
            second: ""
          },
          {
            first: 'I had to leave.',
            second: 'Я должен был уйти.'
          }
        ]
      },
      {
        name: 'Настоящее',
        example: [
          {
            first: "Simple Infinitive",
            second: ""
          },
          {
            first: 'I must leave now.',
            second: 'Я должен уходить сейчас.'
          },
          {
            first: 'Continuous Infinitive',
            second: ''
          },
                   {
            first: 'You must be joking!',
            second: 'Ты, наверное, шутишь!'
          },
                   {
            first: 'Perfect Infinitive',
            second: ''
          }
          ,
                   {
            first: 'They must have forgotten.',
            second: 'Они, должно быть, забыли.'
          }
        ]
      },
      {
        name: 'Будущее',
        example: [
          {
            first: "Simple Infinitive",
            second: ""
          },
          {
            first: 'I will have to leave soon.',
            second: 'Я должен буду уйти скоро.'
          }
        ]
      }
    ],
    uses: [
      {
        name: 'Утверждение',
        example: [
          {
            first: 'I must go now. It’s too late.',
            second: 'Я должен идти сейчас. Уже слишком поздно.'
          },
          {
            first: 'You must play with us',
            second: 'Вы должны играть с нами.'
          },
          {
            first: 'It’s an interesting book. You must read it.',
            second: 'Это очень интересная книга. Ты должен обязательно прочитать её.'
          }
        ]
      },
      {
        name: 'Отрицание',
        example: [
          {
            first: 'I must hurry. I must not be late.',
            second: 'Я должен спешить.Мне нельзя опаздывать.'
          },
          {
            first: 'You mustn’t speak here.',
            second: 'Вам нельзя здесь разговаривать.'
          },
          {
            first: 'You should not walk on the grass.',
            second: 'Вам не стоит ходить по траве.'
          }
        ]
      },
      {
        name: 'Вопрос',
        example: [
          {
            first: 'Must I do my homework?',
            second: 'Я должен делать домашнее задание?'
          },
          {
            first: 'Must they bring their documents?',
            second: 'Они должны принести документы?'
          },
          {
            first: 'When must we come back?',
            second: 'Когда нам нужно возвращаться?'
          }
        ]
      }
    ],
     features: [
      {
        name: 'Уверенность, предположение',
        example: [
          {
            first: 'He must be at home now.',
            second: 'Он, должно быть, дома сейчас.'
          },
                  {
            first: 'It must be difficult to pass this exam.',
            second: ' Должно быть, сдать этот экзамен – это сложно.'
          },
                  {
            first: 'She must be staying at the seaside resort now.',
            second: 'Она, должно быть, находится на морском курорте сейчас.'
          },
                  {
            first: 'They must have forgiven us.',
            second: 'Они, должно быть, простили нас.'
          },
          {
            first: "They might have never read this book.",
            second: "Они, быть может, никогда не читали эту книгу.",
          }
        ]
      },
            {
        name: 'Выражение экспрессии',
        example: [
          {
            first: 'When we have a lot of work, they must forget about it.',
            second: 'Именно когда у нас так много работы, они возьми и забудь об этом.'
          },
          {
            first: 'Now, when I’m in a difficult situation, they must kick me out of the house',
            second: 'Сейчас, когда я нахожусь в затруднительном положении, они возьми да и выгони меня из дома.'
          }
        ]
      },
            {
        name: 'Must или Have to?',
        example: [
          {
            first: 'Children must clean their room.',
            second: 'Дети должны убрать свою комнату (это правило).'
          },
                 {
            first: 'Children have to clean their room.',
            second: 'Дети должны убрать свою комнату (их заставляют).'
          },
                 {
            first: 'You must play chess with your dad.',
            second: 'Ты должен сыграть в шахматы со своим отцом.'
          },
                 {
            first: 'You will have to play chess with your dad.',
            second: 'Ты должен будешь сыграть в шахматы со своим отцом.'
          },

                 {
            first: 'She must go to the swimming–pool with his relatives.',
            second: 'Она должна пойти в бассейн с его родственниками.'
          }
        ]
      },
            {
        name: 'Запрет и отсутствие необходимости',
        example: [
          {
            first: 'Must I stay here? ',
            second: ' Мне нужно остаться тут?'
          },
                  {
            first: 'You need not be here.',
            second: ' Вам не обязательно быть тут.'
          },
                  {
            first: 'You must not be here!',
            second: 'Вы не должны быть тут! (вам запрещается)'
          }
        ]
      }
    ],
    rules: [
      {
        name: 'Правило',
        text: "Модальный глагол must употребляется без частицы to и имеет только одну форму для всех лиц. Используется для выражения приказа, совета, запрета, обязательств по отношению к другому человеку или к самому себе, которые нужно беспрекословно выполнить. Также может использоваться для выражения вероятности или уверенности говорящего в чем-то.<br>"
               + "Модальный глагол must употребляется со смысловыми глаголами в трех формах инфинитива: Simple Infinitive (глагол в первой форме), Continuous Infinitive и Perfect Infinitive. Про выбор нужной формы инфинитива читайте в особенностях употребления. После must не используется частица to. Must не имеет форм будущего и прошедшего времени, потому в этих временах он всегда заменяется на модальную конструкцию have to."
      }
    ]
  },

// to be to
  {
    name: 'To be to',
    times: [
      {
        name: 'Прошедшее',
        example: [
          {
            first: "Simple / Perfect Infinitive",
            second: ""
          },
          {
            first: 'We were to meet at 5 p.m.',
            second: 'Мы должны были встретиться в 5 вечера.'
          },
          {
            first: 'He was to have met us but he forgot to do it.',
            second: 'Он должен был встретить нас, но он забыл об этом.'
          }
        ]
      },
      {
        name: 'Настоящее',
        example: [
          {
            first: "Simple Infinitive",
            second: ""
          },
          {
            first: 'We are to meet at 5 p.m.',
            second: 'Мы должны встретиться в 5 вечера.'
          },
        ]
      },
      {
        name: 'Будущее',
        example: [
          {
            first: "Shall / Will have to",
            second: ""
          },
          {
            first: 'We will have to meet next week.',
            second: 'Нам нужно будет встретиться на следующей неделе.'
          },

        ]
      }
    ],
    uses: [
      {
        name: 'Утверждение',
        example: [
          {
            first: 'Today you are to work in this room.',
            second: 'Сегодня ты работаешь в этой комнате.'
          },
          {
            first: 'I was to meet my friends at the station.',
            second: 'Я должен был встретить друзей на станции.'
          },
          {
            first: 'I know where this book is to be found.',
            second: 'Я знаю, где эту книгу можно найти.'
          }
        ]
      },
      {
        name: 'Отрицание',
        example: [
          {
            first: 'You are not to be here!',
            second: 'Ты не должен здесь находиться!'
          },
          {
            first: 'My friends were not to go to yesterday’s concert.',
            second: 'Моим друзьям запретили пойти на вчерашний концерт.'
          },
          {
            first: 'This novel is not to be read in one day. It’s too big.',
            second: ' Невозможно прочитать этот роман за один день. Он слишком большой.'
          },
          {
            first: 'We wanted to stay friends but it wasn’t to happen.',
            second: 'Мы хотели остаться друзьями, но этому не суждено было случиться.'
          }
        ]
      },
      {
        name: 'Вопрос',
        example: [
          {
            first: 'Am I to stay here?',
            second: 'Мне нужно остаться тут?'
          },
          {
            first: 'Is Jack to make a speech during the meeting?',
            second: 'Джек должен выступать на собрании?'
          },
          {
            first: 'When are you to go to the university?',
            second: 'Когда ты собираешься идти в университет?'
          }
        ]
      }
    ],
     features: [
      {
        name: 'To be to / To be going to',
        example: [
          {
            first: 'This year we are to go to Spain for a scientific conference.',
            second: 'В этом году мы собираемся в Испанию на научную конференцию.'
          },
          {
            first: 'This year we are going to visit Spain for a scientific conference.',
            second: 'В этом году мы собираемся в Испанию на научную конференцию.'
          },
                    {
            first: 'He was to make a speech at the meeting.',
            second: 'Он собирался выступить на собрании.'
          },
                            {
            first: 'He was going to make a speech at the meeting.',
            second: 'Он собирался выступить на собрании.'
          }
        ]
      },
            {
        name: 'Действие, которое не было выполнено',
        example: [
          {
            first: 'I was to have met my friends at the station but I forgot about that.',
            second: 'Я должен был встретить своих друзей на станции, но я забыл об этом.'
          },
                    {
            first: 'He was to have made a speech but he didn’t even come to the meeting.',
            second: 'Он собирался выступать на собрании, но он даже не пришел на него.'
          },
        ]
      },
            {
        name: 'Неизбежность',
        example: [
          {
            first: 'This boy is to become a great scientist in the future.',
            second: 'Этому мальчику суждено стать великим ученым в будущем.'
          },
                    {
            first: 'This was to be the last novel of the writer.',
            second: 'Этот роман стал последней работой автора.'
          },
                    {
            first: 'That day I was thinking what was to become of me after. ',
            second: 'В тот день я думал о том, что со мной будет дальше.'
          }
        ]
      },
            {
        name: 'Отчаяние',
        example: [
          {
            first: 'What am I to do?',
            second: 'Что мне делать? Как мне быть?'
          },
                    {
            first: 'What is to become of me?',
            second: 'Что со мной будет?'
          },
                    {
            first: 'Where am I to go? ',
            second: 'Куда же мне деваться?'
          }
        ]
      },
            {
        name: 'Намерение, желание',
        example: [
          {
            first: 'If we are to work on this project we should start right now.',
            second: 'Если мы хотим работать над этим проектом, нам нужно приступать к нему сейчас же.'
          },
                    {
            first: 'If you are to go abroad you should get a visa.',
            second: 'Если ты собираешься за границу, ты должен получить визу.'
          },
                    {
            first: 'If you are not to go abroad you don\'t need an international passport.',
            second: 'Если ты не собираешься за границу, тебе не нужен загранпаспорт.'
          }
        ]
      },
            {
        name: 'If.. were to',
        example: [
          {
            first: 'If I were to fail my examination tomorrow, I would be excluded from my university. ',
            second: 'Если завтра я вдруг завалю свои экзамены, меня выгонят из университета. (я точно не завалю экзамены)'
          },
                    {
            first: 'If I were to have failed my examination last year, I would have been excluded from my university.',
            second: 'Если бы я вдруг завалил свои экзамены в прошлом году, меня бы выгнали из университета. (я бы точно не завалил экзамены)'
          },
                    {
            first: 'If she were to have married Jack, she would have suffered a lot.',
            second: 'Если бы она (тогда) вышла замуж за Джека, она бы много страдала. (она не вышла за Джека и вряд ли бы вышла когда-либо)'
          }
        ]
      },
            {
        name: 'To be to в газетных заголовках',
        example: [
          {
            first: 'The presidents are to meet in London.',
            second: 'Президенты собираются встретиться в Лондоне.'
          },
                    {
            first: 'The presidents to meet in London.',
            second: 'Президенты встретятся в Лондоне.'
          },
        ]
      },
    ],
    rules: [
      {
        name: 'Правило',
        text: "Модальная конструкция to be to с инфинитивом смыслового глагола используется для выражения планов, договоренностей, приказа, инструкции, запрета и того, чему суждено случится.<br>"
               + "To be to имеет три формы настоящего (am, are, is) и две формы прошедшего времени (was и were). Правила спряжения этого глагола читайте в статье про смысловой глагол to be.<br>"
               + "В настоящем времени конструкция to be to употребляется только с глаголами в форме простого инфинитива. После to be to в прошедшем времени (was to, were to) используются глаголы в форме простого инфинитива (первая форма глагола) или совершенного инфинитива. Для будущего времени модальная конструкция to be to заменяется на have to в форме будущего времени will have to."
      }
    ]
  },

// had better
  {
    name: 'Had better',
    times: [
      {
        name: 'Прошедшее',
        example: [
          {
            first: "Should / Ought to",
            second: "Perfect Infinitive"
          },
          {
            first: 'You should have done it.',
            second: 'Ты должен был это сделать.'
          },
          {
            first: 'We shouldn\'t have said that.',
            second: 'Лучше бы мы этого не говорили.'
          }
        ]
      },
      {
        name: 'Настоящее',
        example: [
          {
            first: "Had better",
            second: "Simple infinitive"
          },
          {
            first: 'I had better do it now.',
            second: 'Я лучше сделаю это сейчас.'
          },
          {
            first: 'You had better not go there.',
            second: 'Лучше тебе не идти туда.'
          }
        ]
      },
      {
        name: 'Будущее',
        example: [
          {
            first: "Simple / Perfect Infinitive"
          },
          {
            first: 'I had better do it tomorrow.',
            second: 'Я лучше сделаю это завтра.'
          },
          {
            first: 'We had better have done it till next Monday.',
            second: 'Нам лучше закончить это до следующего понедельника.'
          }
        ]
      }
    ],
    uses: [
      {
        name: 'Утверждение',
        example: [
          {
            first: 'I had better leave now so I won’t miss my bus.',
            second: 'Мне лучше выйти сейчас, чтобы я не пропустил свой автобус.'
          },
          {
            first: 'The train leaves in 15 minutes. She\'d better hurry up.',
            second: 'Поезд отправляется через 15 минут. Ей лучше поторопиться.'
          },
          {
            first: 'We had better have finished this report till next Monday.',
            second: 'Нам стоит закончить этот отчет до следующего понедельника.'
          }
        ]
      },
      {
        name: 'Отрицание',
        example: [
          {
            first: 'I had better not drive now. I’m really tired.',
            second: 'Мне лучше не водить машину сегодня. Я очень устал.'
          },
          {
            first: 'Your friends had better not leave their house. There was a storm warning today.',
            second: 'Твоим друзьям лучше не покидать свой дом. Сегодня было штормовое предупреждение.'
          },
          {
            first: 'You don’t look very well. You’d better not go to school today. ',
            second: 'Ты выглядишь не очень хорошо. Тебе лучше не идти в школу сегодня.'
          }
        ]
      },
      {
        name: 'Вопрос',
        example: [
          {
            first: 'Had I better tell her the truth right now?',
            second: 'Мне стоит сказать ей всю правду прямо сейчас?'
          },
          {
            first: 'Had we better hurry up so we won’t miss everything?',
            second: 'Может, нам лучше поторопиться, чтобы мы ничего не пропустили?'
          },
          {
            first: 'Hadn’t you better go to bed? It’s pretty late.',
            second: 'Может, тебе стоит лечь спать? Уже довольно поздно.'
          }
        ]
      }
    ],
     features: [
      {
        name: 'Had better, Should, Ought to',
        example: [
          {
            first: 'You’d better stop talking or the teacher will turn you out of the classroom',
            second: 'Тебе лучше прекратить разговаривать, а не то учитель выгонит тебя из класса. (нежелательное последствие)'
          },
                    {
            first: 'You should brush your teeth every day.',
            second: 'Ты должен чистить зубы каждый день. (правило)'
          },
                    {
            first: 'I ought to visit my grandma every week.',
            second: 'Я должен навещать свою бабушку каждую неделю. (обычная обязанность)'
          },
                    {
            first: 'You had better pay your bills tomorrow.',
            second: 'Тебе стоит оплатить свои счета завтра. (будущее)'
          },
                    {
            first: 'You should have paid your bills yesterday.',
            second: 'Ты должен был оплатить свои счета вчера. (прошлое)'
          }
        ]
      },
      {
        name: 'Had better или would rather?',
        example: [
          {
            first: 'I had better take a taxi. I don’t have enough time to go there by bus.',
            second: ' Мне стоит взять такси. У меня нет времени ехать туда автобусом. (нет другого выбора, кроме как взять такси)'
          },
                    {
            first: 'I would rather take a taxi. It’s convenient and I like it.',
            second: 'Я бы лучше взял такси. Это удобно и мне это нравится. (личные предпочтения говорящего)'
          },
        ]
      },
      {
        name: 'Had best',
        example: [
          {
            first: 'You had best stay at my house. It’s raining pretty hard outside',
            second: 'Тебе бы лучше остаться у меня дома. На улице сильный ливень.'
          },
                    {
            first: 'I’d best go to bed now. I’m tired.',
            second: 'Я бы лучше лег спать сейчас. Я устал.'
          },
                    {
            first: 'You\'d best see your doctor. You look very pale',
            second: 'Тебе бы стоило показаться своему врачу. Ты выглядишь очень бледным.'
          }
        ]
      }
    ],
    rules: [
      {
        name: 'Правило',
        text: "Модальная конструкция had better выражает настоятельный совет или обязанность выполнить действие и переводится как «лучше», «лучше бы», «стоит». Конструкция имеет только одну форму had (форма прошедшего времени от to have) для всех лиц, но она используется для обозначения будущего и настоящего времени.<br>"
               + "<br>Модальная конструкция had better в основном используется с простым инфинитивом смысловых глаголов (глаголами в первой форме) без частицы to."
      }
    ]
  },

  // may and might
  {
    name: 'May и Might',
    times: [
      {
        name: 'Прошедшее',
        example: [
          {
            first: "Might",
            second: ""
          },
          {
            first: 'He said you <span class="text-red">might</span> stay here.',
            second: 'Он сказал, что тебе можно остаться.'
          },
          {
            first: 'You <span class="text-red">might</span> have helped me.',
            second: 'Ты бы мог мне помочь.'
          },
          {
            first: "Perfect / Perfect Continuous",
            second: ""
          },
          {
            first: "He <span class=\"text-red\">may</span> have written it.",
            second: "Он, наверное, написал это."
          },
          {
            first: "He <span class=\"text-red\">might</span> have been writing it for two days.",
            second: "Он, быть может, писал это два дня."
          }
        ]
      },
      {
        name: 'Настоящее',
        example: [
          {
            first: "May / Might",
            second: ""
          },
          {
            first: 'You <span class="text-red">may</span> stay here',
            second: 'Ты можешь тут остаться.'
          },
          {
            first: 'You <span class="text-red">might</span> help me. It\'s heavy.',
            second: 'Может, поможешь мне? Оно тяжелое.'
          },
          {
            first: "Simple / Continuous",
            second: "",
          },
          {
            first: "He <span class=\"text-red\">may</span> write it.",
            second: "Он, наверное, пишет это.",
          },
          {
            first: "He <span class=\"text-red\">might</span> be writing it now.",
            second: "Он, быть может, сейчас это пишет.",
          }
        ]
      },
      {
        name: 'Будущее',
        example: [
          {
            first: "Will be allowed to",
            second: ""
          },
          {
            first: 'You <span class="text-red">will be allowed to</span> stay here.',
            second: 'Тебе разрешат тут остаться.'
          },
          {
            first: "Simple / Continuous или выражается другими способами",
            second: "",
          },
          {
            first: "He will <span class=\"text-red\">probably</span> write it",
            second: "Он, возможно, напишет это.",
          },
          {
            first: "I <span class=\"text-red\">guess</span> he will write it.",
            second: "Я думаю, что он напишет это.",
          }

        ]
      }
    ],
    uses: [
      {
        name: 'Утверждение',
        example: [
          {
            first: 'You <span class="text-red">may</span> come in',
            second: 'Ты можешь войти.'
          },
          {
            first: 'Look! It is George. He <span class="text-red">may</span> be waiting for us.',
            second: 'Смотри! Это Джордж. Он, наверное, ждет нас.'
          },
          {
            first: '<span class="text-red">May</span> all your dreams come true!',
            second: 'Пусть сбудутся все твои мечты!'
          },
          {
            first: 'You <span class="text-red">might</span> have helped me yesterday!',
            second: 'Ты мог бы и помочь мне вчера!'
          }
        ]
      },
      {
        name: 'Отрицание',
        example: [
          {
            first: 'You <span class="text-red">may</span> not take my clothes.',
            second: 'Тебе нельзя брать мою одежду.'
          },
          {
            first: 'They <span class="text-red">may</span> not touch the picture.',
            second: 'Им нельзя трогать картину.'
          },
          {
            first: 'You <span class="text-red">may</span> not remember me. ',
            second: 'Возможно, вы меня не помните.'
          },
          {
            first: 'He <span class="text-red">may not have done</span> it.',
            second: 'Быть может, он этого не делал'
          }
        ]
      },
      {
        name: 'Вопрос',
        example: [
          {
            first: '<span class="text-red">May</span> I take that book?',
            second: 'Можно я возьму ту книгу? мне взять эту книгу?'
          },
          {
            first: '<span class="text-red">May</span> he stay with us?',
            second: 'Можно он останется с нами?'
          },
          {
            first: '<span class="text-red">Might</span> I ask you for some help?',
            second: 'Могу ли я просить вас о помощи?'
          }
        ]
      }
    ],
     features: [
      {
        name: 'Разрешение или запрет',
        example: [
          {
            first: 'You may come at any time.',
            second: 'Можешь приходить в любое время.'
          },
          {
            first: 'I knew I might take your book.',
            second: 'Я знал, что мне можно взять твою книгу.',
          },
          {
            first: 'You will be allowed to come in when the doctor calls you.',
            second: 'Вы сможете зайти, когда доктор вызовет вас.',
          }
        ]
      },
            {
        name: 'Возможность',
        example: [
          {
            first: 'You may see this tree in the park every day.',
            second: 'Вы можете видеть это дерево в парке каждый день.'
          },
          {
            first: 'This book may help you to cook something by yourself.',
            second: 'Эта книга может помочь тебе приготовить что-нибудь самостоятельно.'
          }
        ]
      },
            {
        name: 'Упрек',
        example: [
          {
            first: 'You might help me, the bag is heavy.',
            second: 'Ты мог бы помочь мне, сумка тяжелая.'
          },
                  {
            first: 'You might give me your cell phone, I need to contact my doctor.',
            second: 'Ты мог бы дать мне свой телефон, мне нужно связаться со своим врачом.'
          },
                  {
            first: 'Tom might have done the task in time.',
            second: 'Том мог бы сделать задание вовремя (но он не выполнил задание вовремя).'
          }
        ]
      },
            {
        name: 'Пожелания и поздравления',
        example: [
          {
            first: 'May all your wishes come true!',
            second: 'Пусть сбудутся все твои желания!'
          },
                    {
            first: 'May you both live a long life together in prosperity and happiness!',
            second: 'Пусть вы проживете долгую совместную жизнь в достатке и счастье!'
          },
                    {
            first: 'May the Force be with you.',
            second: 'Да пребудет с тобой Сила.'
          }
        ]
      },      {
        name: 'Предположение, неуверенность',
        example: [
          {
            first: 'You may think I don\'t like you, but it\'s not true.',
            second: 'Может быть, вы думаете, что вы мне не нравитесь, но это неправда.'
          },
                 {
            first: 'She may be reading my message now.',
            second: 'Возможно, она сейчас читает мое сообщение.'
          },
                 {
            first: 'I may go to England next summer.',
            second: 'Возможно, я поеду в Англию следующим летом.'
          },
                 {
            first: 'The age disparity may have been the cause of their disagreements.',
            second: 'Возможно, разница в возрасте стала причиной их разногласий.'
          },
          {
            first: 'She said that the dress might be expensive.',
            second: 'Она сказала, что платье, наверное, дорогое. (согласование времен)'
          }
        ]
      }
    ],
    rules: [
      {
        name: 'Правило',
        text: "Модальные глаголы may и might употребляются для выражения разрешения, запрета, возможности, неуверенности, упрека, пожелания и переводятся как «возможно», «можно», «можешь», «может быть», «пусть».<br>"
             + "Модальный глагол may заменяется на might в прошедшем времени и при согласовании времен. Также might является более вежливой формой глагола may. В большинстве случаев модальные глаголы may и might могут свободно заменять друг друга. May и might могут передавать значение как настоящего времени, так и будущего, однако для того, чтобы компенсировать отсутствующие грамматические формы (например, форму пассивного залога) или же подчеркнуть время выполнения действия, часто используются конструкции to be allowed to, to be permitted (иметь разрешение) и другие в зависимости от передаваемого значения."
      }
    ]
  },

  // will и would
  {
    name: 'Will и Would',
    times: [
      {
        name: 'Прошедшее',
        example: [
          {
            first: "Would",
            second: ""
          },
          {
            first: 'You knew I would do it anyway.',
            second: 'Ты знал, что я все равно хотела это сделать.'
          },
        ]
      },
      {
        name: 'Настоящее',
        example: [
          {
            first: "Will / Would",
            second: ""
          },
          {
            first: 'I like it and I will buy it!',
            second: 'Мне это нравится, и я хочу это купить!'
          },
          {
            first: 'Would you mind my sitting here?',
            second: 'Ты не против, если я тут присяду?'
          }
        ]
      },
      {
        name: 'Будущее',
        example: [
          {
            first: "Will",
            second: ""
          },
          {
            first: 'You don\'t like it but I will buy it.',
            second: 'Тебе это не нравится, но я намерена это купить (все равно).'
          },
        ]
      }
    ],
    uses: [
      {
        name: 'Утверждение',
        example: [
          {
            first: 'We like this place that is why we will stay here!',
            second: 'Нам нравится это место поэтому мы останемся тут!'
          },
          {
            first: 'You don’t want to hear but I will say it anyway.',
            second: 'Ты не хочешь слышать, но я все равно скажу это.'
          },
          {
            first: 'I would like a cup of coffee.',
            second: 'Я бы хотел чашечку кофе.'
          }
        ]
      },
      {
        name: 'Отрицание',
        example: [
          {
            first: 'It is hard but we will not give up.',
            second: 'Это сложно, но мы не сдаемся.'
          },
          {
            first: 'He begged me but I would not change my mind.',
            second: 'Он умолял меня, но я не менял свое мнение.'
          },
          {
            first: 'I was in a hurry but my car wouldn’t start up.',
            second: 'Я спешил, но моя машина никак не хотела заводиться.'
          }
        ]
      },
      {
        name: 'Вопрос',
        example: [
          {
            first: 'Will you have a cup of coffee? ',
            second: 'Не хотите ли чашечку кофе?'
          },
          {
            first: 'Would you like some wine?',
            second: ' Не хотите ли вина?'
          },
          {
            first: 'What would you like to drink, madam?',
            second: 'Что бы вы хотели выпить, мадам?'
          }
        ]
      }
    ],
     features: [
      {
        name: 'Will в условных предложениях',
        example: [
          {
            first: 'You may laugh if you will but I’m telling the truth',
            second: 'Можешь смеяться, если хочешь, но я говорю правду.'
          },
                    {
            first: 'I will go there if I will!',
            second: 'Я пойду туда, если этого захочу!'
          },
        ]
      },
            {
        name: 'Will not have',
        example: [
          {
            first: 'I will not have you do it.',
            second: 'Я не допущу, чтобы ты сделал это.'
          },
                    {
            first: 'I will not have him come to my house!',
            second: 'Я не дам ему приходить в мой дом!'
          },
                    {
            first: 'I won’t have Matt date my daughter.',
            second: 'Я не допущу, чтобы Мэтт встречался с моей дочерью.'
          }
        ]
      },
            {
        name: 'Would rather, Would sooner, Would just as soon',
        example: [
          {
            first: 'We would rather stay at home tonight.',
            second: 'Мы бы лучше остались дома сегодня вечером.'
          },
                    {
            first: 'I would rather have stayed at home.',
            second: 'Мы бы лучше остались дома (но мы не остались).'
          },
                    {
            first: 'I would rather you didn\'t do that.',
            second: 'Лучше бы ты этого не делал.'
          },
                              {
            first: 'I would rather he had found another job.',
            second: 'Лучше бы он нашел другую работу (но он не нашел).'
          }
        ]
      },
            {
        name: 'Would prefer to',
        example: [
          {
            first: 'I would prefer to stay at home.',
            second: 'Я бы предпочел остаться дома.'
          },
                    {
            first: 'Would you prefer me to have lied?',
            second: 'Ты предпочла бы, чтобы я соврал? (но в тот момент я не соврал)'
          },
                    {
            first: 'We’d prefer not to have read that awful news.',
            second: 'Лучше бы мы не читали эти ужасные новости. (но мы прочитали)'
          }
        ]
      },
            {
        name: 'Would.. mind',
        example: [
          {
            first: 'Would you mind if I closed the door?',
            second: 'Ты не против, если я закрою дверь?'
          },
                    {
            first: 'Would you mind getting me a cup of coffee?',
            second: 'Не мог бы ты принести мне чашечку кофе?'
          },
                    {
            first: 'I wouldn’t mind if you came with me.',
            second: 'Я не против, если ты пойдешь со мной.'
          },
                              {
            first: 'I wouldn’t mind your telling them this story.',
            second: 'Я не против, если ты расскажешь им эту историю.'
          }
        ]
      }
    ],
    rules: [
      {
        name: 'Правило',
        text: "Как модальные глаголы will и would используются для выражения воли говорящего, его намерения и настойчивости. Глаголы после will и would употребляются без частицы to.<br>"
               + "Will используется для выражения настоящего и будущего времени, а would – прошедшего или для выражения вежливости. Как правило, они выделяются интонацией или переводятся глаголом «хотеть»."
      }
    ]
  },

// have to
  {
    name: 'Have to',
    times: [
      {
        name: 'Прошедшее',
        example: [
          {
            first: "I had to work.",
            second: "Я должен был работать."
          },
          {
            first: 'I didn\'t have to work.',
            second: 'Мне не нужно было работать.'
          },
          {
            first: 'Did you have to work?',
            second: 'Тебе нужно было работать?'
          }
        ]
      },
      {
        name: 'Настоящее',
        example: [
          {
            first: "I have to work.",
            second: "Я должен работать."
          },
          {
            first: 'I don\'t have to work',
            second: 'Мне не нужно работать.'
          },
          {
            first: 'Do you have to work?',
            second: 'Тебе нужно работать?'
          }
        ]
      },
      {
        name: 'Будущее',
        example: [
          {
            first: "I will have to work.",
            second: "Мне нужно будет работать."
          },
          {
            first: 'I won\'t have to work.',
            second: 'Мне не нужно будет работать.'
          },
          {
            first: 'Will you have to work?',
            second: 'Тебе нужно будет работать?'
          }
        ]
      }
    ],
    uses: [
      {
        name: 'Утверждение',
        example: [
          {
            first: 'I have to get up at five every Sunday.',
            second: 'Я должен вставать в пять утра каждое воскресенье.'
          },
          {
            first: 'Last summer I had to get up at five every Sunday. ',
            second: 'Прошлым летом я должен был вставать в пять утра каждое воскресенье.'
          },
          {
            first: 'This project has to be approved tomorrow morning.',
            second: 'Этот проект должен быть утвержден завтра утром.'
          }
        ]
      },
      {
        name: 'Отрицание',
        example: [
          {
            first: 'We do not have to be in a hurry. We still have plenty of time. ',
            second: 'Нам нет необходимости торопиться. У нас еще полно времени.'
          },
          {
            first: 'She didn\'t have to tell the whole story. We had already heard it.',
            second: 'Ей не нужно было рассказывать всю историю. Мы уже слышали её.Ей не нужно было рассказывать всю историю. Мы уже ее слышали.'
          },
          {
            first: 'You don’t have to come here.',
            second: 'Ты не обязан сюда приходить.'
          }
        ]
      },
      {
        name: 'Вопрос',
        example: [
          {
            first: 'Does Michael have to work on Sunday?',
            second: 'Должен ли Майкл работать в воскресенье?'
          },
          {
            first: 'Did he have to call you?',
            second: 'Должен был ли он позвонить тебе?'
          },
          {
            first: 'Will I have to pay for the broken vase? ',
            second: 'Я буду должен заплатить за разбитую вазу?'
          }
        ]
      }
    ],
     features: [
      {
        name: 'Выражение степени вероятности',
        example: [
          {
            first: 'I have to be misunderstood.',
            second: 'Меня, должно быть, неправильно поняли.'
          },
                    {
            first: 'It has to be really difficult to survive in a desert.',
            second: 'Должно быть, выжить в пустыне – это действительно сложно.'
          },
                    {
            first: 'That guy has to be Paul',
            second: 'Тот парень, наверное, Пол.'
          }
        ]
      },
            {
        name: 'Have to или Have got to',
        example: [
          {
            first: 'This time we have got to be ready for the battle!',
            second: 'В этот раз мы должны быть готовы к битве!'
          },
                    {
            first: 'Matt has got to go right now.',
            second: 'Мэтт должен уйти сейчас.'
          },
                    {
            first: 'Have you got to watch your little sister tonight?',
            second: 'Ты должен присматривать за своей младшей сестрой сегодня вечером?'
          },
                              {
            first: 'I\'m happy I haven’t got to go anywhere today.',
            second: 'Я рад, что мне не нужно никуда идти сегодня.'
          }
        ]
      },
            {
        name: 'Форма Got to',
        example: [
          {
            first: 'You can say whatever you want but you still got to work to earn some money for living.',
            second: 'Ты можешь говорить что угодно, но тебе все равно придется работать, чтобы заработать немного денег на жизнь.'
          },
                    {
            first: 'I got to help Alice even though I don’t have plenty of time for that.',
            second: 'Я должен помочь Элис, хотя у меня и нет слишком много времени для этого.'
          },
                    {
            first: 'I know you want me to stay but, i’m sorry, i really gotta go.',
            second: 'Я знаю, что ты хочешь, чтобы я остался, но, извини, мне действительно нужно идти.'
          }
        ]
      },
            {
        name: 'Have to или Must?',
        example: [
          {
            first: 'Oh, it’s later than I thought. I must go now',
            second: 'О, уже позже, чем я думал. Я должен идти.'
          },
                    {
            first: 'Oh, it’s later than I thought. I have to go now.',
            second: 'О, уже позже, чем я думал. Я должен идти.'
          },
                    {
            first: 'You must have a passport to go abroad.',
            second: 'У тебя должен быть паспорт, чтобы поехать за границу.'
          },
                              {
            first: 'You have to have a passport to go abroad.',
            second: 'У тебя должен быть паспорт, чтобы поехать за границу.'
          }
        ]
      },
            {
        name: 'Have или Have to',
        example: [
          {
            first: 'I have something to tell you.',
            second: 'Я хочу кое-что сказать тебе. (have как обычный глагол)'
          },
                    {
            first: 'I have to tell you something.',
            second: 'Я должен сказать тебе кое-что. (have to как модальная конструкция)'
          },
                    {
            first: 'I have something to do this weekend.',
            second: 'У меня есть чем заняться в эти выходные.'
          },
          {
            first: "I have to do something this weekend.",
            second: 'I have to do something this weekend.'
          }
        ]
      }
    ],
    rules: [
      {
        name: 'Правило',
        text: "Модальная конструкция have to с инфинитивом глагола (первой формой глагола) выражает необходимость, обязанность что-либо сделать и переводится как «нужно», «должен», «необходимо», «обязан».<br>"
               + "Конструкция have to имеет грамматические формы настоящего (Present Simple), прошедшего (Past Simple) и будущего времени (Future Simple), а также форму пассивного залога (Passive Voice)."
      }
    ]
  },

// shell
  {
    name: 'Shall',
    times: [
      {
        name: 'модальный глагол',
        example: [
          {
            first: "Shall I shut the window?",
            second: "Закрыть окно?"
          },
          {
            first: 'You shall not pass!',
            second: 'Ты не пройдешь!'
          },
          {
            first: 'She shall leave right now!',
            second: 'Она уедет сейчас же!'
          }
        ]
      },
      {
        name: 'вспомогательный глагол',
        example: [
          {
            first: "I shall work tomorrow.",
            second: "Я буду работать завтра."
          },
        ]
      }
    ],
    uses: [
      {
        name: 'Утверждение',
        example: [
          {
            first: 'You shall stop it right now!',
            second: 'Ты сейчас же прекратишь это!'
          },
          {
            first: 'You shall remember my words.',
            second: 'Вы еще припомните мои слова.'
          },
          {
            first: 'When I earn some money for my family, my parents shall go on holiday to the seaside.',
            second: 'Когда я заработаю немного денег для семьи, мои родители поедут отдыхать к морю.'
          }
        ]
      },
      {
        name: 'Отрицание',
        example: [
          {
            first: 'You shall not behave yourself like that in my house! ',
            second: 'Ты не будешь себя так вести в моем доме! (запрет)'
          },
          {
            first: 'I will get this well-paid job! My family shall not be in need anymore',
            second: 'Я получу эту хорошо оплачиваемую работу! Моя семья больше не будет бедствовать. (обещание)'
          },
          {
            first: 'You shan’t do that!',
            second: 'Ты не сделаешь этого! (запрет)'
          }
        ]
      },
      {
        name: 'Вопрос',
        example: [
          {
            first: 'Shall I shut the door?',
            second: 'Закрыть дверь? (Ты хочешь, чтобы я закрыл дверь?)'
          },
          {
            first: 'What shall we do now?',
            second: 'Что нам теперь делать? (Что ты хочешь, чтобы мы делали теперь?)'
          },
          {
            first: 'Shall we dance?',
            second: 'Вы танцуете? Потанцуем? (Вы согласитесь со мной потанцевать?)'
          }
        ]
      }
    ],
     features: [
      {
        name: 'Особенности',
        example: [
          {
            first: '“She shall go off tomorrow, the little artiful creature” said Mrs. Sedley, with great energy.',
            second: '«Она уедет завтра же, эта маленькая интриганка», – энергично заявила миссис Седли. (Теккерей)'
          },
          {
            first: "You shall repent of this neglect of duty, Mr. Gummer.",
            second: "Вы еще раскаетесь в том, что пренебрегаете долгом, мистер Гаммер. (Диккенс)"
          }
        ]
      }
    ],
    rules: [
      {
        name: 'Правило',
        text: "Модальный глагол shall употребляется только с неопределенным инфинитивом глаголов в (глагол в первой форме) без частицы to и имеет только одну форму для всех лиц.<br>"
            + "Модальный глагол shall используется только по отношению к настоящему и будущему времени. Используется для волеизъявления говорящего по отношению к кому-то, то есть это принуждение, указ, угроза, предупреждение или обещание. Как правило, модальный глагол shall не переводится на русский, но выражается интонацией."
      }
    ]
  },

]
