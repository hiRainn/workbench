<template>
	<div class="app-container">
		<div class="filter-container">
			<el-select v-model="search1.cid" @change='change_search_cid' filterable clearable loading-text="正在加载数据" placeholder="输入搜索客户名称">
				<el-option class="option"
					v-for="item in customer_list"
					:key="item.id"
					:label="item.name"
					:value="item.id">
				</el-option>
			</el-select>
			<!-- 选择客户时 -->
			<el-select v-model="search1.orderid" clearable filterable placeholder="输入搜索项目" v-if="search1.cid">
				<el-option
				v-if="search1.cid== item.cid"
				  v-for="item in project"
				  :label="item.title"
				  :value="item.id">
				</el-option>
			</el-select>
			<!-- 不选客户名称时 -->
			<el-select v-model="search1.orderid" clearable filterable placeholder="输入搜索项目" v-if="!search1.cid">
				<el-option
				  v-for="item in project"
				  :label="item.title"
				  :value="item.id">
				</el-option>
			</el-select>
			<el-select v-model="search1.status" clearable placeholder='提醒完成状态'>
				<el-option class="option"
					v-for="item in status"
					:key="item.id"
					:label="item.title"
					:value="item.id">
				</el-option>
			</el-select> 
			<el-date-picker
			  v-model="search1.start_remind"
			  type="datetime"
			  value-format="yyyy-MM-dd HH:mm:ss"
			  placeholder="事件提醒时间范围开始">
			</el-date-picker>
			<span>-</span>
			<el-date-picker
			  v-model="search1.end_remind"
			  type="datetime"
			  value-format="yyyy-MM-dd HH:mm:ss"
			  placeholder="事件提醒时间范围结束">
			</el-date-picker>
			
			<el-button class="filter-item" type="primary" icon="el-icon-search" @click="searchList">搜索</el-button>
		</div>
		<el-button type="primary" @click="dialogFormVisible = true" style="float:right;margin-bottom: 10px;">添加提醒</el-button>
		<br>
		<el-dialog title="添加提醒" :visible.sync="dialogFormVisible">
		  <el-form :model="form" ref="addForm" label-width="120px">
			  <el-form-item label="客户名称" >
			  	<el-select v-model="form.cid" clearable filterable placeholder="输入搜索客户">
			  		<el-option
			  		  v-for="item in customer_list"
			  		  :label="item.name"
			  		  :value="item.id">
			  		</el-option>
			  	</el-select>
			  </el-form-item>
			  
			<el-form-item label="项目名称" prop="orderid"
				:rules="[
					{ type:'number',required: true, message: '请选择项目', trigger: 'blur' },
				]"
				>
				<el-select v-model="form.orderid" clearable filterable placeholder="输入搜索项目">
					<el-option
					  v-if="form.cid == item.cid"
					  v-for="item in project"
					  :label="item.title"
					  :value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="提醒时间" prop="remind"
				:rules="[
					{ required: true, message: '请输入时间', trigger: 'blur' },
					{ type:'string', message:'请输入正确的时间格式',trigger:'blur' }
				]">
				<el-date-picker
				  v-model="form.remind"
				  type="datetime"
				  value-format="yyyy-MM-dd HH:mm:ss"
				  placeholder="请选择时间">
				</el-date-picker>
			</el-form-item>
			<el-form-item label="提醒内容"  prop="data"
				:rules="[
					{ required: true, message: '请输入内容', trigger: 'blur' }
				]">
				<el-input type="textarea" v-model="form.data" autocomplete="off"></el-input>
			
			</el-form-item>
			
		
		  </el-form>
		  <div slot="footer" class="dialog-footer">
			<el-button @click="dialogFormVisible = false">取 消</el-button>
			<el-button type="primary" @click="addEvent()">确 定</el-button>
		  </div>
		</el-dialog>
		<el-table
			:data="list"
			border
			v-loading="loading">
			<el-table-column
				prop="id"
				width="50px"
				label="编号"
				>
			</el-table-column>
			<el-table-column
				label="客户名称"
				>
				<template slot-scope="scope">
					<span v-if="!scope.row.edit">{{ scope.row.name }}</span>
					<el-select  @change="change_cid(scope.row)" v-if="scope.row.edit"  v-model="scope.row.cid" filterable clearable 
					class="filter-item" loading-text="正在加载数据" placeholder="输入搜索项目名称">
						<el-option class="option"
							v-for="item in customer_list"
							:key="item.id"
							:label="item.name"
							:value="item.id"
							>
						</el-option>
					</el-select>
				
					</el-select>
				</template>
			</el-table-column>
			<el-table-column
				label="项目名称"
				>
				<template slot-scope="scope">
					<el-select :disabled='!scope.row.edit' v-model="scope.row.orderid" filterable clearable class="filter-item" loading-text="正在加载数据" placeholder="输入搜索项目名称">
						<el-option class="option"
							v-if="scope.row.cid == item.cid"
							v-for="item in project"
							:key="item.id"
							:label="item.title"
							:value="item.id">
						</el-option>
					</el-select>
				</template>
			</el-table-column>
			<el-table-column
				label="提醒事项"
				>
				<template slot-scope="scope">
					<span v-if="!scope.row.edit">{{ scope.row.data }}</span>
					<el-input size="small" type="textarea" v-if="scope.row.edit" :rows="7" v-model="scope.row.data"/>
				</template>
			</el-table-column>
			<el-table-column
				label="完成状态"
				>
				<template slot-scope="scope">
					<span v-if="!scope.row.edit">{{ scope.row.status?'已完成':'未完成' }}</span>
					<el-select v-model="scope.row.status" clearable placeholder='提醒完成状态'  v-if="scope.row.edit">
						<el-option class="option"
							v-for="item in status"
							:key="item.id"
							:label="item.title"
							:value="item.id">
						</el-option>
					</el-select> 
				</template>
			</el-table-column>
			<el-table-column
				label="提醒时间"
				>
				<template slot-scope="scope">
					<span v-if="!scope.row.edit">{{ scope.row.remind }}</span>
					<el-date-picker
					  v-if="scope.row.edit"
					  v-model="scope.row.remind"
					  type="datetime"
					  value-format="yyyy-MM-dd HH:mm:ss"
					  placeholder="请选择时间">
					</el-date-picker>
				</template>
			</el-table-column>
			<el-table-column
				label="记录时间"
				prop="time"
				>
			</el-table-column>
			<el-table-column
				label="操作"
				width="200px"
				>
			<template slot-scope="scope">
				<el-button v-if="!scope.row.edit" type="primary" size="small" icon="el-icon-edit" @click="scope.row.edit = true">编辑</el-button>
				<el-button v-if="scope.row.edit" type="success" size="small" icon="el-icon-circle-check-outline" @click="confirmEdit(scope.row)">确定</el-button>
				<el-button v-if="scope.row.edit" type="danger" size="small" icon="el-icon-circle-check-outline" @click="cancle(scope.row)">取消</el-button>
			</template>
			</el-table-column>
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
  import { getSelectCustomer } from '@/api/customer.js'
  import { getSelectProject } from '@/api/project.js'
  import { getEventList, addEvent } from '@/api/event.js'
  import { MessageBox } from 'element-ui'
  import { parseTime } from '@/utils/index.js'
  export default {
    data() {
      return {
		customer_list:[],
		project:[],
        list: [],
		type:[
			{id:0,'title':'否'},
			{id:1,'title':'是'},
		],
		status:[
			{id:0,'title':'未完成'},
			{id:1,'title':'已完成'},
		],
		loading:false,
		dialogFormVisible: false,
		p:0,
		max:20,//每页显示数量
		count:0,
		form:{
			cid:'',
			orderid:'',
			status:'',
			type:'',	
			time:'',
			data:'',//事件内容
			remind:'',//提醒时间
			status:0
		},
		search1:{
			cid:'',
			type:1,
			orderid:'',
			status:'',
			start_remind:'',
			end_remind:'',
		},
		search:{
			cid:'',
			type:1,
			orderid:'',
			status:'',
			start_remind:'',
			end_remind:'',
		},
      }
    },
	methods:{
		change_search_cid() {
			this.search1.orderid='';
		},
		change_cid(row){
			row.orderid = ''
		},
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
		cancle(row){
			row.edit = false;
			//加上原始数据，供编辑取消使用
			row.cid = row.cid1
			row.orderid=row.orderid1
			row.time=row.time1
			row.type=row.type1,
			row.amount=row.amount1
			row.occurrence_time=row.occurrence_time1
			row.remake= row.remake1
		},
		addEvent(){
			let time = parseTime(Date());
			this.form.time = time;
			this.$refs['addForm'].validate( valid => {
				if(valid){
					console.log('1231')
					addEvent(this.form).then( response => {
						this.dialogFormVisible = false;
						this.$message({
							message:'新增成功',
							type:'success'
						});
						this.refreshView()
					}).catch( error => {
						this.$message({
							message:error,
							type:'error'
						});
					})
				}
				else {
					console.log('123')
					return false;
				}
			})
		},
		confirmEdit(data){
			data.edit=false;
			if(typeof data.file_name != 'undefined') {
				delete data.file_name;
			}
			addEvent(data).then( response => {
				this.$message({
					message:'更新成功',
					type:'success'
				});
				this.refreshView()
			}).catch( error => {
				this.$message({
					message:error,
					type:'error'
				});
			})
			
		},
		getList(data){
			this.loading = true
			getEventList(data).then( response => {
				let data = response.data.list;
				for (let i in data){
					data[i].edit = false;
					//加上原始数据，供编辑取消使用
					data[i].orderid1=data[i].orderid
					data[i].time1=data[i].time
					data[i].cid1=data[i].cid
					data[i].type1=data[i].type,
					data[i].data1=data[i].data
					data[i].status1=data[i].status
					data[i].remind1= data[i].remind
				}
				this.list = data
				this.p = response.data.p;
				this.count = response.data.count;
				this.loading = false
			}).catch(error => {
				this.loading = false
				this.$alert(error,'提示')
			})
		},
		getProject(){
			getSelectProject().then( response => {
				this.project = response.data.list
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
		searchList(){
		    let data = this.search1;
			
			for(let i in data){
				if(data[i] == false) {
					delete data[i]
				}
			}
			this.search = data;
			this.getList(data);
		},
		getCustomer(){
			getSelectCustomer({}).then(response =>{
				this.customer_list = response.data.list;
				this.select_loading=false;
			}).catch(error => {
				this.$alert(error,'提示')
			})
		}
	},
	mounted(){
		this.getProject();
		this.getCustomer();
		this.getList({type:1})
	}
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.el-input__inner {
    color: black !important;
}
</style>