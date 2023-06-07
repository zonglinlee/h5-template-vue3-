<script setup lang="ts" name="LoadMore">
import { useEventListener, useThrottleFn } from "@vueuse/core";
import { ref } from "vue";
const loading = ref<HTMLElement>();
const emit = defineEmits(["load-more"]);
// const getCssVariable = (el: HTMLElement, property: string) => {
//   return getComputedStyle(el).getPropertyValue(property);
// };
const computePosition = () => {
  console.log("computePosition");
  const rects = loading.value!.getBoundingClientRect();
  // const tabBar = document.querySelector("div.van-tabbar");
  // const tabBarHeight = getCssVariable(tabBar! as HTMLElement, "height");
  const pageY = rects.y + document.documentElement?.scrollTop;
  const bottomScrollY =
    document.documentElement?.scrollTop + document.documentElement.clientHeight;
  // - parseFloat(tabBarHeight)
  const topScrollY =
    document.documentElement?.scrollTop + loading.value!.clientHeight;
  if (pageY < bottomScrollY && pageY > topScrollY) {
    emit("load-more");
  }
  // console.log(
  //   topScrollY,
  //   bottomScrollY,
  //   pageY,
  //   tabBarHeight,
  //   tabBar?.clientHeight
  // );
  // console.log("tabBarHeight:", tabBarHeight);
  // console.log(
  //   "rects",
  //   rects.y,
  //   document.documentElement?.scrollTop,
  //   document.documentElement.clientHeight,
  //   loading.value!.clientHeight
  // );
};

const throttleComputePosition = useThrottleFn(computePosition, 50);

useEventListener(window, "scroll", throttleComputePosition, { passive: true });
// useEventListener(window, "scroll", computePosition);
</script>

<template>
  <div class="py-2 mx-auto text-center" ref="loading">
    <van-loading type="spinner" color="#ffffff" size="24px"
      >加载中...</van-loading
    >
  </div>
</template>
