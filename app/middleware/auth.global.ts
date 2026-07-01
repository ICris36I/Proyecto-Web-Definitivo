export default defineNuxtRouteMiddleware((to) => {
  const { loggedIn } = useUserSession();

  // protege las rutas que empiezan con /admin
  if (to.path.startsWith("/admin") && !loggedIn.value) {
    return navigateTo("/usuario");
  }
});