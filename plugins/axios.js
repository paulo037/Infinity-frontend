
export default async function ({ $axios, $cookies, store, from, redirect }) {


    $axios.onResponse(async (config) => {
        if (config.config.url == "/signin" || config.config.url == "/validateToken" || config.config.url == "/refreshToken") {

            const access_token = config.data.access_token
            const refresh_token = config.data.refresh_token



            await $axios.setToken(access_token, 'Bearer')

            store.commit('setAccess_token', access_token)

            let access_token_age = await $cookies.get('auth._token_expiration.local')
            let refresh_token_age = await $cookies.get('auth._refresh_token_expiration.local')


            access_token_age = Math.floor((access_token_age - new Date().getTime()) / 1000)
            refresh_token_age = Math.floor((refresh_token_age - new Date().getTime()) / 1000)


            let access_token_config = {
                httpOnly: false,
                path: '/',
                sameSite: true,
                maxAge: access_token_age
            }

            let refresh_token_config = {
                httpOnly: false,
                path: '/',
                sameSite: true,
                maxAge: refresh_token_age
            }


            if (process.server) {
                access_token_config.httpOnly = true
                refresh_token_config.httpOnly = true
            }

            await $cookies.set('access_token', access_token, access_token_config)
            await $cookies.set('refresh_token', refresh_token, refresh_token_config)

            config.data.access_token = true
            config.data.refresh_token = true

            if (config.config.url == "/refreshToken" && process.client) {
                if (store.state.load) {
                    const reload = store.state.reload
                    store.commit('setLoad', false)
                    window.open(`${process.env.BASE_FRONT}${reload}`, "_self")
                }
            }
        }

        return config

    });


    $axios.onRequest(async (config) => {
        if (process.server) {
            const token = $cookies.get('access_token')
            if (token) {
                await $axios.setToken(token, 'Bearer')
            } else if (config.url != "/refreshToken") {
                console.log("notoken")
                await $axios.post("/refreshToken")
            }

        } else {
            const token = store.state.access_token
            if (token) {
                await $axios.setToken(token, 'Bearer')
                store.commit('setAccess_token', null)

            }

        }



        return config;
    })
}
