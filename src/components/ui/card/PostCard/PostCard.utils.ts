export const renderPropertiesForPostStatus = (status: string) => {
  const statusData = {
    OPEN: {
      fontSize: 'text-[15px]',
      backgroundColor: 'bg-[#0D99FF]',
      textColor: 'text-[#0D99FF]',
      displayStatus: 'Open',
      cardBorderTopColor: 'border-t-[#0D99FF]',
      calendarIcon: '/images/calendar-open.png'
    },
    PENDING: {
      fontSize: 'text-[15px]',
      backgroundColor: 'bg-[#ffb310]',
      textColor: 'text-[#ffb310]',
      displayStatus: 'Pending',
      cardBorderTopColor: 'border-t-[#ffb310]',
      calendarIcon: '/images/calendar-pending.png'
    },
    REJECTED: {
      fontSize: 'text-[15px]',
      backgroundColor: 'bg-[#F92B18]',
      textColor: 'text-[#F92B18]',
      displayStatus: 'Rejected',
      cardBorderTopColor: 'border-t-[#F92B18]',
      calendarIcon: '/images/calendar-rejected.png'
    },
    CLOSED: {
      fontSize: 'text-[15px]',
      backgroundColor: 'bg-[#909090]',
      textColor: 'text-[#909090]',
      displayStatus: 'Closed',
      cardBorderTopColor: 'border-t-[#909090]',
      calendarIcon: '/images/calendar-closed.png'
    }
  }

  return statusData[status] || {}
}

export const renderPostStartDate = (startDate: Date): string => {
  const weekday: string = new Intl.DateTimeFormat('en', {
    weekday: 'long'
  }).format(startDate)
  const year: string = new Intl.DateTimeFormat('en', {
    year: 'numeric'
  }).format(startDate)
  const month: string = new Intl.DateTimeFormat('en', { month: 'long' }).format(
    startDate
  )
  const day: string = new Intl.DateTimeFormat('en', { day: 'numeric' }).format(
    startDate
  )

  const suffix: string = getDaySuffix(day)

  return `${weekday}, ${month} ${day + suffix} ${year}`
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getDaySuffix(day: any) {
  if (day >= 11 && day <= 13) {
    return 'th'
  }
  switch (day % 10) {
    case 1:
      return 'st'
    case 2:
      return 'nd'
    case 3:
      return 'rd'
    default:
      return 'th'
  }
}
