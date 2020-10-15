<template>
  <div class="app-container">

    <el-button type="primary" @click="dialogFormVisible = true" v-if="checkPermission(['admin'])" style="float:right;margin-bottom: 10px;">版本升级</el-button>
    <br>
    <el-dialog title="版本升级" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <el-upload class="upload-demo" action="http://hangan.com/upload/update" :headers="{'X-Token':token}"
        :file-list="fileList">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-dialog>

    <el-table :data="list" border v-loading="loading">
      <el-table-column label="系统版本号" prop="version">
      </el-table-column>
      <el-table-column label="数据库版本号" prop="db_version">
      </el-table-column>
      <el-table-column label="更新文件" prop="files">
      </el-table-column>
      <el-table-column label="更新数据库" prop="field">
      </el-table-column>
      <el-table-column label="更新内容" prop="desc">
      </el-table-column>
      <el-table-column label="更新时间" prop="created_at">
      </el-table-column>




    </el-table>
    <el-pagination background @current-change="changePage(p)" :current-page.sync="p" :page-size="max" layout="total, prev, pager, next"
      :total="count">
    </el-pagination>

  </div>
</template>

<script>
  import {
    getVersionList
  } from '@/api/version.js'
  import checkPermission from '@/utils/permission' // 权限判断函数

  export default {
    data() {
      return {
        token: '',
        list: [],
        loading: false,
        addDsiabled: false,
        dialogFormVisible: false,
        edit: false,
        p: 0,
        max: 50, //每页显示数量
        count: 0,
        fileList: [],

        search1: {
          user_id: '',
          start_at: '',
          end_at: ''

        },
        search: {
          user_id: '',
          start_at: '',
          end_at: ''
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




      getList(data) {
        this.loading = true
        getVersionList(data).then(response => {
          let data = response.data.list.data;
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
        this.search = data;
        this.getList(data);
      }
    },
    mounted() {
      this.getList({})
      this.token = this.$store.getters.token;
    }
  }
</script>
