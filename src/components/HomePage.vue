<script>
import PomodoroTimer from './PomodoroTimer.vue';
import InputTask from './InputTask.vue';
import TaskList from './TaskList.vue';
import UpdateTask from './UpdateTask.vue';
import { ref } from 'vue'
export default {
    name: 'HomePage',
    setup(){
        return {
            showInputTask: ref(false),
            updateForm: ref(false),
        }
    },
    components: {
        PomodoroTimer,
        TaskList,
        InputTask,
        UpdateTask
    },
    methods: {
        changeInputTask(){
            if(!this.statusTimer){
                !this.showInputTask ? this.showInputTask = true : this.showInputTask = false;
            } else {
                !this.showInputTask ? this.showInputTask = true : this.showInputTask = false;
                this.statusTimer = !this.statusTimer;
            }
        },
        changeInputTaskUpdate(){
            console.log(this.updateForm)
            if(!this.statusTimer){
                !this.updateForm ? this.updateForm = true : this.updateForm = false;
            } else {
                !this.updateForm ? this.updateForm = true : this.updateForm = false;
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
            <TaskList @changeInputTask="changeInputTask" @changeInputTaskUpdate="changeInputTaskUpdate" />
            <div ref="inputTasks" class="input-task" v-if="showInputTask">
                <InputTask @changeInputTask="changeInputTask"/>
            </div>
                <UpdateTask  v-if="updateForm" @changeInputTaskUpdate="changeInputTaskUpdate"/>
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
