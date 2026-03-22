export function hoursToMs(hours: number) {
  return hours * 60 * 60 * 1000
}

function daysToMs(days: number) {
  return days * hoursToMs(24)
}

export function getDayDiff(startDate: Date, endDate: Date) {
  const date1 = new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate(),
  )
  const date2 = new Date(
    endDate.getFullYear(),
    endDate.getMonth(),
    endDate.getDate(),
  )
  const msDiff = date2.getTime() - date1.getTime()

  return Math.floor(msDiff / daysToMs(1))
}
