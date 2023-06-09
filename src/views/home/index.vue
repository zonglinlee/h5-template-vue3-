<script setup lang="ts" name="Home">
import introductionBg from "@/assets/images/red/introduction_bg.png";
import type { wechatUserInfo, signatureInfo } from "@/utils/wechat";
import LoadMore from "@/components/LoadMore/LoadMore.vue";
import {
  saveUserInfo,
  sendAuthCodeToCallbackServer,
  openWechatAccessPage,
  getUserInfo,
  initWechatSdk,
  configWX,
  isWeChatEnv,
  isPtInPoly
} from "@/utils/wechat";
import { coorJf, coorXq } from "@/utils/geoCoors";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { showDialog } from "vant";
import "vant/es/dialog/style";
import { onBeforeMount } from "vue";
import { watch } from "vue";
const router = useRouter();
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
const { jWeixin: WX } = window;
const wxReady = ref(false);
onBeforeMount(async () => {
  const res = await initWechatSdk(location.href);
  configWX(res as signatureInfo, wxReady);
});
watch(wxReady, val => {
  if (val) {
    WX.updateAppMessageShareData({
      title: "投票H5首页", // 分享标题
      desc: "最美货车司机投票App", // 分享描述
      link: "https://21df-61-133-217-141.ngrok-free.app/#/home", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: "https://t7.baidu.com/it/u=4162611394,4275913936&fm=193&f=GIF", // 分享图标
      success: function () {
        console.log("分享连接设置成功");
      }
    });
  }
});
const voteForDriver = async (driver: driverType) => {
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

  // let hash = location.hash;
  // if (hash) {
  //   const arr = hash.split("?");
  //   const search = arr[1];
  //   maps = search.split("&").reduce((acc: any, item) => {
  //     const arr = item.split("=");
  //     acc[arr[0]] = acc[1];
  //     return acc;
  //   }, {});
  // }
  const getLocation = (userInfoData: wechatUserInfo) => {
    WX.getLocation({
      type: "wgs84", // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
      success: function (res: any) {
        console.log("res", res);
        const latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
        const longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
        const speed = res.speed; // 速度，以米/每秒计
        const accuracy = res.accuracy; // 位置精度
        //  do actual vote logic
        const inPosition = isPtInPoly(longitude, latitude, coorXq);
        const posMsg = inPosition ? "在兴庆区" : "不在兴庆区";
        showDialog({
          title: "个人信息",
          message:
            userInfoData!.nickname +
            `| 纬度:${latitude} | | 经度:${longitude} || 速度:${speed} || 位置精度:${accuracy} || ${posMsg}`
        }).then(() => {
          WX.openLocation({
            latitude, // 纬度，浮点数，范围为90 ~ -90
            longitude, // 经度，浮点数，范围为180 ~ -180。
            name: "unknow", // 位置名
            address: "unknow", // 地址详情说明
            scale: 1, // 地图缩放级别,整型值,范围从1~28。默认为最大
            infoUrl: location.href // 在查看位置界面底部显示的超链接,可点击跳转
          });
        });
      }
    });
  };
  const userInfo: wechatUserInfo = getUserInfo();

  if (!userInfo) {
    let maps: { code?: string } = {};
    let search = location.search;
    if (search && search.startsWith("?")) {
      search = search.substring(1);
      maps = search.split("&").reduce((acc: any, item) => {
        const arr = item.split("=");
        acc[arr[0]] = arr[1];
        return acc;
      }, {});
    }
    if (!maps.code) {
      openWechatAccessPage();
    } else {
      try {
        const userInfoData = await sendAuthCodeToCallbackServer(maps.code);
        saveUserInfo(userInfoData as wechatUserInfo);
        getLocation(userInfoData as wechatUserInfo);
      } catch (err) {
        console.error(err);
      }
    }
  } else {
    getLocation(userInfo);
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
