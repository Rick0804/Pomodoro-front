<script>
import { timers } from './store/store';
import { toRefs } from 'vue';
import Header from './components/Header.vue';
import HomePage from './components/HomePage.vue';
import Options from './components/Options.vue';
export default {
  setup(){
        const timer = timers();
        const {statusTimer} = toRefs(timer)
        return {
            statusTimer,
        }
  },
  components: {
    Header,
    HomePage,
    Options,
  },
  data (){
    return {
      showOptions: false,
      minute: 30,
      second: 0,
    }
  },
  methods: {
    changeOptions(){
      if(!this.statusTimer){
        !this.showOptions ? this.showOptions = true : this.showOptions = false;
      } else {
        !this.showOptions ? this.showOptions = true : this.showOptions = false;
        this.statusTimer = !this.statusTimer;
      }
    },
    
    exitClick(e) {
      const externClick = this.$refs.opcoes;
      try {
        if (this.showOptions && !externClick.contains(e.target) && e.target.className !== 'opcao'){
          this.changeOptions();
        }
      } catch(e){

      }
    }
  },
  watch: {
    statusTimer(){
      if(this.statusTimer){
        if(this.showOptions){
          this.showOptions = false
        }
      } 
    }
  }
  
}
</script>

<template>
  <div @click="exitClick" class="pomodoro">
    <Header @changeOptions="changeOptions"/>
    <HomePage />
    <div v-if="showOptions" ref="opcoes">
      <Options @changeOptions="changeOptions" /> 
    </div>
  </div>
  

</template>

<style>
.pomodoro {
  margin: 0 auto;
}
</style>
