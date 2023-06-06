<script setup lang="ts" name="Detail">
import { ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const id = route.query.id;
// todo get detail from api
console.log(id);

const placeholder = {
  name: "张三打",
  company: "运输公司名称运输公司名称",
  rank: 22,
  votes: 223434,
  voteDiff: 5435,
  desc: `文字介绍文字介绍文字介绍文字介绍文字介,绍文字介绍文字介绍文字介绍文字介绍文字介,,文字介绍文字介绍文字介绍文字介绍文字介,绍文字介绍文字介绍文字介绍文字介绍文字介,
  文字介绍文字介绍文字介绍文字介绍文字介,绍文字介绍文字介绍文字介绍文字介绍文字介,文字介绍文字介绍文字介绍文字介绍文字介,
  绍文字介绍文字介绍文字介绍文字介绍文字介,绍文字介绍文字介绍文字介绍文字介绍文字介绍文字介,文字介绍,文字介绍文字介绍文字介绍文字介绍文字介绍文字介,
  绍文字介绍文字介绍文字介绍文字介绍文字介绍文字介绍文字介绍文字介绍文字介,文字介绍,文字介绍文字介绍文字介绍文字介绍文字介绍文字介,
  绍文字介绍文字介绍文字介绍文字介绍文字介绍文字介绍文字介绍文字介绍文字介,文字介绍,文字介绍文字介绍文字介绍文字介绍文字介绍文字介,
  绍文字介绍文字介绍文字介绍文字介绍文字介绍文字介绍文字介绍文字介绍文字介,文字介绍,文字介绍文字介绍文字介绍文字介绍文字介绍文字介,
  绍文字介绍文字介绍文字介绍文字介绍文字。`
};
const driverDetail = ref(placeholder);
</script>

<template>
  <div class="page-wrapper">
    <!-- 司机列表 -->
    <div class="gap-margin-left-right card-wrapper-outer driver-card-wrapper">
      <div class="driver-card card-wrapper-inner">
        <div class="card-padding">
          <div class="font-bold text-center name">{{ driverDetail.name }}</div>
          <div class="font-bold text-center company">
            {{ driverDetail.company }}
          </div>

          <div class="flex rank-wrapper">
            <div class="item-wrapper">
              <div class="top">{{ driverDetail.rank }}</div>
              <div class="bottom">当前排名</div>
            </div>
            <div class="item-wrapper">
              <div class="top">{{ driverDetail.votes }}</div>
              <div class="bottom">票</div>
            </div>
            <div class="item-wrapper">
              <div class="top">{{ driverDetail.voteDiff }}</div>
              <div class="bottom">距离前一名</div>
            </div>
          </div>
          <div class="dirver-pic-container">
            <img
              class="driver-avtar"
              src="../../assets/images/red/pic.png"
              alt=""
            />
          </div>
          <div class="desc">
            {{ driverDetail.desc }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.driver-card-wrapper {
  margin-top: 325px;
  .driver-card {
    padding-bottom: 11px;
    padding-top: 8px;
    height: 100%;
    .card-padding {
      padding: 0 20px;
      .name {
        margin-top: 33px;
        font-size: 24px;
      }
      .company {
        color: #f6851a;
        font-size: 12px;
      }
      .rank-wrapper {
        margin: 26px 0 20px 0;
      }
      .item-wrapper {
        flex: 33.3%;
        text-align: center;
        font-weight: bold;
        display: flex;
        flex-direction: column;
        border-right: solid 2px #ef4419;
        color: #ef4419;
        .top {
          font-size: 16px;
        }
        .bottom {
          font-size: 12px;
        }
      }
      .item-wrapper:last-of-type {
        border-right: none;
      }
      .driver-avtar {
        margin: 0 auto 25px auto;
        width: 220px;
        height: 283px;
      }
      .desc {
        font-size: 12px;
        text-indent: 20px;
        color: #ef4419;
        line-height: 1.6;
      }
    }
  }
}
</style>
