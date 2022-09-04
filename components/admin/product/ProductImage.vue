<template>
    <v-card outlined>
        <div class="text-center d-block primary--text text-h6 my-5">
            <wbr /> Imagens<wbr /> Do<wbr /> Produto<wbr />
        </div>
        <v-row>
            <v-col class="pa-0">
                <v-row justify="center">
                    <v-col cols="12" sm="10" xl="6" class="pa-1">
                        <v-btn
                            color="primary"
                            :loading="isSelecting"
                            block
                            outlined
                            @click="handleFileImport"
                            max-width="300px"
                            class="mb-5 pa-0"
                        >
                            Adicionar<wbr /> Imagem
                        </v-btn>

                        <input
                            ref="uploader"
                            class="d-none"
                            type="file"
                            accept="image/*"
                            name="uploadImages"
                            @change="onFileChanged"
                        />
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
        <v-divider></v-divider>

        <v-simple-table>
            <tbody>
                <tr v-for="(item, index) in items" :key="index">
                    <td>
                        <v-img
                            :src="item.url ? item.url : createURL(item.file)"
                            max-width="36px"
                            max-height="36px"
                        />
                    </td>

                    <td>
                        {{ item.name.substring(0, 19) }}
                        {{ item.name.length > 20 ? "..." : "" }}
                    </td>

                    <td>
                        <v-icon
                            small
                            class="rounded-0 ma-0 mr-15 d-block accent--text"
                            @click="makePrimary(index)"
                            :class=" item.primary ? 'accent--text' : 'white--text' "
                        >
                            mdi-star
                        </v-icon>
                    </td>

                    <td>
                        <v-icon
                            @click="removeImage(index)"
                            class="mr-2 red--text"
                        >
                            mdi-delete
                        </v-icon>
                    </td>
                </tr>
            </tbody>
        </v-simple-table>

    </v-card>
</template>

<script>
export default {
    data() {
        return {
            isSelecting: false,
            headers: [
                { value: "image", sortable: false },
                { value: "name", sortable: false },
                { value: "primary", sortable: false },
                { value: "actions", sortable: false },
            ],
        };
    },
    props: {
        items: [],
    },
    methods: {
        handleFileImport() {
            this.isSelecting = true;

            window.addEventListener(
                "focus",
                () => {
                    this.isSelecting = false;
                },
                { once: true }
            );
            this.$refs.uploader.click();
        },

        onFileChanged(e) {
            let file = e.target.files[0];

            let item = {};

            if (this.items.length == 0) {
                item.primary = true;
            } else {
                item.primary = false;
            }
            item.name = file.name;
            item.file = file;
            this.items.push(item);
            console.log(this.items);
        },
        createURL(img) {
            return URL.createObjectURL(img);
        },

        removeImage(index) {
            let image = this.items.splice(index, 1);
            if (image[0].primary && this.items.length >= 1) {
                this.items[0].primary = true;
            }
        },

        makePrimary(index) {
            if (this.items.length === 1) return;
            this.items.forEach((image, i) => {
                console.log(image);
                if (i === index) {
                    this.items[i].primary = true;
                } else {
                    this.items[i].primary = false;
                }
                this.items.push({});
                this.items.pop();
            });
        },
    },
    watch: {
        items: {
            handler() {},
            deep: true,
        },
    },
};
</script>

<style>
</style>