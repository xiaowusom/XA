<template>
  <div class="bigDiv">
  <topTitle></topTitle>
    <div class="content">
      <textarea class="text"placeholder="请在此处填写报事内容。" id="contentValue"></textarea>
      <div class="imgDiv">
        <div class="imgBox">

            <!-- <div class="detele" @click="delete()">
                <Icon type="ios-close"></Icon>
            </div> -->
            <img :src="urlAddress1">
        </div>
        <div class="imgBox">
            <!-- <div class="detele" @click="delete()">
                <Icon type="ios-close"></Icon>
            </div> -->
            <img :src="urlAddress2">
        </div>
        <div class="photograph">
        <!-- <div class="detele" @click="delete()">
                <Icon type="ios-close"></Icon>
            </div> -->
          <img :src="addImg">
          <input id="input" type="file" accept="image/*" @change="getImg($event)" v-if="close">
        </div>
      </div>
      <div class="userMessage">
        <div class="user">
          <span>联系人：</span>
          <input type="text" placeholder="请输入姓名" id="userName">
        </div>
        <div class="user">
          <span>联系方式：</span>
          <input type="text" placeholder="请输入手机号" id="userPhone">
        </div>
        <div class="address">
          <span>报事地址：</span>
          <textarea name="报事地址" class="textValue" placeholder="请输入报事地段" id="uaerAddress"></textarea>
        </div>
      </div>
    </div>
    <div class="next_btn" @click="handleSubmit()">
      <Button type="primary" shape="circle" :long="true">提交</Button>
    </div>
      <div class="prompt">
        <p>温馨提示：</p>
        <p class="textPrompt">点击提交后，工单编号将以短信的形式下发至您的手机，且今后工单进度的更新也会以短信的形式下发至您的手机，请注意查收。</p>
      </div>
  </div>
</template>

<script>
import topTitle from '@/components/topTitle'
  export default {
    data(){
      return {
          file:null,
          urlAddress1:'../../static/img.png',
          urlAddress2:'../../static/img.png',
          addImg:'../../static/camera.png',
          imgs:[],
          close:true,
          contentValue:null,
          userName:null,
          userPhone:null,
          uaerAddress:null,
      }
    },
    mounted(){
      this.contentValue = document.getElementById('contentValue');
      this.userName = document.getElementById('userName');
      this.userPhone = document.getElementById('userPhone');
      this.uaerAddress = document.getElementById('uaerAddress');
      this.getIos()
    },
    components: {
      topTitle
    },
    methods:{
      handleSubmit(){
        var _this = this;
        
        var url =  JSON.stringify(_this.imgs[0]);
         console.log(_this.url);
        this.$post('/ssh/v1/appBase/filesUpload',{files:url}).then(res => {
          console.log(res)
            //   _this.$post('/ssh/SysWarning/addWarningByWeb',{
            //     projectCode:'',
            //     image:,
            //     remarks:_this.contentValue,
            //     reportPerson:_this.userName,
            //     reportPhone:_this.userPhone,
            //     address:_this.uaerAddress
            // }).then(res => {
            //       console.log(res)
            //     })
            })

        //this.$router.push({ path: '/'});
      },
      //删除图片
      delete(){

      },
      //判断是否ios
      getIos() {
        var _this = this
          _this.file = document.getElementById('input');
          var ua=navigator.userAgent.toLowerCase();
          if (ua.match(/iPhone\sOS/i) == "iphone os") {
              _this.file.removeAttribute("capture");
          } else {

          }
      },
      //获取图片或者拍照
      getImg(event) {
        var _this = this;
        var file = event.target.files[0];
        console.log(file);
        var reader = new FileReader();
        reader.readAsDataURL(file); // 读出 base64
        reader.onloadend = function () {
            _this.imgs.push(reader.result);
            _this.urlAddress1 = _this.imgs[0];
            if(_this.imgs[1]){
              _this.urlAddress2 = _this.imgs[1];
            }
            if(_this.imgs[2]){
               _this.addImg = _this.imgs[2];
               _this.close = false;
            }
          //console.log( _this.urlAddress)
        };
      },
    }
  }

</script>
<style lang="scss" scoped>
  .bigDiv{
    height: 100%;
    width: 100%;
    background-color: #EFf2f5;
    .content{
      //height:8.1rem;
      width: 100%;
      background-color: #FFF;
      margin-top: 0.15rem;
      padding: 0.18rem 0.28rem;
      box-shadow: 0 0.15rem 0 rgba(220,220,220,0.6);
    }
    .text{
      width: 100%;
      height: 3.2rem;
      border: 0.02rem solid #D3D3D3;
      background-color: #fff;
      padding: 0.05rem;
      display: inline-block;
      border-radius: 0;
      margin-bottom:0.18rem;
    }
    .imgDiv{
      height: 1.05rem;
      width:100%;
      margin-bottom: 0.18rem;
      .imgBox{
        vertical-align: top;
        position:relative;
        margin-right: 0.37rem;
        display:inline-block;
        height: 1.05rem;
        width:2rem;
        //border: 0.02rem dashed #D3D3D3;
        // background-image: url(../images/img.png);
        // background-size: 100% 100%;
        img{
          display:inline-block;
          height: 1.05rem;
          width:2rem;
        }
      }
      .photograph{
        position:relative;
        display:inline-block;
        height: 1.05rem;
        width:2rem;
        img{
          display:inline-block;
          height: 1.05rem;
          width:2rem;
        }
        input{
          position:absolute;
          top: 0;
          left: 0;
          z-index: 100;
          height: 1.05rem;
          width:2rem;
          font-size:0;
          opacity:0;
        }

      }
      .detele{
        display: inline-block;
        position: absolute;
        top: -0.3rem;
        left: 1.7rem;
        font-size: 0.5rem;
        .ivu-icon {
          font-size: 0.5rem;
          color: #5698FF;
        }
      }
       .detele :active{
        color: red;
      }
    }
    .userMessage{
      height:3.1rem;
      width:100%;
      padding-top: 0.3rem;
      .user{
        height:0.7rem;
        width:100%;
        border-bottom: 0.02rem solid #D3D3D3;
        line-height:0.7rem;
        padding: 0 0.2rem;
        span{
          text-align: left;
          line-height:0.7rem;
          float: left;
        }
        input{
          text-align:right;
          height:0.66rem;
          float: right;
        }
      }
      .address{
        height:1.4rem;
        width:100%;
        padding: 0 0.2rem;
        span{
          display: inline-block;
          margin-top:0.1rem;
          text-align: left;
          float: left;
        }
        .textValue{
          float: right;
          display: inline-block;
          margin-top:0.1rem;
          height:1.4rem;
          width:4.8rem;
          text-align: right;
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
    .prompt{
      width: 100%;
      height:1.4rem;
      padding:0.1rem 0.4rem;
      margin: 0.3rem auto;

      p{
        font-size:0.25rem;
        float: left;
        text-align:left;
      }
      .textPrompt{
        text-indent:0.5rem;
      }
    }
  }

</style>
