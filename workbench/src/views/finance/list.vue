<template>
	<div class="app-container">
		<div class="filter-container">
			<!-- <el-select v-model="search1.cid" @change='change_search_cid' filterable clearable loading-text="正在加载数据" placeholder="输入搜索客户名称">
				<el-option class="option"
					v-for="item in customer_list"
					:key="item.id"
					:label="item.name"
					:value="item.id">
				</el-option>
			</el-select> -->
			<!-- 选择客户时 -->
			<!-- <el-select v-model="search1.orderid" clearable filterable placeholder="输入搜索项目" v-if="search1.cid">
				<el-option
				v-if="search1.cid== item.cid"
				  v-for="item in project"
				  :label="item.title"
				  :value="item.id">
				</el-option>
			</el-select> -->
			<!-- 不选客户名称时 -->
			<el-select v-model="search1.project_id" clearable filterable placeholder="输入搜索项目" >
				<el-option
				  v-for="item in project_list"
				  :label="item.name"
				  :value="item.id">
				</el-option>
			</el-select>
			<el-select v-model="search1.pay_customer_id" clearable filterable placeholder="输入客户名称" >
				<el-option
				  v-for="item in customer_list"
				  :label="item.name"
				  :value="item.id">
				</el-option>
			</el-select>
			<el-button class="filter-item" type="primary" icon="el-icon-search" @click="searchList">搜索</el-button>
		</div>
		<el-button type="primary" @click="dialogFormVisible = true" style="float:right;margin-bottom: 10px;">添加财务记录</el-button>
		<br>
		<el-dialog title="添加记录" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
		  <el-form :model="form" ref="form" label-width="120px">
			<el-form-item label="贷方金额" prop="amount"  :rules="[
				  { required: true, message: '金额不能为空'}
				]">
			  <el-input v-model="form.amount" autocomplete="off" ></el-input>
			</el-form-item>

			<el-form-item label="支付日期" prop="trade_day"
				 :rules="[
					{ required: true,type: 'string', message: '请选择日期', trigger: ['blur', 'change'] }
				]"
			>
				<el-date-picker
				  v-model="form.trade_day"
				  type="date"
				  value-format="yyyy-MM-dd"
				  placeholder="请选择时间">
				</el-date-picker>
			</el-form-item>
			</el-form-item>
			<el-form-item label="选择项目" prop="project_id"
				 :rules="[
					{ required: true, message: '请选择项目', trigger: ['blur', 'change'] }
				]"
			>
				<el-select v-model="form.project_id" clearable filterable placeholder="输入搜索项目">
					<el-option
					  v-for="item in project_list"
					  :label="item.name"
					  :value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
      <el-form-item label="选择付款内容" prop="project_pay_id"
      	 :rules="[
      		{ required: false, message: '请选择项目', trigger: ['blur', 'change'] }
      	]"
      >
      	<el-select v-model="form.project_pay_id" @change="change_plan_money"  clearable filterable placeholder="输入搜索项目付款计划">
      		<el-option
      		  v-for="item in project_pay_list"
            v-if=" item.project_id == form.project_id "
      		  :label="item.pay_type"
      		  :value="item.id">
      		</el-option>
      	</el-select>
      </el-form-item>

      <el-form-item label="计划金额">
        <span> {{ plan_money }} </span>
      </el-form-item>

      <el-form-item label="计划备注">
        <span> {{ plan_remark }} </span>
      </el-form-item>

      <el-form-item label="付方名称" prop="pay_customer_id"
      	 :rules="[
      		{ required: false, message: '请选择付方单位名称', trigger: ['blur', 'change'] }
      	]"
      >
      	<el-select v-model="form.pay_customer_id" clearable filterable placeholder="请选择付方单位名称">
      		<el-option
      		  v-for="item in customer_list"
      		  :label="item.name"
      		  :value="item.id">
      		</el-option>
      	</el-select>
      </el-form-item>

      <el-form-item label="付方账号" prop="pay_code"  :rules="[
      	  { required: false, message: '账号不能为空'},

      	]">
        <el-input v-model="form.pay_code" autocomplete="off" ></el-input>
      </el-form-item>
      <el-form-item label="付方开户行名" prop="pay_bank_name"  :rules="[
      	  { required: false, message: '开户行名不能为空'},

      	]">
        <el-input v-model.number="form.pay_bank_name" autocomplete="off" ></el-input>
      </el-form-item>

			<el-form-item label="摘要">
				<el-input type="textarea" v-model="form.abstract" autocomplete="off"></el-input>
			</el-form-item>

		  </el-form>
		  <div slot="footer" class="dialog-footer">
			<el-button @click="dialogFormVisible = false">取 消</el-button>
			<el-button type="primary" @click="addcus()">确 定</el-button>
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
				label="金额"
				width="130px"
				>
				<template slot-scope="scope">
					<span v-if="!scope.row.edit" v-model="scope.row.amount">{{ scope.row.amount }}</span>
					<el-input size="small" v-if="scope.row.edit"  v-model="scope.row.amount"/>
				</template>
			</el-table-column>
      
      
      <el-table-column
      	label="支付日期"
      	prop="trade_day"
      	>
      </el-table-column>

      <el-table-column
      	label="项目名称"
      	>
      	<template slot-scope="scope">
      		<span v-if="!scope.row.edit">{{ scope.row.project_name }}</span>
      		<el-select v-if="scope.row.edit" v-model="scope.row.project_id" filterable clearable class="filter-item" loading-text="正在加载数据" placeholder="输入搜索项目名称">
      			<el-option class="option"
      				v-for="item in project_list"
      				:key="item.id"
      				:label="item.name"
      				:value="item.id">
      			</el-option>
      		</el-select>
      	</template>
      </el-table-column>
      <el-table-column
      	label="所属单位"
      	>
      	<template slot-scope="scope">
      		<span>{{ scope.row.unit_name }}</span>

      	</template>
      </el-table-column>
      <el-table-column
      	label="付款类型"
      	>
      	<template slot-scope="scope">
      		<span>{{ scope.row.pay_type }}</span>

      	</template>
      </el-table-column>

      <el-table-column
      	label="付方名称"
      	>
      	<template slot-scope="scope">
      		<span v-if="!scope.row.edit">{{ scope.row.unit_name }}</span>
      		<el-select v-else v-model="scope.row.pay_customer_id"  filterable clearable class="filter-item" loading-text="正在加载数据" placeholder="输入搜索客户名称">
      			<el-option class="option"
      				v-for="item in customer_list"
      				:key="item.id"
      				:label="item.name"
      				:value="item.id">
      			</el-option>
      		</el-select>
      	</template>
      </el-table-column>
      <el-table-column
      	label="付方账号"
      	>
      	<template slot-scope="scope">
      		<span v-if="!scope.row.edit">{{ scope.row.pay_code }}</span>
      		<el-input size="small" v-if="scope.row.edit" :rows="7" v-model="scope.row.pay_code"/>
      	</template>
      </el-table-column>
      <el-table-column
      	label="付方开户行名"
      	>
      	<template slot-scope="scope">
      		<span v-if="!scope.row.edit">{{ scope.row.pay_bank_name }}</span>
      		<el-input size="small" v-if="scope.row.edit" :rows="7" v-model="scope.row.pay_bank_name"/>
      	</template>
      </el-table-column>

      <el-table-column
      	label="摘要"
      	>
      	<template slot-scope="scope">
      		<span v-if="!scope.row.edit">{{ scope.row.abstract }}</span>
      		<el-input size="small" type="textarea" v-if="scope.row.edit" :rows="7" v-model="scope.row.abstract"/>
      	</template>
      </el-table-column>
			<el-table-column
				label="操作"
				width="200px"
				>
			<template slot-scope="scope">
				<!-- <el-button v-if="!scope.row.edit" type="primary" size="small" icon="el-icon-edit" @click="scope.row.edit = true">编辑</el-button>
				<el-button v-if="scope.row.edit" type="success" size="small" icon="el-icon-circle-check-outline" @click="confirmEdit(scope.row)">确定</el-button>
				<el-button v-if="scope.row.edit" type="danger" size="small" icon="el-icon-circle-check-outline" @click="cancle(scope.row)">取消</el-button> -->
        <el-button v-if="!scope.row.edit && checkPermission(['developer','admin'])" type="danger" size="small" icon="el-icon-delete" @click="delcus(scope.row.id)">删除</el-button>
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
  import { getSelectProjectPay } from '@/api/project_pay.js'
  import { getAccountList, addAccount,delAccount } from '@/api/finance.js'
  import { MessageBox } from 'element-ui'
  import { parseTime } from '@/utils/index.js'
  import checkPermission from '@/utils/permission' // 权限判断函数
  export default {
    name: 'finance_list',
    data() {
      return {
		baseUrl:process.env.BASE_API,
		project:[],
    list: [],
    customer_list:[],
    project_list:[],
    project_pay_list:[],
		loading:false,
		dialogFormVisible: false,
		uploadFormVisible:false,
		edit:false,
    plan_money:'',
    plan_remark:'',
		p:0,
		max:20,//每页显示数量
		count:0,
		form:{
			project_id:'',
			pay_bank_name:'',
			pay_code:'',
			amount:'',
			trade_day:'',
			pay_customer_id:'',
      project_pay_id:'',
			abstract:'',
		},
		search1:{
			project_id:'',
      pay_customer_id:""
		},
		search:{
			project_id:'',
			pay_customer_id:""
		},

      }
    },
	methods:{
    checkPermission,
    change_plan_money(id) {
      for(var p in this.project_pay_list) {
        if(this.project_pay_list[p]['id'] == id) {
          this.plan_money = this.project_pay_list[p]['amount'];
          this.plan_remark = this.project_pay_list[p]['remark'];
        }
      }
    },
		change_search_cid() {
			this.search1.orderid='';
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

		submitUpload() {
			this.updateData.token = this.$store.state.user.token
            this.$refs.upload.submit();
        },
		uploadfile(res){
			if(res.code) {
				this.$message({
					message:res.msg,
					type:'error'
				});
			}
			else{
				this.$message({
					message:'上传成功',
					type:'success'
				});
				this.refreshView();
			}
		},
		cancle(row){
			row.edit = false;
			//加上原始数据，供编辑取消使用
			row.orderid=row.orderid1
			row.time=row.time1
			row.type=row.type1,
			row.amount=row.amount1
			row.occurrence_time=row.occurrence_time1
			row.remake= row.remake1
		},
		addcus(){
			this.$refs['form'].validate(valid => {
				if(valid){
					let time = parseTime(Date());
					this.form.time = time;
					this.form.operator = 1;
					addAccount(this.form).then( response => {
						this.dialogFormVisible = false;
            if(response.data == 'over') {
              var message = '新增成功，该项目付款已全部完成，请及时修改项目信息！';
            }else{
              var message = '新增成功';
            }
						this.$message({
							message:message,
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
				else{
					return false;
				}
			})

		},
    delcus(id) {
    	this.$confirm('是否确定删除该收款', '提示', {
    		confirmButtonText: '确定',
    		cancelButtonText: '取消',
    		type: 'warning'
    	}).then(() => {
    		delAccount({id:id}).then( response => {
    			this.$message({
    				message:'操作成功',
    				type:'success'
    			});
    			this.refreshView();
    		}).catch( error => {
    			this.$alert(error,'提示3')
    		})
    	}).catch(() => {
    		this.$message({
    		type: 'info',
    		message: '已取消删除'
    		});
    	});
        },
		confirmEdit(data){
			data.edit=false;
			addAccount(data).then( response => {
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
    getCustomer(){
    	getSelectCustomer({}).then(response =>{
    		this.customer_list = response.data.list;
    	}).catch(error => {
    		this.disable = true;
    		this.$alert(error,'提示2')
    	})
    },
    getProjectPay(){

    	getSelectProjectPay({}).then(response =>{
    		this.project_pay_list = response.data.list;

    	}).catch(error => {
    		this.disable = true;
    		this.$alert(error,'提示2')
    	})
    },
		getList(data){
			this.loading = true
			getAccountList(data).then( response => {
				let data = response.data.list.data;
				for (let i in data){

					data[i].edit = false;
					//加上原始数据，供编辑取消使用
					data[i].project_name1=data[i].project_name
					data[i].project_id1=data[i].project_id
					data[i].pay_bank_name1=data[i].pay_bank_name,
					data[i].amount1=data[i].amount
					data[i].pay_code1=data[i].pay_code
					data[i].pay_name1= data[i].pay_name
          data[i].abstract1=data[i].abstract
          data[i].trade_day1=data[i].trade_day

				}

				this.list = data
				this.p = response.data.list.current_page;
				this.count = response.data.count;
				this.loading = false

			}).catch(error => {
				this.loading = false

				this.$alert(error,'提示')
			})
		},
		getProject(){
			getSelectProject({}).then(response =>{
				this.project_list = response.data.list;

			}).catch(error => {
				this.disable = true;
				this.$alert(error,'提示2')
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
				if(data[i] == '' && typeof data[i] == 'string') {
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
    this.getProjectPay();
		this.getList({})
		// this.getCustomer();
	}
  }
</script>
