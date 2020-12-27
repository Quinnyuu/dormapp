<template>
    <div class="tabber-bar-item" @click="itemActive" :class="{active: isActive}">
        <div><slot name="item-icon"></slot></div>
        <div class="item-text" v-show="isActive"><slot name="item-text"></slot></div>
    </div>
</template>

<script>
export default {
    props:{
        path:String, 
    },   
    data() {
       return {

       }
   },
   computed: {
       isActive(){
           return this.$route.path.indexOf(this.path) !== -1
       }
   },
   methods: {
       itemActive() {
           this.$router.replace(this.path);
       }
   }
}
</script>

<style scoped>
.tabber-bar-item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 35px;
    line-height: 35px;
    align-self: center;
    text-align: center;
    font-size: 14px;
    color: #fff;
    padding-top: 10px;
    border-radius: 20px;
    overflow: hidden;
  }
.tabber-bar-item i {
    font-size: 28px;
    height: 28px;
    width: 28px;
    margin-bottom: 1px;
}
.item-text {
    height: 45px;
    margin-left: 5px;
    transition: .3s;
}
.active {
    width: 100px;
    background: #e7695c;
    transition: .3s;
}
</style>