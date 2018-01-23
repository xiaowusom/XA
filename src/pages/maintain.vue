<template>
  <div class="header">
      <h1 class="h1">我是首页</h1>
      <Button type="primary" shape="circle" :long="true" class="btn"><router-link to="/test1">去往test1</router-link></Button>
      <Button type="primary" shape="circle" :long="true" class="btn"><router-link to="/test2">去往test2</router-link></Button>
      

  </div>
</template>

<script>
  export default {
    data(){
      return {
          isAndroid: false,
          isiOS: false,
      }
    },
    mounted(){
     
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
     background: #fff;
    font-size: 0.16rem;
    .h1{
      color: red;
      font-size:0.46rem;
    }
  }

</style>
