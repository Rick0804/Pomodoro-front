<script>
import axios from 'axios';

export default {
    data (){
        return {
            pomosList: null,
        }
    },

    methods: {
        async getTasks(){
                const response = await axios.get('http://localhost:8000/api/pom/pomos-list');
                this.pomosList = response.data;
        }
    },
    mounted() {
        this.getTasks()
        setInterval(() => {
            this.getTasks()
        }, 5000)
    }
}
</script>
<template>
    <div class="task-list">
        <div class="title">Lista de Tarefas</div>
        <div class="lists">
            <ul class="list">
                <li v-for="pomos in pomosList" class="pomo-task">
                    <div class="title-task">
                        <p>{{ pomos.Pomo }}</p>
                    </div> 
                    <div class="description">
                        <label for="">Descrição: </label>{{ pomos.descricao }} 
                    </div>
                    <div class="pomos-done">
                        <label for="">Pomos: </label>{{ pomos.Qntd_pomos_feitos }}/{{ pomos.Qntd_pomos }}
                    </div>
                    <div class="edita-pomos">
                        <button>editar pomo</button>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<style scoped>

.title {
    color: white;
    text-align: right;
}

.lists {
    background-color: white;
    width: 255px;
    height: 294px;
    padding-left: 20px;
    padding-top: 10px;
    border-radius: 20px;
    overflow-y: auto;
}

.list {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

::-webkit-scrollbar {
    width: 0;
}

.pomo-task {

}

</style>