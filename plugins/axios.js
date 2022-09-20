
export default function ({ $axios, $cookies, store }) {


    $axios.onResponse((config) => {
        if (config.config.url == "/signin" || config.config.url == "/validateToken") {

            const token = config.data.access_token

            $axios.setToken(token, 'Bearer')

            store.commit('setAccess_token', token)


            $cookies.set('token', '123')
        }

    });


    $axios.onRequest(async (config) => {
        $cookies.set('token', '123')
        if (process.server) {
            const token = $cookies.get('access_token')

            $axios.setToken(token, 'Bearer')

        } else {

            if ((store.state.setup)) {
                const token = store.state.access_token
                if (token) {
                    $axios.setToken(token, 'Bearer')
                    store.commit('setup')
                    store.commit('setAccess_token', null)

                }

            }

        }



        return config;
    })
}
