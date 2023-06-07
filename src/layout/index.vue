<script setup lang="ts">
import Tabbar from "@/components/Tabbar/index.vue";
import NavBar from "@/components/NavBar/index.vue";
import { useCachedViewStoreHook } from "@/store/modules/cachedView";
import { useDarkMode } from "@/hooks/useToggleDarkMode";
import { computed } from "vue";
import type { ConfigProviderThemeVars } from "vant";
import { ref } from "vue";

const cachedViews = computed(() => {
  return useCachedViewStoreHook().cachedViewList;
});
const customThemeVars: ConfigProviderThemeVars = {
  tabbarBackground: "#a30000",
  tabbarItemActiveBackground: "#a30000",
  tabbarItemTextColor: "#FFFFFF",
  tabbarItemActiveColor: "#FFFFFF",
  tabbarHeight: "18vw"
};

const showNavBar = ref(false);
</script>

<template>
  <div class="app-wrapper">
    <van-config-provider
      :theme-vars="customThemeVars"
      :theme="useDarkMode() ? 'dark' : 'light'"
    >
      <nav-bar v-if="showNavBar" />
      <router-view v-slot="{ Component }">
        <keep-alive :include="cachedViews">
          <component :is="Component" />
        </keep-alive>
      </router-view>
      <tabbar />
    </van-config-provider>
  </div>
</template>

<style lang="less" scoped>
@import "@/styles/mixin.less";

.app-wrapper {
  .clearfix();
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
