<script>
import Options from './Options.vue'

export default {
    name: 'Header',
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
                <button class="opcao">Notas</button>
                
            </nav>
        </div>
    </header>
    <div v-if="this.opcoes">
        <Options />

    </div>
</template>

<style>
/* tema escuro */

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
    border-radius: 20px;
    padding: 8px 15px;
    font-size: 20px;
    color: #1B1A1A;
    border: none;
    cursor: pointer;

}

h1 {
    font-size: 50px;
    font-weight: 400;
    color: white;
}

/* tema claro */
</style>