
export default function ({ $axios, res, $cookies, store }, inject) {



    // $axios.onRequest((config) => {
    //     if (process.server) {
    //         const token = $cookies.get('access_token')
    //         const valid = $cookies.get('auth._token_expiration.local')

    //         const maxAge = Math.floor((valid - Date.now()) / 1000);

    //         $cookies.set('access_token', token, {
    //             httpOnly: true,
    //             sameSite: 'none',
    //             secure: true,
    //             maxAge: maxAge
    //         })

    //         $axios.setHeader('Authorization', token)

    //         const refresh_token = $cookies.get('refresh_token')
    //         const refresh_token_valid = $cookies.get('auth._refresh_token_expiration.local')

    //         const refresh_token_maxAge = Math.floor((refresh_token_valid - Date.now()) / 1000);

    //         $cookies.set('access_token', token, {
    //             httpOnly: true,
    //             sameSite: 'none',
    //             secure: true,
    //             maxAge: refresh_token_maxAge
    //         })

    //         $axios.setToken(refresh_token)
    //         $axios.setHeader('refresh_token', '123')


    //         // config.headers.common.Authorization = token
    //         // console.log(config.headers.common.Authorization)
    //         config.headers = {"Authorization": token}

    //     }else{
    //     }
        
    //     return config;

    // });





}