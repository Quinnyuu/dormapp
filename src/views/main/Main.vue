<template>
    <div>
      <router-view></router-view>
      <main-tabber></main-tabber>
    </div>
</template>

<script>
import MainTabber from 'components/content/mainTabber/MainTabber'
export default {
  components: {
    MainTabber
  }
}
</script>

<style scoped>

</style>