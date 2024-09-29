<script>
export default {
    nome: 'PomodoroTimer',
    data() {
        return {
            timeInSeconds: null,
            statusTimer: false,
            statusPomo: false,
            minute: null,
            second: null,
            timer: null,
        }
        /*
            criar uma função única para o modo de descanço,
            o modo de descanço vai ser acionado quando o timer do pomo atingir zero ou ser pulado
        */
    },
    methods: {
        cronometer(timer) {
            this.timeInSeconds = timer * 60000
            this.timer = setInterval(() => {
                console.log(this.timeInSeconds)
                let time = new Date(this.timeInSeconds);
                this.minute = time.getMinutes();
                this.second = time.getSeconds();
                console.log(this.second)
                console.log(time)
                this.timeInSeconds -= 1000
            }, 1000)
        },
        status() {
            this.statusTimer = !this.statusTimer;
            if (this.statusTimer) {
                this.statusPomo = true;
            } else {
                this.statusPomo = false;
            }
        },
        pular() {
            this.cronometer(5);
            setTimeout(() => {
                clearInterval(this.time)
            }, 0)
            this.statusTimer = false;
            this.statusPomo = false;
        }
    },
    watch: {
        statusTimer() {
            if (this.statusTimer) {
               if(this.timeInSeconds === null) this.timeInSeconds = 30;
               if(this.timeInSeconds > 1000) this.timeInSeconds /= 60000
                this.cronometer(this.timeInSeconds)
            } else {
                console.log("aqui")
                setTimeout(() => {
                    clearInterval(this.timer)
                    console.log("Parou")
                }, 0)
            }
        }
    }
}
</script>
<template>
    <section class="pomodoro-timer">
        <div class="title">
            <h2>POMODORO</h2>
        </div>
        <div class="timer-manager">
            <div class="timer">
                <!--lógica do timer-->
                <div v-if="!(second === null)">
                    <p>{{ minute < 10 ? '0' + minute : minute }}:{{ second < 10 ? '0' + second : second }}</p>
                </div>
                <div v-else>
                    <p>00:00</p>
                </div>
            </div>
            <div class="status-timer">
                <button @click="status">{{ !this.statusTimer ? 'iniciar' : 'parar' }}</button>
                <button v-if="statusPomo" @click="pular">Pular</button>
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
</style>