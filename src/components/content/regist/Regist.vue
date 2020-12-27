<template>
    <div class="regist">
            <input type="text" placeholder="学号" id="userNo" name="userNo" v-model="userNo">
            <div class="no-msg msg">
                <div class="no-null-err err-msg" :class="[isNoNull ? 'show': 'hide']">请输入学号噢~</div>
                <div class="no-exist-err err-msg" :class="[isNoExist ? 'show': 'hide']">改用户已经存在！</div>
            </div>
            <input type="text" placeholder="姓名" id="username" name="username" v-model="username">
            <div class="name-msg msg">
                <div class="name-null-err err-msg" :class="[isNameNull ? 'show': 'hide']">请输入姓名噢~</div>
            </div>
            <input type="password" placeholder="密码" name="password" id="password" v-model="password">
            <div class="password-msg msg">
                <div class="user-null-err err-msg" :class="[isPasswordNull ? 'show': 'hide']">请输入密码噢~</div>
            </div>
            <input type="text" placeholder="宿舍楼" id="floor" name="floor" v-model="floor">
            <div class="floor-msg msg">
                <div class="user-null-err err-msg" :class="[isFloorNull ? 'show': 'hide']">请输入宿舍楼~</div>
            </div>
            <input type="text" placeholder="宿舍号" id="dormNo" name="dormNo" v-model="dormNo">
            <div class="dorm-no-msg msg">
                <div class="user-null-err err-msg" :class="[isDormNoNull ? 'show': 'hide']">请输入宿舍号~</div>
            </div>
            <input type="button" value="注册" class="button" @click="regist">
    </div>
</template>

<script>
import { request } from "network/request";
export default {
    data() {
        return {
            username: '',
            userNo: '',
            password: '',
            floor: '',
            dormNo: '',
            isNoNull: false,
            isNameNull: false,
            isPasswordNull: false,
            isFloorNull: false,
            isDormNoNull: false,
            isNoExist: false
        }
    },
    methods: {
       regist() {
           this.isNoNull = this.userNo == '' ? true : false;
           this.isNameNull = this.username == '' ? true : false;
           this.isPasswordNull = this.password == '' ? true : false;
           this.isFloorNull = this.floor == '' ? true : false;
           this.isDormNoNull = this.dormNo == '' ? true : false;
           if(!this.isNoNull && !this.isNameNull && !this.isPasswordNull && !this.isFloorNull && !this.isDormNoNull) {
               request({
                method: "post",
                url: "/regist",
                data: {
                userNo: this.userNo,
                username: this.username,
                password: this.password,
                floor: this.floor,
                dormNo : this.dormNo
                },
            }).then(res => {
                console.log(res);
                const status = res.data.status;
                if(status == 1) {
                    this.isNoExist = true;
                }else if (status == 2) {
                    console.log('失败');
                    this.$toast.fail('注册失败');
                }else {
                    console.log('成功');
                    this.$toast.success('注册成功');
                    this.$router.replace("/");
                }
            })
           }
       }
    }
}
</script>

<style scoped>
.regist {
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
.msg {
    position: absolute;
    top: 58px;
    right: 40px;
    width: 80%;
    color: #e7695c;
}
.name-msg {
    top: 138px;
}
.password-msg {
    top: 218px;
}
.floor-msg {
    top: 298px;
}
.dorm-no-msg {
    top: 378px;
}
.err-msg {
    display: none;
    position: absolute;
    top: 0;
    right: 0;
    transition: .35s;
}
.hide {
    display: none;
}
.show {
    display: block;
}
</style>