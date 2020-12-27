<template>
  <div>
    <div class="talk-header">
      <div class="talk-user-info">
        <img :src="userPic"/>
        <span>{{userName}}</span>
      </div>
      <el-dropdown class="talk-dropdown">
        <span class="el-dropdown-link">
          <i class="iconfont icon-gengduo"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>公开论坛</el-dropdown-item>
          <el-dropdown-item>我的留言</el-dropdown-item>
          <el-dropdown-item>宿舍楼资讯</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="talk-content">
      <ul v-if="articleList.length !== 0">
        <li class="content-item" :key="index" v-for="(item, index) in articleList">
          <div class="talk-user-info">
              <img :src="item.picUrl" alt="" srcset="" />
              <span>{{item.userName}}</span>
              <span>{{item.time}}</span>
            </div>
          <div class="item-article">
            {{item.articleCont}}
          </div>
          <div class="content-operation">
            <span>点赞</span>
            <span>评论</span>
          </div>
        </li>
      </ul>
      <div class="empty" v-else>
        暂无留言
      </div>
    </div>
    <send-msg @refreshArticleList="refreshArticleList"></send-msg>
  </div>
</template>

<script>
import sendMsg from "components/content/sendMsg/SendMsg";
import { request } from "network/request";
export default {
  data() {
    return {
      userName: this.$store.state.userInfo.username,
      userPic: this.$store.state.userInfo.picUrl,
      dormBuilding: this.$store.state.userInfo.dormBuilding,
      dormNo: this.$store.state.userInfo.dormNo,
      articleList: []
    }
  },
  components: {
    sendMsg,
  },
  created() {
    if(this.userPic == null) {
      this.userPic = '~assets/images/touxiang.jpg';
    }
    this.selectAllArticle();
  },
  methods: {
    selectAllArticle() {
      console.log(this.dormBuilding);
      console.log(this.dormNo);
      request({
        method: "post",
        url: "/articles",
        data: {
          dormBuilding: this.dormBuilding,
          dormNo: this.dormNo,
        },
      }).then((res) => {
        if(res.data.status == 1) {
          this.articleList = res.data.list;
        }else {
          this.articleList = [];
        }
        console.log(this.articleList);
      });
    },
    refreshArticleList() {
      this.selectAllArticle();
    }
  }
};
</script>

<style scoped>
.talk-header {
  position: relative;
  background: #e7695c;
  margin: 10px;
  padding: 10px;
  border-radius: 15px;
  color: #fff;
}
.talk-user-info img {
  height: 30px;
  width: 30px;
  vertical-align: middle;
  border-radius: 50%;
  border: 2px solid #fff;
}
.talk-user-info span {
  margin-left: 5px;
  font-size: 16px;
}
.talk-dropdown {
  position: absolute;
  right: 10px;
  top: 19px;
  font-size: 16px;
  color: #fff;
}
.talk-dropdown .el-dropdown-link i {
  margin-right: 15px;
}
.talk-content ul {
  width: 100%;
  padding: 10px;
}
.talk-content .content-item {
  width: 100%;
  list-style: none;
  padding: 10px;
  border-bottom: 1px solid #f4ce6b;
}
.talk-content .content-item .item-article {
  padding: 15px 5px;
  border-radius: 6px;
}
.talk-content .content-item .content-operation {
  text-align: right;
  margin-top: 10px;
}
.talk-content .content-item .content-operation span {
  padding: 5px;
}
</style>