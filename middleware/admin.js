export default async ({ $auth, redirect, $axios }) => {


    //const admin = await $axios.$get('/admin')
      //  .catch(() => redirect("/"))


    if ($auth.$state.loggedIn && $auth.user.admin) {
        return
    }

    redirect("/")

}



