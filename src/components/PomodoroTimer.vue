<script>
import { nextTick, toRefs } from 'vue';
import { timers } from '../store/store.js';
import { api } from '@/store/api.js';
export default {
    nome: 'PomodoroTimer',
    setup() {
        const timer = timers();
        const getApi = api();
        const { updateData, selectedTask, search } = toRefs(getApi);
        const { secondP, minuteP, minuteB, secondB, statusTimer } = toRefs(timer)
        return {
            secondP,
            minuteP,
            secondB,
            minuteB,
            statusTimer,
            updateData,
            selectedTask,
            donePomo: null,
            search
        }
    },
    data() {
        return {
            timeInMilliSeconds: 0,
            statusTimer: false,
            statusPomo: false,
            statusBreak: false,
            minute: this.minuteP,
            second: this.secondP,
            timer: null,
            worker: new Worker(new URL('./PomodoroTimerWorker.js', import.meta.url))
        }
    },
    methods: {
        cronometer() {
            this.timeInMilliSeconds = ((this.minute * 60000) + (this.second * 1000)) - 1000
            this.worker.postMessage({ action: 'start', duration: this.timeInMilliSeconds}); //mudou aqui
            this.worker.onmessage = (event) => {
                if (event.data === 'time-up') {
                    this.changeState();
                    this.timersOut(); 
                } else {
                    let time = new Date(this.timeInMilliSeconds);
                    this.timeInMilliSeconds = event.data; 
                    this.minute = time.getMinutes();
                    this.second = time.getSeconds();
                }
            };

        },
        async timersOut() {
            const audio = new Audio("/audio/alarme.mp3");
            audio.play();
        },
        async pomos() {
            const response = await this.search(this.selectedTask)
            return response;
        },
        async getPomos() {
            await this.pomos().then((response) => { this.task = response })
        },
        start() {
            this.cronometer();
        },
        pausar() {
            this.worker.postMessage({action: 'stop'})
        },
        setMinute(minute) {
            this.minute = minute * 60000
        },
        setSecond(second) {
            this.second = second * 1000
        },
        statusCron() {
            this.statusTimer = !this.statusTimer;
            this.statusTimer ? this.statusPomo = true : this.statusPomo = false
        },
        changeState() {
            this.statusBreak = !this.statusBreak;
            if (this.statusBreak) {
                this.minute = this.minuteB;
                this.second = this.secondB;
            } else {
                this.minute = this.minuteP;
                this.second = this.secondP;
            }
            nextTick(async () => {
                await this.getPomos().then(() => {
                    if (this.statusBreak) {
                        this.updateData(this.task.Pomo, this.task.descricao, this.task.Qntd_pomos, this.task.Qntd_pomos_feitos + 1, this.task.id)
                    }
                })
            })
            this.timeInMilliSeconds = (this.minute * 60000) + (this.second * 1000)

            this.statusTimer = !this.statusTimer;
            this.statusPomo = !this.statusPomo;
        },
    },
    watch: {
        statusTimer() {
            if (this.statusTimer) {
                if (this.timeInMilliSeconds
                    > 1000) this.timeInMilliSeconds
                        /= 60000
                this.cronometer(this.timeInMilliSeconds

                )
            } else {
                this.pausar()
            }
        },
        minuteP() {
            if (!this.statusBreak) this.minute = this.minuteP;
        },
        secondP() {
            if (!this.statusBreak) this.second = this.secondP;
        },
        minuteB() {
            if (this.statusBreak) this.minute = this.minuteB;
        },
        secondB() {
            if (this.statusBreak) this.second = this.secondB;
        },


    }
}
</script>
<template>
    <section class="pomodoro-timer">
        <div class="title">
            <h2>{{ !this.statusBreak ? 'POMODORO' : 'BREAK' }}</h2>
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
                <button v-if="statusPomo" @click="changeState">PULAR</button>
            </div>
        </div>
    </section>
</template>
<style scoped>
.pomodoro-timer {
    background-color: white;
    width: 830px;
    min-height: 430px;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 44px;
    justify-content: center;
}

.title {
    width: 408px;
    height: 68.43px;
    margin-top: 20px;
    margin-bottom: 40px;
    background: #1B1A1A;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.status-timer {
    margin: 0 auto;
    display: flex;
    justify-content: center;
    gap: 20px;
}

.timer p {
    font-size: 172px;
    font-weight: 500;
    line-height: 1;
    margin-bottom: 33px;
}

h2 {
    color: white;
    font-size: 46px;
}

button {
    background: #1B1A1A;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    color: white;
    padding: 5px 30px;
}

.status-timer button { 
    padding: 14px 40px;
    font-size: 20px;
}
</style>