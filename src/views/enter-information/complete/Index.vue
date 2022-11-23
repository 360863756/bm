<template>
  <div class="enter-info">
    <div class="enter-info__panel">
      <img src="~@/assets/images/complete-icon.png" width="68px">
      <div class="info">
        已完成所有答题，<span class="time">{{ time }}s</span>后自动返回【{{ back }}】页
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'enterInfoComplete',
  data() {
    return {
      time: 5,
      isFinal: this.$route.query.final
    };
  },
  mounted() {
    const timer = setInterval(() => {
      if (this.time > 0) {
        this.time--;
      } else {
        clearInterval(timer);
        if (this.isFinal) {
          this.$router.push({
            path: '/enter-information/login'
          });
        } else {
          this.$router.push({
            path: '/enter-information/library',
            query: {
              zfbh: this.$route.query.zfbh
            }
          });
        }
      }
    }, 1000);
  },
  computed: {
    back: function() {
      if (this.isFinal) {
        return '录入采集人信息';
      } else {
        return '选择题库';
      }
    }
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/var.scss";
.enter-info{
  width: 100%;
  height: 100%;
  background-image: url('~@/assets/images/enter_info_bg1.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  display: flex;
  justify-content: space-around;
  align-items: center;
  &__panel{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    min-width: 740px;
    height: 260px;
    background:rgba(255,255,255,0.19);
    color: $--color-white;
    img{
      flex: none;
    }
    .info{
      margin-left: 30px;
      font-size: 24px;
      line-height: 33px;
      .time{
        display: inline-block;
        width: 47px;
        height: 43px;
        background:rgba(255,255,255,0.35);
        border-radius: 10px;
        margin-left: 10px;
        margin-right: 5px;
        text-align: center;
        padding-top: 3px;
      }
    }
  }
}
</style>
