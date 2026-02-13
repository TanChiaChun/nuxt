export default defineEventHandler((event) => {
  return [
    { id: 0, name: 'Calendar', lastCheck: new Date().toISOString() },
    { id: 1, name: 'To-Do', lastCheck: new Date().toISOString() },
  ]
})
