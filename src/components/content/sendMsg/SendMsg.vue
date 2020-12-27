<template>
  <div class="send-box" :class="{ 'send-box-active': isUp }">
    <div class="down-btn" v-if="isUp" @click="isMsgUp">
      <i class="iconfont icon-icon-GIS_xiala-"></i>
    </div>
    <div class="up-btn" v-else @click="isMsgUp">我也要说...</div>
    <div class="msg-box" v-show="isUp" @keyup="wordChange">
      <textarea v-model="words"></textarea>
      <div class="msg-info">
        还能输入<span>{{ 200 - wordCount }}</span
        >字
      </div>
      <button class="send" @click="addArticle">发表</button>
    </div>
  </div>
</template>

<script>
import { request } from "network/request";
export default {
  data() {
    return {
      isUp: false,
      words: "", //文本内容
      wordCount: 0,
    };
  },
  methods: {
    isMsgUp() {
      this.isUp = !this.isUp;
    },
    wordChange() {
      this.wordCount = this.words.length;
      const msgInfo = document.querySelector(".msg-info");
      if (this.wordCount > 200) {
        msgInfo.innerHTML =
          "已经超出<span>" + (this.wordCount - 200) + "</span>字";
        msgInfo.style.color = "#e7695c";
      } else {
        msgInfo.innerHTML =
          "还能输入<span>" + (200 - this.wordCount) + "</span>字";
        msgInfo.style.color = "#fff";
      }
    },
    addArticle() {
      request({
        method: "post",
        url: "/addArticles",
        data: {
          articleId: new Date().getTime(),
          articleCont: this.words,
          userNo: this.$store.state.userInfo.userNo,
          time: new Date().Format("yyyy-MM-dd HH:mm:ss"),
          dormBuilding: this.$store.state.userInfo.dormBuilding,
          dormNo: this.$store.state.userInfo.dormNo,
        },
      }).then((res) => {
        console.log(res);
        if (res.data.status == 1) {
          this.$toast.success(res.data.msg);
          this.$emit('refreshArticleList');
          this.isUp = false;
        } else {
          this.$toast.fail(res.data.msg);
        }
      });
    },
  },
};
</script>

<style scoped>
.send-box {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  height: 130px;
  background: #386e4c;
  border-radius: 30px 30px 0 0;
  color: #fff;
  overflow: hidden;
  transition: 0.3s;
}
.send-box-active {
  height: 300px;
}
.down-btn {
  text-align: center;
  height: 50px;
  line-height: 50px;
}
.up-btn {
  text-align: center;
  height: 60px;
  line-height: 60px;
}
.msg-box {
  position: relative;
  height: 130px;
  padding: 0px 20px 10px;
}
.msg-box textarea {
  width: 100%;
  height: 120px;
  border: 2px solid #e7695c;
  border-radius: 10px;
  box-shadow: none;
  outline: none;
  background: transparent;
  resize: none;
  box-sizing: border-box;
  color: #fff;
  font-size: 16px;
}
.msg-info {
  position: absolute;
  right: 130px;
  bottom: -15px;
}
.msg-box button {
  position: absolute;
  right: 20px;
  bottom: -20px;
  width: 100px;
  height: 30px;
  border: none;
  border-radius: 6px;
  background: #f4ce6b;
  color: #333;
}
</style>