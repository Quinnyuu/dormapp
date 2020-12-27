<template>
  <div class="goods">
    <div class="goods-top">
      <div class="goods-img">
        <img src="../../assets/images/goods.svg" alt="" srcset="">
      </div>
      <div class="goods-title">
        <span>{{dormBuilding}} {{dormNo}}的私有小物</span>
        <div class="add" @click="addGoods">
          添加<i class="iconfont icon-sunhuaijilu"></i>
        </div>
      </div>
    </div>
    <div class="goods-list">
      <van-tabs v-model="active" @change="tabChange">
        <van-tab title="所有">
          <el-row :gutter="10">
            <el-col :span="12" :key="index" v-for="(item, index) in goodsList">
              <div class="grid-content" @click="goodsClick(item.goodsId)">
                <img src="~assets/images/touxiang.jpg" alt="" />
                <div class="goods-name">{{ item.goodsName }}</div>
                <div class="goods-count">数量：{{ item.goodsCount }}</div>
                <div class="goods-status">
                  <div class="used" v-if="item.goodsStatus == 0">正在使用</div>
                  <div class="not-used" v-else-if="item.goodsStatus == 1">
                    未使用
                  </div>
                  <div class="lack" v-else-if="item.goodsStatus == 2">
                    库存不足
                  </div>
                  <div class="broken" v-else>已损坏</div>
                </div>
              </div>
            </el-col>
          </el-row>
        </van-tab>
        <van-tab title="未使用">
          <el-row :gutter="10">
            <el-col :span="12" :key="index" v-for="(item, index) in goodsList">
              <div class="grid-content"  @click="goodsClick(item.goodsId)">
                <img src="~assets/images/touxiang.jpg" alt="" />
                <div class="goods-name">{{ item.goodsName }}</div>
                <div class="goods-count">数量：{{ item.goodsCount }}</div>
              </div>
            </el-col>
          </el-row>
        </van-tab>
        <van-tab title="使用中">
          <el-row :gutter="10">
            <el-col :span="12" :key="index" v-for="(item, index) in goodsList">
              <div class="grid-content"  @click="goodsClick(item.goodsId)">
                <img src="~assets/images/touxiang.jpg" alt="" />
                <div class="goods-name">{{ item.goodsName }}</div>
                <div class="goods-count">数量：{{ item.goodsCount }}</div>
              </div>
            </el-col>
          </el-row>
        </van-tab>
        <van-tab title="库存不足">
          <el-row :gutter="10">
            <el-col :span="12" :key="index" v-for="(item, index) in goodsList">
              <div class="grid-content"  @click="goodsClick(item.goodsId)">
                <img src="~assets/images/touxiang.jpg" alt="" />
                <div class="goods-name">{{ item.goodsName }}</div>
                <div class="goods-count">数量：{{ item.goodsCount }}</div>
              </div>
            </el-col>
          </el-row>
        </van-tab>
        <van-tab title="已损坏">
          <el-row :gutter="10">
            <el-col :span="12" :key="index" v-for="(item, index) in goodsList">
              <div class="grid-content"  @click="goodsClick(item.goodsId)">
                <img src="~assets/images/touxiang.jpg" alt="" />
                <div class="goods-name">{{ item.goodsName }}</div>
                <div class="goods-count">数量：{{ item.goodsCount }}</div>
              </div>
            </el-col>
          </el-row>
        </van-tab>
      </van-tabs>
      <div class="empty" v-if="isEmpty">空空如也</div>
    </div>
    <van-overlay :show="detailShow">
      <div class="wrapper">
        <div class="block">
          <goods-detail :currentGoodsId="currentGoodsId" @closeEdit="closeEdit"></goods-detail>
        </div>
        <div class="close" @click="closeEdit"></div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import GoodsDetail from "./child/GoodsDetail";
import { request } from "network/request";
export default {
  data() {
    return {
      active: 0,
      detailShow: false,
      currentGoodsId: '',
      dormBuilding: this.$store.state.userInfo.dormBuilding,
      dormNo: this.$store.state.userInfo.dormNo,
      goodsList: [],
      isEmpty: true,
    };
  },
  methods: {
    goodsClick(id) {
      this.currentGoodsId = id;
      this.detailShow = true;
    },
    closeEdit(){
      this.detailShow = false;
      this.selectAllGoods();
    },
    selectAllGoods() {
      request({
        method: "post",
        url: "/goodslist",
        data: {
          dormBuilding: this.dormBuilding,
          dormNo: this.dormNo,
        },
      }).then((res) => {
        if(res.data.status == 1) {
          this.goodsList = res.data.list;
          this.isEmpty = false
        }else {
          this.goodsList = [];
          this.isEmpty = true
        }
      });
    },
    selectSomeGoods() {
      request({
        method: "post",
        url: "/goodslist",
        data: {
          dormBuilding: this.dormBuilding,
          dormNo: this.dormNo,
          goodsStatus: (this.active - 1).toString()
        },
      }).then((res) => {
        console.log(res);
        if(res.data.status == 1) {
          this.goodsList = res.data.list;
          this.isEmpty = false
        }else {
          this.goodsList = [];
          this.isEmpty = true
        }
      });
    },
    addGoods() { // 跳转到添加物品页面
      this.$router.replace('/main/addGoods');
    },
    tabChange() {
      if(this.active == 0) {
        this.selectAllGoods();
      }else {
        this.selectSomeGoods()
      }
    }
  },
  components: {
    GoodsDetail,
  },
  created() {
    this.selectAllGoods();
  }
};
</script>

<style scoped>
.goods-top {
  display: flex;
  height: 150px;
}
.goods-top .goods-img img {
  width: 150px;
}
.goods-top .goods-title {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 23px;
  font-weight: 700;
}
.goods-top .goods-title .add {
  margin-top: 10px;
  width: 110px;
  font-size: 16px;
  font-weight: 400;
  background: #f4ce6b;
  text-align: center;
  padding: 3px 0;
  border-radius: 6px;
  color: #fff;
}
.goods-top .goods-title .add i {
  margin-left: 5px;
}
.goods-list {
  padding: 10px;
}
.goods-list .grid-content {
  background: #f4ce6b;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 10px;
  border: 1px solid #f4ce6b;
  border-radius: 6px;
  background: #fff;
}
.goods-list img {
  width: 120px;
  height: 120px;
  object-fit: cover;
}
.goods-list .goods-name {
  padding: 10px 0;
}
.goods-list .goods-count {
  margin-bottom: 10px;
}
.goods-list .goods-status {
  position: relative;
  width: 100%;
  height: 30px;
}
.goods-list .goods-status div {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  text-align: center;
  height: 30px;
  line-height: 30px;
  border-radius: 6px;
  color: #fff;
}
.goods-list .goods-status div.used {
  background: #8a8a8a;
}
.goods-list .goods-status div.not-used {
  background: #386e4c;
}
.goods-list .goods-status div.lack {
  background: #f4ce6b;
}
.goods-list .goods-status div.broken {
  background: #e7695c;
}
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  overflow: auto;
}
.block {
  width: 80%;
  height: 80%;
  background-color: #fff;
  border-radius: 6px;
  overflow: auto;
}
.close {
  width: 50px;
  height: 50px;
  margin-top: 10px;
  border-radius: 50%;
  background: #f4ce6b;
}
</style>
<style>
.goods-list .el-row {
  margin-top: 10px;
}
</style>