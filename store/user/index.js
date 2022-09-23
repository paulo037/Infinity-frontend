export const state = () => ({
    addresses: [],
    address: {
        user_name: null,
        cep: null,
        state: null,
        city: null,
        district: null,
        street: null,
        telephone: null,
        number: null,
    },

})
export const mutations = {


    setAddresses(state, payload) {
        state.addresses = payload
    },


    setAddress(state, payload) {
        state.address = payload
    },


}

export const getters = {
    getAddress(state) {
        return JSON.parse(JSON.stringify(state.address )) 
    },
}
