<script setup lang="ts" name="Home">
import { initUserInfo } from "@/utils/wechat";
import { useRoute } from "vue-router";
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
</script>

<template>
  <div class="page-wrapper">
    <!-- 司机列表 -->
    <div class="gap-margin-left-right driver-card-wrapper">
      <div class="driver-card">
        <div class="card-padding">
          <!-- 排行说明 -->
          <div class="title-container">
            <div class="title">
              <span class="left">投票开始：</span
              ><span class="right">2023-06-05 18:00:00</span>
            </div>
            <div class="title">
              <span class="left">投票结束：</span
              ><span class="right">2023-07-01 22:00:00</span>
            </div>
            <div class="title">
              <span class="left">投票规则：</span
              ><span class="right"
                >每个微信每天可以投票4次，每天可为同一选手投票1次</span
              >
            </div>
          </div>
          <!-- 排行榜 -->
          <div class="item-header rank-item">
            <span class="col1">排名</span>
            <span class="col2" style="text-align: left">参与选手</span>
            <span class="col3">投票数</span>
          </div>
          <div class="item-content rank-item" v-for="item in 12" :key="item">
            <span class="col1">{{ item }}</span>
            <div class="col2 detail">
              <img src="../../assets/images/red/pic.png" alt="" srcset="" />
              <div class="name-no">
                <div class="no">{{ item * 2 }}号</div>
                <div class="name">张三{{ item }}</div>
              </div>
            </div>
            <span class="col3">{{ item * 456 }}</span>
          </div>
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

.driver-card-wrapper {
  margin-top: 310px;
  // margin-bottom: 20px;
  height: 508px;
  overflow: hidden;
  .driver-card {
    background: url("../../assets/images/red/rank_card.png") 0% 0% / 100% 100%;
    padding-bottom: 11px;
    padding-top: 8px;
    .card-padding {
      padding: 0 20px;
      margin-bottom: 10px;
      height: 493px;
      overflow-y: auto;
      .title-container {
        height: 72px;
        display: flex;
        flex-direction: column;
        color: #ef4419;
        font-size: 12px;
        font-weight: bold;
        margin: 17px auto;
        .title {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          .left {
            flex-grow: 0;
            flex-shrink: 0;
          }
          .right {
            flex-grow: 1;
            padding: 0 4px;
          }
        }
      }
      .rank-item {
        width: 100%;
        display: flex;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-weight: bold;
        font-size: 12px;
        .col1 {
          flex: 33.3%;
        }
        .col2 {
          flex: 33.3%;
        }
        .col3 {
          flex: 33.3%;
        }
      }
      .item-header {
        color: white;
        background-color: #ef4419;
      }
      .item-content {
        color: black;
        background-color: #feecc9;
        margin-bottom: 2px;
        .detail {
          display: flex;
          align-items: center;
          font-size: 12px;
          img {
            border-radius: 50%;
            width: 30px;
            height: 30px;
            margin-right: 7px;
          }
          line-height: unset;
          .name-no {
            height: 30px;
            display: flex;
            flex-direction: column;
          }
          .name,
          .no {
            height: 15px;
            line-height: 15px;
          }
        }
      }
      .rank-item:nth-last-of-type {
        margin-bottom: 6px;
      }
    }
  }
}
</style>
