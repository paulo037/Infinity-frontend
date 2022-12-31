<template>
    <div>
        <v-data-table :items="users" :headers="headers" :search="search">
            <template v-slot:top>
                <v-row justify="space-around">
                    <v-col cols="9" sm="5" class="pb-0">
                        <v-text-field
                            v-model="search"
                            dense
                            label="Pesquisar"
                            outlined
                            append-icon="mdi-magnify"
                        ></v-text-field>
                    </v-col>
                </v-row>
            </template>
            <template #[`item.actions`]="{ item, index }">
                <v-icon
                    class="mr-2 primary--text"
                    @click="onDialog(item, index)"
                >
                    mdi-pencil
                </v-icon>
            </template>
            <template #[`item.admin`]="{ item }">
                {{ item.admin ? "sim" : "não" }}
            </template>
        </v-data-table>

        <v-dialog v-model="dialog" max-width="300px">
            <v-card class="pa-2">
                <v-card-title
                    class="text-center"
                    v-html="text"
                    style="white-space: nowrap"
                >
                </v-card-title>

                <v-card-actions class="flex justify-space-between">
                    <v-btn class="red white--text" @click="dialog = false">
                        Cancelar
                    </v-btn>
                    <v-btn
                        class="green white--text"
                        @click="changePermission()"
                    >
                        Confirmar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    data: () => ({
        users: [],
        admin: false,
        dialog: false,
        user: null,
        search: "",
        text: "",
        headers: [
            {
                text: "Nome",
                align: "start",
                value: "first_name",
            },
            {
                text: "Email",
                value: "email",
                sortable: false,
            },
            { text: "Admin", value: "admin" },
            {
                text: "Ações",
                value: "actions",
                sortable: false,
                align: "right",
            },
        ],
    }),
    async fetch() {
        this.users = await this.$axios.$get(`users`);
    },
    methods: {
        onDialog(user, index) {
            this.user = this.users[index];
            this.text = user.admin
                ? `Retirar<wbr> permições<wbr> de<wbr> administrador<wbr> de<wbr> ${user.first_name}`
                : `Tornar<wbr> ${user.first_name}<wbr> Administrador`;
            this.dialog = true;
        },
        async changePermission() {
            this.dialog = false;
            await this.$axios
                .$put(`admin/user/${this.user.id}`, {
                    admin: !Boolean(this.user.admin),
                })
                .catch((e) =>
                    this.$toasted({
                        text: e.response.data
                            ? e.response.data
                            : "Ocorreu um erro inesperado!",
                    })
                )
                .then(() => {
                    this.users[this.users.indexOf(this.user)].admin = !Boolean(
                        this.user.admin
                    );
                });
        },
    },
};
</script>

<style>
</style>