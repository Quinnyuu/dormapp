<template>
  <div class="guide">
    <div class="guide-page" :class="{heighten: heighten}">
        <div class="guide-nav">
            <router-link to="/guide/login" class="guide-nav-item" :class="{focus: isChoose}">登录</router-link>
            <router-link to="/guide/regist" class="guide-nav-item" :class="{focus: !isChoose}">注册</router-link>
        </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            isChoose: true,
            heighten: false
        }
    },
    methods: {

    },
    beforeRouteUpdate (to, from, next) {
        if(to.name == 'Login') {
            this.isChoose = true;
            this.heighten = false;
        }else if(to.name == 'Regist') {
            this.isChoose = false;
            this.heighten = true;
        }
        next();
    }
};
</script>

<style scoped>
.guide {
  position: relative;
  background: #386e4c;
  height: 100%;
}
.guide-page {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    height: 340px;
    border-radius: 50px 50px 0 0;
    overflow: hidden;
    transition: .3s;
}
.guide-nav {
    display: flex;
    justify-content: space-around;
    height: 60px;
    line-height: 60px;
    padding: 0 40px;
}
.guide-nav-item {
    display: inline-block;
    width: 60px;
    text-align: center;
    font-size: 20px;
    color: #333;
    padding: 10px 0;
}

.focus {
    border-bottom: 3px solid #f4ce6b;
}

.heighten {
    height: 560px;
}
</style>