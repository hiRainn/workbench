<template>
  <el-card class="box-card-component" style="margin-left:8px;height: 575px;overflow:auto;">
    <div slot="header" class="box-card-header">
      <!-- <img src="https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png"> -->
      <el-badge :is-dot="false" class="item" style="margin-top:15px;margin-left: 15px;;">收款提醒</el-badge>
      <el-popover
          placement="top-start"
          width="200"
          trigger="hover"
          content="显示截止期限为30天内以及没有设置截止日期的收款计划">
          <svg-icon icon-class="help" slot="reference"/>
        </el-popover>
      <el-button style="float: right; padding: 17px 15px" type="text">
        <router-link :to="{path:'/finance_pay/project_pay_list'}" style="color: #3d92f1;">
          更多
        </router-link>
      </el-button>
    </div>
    <div style="position:relative;">
      <!-- <pan-thumb :image="avatar" class="panThumb" /> -->
      <!-- <mallki class-name="mallki-text" text="vue-element-admin" /> -->
      <div style="padding-top:5px;" class="progress-item">
        <span v-if="!number">当前没有待收款项！</span>
        <!-- <el-progress :percentage="70" /> -->
        <span v-else> 30天内有<b style="color: red;">{{ number }}</b>笔款项待收, 总计<b style="color: red;">{{ total_money }}</b>元 </span>

        <div style="margin-top:10px;" v-if="number">
          <li v-for="(item,index ) in list" style="margin-top: 4px;">
            {{ item.unit_name }}&nbsp;有&nbsp;<b style="color: red;">{{ item.number }}</b>&nbsp;
            笔总计&nbsp;<b style="color: red;">{{ item.pay_money }}</b>&nbsp;元待收款
          </li>

          <center><el-button type="text" @click="showPay()">查看详情</el-button></center>
        </div>
      </div>
      <div class="progress-item">
        <!-- <span>JavaScript</span> -->
        <!-- <el-progress :percentage="18" /> -->
      </div>
      <div class="progress-item">
        <!-- <span>Css</span> -->
        <!-- <el-progress :percentage="12" /> -->
      </div>
      <div class="progress-item">
        <!-- <span>ESLint</span> -->
        <!-- <el-progress :percentage="100" status="success" /> -->
      </div>
    </div>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'
import PanThumb from '@/components/PanThumb'
import Mallki from '@/components/TextHoverEffect/Mallki'

export default {
  components: { PanThumb, Mallki },

  filters: {
    statusFilter(status) {
      const statusMap = {
        success: 'success',
        pending: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      drawer:false,
      statisticsData: {
        article_count: 1024,
        pageviews_count: 1024
      }
    }
  },
  methods:{
    showPay(){
      this.$emit('showPay')
    }
  },
  props: {
    number: {
      type: Number,
      default: 0
    },
	total_money: {
		type: Number,
		default: 0
	},
    list: {
      default: []
    },
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles'
    ])
  }
}
</script>

<style lang="scss" >
.box-card-component{
  .el-card__header {
    padding: 0px!important;
  }
}
</style>
<style lang="scss" scoped>
.box-card-component {
  .box-card-header {
    position: relative;
    height: 50px;
    img {
      width: 100%;
      height: 100%;
      transition: all 0.2s linear;
      &:hover {
        transform: scale(1.1, 1.1);
        filter: contrast(130%);
      }
    }
  }
  .mallki-text {
    position: absolute;
    top: 0px;
    right: 0px;
    font-size: 20px;
    font-weight: bold;
  }
  .panThumb {
    z-index: 100;
    height: 70px!important;
    width: 70px!important;
    position: absolute!important;
    top: -45px;
    left: 0px;
    border: 5px solid #ffffff;
    background-color: #fff;
    margin: auto;
    box-shadow: none!important;
    ::v-deep .pan-info {
      box-shadow: none!important;
    }
  }
  .progress-item {
    margin-bottom: 10px;
    font-size: 14px;
  }
  @media only screen and (max-width: 1510px){
    .mallki-text{
      display: none;
    }
  }
}
</style>
