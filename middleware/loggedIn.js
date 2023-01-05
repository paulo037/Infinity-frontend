export default async ({$axios, $auth, $toasted, redirect}) => {

    try {
        if (!$auth.loggedIn) {
            $toasted({
                text: "Entre ou crie uma conta para ver seu carrinho!",
            });
            try {

                await $axios.$post(`validateToken/`);
            } catch (error) {
                return redirect("/login");

            }
        }
    } catch (error) {
        return redirect("/")

    }







}
