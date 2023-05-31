import colors from 'vuetify/es5/util/colors'

export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    ssr: true,
    server: {

        // port: process.env.PORT | 3000, // default: 3000     
        host: '0.0.0.0',
        // default: localhost   
    },
    head: {
        titleTemplate: 'Infinity Modas',
        title: 'Infinity Modas',
        htmlAttrs: {
            lang: 'pt-br'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' }
        ],
        link: [
            { rel: 'icon', type: 'image/png', href: '/favicon.png' }
        ],

    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        '@/assets/style.css'
    ],

    transpileDependencies: ["vuetify", "@peepi/vuetify-tiptap"],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        '~plugins/vue-the-mask.js',
        '~/plugins/axios.js',
        '~/plugins/toasted.js',
        '~/plugins/brazilianDate.js',
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: [
        '~/components',
    ],

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/eslin  '@nuxtjs/eslint-module',
        // https://go.nuxtjs.dev/vuetify
        ['@nuxtjs/vuetify',
            "@nuxtjs/dotenv"
        ]
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/axios

        '@nuxtjs/axios',
        '@nuxtjs/auth-next',
        'cookie-universal-nuxt',
        'universal-cookie',
        ['cookie-universal-nuxt', { alias: 'cookiz' }],
        '@nuxt/image',

    ],

    image: {

        screens: {
            xs: 600,
            sm: 959,
            md: 1264,
            lg: 1500,
            xl: 1600,

        },



        cloudinary: {
            name: 'cloudinary',
            baseURL: "https://res.cloudinary.com/dhtgipp7l/image/upload/v1673533404/",
            modifiers: {
                format: 'webp',
                quality: 'auto:best',

            }
        },







    },

    auth: {

        strategies: {
            localStorage: false,
            local: {
                scheme: 'refresh',

                autoLogout: false,

                refreshToken: {
                    property: 'refresh_token',
                    data: 'refresh_token',
                    tokenRequired: true,
                    maxAge: 60 * 60 * 48,
                },

                token: {
                    property: 'access_token',
                    maxAge: 60 * 60 * 3,
                    tokenRequired: true,
                    global: true,
                },

                user: {
                    property: 'user',
                },



                endpoints: {
                    login: { url: '/signin', method: 'post' },
                    logout: { url: `${process.env.BASE_FRONT}/server/logout`, method: 'post' },
                    user: { url: '/validateToken', method: 'post' },
                    refresh: { url: `${process.env.BASE_FRONT}/server/refreshToken`, method: 'post' },
                },

            }
        },


        redirect: {
            login: '/login',
            logout: '/login',
            home: '/login',
            callback: '/',
        },
        watchLoggedIn: true,


    },

    router: {
        middleware: ['token']
    },

    serverMiddleware: process.env.NODE_ENV !== 'production' ? [{ path: '/server', handler: '~/server-middleware/index.js' }] : [{ path: '/server', handler: '~/server-middleware/index.js' }],

    env: {
        MP_PUBLIC_KEY: process.env.MP_PUBLIC_KEY,
        JWT_SECRET: process.env.JWT_SECRET,
        BASE_FRONT: process.env.BASE_FRONT,
    },

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
        // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
        baseURL: process.env.URLBASE,
        credentials: true,
    },


    loading: {
        color: "#ffa000",
        height: '1px'
    },

    // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
    vuetify: {
        customVariables: ['~/assets/variables.scss'],
        theme: {
            dark: true,
            themes: {
                dark: {
                    primary: colors.amber.darken2, // dourado
                    primary_hover: colors.orange.darken3, // dourado
                    darken3: colors.orange.darken3, // dourado
                    darken4: colors.amber.lighten1, // dourado
                    secondary: colors.grey.darken4, // black
                    third: colors.grey.lighten5, //branco
                    accent: colors.amber.darken2, // #3F51B5
                    disabled_text: colors.grey.lighten2,
                    disabled: colors.orange.lighten2,
                    nav_background: colors.grey.darken4, // black
                    nav_text: colors.amber.darken4, // black
                    green2: colors.lightGreen.accent4,

                },
                light: {
                    green2: colors.lightGreen.accent4,
                    primary: colors.grey.darken4, // black
                    secondary: colors.grey.lighten4, //branco
                    third: colors.grey.darken4, // black
                    accent: colors.amber.darken2, // dourado
                    disabled_text: colors.grey.lighten2,
                    disabled: colors.orange.lighten2,
                    nav_background: colors.amber.lighten1, // dourado
                    nav_text: colors.amber.darken2, // black
                    primary_hover: colors.grey.darken3, // dourado
                    darken3: colors.orange.darken3, // dourado
                    darken4: colors.amber.lighten1, // dourado

                },
            },

        }

    },



    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {

    }
}