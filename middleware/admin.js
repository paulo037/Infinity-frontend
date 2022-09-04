export default async ({ $auth, redirect, $axios, store }) => {


    const admin = await $axios.$get('/admin')
        .catch(() => redirect("/"))


    if ($auth.$state.loggedIn && admin.admin) {
        return
    }

    redirect("/")

}



