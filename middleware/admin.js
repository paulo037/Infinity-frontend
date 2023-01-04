export default async ({ $auth, redirect, $axios, store }) => {


    const admin = await $axios.$get('/admin')
        .catch(() => {
            return redirect("/")

        })


    if ($auth.$state.loggedIn && admin) {
        return
    } else {

        return redirect("/")
    }


}



