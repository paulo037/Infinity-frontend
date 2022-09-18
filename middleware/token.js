

export default async ({ redirect, store, $auth, $axios, $cookies }) => {

    if (store.state.setup) {

        // const token = $cookies.get('access_token')
        // const refresh_token = $cookies.get('refresh_token')
        // store.commit('setRefresh_token', refresh_token)
        // store.commit('setAccess_token', token)
        // console.log("refresh: ",  $cookies.get('auth._refresh_token.local'))
        // console.log("setup")
        // store.commit('setup')
        // try {
        //     await $axios.$post('/refreshToken')

        // } catch (error) {
        //     console.log(error)

        // }
        // console.log("setup finish")
        // $axios.onRequest((config) => {

        // const token = $cookies.get('access_token')
        // const refresh_token = $cookies.get('refresh_token')

        // axios.setToken(token, 'Bearer')
        // axios.defaults.headers['refresh_token'] = `${refresh_token}`
        // inject('axios', axios)
        //     return config;

        // });

    }

    if (!$auth.strategy.token.status().valid() && $auth.loggedIn && !$auth.strategy.refreshToken.status().valid()) {
        $auth.logout()
        store.commit('toasted', { text: "Faça o login novamente, você ficou muito tempo fora." })
        return redirect("/login")
    }



}