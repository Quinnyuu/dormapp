<template>
  <div class="mine">
    <div class="topbar"></div>
    <div class="userPic">
      <el-upload
        class="avatar-uploader"
        action="#"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="userPic" :src="userPic" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
    <van-field
      v-if="isEdit"
      v-model="curUserName"
      label="用户名"
      :placeholder="userName"
    />
    <van-field v-else label="用户名" :value="userName" readonly />
    <van-field
      v-model="birthday"
      label="出生年月"
      readonly
      @click="showDateSelect"
    />
    <van-popup
      v-model="datePanelShow"
      position="bottom"
      :style="{ height: '40%' }"
    >
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        :formatter="formatter"
        @confirm="confirmFn"
        @cancel="cancelFn"
      />
    </van-popup>
    <van-field v-if="!isEdit" label="年龄" :value="age" readonly />
    <van-field v-if="isEdit" name="radio" label="性别">
      <template #input v-if="isEdit">
        <van-radio-group v-model="curSex" direction="horizontal">
          <van-radio name="0">男</van-radio>
          <van-radio name="1">女</van-radio>
        </van-radio-group>
      </template>
    </van-field>
    <van-field v-else label="性别" :value="sex" readonly />
    <van-field
      v-if="!isEdit"
      label="手机号"
      :value="phone"
      type="tel"
      readonly
    />
    <van-field
      v-else
      v-model="curPhone"
      label="手机号"
      type="tel"
      :placeholder="phone.toString()"
    />
    <van-field
      v-if="!isEdit"
      label="个人介绍"
      type="textarea"
      :value="introduction"
      readonly
    />
    <van-field
      v-else
      v-model="curIntroduction"
      rows="3"
      autosize
      label="个人介绍"
      type="textarea"
      maxlength="150"
      :placeholder="introduction"
      show-word-limit
    />
    <div class="btns" v-if="!isEdit">
      <van-button class="edit" color="#f4ce6b" @click="isEdit = true">编辑信息</van-button>
      <van-button class="edit" color="#e7695c">修改密码</van-button>
      <div class="exit" @click="exitCount">退出账号</div>
    </div>
    <van-button v-else class="edit" color="#f4ce6b" @click="saveEdit">保存编辑</van-button>
  </div>
</template>

<script>
import { request } from "network/request";
export default {
  data() {
    return {
      userNo: this.$store.state.userInfo.userNo,
      userPic: this.$store.state.userInfo.userPic,
      userName: this.$store.state.userInfo.username,
      birthday: this.$store.state.userInfo.birthday,
      age: this.$store.state.userInfo.age,
      sex: this.$store.state.userInfo.sex == '0' ? '男' : '女',
      phone: this.$store.state.userInfo.phone ? this.$store.state.userInfo.phone : '',
      introduction: this.$store.state.userInfo.introduction,
      curUserName: "",
      curSex: "0",
      curPhone: "",
      curIntroduction: "",
      currentDate: new Date(),
      minDate: new Date(1960, 0, 1),
      maxDate: new Date(),
      datePanelShow: false, //日期选择器显示标志
      isEdit: false,
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      //图片上传
      this.userPic = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.type === 'image/jpeg';
      // const isLt2M = file.size / 1024 / 1024 < 2;
      //   if (!isJPG) {
      //     this.$message.error('上传头像图片只能是 JPG 格式!');
      //   }
      //   if (!isLt2M) {
      //     this.$message.error('上传头像图片大小不能超过 2MB!');
      //   }
      //   return isJPG && isLt2M;
    },
    showDateSelect() {
      if (this.isEdit) {
        this.datePanelShow = true;
      }
    },
    formatter(type, val) {
      //日期选择器格式化
      if (type === "year") {
        return `${val}年`;
      } else if (type === "month") {
        return `${val}月`;
      } else if (type === "day") {
        return `${val}日`;
      }
      return val;
    },
    confirmFn() {
      //日期选择器确认
      this.birthday = this.timeFormat(this.currentDate);
      this.age = new Date().getFullYear() - this.currentDate.getFullYear();
      this.datePanelShow = false;
    },
    cancelFn() {
      //日期选择器取消
      this.datePanelShow = false;
    },
    timeFormat(time) {
      // 日期格式化
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      let day = time.getDate();
      return year + "-" + month + "-" + day;
    },
    saveEdit() {
      //保存编辑
      if(this.curUserName == '' && this.curIntroduction == '' && this.curPhone == ''
      && this.birthday == this.$store.state.userInfo.birthday && this.curSex == this.sex) {
        console.log(455);
        return;
      }
      request({
          method: "post",
          url: "/alertInfo",
          data: {
            userName: this.curUserName == '' ? this.userName : this.curUserName,
            age: this.age,
            sex: this.curSex,
            introduction: this.curIntroduction == '' ? this.introduction : this.curIntroduction,
            phone: this.curPhone == '' ? this.phone : this.curPhone,
            birthday: this.birthday,
            picUrl: this.userPic,
            userNo: this.userNo,
          },
        }).then((res) => {
          const msg = res.data.msg;
          console.log(res);
          if(res.data.status == 1) {
            request({
              method: "post",
              url: "/selectUser",
              data: {
                userNo: this.userNo,
              },
            }).then((res) => {
              console.log(res);
              if(res.data.status == 1) {
                this.$store.state.userInfo = res.data.list[0];
                this.initInfo();
                this.$toast.success(msg)
                this.isEdit = false;
              }
            });
          }else {
            this.$toast.fail(res.data.msg)
          }
        })
    },
    exitCount() {
      //退出账号
      this.$dialog
        .confirm({
          title: "提醒",
          message: "是否退出当前账户？",
        })
        .then(() => {
          // on confirm
          this.$store.state.userInfo = [];
          this.$router.replace("/guide");
        })
        .catch(() => {
          // on cancel
        });
    },
    initInfo() {
      this.userPic = this.$store.state.userInfo.userPic;
      this.userName = this.$store.state.userInfo.username;
      this.birthday = this.$store.state.userInfo.birthday;
      this.age = this.$store.state.userInfo.age;
      this.sex = this.$store.state.userInfo.sex == '0' ? '男' : '女';
      this.phone = this.$store.state.userInfo.phone ? this.$store.state.userInfo.phone : '';
      this.introduction = this.$store.state.userInfo.introduction;
    }
  },
};
</script>

<style>
.mine {
  padding-bottom: 70px;
  height: 100vh;
  overflow-y: auto;
}
.mine .userPic {
  text-align: center;
  background: #467f5c;
  padding: 20% 0 10%;
}
.avatar-uploader .el-upload.el-upload--text {
  border: 2px dashed #f4ce6b;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.mine .avatar-uploader .el-upload.el-upload--text:hover {
  border-color: #e7695c;
}
.mine .avatar-uploader-icon {
  font-size: 28px;
  color: #fff;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.mine .avatar {
  width: 120px;
  height: 120px;
  display: block;
}
</style>