<template>
	<div class="app-container">
		<div class="filter-container">
			<el-input placeholder="机身码" v-model="search1.device_code" style="width: 200px;" class="filter-item" />

			<el-button class="filter-item" type="primary" icon="el-icon-search" @click="searchList">搜索</el-button>
		</div>
		<el-button type="primary" @click="dialogFormVisible = true" style="float:right;margin-bottom: 10px;">添加设备</el-button>
    <el-upload
      class="upload-demo"
      style="float:right;margin-bottom: 10px;margin-right: 10px;"
      :data="{type:2}"
      :headers="{'X-Token':token}"
      action="http://hangan.com/upload/excel_resource"
      :on-success="handleSuccess"
      :before-upload="handldBefore"
      :limit="1"
      >
      <el-button type="primary">excel导入</el-button>
    </el-upload>
		<br>
		<el-dialog title="添加设备" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
		  <el-form :model="form" label-width="80px">
			<el-form-item label="设备名称">
			  <el-select v-model="form.device_kind"  allow-create filterable clearable placeholder="请选择">
				<el-option
				  v-for="item in device_kind"
				  :key="item.id"
				  :label="item.kind_name"
				  :value="item.id">
				</el-option>
			  </el-select>
			  <el-popover
			    placement="top-start"
			    width="200"
			    style="padding-top: -14px;"
			    trigger="hover"
			    content="可以在此直接输入后快捷添加设备种类,输入后一定要点击选择框下面的内容,否则添加设备类型失败!">
			    <svg-icon icon-class="help" slot="reference"/>
			  </el-popover>
			</el-form-item>
			<el-form-item label="设备类型">
			  <el-select v-model="form.device_type"  allow-create filterable clearable placeholder="请选择">
				<el-option
				  v-for="item in device_type"
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
          content="可以在此直接输入后快捷添加设备类型,输入后一定要点击选择框下面的内容,否则添加设备类型失败!">
          <svg-icon icon-class="help" slot="reference"/>
        </el-popover>
			</el-form-item>
			<el-form-item label="机身码">
				<el-input v-model="form.device_code" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="批次">
			<el-input v-model="form.batch" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="规格">
			<el-input v-model="form.specs" autocomplete="off"></el-input>
			</el-form-item>
      <el-form-item label="对接人">
      <el-input v-model="form.pick_up" autocomplete="off"></el-input>
      </el-form-item>
			<el-form-item label="入库时间">
			    <el-date-picker
				  v-model="form.store_time"
				  type="date"
          format="yyyy-MM-dd"
				  value-format="yyyy-MM-dd"
				  placeholder="选择日期">
				</el-date-picker>
			</el-form-item>
      <el-form-item label="保修时间">
          <el-date-picker
      	  v-model="form.guarantee_time"
      	  type="date"
          format="yyyy-MM-dd"
      	  value-format="yyyy-MM-dd"
      	  placeholder="选择日期">
      	</el-date-picker>
      </el-form-item>
	  <el-form-item label="备注">
		  <el-input type="textarea" v-model="form.remark"></el-input>
	  </el-form-item>
      <el-form-item label="设备状态">
        <el-select v-model="form.status"  allow-create filterable clearable placeholder="请选择">
      	<el-option
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
          content="可以在此直接输入后快捷添加设备状态,输入后一定要点击选择框下面的内容,否则添加设备状态失败!">
          <svg-icon icon-class="help" slot="reference"/>
        </el-popover>
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
				>
			</el-table-column>
			<el-table-column
				label="设备名称"
				>
				<template slot-scope="scope">
					<span v-if="!scope.row.edit">{{ scope.row.kind_name }}</span>
					<el-select v-if="scope.row.edit" allow-create  filterable clearable v-model="scope.row.device_kind" placeholder="请选择">
						<el-option
						  v-for="item in device_kind"
						  :key="item.id"
						  :label="item.kind_name"
						  :value="item.id">
						</el-option>
					</el-select>
				</template>
			</el-table-column>
			<el-table-column
				label="设备类型"
				>
				<template slot-scope="scope">
					<span v-if="!scope.row.edit">{{ scope.row.type_name }}</span>
					<el-select v-if="scope.row.edit" allow-create  filterable clearable v-model="scope.row.device_type" placeholder="请选择">
						<el-option
						  v-for="item in device_type"
						  :key="item.id"
						  :label="item.type_name"
						  :value="item.id">
						</el-option>
					</el-select>
				</template>
			</el-table-column>
			<el-table-column
				label="机身码"
				>
				<template slot-scope="scope">
					<span v-if="!scope.row.edit">{{ scope.row.device_code }}</span>
					<el-input size="small" v-if="scope.row.edit"  v-model="scope.row.device_code" :value="scope.row.device_code"/>
				</template>
			</el-table-column>
			<el-table-column
				label="批次"
				>
				<template slot-scope="scope">
					<span v-if="!scope.row.edit">{{ scope.row.batch }}</span>
					<el-input size="small" v-if="scope.row.edit"  v-model="scope.row.batch" :value="scope.row.batch"/>
				</template>
			</el-table-column>
			<el-table-column
				label="规格"
				>
				<template slot-scope="scope">
					<span v-if="!scope.row.edit">{{ scope.row.specs }}</span>
					<el-input size="small" v-if="scope.row.edit"  v-model.number="scope.row.specs" :value="scope.row.specs"/>
				</template>
			</el-table-column>
      <el-table-column
      	label="对接人"
      	>
      	<template slot-scope="scope">
      		<span v-if="!scope.row.edit">{{ scope.row.pick_up }}</span>
      		<el-input size="small" v-if="scope.row.edit"  v-model.number="scope.row.pick_up" :value="scope.row.pick_up"/>
      	</template>
      </el-table-column>
			<el-table-column
				label="入库时间"
				width="180px"
				>
				<template slot-scope="scope">
					<span v-if="!scope.row.edit">{{ scope.row.store_time  }}</span>

					<el-date-picker
					  width="180px"
					  v-if="scope.row.edit"
					  v-model="scope.row.store_time"
					  type="date"
					  default-valut="scope.row.store_time"
					  value-format="yyyy-MM-dd"
					  placeholder="选择日期">
					</el-date-picker>

				</template>
			</el-table-column>
      <el-table-column
      	label="保修时间"
      	width="180px"
      	>
      	<template slot-scope="scope">
      		<span v-if="!scope.row.edit">{{ scope.row.guarantee_time }}</span>

      		<el-date-picker
      		  width="180px"
      		  v-if="scope.row.edit"
      		  v-model="scope.row.guarantee_time"
      		  type="date"
      		  default-valut="scope.row.guarantee_time"
      		  value-format="yyyy-MM-dd"
      		  placeholder="选择日期">
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
				label="状态"
				>
				<template slot-scope="scope">
					<span v-if="!scope.row.edit">{{ scope.row.status_name }}</span>
					<el-select v-if="scope.row.edit" v-model="scope.row.status" placeholder="请选择">
						<el-option
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
  import { getDeviceList, addDevice, editDevice, delDevice } from '@/api/device.js'
  import { getDeviceTypeList } from '@/api/device_type'
  import { getDeviceKindList } from '@/api/device_kind'
  import { getDeviceStatusList } from '@/api/device_status'
  import { MessageBox } from 'element-ui'
  export default {
    name: 'resource_device',
    data() {
      return {
        token:'',
	    device_type:[
	    ],
		status:[

		],
    device_kind:[],
        list: [],
		loading:false,
		dialogFormVisible: false,
		edit:false,
		addDsiabled:false,
		p:0,
		max:20,//每页显示数量
		count:0,
		form:{
			device_kind:'',
			device_type:'',
			remark:'',
      status:'',
			device_code:'',
			manufacturer:'',
      batch:'',
      specs:'',
			buy_time:'',
			token:''
		},
		search1:{
			device_code:'',
		},
		search:{
			device_code:'',
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
		addcus(){
			this.addDsiabled = true;
			if( !this.form.device_kind  || !this.form.device_type || !this.form.device_code) {
				this.$alert('设备名、类型与机身码不能为空','提示');
				this.addDsiabled = false;
				return false
			}

			addDevice(this.form).then( response => {
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
			if( !data.device_kind  || !data.device_type || !data.device_code) {
				this.$alert('设备名、类型与机身码不能为空','提示');
				data.disabled = false;
				return false
			}
			editDevice(data).then( response => {
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
			this.$confirm('是否确定删除该设备', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				delDevice({id:id}).then( response => {
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
			getDeviceList(data).then( response => {
				let data = response.data.list.data;
				for (let i in data){
					data[i].edit = false;
					data[i].disabled = false;
          if(data[i]['store_time'] == '1970-01-01') {
            data[i]['store_time'] = '';
          }
          if(data[i]['guarantee_time'] == '1970-01-01') {
            data[i]['guarantee_time'] = '';
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
		getDeviceTypeList(data){
			this.loading = true
			getDeviceTypeList(data).then( response => {
				let data = response.data.list;
				this.device_type = data
				this.loading = false
			}).catch(error => {
				this.loading = false
				this.$alert(error,'提示')
			})
		},
    getDeviceKindList(data){
    	this.loading = true
    	getDeviceKindList(data).then( response => {
    		let data = response.data.list;
    		this.device_kind = data
    		this.loading = false
    	}).catch(error => {
    		this.loading = false
    		this.$alert(error,'提示')
    	})
    },
    getDeviceStatusList(data){
    	this.loading = true
    	getDeviceStatusList(data).then( response => {
    		let data = response.data.list;
    		this.status = data
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
         this.refreshView();
      }
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
		searchList(){
		    let data = this.search1;
			for(let i in data){
				if(data[i] == false) {
					delete data[i]
				}
			}
			if(typeof this.search1.area != 'undefined') {
				if(typeof this.search1.area[0] != 'undefined'){
					data.province = this.search1.area[0]
				}
				if(typeof this.search1.area[1] != 'undefined'){
					data.city = this.search1.area[1]
				}
				if(typeof this.search1.area[2] != 'undefined'){
					data.district = this.search1.area[2]
				}
			}

			delete data.area;
			this.search = data;
			this.getList(data);
		}
	},
	mounted(){
    this.token = this.$store.getters.token;
		this.getList({})
		this.getDeviceTypeList({});
    this.getDeviceKindList({});
    this.getDeviceStatusList({});
	}
  }
</script>
