<template>
  <div class="navbar">
    <!-- 左侧折叠按钮 -->
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <!-- 面包屑： <breadcrumb class="breadcrumb-container" /> -->
    <!-- 公司名称 -->
    <div class="app-breadcrumb">
      河北工程技术学院
      <span class="breadBtn">体验版</span>
    </div>
    <!-- 右侧头像 -->
    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <!-- <img :src="$store.state.user.userInfo.staffphoto" class="user-avatar"> -->
          <img src="@/assets/common/bigUserHeader.png" class="user-avatar">
          <span class="name">{{ $store.state.user.userInfo.username }}</span>
          <i class="el-icon-caret-bottom" style="color:#fff" />
        </div>

        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              主页
            </el-dropdown-item>
          </router-link>
          <a target="_blank" href="https://github.com/PanJiaChen/vue-admin-template/">
            <el-dropdown-item>Github</el-dropdown-item>
          </a>
          <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
            <el-dropdown-item>项目地址</el-dropdown-item>
          </a>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

// 面包屑组件
// import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    // Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      // 退出登录弹窗确认
      this.$confirm('你确定要退出吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await this.$store.dispatch('user/logout')
        /**
         * $route.path:只有路径的信息
         * $route.fullPath:路径+查询参数的信息
         * encodeURIComponent:是js内置api，用来对url进行编码
         */
        // this.$route.query.return_url = this.$route.fullPath
        this.$router.push('/login?return_url=' + this.$route.fullPath)
        // console.log(this.$route)
      }).catch(() => {

      })
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  // background: #fff;
  background: -webkit-linear-gradient(left, #3d6df8, #5b8cff);
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  // 公司名称样式
  .app-breadcrumb{
    display: inline-block;
    font-size: 18px;
    line-height: 50px;
    margin-left: 10px;
    color: #fff;
    cursor: text;
    .breadBtn{
      display: inline-block;
      background: #84a9fe;
      font-size: 14px;
      padding: 0 10px;
      height: 30px;
      line-height: 30px;
      margin-left: 15px;
      border-radius: 10px;
    }
  }

  // 面包屑样式
  // .breadcrumb-container {
  //   float: left;
  // }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      // 右侧头像样式
      .avatar-wrapper {
        // margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 30px;
          height: 30px;
          border-radius: 15px;
          vertical-align: middle;
        }
        .name{
          color: #fff;
          vertical-align: middle;
          margin-left: 5px;
          cursor: pointer;
        }
        .user-dropdown{
          color: #fff;
        }
        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 20px;
          font-size: 12px;
        }
      }
    }
  }

}
</style>
