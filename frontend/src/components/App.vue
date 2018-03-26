<template>

  <el-container style="height: 100%;">
    <el-header>

        <nav-bar v-if="storage.getToken()"/>

    </el-header>
    <el-main>
      <router-view
                   element-loading-text="Loading..."
                   element-loading-spinner="el-icon-loading"
                   element-loading-background="rgba(255, 255, 255, 0.8)">
      </router-view>
    </el-main>
  </el-container>

</template>

<style>
  .el-header {
      background-color: #B3C0D1;
      color: #333;
      line-height: 60px;
  }
</style>

<script>
import NavBar from 'components/navBar';
import {storage} from '../my-axios.js';

export default {
  data() {
    return {
      storage
    }
  },
  components: {
    NavBar
  }
};
</script>
