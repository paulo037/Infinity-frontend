export default async ({ route, $axios, redirect, store }) => {
    try {

        const id = route.params ? route.params.id : null


        const recovery = await $axios.$get(`/password/${id}`).catch(() => {
            return redirect("/")

        })
        if (recovery) {
            return 
        }
    } catch (error) {

        return redirect("/")
    }

    return redirect("/")


}
