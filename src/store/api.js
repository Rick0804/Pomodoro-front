import { defineStore } from "pinia";
import axios from "axios";

export const api = defineStore('api', {
    state: () => ({
        listTask: false,
        selectedTask: 1 
    }),
    actions: {
        async getSelectedTask(){
            console.log(this.selectedTask)
            return this.selectedTask;
        },
        async getTasks(){
            try {
                const response = await axios.get("http://localhost:8000/api/pomos/pomos-list");
                this.listTask = response.data;
            } catch(e){
                console.log(e + " erro");
            }
        },
        async search(id){
            try {
                const response = await axios.get('http://localhost:8000/api/pomos/pomos-get-task/' + id)
                console.log('asdfasdf ', response.data)
                console.log(id);
                return response.data;

            } catch (e){
                console.log(id)
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
                await axios.delete('http://localhost:8000/api/pomos/pomos-delete/' + id, {

                });
                this.getTasks();
            } catch (e) {
                console.error('erro: ' + e);
            }
        },
        async updateData(Pomo = this.listTask[id].Pomo, descricao = this.listTask[id].descricao, Qntd_pomos = this.listTask[id].Qntd_pomos, Qntd_pomos_feitos = this.listTask[id].Qntd_pomos_feitos, id){
            try {
                await axios.put('http://localhost:8000/api/pomos/pomos-edit/' + id, {
                    Pomo,
                    descricao,
                    Qntd_pomos,
                    Qntd_pomos_feitos
                })
            } catch (e){

            }
        }
    }
})