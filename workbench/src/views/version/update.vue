<template>
  <div class="app-container">


    <el-table :data="list" border v-loading="loading">
      <el-table-column label="文件名称" prop="filename">
      </el-table-column>
      <el-table-column label="上传人" prop="name">
      </el-table-column>

      <el-table-column label="上传时间" prop="created_at">
      </el-table-column>




    </el-table>
    <el-pagination background @current-change="changePage(p)" :current-page.sync="p" :page-size="max" layout="total, prev, pager, next"
      :total="count">
    </el-pagination>

  </div>
</template>

<script>
  import {
    getUploadList
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
        getUploadList(data).then(response => {
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
