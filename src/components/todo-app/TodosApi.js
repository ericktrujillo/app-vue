import axios from 'axios'
import Vue from 'vue'

const SERVER_URL ='http://localhost:8083'

const instance = axios.create({
    baseURL : SERVER_URL,
    timeout : 2000
})

export default {
    async execute(method, resource, data, config) {
        let accessToken = await Vue.prototype.$auth.getAccessToken()
        return instance({
            method:method,
            url: resource,
            data,
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            ...config
        })
    },

    //create
    createNew : function(text,completed) {
        return this.execute('POST','todos',{title : text, completed : completed});
        //return instance.post('todos',{title:text, completed :completed})
    },
    //Read
    getAll : function (){
         return this.execute('GET','todos', null);
        //return instance.get('todos', );
    },
    //Update
    updateForId : function (id, text , completed) {
        return this.execute('PUT','todos/'+id,{title : text, completed:completed});
        //return instance.put('todos/'+id,{title:text, completed: completed})
    },
    //Delete
    removeForId :function(id){
        return this.execute('DELETE','todos/'+id)
        //return instance.delete('todos/'+id);
    }
}