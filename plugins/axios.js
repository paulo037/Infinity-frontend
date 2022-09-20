
export default function ({ $axios, $cookies, store }) {


    $axios.onResponse((config) => {
        if (config.config.url == "/signin" || config.config.url == "/validateToken" || config.config.url == "/refreshToken") {

            const access_token = config.data.access_token
            const refresh_token = config.data.refresh_token



            $axios.setToken(access_token, 'Bearer')

            store.commit('setAccess_token', access_token)

            let token_config = {
                httpOnly: false,
                path: '/',
                sameSite: true
            }


            if (process.server) {
                token_config.httpOnly = true
            }

            $cookies.set('access_token', access_token, token_config)
            $cookies.set('refresh_token', refresh_token, token_config)

            config.data.access_token = true
            config.data.refresh_token = true

            if (config.config.url == "/refreshToken" && process.client) {
                window.location.reload();
            }
        }

        return config

    });


    $axios.onRequest(async (config) => {

        if (process.server) {
            const token = $cookies.get('access_token')

            $axios.setToken(token, 'Bearer')

        } else {
            const token = store.state.access_token
            if (token) {
                $axios.setToken(token, 'Bearer')
                store.commit('setAccess_token', null)

            }

        }



        return config;
    })
}
