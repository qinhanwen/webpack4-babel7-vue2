<template>
  <div class="home">
    123
  </div>
</template>
<script>
export default {
  data() {
    return {
      key: 1
    };
  },
  props: {
    body: ''
  },
  mounted() {
    console.log(this.body);
  },
  methods: {}
};
</script>

<style lang="scss">
@import './home';
</style>
