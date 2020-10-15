<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input placeholder="输入搜索项目编号" v-model="search1.id" clearable style="width: 200px;" />
      <el-input placeholder="输入搜索项目名称" v-model="search1.project_name" clearable style="width: 200px;" />
      <el-select v-model="search1.customer_id" filterable clearable loading-text="正在加载数据" placeholder="输入搜索签约单位名称">
        <el-option class="option" v-for="item in customer_list" :key="item.id" :label="item.name" :value="item.id">
        </el-option>
      </el-select>
      <el-select v-model="search1.sign_customer_id" filterable clearable loading-text="正在加载数据" placeholder="输入搜索使用单位名称">
        <el-option class="option" v-for="item in customer_list" :key="item.id" :label="item.name" :value="item.id">
        </el-option>
      </el-select>
      <el-select v-model="search1.project_stage" filterable clearable loading-text="正在加载数据" placeholder="输入搜索项目状态">
        <el-option class="option" v-for="(item,id) in project_stage" :key="id" :label="item" :value="item">
        </el-option>
      </el-select>
      <el-select v-model="search1.pay_status" filterable clearable placeholder="输入付款状态">
        <el-option class="option" v-for="(item,id) in ['已付清','未付清','预算','中止','预签约']" :key="id" :label="item" :value="item">
        </el-option>
      </el-select>
      <el-select v-model="search1.sign_status" filterable clearable placeholder="合同签订情况">
        <el-option class="option" v-for="(item,id) in ['已签订','未签订','无需签订','未找到合同']" :key="id" :label="item" :value="item">
        </el-option>
      </el-select>
      <el-select v-model="search1.is_important" filterable clearable placeholder="查看重点项目">
        <el-option class="option" v-for="(item,id) in ['是','否']" :key="id" :label="item" :value="item">
        </el-option>
      </el-select>
      <el-select v-model="search1.is_stat" filterable clearable placeholder="是否统计">
        <el-option class="option" v-for="(item,id) in ['是','否','全部']" :key="id" :label="item" :value="item">
        </el-option>
      </el-select>
      <el-input placeholder="输入项目金额" v-model="search1.sum_money" clearable style="width: 200px;" />
      <el-date-picker v-model="search1.own_year" type="year" placeholder="选择年">
      </el-date-picker>

      <!-- <el-input placeholder="用户名称" v-model="search1.user_name" clearable style="width: 200px;" />
			<el-input placeholder="联系电话" v-model="search1.user_phone" clearable style="width: 200px;" />
			<el-input placeholder="证件号码" v-model="search1.certificate_number" clearable style="width: 200px;" />
			<el-input placeholder="授权码" v-model="search1.auth_code" clearable style="width: 200px;" /> -->
      <el-button type="primary" icon="el-icon-search" @click="searchList">搜索</el-button>

      <el-dialog title="修改所属维护/后续项目" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
        <el-form :model="form" label-width="120px">
          <input type="hidden" v-model="form.id">
          <el-form-item label="所属维护项目">
            <el-select v-model="form.parent_id" multiple filterable clearable class="filter-item" loading-text="正在加载数据"
              placeholder="输入搜索类型">
              <el-option class="option" v-for="item in project_list" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属后续项目">
            <el-select v-model="form.follow_id" filterable clearable class="filter-item" loading-text="正在加载数据"
              placeholder="输入搜索类型">
              <el-option class="option" v-for="item in project_list" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" :disabled="addDsiabled" @click="addcus()">确 定</el-button>
      </el-dialog>

    </div>
    <div style="margin-top: 20px">
      <el-collapse-transition>
        <div v-show="show3">
          <div class="transition-box">
            <span style="margin-right:40px;">总计项目: {{ statData.total }} 个</span>
            <!-- <span style="margin-right:40px;">到期项目: {{ statData.end_number }} 个</span> -->
            <span style="margin-right:40px;">预算金额: {{ statData.money.maybe_sum_money || '' }} </span>
            <span style="margin-right:40px;">项目总额: {{ statData.money.sum_money || '' }} </span>
            <span style="margin-right:40px;">项目已收: {{ statData.money.paid_money || '' }} </span>
            <span style="margin-right:40px;">项目待收: {{ statData.money.unpaid_money   || '' }} </span>
          </div>
          <div class="transition-box">
            <span style="margin-right:10px;">各类型项目: </span>
            <span style="margin-right:20px;" v-for="(item,index) in statData.cate">{{ item.name }}: {{ item.num }}</span>
          </div>
          <div class="transition-box">
            <span style="margin-right:10px;">各阶段项目: </span>
            <span style="margin-right:20px;" v-for="(item,index) in statData.project_stage">{{ item.name }}: {{ item.num }}</span>
          </div>
          <div class="transition-box" style="margin-bottom: 20px;">
            <span style="margin-right:10px;">合同签订情况: </span>
            <span style="margin-right:40px;">已签订: {{ statData.sign.sign || '0' }} </span>
            <span style="margin-right:40px;">未签订: {{ statData.sign.unsign || '0' }} </span>
            <span style="margin-right:40px;">未找到合同: {{ statData.sign.unfind || '0' }} </span>
            <span style="margin-right:40px;">无需签订: {{ statData.sign.nosign   || '0' }} </span>
          </div>
        </div>
      </el-collapse-transition>
    </div>


    <el-button @click="show_detail">搜索详情</el-button>
    <el-button type="primary" style="float:right;margin-bottom: 10px;">
      <router-link to='/projected/add'>新增项目</router-link>
    </el-button>
    <br>
    <el-container style="width:100%;">
      <el-table ref="table" :data="list" border @sort-change="sortChange" v-loading="loading">
        <el-table-column prop="id" label="编号" width="45px" sortable>
        </el-table-column>
        <el-table-column label="项目名称">
          <template slot-scope="scope">
            <span v-if="!scope.row.edit && scope.row.is_important" style="color: red;">
              <svg-icon style="color: red;" icon-class="star" />{{ scope.row.project_name }}</span>
            <span v-if="!scope.row.edit && !scope.row.is_important">{{ scope.row.project_name }}</span>
            <el-input size="small" v-if="scope.row.edit" v-model="scope.row.project_name" />
          </template>
        </el-table-column>
        <el-table-column prop="unit_name" label="签约单位" sortable>
          <template slot-scope="scope">
            <span v-if="!scope.row.edit">{{ scope.row.unit_name }}</span>
            <el-select v-model="scope.row.customer_id" v-if="scope.row.edit" filterable clearable class="filter-item"
              loading-text="正在加载数据" placeholder="签约单位">
              </el-option>
              <el-option class="option" v-for="item in customer_list" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="use_unit_name" label="使用单位">
          <template slot-scope="scope">
            <span v-if="!scope.row.edit">{{ scope.row.use_unit_name }}</span>
            <el-select v-model="scope.row.sign_customer_id" v-if="scope.row.edit" filterable clearable class="filter-item"
              loading-text="正在加载数据" placeholder="使用单位">
              </el-option>
              <el-option class="option" v-for="item in customer_list" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="own_year" label="所属年度" sortable>
          <template slot-scope="scope">
            <span v-if="!scope.row.edit">{{ scope.row.own_year }}</span>
            <el-date-picker v-else v-model="scope.row.own_year" type="year" placeholder="选择年">
            </el-date-picker>
          </template>
        </el-table-column>
        <el-table-column prop="project_cate_name" label="项目类别" sortable>
          <template slot-scope="scope">
            <span v-if="!scope.row.edit">{{ scope.row.project_cate_name }}</span>
            <el-select v-else v-model="scope.row.project_cate_id" filterable clearable class="filter-item" loading-text="正在加载数据"
              placeholder="输入搜索类别">
              <el-option class="option" v-for="item in project_cate" :key="item.id" :label="item.cate_name" :value="item.id">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="project_type_name" label="项目类型" sortable>
          <template slot-scope="scope">
            <span v-if="!scope.row.edit">{{ scope.row.project_type_name }}</span>
            <el-select v-else v-model="scope.row.project_type_id" filterable clearable class="filter-item" loading-text="正在加载数据"
              placeholder="输入搜索类别">
              <el-option class="option" v-for="item in project_type" :key="item.id" :label="item.type_name" :value="item.id">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="oprate_type_name" label="合作类型" sortable>
          <template slot-scope="scope">
            <span v-if="!scope.row.edit">{{ scope.row.oprate_type_name }}</span>
            <el-select v-else v-model="scope.row.oprate_type_id" filterable clearable class="filter-item" loading-text="正在加载数据"
              placeholder="输入搜索类别">
              <el-option class="option" v-for="item in oprate_type" :key="item.id" :label="item.type_name" :value="item.id">
              </el-option>
            </el-select>
          </template>
        </el-table-column>

        <el-table-column prop="contractor_money" label="总包金额">
          <template slot-scope="scope">
            <span v-if="!scope.row.edit">{{ scope.row.contractor_money }}</span>
            <el-input size="small" v-if="scope.row.edit" v-model="scope.row.contractor_money" />
          </template>
        </el-table-column>

        <el-table-column prop="sum_money" label="项目金额" sortable>
          <template slot-scope="scope">
            <span v-if="!scope.row.edit">{{ scope.row.sum_money }}</span>
            <el-input size="small" v-if="scope.row.edit" v-model="scope.row.sum_money" />
          </template>
        </el-table-column>
        <el-table-column label="欠款">
          <template slot-scope="scope">
            <span style="color:red;">{{ scope.row.unpaid }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="project_stage" label="项目阶段">
          <template slot-scope="scope">
            <span v-if="!scope.row.edit">{{ scope.row.project_stage }}</span>
            <el-select v-model="scope.row.project_stage" v-if="scope.row.edit" filterable clearable class="filter-item"
              loading-text="正在加载数据" placeholder="项目阶段">
              <el-option class="option" v-for="(item,index) in project_stage" :key="index" :label="item" :value="item">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="contract_sign" label="合同签订">
          <template slot-scope="scope">
            <span v-if="!scope.row.edit">{{ scope.row.contract_sign }}</span>
            <el-input size="small" placeholder="合同编号" v-if="scope.row.edit" v-model="scope.row.contract_number" />
          </template>
        </el-table-column>
        <el-table-column label="是否后续项目" prop="is_follow">
        </el-table-column>
        <el-table-column label="是否维护项目" prop="is_children">
        </el-table-column>
        <el-table-column label="是否完结">
          <template slot-scope="scope">
            <span v-if="!scope.row.edit"> {{ scope.row.end_project?'是':'否' }} </span>
            <el-select v-model="scope.row.end_project" v-if="scope.row.edit" filterable clearable class="filter-item"
              loading-text="正在加载数据" placeholder="项目阶段">
              <el-option class="option" v-for="(item,index) in [{id:0,name:'否'},{id:1,name:'是'}]" :key="index" :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="签约时间" prop="sign_time" sortable>
          <template slot-scope="scope">
            <span v-if="!scope.row.edit"> {{ scope.row.sign_time }} </span>
            <el-date-picker v-else v-model="scope.row.sign_time" type="date" placeholder="签约日期" format="yyyy-MM-dd"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </template>
        </el-table-column>

        <el-table-column label="到期时间" prop="end_time" sortable>
          <template slot-scope="scope">
            <span v-if="!scope.row.edit"> {{ scope.row.end_time }} </span>
            <el-date-picker v-else v-model="scope.row.end_time" type="date" placeholder="签约日期" format="yyyy-MM-dd"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="200px">
          <template slot-scope="scope">
            <el-button v-if="!scope.row.edit" type="primary" size="mini" icon="el-icon-edit" @click="scope.row.edit = true">编辑</el-button>
            <el-button v-if="scope.row.edit" type="success" :disabled="scope.row.disabled" size="mini" icon="el-icon-circle-check-outline"
              @click="confirmEdit(scope.row)">确定</el-button>
            <el-button v-if="scope.row.edit" type="danger" size="mini" icon="el-icon-circle-check-outline" @click="scope.row.edit = false">取消</el-button>
            <el-dropdown split-button type="primary" size="mini" style="margin-left:5px;">
              更多
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <el-button v-if="!scope.row.edit" type="primary" size="mini" @click="changeFollow(scope.row,scope.row.id,scope.row.parent_id,scope.row.follow_id)">修改维护</el-button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-button v-if="!scope.row.edit" type="primary" style="margin-top: 3px;" size="mini">
                    <router-link :to="{path:'/projected/detail',query:{id:scope.row.id}}">详情</router-link>
                  </el-button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-button v-if="!scope.row.edit" type="danger" size="mini" icon="el-icon-delete" @click="delcus(scope.row.id)">删除</el-button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-button v-if="!scope.row.edit" type="primary" style="margin-top: 3px;" size="mini">
                    <router-link :to="{path:'/projected/copy',query:{id:scope.row.id}}">复制</router-link>
                  </el-button>
                </el-dropdown-item>

              </el-dropdown-menu>
            </el-dropdown>





          </template>
        </el-table-column>
      </el-table>
    </el-container>
    <el-pagination background @current-change="changePage(p)" :current-page.sync="p" :page-size="max" layout="total, prev, pager, next"
      :total="count">
    </el-pagination>

  </div>
</template>

<script>
  import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
  import Vue from 'vue'
  import {
    getSelectCustomer
  } from '@/api/customer.js'
  import {
    getProjectList,
    delProject,
    searchStat,
    editProject,
    getSelectProject,
    editPF
  } from '@/api/project.js'
  import {
    getProjectTypeList
  } from '@/api/project_type.js'
  import {
    getOprateTypeList
  } from '@/api/oprate_type.js'
  import {
    getProjectCateList
  } from '@/api/project_cate.js'
  import {
    MessageBox
  } from 'element-ui'
  Vue.component(CollapseTransition.name, CollapseTransition)

  export default {
    name:'project_list',
    data() {
      return {
        addDsiabled:false,
        dialogFormVisible: false,
        show3: true,
        form: {
          id: '',
          parent_id: [],
          follow_id: ''
        },
        statData: {
          money: {
            maybe_sum_money: '',
            sum_money: '',
            paid_money: '',
            unpaid_money: ''
          },
          sign: {
            sign: 0,
            unsign: 0,
            nosign: 0
          }
        },
        project_list: [],
        baseUrl: process.env.BASE_API,
        project_stage: ['预签约', '需求/预算', '拟写相关材料', '招标', '投标', '合同流程', '中止', '发票', '实施', '待收款', '欠款', '验收', '免费维护期',
          '完结'
        ],
        sort_type: {
          'name': 'sign_time',
          'type': 'desc'
        },
        list: [],
        customer_list: [],
        project_type: [],
        project_cate: [],
        oprate_type: [],
        loading: false,
        select_loading: true,
        p: 0, // 分页
        max: 20, //每页显示数量
        count: 0,
        status: [{
          id: 0,
          name: '正常'
        }, {
          id: 1,
          name: '停用'
        }],
        search1: {
          id:'',
          is_important: '',
          customer_id: '',
          user_name: '',
          user_phone: '',
          certificate_number: '',
          auth_code: '',
          project_stage: '',
          own_year: '',
          project_name: '',
          sum_money: '',
          pay_status: '',
          sign_customer_id: '',
          sign_status: '',
          is_stat: ''

        },
        search: {
          id:'',
          is_important: '',
          customer_id: '',
          sign_customer_id: '',
          user_name: '',
          user_phone: '',
          certificate_number: '',
          auth_code: '',
          project_stage: '',
          own_year: '',
          project_name: '',
          sum_money: '',
          pay_status: '',
          sign_status: '',
          is_stat: ''
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
      sortChange(column) {
        if (this.$refs.table) this.$refs.table.clearSort()
        this.p = 1
        this.sort_type.name = column.prop;
        if (column.order == 'descending') {
          this.sort_type.type = 'desc';
        } else {
          this.sort_type.type = 'asc';
        }
        this.changePage(this.p)
        return false
      },
      getList(data) {
        this.loading = true
        getProjectList(data).then(response => {
          let data = response.data.list.data;
          //处理数据
          for (let i in data) {
            data[i].edit = false;
            data[i].disabled = false;
            if (data[i]['sign_time'] == '1970-01-01') {
              data[i]['sign_time'] = ''
            }
            if (data[i]['end_time'] == '1970-01-01') {
              data[i]['end_time'] = ''
            }
            if (data[i]['customer_id'] == 0) {
              data[i]['customer_id'] = ''
            }
            if (data[i]['sign_customer_id'] == 0) {
              data[i]['sign_customer_id'] = ''
            }
            if (data[i]['oprate_type_id'] == 0) {
              data[i]['oprate_type_id'] = ''
            }
            if (data[i]['project_type_id'] == 0) {
              data[i]['project_type_id'] = ''
            }
            if (data[i]['project_cate_id'] == 0) {
              data[i]['project_cate_id'] = ''
            }
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
      getProject() {
        getSelectProject({}).then(response => {
          this.project_list = response.data.list;
        }).catch(error => {
          this.disable = true;
          this.$alert(error, '提示7')
        })
      },
      //编辑所属维护项目、后续项目
      changeFollow(scope, id, parent_id, follow_id) {
        this.dialogFormVisible = true;
        this.form.id = id;
        this.form.follow_id = follow_id;
        var tmp;
        if (parent_id == false) {
          tmp = [];
        } else {
          tmp = parent_id.split(',');
        }
        for (var p in tmp) {
          tmp[p] = parseInt(tmp[p])
        }
        this.form.parent_id = tmp;
        scope.parent_id = tmp
        scope.follow_id = follow_id;
      },
      addcus() {
        this.addDsiabled = true;
        editPF(this.form).then(response => {
          this.dialogFormVisible = false;
          this.$message({
            message: '修改维护、后续项目成功，刷新页面后生效',
            type: 'success'
          });
          this.addDsiabled = false;
        }).catch(error => {
          this.addDsiabled = false;
          this.$alert(error, '提示')
        })


      },
      confirmEdit(data) {
        data.disabled = true;
        // if(data.unit_name == false) {
        // 	this.$alert('客户名称不能为空','提示');
        // 	data.disabled = false;
        // 	return false
        // }
        // if(!this.validateTel(data.contact_phone)){
        // 	this.$alert('手机号码格式错误','提示');
        // 	data.disabled = false;
        // 	return false;
        // }

        editProject(data).then(response => {
          data.edit = false;
          this.$message({
            message: '修改成功，刷新页面后生效',
            type: 'success'
          });
          // this.refreshView();
        }).catch(error => {
          data.disabled = false;
          this.$alert(error, '提示')
        })

      },
      show_detail() {
        this.show3 = !this.show3;
        return false;
      },
      changePage(page) {
        let data = this.search;
        data.sort_type = this.sort_type
        for (let i in data) {
          if (data[i] == false) {
            delete data[i]
          }
        }
        data.p = page;
        this.getList(data);
      },
      getStat(data) {
        searchStat(data).then(response => {
          this.statData = response.data
        })

      },
      searchList() {
        let data = this.search1;
        for (let i in data) {
          if (data[i] == false) {
            delete data[i]
          }
        }
        this.search = data;
        this.getList(data);
        this.getStat(data);
      },
      getProjectTypeList(data) {
        getProjectTypeList(data).then(response => {
          let data = response.data.list;
          this.project_type = data;
        })
      },
      getProjectCateList(data) {
        getProjectCateList(data).then(response => {
          let data = response.data.list;
          this.project_cate = data;
        })
      },
      getOprateTypeList(data) {
        getOprateTypeList(data).then(response => {
          let data = response.data.list;
          this.oprate_type = data;
        })
      },
      getCustomer() {
        getSelectCustomer({}).then(response => {
          this.customer_list = response.data.list;
          this.select_loading = false;
        }).catch(error => {
          this.$alert(error, '提示')
        })
      },
      delcus(id) {
        this.$confirm('是否确定删除该项目', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delProject({
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
    },
    mounted() {
      if (typeof this.$route.query.project_stage != 'undefined') {
        this.search1.project_stage = this.$route.query.project_stage
        let data = this.search1;
        for (let i in data) {
          if (data[i] == false) {
            delete data[i]
          }
        }
        this.search = data;
        this.getList(data);
        this.getStat(data)
      } else if (typeof this.$route.query.pay_status != 'undefined') {
        this.search1.pay_status = this.$route.query.pay_status
        let data = this.search1;
        for (let i in data) {
          if (data[i] == false) {
            delete data[i]
          }
        }
        this.search = data;
        this.getList(data);
        this.getStat(data)
      } else {
        this.getList({});
        this.getStat({})
      }

      this.getCustomer();
      this.getOprateTypeList({})
      this.getProjectTypeList({});
      this.getProjectCateList({});
      this.getProject({});
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
