<script>
import { api } from '@/store/api';
import { ref, toRefs } from 'vue';
export default {
    setup(){
        const addTask = api();
        const {postData} = toRefs(addTask); 
        const Pomo = ref('')
        const descricao = ref('')
        const Qntd_pomos = ref(1)
        return {
            postData,
            Pomo,
            descricao,
            Qntd_pomos,
            showInputTask: false
        }
    },
    methods: {
        postTask(){
            this.Qntd_pomos = Number(this.Qntd_pomos);
            if(this.Qntd_pomos > 0 && this.Pomo.trim()){
                this.postData(this.Pomo, this.descricao, this.Qntd_pomos);      
            } 
            this.clearInput()
        },
        
        clearInput(){
            this.Pomo = '';
            this.descricao = '';
            this.Qntd_pomos = 1
        }
    }
}
</script>
<template>
    <div class="forms">
        <div class="class-form">
            <button class="exit" @click="$emit('changeInputTask')"><i class="png-exit fa-solid fa-x"></i></button>
            <form v-on:submit.prevent="postTask">
                <label for="tarefa">O que quer fazer?</label>
                <input required placeholder="insira a tarefa" name="tarefa" v-model="Pomo" type="text">
                <label for="descricao">Insira uma descrição</label>
                <input placeholder="descrição (opcional)" name="descricao" type="text" v-model="descricao">
                <label for="qntd-pomos">Quantos Pomos quer fazer?</label>
                <input required type="number" name="qntd-pomos" placeholder="quantidade de pomos" v-model="Qntd_pomos">
                <button type="submit">enviar</button>
            </form>
        </div>
    </div>
    
</template>
<style scoped>

    .exit {
        width: fit-content;
        background-color: transparent;
        border: none;
        cursor: pointer;
    }
    form {
        display: flex;
        flex-direction: column;
        gap: 26px;
        margin: 0 auto;


    }
    .class-form {
        padding: 20px;
        right: 26px;
        height: 400px;
        width: 300px;
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