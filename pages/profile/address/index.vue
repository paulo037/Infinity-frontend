<template>
    <div align="center">
        <div align="left"  style="max-width: 1000px">
            <v-icon @click="$router.push('/profile')" x-large>mdi-arrow-left-bold</v-icon>
        </div>
        <v-col cols="12" sm="8" class="pa-0" style="max-width: 800px">
            <h1 class="text-left pb-5">Endereços</h1>
            <v-card style="max-width: 800px" class="d-block">
                <v-divider></v-divider>
                <v-simple-table>
                    <tbody>
                        <tr v-for="(address, index) in addresses" :key="index">
                            <td style="width: 20px">
                                <v-icon>mdi-home</v-icon>
                            </td>
                            <td class="py-5">
                                <span class="text-h6"
                                    >{{ address.street }} -
                                    {{ address.number ? address.number : "SN" }} - {{ address.complement }}
                                </span>
                                <br />
                                <span class="py-5 text-body-2"
                                    >CEP {{ address.cep }} -
                                    {{ address.state }} -
                                    {{ address.city }}
                                </span>

                                <br />
                                <span class="py-5 text-body-2"
                                    >{{ address.user_name }} -
                                    {{ address.telephone }}
                                </span>
                            </td>

                            <td>
                                <router-link
                                    class="
                                        primary--text
                                        pl-5/watch
                                        text-left text-decoration-none
                                        third--text
                                    "
                                    :to="{
                                        path: '/profile/address/edit',
                                        query: { target: address.id },
                                    }"
                                >
                                    <span class="primary--text">
                                        Editar endereço
                                    </span>
                                    <v-icon class="primary--text"
                                        >mdi-arrow-right-bold</v-icon
                                    >
                                </router-link>
                            </td>
                        </tr>
                    </tbody>
                </v-simple-table>
                <v-divider class="pb-5"></v-divider>

                <v-btn
                    @click="
                        $router.push({
                            path: 'address/new-address',
                        })
                    "
                    class="accent third--text font-weight-bold mt-10"
                    height="50px"
                    block
                    >Adicionar novo endereço</v-btn
                >
            </v-card>
        </v-col>
    </div>
</template>

<script>

export default {

    middleware: "address",
    data() {
        return {
            addresses: this.$store.state.user.addresses,
        };
    },
};
</script>

<style>
</style>