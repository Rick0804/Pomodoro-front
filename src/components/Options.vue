<script>
import {timers} from '../store/store.js'
export default {
    setup(){
        const timer = timers();
        return {
            minute: timer.minute,
            seconds: timer.second,
            setMinute: (values) => timer.setMinute(values) 
        }
    },
    data(){
        return {
            number: 0,
        }
    },
    methods: {
        exibirMinutos(){
            this.number = Number(this.number);
            this.setMinute(this.number)
            console.log(this.minute)
        }
    }
}
</script>
<template>
    <div class="opcoes">
        <button @click="this.$emit('changeOptions')">X</button>
        <input type="number" v-model="number">
        <button @click="exibirMinutos">enviar</button>
    </div>
</template>
<style>

.opcoes {
    width: 500px;
    height: 84vh;
    background-color: white;
    position: absolute;
}

</style>