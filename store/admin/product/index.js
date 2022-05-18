export const state = () => ({
    sizes: [],
    colors: [],
    dialog: false,
    dialogFunction: () => null,
    text: '',
})


export const mutations = {
    pushSize(state, {size, color}) {
        
        let item = {
          size: size.value,
          size_id: size.id,
          color: color.value,
          color_id: color.id,
          quantity: 1,
        };
        state.sizes.push(item);
    },

    changeSize(state, {
        item: { size,
            size_id,
            color,
            color_id,
            quantity }, index }) {

        state.sizes[index] = {
            size,
            size_id,
            color,
            color_id,
            quantity
        };

    },

    incrementSize(state, index){
        state.sizes[index].quantity++;
    },

    decrementSize(state, index){
        state.sizes[index].quantity--;
    },


    deleteSize(state, value) {
        state.sizes.splice(state.sizes.indexOf(value), 1);
    },

    pushColor(state, color) {
        state.colors.push(color);
    },

    deleteColor(state, value) {
        state.colors.splice(state.colors.indexOf(value), 1);
    },

    initialColor(state, color) {
        state.colors = color;
    },

    initialSizes(state, sizes) {
        state.sizes = sizes;
    },

    changeIdSize(state,  {index, color, id}) {

        state.sizes[index].color_id = id;
        state.sizes[index].color = color;
    },

    setText(state, text) {
        state.text = text;
    },

    changeDialog(state) {
        state.dialog = !state.dialog;
    },

    onDialog(state, timout, cb) {
        state.dialog = true;

        state.dialogFunction =
            cb != undefined
                ? cb
                : function () {
                    state.dialog = false;
                };

    },

    executeCallBack(state) {
        state.dialogFunction();
    },

}
