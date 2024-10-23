<script>
import { nextTick, toRefs } from 'vue';
import { api } from '../store/api';

export default {
    setup(){
        const getList = api();
        const {listTask, deleteData, selectedTask, getTasks} = toRefs(getList)
        return {
            listTask,
            deleteData,
            selectedTask,
            getTasks
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
        },
        async firstResultSelectedTask(){
            try {
                this.selectedTask = this.listTask[0].id
            } catch (e) {
            }
        },
        setSelectedTask(e){
            this.selectedTask = e.target.value;
            this.$emit('changeInputTaskUpdate')
        }
    },
    mounted() {
        nextTick(async () => {
            await this.getTasks().then(() => this.firstResultSelectedTask())
        })
    }
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
                <li @click="taskSelected(pomos.id)" v-for="pomos in listTask" class="pomo-task" :class="pomos.id === selectedTask ? 'selectedTask' : null" v-bind:class="pomos.Qntd_pomos <= pomos.Qntd_pomos_feitos ? 'completed' : null">
                    <div class="title-task">
                        <p>Pomo: {{ pomos.Pomo }}</p>
                    </div> 
                    <div v-if="pomos.descricao !== null" class="description">
                        <label for="">Descrição: </label>{{ pomos.descricao }} 
                    </div>
                    <div class="pomos-done">
                        <label for="">Pomos: </label>{{ pomos.Qntd_pomos_feitos }}/{{ pomos.Qntd_pomos }}
                    </div>
                    <div class="edita-pomos">
                        <button @click="setSelectedTask" v-bind:value="pomos.id">Editar pomo</button>
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

.completed {
    border-right: green solid 10px;
}

.upper{
    display: flex;
    flex-direction: column;
    align-items: end;
    gap: 10px;
    margin-bottom: 10px;
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