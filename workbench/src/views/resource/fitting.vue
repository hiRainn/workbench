<template>
	<div class="app-container">
		<div class="filter-container">
			<el-input placeholder="配件名称" v-model="search1.fitting_name" style="width: 200px;" class="filter-item" />

			<el-button class="filter-item" type="primary" icon="el-icon-search" @click="searchList">搜索</el-button>
		</div>
		<el-button type="primary" @click="dialogFormVisible = true" style="float:right;margin-bottom: 10px;">添加配件</el-button>
		<br>
		<el-dialog title="添加配件" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
		  <el-form :model="form" label-width="80px">
			<el-form-item label="配件名称">
			  <el-input v-model="form.fitting_name" autocomplete="off" ></el-input>
			</el-form-item>

			<el-form-item label="配件规格">
				<el-input v-model="form.specs" autocomplete="off"></el-input>
			</el-form-item>
      <el-form-item label="配件批次">
      	<el-input v-model="form.batch" autocomplete="off"></el-input>
      </el-form-item>
			<el-form-item label="配件数量">
			<el-input v-model.num="form.num" autocomplete="off"></el-input>
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
				>
			</el-table-column>
			<el-table-column
				label="配件名称"
				>
				<template slot-scope="scope">
					<span v-if="!scope.row.edit">{{ scope.row.fitting_name }}</span>
					<el-input size="small" v-if="scope.row.edit"  v-model="scope.row.fitting_name" :value="scope.row.fitting_name"/>
				</template>
			</el-table-column>
			<el-table-column
				label="规格"
				>
				<template slot-scope="scope">
					<span v-if="!scope.row.edit">{{ scope.row.specs }}</span>
					<el-input size="small" v-if="scope.row.edit"  v-model="scope.row.specs" :value="scope.row.specs"/>
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
				label="全部库存"
				>
				<template slot-scope="scope">
					<span>{{ scope.row.num }}</span>

				</template>
			</el-table-column>
      <el-table-column
      	label="已使用数量"
      	>
      	<template slot-scope="scope">
      		<span>{{ scope.row.used_num }}</span>

      	</template>
      </el-table-column>
      <el-table-column
      	label="可使用数量"
      	>
      	<template slot-scope="scope">
          <el-button v-if="scope.row.edit" type="primary" @click="plus(scope.row.id)" size="mini" icon="el-icon-plus" ></el-button>
      		<span>{{ parseInt(scope.row.num) -  parseInt(scope.row.used_num)}}</span>
          <el-button v-if="scope.row.edit" type="primary" @click="sub(scope.row.num,scope.row.used_num,scope.row.id)" size="mini" icon="el-icon-minus" ></el-button>

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
  import { getFittingList, addFitting, plusFitting, editFitting,subFitting, delFitting } from '@/api/fitting.js'
  import { MessageBox } from 'element-ui'
  export default {
    data() {
      return {

     list: [],
		loading:false,
		dialogFormVisible: false,
		edit:false,
		addDsiabled:false,
		p:0,
		max:20,//每页显示数量
		count:0,
		form:{
			fitting_name:'',
			specs:'',
			num:'',
      batch:'',
			token:'',
      remark:''
		},
		search1:{
			fitting_name:'',
		},
		search:{
			fitting_name:'',
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
			if( !this.form.fitting_name  || !this.form.num ) {
				this.$alert('配件名、数量不能为空','提示');
				this.addDsiabled = false;
				return false
			}

			addFitting(this.form).then( response => {
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
			if( !data.fitting_name ) {
				this.$alert('配件名为空','提示');
				data.disabled = false;
				return false
			}
			editFitting(data).then( response => {
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
				delFitting({id:id}).then( response => {
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
			getFittingList(data).then( response => {
				let data = response.data.list.data;
				for (let i in data){
					data[i].edit = false;
					data[i].disabled = false;
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
    plus(id) {
      this.$prompt('请输入新增数量', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^\d+$/,
        inputErrorMessage: '请输入数字'
      }).then(({ value }) => {
        var data = {
          id:id,
          num:value
        }
        plusFitting(data).then(response => {
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
    sub(num,used_num,id) {
      this.$prompt('请输入减少数量', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^\d+$/,
        inputErrorMessage: '请输入数字'
      }).then(({ value }) => {
        var data = {
            id:id,
            num:value
          }
          var can_num = parseInt(num) - parseInt(used_num);
          if(value > can_num) {
            this.$message({
            	message:'减少数量不能比可使用少',
            	type:'error'
            });
            return false;
          }
          subFitting(data).then(response => {
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
		this.getList({})
	}
  }
</script>
