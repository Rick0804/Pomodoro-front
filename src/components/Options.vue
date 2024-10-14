<script>
import { toRefs } from 'vue';
import { timers } from '../store/store.js';
export default {
    setup(){
        const timer = timers();
        const {secondP, minuteP, secondB, minuteB, statusTimer} = toRefs(timer)
        return {
            secondP, 
            minuteP,
            secondB,
            minuteB,
            statusTimer,
            setMinutePom: timer.setMinuteP,
            setMinuteBreak: timer.setMinuteB,
            setSecondPom: timer.setSecondP,
            setSecondBreak: timer.setSecondB,
        }
    },
    data(){
        return {
            NumberMinutePom: this.minuteP,
            NumberSecondPom: this.secondP,
            NumberMinuteBreak: this.minuteB,
            NumberSecondBreak: this.secondB,
        }
    },
    methods: {
        setPomTimer(e){
            this.NumberMinutePom = Number(e.target[0].value);
            this.NumberSecondPom = Number(e.target[1].value);
            if(this.NumberMinutePom < 60 && this.NumberMinutePom >= 0  || this.NumberSecondPom < 60 && this.NumberSecondPom >= 10){
                this.setMinutePom(this.NumberMinutePom);
                this.setSecondPom(this.NumberSecondPom);
                this.NumberMinutePom = '';
                this.NumberSecondPom = '';
            }
        },
        setBreakTimer(e){
            this.NumberMinuteBreak = Number(e.target[0].value);
            this.NumberSecondBreak = Number(e.target[1].value);
            if(this.NumberMinuteBreak < 60 && this.NumberMinuteBreak >= 0 || this.NumberSecondBreak < 60 && this.NumberMinuteBreak >= 0){
                this.setMinuteBreak(this.NumberMinuteBreak);
                this.setSecondBreak(this.NumberSecondBreak);
                this.NumberMinuteBreak = '';
                this.NumberSecondBreak = '';
            }
        }
    }
}
</script>
<template>
    <div class="opcoes">
        <div class="title-options">
            <p>Configurações</p>
            <div class="exit">
                <button @click="$emit('changeOptions')">X</button>
            </div>
        </div> 
        <form class="pomos" v-on:submit.prevent="setPomTimer">
            <div class="title"><p>Pomodoro</p></div>
            <input type="number" placeholder="Defini Minutos" v-bind:value="NumberMinutePom">
            <input type="number" placeholder="Defini Segundos" v-bind:value="NumberSecondPom">
            <button>enviar</button>
        </form>
        <form class="break" v-on:submit.prevent="setBreakTimer">
            <div class="title"><p>Descanço</p></div>
            <input type="number" placeholder="Defini Minutos" v-bind:value="NumberMinuteBreak">
            <input type="number" placeholder="Defini Segundos" v-bind:value="NumberSecondBreak">
            <button>enviar</button>
        </form>
    </div>
</template>
<style scoped>

.exit button {
    background: #1B1A1A;
    border-radius: 20px;
    color: white;
    padding: 5px 10px;
}

.title-options {
    padding: 11px 14px;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.title-options::after {
    content: "";
    display: block;
    width: 100%;
    height: 2px;
    background-color: #cbcbcb;
    margin-top: 10px;
}

.opcoes {
    width: 500px;
    height: 68vh;
    padding-bottom: 22px;
    justify-content: space-around;
    background-color: white;
    position: absolute;
    display: flex;
    flex-direction: column;
    border: #1B1A1A;
    border-radius: 20px;
    top: 48%;
    left: 50%;
    transform: translate(-50%, -50%);}

.title {
    color: white;
    background-color: #1B1A1A;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
}

.opcoes input {
    color: black;
    outline: none;
    border: black 1px solid;
}

.exit {
    height: fit-content;
    position: absolute;
    right: 18px;
    top: 26px;
}

.break, .pomos {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 10px;
}

button {
    background: #1B1A1A;
    border-radius: 20px;
    color: white;
    padding: 5px 10px;
}

.title {
    padding: 15px 20px;
    background: #1B1A1A;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
}

</style>