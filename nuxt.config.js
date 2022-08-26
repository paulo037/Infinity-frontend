import colors from 'vuetify/es5/util/colors'

export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    server: {
        // port: process.env.PORT | 3000, // default: 3000     
        host: '0.0.0.0',
        // default: localhost   
    },
    head: {
        titleTemplate: 'Infinity Modas',
        title: 'Infinity Modas',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' }
        ],
        link: [
            { rel: 'icon', type: 'image/png', href: '/favicon.png' }
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        '@/assets/style.css'
    ],

    transpileDependencies: ["vuetify", "@peepi/vuetify-tiptap"],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        '~plugins/vue-the-mask.js'
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/eslin  '@nuxtjs/eslint-module',
        // https://go.nuxtjs.dev/vuetify
        ['@nuxtjs/vuetify']
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/axios

        '@nuxtjs/axios',
        '@nuxtjs/axios',
        '@nuxtjs/auth-next'

    ],

    auth: {
        strategies: {
            local: {
                token: {
                    property: 'token',
                    global: true,
                    // required: true,
                    type: 'Bearer'
                },
                user: {
                    property: 'user',
                    // autoFetch: true
                },

                endpoints: {
                    login: { url: '/signin', method: 'post' },
                    logout: { url: '/api/auth/logout', method: 'post' },
                    user: { url: '/validateToken', method: 'post', },
                },

            }
        }
    },


    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
        // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
        baseURL: process.env.URLBASE
    },

    // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
    vuetify: {
        customVariables: ['~/assets/variables.scss'],
        theme: {
            dark: true,
            themes: {
                dark: {
                    primary: colors.amber.darken2, // dourado
                    secondary: colors.grey.darken4, // black
                    third: colors.grey.lighten5, //branco
                    accent: colors.amber.darken2, // #3F51B5
                    disabled_text: colors.grey.lighten2,
                    disabled: colors.orange.lighten2,
                    nav_background: colors.grey.darken4, // black
                    nav_text: colors.amber.darken2, // black
                },
                light: {
                    primary: colors.grey.darken4, // black
                    secondary: colors.grey.lighten4, //branco
                    third: colors.grey.darken4, // black
                    accent: colors.amber.darken2, // dourado
                    disabled_text: colors.grey.lighten2,
                    disabled: colors.orange.lighten2,
                    nav_background: colors.amber.lighten1, // dourado
                    nav_text: colors.amber.darken2, // black
                },
            },

        }
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {

    }
}
