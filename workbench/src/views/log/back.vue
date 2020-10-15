<template>
	<div class="app-container">
		<div class="filter-container">
			 <el-select v-model="search1.user_id" filterable clearable class="filter-item" loading-text="正在加载数据" placeholder="选择后台人员">
				<el-option class="option"
					v-for="item in user_list"
					:key="item.id"
					:label="item.name"
					:value="item.id">
				</el-option>
			</el-select>
			<el-date-picker
			  v-model="search1.start_at"
			  type="date"
			  placeholder="开始日期"
			  format="yyyy-MM-dd"
			  value-format="yyyy-MM-dd">
			</el-date-picker>
			<el-date-picker
			  v-model="search1.end_at"
			  type="date"
			  placeholder="优惠结束日期"
			  format="yyyy-MM-dd"
			  value-format="yyyy-MM-dd">
			</el-date-picker>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="searchList">搜索</el-button>
      <!-- <el-checkbox-group v-model="search1.type">
          <el-checkbox label="新增类型"></el-checkbox>
          <el-checkbox label="删除类型"></el-checkbox>
          <el-checkbox label="修改类型"></el-checkbox>
          <el-checkbox label="访问类型"></el-checkbox>
        </el-checkbox-group> -->


		</div>

		<el-table
			:data="list"
			border
			v-loading="loading">
			<el-table-column
				prop="id"
				label="编号"
				>
			</el-table-column>
			<el-table-column
				label="操作人姓名"
				>
				<template slot-scope="scope">
					<span>{{ scope.row.name }}</span>
				</template>
			</el-table-column>
      <el-table-column
      	label="操作内容"
      	>
      	<template slot-scope="scope">
      		<span>{{ scope.row.content }}</span>
      	</template>
      </el-table-column>
      <el-table-column
      	label="操作时间"
      	>
      	<template slot-scope="scope">
      		<span>{{ scope.row.created_at }}</span>
      	</template>
      </el-table-column>
			<template slot-scope="scope">
				<el-button size="small" @click="showDetail(scope.row.id)">详情</el-button>
			</template>
		</el-table>
		<el-pagination
		  background
		  @current-change="changePage(p)"
		  :current-page.sync="p"
		  :page-size="max"
		  layout="total, prev, pager, next"
		  :total="count">
		</el-pagination>

	</div>
</template>

<script>
  import { getLogList, getUserList } from '@/api/log.js'
  import { MessageBox } from 'element-ui'
  export default {
    data() {
      return {
        list: [],
        user_list:[],
		addDsiabled:false,

		loading:false,

		p:0,
		max:50,//每页显示数量
		count:0,

		search1:{
			user_id:'',
			start_at:'',
      end_at:'',
		},
		search:{
			user_id:'',
			start_at:'',
      end_at:'',
		}
      }
    },
	methods:{
		refreshView() {
		  // In order to make the cached page re-rendered
		  this.$store.dispatch('delAllCachedViews', this.$route)

		  const { fullPath } = this.$route

		  this.$nextTick(() => {
		    this.$router.replace({
		      path: '/redirect' + fullPath
		    })
		  })
		},
		getList(data){
			this.loading = true
			getLogList(data).then( response => {
				let data = response.data.list.data;
				this.list = data
				this.p = parseInt(response.data.p);
				this.count = response.data.count;
				this.loading = false
			}).catch(error => {
				this.loading = false
				this.$alert(error,'提示')
			})
		},
		changePage(page){
			let data = this.search;
			for(let i in data){
				if(data[i] == false) {
					delete data[i]
				}
			}
			data.p = page;
			this.getList(data);
		},
    getUserList(){
      getUserList({}).then( response => {
      	this.user_list = response.data
      }).catch(error => {
      	this.loading = false
      	this.$alert(error,'提示')
      })
    },
		searchList(){
		    let data = this.search1;
			for(let i in data){
				if(data[i] == false) {
					delete data[i]
				}
			}

			this.search = data;
			this.getList(data);
		}
	},
	mounted(){
		this.getList({})
    this.getUserList({});

	}
  }
</script>
