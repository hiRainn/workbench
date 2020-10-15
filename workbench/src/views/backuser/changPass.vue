<template>
	<div class="app-container">


		<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="width:606px">
			<el-form-item label="旧密码" prop="password">
				<el-input type="password" v-model="ruleForm.password" autocomplete="off" show-password></el-input>
			</el-form-item>
			<el-form-item label="新密码" prop="pass">
				<el-input type="password" v-model="ruleForm.pass" autocomplete="off" show-password></el-input>
			</el-form-item>
			<el-form-item label="确认密码" prop="checkPass">
				<el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" show-password></el-input>
			</el-form-item>

			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
				<el-button @click="resetForm('ruleForm')">重置</el-button>
			</el-form-item>
		</el-form>

	</div>
</template>

<script>
	import {
		changePass
	} from '@/api/user.js'
	export default {
		data() {
			var checkAge = (rule, value, callback) => {
				if (!value) {
					callback(new Error('旧密码不能为空'));
				}
				if (value.length < 6) {
					callback(new Error('密码长度不能小于6位'));
				}
			};
			var validatePass = (rule, value, callback) => {
				if (value.length < 6) {
					callback(new Error('密码长度不能小于6位'));
				}
				if (value === '') {
					callback(new Error('请输入密码'));
				} else {
					if (this.ruleForm.checkPass !== '') {
						this.$refs.ruleForm.validateField('checkPass');
					}
					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.ruleForm.pass) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				ruleForm: {
					pass: '',
					checkPass: '',
					password: ''
				},
				rules: {
					pass: [{
						validator: validatePass,
						trigger: 'blur'
					}],
					checkPass: [{
						validator: validatePass2,
						trigger: 'blur'
					}],
					password: [{
						validator: checkAge,
						trigger: 'blur'
					}]
				}
			};
		},
		methods: {
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
			submitForm() {
				if (this.ruleForm.password.length < 6) {
					this.$alert('旧密码长度不能小于6位', '提示')
					return false;
				}
				if (this.ruleForm.pass.length < 6) {
					this.$alert('新密码长度不能小于6位', '提示')
					return false;
				}
				if (this.ruleForm.password == this.ruleForm.pass) {
					this.$alert('新旧密码不能相同', '提示')
					return false;
				}
				if (this.ruleForm.checkPass != this.ruleForm.pass) {
					this.$alert('密码确认不正确', '提示')
					return false;
				}

				var token = this.$store.getters.token;
				changePass(token, this.formName).then(r => {
					this.dialogFormVisible = false;
					this.$message({
						message: '修改成功',
						type: 'success'
					});
					console.log(r)
					// this.refreshView();
				}).catch(error => {
					this.addDsiabled = false;
					this.$alert(error, '提示')
				})

			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			}
		}
	}
</script>
