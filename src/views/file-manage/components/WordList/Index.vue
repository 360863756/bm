<template>
 <div class="c-wordlist-content">
     <div v-for="item in list" :key="item" @click="handleClik(item)" :class="current === item? 'active': ''">
         {{ item }}
     </div>
 </div>
</template>

<script>

export default {
  name: 'WordList',
  inheritAttrs: false,
  components: {
  },
  props: {
    defaultValue: String
  },
  data() {
    return {
      current: this.defaultValue || '',
    };
  },
  computed: {
    list: function() {
      var str = [];
      for (var i = 65; i < 91; i++) {
        str.push(String.fromCharCode(i));
      }
      return str;
    }
  },
  methods: {
    handleClik(item) {
      if (this.current === item) {
        this.current = '';
      } else {
        this.current = item;
      }
      this.$emit('change', this.current);
    }
  }
};
</script>

<style lang="scss">
@import "@/style/var.scss";
.c-wordlist-content{
    width: 100%;
    display: flex;
    justify-content: space-around;
    div{
        cursor: pointer;
        font-size:20px;
        line-height:39px;
        color: $--color-text-regular;
    }
    .active{
        color:$--color-primary;
    }
}
</style>
