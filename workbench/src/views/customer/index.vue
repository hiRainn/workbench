<template>
  <div class="app-container">
    <div class="filter-container">
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
    <el-button type="primary" @click="dialogFormVisible = true" style="float:right;margin-bottom: 10px;">添加客户</el-button>
    <br>
    <el-dialog title="添加客户" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <el-form :model="form" ref="form" label-width="80px">
        <el-form-item label="客户名称" prop="unit_name" :rules="[
				  { required: true, message: '客户名称不能为空'}
				]">
          <el-input v-model="form.unit_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="曾用名">
          <el-select v-model="form.usedname_id" filterable placeholder="选择曾用名">
            <el-option class="option" v-for="item in customer_list" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="信用代码">
          <el-input v-model="form.credit_code" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级单位" required>
          <el-select v-model="form.parent_id" filterable placeholder="选择上级单位">
            <el-option class="option" v-for="item in customer_list" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="行业" prop="trade" :rules="[
				  { required: true, message: '请选择行业'}
				]">
          <el-select v-model="form.trade" filterable clearable class="filter-item" loading-text="正在加载数据" placeholder="选择行业名称">
            <el-option class="option" v-for="item in trade_list" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系人">
          <el-input v-model="form.unit_contact" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="form.contact_phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所在地区" prop="area_id" :rules="[
				  { required: true, message: '请选择地区'}
				]">
          <el-select v-model="form.area_id" placeholder="行业类型">
            <el-option class="option" v-for="item in area" :key="item.id" :label="item.area_name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户地址">
          <el-input v-model="form.addr" autocomplete="off"></el-input>
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
      <el-table-column label="单位名称">
        <template slot-scope="scope">
          <span v-if="!scope.row.edit">{{ scope.row.unit_name }}</span>
          <el-input size="small" v-if="scope.row.edit" v-model="scope.row.unit_name" :value="scope.row.unit_name" />
        </template>
      </el-table-column>
      <el-table-column label="曾用名">
        <template slot-scope="scope">
          <span v-if="!scope.row.edit">{{ scope.row.used_name }}</span>
          <el-select v-model="scope.row.usedname_id" v-if="scope.row.edit" filterable clearable class="filter-item"
            loading-text="正在加载数据" placeholder="曾用名">
            </el-option>
            <el-option class="option" v-for="item in customer_list" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="社会信用代码">
        <template slot-scope="scope">
          <span v-if="!scope.row.edit">{{ scope.row.credit_code }}</span>
          <el-input size="small" v-if="scope.row.edit" :rows="7" v-model="scope.row.credit_code" :value="scope.row.credit_code" />
        </template>
      </el-table-column>
      <el-table-column label="行业">
        <template slot-scope="scope">
          <span v-if="!scope.row.edit">{{ scope.row.trade }}</span>
          <el-select v-if="scope.row.edit" v-model="scope.row.trade" filterable clearable class="filter-item"
            loading-text="正在加载数据" placeholder="输入行业名称">
            <el-option class="option" v-for="item in trade_list" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="单位联系人">
        <template slot-scope="scope">
          <span v-if="!scope.row.edit">{{ scope.row.unit_contact }}</span>
          <el-input size="small" v-if="scope.row.edit" v-model="scope.row.unit_contact" :value="scope.row.unit_contact" />
        </template>
      </el-table-column>
      <el-table-column label="联系人电话">
        <template slot-scope="scope">
          <span v-if="!scope.row.edit">{{ scope.row.contact_phone }}</span>
          <el-input size="small" v-if="scope.row.edit" v-model="scope.row.contact_phone" :value="scope.row.contact_phone" />
        </template>
      </el-table-column>
      <el-table-column label="上属单位">
        <template slot-scope="scope">
          <span v-if="!scope.row.edit">{{ scope.row.parent_name }}</span>
          <el-select v-model="scope.row.parent_id" v-if="scope.row.edit" filterable clearable class="filter-item"
            loading-text="正在加载数据" placeholder="上级单位">
            </el-option>
            <el-option class="option" v-for="item in customer_list" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="所属行政区">
        <template slot-scope="scope">
          <span v-if="!scope.row.edit">{{ scope.row.area_name }}</span>
          <el-select v-model="scope.row.area_id" v-if="scope.row.edit" filterable clearable class="filter-item"
            loading-text="正在加载数据" placeholder="所属行政区">
            <el-option class="option" v-for="item in area" :key="item.id" :label="item.area_name" :value="item.id">
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="地址">
        <template slot-scope="scope">
          <span v-if="!scope.row.edit">{{ scope.row.addr }}</span>
          <el-input type="textarea" size="small" v-if="scope.row.edit" v-model="scope.row.addr" :value="scope.row.addr" />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200px">
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
  import {
    getCustomerList,
    addCustomer,
    editCustomer,
    delCustomer,
    getSelectCustomer
  } from '@/api/customer.js'
  import {
    getArea
  } from '@/api/area.js'
  import {
    MessageBox
  } from 'element-ui'
  export default {
    name: 'customer_list',
    data() {
      return {
        customer_list: [],
        area: [],
        list: [],
        trade_list: [{
            id: '应急管理',
            name: '应急管理'
          },
          {
            id: '行政执法',
            name: '行政执法'
          },
          {
            id: '纪律部队',
            name: '纪律部队'
          },
          {
            id: '其他',
            name: '其他'
          },
        ],
        addDsiabled: false,
        loading: false,
        dialogFormVisible: false,
        edit: false,
        p: 0,
        max: 20, //每页显示数量
        count: 0,
        form: {
          usedname_id: '',
          unit_name: '',
          credit_code: '',
          used_name: '',
          addr: '',
          trade: '',
          unit_contact: '',
          contact_phone: '',
          parent_id: '',
          area_id: '',
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
        if (!this.validateTel(this.form.contact_phone)) {
          this.$alert('手机号码格式错误', '提示');
          this.addDsiabled = false;
          return false;
        }
        this.$refs['form'].validate(valid => {
          if (valid) {
            addCustomer(this.form).then(response => {
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
        if (data.unit_name == false) {
          this.$alert('客户名称不能为空', '提示');
          data.disabled = false;
          return false
        }
        if (!this.validateTel(data.contact_phone)) {
          this.$alert('手机号码格式错误', '提示');
          data.disabled = false;
          return false;
        }

        editCustomer(data).then(response => {
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
        this.$confirm('是否确定删除该客户', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delCustomer({
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
      getList(data) {
        this.loading = true
        getCustomerList(data).then(response => {
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
      //获取搜索条件的客户
      getCustomer() {
        getSelectCustomer({}).then(response => {
          this.customer_list = response.data.list;
          this.customer_list.unshift({
            id: 0,
            name: '无'
          })
        }).catch(error => {
          this.disable = true;
          this.$alert(error, '提示2')

        })
      },
      //获取地区
      getArea() {
        getArea({}).then(response => {
          this.area = response.data.list;
          this.area.unshift({
            id: 0,
            area_name: '无'
          })
        }).catch(error => {
          this.disable = true;
          this.$alert(error, '提示2')

        })
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
      this.getCustomer();
      this.getArea({});
    }
  }
</script>
