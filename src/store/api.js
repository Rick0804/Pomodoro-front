import { defineStore } from "pinia";
import axios from "axios";

export const api = defineStore('api', {
    state: () => ({
        listTask: [],
        selectedTask: null 
    }),
    actions: {
        async getTasks(){
            try {
                const response = await axios.get("http://localhost:8000/api/pomos/pomos-list");
                this.listTask = response.data;
            } catch(e){
                console.log(e + " erro");
            }
        },
        async postData(Pomo, descricao, Qntd_pomos){
            try {
                await axios.post('http://localhost:8000/api/pomos/send', {
                    Pomo,
                    descricao,
                    Qntd_pomos
                })
                await this.getTasks();
            } catch(e){
                console.log("erro; " + e);
            }
        },
        async deleteData(id){
            try {
                await axios.delete('http://localhost:8000/api/pomos/pomos-delete/' + id);
                this.getTasks();
            } catch (e) {
                console.error('erro: ' + e);
            }
        }
    }
})