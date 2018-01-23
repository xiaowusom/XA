<template>
  <div id="app" v-if="parameter">
    <transition :name="viewDirection">
    <!-- <transition name="go"> -->
      <router-view/>
    </transition>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { getStore, saveStore } from '@/script/util'
export default {
	name: 'app',
	data() {
		return {
			parameter: true,
      transitionName: 'go',
		}
	},
	computed: {
		...mapState(['projectInital', 'viewDirection']),
	},
	created(){
	    //this.getAppData(); 根据项目需要开启
	    this.setTitle();
	},
  mounted(){
    
  },
	methods: {
    setTitle(){
      var title = this.$route.meta.title;
      document.setTitle(title);
    },
    //判断请求是否带参数，参数是否正确
		getAppData(){
			if(this.$route.path != '/twoDimension'){
				if(this.$route.query.userName&&this.$route.query.projectCode&&this.$route.query.granterPhone){
					saveStore('userName', this.$route.query.userName);
					saveStore('projectCode', this.$route.query.projectCode);
					saveStore('granterPhone', this.$route.query.granterPhone);
				}else{
					if(!(getStore('userName')&&getStore('projectCode')&&getStore('granterPhone'))){
						this.parameter = false;
						alert('参数无效');
					}
				}
			}
		},
	},
	watch: {
		viewDirection: function() {
       //console.log(this.viewDirection);
		},
	},
}
</script>

<style lang="scss">
 @import './style/common';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
/*// 卡片动画属性*/
//
/* 开始过渡阶段,动画出去阶段 */
.left-enter-active,.back-leave-active{
  transition: all 0.3s ease-out;
}
/* 进入开始 */
.left-enter{
  transform: translateX(-8rem);
  opacity: 0.3;
}
/* 出去终点 */
.left-leave-active{
  transform: translateX(-8rem);
  opacity: 0.3;
}

.right-enter-active,.go-leave-active{
  transition: all 0.3s ease-out;
}
/* 进入开始 */
.right-enter{
  transform: translateX(8rem);
  opacity: 0.3;
}
/* 出去终点 */
.right-leave-active{
  transform: translateX(8rem);
  opacity: 0.3;
}


</style>
