<script>
import axios from 'axios';
export default {
    data() {
        return {
            Pomo: '',
            descricao: '',
            Qntd_pomos: 0,
        }
    },
    methods: {
        async postData(){
            this.Qntd_pomos = Number(this.Qntd_pomos);
            try{
                await axios.post('http://localhost:8000/api/pom/send', {
                Pomo: this.Pomo,
                descricao: this.descricao,
                Qntd_pomos: this.Qntd_pomos,
            })     
            } catch(e) {
                console.log('erro: ', e);
            }
            
        }
    }
}
</script>
<template>
    <div class="forms">
        <form v-on:submit.prevent="postData">
            <input required placeholder="insira a tarefa" v-model="Pomo" type="text" name="" id="">
            <input placeholder="insira uma descrição para a tarefa" type="text" v-model="descricao" name="" id="">
            <input required type="number" name="" placeholder="quantidade de pomos" v-model="Qntd_pomos" id="">
            <button type="submit">enviar</button>
        </form>
    </div>
</template>
<style scoped>

    form {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    form input {
        padding: 10px;
        width: fit-content;
        border: none;
        outline: none;
    }

</style>