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

			<el-input type="text" placeholder="请输入号码查询" v-model="search1.sim_number" clearable style="width: 200px;"/>
			</el-select>
			<el-button class="filter-item" type="primary" icon="el-icon-search" @click="searchList">搜索</el-button>
		</div>
		<el-button type="primary" @click="dialogFormVisible = true" style="float:right;margin-bottom: 10px;">添加充值记录</el-button>
		<br>
		<el-dialog title="添加记录" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
		  <el-form :model="form" ref="form" label-width="120px">
        <el-form-item label="充值号码" prop="amount"  :rules="[
        	  { required: true, message: '号码不能为空'}
        	]">
          <el-input v-model="form.sim_number" autocomplete="off" ></el-input>
        </el-form-item>
			<el-form-item label="充值金额" prop="amount"  :rules="[
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


      <el-form-item label="支付方式">
        <el-input v-model="form.trade_type" autocomplete="off" ></el-input>
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
      	prop="sim_number"

      	label="号码"
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
      	label="支付方式"
      	prop="trade_type"
      	>
      </el-table-column>

      <el-table-column
      	label="充值后余额"
      	prop="balance"
      	>
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

  import { getAccountSimList, addAccountSim,delAccountSim } from '@/api/finance_sim.js'
  import { MessageBox } from 'element-ui'
  import { parseTime } from '@/utils/index.js'
  import checkPermission from '@/utils/permission' // 权限判断函数
  export default {
    name: 'finance_number',
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
			sim_number:'',
			amount:'',
			trade_type:'',
			trade_day:'',
		},
		search1:{
			sim_number:'',

		},
		search:{
			sim_number:'',
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
					addAccountSim(this.form).then( response => {
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
    		delAccountSim({id:id}).then( response => {
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
			addAccountSim(data).then( response => {
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
			getAccountSimList(data).then( response => {
				let data = response.data.list.data;

				this.list = data
				this.p = response.data.list.current_page;
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
		this.getList({})
		// this.getCustomer();
	}
  }
</script>
