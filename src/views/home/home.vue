<template>
  <div class="home">
    <div @click="clickMe">data:{{data}}</div>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  data() {
    return {
      data: 123
    };
  },
  mounted() {
    //   ajax
  },
  methods: {
    clickMe() {
      this.$router.push("/login");
    }
  }
};
</script>

<style lang="scss">
@import "./home";
</style>