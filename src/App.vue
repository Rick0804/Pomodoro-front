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
            statusTimer
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
  <div class="teste">
    <Header @changeOptions="changeOptions"/>
    <HomePage />
    <div v-if="showOptions" class="options">
      <Options @changeOptions="changeOptions" />
    </div>
  </div>
  

</template>

<style>

</style>
