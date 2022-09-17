
export default  function ({ $axios, res, $cookies, store }) {
    

    $axios.onResponse((config) => {
        if (config.config.url == "/signin" || config.config.url == "/refreshToken") {
            const token = config.data.access_token
            config.data.access_token = true
            $axios.defaults.headers['Authorization'] = `Bearer ${token}`
        }
        return config;

    });
}