<template>
    <div align="center">
        <v-card max-width="500px" class="secondary mb-8 pa-8" elevation="20">
            <header class="third--text text-h4 mb-8">LOGIN</header>

            <v-form ref="form" lazy-validation class="text-left">
                <v-text-field
                    label="E-mail"
                    name="email"
                    v-model="user.email"
                    required
                    outlined
                ></v-text-field>

                <v-text-field
                    label="Senha"
                    name="password"
                    v-model="user.password"
                    required
                    outlined
                ></v-text-field>

                <span> Não têm conta ? </span>

                <router-link class="primary--text text-left" to="/signup">
                    Cadastrar-se
                </router-link>

                <v-container width="100%" class="my-8 text-center">
                    <v-btn
                        align="center"
                        height="40px"
                        class="primary px-10"
                        @click="login"
                    >
                        CONTINUAR
                    </v-btn>
                </v-container>
                <!-- <v-btn
          @click="$auth.loginWith('google')"
          height="40px"
          class="third pa-0 rounded-pill pr-2"
          small
        >
          <div height="40px" width="40px" class="rounded-circle">
            <v-img
              :src="'google.svg'"
              class="ma-2"
              height="25.5px"
              width="25.5px"
            >
            </v-img>
          </div>
          <span class="secondary--text"> Fazer login com o Google </span>
        </v-btn> -->
            </v-form>
        </v-card>

        <div id="my-signin2"></div>
    </div>
</template>


<script>
import { mapMutations } from "vuex";

export default {
    // middleware: 'a',
    // middleware (){
    //  console.log("okookokoko")
    // },
    data() {
        return {
            user: {
                email: "p@gmail.com",
                password: "77770000",
            },
        };
    },

    methods: {
        async login() {
            //   console.log(this.user);
            //   await this.$axios
            //     .$post(`signin/`, {
            //       email: this.user.email,
            //       password: this.user.password,
            //     })
            //     .catch((e) => console.log(e));

            this.$auth
                .loginWith("local", {
                    data: {
                        email: this.user.email,
                        password: this.user.password,
                    },
                })
                .then((response) => {
                    console.log(response)
                    this.toasted({
                        text: "Login realizado com sucesso !",
                        color: "success",
                    });

                })
                .catch((e) =>
                    e.response.data
                        ? this.toasted({ text: e.response.data })
                        : this.toasted({ text: e })
                );
        },

        ...mapMutations(["toasted"]),
    },
};
</script>

<style>
</style>