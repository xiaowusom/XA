<template>
	<div>
		<div class="content" >
			<topTitle></topTitle>
			<div class="box">
				<p class="remark">{{this.value.remarks}}</span>
				</p>
				<div class="picture_box">
					<div class="picture_list">
						<div><img :src="picture"></div>
					</div>
				</div>
				<ul class="info_list">
					<li>
						<div class="list_1">
							<span>联系人:</span>
						</div>
						<div class="list_2">
							<span>{{this.value.peopleName}}</span>
						</div>
					</li>
					<li>
						<div class="list_1">
							<span>联系电话:</span>
						</div>
						<div class="list_2">
							<span>{{this.value.reportPhone}}</span>
						</div>				
					</li>
					<li>
						<div class="list_1">
							<span>报事地址:</span>
						</div>
						<div class="list_2">
							<span>{{this.value.address}}</span>
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
							<span>{{this.value.code}}</span>
						</div>
					</li>
					<li>
						<div class="list_1">
							<span>工单状态:</span>
						</div>
						<div class="list_2">
							<span>{{this.value.status == 1?"未受理":"已处理"}}</span>
						</div>				
					</li>
					<li>
						<div class="list_1">
							<span>下单时间:</span>
						</div>
						<div class="list_2">
							<span>{{this.value.createTime|formatDate}}</span>
						</div>
					</li>
				</ul>
			</div>
			<div class="next_btn" @click="handleSubmit()">
		      <Button type="primary" shape="circle" :long="true">取消工单</Button>
		    </div> 
		</div>
	</div>
</template>
<script>
import topTitle from '@/components/topTitle'
import { formatDate } from '@/script/date.js'
	export default {
		data() {
			return {
				code:this.$route.query.workCode,
				value:'',
				picture:[],
			}
		},
		mounted() {
			this.getData();
		},
		components: {
	      topTitle
	    },
		methods: {
			getData(){
				var url = 'ssh/SysWarning/getWarningByCode'
		        this.$post(url,{code:this.code})
		        .then(res => {
						this.value = res.result;
						var str = res.result.image;
						var strs = new Array();
						if(str&&str.length !=0){
							strs = str.split(",")
						}
						this.picture = strs;
					//console.log(this.picture)
		        },(err) => {
		        	console.log(err)
		        })
		      },
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
	.content{
		width: 100%;
		height: 100%;
		overflow: hidden;
		background:#EFf2f5;
		box-sizing: border-box;
		.box{
			width: 100%;
			height: 4.25rem;
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
					div{
						width: 1rem;
						height: 0.8rem;
						img{
							width: 1rem;
							height: 0.8rem;
						}
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
		      Button{
		        height: 0.8rem;
		      }
		    }
	}
	
</style>
	