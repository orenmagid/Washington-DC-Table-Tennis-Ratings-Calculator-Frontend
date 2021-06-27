export const sortRatings = (ratings) => {
  return ratings.sort((a, b) => {
    if (!a.session) {
      return -1
    }
    if (!b.session) {
      return 1
    }
    if (datesAreOnSameDay(new Date(b.session.date), new Date(a.session.date))) {
      return a.session_id - b.session_id
    }
    return new Date(a.session.date) - new Date(b.session.date)
  })
}

export const mostRecentPlayerRating = (player) => {
  const sortedRatings = sortRatings(player.ratings)
  return sortedRatings[sortedRatings.length - 1]
}

const days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"]

const months = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
]

export const getFormattedDate = (date, fullFormat = false) => {
  date = new Date(date)

  if (fullFormat) {
    const year = date.getFullYear()
    const dayNumber = date.getDate()
    const monthName = months[date.getMonth()]
    const dayName = days[date.getDay()]

    return `${dayName}, ${monthName} ${dayNumber}, ${year}`
  } else {
    const year = date.getFullYear()
    let month = (1 + date.getMonth()).toString()
    month = month.length > 1 ? month : "0" + month
    let day = date.getDate().toString()
    day = day.length > 1 ? day : "0" + day

    return month + "-" + day + "-" + year
  }
}

export const datesAreOnSameDay = (first, second) => {
  return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
  )
}

export const isAdmin = () => {
  return localStorage.getItem("admin") === "true"
}

export const getUser = () => {
  return localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null
}
