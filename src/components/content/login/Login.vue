<template>
  <div class="login">
    <input
      type="text"
      placeholder="学号"
      id="userNo"
      name="userNo"
      v-model="userNo"
    />
    <div class="user-msg">
      <div
        class="user-null-err err-msg"
        :class="[isShow == 'userNull' ? 'show' : 'hide']"
      >
        用户名不能为空
      </div>
      <div
        class="not-exist-err err-msg"
        :class="[isShow == 'userEmpty' ? 'show' : 'hide']"
      >
        用户不存在
      </div>
    </div>
    <input
      type="password"
      placeholder="密码"
      name="password"
      id="password"
      v-model="password"
    />
    <div class="password-msg">
      <div
        class="password-null-err err-msg"
        :class="[isShow == 'passwordNull' ? 'show' : 'hide']"
      >
        密码不能为空
      </div>
      <div
        class="password-err err-msg"
        :class="[isShow == 'passwordErr' ? 'show' : 'hide']"
      >
        密码错误
      </div>
    </div>
    <input type="button" value="登录" class="button" @click="login" />
  </div>
</template>

<script>
import { request } from "network/request";
export default {
  data() {
    return {
      userNo: "",
      password: "",
      isShow: null,
    };
  },
  methods: {
    login() {
      if (this.userNo == "") {
        this.isShow = "userNull";
      } else if (this.password == "") {
        this.isShow = "passwordNull";
      } else {
        request({
          method: "post",
          url: "/login",
          data: {
            userNo: this.userNo,
            password: this.password,
          },
        }).then((res) => {
          const status = res.data.status;
          if (status == 1) {
            this.isShow = "userEmpty";
          } else if (status == 2) {
            this.isShow = "passwordErr";
          } else if (status == 3) {
            console.log(res.data.list[0]);
            this.$store.state.userInfo = res.data.list[0];
            this.$router.replace("/main");
          }
        });
      }
    },
  },
};
</script>

<style scoped>
.login {
  position: relative;
  margin-top: 30px;
}
input {
  display: block;
  outline: none;
  width: 90%;
  height: 50px;
  margin: 0 auto;
  margin-bottom: 30px;
  padding: 10px 20px;
  border-radius: 30px;
  border: 2px solid #f4ce6b;
  box-sizing: border-box;
}
.button {
  margin-bottom: 0px;
  background: #f4ce6b;
  font-size: 20px;
}
.user-msg {
  position: absolute;
  top: 58px;
  right: 40px;
  width: 80%;
  color: #e7695c;
}
.password-msg {
  position: absolute;
  top: 138px;
  right: 40px;
  width: 80%;
  color: #e7695c;
}
.err-msg {
  display: none;
  position: absolute;
  top: 0;
  right: 0;
  transition: 0.35s;
}
.hide {
  display: none;
}
.show {
  display: block;
}
</style>