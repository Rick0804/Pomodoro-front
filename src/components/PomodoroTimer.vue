<script>
import { toRefs } from 'vue';
import { timers } from '../store/store.js';
export default {
   nome: 'PomodoroTimer',
   setup(){
        const timer = timers();
        const {secondP, minuteP, minuteB, secondB, statusTimer} = toRefs(timer)
        return {
            secondP,
            minuteP,
            secondB,
            minuteB,
            statusTimer
        }
    },
    data() {
        return {
            timeInSeconds: 0,
            statusPomo: false,
            statusBreak: false,
            minute: this.minuteP,
            second: this.secondP,
            timer: null,
        }
        /*
            criar uma função única para o modo de descanço,
            o modo de descanço vai ser acionado quando o timer do pomo atingir zero ou ser pulado
        */
    },
    methods: {
        cronometer() {
            this.timeInSeconds = (this.minute * 60000) + (this.second * 1000)
            this.timer = setInterval(() => {  
                console.log(this.timeInSeconds)
                this.timeInSeconds -= 1000
                let time = new Date(this.timeInSeconds);
                this.minute = time.getMinutes();
                this.second = time.getSeconds();
                if(this.second === 0 && this.minute === 0){
                    this.changeState()
                }
            }, 1000)
        },
        pausar(){
            setTimeout(() => {
                clearInterval(this.timer)
            }, 0)
        },
        setMinute(minute){
            this.minute = minute * 60000
        },
        setSecond(second){
            this.second = second * 1000
        },
        statusCron() {
            this.statusTimer = !this.statusTimer;
            this.statusTimer ? this.statusPomo = true : this.statusPomo = false
        },
        changeState() {
            this.statusBreak = !this.statusBreak;
            if(this.statusBreak){
                this.minute = this.minuteB;
                this.second = this.secondB;
            } else {
                this.minute = this.minuteP;
                this.second = this.secondP;  
            }
            this.statusTimer = !this.statusTimer;
            this.statusPomo = !this.statusPomo;
        },
    },
    watch: {
        statusTimer() {
            if (this.statusTimer) {
                if(this.timeInSeconds > 1000) this.timeInSeconds /= 60000
                this.cronometer(this.timeInSeconds)
            } else {
                this.pausar()
            }
        },
        minuteP(){
            if(!this.statusBreak) this.minute = this.minuteP;  
        },
        secondP(){
            if(!this.statusBreak) this.second = this.secondP;
        },
        minuteB(){
           if (this.statusBreak) this.minute = this.minuteB;  
        },
        secondB(){
           if (this.statusBreak) this.second = this.secondB;
        },
        

    }
}
</script>
<template>
    <section class="pomodoro-timer">
        <div class="title">
            <h2 >{{!this.statusBreak ? 'POMODORO' : 'BREAK'}}</h2>
        </div>
        <div class="timer-manager">
            <div class="timer">
                <!--lógica do timer-->
                <div v-if="!(second === null)">
                    <p>{{ minute < 10 ? '0' + minute : minute }}:{{ second < 10 ? '0' + second : second }}</p>
                </div>
                <div v-else>
                    <p>30:00</p>
                </div>
            </div>
            <div class="status-timer">
                <button @click="statusCron">{{ !this.statusTimer ? 'INICIAR' : 'PARAR' }}</button>
                <button v-if="statusTimer" @click="changeState">PULAR</button>
            </div>
        </div>
    </section>
</template>
<style scoped>
.pomodoro-timer {
    background-color: white;
    width: 638px;
    height: 345px;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;

}

.title {
    width: 408px;
    height: 68.43px;
    background: #1B1A1A;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;

}

h2 {
    color: white;
}

button {
    
}
</style>