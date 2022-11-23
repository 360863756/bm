<template>
  <div class="c-profile">
    <el-dropdown
      v-if="settingMenus && settingMenus.length"
      placement="bottom-end"
      trigger="click"
      @command="handleCommand"
    >
      <div class="c-profile__layout">
          <i class="el-icon-arrow-down"></i>
          <el-avatar class="c-profile__avater" :size="38" :src="userInfo && userInfo.img">
            <img src="@/assets/images/AvatarRight.png" />
          </el-avatar>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          class="c-profile__dropdown-item"
          v-for="item in settingMenus"
          :key="item.path"
          :command="item.path"
        >{{ item.title }}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-avatar v-else :size="38" :src="userInfo && userInfo.img">
      <img src="@/assets/images/default-avatar.png" />
    </el-avatar>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapGetters } = createNamespacedHelpers('app');

export default {
  computed: {
    ...mapGetters(['userInfo', 'normalizedMenus']),
    settingMenus() {
      const settingMenu = this.normalizedMenus.filter(({ config }) => {
        return config && config.isAvatarModule;
      });
      if (settingMenu) {
        return [
          ...settingMenu
            .reduce((acc, { children }) => {
              // 扁平化菜单
              return Array.isArray(children) ? [...acc, ...children] : acc;
            }, [])
            .filter(({ hidden }) => !hidden), // 筛选非隐藏菜单
          { title: '退出登录', path: '/login' }
        ];
      }
      return [];
    }
  },
  methods: {
    handleCommand(command) {
      command &&
        this.$router.push({
          path: command
        });
    }
  }
};
</script>

<style lang="scss">
.c-profile {
  &__avater {
    cursor: pointer;
  }
  &__dropdown-item {
    width: 180px;
  }
  .el-icon-arrow-down {
    color: #fff;
  }
  &__layout {
    display: flex;
    align-items: center;
  }
  .el-icon-arrow-down {
    margin-right: 10px;
    font-weight: 800;
  }
}
</style>
