export const arraysEqual = (a, b) => {
  if (a === b) return true
  if (a == null || b == null) return false
  if (a.length !== b.length) return false

  a.sort()
  b.sort()

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false
  }
  return true
}

export const getRatingLimit = (recurringSession) => {
  const ratingLimit = !recurringSession.low_rating_limit
    ? `Below ${recurringSession.high_rating_limit}`
    : !recurringSession.high_rating_limit
    ? `Above ${recurringSession.low_rating_limit}`
    : `${recurringSession.low_rating_limit} through ${recurringSession.high_rating_limit}`
  return ratingLimit
}

export const sortSessions = (recurringSessions) => {
  const sortedRecurringSesssions = recurringSessions.sort((a, b) => {
    return getDefaultDate(a, false, false) - getDefaultDate(b, false, false)
  })
  return sortedRecurringSesssions
}

export const getDefaultDate = (
  recurringSession,
  past = true,
  formatted = true
) => {
  const todayDayOfWeek = new Date().getDay()

  let recurringSessionDayOfWeek = recurringSession.day_of_week

  let defaultDate
  if (past) {
    recurringSessionDayOfWeek =
      recurringSessionDayOfWeek > todayDayOfWeek
        ? recurringSessionDayOfWeek - 7
        : recurringSessionDayOfWeek

    defaultDate =
      Date.now() -
      (todayDayOfWeek - recurringSessionDayOfWeek) * (3600 * 1000 * 24)
  } else {
    recurringSessionDayOfWeek += 7

    defaultDate =
      Date.now() +
      (todayDayOfWeek + recurringSessionDayOfWeek) * (3600 * 1000 * 24)
  }

  const returnValue = formatted
    ? getFormattedDate(new Date(defaultDate))
    : new Date(defaultDate)
  return returnValue
}

export const sortPlayerRatings = (player) => {
  return player.ratings.sort((a, b) => {
    if (!a.session) {
      return -1
    }
    if (!b.session) {
      return 1
    }
    if (datesAreOnSameDay(new Date(b.session_id), new Date(a.session_id))) {
      return a.session_id - b.session_id
    }
    return new Date(a.session.date) - new Date(b.session.date)
  })
}

export const mostRecentPlayerRating = (player, fixReversedIndexing = false) => {
  const sortedRatings = sortPlayerRatings(player)

  const finalIndex = fixReversedIndexing ? 0 : sortedRatings.length - 1
  const mostRecentRating = sortedRatings[finalIndex]

  return mostRecentRating
}

export const getFormattedDate = (date) => {
  var year = date.getFullYear()

  var month = (1 + date.getMonth()).toString()
  month = month.length > 1 ? month : '0' + month

  var day = date.getDate().toString()
  day = day.length > 1 ? day : '0' + day

  return month + '/' + day + '/' + year
}

export const datesAreOnSameDay = (first, second) => {
  return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
  )
}

export const isAdmin = () => {
  return localStorage.getItem('admin') === 'true'
}

export const isLoggedIn = () => {
  return !!localStorage.getItem('token')
}

export const playerId = () => {
  return localStorage.getItem('player_id')
}
