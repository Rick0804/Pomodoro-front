<script>
import PomodoroTimer from './PomodoroTimer.vue';
import InputTask from './InputTask.vue';
import TaskList from './TaskList.vue';
import { ref } from 'vue'
export default {
    name: 'HomePage',
    setup(){
        return {
            showInputTask: ref(false)
        }
    },
    components: {
        PomodoroTimer,
        TaskList,
        InputTask
    },
    methods: {
        changeInputTask(){
            if(!this.statusTimer){
                !this.showInputTask ? this.showInputTask = true : this.showInputTask = false;
                console.log(this.showInputTask)
            } else {
                !this.showInputTask ? this.showInputTask = true : this.showInputTask = false;
                this.statusTimer = !this.statusTimer;
            }
        },
        exitClick(e){
            const teste = this.$refs.inputTasks;
            try {
                if(this.showInputTask && !teste.contains(e.target) && e.target.className !== 'button-add'){
                    this.changeInputTask()
                }
            } catch(e){

            }
        }
    },
   
}
</script>
<template>
    <div @click="exitClick">
        <section id="pomodoro">
            <PomodoroTimer />
            <TaskList @changeInputTask="changeInputTask" />
            <div ref="inputTasks" class="input-task" v-if="showInputTask">
                <InputTask @changeInputTask="changeInputTask" />
            </div>
        </section>
    </div>
</template>

<style>
#pomodoro {
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.input-task {
    position: absolute;
}
</style>
