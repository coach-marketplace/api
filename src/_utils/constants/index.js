const USER_ACCOUNT_TYPE = {
  LOCAL: 'local',
  GOOGLE: 'google',
  FACEBOOK: 'facebook',
}

const CONTACT_TYPE = {
  TRAINEE: 'trainee',
}

const CURRENCY = {
  EUR: { NAME: 'EUR', LABEL: 'Euro', SYMBOL: '€' },
  USD: { NAME: 'USD', LABEL: 'United States dollar', SYMBOL: '$' },
}

/**
 * Language are following these:
 * - (lang) ISO 639-1 : https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
 * - (country) Alpha-2 code: https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes
 */
const LANG = {
  FRENCH: { NAME: 'FR', COUNTRY: 'FR' },
  ENGLISH: { NAME: 'EN', COUNTRY: 'US' },
}

const ACCEPTED_LANGS = Object.keys(LANG).map((k) => LANG[k].NAME.toLowerCase())

const CONSOLE_LOG_CODE = {
  RESET: '\x1b[0m',
  FONT_COLOR: {
    RED: '\x1b[31m',
  },
}

const TYPE = {
  CONVERSATION_PARTICIPANT: {
    OWNER: 'owner',
    MEMBER: 'member',
  },
}

const UNIT = {
  DISTANCE: {
    CM: 'cm',
    IN: 'in',
    M: 'm',
    KM: 'km',
    MILE: 'mile',
  },
  WEIGHT: {
    KG: 'kg',
    LB: 'lb',
  },
  TIME: {
    SECOND: 'second',
    MINUTE: 'minute',
    HOUR: 'hour',
  },
  OTHER: {
    REPETITION: 'rep',
    ROUND: 'round',
  },
}

const RATING = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard"
}

const STATE = {
  todo: "To do",
  done: "Done",
  late: "Late"
}

/**
 * cm, m, km, in, mile
 * @constant
 * @type {array}
 */
const DISTANCES = Object.values(UNIT.DISTANCE)

/**
 * kg, lb
 * @constant
 * @type {array}
 */
const WEIGHTS = Object.values(UNIT.WEIGHT)

/**
 * second, minute, hour
 * @constant
 * @type {array}
 */
const TIMES = Object.values(UNIT.TIME)

/**
 * rep, round
 * @constant
 * @type {array}
 */
const OTHERS_UNITS = Object.values(UNIT.OTHER)

const unitsList = Object.keys(UNIT).map((key) => UNIT[key])
const listArray = unitsList.map((obj) => Object.keys(obj))
/**
 * All units
 */
const UNITS = listArray.reduce((acc, curr) => [...curr, ...acc])

const RATINGS = Object.values(RATING)

const STATES = Object.values(STATE)


module.exports = {
  USER_ACCOUNT_TYPE,
  CONTACT_TYPE,
  CONSOLE_LOG_CODE,
  CURRENCY,
  LANG,
  ACCEPTED_LANGS,
  CONVERSATION_PARTICIPANT: TYPE.CONVERSATION_PARTICIPANT,
  CONVERSATION_PARTICIPANTS: Object.values(TYPE.CONVERSATION_PARTICIPANT),
  UNIT,
  UNITS,
  WEIGHTS,
  DISTANCES,
  TIMES,
  OTHERS_UNITS,
  RATING,
  RATINGS,
  STATES
}
