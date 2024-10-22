<script>
import { toRefs } from 'vue';
import { api } from '../store/api';

export default {
    setup(){
        const getList = api();
        getList.getTasks()
        const {listTask, deleteData, selectedTask} = toRefs(getList)
        return {
            listTask,
            deleteData,
            selectedTask
        }
    },
    methods: {
        apagarPomo(e){
            const areYouSure = confirm("Deseja realmente deletar essa tarefa?");
            if(areYouSure){
                this.deleteData(e.target.value)
            }
        },
        taskSelected(id){
            this.selectedTask = id;
        }
    },
    
    watch: {
        selectedTask(){
            console.log(this.selectedTask)
        }
    },
} 
</script>
<template>
    <div class="task-list">
        <div class="upper">
            <div class="title">Lista de Tarefas</div>
            <button @click="$emit('changeInputTask')" class="button-add">Adicionar Tarefa</button>
        </div>
        <div class="lists">
            <ul class="list">
                <li @click="taskSelected(pomos.id)" v-for="pomos in listTask" class="pomo-task" :class="pomos.id === selectedTask ? 'selectedTask' : null">
                    <div class="title-task">
                        <p>{{ pomos.Pomo }}</p>
                    </div> 
                    <div v-if="pomos.descricao !== null" class="description">
                        <label for="">Descrição: </label>{{ pomos.descricao }} 
                    </div>
                    <div class="pomos-done">
                        <label for="">Pomos: </label>{{ pomos.Qntd_pomos_feitos }}/{{ pomos.Qntd_pomos }}
                    </div>
                    <div class="edita-pomos">
                        <button @click="editarPomo" v-bind:value="pomos.id">Editar pomo</button>
                        <button @click="apagarPomo" v-bind:value="pomos.id">Apagar Pomo</button>
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

.pomo-task {
    padding: 10px 20px;
    border-radius: 20px;
}

.lists {
    background-color: white;
    width: 255px;
    height: 294px;
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

.button-add {
    background: white;
    border-radius: 20px;
    color: #1B1A1A;
    padding: 5px 10px;
    text-align: center;
    display: flex;
    justify-content: center;
}

.selectedTask {
    background-color: rgba(0, 0, 0, 0.158);
}

</style>