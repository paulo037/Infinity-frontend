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
                ></div>
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
                                    {{
                                        address.complement != ""
                                            ? "-" + address.complement
                                            : ""
                                    }}
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

                <div class="text-right px-5">
                    <router-link
                        class="
                            
                            text-end text-decoration-none
                            third--text
                        "
                        to="/profile/address"
                        @click="
                            $store.commit(
                                'setBack_url',
                                $router.history.current.path
                            )
                        "
                    >
                        <span> Criar ou editar um endereço </span>
                        <v-icon>mdi-arrow-right-bold</v-icon>
                    </router-link>
                </div>
                <div class="text-center">
                    <v-btn
                        @click="$emit('buy')"
                        class="accent font-weight-bold my-5"
                        >Salvar alterações</v-btn
                    >
                </div>
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
.v-dialog--active {
    height: auto !important;
}
</style>