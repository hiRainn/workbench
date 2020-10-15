<template>
	<div class="app-container">

		<el-button type="primary" v-if="checkPermission(['developer'])" @click="dialogFormVisible = true" style="float:right;margin-bottom: 10px;">添加角色</el-button>
		<br>
		<el-dialog title="添加角色" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
			<el-form :model="form" ref="form" label-width="80px">
				<el-form-item label="角色名称" prop="name" :rules="[
				   { required: true, message: '名称不能为空'}
				]">
					<el-input v-model="form.name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="开发标示">
					<el-input v-model="form.develop_mark" autocomplete="off" placeholder="若有多个请用顿号隔开"></el-input>
				</el-form-item>
				<el-form-item label="备注">
					<el-input v-model="form.remark" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" :disabled="addDsiabled" @click="addcus()">确 定</el-button>
			</div>
		</el-dialog>
		<el-table :data="list" border v-loading="loading">

			<el-table-column label="角色名称">
				<template slot-scope="scope">
					<span v-if="!scope.row.edit">{{ scope.row.name }}</span>
					<el-input size="small" v-if="scope.row.edit" v-model="scope.row.name" :value="scope.row.name" />
				</template>
			</el-table-column>
			<el-table-column label="开发标示" v-if="checkPermission(['developer'])">
				<template slot-scope="scope">
					<span v-if="!scope.row.edit">{{ scope.row.develop_mark }}</span>
					<el-input size="small" v-if="scope.row.edit" v-model="scope.row.develop_mark" :value="scope.row.develop_mark" />
				</template>
			</el-table-column>
			<el-table-column label="备注">
				<template slot-scope="scope">
					<span v-if="!scope.row.edit">{{ scope.row.remark }}</span>
					<el-input size="small" v-if="scope.row.edit" :rows="7" v-model="scope.row.remark" :value="scope.row.remark" />
				</template>
			</el-table-column>


			<el-table-column label="操作" width="200px">
				<template slot-scope="scope">
					<el-button v-if="!scope.row.edit" type="primary" size="small" icon="el-icon-edit" @click="scope.row.edit = true">编辑</el-button>
					<el-button v-if="scope.row.edit" type="success" :disabled="scope.row.disabled" size="small" icon="el-icon-circle-check-outline"
					 @click="confirmEdit(scope.row)">确定</el-button>
					<el-button v-if="scope.row.edit" type="danger" size="small" icon="el-icon-circle-check-outline" @click="scope.row.edit = false">取消</el-button>
					<!-- 				<el-button v-if="!scope.row.edit" type="danger" size="small" icon="el-icon-delete" @click="delcus(scope.row.id)">删除</el-button> -->
				</template>
			</el-table-column>
		</el-table>
		<el-pagination background @current-change="changePage(p)" :current-page.sync="p" :page-size="max" layout="total, prev, pager, next"
		 :total="count">
		</el-pagination>

	</div>
</template>

<script>
	import checkPermission from '@/utils/permission' // 权限判断函数
	import {
		getRoles,
		addRole,
		editRole,
		deleteRole
	} from '@/api/role.js'
	export default {
		data() {
			return {
				list: [],
				addDsiabled: false,
				loading: false,
				dialogFormVisible: false,
				edit: false,
				p: 0,
				max: 20, //每页显示数量
				count: 0,
				form: {
					name: '',
					develop_mark: '',
					remark: '',
					token: ''
				},
			}
		},
		methods: {
			checkPermission,
			refreshView() {
				// In order to make the cached page re-rendered
				this.$store.dispatch('delAllCachedViews', this.$route)

				const {
					fullPath
				} = this.$route

				this.$nextTick(() => {
					this.$router.replace({
						path: '/redirect' + fullPath
					})
				})
			},
			addcus() {
				this.addDsiabled = true;

				this.$refs['form'].validate(valid => {
					if (valid) {
						addRole(this.form).then(response => {
							this.dialogFormVisible = false;
							this.$message({
								message: ' 修改成功',
								type: 'success'
							});
							this.refreshView();
							console.log(response)
						}).catch(error => {
							this.addDsiabled = false;
							this.$alert(error, '提示')
						})
					} else {
						this.addDsiabled = false;
						return false;
					}
				})

			},
			confirmEdit(data) {
				data.disabled = true;
				if (data.name == false) {
					this.$alert('名称不能为空', '提示');
					data.disabled = false;
					return false
				}

				editRole(data).then(response => {
					data.edit = false;
					this.$message({
						message: '操作成功',
						type: 'success'
					});
					this.refreshView();
					console.log(response)
				}).catch(error => {
					data.disabled = false;
					this.$alert(error, '提示')
				})

			},
			delcus(id) {
				this.$confirm('是否确定删除该角色', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					deleteRole({
						id: id
					}).then(response => {
						this.$message({
							message: '操作成功',
							type: 'success'
						});
						this.refreshView();
						console.log(response)
					}).catch(error => {
						this.$alert(error, '提示')
					})
				}).catch((err) => {
					this.$message({
						type: 'info',
						message: err
					});
				});
			},

			getList(data) {
				this.loading = true
				getRoles(data).then(response => {
					let data = response.data.list.data;
					for (let i in data) {
						data[i].edit = false;
						data[i].disabled = false;
					}
					this.list = data
					this.p = parseInt(response.data.p);
					this.count = response.data.count;
					this.loading = false
				}).catch(error => {
					this.loading = false
					this.$alert(error, '提示')
				})
			},
			changePage(page) {
				let data = this.search;
				for (let i in data) {
					if (data[i] == false) {
						delete data[i]
					}
				}
				data.p = page;
				this.getList(data);
			},


			searchList() {
				let data = this.search1;
				for (let i in data) {
					if (data[i] == false) {
						delete data[i]
					}
				}

				delete data.area;
				this.search = data;
				this.getList(data);
			}
		},
		mounted() {
			this.getList({})
		}
	}
</script>
