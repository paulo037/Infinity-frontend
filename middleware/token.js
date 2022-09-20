

export default async ({ redirect, store, $auth, $axios, $cookies, window }) => {

    if (!$auth.strategy.token.status().valid() && $auth.loggedIn ) {
        $auth.logout()
        store.commit('toasted', { text: "Faça o login novamente, você ficou muito tempo fora." })
        return redirect("/login")
    }


}