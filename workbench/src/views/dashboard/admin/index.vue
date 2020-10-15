<template>
  <div class="dashboard-editor-container">
    <github-corner class="github-corner" />

    <panel-group @handleSetLineChartData="handleSetLineChartData" :data="panelData" />

    <!-- <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <stat-chart :chart-data="lineChartData" />
    </el-row> -->

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">
        <stat-chart :chart-data="projectData" type="project"/>
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">
        <stat-chart :chart-data="serviceData" type="service" />
      </el-col>
    </el-row>

    <el-row :gutter="8" >
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">
        <el-row style="margin-bottom: 18px;">
          <center style="padding-top:10px;background:#fff;">到期项目提醒({{ project_num }})</center>
          <transaction-table :list="due_project_list" type="project"/>
        </el-row>

        <el-row >
          <center style="padding-top:10px;background:#fff;">到期服务提醒( {{ service_num }} )</center>
          <transaction-table :list="due_service_list" type="service"/>
        </el-row>


      </el-col>

      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <todo-list />
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <box-card :total_money="total_money" :number="pay_number" :list="pay_li" @showPay="showPay" />
      </el-col>
    </el-row>

    <!-- 运营维护项目 -->
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <center style="padding-top:10px;background:#fff;">运营维护项目提醒({{ operational_services_project_num }})</center>
      <osp-table :list="operational_services_project" type="project"/>
    </el-row>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="inc_data" />
    </el-row>

    <el-row :gutter="32" hidden>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <raddar-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col>
    </el-row>

    <el-drawer
      title="待收款项列表"
      :visible.sync="show_drawer"
      direction="btt"
      size="40%">
       <el-table :data="pay_list" height="260">
          <el-table-column
          	label="项目名称"
          	>
          	<template slot-scope="scope">
          		<span >{{ scope.row.project_name }}</span>
          	</template>
          </el-table-column>
          <el-table-column
          	label="项目所属单位"
          	>
          	<template slot-scope="scope">
          		<span >{{ scope.row.unit_name }}</span>
          	</template>
          </el-table-column>
          <el-table-column
          	label="付款类型"
          	>
          	<template slot-scope="scope">
          		<span>{{ scope.row.pay_type }}</span><el-input size="small" type="textarea" v-if="scope.row.edit" :rows="7" v-model="scope.row.pay_type" :value="scope.row.pay_type"/>
          	</template>
          </el-table-column>
          <el-table-column
          	label="计划收款金额"
          	>
          	<template slot-scope="scope">
          		<span>{{ scope.row.amount }}</span>
          	</template>
          </el-table-column>
          <el-table-column
          	label="备注"
          	>
          	<template slot-scope="scope">
          		<span>{{ scope.row.remark }}</span>
          	</template>
          </el-table-column>
          <el-table-column
          	label="截止日期"
          	>
          	<template slot-scope="scope">
              <span v-if=" scope.row.dead_line == '1970-01-01'"> - </span>
          		<span v-else>{{ scope.row.dead_line }}</span>
          	</template>
          </el-table-column>
          <el-table-column
          	label="已付金额"
          	>
          	<template slot-scope="scope">
          		<span>{{ scope.row.amount_received }}</span>
          	</template>
          </el-table-column>
          <el-table-column
          	label="剩余"
          	>
          	<template slot-scope="scope">
          		<span style="color:red">{{ scope.row.amount_unpaid }}</span>
          	</template>
          </el-table-column>
          <el-table-column
          	label="上次付款时间"
          	>
          	<template slot-scope="scope">
              <span v-if=" scope.row.pay_time == '1970-01-01'"> - </span>
          		<span v-else>{{ scope.row.pay_time }}</span>
          	</template>
          </el-table-column>
          <el-table-column
          	label="计划状态"
          	>
          	<template slot-scope="scope">
          		<span v-if="scope.row.status == 0" style="color: red;">{{ scope.row.status | statusFilter }}</span>
              <span v-if="scope.row.status == 1" style="color: blue;">{{ scope.row.status | statusFilter }}</span>
              <span v-if="scope.row.status == 2" style="color: green;">{{ scope.row.status | statusFilter }}</span>
          	</template>
          </el-table-column>
        </el-table>
    </el-drawer>
  </div>

</template>

<script>
import GithubCorner from '@/components/GithubCorner'
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import StatChart from './components/StatChart'
import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import TransactionTable from './components/TransactionTable'
import OspTable from './components/OspTable'
import TodoList from './components/TodoList'
import BoxCard from './components/BoxCard'
import { deductingRent } from '@/api/sim.js'

import { getProjectStat,getProjectMoneyStat,getServiceStat,getDueProjectStat,getDueServiceStat,getPaymentReminder,getProjectInc, getOperationalServicesProject } from '@/api/stat.js'

const lineChartData = {
  sum_money: {
    expectedData: [100, 120, 161, 134, 105, 160, 165,201,167,192,172,123],
    actualData: [1200, 820, 910, 1540, 1620, 1400, 1450,1320,1203,1203,1652,1431]
  },
  paid_money: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  unpaid_money: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  message: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  name: 'DashboardAdmin',
  components: {
    GithubCorner,
    PanelGroup,
    LineChart,
    StatChart,
    RaddarChart,
    PieChart,
    BarChart,
    TransactionTable,
    TodoList,
    BoxCard,
    OspTable
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        '0': '未支付',
        '1': '部分支付',
        '2': '已支付'
      }
      return statusMap[status]
    },
    orderNoFilter(str) {
      return str.substring(0, 30)
    }
  },
  data() {
    return {
      operational_services_project_num:0,
      project_num:0,
      service_num:0,
      gridData:[],
      lineChartData: lineChartData.newVisitis,
      panelData: [0,0,0,0],
      projectData:{
        'sum_number':465 ,title:'项目概况总览',
        'x_data':[],'y_data':[],
      },
      serviceData:{
        'sum_number': 2400, title:'服务概况总览',
        'x_data':[],'y_data':[]
      },
      due_project_list:[],
      due_service_list:[],
      operational_services_project:[],
      pay_li:[],
      pay_list:[],
      pay_number:0,
      total_money:0,
      show_drawer:false,
      inc_data:{
        'xData':['','','','','','','','','','','',''],
        'projectData':[0,0,0,0,0,0,0,0,0,0,0,0],
        'serviceData':[0,0,0,0,0,0,0,0,0,0,0,0]
      }
    }
  },
  mounted(){
    this.getProject();
    this.getService();
    this.getDueProject();
    this.getDueService();
    this.getProjectMoney();
    this.getPaymentReminder();
    this.getProjectInc();
    this.getOperationalServicesProject();

    this.deductingRent();  //每月初扣除月租
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    },
    showPay(){
      this.show_drawer=true;
    },
    getProjectMoney(){
    	this.loading = true
    	getProjectMoneyStat().then( r => {
        var data = [
          r.data[0],
          r.data[1],
          r.data[2],
          r.data[3],
        ]
        this.panelData = data

    	}).catch(error => {
    		this.loading = false

    		this.$alert(error,'提示')
    	})
    },
    deductingRent(){
        deductingRent().then(response => {
          return false;
        }).catch(error => {
          return false;
        })
    },
    getProject(){

    	getProjectStat().then( response => {
        let data = response.data
        this.projectData.sum_number = data.sum_number
        this.projectData.title = data.title

        for(let p in data.data) {
          this.projectData.x_data.unshift(data.data[p]['number'])
          this.projectData.y_data.unshift(data.data[p]['title'])
        }
    	}).catch(error => {
    		this.loading = false

    		this.$alert(error,'提示')
    	})
    },
    getService(){

    	getServiceStat().then( response => {
        let data = response.data
        this.serviceData.sum_number = data.sum_number
        this.serviceData.title = data.title

        for(let p in data.data) {
          this.serviceData.x_data.unshift(data.data[p]['number'])
          this.serviceData.y_data.unshift(data.data[p]['title'])
        }
    	}).catch(error => {
    		this.loading = false

    		this.$alert(error,'提示')
    	})
    },
    getOperationalServicesProject (){
      getOperationalServicesProject().then( response => {
        let data = response.data
        this.operational_services_project = data
        this.operational_services_project_num = data.length
      }).catch(error => {
      	this.loading = false

      	this.$alert(error,'提示')
      })
    },
    getDueProject(){
    	getDueProjectStat().then( response => {
        let data = response.data
        this.due_project_list = data
        this.project_num = data.length
    	}).catch(error => {
    		this.loading = false

    		this.$alert(error,'提示')
    	})
    },
    getDueService(){
    	getDueServiceStat().then( response => {
        let data = response.data
        this.due_service_list = data
        this.service_num = data.length
    	}).catch(error => {
    		this.loading = false

    		this.$alert(error,'提示')
    	})
    },
    getPaymentReminder(){
    	getPaymentReminder().then( response => {
        let data = response.data
        this.total_money = parseFloat( data.total_money)
        this.pay_number = data.count;
        this.pay_li = data.paid
        this.pay_list = data.list
    	}).catch(error => {
    		this.loading = false

    		this.$alert(error,'提示')
    	})
    },
    getProjectInc(){
    	getProjectInc().then( response => {
        let data = response.data
        this.inc_data = data
    	}).catch(error => {
    		this.loading = false
    		this.$alert(error,'提示')
    	})
    },

  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
