
export default function ({ $axios,  $cookies, store }) {


    $axios.onResponse((config) => {
        if (config.config.url == "/signin" || config.config.url == "/validateToken") {

            const token = config.data.access_token

            $axios.setToken(token, 'Bearer')
            
            store.commit('setAccess_token', token)
        }

    });


    $axios.onRequest((config) => {
        if (process.server) {

          
            // console.log('request from server', config.url)

            const token = $cookies.get('access_token')

            config.headers = {
                common: {
                    Authorization: `Bearer ${token}`,
                }
            }

            const valid = $cookies.get('auth._token_expiration.cookie')

            const maxAge = Math.floor((valid - Date.now()) / 1000);

            $cookies.set('access_token', token, {
                httpOnly: true,
                sameSite: 'none',
                secure: true,
                maxAge: maxAge,
            })

        }else{

            if ((store.state.setup)){
               const token = store.state.access_token
               if (token){
                   $axios.setToken(token, 'Bearer')
                   store.commit('setup')
                   store.commit('setAccess_token', null)
               }
   
           }
        //    console.log('request from client', config.url)
        }



        return config;
    })
}

//setar resposta de /validateToken no servidor