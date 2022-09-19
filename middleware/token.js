

export default async ({ redirect, store, $auth, $axios, $cookies }) => {

    // if (store.state.setup) {

    //     if (process.server) {
            

    //         // const token = $cookies.get('access_token')

    //         // const valid = $cookies.get('auth._token_expiration.local')

    //         // const maxAge = Math.floor((valid - Date.now()) / 1000);

    //         // $cookies.set('access_token', token, {
    //         //     httpOnly: true,
    //         //     sameSite: 'none',
    //         //     secure: true,
    //         //     maxAge: maxAge
    //         // })




    //         // const refresh_token = $cookies.get('refresh_token')
    //         // const refresh_token_valid = $cookies.get('auth._refresh_token_expiration.local')

    //         // const refresh_token_maxAge = Math.floor((refresh_token_valid - Date.now()) / 1000);

    //         // $cookies.set('refresh_token', refresh_token, {
    //         //     httpOnly: true,
    //         //     sameSite: 'none',
    //         //     secure: true,
    //         //     maxAge: refresh_token_maxAge
    //         // })
           

    //     }


    // }

    if (!$auth.strategy.token.status().valid() && $auth.loggedIn && !$auth.strategy.refreshToken.status().valid()) {
        $auth.logout()
        store.commit('toasted', { text: "Faça o login novamente, você ficou muito tempo fora." })
        return redirect("/login")
    }



}