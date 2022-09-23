export default async ({ route, $axios, redirect, store, $auth }) => {

    const mode = route.params ? route.params.mode : null

    if (!mode) redirect("/profile/address")

    if (mode == "new-address") return;

    await $axios
        .get(`/address/${route.query.target}`)
        .then((response) => {
            store.commit("user/setAddress", response.data)
        })
        .catch((e) =>
            redirect('/profile/address')
        );


}
