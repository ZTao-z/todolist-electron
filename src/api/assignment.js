const rnd = (min, max) => {
  return min + Math.round(Math.random() * (max - min));
}

const colors = ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'];
const names = ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'];

export const getAssignment = (start, end) => {
  return new Promise((resolve) => {
    const events = []
    for (let i = 0; i < 15; i++) {
      const allDay = rnd(0, 3) === 0
      const firstTimestamp = rnd(start, end)
      const first = new Date(firstTimestamp - (firstTimestamp % 900000))
      const secondTimestamp = rnd(2, allDay ? 288 : 8) * 900000
      const second = new Date(first.getTime() + secondTimestamp)

      events.push({
        name: names[rnd(0, names.length - 1)],
        start: first,
        end: second,
        color: colors[rnd(0, colors.length - 1)],
        timed: !allDay,
      })
    }

    resolve(events);
  })
}