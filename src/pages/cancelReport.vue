<template>
	<div>
		<div class="content" >
			<!-- 遮罩 -->
			<div class="fade" v-if="fadeIn">
				<div class="fade_box">
					<div class="title">
						<span class="valite">手机验证</span>
						<input type="text" v-model="photoNumber" class="input">
						<span class="time">{{time}}s</span>
						<button :class="isA ? 'blue_color' : 'git_code'" @click="getCode">获取验证码</button>
					</div>

					<p class="info">验证通过后订单将会被取消</p>
					<div class="btn">
						<div class="cancel" @click="cancel">取消</div>
						<div class="sure" @click="sure">确定</div>
					</div>
				</div>
			</div>
			<!-- 放大图片 -->
			<div class="fade" v-if="hidden" @click="hidePicture">
				<div class="fadePicture">
					<img :src="newUrl" >
				</div>
			</div>
			<topTitle></topTitle>
			<div class="box">


				<p class="remark">{{value.remarks}}</span>
				</p>
				<div class="picture_box">
					<div class="picture_list" v-for="(item,index) in picture" >
						<img :src="item" @click=showPicture(index)>
					</div>
					<!-- <div class="picture_list" v-for="item in picture" >
						<img :src="item">问问
					</div> 是多少-->
				</div>
				<ul class="info_list">
					<li>
						<div class="list_1">
							<span>联系人:</span>
						</div>
						<div class="list_2">
							<span>{{value.peopleName ==''?"无":value.peopleName}}</span>
						</div>
					</li>
					<li>
						<div class="list_1">
							<span>联系电话:</span>
						</div>
						<div class="list_2">
							<span>{{value.reportPhone==''?"无":value.reportPhone}}</span>
						</div>
					</li>
					<li>
						<div class="list_1">
							<span>报事地址:</span>
						</div>
						<div class="list_2 large_content">
							<span>{{value.address}}</span>
						</div>
					</li>
				</ul>
			</div>
			<div class="handel_box">
				<ul class="info_list">
					<li>
						<div class="list_1">
							<span>工单编号:</span>
						</div>
						<div class="list_2">
							<span>{{code}}</span>
						</div>
					</li>
					<li>
						<div class="list_1">
							<span>工单状态:</span>
						</div>
						<div class="list_2">
							<span>{{value.status == 1?"未受理":"已处理"}}</span>
						</div>
					</li>
					<li>
						<div class="list_1">
							<span>下单时间:</span>
						</div>
						<div class="list_2">
							<span>{{value.createTime|formatDate}}</span>
						</div>
					</li>
				</ul>
			</div>
			<div class="next_btn" @click="handleSubmit()">
		      <button>取消工单</button>
		    </div>
		</div>

	</div>
</template>
<script>
import topTitle from '@/components/topTitle'
import { formatDate } from '@/script/date.js'
import { MessageBox } from 'mint-ui'
	export default {
		data() {
			return {
				value:'',
				picture:[],
				photoNumber:'',
				fadeIn:false,
				time:60,
				phone:null,
				isA:false,
				code:'',
				hidden:false,
				newUrl:'',
				num:1,
			}
		},
		mounted() {
			this.getData();
		},
		components: {
	      topTitle
	    },
		methods: {
      replaceJump() {
        var currentURL = window.location.href
        var end = currentURL.indexOf(this.$route.path)
        var replaceURL = currentURL.slice(0, end) + '/'
        window.location.replace(replaceURL)
      },
			getData(){
				var code = this.$route.query.workCode
				var url = 'ssh/SysWarning/getWarningByCode'
		        this.$post(url,{code:code})
		        .then(res => {
						this.value = res.result;
						this.phone = res.result.reportPhone;
						this.code = res.result.code;
						var str = res.result.image;
						var strs = new Array();
						if(str&&str.length !=0){
							strs = str.split(",")
						}
						this.picture = strs;
		        },(err) => {
		        	console.log(err)
		        })
		    },
		    handleSubmit(){
		    	if(this.value.reportPhone!=''){
		    		if(this.num == 1){
			    		this.fadeIn = true;
				    	this.setTime();
				    	this.getPone();
				    	this.num = 2;
			    	}else{
			    		this.fadeIn = true;
			    	}
		    	}else{
		    		var url = "ssh/SysWarning/cancelWarning";
					this.$post(url,{code:this.code})
			    	.then(res => {
			    		//console.log(res)
						if(res.errorCode == 200){
							MessageBox.alert("取消报事成功", "提示").then(action => {
                this.replaceJump()
							});
						}else{
							MessageBox.alert("取消报事失败", "提示");
						}
			    	},(err) =>{
			    		console.log(err)
			    	})
		    	}
		    },
		    cancel(){
		    	this.fadeIn = false;
		    },
		    showPicture(index){

		    	this.hidden = true;
		    	//console.log(this.picture[index]);
				this.newUrl = this.picture[index]
		    },
		    hidePicture(){
				this.hidden = false;
		    },
		    sure(){
		    	if(this.photoNumber!=''){
		    		this.cancelReport()
		    	}else{
		    		MessageBox.alert("请输入验证码", "提示");
		    	}

		    },
		    cancelReport(){
		    	var url = "ssh/SysWarning/cancelWarning";
				this.$post(url,{code:this.code,verifyCode:this.photoNumber})
		    	.then(res => {
		    		//console.log(res)
					if(res.errorCode == 200){
						MessageBox.alert("取消报事成功", "提示").then(action => {
                this.replaceJump()
						});
					}else{
						MessageBox.alert("取消报事失败", "提示");
					}
		    	},(err) =>{
		    		console.log(err)
		    	})
		    },
		    getPone(){
		    	var url = "ssh/v1/appBase/register/getVerificatCode";
		    	this.$post(url,{telephone:this.phone})
		    	.then(res => {
		    		//console.log(res)
					if(res.errorCode == 200){
						MessageBox.alert("短信已发送到您的手机，请注意查收", "提示");
					}else{
						MessageBox.alert("短信已发送失败，请联系工作人员解决", "提示");
					}
		    	},(err) =>{
		    		console.log(err)
		    	})
		    },
		    setTime(){
		    	var _this = this;
		    	var Time = setInterval(function(){
					_this.time--;
					if(_this.time === 0){
			    		clearInterval(Time);
			    		_this.time = 60;
			    		_this.isA = true;
			    	}
		    	},1000)

		    },
		    getCode(){
				var _this = this;
				if(this.isA ){
					_this.getPone();
					this.setTime();
				}
		    }
		},
		filters: {
	        formatDate(time) {
	            var date = new Date(time);
	            return formatDate(date, 'yyyy-MM-dd hh:mm');
	        }
	   },

	}
</script>
<style lang="scss" scoped>
@import 'src/style/mixin';
	.content{
		width: 100%;
		height: 100%;
		overflow: hidden;
		background:#EFf2f5;
		box-sizing: border-box;
		.box{
			width: 100%;
			// height: 4.25rem;
			margin-top:0.15rem;
			background:#FFF;
			box-shadow: 0 0.05rem 0 rgba(220,220,220,0.6);
			padding-top: 0.23rem;
			.remark{
				width: 6.9rem;
				min-height: 0.71rem;
				border: 0.01rem solid #d2d2d2;
				margin: 0 auto;
				text-align:left;
				padding-left: 0.15rem;
				display: flex;
				align-items:center;
			}
			.picture_box{
				display: flex;
				width: 6.9rem;
				height: 1.05rem;
				margin:0 auto;
				margin-top: 0.15rem;
				.center_list{
					margin:0 0.45rem;
				}
				.picture_list{
					width: 2rem;
					height: 1.05rem;
					border: 0.01rem dashed #d2d2d2;
					display: inline-block;
					display:flex;
					justify-content:center;
					align-items:center;
					margin-right:0.45rem;
					img{
						width: 1rem;
						height: 0.8rem;
					}
				}
			}
			.info_list{
				width: 6.9rem;
				height: 2.11rem;
				margin:0 auto;

			}
			.info_list>li{
				list-style: none;
				height: 0.7rem;
				line-height: 0.7rem;
				.list_1{
					width: 25%;
					float: left;
					height: 0.7rem;
					text-align: left;
					padding-left: 0.15rem;
				}
				.list_2{
					height: 0.7rem;
					float: left;
					width: 75%;
					text-align:right;
					padding-right: 0.15rem;
          overflow: auto;
				}
			}

		}
		.handel_box{
			width: 100%;
			height: 2.11rem;
			margin:0 auto;
			background:#FFF;
			margin-top:0.5rem;
			.info_list>li{
				list-style: none;
				height: 0.7rem;
				line-height: 0.7rem;
				padding:0 0.5rem;
				.list_1{
					width: 25%;
					float: left;
					height: 0.7rem;
					text-align: left;
				}
				.list_2{
					height: 0.7rem;
					float: left;
					width: 75%;
					text-align:right;
				}
			}
		}
		.next_btn{
	      width: 6.62rem;
	      margin: 0 auto;
	      margin-top: 1rem;
	      button{
          height: 0.8rem;
          @include comfirmBtn;
        }
	    }
	}
	.fade{
		position: fixed;
		z-index: 99;
		width: 100%;
		height: 100%;
		background: rgba(128,128,128,0.7);
		.fadePicture{
			img{
				width: 100%;
				height:100%;
				margin-top:50%;
			}
		}
		.fade_box{
			width: 6.88rem;
			height: 2.58rem;
			border-radius: 0.15rem;
			position:absolute;
			left: 50%;
			top: 50%;
			margin-left:-3.44rem;
			margin-top: -1.2rem;
			background: white;
			padding-top: 0.26rem;
			.title{
				width: 100%;
				height:0.62rem;
				line-height: 0.62rem;
				position: relative;
				.valite{
					margin-right: 0.17rem;
					font-size: 0.3rem;
				}
				.input{
					border:0.01rem solid #cfd5dd;
					width: 5.11rem;
					height: 0.62rem;
					padding-left: 0.15rem;
				}
				.time{
					display:inline-block;
					font-size: 0.3rem;
					color: rgba(64,60,70,0.7);
					position: absolute;
					right: 1.9rem;
					height: 0.6rem;
					margin-top: 0.01rem;
				}
				.git_code{
					background: transparent;
					display:inline-block;
					font-size: 0.30rem;
					margin-top: 0.01rem;
					height:0.6rem;
					color: rgba(64,60,70,0.7);
					position: absolute;
					right: 0.36rem;
					outline: none;
					border:none;
				}
			}
			.info{
				margin:0 auto;
				width: 6.3rem;
				height: 0.77rem;
				text-align:center;
				line-height: 0.77rem;
				border-bottom: 0.01rem solid #cfd5dd;
				font-size: 0.3rem;
				color: rgba(64,60,70,0.6);
			}
			.btn{
				width: 3.87rem;
				height:0.61rem;
				margin:0 auto;
				margin-top: 0.15rem;
				.cancel,.sure{
					float: left;
					width: 50%;
					height:0.61rem;
					line-height: 0.61rem;
					color: rgba(64,60,70,0.6);
				}
				.cancel{
					border-right: 0.01rem solid #cfd5dd;
				}
			}
		}

	}
	.blue_color{
		background: transparent;
		display:inline-block;
		font-size: 0.30rem;
		margin-top: 0.01rem;
		height:0.6rem;
		position: absolute;
		right: 0.36rem;
		outline: none;
		border:none;
		color: #5698ff;
	}
  .large_content {
    height: 0.8rem;
    line-height: 0.4rem;
  }
	</style>

