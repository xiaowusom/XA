<template>
  <div class="bigDiv">
   <topTitle></topTitle>
    <div class="input">
      <input type="text" placeholder="请输入工单编号" v-model="workCode">
    </div>
   <!-- df-->
    <div class="next_btn" @click="handleSubmit()">
        <Button type="primary" shape="circle" :long="true">确定</Button>
    </div>
  </div>
</template>

<script>
import topTitle from '@/components/topTitle'
import { MessageBox } from 'mint-ui'
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
        if(this.workCode!=''){
        	var url = "ssh/SysWarning/getWarningByCode";
					this.$post(url,{code:this.workCode})
		    	.then(res => {
		    		//console.log(res)
						if(res.errorCode == 200){
							this.$router.push({path:"/cancelReport", query: {workCode:this.workCode}})
						}else{
							MessageBox.alert("未查询到该订单号的信息", "提示");
						}
		    	},(err) =>{
		    		console.log(err)
		    	})
        }else{
        		MessageBox.alert("请输入订单号", "提示");
        }
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
