<template>
  <div class="bigDiv">
   <topTitle></topTitle>
    <div class="input">
      <input type="text" placeholder="请输入工单编号" v-model="workCode" autofocus>
    </div>
   <!-- df-->
    <div class="next_btn" @click="handleSubmit()">
        <button>确定</button>
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
						if(res.result != null){
							this.$router.push({path:"/cancelReport", query: {workCode:this.workCode}})
						}else{
							MessageBox.alert("未查询到该订单号的信息", "提示");
						}
		    	},(err) =>{
		    		console.log(err)
            alert("err"+err)
		    	})
        }else{
        		MessageBox.alert("请输入订单号", "提示");
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
@import 'src/style/mixin';
.bigDiv{
  height:100%;
  width:100%;
  .input{
    width: 6.5rem;
    height: 1.34rem;
    line-height:normal;
    margin: 1rem auto;
    background: #fff;
    border-radius: 0.2rem;
    padding:0.15rem 0.2rem;
    input{
      width:100%;
      height:1rem;
      text-align: center;
    }
  }
  .next_btn{
      width: 6.62rem;
      margin: 0 auto;
      button{
        height: 0.8rem;
        @include comfirmBtn;
      }
    }
}

</style>
