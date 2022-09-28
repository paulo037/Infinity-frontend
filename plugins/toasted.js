export default ({ store }, inject) => {
    inject('toasted', payload => store.commit('toasted', payload))
  }