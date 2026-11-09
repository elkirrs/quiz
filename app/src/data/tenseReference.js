import { rules } from './rule.js'

export const periods = ['Past', 'Present', 'Future']
export const aspects = ['Simple', 'Continuous', 'Perfect', 'Perfect Continuous']
export const forms = ['positive', 'negative', 'question']

const details = {
  'Past Simple': {
    formulas: ['Subject + V₂', 'Subject + did not + V', 'Did + subject + V?'],
    use: {
      en: ['Completed actions or sequences of actions in the past.', 'Past habits and states.'],
      ru: ['Завершённые действия или последовательность действий в прошлом.', 'Привычки и состояния в прошлом.'],
    },
    markers: 'yesterday, last week, two days ago, in 1992',
  },
  'Present Simple': {
    formulas: ['Subject + V / V-s / V-es', 'Subject + do / does not + V', 'Do / does + subject + V?'],
    use: {
      en: ['Habits, regular actions and general facts.', 'Timetables and permanent states.'],
      ru: ['Привычки, регулярные действия и общеизвестные факты.', 'Расписания и постоянные состояния.'],
    },
    markers: 'always, usually, often, every day, on Mondays',
  },
  'Future Simple': {
    formulas: ['Subject + will + V', 'Subject + will not + V', 'Will + subject + V?'],
    use: {
      en: ['Predictions, promises and decisions made at the moment of speaking.'],
      ru: ['Прогнозы, обещания и решения, принятые в момент речи.'],
    },
    markers: 'tomorrow, next week, soon, in a year',
  },
  'Past Continuous': {
    formulas: ['Subject + was / were + V-ing', 'Subject + was / were not + V-ing', 'Was / were + subject + V-ing?'],
    use: {
      en: ['An action in progress at a particular time in the past.', 'Background or simultaneous past actions.'],
      ru: ['Действие в процессе в определённый момент прошлого.', 'Фоновые или одновременные действия в прошлом.'],
    },
    markers: 'while, when, at that moment, at 6 o’clock yesterday',
  },
  'Present Continuous': {
    formulas: ['Subject + am / is / are + V-ing', 'Subject + am / is / are not + V-ing', 'Am / is / are + subject + V-ing?'],
    use: {
      en: ['Actions happening now or around the present.', 'Temporary situations and arranged future plans.'],
      ru: ['Действия, происходящие сейчас или в текущий период.', 'Временные ситуации и договорённости о будущем.'],
    },
    markers: 'now, at the moment, currently, these days',
  },
  'Future Continuous': {
    formulas: ['Subject + will be + V-ing', 'Subject + will not be + V-ing', 'Will + subject + be + V-ing?'],
    use: {
      en: ['An action that will be in progress at a particular time in the future.', 'Polite questions about future plans.'],
      ru: ['Действие, которое будет происходить в определённый момент будущего.', 'Вежливые вопросы о планах.'],
    },
    markers: 'this time tomorrow, at 5 o’clock tomorrow',
  },
  'Past Perfect': {
    formulas: ['Subject + had + V₃', 'Subject + had not + V₃', 'Had + subject + V₃?'],
    use: {
      en: ['An action completed before another past action or time.'],
      ru: ['Действие, завершившееся до другого действия или момента в прошлом.'],
    },
    markers: 'before, by then, by the time',
  },
  'Present Perfect': {
    formulas: ['Subject + have / has + V₃', 'Subject + have / has not + V₃', 'Have / has + subject + V₃?'],
    use: {
      en: ['Past actions connected to the present, including present results and life experience.', 'States that began in the past and continue now.'],
      ru: ['Прошлые действия, связанные с настоящим: результат или жизненный опыт.', 'Состояния, начавшиеся в прошлом и продолжающиеся сейчас.'],
    },
    markers: 'already, yet, just, ever, never, so far, since, for',
  },
  'Future Perfect': {
    formulas: ['Subject + will have + V₃', 'Subject + will not have + V₃', 'Will + subject + have + V₃?'],
    use: {
      en: ['An action that will be completed before a future time or event.'],
      ru: ['Действие, которое завершится до определённого момента или события в будущем.'],
    },
    markers: 'by tomorrow, by next week, by the time',
  },
  'Past Perfect Continuous': {
    formulas: ['Subject + had been + V-ing', 'Subject + had not been + V-ing', 'Had + subject + been + V-ing?'],
    use: {
      en: ['Duration of an action leading up to a time or event in the past.'],
      ru: ['Продолжительность действия до определённого момента или события в прошлом.'],
    },
    markers: 'for an hour, since morning, before, when',
  },
  'Present Perfect Continuous': {
    formulas: ['Subject + have / has been + V-ing', 'Subject + have / has not been + V-ing', 'Have / has + subject + been + V-ing?'],
    use: {
      en: ['Duration of an action that began in the past and continues now, or has recently stopped.'],
      ru: ['Продолжительность действия, начавшегося в прошлом и продолжающегося сейчас или недавно завершившегося.'],
    },
    markers: 'for an hour, since yesterday, lately, recently',
  },
  'Future Perfect Continuous': {
    formulas: ['Subject + will have been + V-ing', 'Subject + will not have been + V-ing', 'Will + subject + have been + V-ing?'],
    use: {
      en: ['Duration of an action up to a particular time in the future.'],
      ru: ['Продолжительность действия до определённого момента в будущем.'],
    },
    markers: 'for two years by March, by the end of the day',
  },
}

export const tenses = rules.map(rule => {
  const name = rule.name.trim()
  const period = periods.find(value => name.startsWith(`${value} `))
  const aspect = name.slice(period.length + 1)
  return { name, period, aspect, examples: rule.rule, ...details[name] }
})

export function filterTenses(items, period, query, language) {
  const search = query.trim().toLocaleLowerCase()
  return items.filter(item => {
    const matchesPeriod = period === 'All' || item.period === period
    const text = [item.name, item.markers, ...item.use[language]].join(' ').toLocaleLowerCase()
    return matchesPeriod && (!search || text.includes(search))
  })
}
