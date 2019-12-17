<template>
  <section class="wrapper">
    <div @click="send">send</div>
  </section>
</template>

<script>
import Axios from "axios";
export default {
  name: "App",
  data() {
    return {
      dynamicValidateForm: {
        domains: [
          {
            value: ""
          }
        ],
        email: ""
      }
    };
  },
  methods: {
    send() {
      Axios.get("/api/cors").then(res => {
        console.log(res);
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    removeDomain(item) {
      var index = this.dynamicValidateForm.domains.indexOf(item);
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1);
      }
    },
    addDomain() {
      this.dynamicValidateForm.domains.push({
        value: "",
        key: Date.now()
      });
    }
  }
};
</script>

<style lang="scss">
@import "./common/common";
@import "./common/variable";

.wrapper {
  background: url("./assets/images/login-page-bg.jpeg") no-repeat;
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  .login-wrapper {
    z-index: 10;
    display: flex;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    width: 500px;
    height: 400px;
    padding: 6px 6px 6px 6px;
    border: 2px solid #aeddf9;
    border-radius: 20px;
    background: rgba(0, 0, 0, 0.5);
  }
}
</style>
