

export default async ({ redirect, store, $auth, $axios, $cookies }) => {

    console.log($cookies.get('access_token'))
    if (!$auth.strategy.token.status().valid() && $auth.loggedIn ) {
        $auth.logout()
        store.commit('toasted', { text: "Faça o login novamente, você ficou muito tempo fora." })
        return redirect("/login")
    }



}