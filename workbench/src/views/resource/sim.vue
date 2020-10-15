<template>
	<div class="app-container">
		<div class="filter-container">
			<el-input placeholder="sim卡号" v-model="search1.sim_number" style="width: 200px;" class="filter-item" />
			<el-input placeholder="iccid" v-model="search1.iccid" style="width: 200px;" class="filter-item" />

			<el-button class="filter-item" type="primary" icon="el-icon-search" @click="searchList">搜索</el-button>
		</div>
    <el-button type="primary" @click="dialogFormVisible = true" style="float:right;margin-bottom: 10px;">添加sim</el-button>
    <el-upload
      class="upload-demo"
      style="float:right;margin-bottom: 10px;margin-right: 10px;"
      :data="{type:1}"
      :headers="{'X-Token':token}"
      action="http://hangan.com/upload/excel_resource"
      :on-success="handleSuccess"
      :before-upload="handldBefore"
      :limit="1"
      >
      <el-button type="primary">excel导入</el-button>
    </el-upload>

		<br>
		<el-dialog title="添加sim" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
		  <el-form :model="form" label-width="80px">
			<el-form-item label="号码"  required>
			  <el-input v-model="form.sim_number" autocomplete="off" ></el-input>
			</el-form-item>
			<el-form-item label="卡号">
			  <el-input v-model="form.iccid" autocomplete="off" ></el-input>
			</el-form-item>
			<el-form-item label="运营商">
        <el-select  v-model="form.operator" allow-create filterable clearable class="filter-item" loading-text="正在加载数据" placeholder="输入搜索类型">
        	<el-option class="option"
        		v-for="item in operator"
        		:key="item.id"
        		:label="item.operator_name"
        		:value="item.id">
        	</el-option>
        </el-select>
        <el-popover
          placement="top-start"
          width="200"
          style="padding-top: -14px;"
          trigger="hover"
          content="可以在此直接输入后快捷添加运营商,输入后一定要点击选择框下面的内容,否则添加失败!">
          <svg-icon icon-class="help" slot="reference"/>
        </el-popover>
			</el-form-item>
			<el-form-item label="开户名称">
			<el-input v-model="form.account_name" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="实名名称">
			<el-input v-model="form.real_name" autocomplete="off"></el-input>
			</el-form-item>
      <el-form-item label="号码类型">
         <el-select  v-model="form.sim_type" allow-create filterable clearable class="filter-item" loading-text="正在加载数据" placeholder="输入搜索类型">
         	<el-option class="option"
         		v-for="item in sim_type_list"
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
           content="可以在此直接输入后快捷添加号码类型,输入后一定要点击选择框下面的内容,否则添加号码类型失败!">
           <svg-icon icon-class="help" slot="reference"/>
         </el-popover>
      </el-form-item>
			<el-form-item label="套餐选择">
         <el-select  v-model="form.package_id" @change="changePackage"   filterable clearable class="filter-item" loading-text="正在加载数据" placeholder="输入搜索类型">
         	<el-option class="option"
         		v-for="item in package_list"
         		:key="item.id"
         		:label="item.package_name"
         		:value="item.id">
         	</el-option>
         </el-select>
			</el-form-item>
			<el-form-item label="套餐价格" >
        <span>{{ form.package_price }}</span>
			</el-form-item>
      <el-form-item label="当前余额">
      <el-input v-model="form.balance" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="状态">
         <el-select v-model="form.status" allow-create filterable clearable class="filter-item" loading-text="正在加载数据" placeholder="输入搜索类型">
         	<el-option class="option"
         		v-for="item in status"
         		:key="item.id"
         		:label="item.status_name"
         		:value="item.id">
         	</el-option>
         </el-select>
         <el-popover
           placement="top-start"
           width="200"
           style="padding-top: -14px;"
           trigger="hover"
           content="可以在此直接输入后快捷添加状态,输入后一定要点击选择框下面的内容,否则添加失败!">
           <svg-icon icon-class="help" slot="reference"/>
         </el-popover>
      </el-form-item>
      <el-form-item label="使用状态">
         <el-select  v-model="form.use_status" allow-create filterable clearable class="filter-item" loading-text="正在加载数据" placeholder="输入搜索类型">
         	<el-option class="option"
         		v-for="item in use_status"
         		:key="item.id"
         		:label="item.status_name"
         		:value="item.id">
         	</el-option>
         </el-select>
         <el-popover
           placement="top-start"
           width="200"
           style="padding-top: -14px;"
           trigger="hover"
           content="可以在此直接输入后快捷添加号码类型,输入后一定要点击选择框下面的内容,否则添加号码类型失败!">
           <svg-icon icon-class="help" slot="reference"/>
         </el-popover>
      </el-form-item>
			<el-form-item label="开户日期">
				<el-date-picker
				  v-model="form.open_time"
				  type="date"
				  placeholder="开户日期"
			    format="yyyy-MM-dd"
				  value-format="yyyy-MM-dd">
				</el-date-picker>
				<el-date-picker
				  v-model="form.end_time"
				  type="date"
				  placeholder="到期日期"
				  format="yyyy-MM-dd"
			    value-format="yyyy-MM-dd">
				</el-date-picker>
			</el-form-item>

			<el-form-item label="优惠日期">
				<el-date-picker
				  v-model="form.discount_start"
				  type="date"
				  placeholder="优惠开始日期"
				  format="yyyy-MM-dd"
				  value-format="yyyy-MM-dd">
				</el-date-picker>
				<el-date-picker
				  v-model="form.discount_end"
				  type="date"
				  placeholder="优惠结束日期"
				  format="yyyy-MM-dd"
				  value-format="yyyy-MM-dd">
				</el-date-picker>
			</el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" v-model="form.remark"></el-input>
      </el-form-item>
		  </el-form>
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
				label="号码"
				>
				<template slot-scope="scope">
					<span v-if="!scope.row.edit">{{ scope.row.sim_number }}</span>
					<el-input size="small" v-if="scope.row.edit"  v-model="scope.row.sim_number"/>
				</template>
			</el-table-column>
			<el-table-column
				label="卡号"
				>
				<template slot-scope="scope">
					<span v-if="!scope.row.edit">{{ scope.row.iccid }}</span>
					<el-input size="small" v-if="scope.row.edit" :rows="7" v-model="scope.row.iccid" />
				</template>
			</el-table-column>

      <el-table-column
      	label="号码类型"
      	>
      	<template slot-scope="scope">
      		<span v-if="!scope.row.edit">{{ scope.row.type_name }}</span>
      		<el-select v-if="scope.row.edit" v-model="scope.row.sim_type" allow-create  filterable clearable class="filter-item" loading-text="正在加载数据" placeholder="输入搜索类型">
      			<el-option class="option"
      				v-for="item in sim_type_list"
      				:key="item.id"
      				:label="item.type_name"
      				:value="item.id">
      			</el-option>
      		</el-select>
      	</template>
      </el-table-column>
			<el-table-column
				label="运营商"
				>
				<template slot-scope="scope">
					<span v-if="!scope.row.edit">{{ scope.row.operator_name }}</span>
          <el-select v-if="scope.row.edit" v-model="scope.row.operator" allow-create filterable clearable class="filter-item" loading-text="正在加载数据" placeholder="输入搜索类型">
            <el-option class="option"
              v-for="item in operator"
              :key="item.id"
              :label="item.operator_name"
              :value="item.id">
            </el-option>
          </el-select>
				</template>
			</el-table-column>
			<el-table-column
				label="开户人"
				>
				<template slot-scope="scope">
					<span v-if="!scope.row.edit">{{ scope.row.account_name }}</span>
					<el-input size="small" v-if="scope.row.edit"  v-model="scope.row.account_name" />
				</template>
			</el-table-column>
			<el-table-column
				label="套餐名称"
				>
				<template slot-scope="scope">
					<span v-if="!scope.row.edit">

            <el-popover
                placement="top-start"
                title="套餐描述"
                width="200"
                trigger="hover"
                :content="scope.row.package_desc || '暂无描述' ">
                <el-span slot="reference">{{ scope.row.package_name }}</el-span>
              </el-popover>
          </span>
					<el-select v-if="scope.row.edit" v-model="scope.row.package_id" @change="editPackage(scope.row)"   filterable clearable class="filter-item" loading-text="正在加载数据" placeholder="输入搜索类型">
						<el-option class="option"
							v-for="item in package_list"
							:key="item.id"
							:label="item.package_name"
							:value="item.id">
						</el-option>
					</el-select>
				</template>
			</el-table-column>
			<el-table-column
				label="套餐价格"
				>
				<template slot-scope="scope">
					<span>{{ scope.row.package_price }}</span>
				</template>
			</el-table-column>
      <el-table-column
      	label="余额"
      	>
      	<template slot-scope="scope">
      		<span v-if="!scope.row.edit">{{ scope.row.balance }}</span>
          <el-input size="small" v-if="scope.row.edit"  v-model="scope.row.balance" />
      	</template>
      </el-table-column>
      <el-table-column
      	label="实名人"
      	>
      	<template slot-scope="scope">
      		<span v-if="!scope.row.edit">{{ scope.row.real_name }}</span>
      		<el-input size="small" v-if="scope.row.edit"  v-model="scope.row.real_name" />
      	</template>
      </el-table-column>

      <el-table-column
      	label="开户时间"
      	>
      	<template slot-scope="scope">
      		<span v-if="!scope.row.edit">{{ scope.row.open_date }}</span>
      		<el-date-picker
      		  v-else
      		  v-model="scope.row.open_date"
      		  type="date"
      		  placeholder="开户日期"
      		  format="yyyy-MM-dd"
      		  value-format="yyyy-MM-dd">
      		</el-date-picker>
      	</template>
      </el-table-column>
      <el-table-column
      	label="到期时间"
      	>
      	<template slot-scope="scope">
      		<span v-if="!scope.row.edit">{{ scope.row.end_date }}</span>
      		<el-date-picker
      		  v-else
      		  v-model="scope.row.end_date"
      		  type="date"
      		  placeholder="开户日期"
      		  format="yyyy-MM-dd"
      		  value-format="yyyy-MM-dd">
      		</el-date-picker>
      	</template>
      </el-table-column>
      <el-table-column
      	label="优惠开始时间"
      	>
      	<template slot-scope="scope">
      		<span v-if="!scope.row.edit">{{ scope.row.discount_start }}</span>
      		<el-date-picker
      		  v-else
      		  v-model="scope.row.discount_start"
      		  type="date"
      		  placeholder="开户日期"
      		  format="yyyy-MM-dd"
      		  value-format="yyyy-MM-dd">
      		</el-date-picker>
      	</template>
      </el-table-column>
      <el-table-column
      	label="优惠结束时间"
      	>
      	<template slot-scope="scope">
      		<span v-if="!scope.row.edit">{{ scope.row.discount_end }}</span>
      		<el-date-picker
      		  v-else
      		  v-model="scope.row.discount_end"
      		  type="date"
      		  placeholder="开户日期"
      		  format="yyyy-MM-dd"
      		  value-format="yyyy-MM-dd">
      		</el-date-picker>
      	</template>
      </el-table-column>
      <el-table-column
      	label="备注"
      	>
      	<template slot-scope="scope">
      		<span v-if="!scope.row.edit">{{ scope.row.remark }}</span>
      		<el-input type="textarea" v-if="scope.row.edit"  v-model="scope.row.remark" :value="scope.row.remark"/>
      	</template>
      </el-table-column>

      <el-table-column
      	label="使用情况"
      	>
      	<template slot-scope="scope">
      		<span v-if="!scope.row.edit" >{{ scope.row.use_status_name }}</span>
      		<el-select v-if="scope.row.edit" v-model="scope.row.use_status" allow-create filterable clearable class="filter-item" loading-text="正在加载数据" placeholder="输入搜索类型">
      		  <el-option class="option"
      		    v-for="item in use_status"
      		    :key="item.id"
      		    :label="item.status_name"
      		    :value="item.id">
      		  </el-option>
      		</el-select>

      	</template>
      </el-table-column>


      <el-table-column
      	label="状态"
      	>
      	<template slot-scope="scope">
      		<span v-if="!scope.row.edit">{{ scope.row.status_name }}</span>
          <el-select v-if="scope.row.edit" v-model="scope.row.status" allow-create filterable clearable class="filter-item" loading-text="正在加载数据" placeholder="输入搜索类型">
            <el-option class="option"
              v-for="item in status"
              :key="item.id"
              :label="item.status_name"
              :value="item.id">
            </el-option>
          </el-select>
      	</template>
      </el-table-column>


			<el-table-column
				label="操作"
				width="200px"
				>
			<template slot-scope="scope">
				<el-button v-if="!scope.row.edit" type="primary" size="small" icon="el-icon-edit" @click="scope.row.edit = true">编辑</el-button>
				<el-button v-if="scope.row.edit" type="success" size="small" :disabled="scope.row.disabled" icon="el-icon-circle-check-outline" @click="confirmEdit(scope.row)">确定</el-button>
				<el-button v-if="scope.row.edit" type="danger" size="small" icon="el-icon-circle-check-outline" @click="scope.row.edit = false">取消</el-button>
				<el-button v-if="!scope.row.edit" type="danger" size="small" icon="el-icon-delete" @click="delcus(scope.row.id)">删除</el-button>
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
  import { getSimList, addSim, editSim, delSim,plusBalance } from '@/api/sim.js'
  import { getPackageList } from '@/api/package.js'
  import { getSimTypeList } from '@/api/sim_type.js'
  import { getSimStatusList } from '@/api/sim_status.js'
  import { getSimUseStatusList } from '@/api/sim_use_status.js'
  import { getSimOperatorList } from '@/api/sim_operator.js'
  import { getArea } from '@/api/area.js'
  import { MessageBox } from 'element-ui'
  export default {
    data() {
      return {
        token:'',
        operator:[],
        status:[],
        use_status:[],
        package_list:[],
        sim_type_list:[],
		customer_list:[],
		area:[],
        list: [],
		loading:false,
		addDsiabled:false,
		dialogFormVisible: false,
		edit:false,
		p:0,
		max:20,//每页显示数量
		count:0,
		form:{
			'operator':'',
			'iccid' :'',
			'sim_number':'',
			'account_name' :'',
			'real_name':'',
			'sim_type' :'',
			'package_id' :'',
			'open_time' :'',
			'end_time' :'',
			'discount_start' :'',
			'discount_end' :'',
      remark:'',
			'balance' :0,
      'package_price':0,
      'status':'',
      'use_status':'',
			token:''
		},
		search1:{
			sim_number:'',
			iccid:'',
		},
		search:{
			sim_number:'',
			iccid:'',
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
    changePackage(id){
      for(var p in this.package_list) {
        if(this.package_list[p]['id'] == id) {
          this.form.package_price = this.package_list[p]['package_price'];
          return false
        }
      }
      this.form.package_price = 0;
    },
    editPackage(row) {
      for(var p in this.package_list) {
        if(this.package_list[p]['id'] == row.package_id) {
          row.package_price = this.package_list[p]['package_price']
          return false
        }
      }
      row.package_price = 0;
    },
    plus(id) {
      this.$prompt('请输入充值金额', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^\d+\.{0,1}\d{1,2}$/,
        inputErrorMessage: '请输入数字'
      }).then(({ value }) => {
        var data = {
          id:id,
          balance:value
        }
        plusBalance(data).then(response => {
          this.dialogFormVisible = false;
          this.$message({
          	message:'修改成功',
          	type:'success'
          });
          this.refreshView();
        }).catch( error => {
    		this.$alert(error,'提示')
    	})

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    },
		addcus(){
			this.addDsiabled = true;
			if(this.form.sim_number == false || this.form.iccid == false) {
				this.$alert('sim卡号与iccid不能为空','提示');
				this.addDsiabled = false;
				return false
			}

			addSim(this.form).then( response => {
				this.dialogFormVisible = false;
				this.$message({
					message:'新增成功',
					type:'success'
				});
				this.refreshView();
			}).catch( error => {
				this.$alert(error,'提示')
				this.addDsiabled = false;
			})
		},
		confirmEdit(data){
			data.disabled = true;
			if(data.sim_number == false || data.iccid == false) {
				this.$alert('sim卡号与iccid不能为空','提示');
				data.disabled = false;
				return false
			}
			if(data.package_price == '') {
				this.$alert('请输入套餐价格','提示');
				data.disabled = false;
				return false
			}
			if(data.daterange == false) {
				this.$alert('请输入服务期限','提示');
				data.disabled = false;
				return false
			}
			editSim(data).then( response => {
				data.edit=false;
				this.$message({
					message:'操作成功',
					type:'success'
				});
				this.refreshView();
			}).catch( error => {
				this.$alert(error,'提示')
				data.disabled = false;
			})

		},
		delcus(id) {
			this.$confirm('是否确定删除该sim', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				delSim({id:id}).then( response => {
					this.$message({
						message:'操作成功',
						type:'success'
					});
					this.refreshView();
				}).catch( error => {
					this.$alert(error,'提示')
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
				this.$alert('号码格式错误','提示')
				return false;
			}
		},
		getList(data){
			this.loading = true
			getSimList(data).then( response => {
				let data = response.data.list.data;
				for (let i in data){
					data[i].edit = false;
					data[i].disabled = false;
          if(data[i]['package_id'] == 0) {
            data[i]['package_id'] = '';
          }
          if(data[i]['sim_type'] == 0) {
            data[i]['sim_type'] = '';
          }
          if(data[i]['status'] == 0) {
            data[i]['status'] = '';
          }
          if(data[i]['use_status'] == 0) {
            data[i]['use_status'] = '';
          }
          if(data[i]['operator'] == 0) {
            data[i]['operator'] = '';
          }
          if(data[i]['open_date'] == '1970-01-01') {
            data[i]['open_date'] = ''
          }
          if(data[i]['end_date'] == '1970-01-01') {
            data[i]['end_date'] = ''
          }
          if(data[i]['discount_start'] == '1970-01-01') {
            data[i]['discount_start'] = ''
          }
          if(data[i]['discount_end'] == '1970-01-01') {
            data[i]['discount_end'] = ''
          }

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
    handleSuccess(response) {
       if(response.code) {
         this.$alert(response.msg,'提示',{
           type:'error'
         })
       }
       else {
         this.$alert('批量导入成功','提示',{
           type:'success'
         })
       }
        this.refreshView();
    },
    handldBefore(){
      this.$message({
      	message:'正在上传，请勿关闭或移动页面',
      	type:'info'
      });

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
    getPackageList(data) {
    	getPackageList(data).then( response => {
    		let data = response.data.list;
    		this.package_list = data;
    	})
    },
    getSimTypeList(data) {
    	getSimTypeList(data).then( response => {
    		let data = response.data.list;
    		this.sim_type_list = data;
    	})
    },
    getSimStatusList(data) {
    	getSimStatusList(data).then( response => {
    		let data = response.data.list;
    		this.status = data;
    	})
    },
    getSimUseStatusList(data) {
    	getSimUseStatusList(data).then( response => {
    		let data = response.data.list;
    		this.use_status = data;
    	})
    },
    getSimOperatorList(data) {
    	getSimOperatorList(data).then( response => {
    		let data = response.data.list;
    		this.operator = data;
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
    this.token = this.$store.getters.token;
		this.getList({})
    this.getPackageList({})
    this.getSimTypeList({})
    this.getSimStatusList({})
    this.getSimOperatorList({})
    this.getSimUseStatusList({})

    this.$notify({
      title: '提示',
      message: '添加号码时，如果套餐需要先在配置管理-套餐管理中添加套餐'
    });
	}
  }
</script>
