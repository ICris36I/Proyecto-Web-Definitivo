export default defineEventHandler(async (event) => {
  await clearUserSession(event) //cierra sesion
  return { ok: true }
})