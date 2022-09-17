
export default function ({ $axios, res, $cookies, store }) {
    $axios.onRequest(function (config) {
        // Do something before request is sent
        const token = $cookies.get('access_token')

        $axios.defaults.headers['Authorization'] = `${token}`
        console.log(token)
        store.commit("toasted", { text: token })
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });

    $axios.onResponse((config) => {
        // if (config.config.url == "/signin") {
        //     const token = config.data.access_token
        //     config.data.access_token = true
        //     $axios.defaults.headers['Authorization'] = `Bearer ${token}`
        // }
        // return config;

    });
}