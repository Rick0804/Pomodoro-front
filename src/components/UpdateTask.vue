<script>
import { api } from '@/store/api';
import { nextTick, toRefs, ref } from 'vue';

export default {
    name:'UpdateTask',
    setup(){
        const getApi = api()
        const {updateData, search, selectedTask} = toRefs(getApi)

        return {
            updateData,
            search,
            selectedTask,
            Pomo: ref(''),
            descricao: ref(''),
            Qntd_pomos: ref(''),   
            Qntd_pomos_feitos: ref(''),
            task: ref(''),
        }
    },
    methods: {
        async takeTask(id){
            try {
               this.task = await this.search(id)
            } catch (e) {
                console.log("deu ruim")
            }
        },

        dataDesign(){
            this.Pomo = this.task.Pomo
            this.descricao = this.task.descricao
            this.Qntd_pomos = this.task.Qntd_pomos   
            this.Qntd_pomos_feitos = this.task.Qntd_pomos_feitos
            console.log(this.Pomo)
            console.log(this.descricao)
            console.log(this.Qntd_pomos)
            console.log(this.Qntd_pomos_feitos)
        },
        sendData(){
            this.updateData(this.Pomo, this.descricao, this.Qntd_pomos, this.Qntd_pomos_feitos, this.selectedTask)
            this.$emit('changeInputTaskUpdate');
        },
    },
    mounted(){
        nextTick(async () => {
            await this.takeTask(this.selectedTask).then(() => this.dataDesign())
        })
    }
}
</script>
<template>
    <div class="forms">
        <div class="class-form">
            <button class="exit" @click="$emit('changeInputTaskUpdate')"><i class="png-exit fa-solid fa-x"></i></button>
            <form v-on:submit.prevent="sendData">
                <label for="tarefa">Nome:</label>
                <input required placeholder="insira a tarefa" name="tarefa" v-model="Pomo" type="text">
                <label for="descricao">Insira/edite a descrição:</label>
                <input placeholder="descrição (opcional)" name="descricao" type="text" v-model="descricao">
                <label for="qntd-pomos">Quantos Pomos quer fazer:</label>
                <input required type="number" name="qntd-pomos" placeholder="quantidade de pomos" v-model="Qntd_pomos">
                <label for="qntd-pomos">Quantos Pomos fez:</label>
                <input required type="number" name="qntd-pomos" placeholder="quantidade de pomos" v-model="Qntd_pomos_feitos">
                <button type="submit">enviar</button>
            </form>
        </div>
    </div>
    
</template>
<style scoped>


    .forms {
        position: absolute;
        right: 0;
        top: 0;
        height: 100vh;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
    }
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