export default async ({ route, $axios, redirect, store, $auth }) => {
    
    let addresses = []
    await $axios
        .get("/addresses")
        .then((a) => {
            addresses = a.data;
        })
        .catch((e) =>
            redirect('/')
        );


    if (addresses.length == 0) {
        redirect("/profile/address/new-address")
    } else {
        store.commit("user/setAddresses", addresses)
    }



}
