<template>
    <div class="addGoods">
      <div class="goodsPic">
        <el-upload
          class="avatar-uploader"
          action="#"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="goodsPic" :src="goodsPic" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
        <van-field v-model="goodsName" label="文本" placeholder="请输入物品名" />
        <van-field name="goodsCount" label="数量">
          <template #input>
            <van-stepper v-model="goodsCount" />
          </template>
        </van-field>
        <van-field v-model="goodsStatusDetail" label="状态" @click="pickerDialog = true"/>
        <van-popup
          v-model="pickerDialog"
          position="bottom"
          :style="{ height: '40%' }"
        >
          <van-picker
            v-if="pickerDialog"
            title="状态选择"
            show-toolbar
            :columns="columns"
            @confirm="onConfirm"
            @cancel="onCancel"
          />
        </van-popup>
        <van-field
            v-model="goodsDetail"
            rows="4"
            autosize
            label="物品描述"
            type="textarea"
            maxlength="100"
            placeholder="请输入物品描述"
            show-word-limit
            />
      <input type="button" value="添加" class="button" @click="addGoods">
    </div>
</template>

<script>
import { request } from "network/request";
export default {
  data() {
      return {
        goodsId: '',
        goodsPic: '',
        goodsName: '',
        goodsCount: 1,
        goodsState: '',
        goodsStatusDetail: '',
        goodsDetail: '',
        pickerDialog: false,
        columns: ['使用中','未使用','库存不足','已损坏']
      }
  },
  methods: {
    onConfirm(value, index) { 
      this.goodsState = index.toString();
      this.goodsStatusDetail = this.columns[index]
      this.pickerDialog = false;
    },
    onCancel() {
      this.pickerDialog = false;
    },
    addGoods() {
      if (this.goodsName == '' || this.goodsState == '') {
        this.$toast.fail('请输入姓名或状态')
      }
      this.goodsId = new Date().getTime()
      request({
        method: "post",
        url: "/addGoods",
        data: {
          goodsId: this.goodsId,
          goodsName: this.goodsName,
          goodsStatus: this.goodsState,
          goodsCount: this.goodsCount,
          goodsDetail: this.goodsDetail,
          dormBuilding: this.$store.state.userInfo.dormBuilding,
          dormNo: this.$store.state.userInfo.dormNo,
          goodsPic: this.goodsPic
        },
      }).then((res) => {
        console.log(res);
        if(res.data.status == 1) {
          this.$toast.success(res.data.msg)
          this.addGoodsStatus()
          this.$router.replace('/main/goods')
        }else {
          this.$toast.fail(res.data.msg)
        }
      });
    },
    addGoodsStatus() { // 添加状态信息
      request({
          method: "post",
          url: "/addGoodsStatus",
          data: {
            goodsStatusId: new Date().getTime(),
            goodsId: this.goodsId,
            alertTime: new Date().Format("yyyy-MM-dd HH:mm:ss"),
            userNo: this.$store.state.userInfo.userNo,
            userName: this.$store.state.userInfo.username,
            option: '4'
          },
        }).then((res) => {
          console.log(res);
           if (res.data.status == '1') {
              console.log('添加成功');
            }else {
              this.$toast.fail('状态信息添加失败')
            }
        })
    },
    handleAvatarSuccess(res, file) {
        this.goodsPic = URL.createObjectURL(file.raw);
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
      }
  }
}
</script>

<style>
 .addGoods .goodsPic {
   text-align: center;
   background: #467f5c;
   padding: 20% 0 10%;
}
 .addGoods .avatar-uploader .el-upload {
    border: 2px dashed #f4ce6b;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .addGoods .avatar-uploader .el-upload:hover {
    border-color: #e7695c;
  }
  .addGoods .avatar-uploader-icon {
    font-size: 28px;
    color:#fff;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .addGoods .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }
  .addGoods .button {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    width: 300px;
    padding: 10px;
    margin-top: 10px;
    border: 0;
    border-radius: 30px;
    background: #f4ce6b;
  }
</style>