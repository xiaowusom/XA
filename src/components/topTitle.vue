<template>
  <div class="header">
    <!-- <span class="left" @click="back" v-if="hasleft"></span> -->
    <img :src="lefImg" class="left" @click="back" v-if="hasleft">
    <span class="center">{{title}}</span>
    <span class="right" @click="go" v-if='Inquiry'>查询</span>
  </div>
</template>

<script>
import {mapState} from 'vuex'
  export default {
    data() {
      return {
        Inquiry:false,
        title:'',
        hasleft: false,
        lefImg: null,
      }
    },
    computed: {
      ...mapState(['imgURL'])
    },
    mounted(){
      this.lefImg = this.imgURL + 'back.png';
      this.isInquiry();
    },
    methods:{
      go(){
        this.$router.push({ path: '/inquiry'});
      },
      back(){
        this.$router.go(-1);
      },
      isInquiry(){
        this.title = this.$route.meta.title;
        var route = this.$route.path;
        if(route === '/'){
           this.Inquiry=true;
        }
        if(route !=='/'){
           this.hasleft = true
        }
      }
    },
    watch: {
      "$route": "isInquiry"
    }
  }

</script>
<style lang="scss" scoped>
  .header {
    position: relative;
    background: #fff;
    width: 100%;
    height: 0.74rem;
    line-height:  0.74rem;
    text-align: center;
    padding: 0 0.2rem;
    box-shadow: 0px 5px 5px #E8EBF4;
    .right{
      float: right;
      font-size: 0.36rem;
    }
    .right:active{
      color: #39f;
    }
    .center{
      position: absolute;
      left: 40%;
      font-size: 0.36rem;
    }
    .left{
      float:left;
      display: inline-block;
      width:0.74rem;
      height:0.74rem;
      // background-image: url(/static/back.png);
      // background-size: 100% 100%;
    }
    .left:active{
      // background-image: url(/static/backs1.png);
      // background-size: 100% 100%;
    }
  }

</style>
