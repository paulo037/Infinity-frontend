export default ({$auth, redirect}) => {
    // console.log(context.$auth.$state.loggedIn)
    if($auth.$state.loggedIn && $auth.$state.user.admin){
        console.log("admin")
    }
    else{
        return redirect("/")
    }
    
}