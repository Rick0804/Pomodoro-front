<script>
import PomodoroTimer from './PomodoroTimer.vue';
export default {
    name: 'HomePage',
    components: {
        PomodoroTimer
    }
}
</script>
<template>
    <div>
        <section id="pomodoro">
            <PomodoroTimer />
            
        </section>
    </div>
</template>

<style></style>
