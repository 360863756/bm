<template>
  <div class="enter-information__login">
      <div class="enter-information__title">
      </div>
    <div class="enter-information__box">
      <div class="enter-information__box-form">
        <information-form />
      </div>
    </div>
  </div>
</template>
<script>
import InformationForm from './components/InformationForm.vue';
export default {
  name: 'InputInformationLogin',
  components: {
    InformationForm
  },
  data() {
    return {

    };
  }
};

</script>
<style lang="scss" scoped>
  @import "@/style/var.scss";
.enter-information{
    &__login {
    height: 100%;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    background:$--enterInformation-background url('~@/assets/images/enterInformationLogin.png');
    background-size: 100% 100%;
    background-position: center;
  }

  &__box {
    width: 100%;
    height: 67%;
    background: url('~@/assets/images/enterInformationFooter.png') no-repeat;
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__title {
    height: 33%;
    width: 100%;
    background: url('~@/assets/images/enterInformationHeader.png') no-repeat;
    background-size: 440px 47px;
    background-position: center bottom 84px;
  }

  &__box-form {
    position: relative;
    width: 624px;
    background: $--enterInformation-form-color;
  }

}
</style>
