<template>
  <div class="bigDiv">
  <topTitle></topTitle>
    <div class="content">
      <textarea class="text" placeholder="请在此处填写报事内容。"  v-model="contentValue"></textarea>
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
          <input id="input" ref="uploadImg" type="file" accept="image/*" @change="getImg($event)" v-if="close">
        </div>
      </div>
      <div class="userMessage">
        <div class="user">
          <span>联系人：</span>
          <input type="text" placeholder="请输入姓名" id="userName" v-model="userName">
        </div>
        <div class="user">
          <span>联系方式：</span>
          <input type="text" placeholder="请输入手机号" id="userPhone" v-model="userPhone">
        </div>
        <div class="address">
          <span class="red_star">*</span><span>报事地址：</span>
          <textarea name="报事地址" class="textValue" placeholder="请输入报事地段" v-model="uaerAddress" id="uaerAddress"></textarea>
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
      <!-- <transition name="fade"> -->
        <div class="modal" v-if="showTip" @click.stop.prevent=""></div>
      <!-- <transition> -->
      <!-- <transition name="fade"> -->
        <div class="show_tip" v-if="showTip" @click.stop.prevent="">
          <p>报事报修提交成功，您可以根据工单编号查询工单处理进度。</p>
          <div>
            <span>工单编号:</span>
            <span :class="'odd_numbers ' + (hasCopy ? 'colorbg' : '')" id="odd_numbers_id" v-model="oddNumbers">{{oddNumbers}}</span>
            <!-- <input type="text" v-model="oddNumbers" class="odd_numbers" id="odd_numbers_id"> -->
            <span class="copy" v-clipboard:copy="oddNumbers" v-clipboard:success="onCopy" v-clipboard:error="onError"  @click='handleCopy(oddNumbers,$event)'>复制</span>
          </div>
          <button @click="closeModal">确   定</button>
        </div>
      <!-- <transition> -->
  </div>
</template>

<script>
import topTitle from '@/components/topTitle'
import clip from '@/script/clipboard'
import lrz from 'lrz'
// lrz(this.files[0])
  export default {
    data(){
      return {
          file:null,
          urlAddress1:'http://10.51.36.108:3002/xa/static/img.png',
          urlAddress2:'http://10.51.36.108:3002/xa/static/img.png',
          addImg:'http://10.51.36.108:3002/xa/static/camera.png',
          imgs:[],
          imgFile: [],
          close:true,
          contentValue:null,
          userName:null,
          userPhone:null,
          uaerAddress:null,
          oddNumbers: 123201811111,
          showTip: false,
          hasCopy: false
      }
    },
    mounted(){
      // this.contentValue = document.getElementById('contentValue');
      // this.userName = document.getElementById('userName');
      // this.userPhone = document.getElementById('userPhone');
      // this.uaerAddress = document.getElementById('uaerAddress');
      // this.getIos()
    },
    components: {
      topTitle
    },
    methods:{
      // selectAfterCopy() {
      //   var ele = document.querySelector('#odd_numbers_id')
      //   ele.focus()
      //   ele.select()
      // },
      handleCopy(text, event) {
        clip(text, event)
      },
      onCopy(e){
        console.log(e.text)
        this.hasCopy = true
        // this.selectAfterCopy()
      },
      onError(err){
        console.log('复制失败！请不要重试')
        // this.selectAfterCopy()
      },
      handleSubmit(){
        var _this = this;
        //console.log(_this.imgs[0]);
        // var url =  JSON.stringify(_this.imgs[0]);
        var pic = new FormData();
        for(let i=0; i<3; i++){
          pic.append('files', _this.imgFile[i])
        }
        console.log(pic);
        // console.log(_this.imgFile[0]);
        this.$post('/ssh/v1/appBase/filesUpload', pic, '', 'upImg').then(res => {
          console.log(res.result.url)
          // alert(res.result.url)
              _this.$post('/ssh/SysWarning/addWarningByWeb',{
                projectCode: '123',
                image: res.result.url,
                remarks:_this.contentValue,
                reportPerson:_this.userName,
                reportPhone:_this.userPhone,
                address:_this.uaerAddress
            }).then(res => {
                  console.log(res)
                  if (res.errorCode === 200) {
                    _this.oddNumbers = res.result;
                    _this.showTip = true;
                  }else{
                    _this.oddNumbers = res.errorCode;
                    _this.showTip = true;
                  }
                }).catch(err=>{
                  console.log(err)
                })
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
          } else {

          }
      },
      //获取图片或者拍照
      getImg(event) {
        var _this = this;
        var showFile = event.target.files[0];
        var file = this.$refs.uploadImg.files[0];
        lrz(file).then(function (rst) {
            // 处理成功会执行
            // console.log(rst);
            // // 处理失败会执行
            // console.log(rst.file);
            // console.log(file);
            if(_this.imgFile.length < 3){
              _this.imgFile.push(rst.file);
            }
            // console.log(_this.imgFile);
            var reader = new FileReader();
            // console.log(reader)
            reader.readAsDataURL(showFile); // 读出 base64
            // console.log(reader)
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
              // console.log( _this.urlAddress)
            };
        })
        .catch(function (err) {

          })
        // var file = document.getElementById('input').files

      },
      copyNum(){
        alert(1)
        var ID=document.getElementById("odd_numbers_id");
        ID.select(); // 选择对象
        document.execCommand("Copy");
        // alert(1);
      },
      closeModal(){
        window.location.reload();
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
          // z-index: 0;
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
        position: relative;
        .red_star{
          position: absolute;
          left: 0;
          top: 0;
          color: red;
        }
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
          width:4.8rem;
          text-align: right;
          border-bottom: 0.02rem solid #D3D3D3;
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
.show_tip {
  width: 5.8rem;
  padding: 0.4rem 0.4rem 0.1rem 0.4rem;
  position: absolute;
  z-index: 102;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 0.1rem;
  box-shadow: 0 0 0.2rem #888;
  p {
    text-align: left;
    text-indent: 0.6rem;
    font-size: 0.32rem;
  }
  span{
    font-size: 0.32rem;
  }
  .odd_numbers{
    margin-left: 0.1rem;
    margin-right: 0.3rem;
    font-size: 0.32rem;
    font-weight: bold;
    width: 2.5rem;
    outline: none;
  }
  .odd_numbers.colorbg {
    background-color: #b9d6fb
  }
  button {
    display: block;
    width: 100%;
    height: 0.8rem;
    margin-top: 0.2rem;
    font-size: 0.36rem;
    border-top: 0.01rem solid #aaa;
    color: #999;
    background-color: #fff;
    font-weight: bold;
    &:active{
      color: #aaa;
    }
  }
}
.modal{
  position: fixed;
  left: -10rem;
  top: -10rem;
  height: 30rem;
  width: 30rem;
  z-index: 101;
  background-color: rgba(0, 0, 0, 0.1);
}
.fade-enter-active,.fade-leave-active{
  transition: all 0.3s ease-out;
}
/* 进入开始 */
.fade-enter{
  transform: translateX(8rem);
  opacity: 0.3;
}
/* 出去终点 */
.fade-leave-active{
  transform: translateX(8rem);
  opacity: 0.3;
}
.copy{
  color: blue;
}
</style>
