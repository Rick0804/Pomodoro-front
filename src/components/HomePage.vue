<script>
import PomodoroTimer from './PomodoroTimer.vue';
import TaskList from './TaskList.vue';
export default {
    name: 'HomePage',
    components: {
        PomodoroTimer,
        TaskList
    }
}
</script>
<template>
    <div>
        <section id="pomodoro">
            <PomodoroTimer />
            <TaskList />
        </section>
    </div>
</template>

<style>
#pomodoro {
    display: flex;
    justify-content: space-around;
    align-items: center;
}
</style>
