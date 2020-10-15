<template>
	<div class="app-container">
		<div class="filter-container">
			<el-input placeholder="授权码" v-model="search1.auth_code" style="width: 200px;" class="filter-item" />

			<el-button class="filter-item" type="primary" icon="el-icon-search" @click="searchList">搜索</el-button>
		</div>
		<el-button type="primary" style="float:right;margin-bottom: 10px;"><router-link to='/resource/add_authcode'>添加授权码</router-link></el-button>
		<el-upload
		  class="upload-demo"
		  style="float:right;margin-bottom: 10px;margin-right: 10px;"
		  :data="{type:3}"
		  :headers="{'X-Token':token}"
		  action="http://hangan.com/upload/excel_resource"
		  :on-success="handleSuccess"
		  :before-upload="handldBefore"
		  :limit="1"
		  >
      <el-button type="primary">excel导入</el-button>
      </el-upload>
    <br>

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
				label="授权号码"
				>
				<template slot-scope="scope">
					<span v-if="!scope.row.edit">{{ scope.row.auth_code }}</span>
				</template>
			</el-table-column>
			<el-table-column
				label="授权名称"
				>
				<template slot-scope="scope">
					<span v-if="!scope.row.edit">{{ scope.row.auth_name }}</span>
				</template>
			</el-table-column>
			<el-table-column
				label="授权类型"
				>
				<template slot-scope="scope">
					<span v-if="!scope.row.edit">{{ scope.row.type_name }}</span>

				</template>
			</el-table-column>
			<el-table-column
				label="授权类别"
				>
				<template slot-scope="scope">
					<span v-if="!scope.row.edit">{{ scope.row.cate_name }}</span>
				</template>
			</el-table-column>
			<el-table-column
				label="优先级"
				>
				<template slot-scope="scope">
					<span v-if="!scope.row.edit">{{ scope.row.level }}</span>
				</template>
			</el-table-column>
			<el-table-column
				label="绑定号码"
				>
				<template slot-scope="scope">
					<span v-if="!scope.row.edit">{{ scope.row.sim_number }}</span>
				</template>
			</el-table-column>

			<el-table-column
				label="使用设备名称"
				>
				<template slot-scope="scope">
					<span >{{ scope.row.device_name }}</span>
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
				label="状态"
				>
				<template slot-scope="scope">
					<span>{{ scope.row.status_name }}</span>
				</template>
			</el-table-column>
			<el-table-column
				label="操作"
				width="200px"
				>
			<template slot-scope="scope">
				<!-- <el-button v-if="!scope.row.edit" type="primary" size="mini" icon="el-icon-edit" @click="scope.row.edit = true">编辑</el-button>
				<el-button v-if="scope.row.edit" type="success" size="mini" :disabled="scope.row.disabled" icon="el-icon-circle-check-outline" @click="confirmEdit(scope.row)">确定</el-button>
				<el-button v-if="scope.row.edit" type="danger" size="mini" icon="el-icon-circle-check-outline" @click="scope.row.edit = false">取消</el-button> -->
				<el-button type="primary" style="margin-bottom: 3px;" size="mini"><router-link :to="{path:'/resource/authcode_detail',query:{id:scope.row.id}}">详情</router-link></el-button>
				<el-button v-if="!scope.row.edit" type="danger" size="mini" icon="el-icon-delete" @click="delcus(scope.row.id)">删除</el-button>
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
  import { getAuthcodeList, addAuthcode, editAuthcode, delAuthcode } from '@/api/authcode.js'
  import { MessageBox } from 'element-ui'
  export default {
    name: 'resource_authcode',
    data() {
      return {
        token:'',
        list: [],
		addDsiabled:false,
		loading:false,
		dialogFormVisible: false,
		edit:false,
		p:0,
		max:20,//每页显示数量
		count:0,
		search1:{
			auth_code:'',
		},
		search:{
			auth_code:'',
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

		delcus(id) {
			this.$confirm('是否确定删除该授权码', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				delAuthcode({id:id}).then( response => {
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

		getList(data){
			this.loading = true
			getAuthcodeList(data).then( response => {
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
	}
  }
</script>
