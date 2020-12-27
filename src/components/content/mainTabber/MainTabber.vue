<template>
    <div>
        <tabber>
            <tabber-item path='/main/talk' activeColor="#310f1b">
                <!-- <img src="~assets/images/tabbar/taolun.png" alt=""> -->
                <i class="iconfont icon-taolunqu" slot="item-icon" ></i>
                <div slot="item-text">讨论</div>
            </tabber-item>
            <tabber-item path='/main/roommates' activeColor="#310f1b">
                <i class="iconfont icon-renwu-tuandui" slot="item-icon" ></i>
                <div slot="item-text">舍友</div>
            </tabber-item>
            <tabber-item path='/main/goods' activeColor="#310f1b">
                <i class="iconfont icon-wp-da" slot="item-icon" ></i>
                <div slot="item-text">共用物品</div>
            </tabber-item>
            <tabber-item path='/main/mine' activeColor="#310f1b">
                <i class="iconfont icon-wode" slot="item-icon" ></i>
                <div slot="item-text">我的</div>
            </tabber-item>
        </tabber>
    </div>
</template>

<script>
import Tabber from 'components/common/tabber/Tabber'
import TabberItem from 'components/common/tabber/TabberItem'
export default {
    components: {
        Tabber,
        TabberItem        
    }
}
</script>

<style scoped>

</style>