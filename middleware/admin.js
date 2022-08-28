export default async ({ $auth, redirect, $axios }) => {


    const admin = await $axios.$get('/admin')
        .catch(() => redirect("/"))

    console.log(admin)


    if ($auth.$state.loggedIn && admin.admin) {
        return
    }

    redirect("/")

}



