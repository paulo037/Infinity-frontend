

export default function ({ $axios, res, $cookies, store }, inject) {



    // $axios.onResponse((config) => {
    //     if (config.config.url == "/signin" || config.config.url == "/refreshToken") {
    //         const token = config.data.access_token
    //         const refresh_token = config.data.refresh_token
    //         config.data.access_token = true
    //         config.data.refresh_token = true
    //         $axios.setToken(token, 'Bearer')
    //         $axios.defaults.headers['refresh_token'] = `${refresh_token}`
    //     }
    //     return config;

    // });

    $axios.onRequest((config) => {

        // const token = $cookies.get('access_token')
        // const refresh_token = $cookies.get('refresh_token')
        // console.log(token, '\n\n\n', refresh_token)
        // if (token && refresh_token) {
        //     $axios.setToken(token, 'Bearer')
        //     $axios.defaults.headers['refresh_token'] = `${refresh_token}`
        // }

        // console.log(config)

        return config;

    });


}