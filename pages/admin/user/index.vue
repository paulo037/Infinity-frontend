<template>
    <div>
        <div class="pb-0 text-right font-weight-bold">
           Total de usuários: {{ count }}
        </div>
        <v-data-table
            :items="users"
            :headers="headers"
            :search="search"
            hide-default-footer
            :loading="loading"
            loading-text="Carregando..."
            dense
        >
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

        <v-divider class="mb-10"></v-divider>

        <Pagination
            :count="count"
            :limit="limit"
            :limits="limits"
            :page="page"
            :text="'Pedidos por página:'"
            v-on:pageChange="pageChange"
            v-on:limitChange="limitChange"
        />
        <v-divider></v-divider>

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
import Pagination from "~/components/Pagination.vue";
export default {
    components: {
        Pagination,
    },
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
        loading :false,
        page: 1,
        count: 0,
        limit: 10,
        limits: [5, 10, 20, 50, 100],
    }),
    async fetch() {
        await this.getUsers();
    },
    methods: {
        async getUsers() {
            this.loading = true;
            const params = new URLSearchParams();
            params.append("limit", this.limit);
            params.append("page", this.page);

            let { users, count } = await this.$axios.$get(`users`, {
                params,
            });

            this.users = users;
            this.count = count;
            this.loading = false;
        },
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

        async limitChange(limit) {
            this.limit = limit;
            this.page = 1;
            await this.getUsers();
        },

        async pageChange(page) {
            this.page = page;
            await this.getUsers();
        },
    },
};
</script>

<style>
</style>