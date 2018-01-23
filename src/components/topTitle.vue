<template>
  <div class="header">
    <span class="left" @click="back" v-if="maintain"></span>
    <span class="center">{{title}}</span>
    <span class="right" @click="go" v-if='Inquiry'>查询</span>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        Inquiry:true,
        title:'',
        maintain:true,
      }
    },
    mounted(){
       this.isInquiry();
    },
    methods:{
      go(){
        this.$router.push({ path: '/inquiry'});
      },
      back(){
        this.$router.go(-1);
      },
      isInquiry(){
        this.title = this.$route.meta.title;
        if(this.title=='报事查询'){
           this.Inquiry=false;         
        }
        if(this.title=='报事报修'){
           this.maintain = false
        }
      }
    }
  }

</script>
<style lang="scss" scoped>
  .header {
    position: relative;
    background: #fff;
    width: 100%;
    height: 0.74rem;
    line-height:  0.74rem;
    text-align: center;
    padding: 0 0.2rem;
    .right{
      float: right;
    }
    .right:active{
      color: red;
    }
    .center{
      position: absolute;
      left: 42%;
    }
    .left{
      float:left;
      display: inline-block;
      width:0.74rem;
      height:0.74rem;
      background-image: url(../images/back.png);
      background-size: 100% 100%;
    }
  }

</style>
