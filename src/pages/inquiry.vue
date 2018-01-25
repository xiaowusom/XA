<template>
  <div class="bigDiv">
   <topTitle></topTitle>
    <div class="input">
      <input type="text" placeholder="请输入工单编号" v-model="workCode">
    </div>
    <div class="next_btn" @click="handleSubmit()">
        <Button type="primary" shape="circle" :long="true">确定</Button>
    </div>
  </div>
</template>

<script>
import topTitle from '@/components/topTitle'
  export default {
    data(){
      return {
        workCode:'',
      }
    },
    mounted(){

    },
    components: {
      topTitle
    },
    methods:{
      handleSubmit(){
        //console.log(this.workCode)
        this.$router.push({path:"/cancelReport", query: {workCode:this.workCode}})
      }
    }
  }
</script>
<style lang="scss" scoped>
.bigDiv{
  height:100%;
  width:100%;
  .input{
    width: 6.5rem;
    height: 1.34rem;
    line-height: 1.34rem;
    margin: 1rem auto;
    background: #fff;
    border-radius: 0.2rem;
    padding:0 0.2rem;
    input{
      width:100%;
      height:1rem;
      text-align: center;
    }
  }
  .next_btn{
      width: 6.62rem;
      margin: 0 auto;
      Button{
        height: 0.8rem;
      }
    }
}

</style>
