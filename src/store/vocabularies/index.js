import axios from '@/plugins/axios';

const state = {
    vocabularyMenu: [
        {
            id: 1,
            url: '/vocabularies/waiting',
            name: 'Waiting',
            icon: 'query_builder',

        },
        {
            id: 2,
            url: '/vocabularies/done',
            name: 'Done',
            icon: 'check_circle',

        },
        {
            id: 3,
            url: '/vocabularies/deleted',
            name: 'Deleted',
            icon: 'delete',

        },
        {
            id: 4,
            url: '/vocabularies/favorite',
            name: 'Favorite',
            icon: 'favorite',

        },
        {
            id: 5,
            url: '/vocabularies/repeat',
            name: 'Repeat',
            icon: 'update',

        }
    ],
    vocabularies:[],
    vocabularyCurrentTab:0,
    vocabulary:{},
    message:"",

}


const getters = {

    getCurrentVocabularyTab(state) {
        var tab = state.vocabularyMenu[state.vocabularyCurrentTab];
        return (!!tab) ? tab : false
    },
    getVocabularyMenu(state) {
        return state.vocabularyMenu;
    },
    getAllVocabularies(state) {
        return state.vocabularies;
    },
    getVocabular(state) {
        return state.vocabulary;
    },


}

const mutations = {

    changeCurrentVocabularyTab(state, tabIndex) {
        
        // itabIndex < 0 ? tabIndex = 0 ? tabIndex > state.vocabularyMenu.length : 1

        if(isNaN(tabIndex)) return state.vocabularyCurrentTab = state.vocabularyMenu.indexOf(state.vocabularyMenu.find((tab,index) => tab.url == tabIndex  ))
        else {
            if(tabIndex < 0) {
                tabIndex = 0
            }else if (tabIndex >= state.vocabularyMenu.length ){ 
                tabIndex = state.vocabularyMenu.length -1;
            }
            return state.vocabularyCurrentTab = tabIndex ;
        }

        
    },
    updateVocabularies(state,payload) {
        // return state.vocabularies = payload;

        // console.log(payload.data.vocabulary);
    },
    updateVocabulary(state,payload) {

        // console.log(payload); 
        state.vocabulary = payload.data.vocabulary;
    }

}


const actions = {
    getByLang({commit}) {

    },
    getAllVocabulary({commit}) {

    },
    getVocabulary({commit},id) {

        return axios.get(`vocabularies/${(typeof id ==='undefined' ? '' : id)}`).then((data)=>{
            console.log(data)
            if(typeof id ==='undefined') {
                commit('updateVocabularies',data)
            }else {
                commit('updateVocabulary',data)
            }

        }).catch((error)=>{})

    },
}

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations,
    
}