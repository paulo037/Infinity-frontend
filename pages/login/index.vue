<template>
  <div align="center">
    <v-card max-width="700px"  class="secondary mb-8 pa-8" elevation="20">
      <header class="third--text text-h4 mb-8">LOGIN</header>
      <v-form ref="form"  lazy-validation class="text-left">
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
          outlined
        ></v-text-field>

        <v-text-field
          v-model="password"
          :rules="nameRules"
          label="Senha"
          required
          outlined

        ></v-text-field>
        
        <router-link  class="third--text text-left"  to="/registration">CADASTRAR</router-link>
        <v-container width="100%"  class="my-8 text-center" >

        <v-btn align="center" height="50px" class="primary px-10">
            CONTINUAR
        </v-btn>
        </v-container>
      </v-form>
    </v-card>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>