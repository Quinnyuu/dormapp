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
    <van-field v-model="userName" label="用户名" placeholder="userName" />
    <van-field v-model="birthday" label="出生年月" readonly />
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
    <van-field label="年龄" :value="age" readonly />
    <van-field name="radio" label="性别">
      <template #input>
        <van-radio-group v-model="sex" direction="horizontal">
          <van-radio name="1">男</van-radio>
          <van-radio name="2">女</van-radio>
        </van-radio-group>
      </template>
    </van-field>
    <van-field v-model="phone" label="手机号" placeholder="请输入手机号" />
    <van-field
      v-model="introduction"
      rows="3"
      autosize
      label="个人介绍"
      type="textarea"
      maxlength="150"
      placeholder="请输入个人介绍"
      show-word-limit
    />
    <van-button class="edit" color="#f4ce6b">编辑信息</van-button>
    <van-button class="edit" color="#e7695c">修改密码</van-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userPic: "",
      userName: this.$store.state.userInfo.userName,
      birthday: this.$store.state.userInfo.birthday,
      age: this.$store.state.userInfo.age,
      phone: "",
      introduction: "",
      sex: "1",
      currentDate: new Date(),
      minDate: new Date(1960, 0, 1),
      maxDate: new Date(),
      datePanelShow: true,
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
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
    formatter(type, val) {
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
      this.birthday = this.timeFormat(this.currentDate);
      this.age = new Date().getFullYear() - this.currentDate.getFullYear();
      this.datePanelShow = false;
    },
    cancelFn() {
      this.datePanelShow = false;
    },
    timeFormat(time) { // 时间格式化 2019-09-08
        let year = time.getFullYear();
        let month = time.getMonth() + 1;
        let day = time.getDate();
        return year + '-' + month + '-' + day;
      }
  },
};
</script>

<style>
.mine {
  padding-bottom: 50px;
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