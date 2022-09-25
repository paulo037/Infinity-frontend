export default async ({ route, $axios, redirect, store, $auth }) => {

    const mode = route.params ? route.params.mode : null

    if (!mode) redirect("/profile/address")

    if (mode == "new-address") {
        await store.commit("user/setAddress", {
            user_name: null,
            cep: null,
            state: null,
            city: null,
            district: null,
            street: null,
            telephone: null,
            number: null,
        })
        return
    }

    await $axios
        .get(`/address/${route.query.target}`)
        .then((response) => {
            store.commit("user/setAddress", response.data)
        })
        .catch((e) =>
            redirect('/profile/address')
        );


}
