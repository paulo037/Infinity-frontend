

export default async ({ redirect, store, $auth, route }) => {

    if (!$auth.strategy.token.status().valid() && $auth.loggedIn && !$auth.strategy.refreshToken.status().valid()) {
        $auth.logout()
        store.commit('toasted', { text: "Faça o login novamente, você ficou muito tempo fora." })
        return redirect("/login")
    }


    if (!$auth.strategy.token.status().valid() && $auth.loggedIn && $auth.strategy.refreshToken.status().valid()) {
        store.commit('setReload', route.path)
        store.commit('setLoad', true)
    }
}