
 

export default async ({ redirect, store, $auth, $axios}) => {
    
    // if (store.state.setup) {
    //     await $axios.$post("validateToken").catch(e => console.log(e)).then(()=> {
    //         console.log($auth.loggedIn)
    //         store.commit('setup')
    //     }
    //     )
    // }
    // const access = app.$cookies.get("access_token");
    // console.log(access)


    if (!$auth.strategy.token.status().valid() && $auth.loggedIn && !$auth.strategy.refreshToken.status().valid()) {
        $auth.logout()
        store.commit('toasted', { text: "Faça o login novamente, você ficou muito tempo fora." })
        return redirect("/login")
    }


}
