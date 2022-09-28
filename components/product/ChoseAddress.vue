<template>
    <div>
        <v-dialog
            v-model="model"
            max-width="520px"
            persistent
            style="max-height: fit-content !important"
        >
            <v-card>
                <div
                    class="text--right d-flex"
                    @click="$emit('back')"
                    style="cursor: pointer"
                >
                </div>
                <div class="pa-5">
                    <span class="text-h6">
                        <wbr /> Em <wbr /> qual endereço você <wbr />quer
                        <wbr />receber<wbr /> o <wbr />seu <wbr />produto?
                        <wbr />
                    </span>
                </div>
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
                                    {{ address.number ? address.number : "SN" }}
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
                                <v-checkbox
                                    @click="selected = [index]"
                                    :value="index"
                                    v-model="selected"
                                ></v-checkbox>
                            </td>
                        </tr>
                    </tbody>
                </v-simple-table>
                <v-divider class="pb-5"></v-divider>

                <div>
                    <router-link
                        class="
                            primary--text
                            pl-5
                            text-left text-decoration-none
                            third--text
                        "
                        to="/profile/address"
                    >
                        <span> Criar ou editar um endereço </span>
                        <v-icon>mdi-arrow-right-bold</v-icon>
                    </router-link>
                </div>

                <v-btn
                    @click="$emit('buy')"
                    class="accent third--text font-weight-bold mt-10"
                    height="50px"
                    block
                    >Salvar</v-btn
                >
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    props: {
        addresses: Array,
        model: Boolean,
    },

    data() {
        return {
            selected: [0],
        };
    },

    watch: {
        selected() {
            this.$emit("selectedChange", this.selected);
        },
    },
};
</script>

<style>
.v-dialog--active{
    height: auto !important;
}
</style>