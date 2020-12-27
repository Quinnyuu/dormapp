<template>
    <div id="tabber-bar">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
 #tabber-bar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    height: 70px;
    border-radius: 30px 30px 0 0;
    background:#467f5c;
  }
</style>