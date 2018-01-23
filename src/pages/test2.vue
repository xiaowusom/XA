<template>
  <div class="header">
      <Button type="primary" shape="circle" :long="true" class="btn"><router-link to="/test1">test1</router-link></Button>
      <h1 class="h1">我是test2页面啊</h1>

  </div>
</template>

<script>
  export default {
    data(){
      return {
          hand:"我是测试的哟",
          isAndroid: false,
          isiOS: false,
      }
    },
    mounted(){
      // this.setMessage();
    },
    methods:{
      go(){
        this.$router.push({ path: '/'});
      }
    }
  }

</script>
<style lang="scss" scoped>
  .header {
    /*position: fixed;*/
    height: 100%;
    z-index: 99;
    width: 100%;
     background: blue;
    font-size: 0.16rem;
    .h1{
      color: red;
      font-size:0.36rem;
    }
  }

</style>
