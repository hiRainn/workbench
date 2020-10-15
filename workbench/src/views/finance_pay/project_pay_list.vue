<template>
	<div class="app-container">
		<div class="filter-container">
			<el-select v-model="search1.project_id" clearable filterable placeholder="输入搜索项目" >
				<el-option
				  v-for="item in project_list"
				  :label="item.name"
				  :value="item.id">
				</el-option>
			</el-select>
			<el-select v-model="search1.customer_id" clearable filterable placeholder="输入客户名称" >
				<el-option
				  v-for="item in customer_list"
				  :label="item.name"
				  :value="item.id">
				</el-option>
			</el-select>
			<el-button class="filter-item" type="primary" icon="el-icon-search" @click="searchList">搜索</el-button>
		</div>
		<el-button type="primary" @click="dialogFormVisible = true" style="float:right;margin-bottom: 10px;">添加收款</el-button>
		<br>
		<el-dialog title="添加收款" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <el-tabs type="card" v-model="activeName">
          <el-tab-pane label="单笔收款" name="first">
            <el-form :model="form" label-width="80px">
            <el-form-item label="所属项目" required>
              <el-select v-model="form.project_id" clearable filterable placeholder="输入搜索项目" >
              	<el-option
              	  v-for="item in project_list"
              	  :label="item.name"
              	  :value="item.id">
              	</el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="付款类型" required>
              <el-input v-model="form.pay_type" autocomplete="off" ></el-input>
            </el-form-item>
            <el-form-item label="计划金额" required>
              <el-input v-model="form.amount" autocomplete="off" ></el-input>
            </el-form-item>

            <el-form-item label="截止时间">
              <template>
                 <el-date-picker
                   v-model="form.dead_line"
                   type="date"
                   placeholder="日期"
                   format="yyyy-MM-dd"
                   value-format="yyyy-MM-dd">
                 </el-date-picker>
              </template>
            </el-form-item>
            <el-form-item label="备注">
            <el-input tyle="textarea" v-model="form.remark" autocomplete="off"></el-input>
            </el-form-item>
            </el-form>

          </el-tab-pane>
          <el-tab-pane label="多笔收款" name="second">
            <el-form :model="form" label-width="80px">
              <el-form-item label="所属项目" required>
                <el-select v-model="form.project_id" clearable filterable placeholder="输入搜索项目" >
                  <el-option
                    v-for="item in project_list"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              </el-form>
                <el-table
                   :data="form.pay_info"
                   ref="form.pay_info"
                   style="width: 100%"
                   >
                   <el-table-column  label="付款类型" align="center" min-width="20%">
                     <template slot-scope="scope">
                         <el-input v-model="scope.row.pay_type" ></el-input>
                     </template>
                   </el-table-column>
                   <el-table-column  label="金额" align="center" min-width="20%" >
                     <template slot-scope="scope">
                         <el-input v-model="scope.row.amount"></el-input>
                     </template>
                   </el-table-column>

                   <el-table-column  label="付款截止时间" align="center" min-width="30%" >
                     <template slot-scope="scope">
                          <el-date-picker
                            v-model="scope.row.dead_line"
                            type="date"
                            placeholder="日期"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd">
                          </el-date-picker>
                     </template>
                   </el-table-column>
                   <el-table-column  label="备注" align="center" min-width="30%" >
                     <template slot-scope="scope">
                         <el-input type="textarea" v-model="scope.row.remark"></el-input>
                     </template>
                   </el-table-column>

                 </el-table>

                 	<el-button @click="addPay">新增内容</el-button>



          </el-tab-pane>

        </el-tabs>
        <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" :disabled="addDsiabled" @click="addcus()">确 定</el-button>
        </div>
		</el-dialog>
		<el-table
			:data="list"
			border
			v-loading="loading">
			<el-table-column
				prop="id"
				label="编号"
				width="50px"
				>
			</el-table-column>
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
      		<span v-if="!scope.row.edit">{{ scope.row.pay_type }}</span>
      		<el-input size="small" type="textarea" v-if="scope.row.edit" :rows="7" v-model="scope.row.pay_type" :value="scope.row.pay_type"/>
      	</template>
      </el-table-column>
      <el-table-column
      	label="计划收款金额"
      	>
      	<template slot-scope="scope">
      		<span v-if="!scope.row.edit">{{ scope.row.amount }}</span>
      		<el-input size="small" v-if="scope.row.edit"  v-model="scope.row.amount" :value="scope.row.amount"/>
      	</template>
      </el-table-column>
      <el-table-column
      	label="计划比例"
      	>
      	<template slot-scope="scope">
      		<span >{{ scope.row.scale }}</span>
      	</template>
      </el-table-column>
			<el-table-column
				label="备注"
				>
				<template slot-scope="scope">
					<span v-if="!scope.row.edit">{{ scope.row.remark }}</span>
					<el-input size="small" type="textarea" v-if="scope.row.edit" :rows="7" v-model="scope.row.remark" :value="scope.row.remark"/>
				</template>
			</el-table-column>
			<el-table-column
				label="截止日期"
				>
				<template slot-scope="scope">
					<span v-if="!scope.row.edit">{{ scope.row.dead_line }}</span>
          <el-date-picker
            v-if="scope.row.edit"
            v-model="scope.row.dead_line"
            type="date"
            placeholder="日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd">
          </el-date-picker>
				</template>
			</el-table-column>
			<el-table-column
				label="已付款"
				>
				<template slot-scope="scope">
					<span>{{ scope.row.amount_received }}</span>
				</template>
			</el-table-column>
      <el-table-column
      	label="未付款"
      	>
      	<template slot-scope="scope">
      		<span style="color:red">{{ scope.row.amount_unpaid }}</span>
      	</template>
      </el-table-column>
			<el-table-column
				label="付款人"
				>
				<template slot-scope="scope">
					<span>{{ scope.row.pay_unit_name }}</span>
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
					<span v-if="scope.row.status == 0" style="color: red;">{{ scope.row.status_name }}</span>
          <span v-if="scope.row.status == 1" style="color: blue;">{{ scope.row.status_name }}</span>
          <span v-if="scope.row.status == 2" style="color: green;">{{ scope.row.status_name }}</span>
				</template>
			</el-table-column>

			<el-table-column
				label="操作"
				width="200px"
				>
			<template slot-scope="scope">
				<el-button v-if="!scope.row.edit" type="primary" size="small" icon="el-icon-edit" @click="scope.row.edit = true">编辑</el-button>
				<el-button v-if="scope.row.edit" type="success" :disabled="scope.row.disabled" size="small" icon="el-icon-circle-check-outline" @click="confirmEdit(scope.row)">确定</el-button>
				<el-button v-if="scope.row.edit" type="danger" size="small" icon="el-icon-circle-check-outline" @click="scope.row.edit = false">取消</el-button>
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
  import checkPermission from '@/utils/permission' // 权限判断函数
  import { getCustomerList, getSelectCustomer } from '@/api/customer.js'
  import { getSelectProject } from '@/api/project.js'
  import { getProjectPayList,addProjectPay, editProjectPay, delProjectPay, } from '@/api/project_pay.js'
  import { MessageBox } from 'element-ui'
  export default {
     name: 'finance_pay',
    data() {
      return {
        activeName:'first',
		customer_list:[],
    project_list:[],
    list: [],
		addDsiabled:false,
		loading:false,
		dialogFormVisible: false,
		edit:false,
		p:0,
		max:20,//每页显示数量
		count:0,
		form:{
      type:'',
			amount:'',
      project_id:'',
      remark:'',
      pay_type:'',
      dead_line:'',
			token:'',
      pay_info:[{
        amount:'',
        pay_type:'',
        dead_line:'',
        remark:'',
        key: Date.now()
      }]
		},
		search1:{
			project_id:'',
			customer_id:'',
		},
		search:{
			project_id:'',
			customer_id:'',
		}
      }
    },

	methods:{
    addPay(){
      var list = {
        amount:'',
        pay_type:'',
        dead_line:'',
        remark:'',
        key: Date.now()
      }
    	this.form.pay_info.push(list);
    },
    checkPermission,
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
		addcus(){
			this.addDsiabled = true;
      this.form.type = this.activeName
			addProjectPay(this.form).then( response => {
				this.dialogFormVisible = false;
				this.$message({
					message:'新增成功',
					type:'success'
				});
				this.refreshView();
			}).catch( error => {
				this.addDsiabled = false;
				this.$alert(error,'提示1')
			})
		},
		confirmEdit(data){
			data.disabled = true;
			editProjectPay(data).then( response => {
				data.edit=false;
				this.$message({
					message:'操作成功',
					type:'success'
				});
				this.refreshView();
			}).catch( error => {
				data.disabled = false;
				this.$alert(error,'提示2')
			})

		},
		delcus(id) {
			this.$confirm('删除收款计划将删除相关财务记录，是否确定删除该计划', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				delProjectPay({id:id}).then( response => {
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
		validateTel(number){
			if(!number) return true;
			if(number.match(/^1[3-9]\d{9}$/) || number.match(/^0\d{2,3}\-\d{7,8}$/)) {
				return true;
			}
			else {
				this.$alert('号码格式错误','提示4')
				return false;
			}
		},
		getList(data){
			this.loading = true
			getProjectPayList(data).then( response => {
				let data = response.data.list.data;
				for (let i in data){
					data[i].edit = false;
					data[i].disabled = false;
          if(data[i]['dead_line'] == '1970-01-01') {
            data[i]['dead_line'] = ''
          }
          switch(data[i].status) {
            case 0: data[i].status_name = '未支付';break;
            case 1: data[i].status_name = '部分支付';break;
            case 2: data[i].status_name = '完成支付';break;
          }

				}
				this.list = data
				this.p = response.data.list.current_page;
				this.count = response.data.count;
				this.loading = false
			}).catch(error => {
				this.loading = false
				this.$alert(error,'提示5')
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
		//获取搜索条件的客户
		getCustomer(){
			getSelectCustomer({}).then( response => {
				this.customer_list = response.data.list;
				this.customer_list.unshift({id:0,name:'请选择'})
			}).catch(error => {
				this.disable = true;
				this.$alert(error,'提示6')

			})
		},
    getProject(){
    	getSelectProject({}).then(response =>{
    		this.project_list = response.data.list;
        console.log(this.project_list)
    	}).catch(error => {
    		this.disable = true;
    		this.$alert(error,'提示7')
    	})
    },

		searchList(){
		    let data = this.search1;
			for(let i in data){
				if(data[i] == false) {
					delete data[i]
				}
			}

			delete data.area;
			this.search = data;
			this.getList(data);
		}
	},
	mounted(){
		this.getList({})
		this.getCustomer();
    this.getProject();
	}
  }
</script>
