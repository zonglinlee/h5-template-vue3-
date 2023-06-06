<script setup lang="ts" name="Home">
import LoadMore from "@/components/LoadMore/LoadMore.vue";
import { useRoute } from "vue-router";
import { ref } from "vue";
import { unref } from "vue";
const route = useRoute();
type rankType = {
  no: number;
  avatar: string;
  name: string;
  company: string;
  voteNum: number;
  id: number;
};
const itemInit: rankType = {
  no: 1,
  avatar: "",
  name: "张三李四",
  company: "~~张三李四运输有限责任公司~~",
  voteNum: 55,
  id: 1
};
let defaultRankList = Array.from<rankType>({ length: 10 }).fill({
  ...itemInit
});
defaultRankList = defaultRankList.map((item: any, index) => {
  const newItem = { ...item };
  newItem.id = index + 1;
  newItem.voteNum = 123 * (index + 1);
  newItem.name = "张三李四" + index;
  return newItem;
});
const loadingData = ref(false);
const pageData = ref({ pageNo: 1, pageSize: 10, total: 100 });
const rankList = ref(defaultRankList);
const getRankList = async () => {
  console.log("load more");
  if (loadingData.value) return;
  loadingData.value = true;
  const { pageNo, pageSize } = unref(pageData);
  pageData.value.pageNo += 1;
  const increment = pageNo * pageSize;
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
  rankList.value = [...rankList.value, ...newArr];
  loadingData.value = false;
};
</script>

<template>
  <div class="page-wrapper">
    <!-- 司机列表 -->
    <div class="gap-margin-left-right card-wrapper-outer driver-card-wrapper">
      <div class="driver-card card-wrapper-inner">
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
          <div
            class="item-content rank-item"
            v-for="item in rankList"
            :key="item.id"
          >
            <span class="col1">{{ item.id }}</span>
            <div class="col2 detail">
              <img src="../../assets/images/red/pic.png" alt="" srcset="" />
              <div class="name-no">
                <div class="no">{{ item.id }}号</div>
                <div class="name">{{ item.name }}</div>
              </div>
            </div>
            <span class="col3">{{ item.voteNum }}</span>
          </div>
        </div>
      </div>
    </div>
    <LoadMore
      v-if="rankList.length < pageData.total"
      @load-more="getRankList"
    />
  </div>
</template>

<style lang="less" scoped>
.driver-card-wrapper {
  margin-top: 325px;
  .driver-card {
    padding-bottom: 5px;
    padding-top: 8px;
    .card-padding {
      padding: 0 4px;
      margin-bottom: 10px;
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
            padding-left: 15px;
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
