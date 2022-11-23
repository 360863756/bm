<template>
  <div class="c-notification">
    <el-popover
      placement="bottom-end"
      width="150"
      transition="el-collapse-transition"
      popper-class="c-notification__popper"
      :visible-arrow="false"
      trigger="click"
    >
      <legend class="c-notification__legend">消息</legend>
      <ul class="c-notification__list">
          <li
            class="c-notification__list-item"
            v-for="item in listrRoutes"
            :key="item.id"
          >
            <router-link :to="item.to" :title="item.title">{{ item.title }}</router-link>
          </li>
      </ul>
      <el-badge
        slot="reference"
        :value="unreadCount"
        class="c-notification__badge-icon"
      >
        <span class="el-icon-message-solid"></span>
      </el-badge>
    </el-popover>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
    };
  },
  computed: {
    listrRoutes() {
      return this.list.map((item) => {
        const {
          type,
          id,
        } = item;
        const query = {
          id,
        };
        const {
          APPROVAL,
          NOTIFICATION,
        } = this.$const.app.MESSAGE_TYPE;
        if (type === APPROVAL.value) {
          return {
            ...item,
            to: {
              path: '/mail/sending-receiving-center/approval-detail',
              query,
            },
          };
        } else if (type === NOTIFICATION.value) {
          return {
            ...item,
            to: {
              path: '/mail/sending-receiving-center/notice/notice-detail',
              query,
            },
          };
        }
      }).filter(({ to }) => !!to);
    },
    unreadCount() {
      return this.listrRoutes.filter(({ unread }) => unread).length;
    },
  },
  created() {
    this.fetchNotifications();
    this.setTimer();
  },
  destroyed() {
    this.timer && clearInterval(this.timer);
  },
  methods: {
    setTimer() {
      this.timer && clearInterval(this.timer);
      this.timer = setInterval(this.fetchNotifications, 30 * 1000);
    },
    async fetchNotifications() {
      // const { errcode, data } = await this.$api.app.fetchNotifications();
      // if (errcode === 0) {
      //   this.list = data.content || [];
      // }
    },
  }
};
</script>

<style lang="scss">
@import "@/style/var.scss";

.c-notification {
  color: $--color-text-primary;
  &__badge-icon {
    cursor: pointer;
    color: $--color-white;
  }
  &__legend {
    padding: 0 20px;
    line-height: 52px;
  }
  &__list-item {
    padding: 0 20px;
    border-top: $--border-base;
    line-height: 48px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    &:hover {
      color: $--color-primary;
    }
    a {
      color: inherit;
      text-decoration: none;
    }
  }
  .el-icon-message-solid {
    font-size: 18px;
    color: #fff;
  }
}
</style>
