import axios from '@/plugins/axios';

const state = {

}

const mutations = {



    updateVocabularies(state,payload) {
        // return state.vocabularies = payload;

    }

}

const getters = {

}


const actions = {
    
    create({commit} , data) {
        return new Promise(function(resolve ,reject){
         return axios.post(`vocabularies/word/` , data).then((data)=>{

            commit('updateVocabularies',data);
            return resolve(data)

            }).catch((error)=>{
                // console.log(error.response)
                return reject(error)
            })
        })
    },
    getVocabulary({commit},id) {

        return axios.get(`vocabularies/${(typeof id ==='undefined' ? '' : id)}`).then((data)=>commit('updateVocabularies',data))
        .catch((error)=>{})

    },
}

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations,
    
}