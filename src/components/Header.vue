<script>
import Options from './Options.vue'
import { toRefs } from 'vue';
import { timers } from '../store/store';
export default {
    name: 'Header',
    setup(){
        const timer = timers();
        const {statusTimer} = toRefs(timer)
        return {
            statusTimer
        }
    },
    components: {
        Options,
    }
}
</script>

<template>
    <header>
        <div class="elements">
            <h1>Pomodoro</h1>
            <nav>
                <button @click="this.$emit('changeOptions')" class="opcao">Opções</button>
            </nav>
        </div>
    </header>
</template>

<style>

.elements {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 32px 52px 22px 52px;
}

header::after{
    content: '';
    height: 2px;
    width: 95%;
    background-color: white;
    display: block;
    margin: 0 auto;
}

nav {
    display: flex;
    gap: 56px;
    height: fit-content;
}

.opcao {
    background: #D9D9D9;
    border-radius: 40px;
    padding: 7px 16px;
    font-size: 30px;
    color: #1B1A1A;
    border: none;
    cursor: pointer;

}

h1 {
    font-size: 60px;
    font-weight: 400;
    color: white;
}

/* tema claro */
</style>