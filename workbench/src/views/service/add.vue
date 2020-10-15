<template>
	<div class="app-container" v-loading="loading">

		<el-button type="primary" v-if="(op_type == 2) && (edit == false)" style="right:70px;position: fixed;z-index: 9999;" @click="edit = true">编辑</el-button>
		<el-button type="danger" v-if="(op_type == 2) && edit" style="right:70px;position: fixed;z-index: 9999;" @click="cancleEdit">取消</el-button>
		<el-button type="success"  v-if="edit" :disable="disable" style="right:150px;position: fixed;z-index: 9999;" @click="confirm('data')">确定</el-button>
		<br>
		<h2>详情:</h2>
		<el-form label-width="120px" style="width=800px;" :model="data" :rules="rules" ref="data">
			<el-form-item label="服务名称">
				<span v-if="!edit">{{ data.service_name }}</span>
				<el-input v-else v-model="data.service_name" ></el-input>
			</el-form-item>
			<el-form-item label="所属项目" prop="project_id">
				<span v-if="!edit">{{ data.project_name }}</span>
				<el-select v-else v-model="data.project_id" @change="changeCid" filterable clearable class="filter-item" loading-text="正在加载数据" placeholder="输入搜索项目名称">
					<el-option class="option"
						v-for="item in project_list"
						:key="item.id"
						:label="item.name"
						:value="item.id">
					</el-option>
				</el-select>
			</el-form-item>

			<el-form-item label="服务类型" prop="service_type_name">
				<span v-if="!edit">{{ data.service_type_name }}</span>
				<el-select v-else v-model="data.service_type_id" allow-create filterable clearable class="filter-item" loading-text="正在加载数据" placeholder="输入搜索服务类型">
					<el-option class="option"
						v-for="item in service_type"
						:key="item.id"
						:label="item.type_name"
						:value="item.id">
					</el-option>
				</el-select>
        <el-popover
          placement="top-start"
          width="200"
          style="padding-top: -14px;"
          trigger="hover"
          content="可以在此直接输入后快捷添加服务类型,输入后一定要点击选择框下面的内容,否则添加类型失败!">
          <svg-icon icon-class="help" slot="reference"/>
        </el-popover>
			</el-form-item>
      <el-form-item label="项目内容(参考)">
      	<el-table
      	  :data="data.service_info"
      	  style="width: 95%"
      	  :header-cell-style="{background:'#eef1f6',color:'#606266',border:'1px solid #F08047'}"
      	  border
      	  stripe
      	  >
      	  </el-table-column>
      	  <el-table-column  label="项目名称" align="center" >
      	    <template slot-scope="scope">
                <span>{{ scope.row.item_name }} </span>
      	    </template>
      	  </el-table-column>
      	  <el-table-column  label="服务内容" align="center" >
      	    <template slot-scope="scope">
              <span>{{ scope.row.service_content }} </span>
      	    </template>
      	  </el-table-column>
      	  <el-table-column  label="数量" align="center" >
      	    <template slot-scope="scope">
              <span>{{ scope.row.num }} </span>
      	    </template>
      	  </el-table-column>
      	  <el-table-column  label="月租" align="center" >
      	    <template slot-scope="scope">
              <span>{{ scope.row.month_rent }} </span>
      	    </template>
      	  </el-table-column>
      	  <el-table-column  label="合同合约期" align="center" >
      	    <template slot-scope="scope">
              <span>{{ scope.row.contract_period }} </span>
      	    </template>
      	  </el-table-column>

      	  <el-table-column  label="合同金额" align="center" >
      	    <template slot-scope="scope">
              <span>{{ scope.row.contract_money }} </span>
      	    </template>
      	  </el-table-column>
      	  <el-table-column  label="小计" align="center" >
      	    <template slot-scope="scope">
              <span>{{ scope.row.subtotal }} </span>
      	    </template>
      	  </el-table-column>
      	  <el-table-column  label="总合约期" align="center" >
      	    <template slot-scope="scope">
              <span>{{ scope.row.sum_period }} </span>
      	    </template>
      	  </el-table-column>
      	  <el-table-column  label="待续签期" align="center" >
      	    <template slot-scope="scope">
              <span>{{ scope.row.wait_period }} </span>
      	    </template>
      	  </el-table-column>
      	  <el-table-column  label="待签金额" align="center" >
      	    <template slot-scope="scope">
              <span>{{ scope.row.wait_money }} </span>
      	    </template>
      	  </el-table-column>
      	  <el-table-column  label="备注" align="center" >
      	    <template slot-scope="scope">
              <span>{{ scope.row.remark }} </span>
      	    </template>
      	  </el-table-column>
      	</el-table>
      </el-form-item>
			<el-form-item label="设备">
				<span v-if="!edit">{{ data.devices }}</span>
				<el-select v-if="edit" v-model="data.device_ids" multiple  filterable clearable class="filter-item" loading-text="正在加载数据" placeholder="输入机身码">
					<el-option class="option"
						v-for="(item,index) in device_list"
						:key="index"
						:label="item.name"
						:value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="授权">
				<span v-if="!edit">{{ data.auth_codes }}</span>
				<el-select v-if="edit" v-model="data.auth_code_ids" multiple  filterable clearable class="filter-item" loading-text="正在加载数据" placeholder="输入授权码">
					<el-option class="option"
						v-for="item in auth_list"
						:label="item.name"
						:value="item.id">
					</el-option>
				</el-select>

			</el-form-item>
			<el-form-item label="sim卡号">
				<span v-if="!edit">{{ data.sims }}</span>
				<el-select v-if="edit" v-model="data.sim_ids" filterable multiple  clearable class="filter-item" loading-text="正在加载数据" placeholder="输入iccid">
					<el-option class="option"
						v-for="item in sim_list"
						:key="item.id"
						:label="item.name"
						:value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
      <el-form-item label="除资源外其他服务描述">
      	<span v-if="!edit">{{ data.info }}</span>
      	<el-input type="textarea" v-else v-model.number="data.info" ></el-input>
      </el-form-item>
			<!-- <el-form-item label="套餐选择">
				 <el-radio-group v-model="data.package_id" >
					<!-- <el-radio v-for="item in package_list" :disabled="!edit" :label="item.id">{{ item.package_name }}</el-radio> -->
					<!-- <el-radio v-for="item in package_list" :disabled="!edit" :label="item.id" @change="change_package(item.package_price,item.package_desc,item.package_type)">{{ item.package_name }}</el-radio>
				</el-radio-group>
				<el-radio v-model="data.package_id" :label="0" @change="change_package(0,'',0)">无</el-radio>
			</el-form-item> -->
			<!-- <el-form-item label="功能列表">
				<el-checkbox-group v-model="data.functions">
					<el-checkbox :disabled="!edit" v-for="item in function_list" :label="item.functions"></el-checkbox>
				</el-checkbox-group>
			</el-form-item>	 -->

			<el-form-item label="费用">
				<span v-if="!edit">{{ data.service_price }}</span>
				<el-input v-else v-model.number="data.service_price" ></el-input>
			</el-form-item>
			<el-form-item label="开始时间">
				<span v-if="!edit">{{ data.open_time }}</span>
				<el-date-picker
				  v-else
				  v-model="data.open_time"
				  type="date"
				  placeholder="日期"
				  format="yyyy-MM-dd"
          value-format="yyyy-MM-dd">
				</el-date-picker>
			</el-form-item>
			<el-form-item label="结束时间">
				<span v-if="!edit">{{ data.end_time }}</span>
				<el-date-picker
				  v-else
				  v-model="data.end_time"
				  type="date"
				  placeholder="日期"
				  format="yyyy-MM-dd"
          value-format="yyyy-MM-dd">
				</el-date-picker>
			</el-form-item>
			<el-form-item label="配送地址">
				<span v-if="!edit">{{ data.delivery_addr }}</span>
				<el-input v-else v-model.number="data.delivery_addr" ></el-input>
			</el-form-item>
			<el-form-item label="服务描述">
				<span v-if="!edit">{{ data.service_desc }}</span>
				<el-input v-else v-model.number="data.service_desc" ></el-input>
			</el-form-item>
		</el-form>

	</div>
</template>

<script>
  import { getFunctions } from '@/api/function.js'
  import { getPackageList } from '@/api/package.js'
  import { getUserTypeList } from '@/api/user_type.js'
  import { getServiceTypeList } from '@/api/service_type.js'
  import { getSelectCustomer } from '@/api/customer.js'
  import { getSelectProject } from '@/api/project.js'
  import { getSimList, getAuthList, getDeviceList } from '@/api/open_service.js'
  import { getServiceInfo, addService, editService } from '@/api/service.js'
  import { MessageBox } from 'element-ui'
  export default {
    name: 'service_add',
    data() {
      return {
		    baseUrl:process.env.BASE_API,
			params:'',//表单要提交的参数
			service_info:[],
			error:{

			},
			data:{
				service_type_id:'',
				project_id:'',
				id:0,
				auth_code_ids:[],
				device_ids:[],
				sim_ids:[],
        info:'',
				open_time:'',
        sims:'',
        devices:'',
        auth_codes:'',
        service_info:[],
        end_time:'',
				service_price:0.00,
				delivery_addr:'',
				service_desc:''
			},
			rules:{
				project_id:[{required: false, message: '项目不能为空', trigger: 'blur'}],
			},
			disable:false,
			customer_list:[],
			user_type:[],
			service_type:[],
			loading:false,
			edit:true,
			op_type:1,
			// function_list:[],
			package_list:[],
			device_list:[],
			auth_list:[],
			sim_list:[],
			project_list:[],
		}
	},
	methods:{
		changeCid(id) {
			for(var p in this.project_list) {
        if(this.project_list[p]['id'] == id) {
          console.log(this.project_list[p]['info'])
          var data = JSON.parse(this.project_list[p]['info']);
          this.data.service_info = data.service_info
        }
      }
		},
		getServiceTypeList(data) {
			getServiceTypeList(data).then( response => {
				let data = response.data.list;
				this.service_type = data;
			})
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
		getInfo(data){
			this.loading = true
			getServiceInfo(data).then( (response) => {
				let data = response.data;
				for(var p in data.device_ids) {
          data.device_ids[p] = parseInt(data.device_ids[p])
        }
        for(var p in data.auth_code_ids) {
          data.auth_code_ids[p] = parseInt(data.auth_code_ids[p])
        }
        for(var p in data.sim_ids) {
          data.sim_ids[p] = parseInt(data.sim_ids[p])
        }

        data.open_time = data.open_date

        data.end_time = data.end_date


				//处理数据
				for(var i in data){
					data['O_' + i] = data[i]
				}

				this.data = data;
				this.loading = false
			}).catch(error => {
				this.loading = false
				this.disable = true;
				this.$alert(error,'提示1')
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
		//取消编辑
		cancleEdit(){
			for(var i in this.data){
				if(typeof this.data['O_'+i] != 'undefined'){
					this.data[i] = this.data['O_'+i];
				}
			}
			this.edit = false;
		},
		getAuthList(){
			getAuthList({}).then(response =>{
				this.auth_list = response.data.list;
			}).catch(error => {
				this.disable = true;
				this.$alert(error,'提示2')
			})
		},
		getSimList(){
			getSimList({}).then(response =>{
				this.sim_list = response.data.list;
			}).catch(error => {
				this.disable = true;
				this.$alert(error,'提示2')
			})
		},
		getDeviceList(){
			getDeviceList({}).then(response =>{
				this.device_list = response.data.list;
			}).catch(error => {
				this.disable = true;
				this.$alert(error,'提示2')
			})
		},
		//确认
		confirm(data){
			this.$refs[data].validate(valid => {
				if(valid) {
					//新增
					if(this.op_type == 1) {
						addService(this.data).then( response => {
							let id =response.data.id;
							this.$alert('操作成功','提示')
							this.edit = false;
							this.disable = true;
              this.$nextTick(() => {
                this.$router.replace({
                  path: '/redirect' + '/service/index'
                })
              })
						}).catch(error => {
							// this.disable = true;
							// this.edit = false;
							this.$alert(error,'提示')
						})


					}
					else if(this.op_type == 2) {
						editService(this.data).then( response => {
							let id =response.data.id;
							this.$message({
								message:'操作成功',
								type:'success'
							});
							this.refreshView('')
						}).catch(error => {
							// this.disable = true;
							this.$alert(error,'提示')

						})
					}
				}
				else {
					return false;
				}
			})
		},

	},
	mounted(){
		this.select_loading = true;
		switch(this.$route.name) {
			case 'service_add':this.op_type = 1;break;
			case 'service_detail':this.op_type = 2;break;
		}
		//新增
		if(this.op_type == 1) {
			this.edit=true
		}
		//详情
		else if(this.op_type == 2) {
			this.data.id = this.$route.query.id
			this.getInfo({id:this.data.id});
			this.edit=false;
		}
		this.getSimList({});
		this.getAuthList({});
		this.getDeviceList({});
		this.getServiceTypeList({});
		this.getProject();
	}
 }
</script>
