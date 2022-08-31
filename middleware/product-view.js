export default async ({ route, $axios, redirect, store, $auth }) => {

    const name = route.params ? route.params.name : null


    const response = await $axios.$get(`/product-id/${name}`).catch(e => console.log(e))


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






}
