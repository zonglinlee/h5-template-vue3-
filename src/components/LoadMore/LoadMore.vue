<script setup lang="ts" name="LoadMore">
import { useEventListener, useThrottleFn } from "@vueuse/core";
import { ref } from "vue";
const loading = ref<HTMLElement>();
const emit = defineEmits(["load-more"]);
const getCssVariable = (el: HTMLElement, property: string) => {
  return getComputedStyle(el).getPropertyValue(property);
};
const computePosition = () => {
  const rects = loading.value!.getBoundingClientRect();
  const tabBar = document.querySelector("div.van-tabbar");
  const tabBarHeight = getCssVariable(tabBar! as HTMLElement, "height");

  const pageY = rects.y + document.documentElement?.scrollTop;
  const bottomScrollY =
    document.documentElement?.scrollTop +
    document.documentElement.clientHeight -
    parseFloat(tabBarHeight);
  const topScrollY =
    document.documentElement?.scrollTop + loading.value!.clientHeight;
  if (pageY < bottomScrollY && pageY > topScrollY) {
    emit("load-more");
  }
  // console.log(
  //   "fdsfsdf:",
  //   document.documentElement?.scrollHeight,
  //   document.documentElement?.scrollTop
  // );
  // console.log(tabBarHeight);
  // console.log(document.documentElement.clientHeight);
  // console.log("rects", rects);
};

const throttleComputePosition = useThrottleFn(computePosition, 30);

useEventListener(window, "scroll", throttleComputePosition);
// useEventListener(window, "scroll", computePosition);
</script>

<template>
  <div class="mx-auto my-2 text-center" ref="loading">
    <van-loading type="spinner" color="#ffffff" size="24px"
      >加载中...</van-loading
    >
  </div>
</template>
