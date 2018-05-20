import Vue from 'vue';
import Vuex from 'vuex';

import tabs from './tabs';
import vocabularies from './vocabularies';
import words from './words';

Vue.use(Vuex);


const store = new Vuex.Store({

    modules: {
        tabs,
        vocabularies,
        words
    }


})


export default store;