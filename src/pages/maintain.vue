<template>
  <div class="bigDiv">
    <topTitle></topTitle>
    <div class="case_type">
      <span class="type_start">*</span>
      <span class="title">报事类型：</span>
      <input id="safe" name="caseType" type="radio" value=1 v-model="caseType"><label for="safe">园区安全</label>
      <input id="fixed" name="caseType" type="radio" value=2 v-model="caseType"><label for="fixed">设备维修</label>
      <input id="suggest" name="caseType" type="radio" value=3 v-model="caseType"><label for="suggest">服务建议</label>
    </div>
    <div class="content">
      <span class="title">报事内容:</span>
      <span class="textarea_star">*</span>
      <textarea class="text" id="content_value" placeholder="请在此处填写报事内容。"  v-model="contentValue" maxlength="240"></textarea>
      <div class="imgDiv">
        <div class="imgBox" v-if="urlAddress1">
            <img :src="urlAddress1">
        </div>
        <div class="imgBox" v-if="urlAddress2">
            <img :src="urlAddress2">
        </div>
        <div class="photograph">
          <img :src="addImg">
          <input id="input" ref="uploadImg" type="file" accept="image/*" @change="getImg($event)" v-if="close">
        </div>
      </div>
      <div class="userMessage">
        <div class="user">
          <span class="red_star" v-if="caseType==2">*</span>
          <span>联系人：</span>
          <input type="text" placeholder="请输入姓名" id="userName" maxlength="10" v-model="userName">
        </div>
        <div class="user">
          <span class="red_star" v-if="caseType==2">*</span>
          <span>联系方式：</span>
          <input id="phone_value" type="text" placeholder="请输入手机号" v-model="userPhone">
        </div>
        <div class="address">
          <span class="red_star" v-if="caseType==2||caseType==1">*</span><span>报事地址：</span>
          <textarea name="报事地址" class="textValue" id="address_value" placeholder="请输入报事地段" maxlength="100" v-model="uaerAddress"></textarea>
        </div>
      </div>
    </div>
    <div class="next_btn" @click="handleSubmit()">
      <button :disabled="submiting" :class="{submiting: submiting}">提交</button>
    </div>
      <div class="prompt">
        <p>温馨提示：</p>
        <p class="textPrompt">填写联系方式即可通过手机接收工单生成、工单进度短信信息。</p>
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
import lrz from 'lrz' //图片压缩
import { MessageBox } from 'mint-ui'
import {mapState} from 'vuex'
  export default {
    data(){
      return {
          file:null,
          urlAddress1:'',
          urlAddress2:'',
          addImg:'http://202.105.96.131:3002/xa/static/camera.png',
          imgs:[],
          imgFile: [],
          close:true,
          contentValue:null,
          userName:null,
          userPhone:null,
          uaerAddress:null,
          oddNumbers: 123201811111,
          showTip: false,
          hasCopy: false,
          caseType: 3,
          submiting: false, // 正在提交状态
      }
    },
    computed:{
      ...mapState(['imgURL'])
    },
    mounted(){
      this.addImg = this.imgURL + 'camera.png' ;
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
        if (!this.contentValue) {
          MessageBox.alert('请输入报事内容', '');
          document.getElementById('content_value').focus();
          return
        }
        if (!this.userName && (this.caseType == 2)) {
          MessageBox.alert('请输入联系人姓名', '');
          document.getElementById('userName').focus();
          return
        }
        if (!this.userPhone && (this.caseType == 2)) {
          MessageBox.alert('请输入联系方式', '');
          document.getElementById('userName').focus();
          return
        }
        if (this.userPhone) {
            if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.userPhone))){
            MessageBox.alert('请输入正确的手机号码', '');
            console.log(document.getElementById('phone_value'))
            document.getElementById('phone_value').focus()
            return
            // document.mobileform.mobile.focus();
           }
        }
        if (!this.uaerAddress && (this.caseType == 1 || this.caseType == 2)) {
          MessageBox.alert('请输入报事地址', '');
          document.getElementById('address_value').focus();
          return
        }
        this.submiting = true;
        if(_this.imgFile[0]){
          var pic = new FormData();
          for(let i=0; i<3; i++){
            pic.append('files', _this.imgFile[i])
          }
          this.$post('/ssh/v1/appBase/filesUpload', pic, '', 'upImg').then(res => {
              if(res.errorCode !== 200){
                MessageBox.alert('图片上传失败！');
              return
              }
            _this.$post('/ssh/SysWarning/addWarningByWeb',{
              projectCode: 'XACS001',
              image: res.result.url,
              remarks:_this.contentValue,
              reportPerson:_this.userName,
              reportPhone:_this.userPhone,
              address:_this.uaerAddress,
              reportType: _this.caseType
            }).then(res => {
              if (res.errorCode === 200) {
                _this.oddNumbers = res.result;
                _this.showTip = true;
                this.submiting = false;
              }else{
                MessageBox.alert('报事上传失败！');
                this.submiting = false;
                return
              }
            }).catch(err=>{
                console.log(err)
                MessageBox.alert('请求失败！');
                this.submiting = false;
                return
            })
          }).catch(err=>{
                MessageBox.alert('请求失败！');
                this.submiting = false;
                return
          })
        } else {
          _this.$post('/ssh/SysWarning/addWarningByWeb',{
            projectCode: 'XACS001',
            image: null,
            remarks:_this.contentValue,
            reportPerson:_this.userName,
            reportPhone:_this.userPhone,
            address:_this.uaerAddress,
            reportType: _this.caseType
          }).then(res => {
            if (res.errorCode === 200) {
              _this.oddNumbers = res.result;
              _this.showTip = true;
              this.submiting = false;
            }else{
              MessageBox.alert('报事上传失败！');
              this.submiting = false;
              return
            }
          }).catch(err=>{
              MessageBox.alert('请求失败！');
              this.submiting = false;
              return
          })
        }
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
            if(_this.imgFile.length < 3){
              _this.imgFile.push(rst.file);
            }
            var reader = new FileReader();
            reader.readAsDataURL(showFile); // 读出 base64
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
            };
        })
        .catch(function (err) {

        })

      },
      closeModal(){
        window.location.reload();
      },
    },
    watch:{
      caseType:function() {
        // alert(this.caseType)
      }
    }
  }

</script>
<style lang="scss" scoped>
@import 'src/style/mixin';
  .bigDiv{
    height: 100%;
    width: 100%;
    background-color: #EFf2f5;
    .case_type {
      position: relative;
      height: 0.5rem;
      margin-top: 0.15rem;
      background-color: #fff;
      text-align: left;
      padding-left: 0.25rem;
      padding-top: 0.1rem;
      .type_start {
        position: absolute;
        left: 0.25rem;
        top: 0.1rem;
        color: red;
      }
      label {
        margin-left: 0.05rem;
        margin-right: 0.2rem;
        display: inline-block;
        float: left;
      }
      input {
        line-height: 0.4rem;
        margin-top: 0.05rem;
        display: inline-block;
        float: left;
      }
    }
    .title {
      float: left;
      margin-left: 0.2rem;
      margin-bottom: 0.1rem;
    }
    .content{
      //height:8.1rem;
      width: 100%;
      background-color: #FFF;
      padding: 0.15rem 0.28rem;
      box-shadow: 0 0.15rem 0 rgba(220,220,220,0.6);
      position: relative;
    }
    .text{
      width: 96%;
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
      text-align: left;
      .imgBox{
        vertical-align: top;
        position:relative;
        margin-right: 0.37rem;
        display:inline-block;
        height: 1.05rem;
        width:2rem;
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
        position: relative;
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
  z-index: 9999;
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
    margin-right: 0.1rem;
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
  position: relative;
  &:active{
    color: #aaa;
  }
}
.red_star{
  position: absolute;
  left: 0;
  top: 0;
  color: red;
}
.textarea_star{
  position: absolute;
  left: 0.25rem;
  top: 0.15rem;
  color: red;
}
.submiting {
  background-color: #bacfe4!important;
}
</style>
