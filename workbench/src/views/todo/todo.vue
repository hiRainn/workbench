<template>
  <div class="app-container">
    <div class="filter-container" hidden>
      <el-select v-model="search1.id" filterable clearable class="filter-item" loading-text="正在加载数据" placeholder="输入搜索客户名称">

        <el-option class="option" v-for="item in customer_list" :key="item.id" :label="item.name" :value="item.id">
        </el-option>
      </el-select>
      <el-input placeholder="联系人名称" v-model="search1.unit_contact" style="width: 200px;" class="filter-item" />
      <el-input placeholder="联系电话" v-model="search1.contact_phone" style="width: 200px;" class="filter-item" />
      <el-select v-model="search1.area_id" filterable clearable class="filter-item" loading-text="正在加载数据" placeholder="所属行政区">
        <el-option class="option" v-for="item in area" :key="item.id" :label="item.area_name" :value="item.id">
        </el-option>
      </el-select>

      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="searchList">搜索</el-button>
    </div>
    <el-button type="primary" @click="dialogFormVisible = true" v-if="checkPermission(['admin'])" style="float:right;margin-bottom: 10px;">添加待办事项</el-button>
    <br>
    <el-dialog title="添加待办事项" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <el-form :model="form" ref="form" label-width="80px">
        <el-form-item label="标题" prop="title" :rules="[
				  { required: true, message: '标题不能为空'}
				]">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input type="textarea" v-model="form.content" autocomplete="off" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.remark" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="参与人员" required>
          <el-select v-model="form.contain_user" multiple="" filterable placeholder="选择参与人员">
            <el-option class="option" v-for="item in user_list" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择时间">
          <rl-row>
            <el-col :span="9">
              <el-date-picker v-model="form.do_time" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="选择时间日期"
                value-format="yyyy-MM-dd HH:mm">
              </el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="13">
              <el-date-picker v-model="form.deadline" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="选择时间日期"
                value-format="yyyy-MM-dd HH:mm">
              </el-date-picker>
            </el-col>
          </rl-row>

        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" :disabled="addDsiabled" @click="addcus()">确 定</el-button>
      </div>
    </el-dialog>
    <el-table :data="list" border v-loading="loading">
      <el-table-column prop="id" label="编号" width="50px">
      </el-table-column>
      <el-table-column label="标题">
        <template slot-scope="scope">
          <span v-if="!scope.row.edit">{{ scope.row.title }}</span>
          <el-input size="small" v-if="scope.row.edit" v-model="scope.row.title" :value="scope.row.title" />
        </template>
      </el-table-column>
      <el-table-column label="内容">
        <template slot-scope="scope">
          <span v-if="!scope.row.edit">{{ scope.row.content }}</span>
          <el-input size="small" v-if="scope.row.edit" v-model="scope.row.content" :value="scope.row.content" />
        </template>
      </el-table-column>
      <el-table-column label="备注">
        <template slot-scope="scope">
          <span v-if="!scope.row.edit">{{ scope.row.remark }}</span>
          <el-input size="small" v-if="scope.row.edit" :rows="7" v-model="scope.row.remark" :value="scope.row.remark" />
        </template>
      </el-table-column>
      <el-table-column label="参与人">
        <template slot-scope="scope">
          <span v-if="!scope.row.edit">{{ scope.row.contain_user_name }}</span>
          <el-select v-if="scope.row.edit" v-model="scope.row.contain_user" multiple filterable clearable class="filter-item"
            loading-text="正在加载数据" placeholder="参与人">
            <el-option class="option" v-for="item in user_list" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </template>
      </el-table-column>

      <el-table-column label="开始时间">
        <template slot-scope="scope">
          <span v-if="!scope.row.edit">{{ scope.row.do_time }}</span>
          <el-date-picker v-if="scope.row.edit" v-model="scope.row.do_time" type="datetime" placeholder="选择日期时间" format="yyyy-MM-dd HH:mm"
            value-format="yyyy-MM-dd HH:mm">
          </el-date-picker>
        </template>
      </el-table-column>
      <el-table-column label="截止时间">
        <template slot-scope="scope">
          <span v-if="!scope.row.edit">{{ scope.row.deadline }}</span>
          <el-date-picker v-if="scope.row.edit" v-model="scope.row.deadline" type="datetime" placeholder="选择日期时间"
            format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm">
          </el-date-picker>
        </template>
      </el-table-column>
      <el-table-column label="发布人">
        <template slot-scope="scope">
          <span>{{ scope.row.created_user_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发布时间">
        <template slot-scope="scope">
          <span>{{ scope.row.created_at }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="200px" v-if="checkPermission(['admin'])">
        <template slot-scope="scope">
          <el-button v-if="!scope.row.edit" type="primary" size="small" icon="el-icon-edit" @click="scope.row.edit = true">编辑</el-button>
          <el-button v-if="scope.row.edit" type="success" :disabled="scope.row.disabled" size="small" icon="el-icon-circle-check-outline"
            @click="confirmEdit(scope.row)">确定</el-button>
          <el-button v-if="scope.row.edit" type="danger" size="small" icon="el-icon-circle-check-outline" @click="scope.row.edit = false">取消</el-button>
          <el-button v-if="!scope.row.edit" type="danger" size="small" icon="el-icon-delete" @click="delcus(scope.row.id)">删除</el-button>
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
    getTodoList,
    addTodo,
    editTodo,
    delTodo
  } from '@/api/todo.js'
  import {
    getUserList
  } from '@/api/log.js'
  import {
    MessageBox
  } from 'element-ui'
  export default {
    data() {
      return {
        customer_list: [],
        user_list: [],

        addDsiabled: false,
        loading: false,
        dialogFormVisible: false,
        edit: false,
        p: 0,
        max: 20, //每页显示数量
        count: 0,
        form: {
          title: '',
          remark: '',
          content: '',
          do_time: '',
          deadline: '',
          contain_user: '',
          token: ''
        },
        search1: {
          id: '',
          unit_contact: '',
          contact_phone: '',
          area_id: '',
        },
        search: {
          id: '',
          unit_contact: '',
          contact_phone: '',
          area_id: '',
        }
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
            addTodo(this.form).then(response => {
              this.dialogFormVisible = false;
              this.$message({
                message: '新增成功',
                type: 'success'
              });
              this.refreshView();
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
        if (data.title == false) {
          this.$alert('标题不能为空', '提示');
          data.disabled = false;
          return false
        }
        editTodo(data).then(response => {
          data.edit = false;
          this.$message({
            message: '操作成功',
            type: 'success'
          });
          this.refreshView();
        }).catch(error => {
          data.disabled = false;
          this.$alert(error, '提示')
        })

      },
      delcus(id) {
        this.$confirm('是否确定删除该待办事项', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delTodo({
            id: id
          }).then(response => {
            this.$message({
              message: '操作成功',
              type: 'success'
            });
            this.refreshView();
          }).catch(error => {
            this.$alert(error, '提示')
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      validateTel(number) {
        if (!number) return true;
        if (number.match(/^1[3-9]\d{9}$/) || number.match(/^0\d{2,3}\-\d{7,8}$/)) {
          return true;
        } else {
          this.$alert('号码格式错误', '提示')
          return false;
        }
      },
      getUserList() {
        getUserList({}).then(response => {
          this.user_list = response.data
        }).catch(error => {
          this.loading = false
          this.$alert(error, '提示')
        })
      },
      getList(data) {
        this.loading = true
        getTodoList(data).then(response => {
          let data = response.data.list.data;
          for (let i in data) {
            data[i].edit = false;
            data[i].disabled = false;
          }
          this.list = data
          this.p = response.data.list.current_page;
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
      this.getUserList()
    }
  }
</script>
