/* jshint esversion: 9 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    topIds: [],
    topstories: [],
    newIds: [],
    newstories: [],
    bestIds: [],
    beststories: [],
    num: 50,
  },
  mutations: {
    increment: state => {
      state.num += 50;
    },
    decrement: state => state.num -= 50
  },
  getters: {
    num: state => state.num,
    topIds: state => state.topIds,
    topstories: state => state.topstories,
  },
});
