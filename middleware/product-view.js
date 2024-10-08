export default async ({ route, $axios, redirect, store }) => {

    try {

        const name = route.params ? route.params.name : null


        const response = await $axios.$get(`/product-id/${name}`).catch(e => store.commit("toasted", { text: e }))


        if (response)
            store.commit('setProduct', response.id)
        else {
            return redirect("/not-found")
        }


        if (response.id)
            store.commit('setProduct', response.id)
        else {
            return redirect("/not-found")
        }
    } catch (error) {
        return redirect("/not-found")

    }







}
