<script>
import Header from './components/Header.vue';
import HomePage from './components/HomePage.vue';
import Options from './components/Options.vue';
export default {
  components: {
    Header,
    HomePage,
    Options,
  },
  data (){
    return {
      showOptions: false,
    }
  },
  methods: {
    changeOptions(){
      console.log("teste options")
      this.showOptions = !this.showOptions
    }
  },
  watch: {
    showOptions(){
      console.log(this.showOptions)
    }
  }
}
</script>

<template>
  <Header @changeOptions="changeOptions"/>
  <HomePage />
  <div v-if="showOptions" class="opcoes">
    <Options  @changeOptions="changeOptions" />
  </div>

</template>

<style>
</style>
