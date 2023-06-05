<template>
  <van-tabbar v-model="active" :placeholder="true" :route="true" fixed>
    <van-tabbar-item
      v-for="(item, index) in tabbarData"
      :key="index"
      :icon="item.icon"
      :to="item.to"
    >
      {{ item.title }}
    </van-tabbar-item>
  </van-tabbar>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import homeIcon from "@/assets/images/red/home_icon.png";
import rankIcon from "@/assets/images/red/rank_icon.png";

const active = ref(0);
const tabbarData = reactive([
  {
    icon: homeIcon,
    title: "首页",
    to: {
      name: "Home"
    }
  },
  {
    icon: rankIcon,
    title: "排行榜",
    to: {
      name: "Ranks"
    }
  }
]);
</script>

<style lang="less" scoped></style>
