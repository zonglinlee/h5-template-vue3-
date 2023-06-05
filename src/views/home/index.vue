<script setup lang="ts" name="Home">
import topBgImg from "@/assets/images/banner.png";
import introductionBg from "@/assets/images/red/introduction_bg.png";
import type { wechatUserInfo } from "@/utils/wechat";
import {
  initUserInfo,
  saveUserInfo,
  sendAuthCodeToCallbackServer
} from "@/utils/wechat";
import { computed } from "vue";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();
if (route.query.code) {
  try {
    // const userInfoData = await sendAuthCodeToCallbackServer(route.query.code);
    // saveUserInfo(userInfoData as wechatUserInfo);
  } catch (err) {
    console.error(err);
  }
} else {
  initUserInfo();
}

const keyword = ref("");
const searchKeyword = () => {};
type playerType = { no: string };
const defaultPlayerList = [
  {
    no: 1,
    playerImage:
      "https://qny13.rrwtp.com/upload/image/20230517/d0261b7ec922e621f7d35c23841a4bbb.png",
    name: "阿巴拜科日·托合提",
    playerName: "阿巴拜科日·托合提",
    profile: "皮山县乔达乡色外特恰喀村",
    voteNum: 55,
    id: "123456"
  }
];
const playerList = ref(defaultPlayerList);

const goDetailPage = driver => {
  console.log("go detail page");
  router.push({ name: "Detail" });
};
const voteForDriver = driver => {
  // todo
};
</script>

<template>
  <!-- class="pl-[12px] border-l-[3px] border-[color:#41b883]" -->
  <div class="page-wrapper">
    <!-- <div class="corner-17">投票</div> -->
    <!-- 活动介绍 -->
    <div class="gap-margin-left-right introduce-wrapper">
      <img :src="introductionBg" alt="背景图片" class="top-bg" />
    </div>
    <div class="content-container"></div>
    <!-- 搜索 -->
    <div class="gap-margin-left-right search-wrapper">
      <div class="input-bg">
        <input
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
    <div class="gap-margin-left-right driver-card-wrapper">
      <div class="driver-card">
        <div class="card-padding">
          <div class="driver-item-wrapper" v-for="item in 15" :key="item">
            <div class="driver-img">
              <img
                src="../../assets/images/red/pic.png"
                alt="avatar"
                srcset=""
              />
            </div>
            <div class="name">张三李四</div>
            <div class="company">
              运输公司名称运公房贷首付法大师傅大师傅司名称
            </div>
            <div>
              <span class="votes">19973</span><span class="unit">票</span>
            </div>

            <div class="btn btn1" @click="voteForDriver">投票</div>
            <div class="btn btn2" @click="goDetailPage">详情</div>
          </div>
          <div class="driver-item-wrapper"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.page-wrapper {
  background: url("../../assets/images/red/top_bg.png") 0% 0% / 100% 100%, red;
  width: 100%;
  height: 1963px;
}
.introduce-wrapper {
  margin-top: 310px;
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
      background-color: transparent;
      margin-left: 22px;
      margin-top: 16px;
      font-size: 16px;
      width: 212px;
      &::placeholder {
        font-weight: bold;
        font-size: 16px;
        color: rgb(239, 68, 25);
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
  height: 886px;
  overflow: hidden;
  .driver-card {
    background: url("../../assets/images/red/home_driver_card_bg.png") 0% 0% /
      100% 100%;
    // background-clip: content-box;
    padding: 20px;
    .card-padding {
      // margin: 20px;
      height: 827px;
      overflow-y: auto;
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
