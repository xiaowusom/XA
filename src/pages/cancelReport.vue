<template>
	<div class="content">
		<div class="header">
			报事详情
		</div>
		<div class="grayBox"></div>
		<div class="box">
			<p class="remark">水管漏水，理。</span>
			</p>
			<div class="picture_box">
				<div class="picture_list">
					<div>图片1</div>
				</div>
				<div class="picture_list center_list">
					<div>图片2123</div>
				</div>
				<div class="picture_list">
					<div>图片3</div>
				</div>
			</div>
			<ul class="info_list">
				<li>
					<div class="list_1">
						<span>联系人:</span>
					</div>
					<div class="list_2">
						<span>徐柳飞</span>
					</div>
				</li>
				<li>
					<div class="list_1">
						<span>联系人:</span>
					</div>
					<div class="list_2">
						<span>18612345678</span>
					</div>				</li>
				<li>
					<div class="list_1">
						<span>报事地址:</span>
					</div>
					<div class="list_2">
						<span>深圳市中海华庭1栋1单元101室</span>
					</div>
				</li>
			</ul>
			<div class="gray_box"></div>
			<div class="black_box"></div>
			<div class="handel_box">
				<ul class="info_list">
					<li>
						<div class="list_1">
							<span>工单编号:</span>
						</div>
						<div class="list_2">
							<span>GJH12345678</span>
						</div>
					</li>
					<li>
						<div class="list_1">
							<span>工单状态:</span>
						</div>
						<div class="list_2">
							<span>未受理</span>
						</div>				</li>
					<li>
						<div class="list_1">
							<span>下单时间:</span>
						</div>
						<div class="list_2">
							<span>2018-11-12 09:32:09</span>
						</div>
					</li>
				</ul>
			</div>
			<div class="back">
				<div><span>
					取消订单
				</span></div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {

			}
		},
		mounted() {

		},
		methods: {
			
		}
	}
</script>
<style lang="scss" scoped>
	.content{
		width: 7.5rem;
		height: 13.34rem;
		overflow: hidden;
		background:white;
		box-sizing: border-box;
		.header{
			width: 100%;
			height: 1.28rem;
			text-align: center;
			line-height: 1.28rem;
			font-size: 0.18rem;
		}
		.box{
			width: 100%;
			height: 4.25rem;
			.grayBox{
				width: 100%;
				height: 0.15rem;
				background: #e6e9f3;
			}
			.remark{
				width: 6.9rem;
				min-height: 0.71rem;
				border: 0.01rem solid #d2d2d2;
				margin: 0 auto;
				margin-top: 0.23rem;
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
						line-height: 0.8rem;
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
			.gray_box{
				width: 100%;
				height: 0.05rem;
				background: #dbe1e6;
			}
			.black_box{
				width: 100%;
				height: 0.18rem;
				background:#eff2f5;
			}
			.handel_box{
				width: 6.9rem;
				height: 2.11rem;
				margin:0 auto;
				.info_list>li{
					list-style: none;
					height: 0.7rem;
					
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
			.back{
				width: 100%;
				height:5.5rem;
				padding-top: 0.5rem;
				background: #eff2f5;
				div{
					margin:0 auto;
					width: 6.17rem;
					height: 0.74rem;
					line-height: 0.74rem;
					text-align: center;
					border-radius: 0.15rem;
					background:skyblue; 
				}
			}
		}
	}
	
</style>
	