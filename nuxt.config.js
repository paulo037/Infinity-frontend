import colors from 'vuetify/es5/util/colors'

export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    server: {     
        port: 3000, // default: 3000     
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

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
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
       
    ],

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
                    primary: colors.amber.darken2, // #E53935
                    secondary: colors.grey.darken4, // #FFCDD2
                    third: colors.grey.lighten5,
                    accent: colors.amber.darken2, // #3F51B5
                    disabled_text: colors.grey.lighten2,
                    disabled: colors.orange.lighten2,
                },
                light: {
                    primary: colors.grey.darken4,
                    secondary: colors.grey.lighten5,
                    third: colors.grey.darken4,
                    accent: colors.amber.darken2,
                    disabled_text: colors.grey.lighten2,
                    disabled: colors.orange.lighten2,
                },
            },

        }
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
    }
}