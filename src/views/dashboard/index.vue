<!--
 * @Author: Rex Joush
 * @Date: 2021-08-11 15:19:50
 * @LastEditors: Rex Joush
 * @LastEditTime: 2022-01-07 21:09:13
-->
<template>
  <div class="main">
    <el-container>
      <el-header>
        <h1>欢迎使用科研成果收集系统</h1>
      </el-header>
      <el-main>
        <img style="position: relative; top: 50px" src="@/assets/nwu2.png" alt="西北大学">
      </el-main>
      <el-footer style="font-size: 16px">
        <b>版本 v1.0.0</b><br>
        <b>最终解释权归研究生院所有 </b><br>
        <p>© 2021 - <span>{{ year }}</span> | <a href="https://www.nwu.edu.cn/tzgg/xxhc_wlhsjzx_.htm" target="_blank" style="text-decoration: underline">西北大学网络和数据中心</a> | <a href="https://yjs.nwu.edu.cn/" target="_blank" style="text-decoration: underline">西北大学研究生院</a></p>
      </el-footer>
    </el-container>
  </div>
</template>

<script>

export default {
  name: 'Dashboard',

  data() {
    return {
      year: new Date().getFullYear()
    }
  },

  created() {

  }
}
</script>

<style scoped>
body > .el-container {
  margin-bottom: 40px;
}
.el-main {
  color: #333;
  text-align: center;
  line-height: 160px;
}
.el-header, .el-footer {
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

footer {
  text-align: center;
  position: relative;
  top: 50px;
}

footer p {
  margin: 0;
  color: #999;
}
</style>
