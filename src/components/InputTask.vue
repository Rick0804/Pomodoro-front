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
        <form v-on:submit.prevent="postTask">
            <input required placeholder="insira a tarefa" v-model="Pomo" type="text">
            <input placeholder="insira uma descrição para a tarefa" type="text" v-model="descricao" name="" id="">
            <input required type="number" name="" placeholder="quantidade de pomos" v-model="Qntd_pomos" id="">
            <button type="submit">enviar</button>
        </form>
    </div>
</template>
<style scoped>

    .forms {
       display: flex;
       justify-content: flex-end;
       
       
    }

    form {
        padding: 20px;
        right: 26px;
        width: fit-content;
        border-radius: 4px;
        display: flex;
        background-color: white;
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