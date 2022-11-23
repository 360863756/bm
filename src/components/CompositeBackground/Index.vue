<template>
  <div class="c-composite-backgroud" :style="style">
    <img class="c-composite-backgroud__image" :src="APP_BACKGROUND" alt="" srcset="">
  </div>
</template>

<script>
import Color from 'color';
import { APP_BACKGROUND } from '@/constant/app';
import CSSVariables from '@/style/var.scss';
export default {
  data() {
    return {
      APP_BACKGROUND,
    };
  },
  computed: {
    style() {
      const {
        colorWhite,
        colorPrimary,
        appBackgroundThemeMaskAlpha,
      } = CSSVariables || {};
      const colorPrimaryRGBA = Color(colorPrimary).rgb().alpha(appBackgroundThemeMaskAlpha);
      const colorWhiteRGB = Color(colorWhite).rgb();
      const style = {
        backgroundImage: `
          linear-gradient(to bottom, ${colorWhiteRGB.alpha(0).toString()} 0%, ${colorWhiteRGB.toString()} 91%, ${colorWhiteRGB.toString()} 100%),
          linear-gradient(to bottom, ${colorPrimaryRGBA.toString()}, ${colorPrimaryRGBA.toString()}),
          url(${APP_BACKGROUND})
        `
      };
      return style;
    },
  },
};
</script>

<style lang="scss">
@import "@/style/var.scss";

.c-composite-backgroud {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: -1;
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-attachment: fixed;
  font-size: 0;
  &__image {
    width: 100%;
    opacity: 0;
  }
}
</style>
