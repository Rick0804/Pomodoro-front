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
                const response = await axios.get('http://localhost:8000/api/pomos/pomos-search/' + id)
                console.log(response.data.Object)
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
        async updateData(Pomo, descricao, Qntd_pomos, Qntd_pomos_feitos, id){
            try {
                await axios.put('http://localhost:8000/api/pomos/pomos-edit/' + id, {
                    Pomo,
                    descricao,
                    Qntd_pomos,
                    Qntd_pomos_feitos
                })
                await this.getTasks();
            } catch (e){
                console.error("erro: " + e);
            }
        }
    }
})