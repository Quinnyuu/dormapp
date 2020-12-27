<template>
  <div class="goods-box">
    <div class="options">
      <div class="title">详细信息</div>
      <van-button v-if="isEdit" class="edit" color="#f4ce6b" @click="editInfo">保存</van-button>
      <van-button v-else class="edit" color="#f4ce6b" @click="editDisplay">编辑</van-button>
      <van-button class="delete" color="#e7695c" @click="deleteGoods">删除</van-button>
    </div>
    <div class="goods-card">
      <div class="goods-pic">
        <img :src="cGoods.goodsPic" alt="" />
      </div>
      <div class="good-info">
        <div class="goods-name">
          <input v-if="isEdit" type="text" v-model="goodsName">
          <span v-else>{{cGoods.goodsName}}</span>
        </div>
        <div class="goods-count">数量：
          <van-stepper v-if="isEdit" v-model="goodsCount" class="stepper" />
          <span>{{cGoods.goodsCount}}</span>
          </div>
        <div class="goods-status">
          状态：
          <span v-if="cGoods.goodsStatus == '0'" class="used">使用中</span>
          <span v-else-if="cGoods.goodsStatus == '1'" class="not-used"
            >未使用</span
          >
          <span v-else-if="cGoods.goodsStatus == '2'">库存不足</span>
          <span v-else class="broken">已损坏</span>
        </div>
        <i v-if="isEdit" class="iconfont icon-dianzan" @click="pickerDialog = true"></i>
        <van-popup
          v-model="pickerDialog"
          position="bottom"
          :style="{ height: '40%' }"
        >
          <van-picker
            title="状态选择"
            show-toolbar
            :columns="columns"
            @confirm="onConfirm"
            @cancel="onCancel"
          />
        </van-popup>
      </div>
      <div class="goods-detail">描述：
        <textarea v-if="isEdit" v-model="goodsDetail"></textarea>
        <span>{{ cGoods.goodsDetail }}</span>
      </div>
    </div>
    <el-timeline>
      <el-timeline-item
        v-for="(activity, index) in activities"
        :key="index"
        :color="activity.color"
        :timestamp="activity.timestamp"
        placement="top"
      >
        {{ activity.content }}
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
import { request } from "network/request";
export default {
  props: {
    currentGoodsId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      cGoodsId: '',
      cGoods: {}, // 当前物品信息
      activities: [], // 时间轴中的信息
      pickerDialog: false, // 状态选择框
      isEdit: false, // 是否处于编辑状态
      goodsCount: null, // 修改框中的物品数量
      goodsName: null, // 修改框中的物品名
      goodsDetail: null, // 修改框中的物品详细
      goodsStatus: null, // 原先的状态
      option: null,
      editDetail: null,
      columns: ['使用中','未使用','库存不足','已损坏']
    };
  },
  methods: {
    selectGoods() { // 获取物品信息
      request({
          method: "post",
          url: "/goodslist",
          data: {
            goodsId: this.cGoodsId,
          },
        }).then((res) => {
          if(res.data.status == 1) {
            if(res.data.list){
              this.cGoods = res.data.list[0];
              this.goodsName = this.cGoods.goodsName ? this.cGoods.goodsName: '';
              this.goodsStatus = this.cGoods.goodsStatus ? this.cGoods.goodsStatus: '0';
              this.goodsCount = this.cGoods.goodsCount ? this.cGoods.goodsCount: 1;
              this.goodsDetail = this.cGoods.goodsDetail ? this.cGoods.goodsDetail: '';
            }
          }
        })
    },
    selectGoodsDetail() { // 获取物品状态信息
      this.activities = [];
      if (this.currentGoodsId) {
        request({
          method: "post",
          url: "/goodsDetail",
          data: {
            goodsId: this.cGoodsId,
          },
        }).then((res) => {
          const status = res.data.status;
          if (status == 1) {
            res.data.list.forEach((item, index) => {
              let content = item.username + ' '; 
              let color = '';
              switch(item.option) {
                case '0': content += '添加了此物品' + item.detail +'件库存';color="#386e4c";break;
                case '1': content += '减少了此物品' + item.detail +'件库存';color="#e7695c";break;
                case '2': 
                  content += '将此物品的状态修改为';
                  if (item.detail == '0') {
                    content += '使用中'
                  }else if (item.detail == '1') {
                    content += '未使用'
                  }else if (item.detail == '2') {
                    content += '库存不足'
                  }else {
                    content += '已损坏'
                  };
                  color='#f4ce6b';
                  break;
                case '3': content += '修改了此物品的相关信息';color='#467f5c';break;
                case '4': content += '为小屋添加了此物品'
              }
              this.activities.push({content: content, timestamp: item.alertTime, color: color});
            });
          } else {
            this.activities = [];
          }
        });
      }
    },
    deleteGoods() { // 删除物品
      this.$dialog.confirm({
        title: "提示",
        message: "是否删除该物品？",
      })
        .then(() => {
          request({
            method: "get",
            url: "/deletegoods",
            params: {
              goodsId: this.cGoodsId,
            },
          }).then((res) => {
            if (res.data.status == '1') {
              this.$toast.success(res.data.msg)
              this.$emit('closeEdit')
            }else {
              this.$toast.fail(res.data.msg)
            }
          })
        })
        .catch(() => {
        });
    },
    onConfirm(value, index) { // 状态改变
      this.pickerDialog = false;
      this.cGoods.goodsStatus = index.toString();
      this.editDetail = index.toString();
    },
    onCancel() {
      this.pickerDialog = false;
    },
    editDisplay() { // 进入编辑状态
      this.isEdit = true;
    },
    editInfo() {
      this.cGoods.goodsDetail = this.cGoods.goodsDetail ? this.cGoods.goodsDetail : ''
      if( this.goodsName == this.cGoods.goodsName &&
        this.goodsCount == this.cGoods.goodsCount && 
        this.goodsDetail == this.cGoods.goodsDetail &&
        this.goodsStatus == this.cGoods.goodsStatus ) {
          console.log(444);
          this.isEdit = false;
          return;
        }
        request({
          method: "post",
          url: "/upateGoodsInfo",
          data: {
            goodsId: this.cGoodsId,
            goodsName: this.goodsName,
            goodsCount: this.goodsCount,
            goodsStatus: this.cGoods.goodsStatus,
            goodsDetail: this.goodsDetail,
          },
        }).then((res) => {
          if (res.data.status == 1) {
              this.isEdit = false;
              this.$toast.success(res.data.msg);
              console.log(this.goodsDetail, this.cGoods.goodsDetail);
              if(this.goodsName != this.cGoods.goodsName || this.goodsDetail != this.cGoods.goodsDetail) {
                console.log(111);
                this.option = '3';
                this.addGoodsStatus(); // 编辑信息同时添加状态
              }
              if (this.goodsStatus != this.cGoods.goodsStatus) {
                console.log(222);
                this.option = '2';
                this.addGoodsStatus(); 
              }
              if (this.goodsCount != this.cGoods.goodsCount) {
                console.log(333);
                this.option = this.goodsCount > this.cGoods.goodsCount ? '0' : '1';
                console.log(this.option);
                this.editDetail = Math.abs(parseInt(this.goodsCount) - parseInt(this.cGoods.goodsCount));
                this.addGoodsStatus(); 
              }
              this.selectGoods();
              this.selectGoodsDetail();
            }else {
              this.$toast.fail(res.data.msg)
            }
        })
    },
    addGoodsStatus() { // 添加状态信息
    console.log('add');
    console.log(this.option);
      request({
          method: "post",
          url: "/addGoodsStatus",
          data: {
            goodsStatusId: new Date().getTime(),
            goodsId: this.cGoodsId,
            alertTime: new Date().Format("yyyy-MM-dd HH:mm:ss"),
            userNo: this.$store.state.userInfo.userNo,
            userName: this.$store.state.userInfo.username,
            option: this.option,
            detail: this.editDetail,
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
  },
  created() {
    this.selectGoods();
    this.selectGoodsDetail();
  },
  watch: {
    currentGoodsId: function (newVal, oldVal) {
      this.cGoodsId = newVal;
      this.selectGoods();
      this.selectGoodsDetail();
    },
  },
};
</script>

<style scoped>
.goods-box {
  padding: 20px;
}
.options {
  display: flex;
}
.options .title {
  flex: 1;
  font-size: 22px;
  font-weight: 600;
  padding-bottom: 20px;
}
.options .edit,
.options .delete {
  padding: 0 10px;
  margin-right: 5px;
  height: 25px;
  line-height: 25px;
  border-radius: 6px;
}
.goods-card {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 200px;
  padding: 10px;
  background: #ececece8;
  border-radius: 6px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.26);
  color: #333;
  margin-bottom: 30px;
}
.goods-card .goods-pic {
  width: 100px;
  height: 100px;
}
.goods-card img {
  width: 100px;
  height: 100px;
  border-radius: 6px;
  margin-right: 10px;
}
.goods-card .good-info {
  width: 140px;
  padding-left: 5px;
  height: 100px;
}
.goods-card .good-info > div {
  line-height: 30px;
}
.goods-card .good-info .goods-name {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
}
.goods-card .good-info .goods-name input {
  width: 100%;
  border-radius: 3px;
  border: 1px solid #467f5c;
  padding: 3px;
  font-weight: 400;
  outline: none;
}
.goods-count {
  position: relative;
}
.goods-count .van-stepper {
  position: absolute;
  top: -2px;
  right: 0;
  width: 70%;
}
.goods-detail {
  position: relative;
  width: 100%;
}
.goods-detail textarea {
  position: absolute;
  top: -4px;
  width: 80%;
  border-radius: 3px;
  border: 1px solid #467f5c;
  padding: 3px;
  outline: none;
}
.goods-status > span {
  position: relative;
  padding-left: 10px;
}
.goods-status > span::before {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: -5px;
  content: "";
  display: block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #f4ce6b;
}
.goods-status .not-used::before {
  background: #386e4c;
}
.goods-status .broken::before {
  background: #e7695c;
}
.goods-status .used::before {
  background: #8a8a8a;
}
.goods-box .van-picker {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
}
</style>