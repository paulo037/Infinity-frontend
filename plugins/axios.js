
export default function ({ $axios, res, $cookies, store }, inject) {


    $axios.onResponse((config) => {
        if (config.config.url == "/signin" || config.config.url == "/validateToken") {

            const token = config.data.access_token
            config.data.access_token = true
            config.data.refresh_token = true

            $axios.setToken(token, 'Bearer')

            if (store.state.setup) {
                store.commit('setAccess_token', token)
            }



        }
        return config;

    });


    $axios.onRequest((config) => {

        if (process.server) {

            const token = $cookies.get('access_token')
            config.headers = {
                common: {
                    Authorization: token,
                }
            }

        } else {
            if (store.state.setup) {
                const token = store.state.access_token
                $axios.setToken(token, 'Bearer')

                config.headers = {
                    common: {
                        Authorization: token,
                    }
                }

                store.commit('setup');
                store.commit('setAccess_token', null)
            }

        }
        return config;
    })
}

//setar resposta de /validateToken no servidor