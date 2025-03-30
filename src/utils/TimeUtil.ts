import moment from 'moment'

export const isOutOfDate = (date: Date) => {
  const currDate = new Date()
  if (currDate >= date) {
    return true
  } else {
    return false
  }
}

export const dateDiffInDays = (startDate: Date, endDate: Date): number => {
  // Need to make startDate and endDate at the same time 00:00
  const startDateMoment = moment(startDate).startOf('day')
  const endDateMoment = moment(endDate).startOf('day')

  const daysDiff = startDateMoment.diff(endDateMoment, 'days')
  return daysDiff
}

export const checkDateTimeBeforeCurrent = (date: string, time: string) => {
  return moment(new Date(`${date} ${time}`)).isBefore(moment())
}

export const formatDate = (date: Date, format: string) => {
  const momentDate = moment(date)
  return momentDate.format(format)
}
