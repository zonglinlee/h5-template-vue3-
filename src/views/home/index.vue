<script setup lang="ts" name="Home">
import introductionBg from "@/assets/images/red/introduction_bg.png";
import type { wechatUserInfo } from "@/utils/wechat";
import LoadMore from "@/components/LoadMore/LoadMore.vue";
import {
  saveUserInfo,
  sendAuthCodeToCallbackServer,
  openWechatAccessPage,
  getUserInfo,
  isWeChatEnv
} from "@/utils/wechat";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { showDialog } from "vant";
import "vant/es/dialog/style";
const router = useRouter();
const route = useRoute();
const keyword = ref("");
const searchKeyword = () => {};
type driverType = {
  no: number;
  avatar: string;
  name: string;
  company: string;
  voteNum: number;
  id: number;
};
const itemInit: driverType = {
  no: 1,
  avatar: "",
  name: "张三李四",
  company: "~~张三李四运输有限责任公司~~",
  voteNum: 55,
  id: 1
};
let defaultDriverLists = new Array(10).fill({ ...itemInit });
defaultDriverLists = defaultDriverLists.map((item, index) => {
  const newItem = { ...item };
  newItem.id = index + 1;
  newItem.voteNum = 123 * (index + 1);
  newItem.name = "张三李四" + index;
  return newItem;
});

const pageData = ref({ pageNo: 1, pageSize: 10, total: 35 });
const driverLists = ref(defaultDriverLists);
const loadingData = ref(false);
const getDriverList = async () => {
  console.log("load more");
  if (loadingData.value) return;
  loadingData.value = true;
  pageData.value.pageNo += 1;
  const increment = (pageData.value.pageNo - 1) * pageData.value.pageSize;
  let newArr = new Array(10).fill({
    no: 1,
    avatar: "",
    name: "张三李四",
    company: "~~张三李四运输有限责任公司~~",
    voteNum: 55,
    id: 1
  });
  newArr = newArr.map((item, index) => {
    const newItem = { ...item };
    newItem.id = index + 1 + increment;
    newItem.voteNum = 123 * (index + 1) + increment;
    newItem.name = "张三李四" + (increment + index);
    return newItem;
  });

  const delay = new Promise<void>(resolve => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
  await delay;
  driverLists.value = [...driverLists.value, ...newArr];
  loadingData.value = false;
};
const goDetailPage = (driver: driverType) => {
  console.log("go detail page");
  router.push({
    name: "Detail",
    query: {
      id: driver.id
    }
  });
};
const voteForDriver = (driver: driverType) => {
  const flag = isWeChatEnv();
  if (!flag) {
    showDialog({
      title: "提示",
      message: "请在微信浏览器中打开!"
    }).then(() => {
      // on close
    });
    return;
  }
  if (route.query.code) {
    try {
      // const userInfoData = await sendAuthCodeToCallbackServer(route.query.code);
      // saveUserInfo(userInfoData as wechatUserInfo);
    } catch (err) {
      console.error(err);
    }
  } else {
    const userInfo: wechatUserInfo = getUserInfo();
    if (!userInfo) {
      openWechatAccessPage();
    }
    console.log(driver.id, userInfo?.openid);
  }
};
</script>

<template>
  <div class="page-wrapper">
    <!-- 活动介绍 -->
    <div class="gap-margin-left-right introduce-wrapper">
      <img :src="introductionBg" alt="背景图片" class="top-bg" />
    </div>
    <!-- 搜索 -->
    <div class="gap-margin-left-right search-wrapper">
      <div class="input-bg">
        <input
          autocomplete="off"
          class="search_input"
          type="text"
          placeholder="请输入选手姓名、编号"
          name="search"
          ref="searchInput"
          v-model="keyword"
        />
        <div class="search-btn" @click="searchKeyword">搜索</div>
      </div>
    </div>
    <!-- 司机列表 -->
    <div class="gap-margin-left-right card-wrapper-outer driver-card-wrapper">
      <div class="card-wrapper-inner driver-card">
        <div class="card-padding">
          <div
            class="driver-item-wrapper"
            v-for="item in driverLists"
            :key="item.id"
          >
            <div class="driver-img">
              <img
                src="../../assets/images/red/pic.png"
                alt="avatar"
                srcset=""
              />
            </div>
            <div class="name">{{ item.name }}</div>
            <div class="company">
              {{ item.company }}
            </div>
            <div>
              <span class="votes">{{ item.voteNum }}</span
              ><span class="unit">票</span>
            </div>

            <div class="btn btn1" @click="voteForDriver(item)">投票</div>
            <div class="btn btn2" @click="goDetailPage(item)">详情</div>
          </div>
          <div class="driver-item-wrapper"></div>
        </div>
      </div>
    </div>
    <LoadMore
      v-if="driverLists.length < pageData.total"
      @load-more="getDriverList"
    />
  </div>
</template>

<style lang="less" scoped>
.introduce-wrapper {
  margin-top: 325px;
  .top-bg {
    width: 100%;
  }
}
.search-wrapper {
  margin-top: 20px;
  margin-bottom: 18px;
  box-sizing: border-box;
  .input-bg {
    position: relative;
    width: 100%;
    height: 68px;
    background: url("../../assets/images/red/search_input.png") 0% 0% / 100%
      100%;
    .search_input {
      background-color: transparent !important;
      margin-left: 22px;
      margin-top: 16px;
      font-size: 16px;
      width: 212px;
      &::placeholder {
        font-weight: bold;
        font-size: 16px;
        color: rgb(239, 68, 25);
      }
      &:-internal-autofill-selected {
        background-color: transparent;
      }
    }
    .search-btn {
      font-size: 16px;
      color: white;
      width: 76px;
      height: 43px;
      line-height: 43px;
      text-align: center;
      position: absolute;
      font-weight: bold;
      right: 12px;
      top: 7px;
    }
  }
}
.driver-card-wrapper {
  // height: 886px;
  // overflow: hidden;
  .driver-card {
    padding: 20px;
    .card-padding {
      // margin: 20px;
      // height: 827px;
      // overflow-y: auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      .driver-item-wrapper {
        width: 50%;
        text-align: center;
        font-weight: bold;
        margin-bottom: 16px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .driver-img {
          img {
            width: 100px;
            height: 125px;
            margin-left: auto;
            margin-right: auto;
          }
        }
        .name {
          font-size: 16px;
          color: #333333;
        }
        .company {
          color: #f6851a;
          font-size: 12px;
          transform: scale(0.8333);
        }
        .votes {
          color: #ef4419;
          font-size: 16px;
        }
        .unit {
          color: #ef4419;
          font-size: 16px;
        }
        .btn {
          width: 100px;
          height: 27px;
          line-height: 27px;
          border-radius: 20px;
          background-image: linear-gradient(
            0deg,
            rgb(255, 192, 43) 0%,
            rgb(246, 133, 26) 100%
          );
          font-size: 16px;
          color: white;
          margin-left: auto;
          margin-right: auto;
        }
        .btn1 {
          margin-bottom: 7px;
        }
      }
    }
  }
}
</style>
