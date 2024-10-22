<script>
import { api } from '@/store/api';
import { nextTick, toRefs } from 'vue';

export default {
    name:'UpdateTask',
    setup(){
        const getApi = api()
        const {updateData, search, getSelectedTask} = toRefs(getApi)

        return {
            updateData,
            search,
            getSelectedTask,
            Pomo: null,
            descricao: null,
            Qntd_pomos: null,   
            Qntd_pomos_feitos: null,
            task: null,
        }
    },
    methods: {
        async takeTask(id){
            try {
                console.log('push ', id)
               this.task = await this.search(id)
            } catch (e) {
                console.log("deu ruim")
            }
        },

        showTasks(){
            console.log(this.task)
        }
    },
    mounted(){
        nextTick(async() => {
            await this.getSelectedTask((response) => {console.log(response)}); 
        })
    }
}
</script>
<template>
    <div class="forms">
        <div class="class-form">
            <button class="exit" @click="$emit('changeInputTask')"><i class="png-exit fa-solid fa-x"></i></button>
            <form v-on:submit.prevent="postTask">
                <label for="tarefa">Nome:</label>
                <input required placeholder="insira a tarefa" name="tarefa" v-model="Pomo" type="text">
                <label for="descricao">Insira/edite a descrição:</label>
                <input placeholder="descrição (opcional)" name="descricao" type="text" v-model="descricao">
                <label for="qntd-pomos">Quantos Pomos quer fazer:</label>
                <input required type="number" name="qntd-pomos" placeholder="quantidade de pomos" v-model="Qntd_pomos">
                <label for="qntd-pomos">Quantos Pomos fez:</label>
                <input required type="number" name="qntd-pomos" placeholder="quantidade de pomos" v-model="Qntd_pomos">
                <button type="submit">enviar</button>
            </form>
        </div>
    </div>
    
</template>
<style scoped>

    form {
       gap: 10px;
    }
    .exit {
        width: fit-content;
        background-color: transparent;
        border: none;
        cursor: pointer;
    }
    form {
        display: flex;
        flex-direction: column;
    }
    .class-form {
        padding: 20px;
        right: 26px;
        width: fit-content;
        border-radius: 4px;
        display: flex;
        background-color: #ececec;
        flex-direction: column;
        gap: 10px;
        outline: #838181 solid 1px;
    }

    form input {
        padding: 10px;
        width: fit-content;
        border: none;
        outline: none;
    }

</style>