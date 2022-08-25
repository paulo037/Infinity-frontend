export default async ({ route, $axios, redirect }) => {

    const name = route.params ? route.params.name : null

    if (name) {
        $axios.$get(`/product-id/${name}`)
            .catch((e) => {
                redirect('/not-found')
            })

    } else {
        redirect('/not-found')
    }



}       
