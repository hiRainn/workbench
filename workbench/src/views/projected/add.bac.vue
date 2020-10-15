文件上传格式为缩略图

<template>
	<div class="app-container" v-loading="loading">

		<el-button type="primary" v-if="(op_type == 2) && (edit == false)" style="right:70px;position: fixed;z-index: 9999;" @click="edit = true">编辑</el-button>
		<el-button type="danger" v-if="(op_type == 2) && edit" style="right:70px;position: fixed;z-index: 9999;" @click="cancleEdit">取消</el-button>
		<el-button type="success"  v-if="edit" :disable="disable" style="right:150px;position: fixed;z-index: 9999;" @click="confirm('data')">确定</el-button>
		<br>
		<h2>详情:</h2>
		<el-form label-width="120px" style="width=800px;" :model="data" :rules="rules" ref="data">
			<el-form-item label="项目名称" prop="project_name">
				<span v-if="!edit">{{ data.project_name }}</span>
				<el-input v-else v-model="data.project_name" ></el-input>
			</el-form-item>

			<el-form-item label="所属年份" prop="own_year">
				<span v-if="!edit">{{ data.own_year }}</span>
				<el-date-picker
				  v-else
				  v-model="data.own_year"
				  type="year"
				  placeholder="选择年">
				</el-date-picker>
			</el-form-item>

      <el-form-item label="总包商">
      	<span v-if="!edit">{{ data.contractor }}</span>
      	<el-input v-else v-model.number="data.contractor"></el-input>
      </el-form-item>

      <el-form-item label="项目阶段">
      	<span v-if="!edit">{{ data.project_stage }}</span>
      	<el-select v-else v-model="data.project_stage"   filterable clearable class="filter-item" loading-text="正在加载数据" placeholder="输入搜索项目阶段">
      		<el-option class="option"
      			v-for="(item,id) in project_stage"
      			:key="id"
      			:label="item"
      			:value="item">
      		</el-option>
      	</el-select>
      </el-form-item>

			<el-form-item label="签约单位">
				<span v-if="!edit">{{ data.unit_name }}</span>
				<el-select v-else v-model="data.customer_id" @change="changeCid"  filterable clearable class="filter-item" loading-text="正在加载数据" placeholder="输入搜索客户名称">
					<el-option class="option"
						v-for="item in customer_list"
						:key="item.id"
						:label="item.name"
						:value="item.id">
					</el-option>
				</el-select>
			</el-form-item>

      <el-form-item label="使用单位">
      	<span v-if="!edit">{{ data.sign_unit_name }}</span>
      	<el-select v-else v-model="data.sign_customer_id" @change="changeSCid"  filterable clearable class="filter-item" loading-text="正在加载数据" placeholder="输入搜索客户名称">
      		<el-option class="option"
      			v-for="item in customer_list"
      			:key="item.id"
      			:label="item.name"
      			:value="item.id">
      		</el-option>
      	</el-select>
      </el-form-item>

      <el-form-item label="是否为维护项目">
      	<span v-if="!edit">{{ data.parent_project_name }}</span>
      	<el-select v-else v-model="data.parent_id" filterable clearable multiple class="filter-item" loading-text="正在加载数据" placeholder="是则选择所属合作项目,可多选">
      		<el-option class="option"
      			v-for="item in project_list"
      			:key="item.id"
      			:label="item.name"
      			:value="item.id"
            :disabled="item.disabled">
      		</el-option>
      	</el-select>
      </el-form-item>

      <el-form-item label="是否为后续项目">
      	<span v-if="!edit">{{ data.follow_project_name }}</span>
      	<el-select v-else v-model="data.follow_id" filterable clearable class="filter-item" loading-text="正在加载数据" placeholder="是则选择上级项目">
      		<el-option class="option"
      			v-for="item in project_list"
      			:key="item.id"
      			:label="item.name"
      			:value="item.id"
            :disabled="item.disabled">
      		</el-option>
      	</el-select>
      	</el-select>
      </el-form-item>

			<el-form-item label="项目类别">
				<span v-if="!edit">{{ data.project_cate_name }}</span>
				<el-select v-else v-model="data.project_cate_id"   filterable clearable class="filter-item" loading-text="正在加载数据" placeholder="输入搜索类别">
					<el-option class="option"
						v-for="item in project_cate"
						:key="item.id"
						:label="item.cate_name"
						:value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="项目类型">
				<span v-if="!edit">{{ data.project_type_name }}</span>
				<el-select v-else v-model="data.project_type_id"  filterable clearable class="filter-item" loading-text="正在加载数据" placeholder="输入搜索类型">
					<el-option class="option"
						v-for="item in project_type"
						:key="item.id"
						:label="item.type_name"
						:value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
      <el-form-item label="项目行业">
      	<span v-if="!edit">{{ data.project_trade_name }}</span>
      	<el-select v-else v-model="data.project_trade_id"  filterable clearable class="filter-item" loading-text="正在加载数据" placeholder="输入搜索类型">
      		<el-option class="option"
      			v-for="item in project_trade"
      			:key="item.id"
      			:label="item.trade_name"
      			:value="item.id">
      		</el-option>
      	</el-select>
      </el-form-item>
			<el-form-item label="合作类型">
				<span v-if="!edit">{{ data.oprate_type_name }}</span>
				<el-select v-else v-model="data.oprate_type_id"   filterable clearable class="filter-item" loading-text="正在加载数据" placeholder="输入搜索类型">
					<el-option class="option"
						v-for="item in oprate_type"
						:key="item.id"
						:label="item.type_name"
						:value="item.id">
					</el-option>
				</el-select>
			</el-form-item>

      <el-form-item label="总包金额">
      	<span v-if="!edit && data.contractor != false">{{ data.contractor_money }}</span>
      	<el-input v-if="edit && data.contractor != false" v-model="data.contractor_money" placeholder="若无则不填"></el-input>
      </el-form-item>

			<el-form-item label="项目金额">
				<span v-if="!edit">{{ data.sum_money }}</span>
				<el-input v-else v-model="data.sum_money" @change="findSame"></el-input>
			</el-form-item>

      <el-form-item label="已付金额">
      	<span v-if="!edit">{{ data.paid_money }}</span>
      	<el-input v-else v-model="data.paid_money"></el-input>
      </el-form-item>

      <el-form-item label="项目内容">
      </el-form-item>
			<el-form-item label="服务清单">
         <el-table
          v-if="edit"
           :data="data.service_info"
           ref="data.service_info"
           tooltip-effect="dark"
           :header-cell-style="{background:'#eef1f6',color:'#606266',border:'1px solid #F08047'}"
           border
           stripe
           style="width: 95%"
           @selection-change='selectRow'>
           <el-table-column type="selection" width="45" align="center" rowspan='2'></el-table-column>
           <el-table-column label="序号"  type="index" width="60" align="center"></el-table-column>
           <el-table-column  label="项目名称" align="center" >
             <template slot-scope="scope">
                 <el-input v-model="scope.row.item_name"></el-input>
             </template>
           </el-table-column>
           <el-table-column  label="数量" align="center" >
             <template slot-scope="scope">
                 <el-input v-model="scope.row.num"></el-input>
             </template>
           </el-table-column>
           <el-table-column  label="月租" align="center" >
             <template slot-scope="scope">
                 <el-input v-model="scope.row.month_rent"></el-input>
             </template>
           </el-table-column>
           <el-table-column  label="单位" align="center" >
             <template slot-scope="scope">
                 <el-input v-model="scope.row.unit"></el-input>
             </template>
           </el-table-column>
           <el-table-column  label="主要服务内容" align="center" >
             <template slot-scope="scope">
                 <el-input v-model="scope.row.service_content"></el-input>
             </template>
           </el-table-column>
           <el-table-column  label="小计" align="center" >
             <template slot-scope="scope">
                 <el-input v-model="scope.row.total_money"></el-input>
             </template>
           </el-table-column>
           <el-table-column  label="服务期(月)" align="center" >
             <template slot-scope="scope">
                 <el-input v-model="scope.row.service_period"></el-input>
             </template>
           </el-table-column>
           <el-table-column  label="总体服务期" align="center" >
             <template slot-scope="scope">
                 <el-input v-model="scope.row.total_service_period"></el-input>
             </template>
           </el-table-column>
           <el-table-column  label="备注" align="center" >
             <template slot-scope="scope">
                 <el-input v-model="scope.row.remark"></el-input>
             </template>
           </el-table-column>


         </el-table>


				<el-form-item v-if="edit">
					<el-button @click="addService">新增服务</el-button>
          <!-- <el-button @click="delData">删除所选</el-button> -->
				</el-form-item>
				<el-form-item v-if="!edit">
					<el-table
					  :data="data.info"
            style="width: 95%"
            :header-cell-style="{background:'#eef1f6',color:'#606266',border:'1px solid #F08047'}"
            border
            stripe
					  >
					  </el-table-column>
            <el-table-column  label="项目名称" align="center" >
              <template slot-scope="scope">
                <span>{{ scope.row.item_name }} </span>
                  <el-input v-model="scope.row.item_name"></el-input>
              </template>
            </el-table-column>
            <el-table-column  label="数量" align="center" >
              <template slot-scope="scope">
                <span>{{ scope.row.num }} </span>
              </template>
            </el-table-column>
            <el-table-column  label="月租" align="center" >
              <template slot-scope="scope">
                <span>{{ scope.row.month_rent }} </span>
              </template>
            </el-table-column>
            <el-table-column  label="单位" align="center" >
              <template slot-scope="scope">
                <span>{{ scope.row.unit }} </span>
              </template>
            </el-table-column>
            <el-table-column  label="主要服务内容" align="center" >
              <template slot-scope="scope">
                <span>{{ scope.row.service_content }} </span>
              </template>
            </el-table-column>
            <el-table-column  label="小计" align="center" >
              <template slot-scope="scope">
                <span>{{ scope.row.total_money }} </span>
              </template>
            </el-table-column>
            <el-table-column  label="服务期(月)" align="center" >
              <template slot-scope="scope">
                <span>{{ scope.row.service_period }} </span>
              </template>
            </el-table-column>
            <el-table-column  label="总体服务期" align="center" >
              <template slot-scope="scope">
                <span>{{ scope.row.total_service_period }} </span>
              </template>
            </el-table-column>
            <el-table-column  label="备注" align="center" >
              <template slot-scope="scope">
                <span>{{ scope.row.remark }} </span>
              </template>
            </el-table-column>
					</el-table>
				</el-form-item>
			</el-form-item>




      <el-form-item label="项目计划收款">
        <el-table
          v-if="op_type == 1"
           :data="data.pay_info"
           ref="data.pay_info"
           style="width: 85%"
           >
           <el-table-column label="序号"  type="index" width="60" align="center"></el-table-column>
           <el-table-column  label="付款类型" align="center" >
             <template slot-scope="scope">
                 <el-input v-model="scope.row.pay_type" ></el-input>
             </template>
           </el-table-column>
           <el-table-column  label="金额" align="center" >
             <template slot-scope="scope">
                 <el-input v-model="scope.row.amount" @blur="sum_amount()"></el-input>
             </template>
           </el-table-column>
           <el-table-column  label="比例" align="center" >
             <template slot-scope="scope">
                 <el-input v-model="scope.row.scale" ></el-input>
             </template>
           </el-table-column>
           <el-table-column  label="付款截止时间" align="center" >
             <template slot-scope="scope">
                	<span v-if="!edit">{{ scope.row.dead_line }}</span>
                  <el-date-picker
                    v-else
                    v-model="scope.row.dead_line"
                    type="date"
                    placeholder="日期"
                    format="yyyy-MM-dd">
                  </el-date-picker>
             </template>
           </el-table-column>
           <el-table-column  label="备注" align="center" >
             <template slot-scope="scope">
                 <el-input type="textarea" v-model="scope.row.remark"></el-input>
             </template>
           </el-table-column>

         </el-table>


      	<el-form-item v-if="op_type == 1">
      		<el-button @click="addPay">新增内容</el-button>
      	</el-form-item>

        <el-table
          v-if="op_type != 1"
           :data="pay_info"
           ref="data.pay_info"
           style="width: 85%"
           >
           <el-table-column label="序号"  type="index" width="60" align="center"></el-table-column>
           <el-table-column  label="付款类型" align="center" >
             <template slot-scope="scope">
               <span>{{ scope.row.pay_type }}</span>
             </template>
           </el-table-column>
           <el-table-column  label="金额" align="center" >
             <template slot-scope="scope">
               <span>{{ scope.row.amount }}</span>
             </template>
           </el-table-column>
           <el-table-column  label="比例" align="center" width="100">
             <template slot-scope="scope">
               <span>{{ scope.row.scale }}</span>
             </template>
           </el-table-column>
           <el-table-column  label="付款截止时间" align="center" >
             <template slot-scope="scope">
                	<span>{{ scope.row.dead_line }}</span>
             </template>
           </el-table-column>
           <el-table-column  label="备注" align="center" >
             <template slot-scope="scope">
                <span>{{ scope.row.remark }}</span>
             </template>
           </el-table-column>

           <el-table-column  label="状态" align="center" >
             <template slot-scope="scope">
                	<span>{{ scope.row.status_name }}</span>
             </template>
           </el-table-column>
         </el-table>

      </el-form-item>

      <el-form-item label="计划收款金额">
      	<span v-if="!edit">{{ data.plan_money }}</span>
      	<el-input v-else v-model.number="data.plan_money" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="中标时间">
      	<span v-if="!edit">{{ data.bidding_time }}</span>
      	<el-date-picker
      	  v-else
      	  v-model="data.bidding_time"
      	  type="date"
      	  placeholder="日期"
      	  format="yyyy-MM-dd"
          value-format="yyyy-MM-dd">
      	</el-date-picker>
      </el-form-item>
			<el-form-item label="签约时间">
				<span v-if="!edit">{{ data.sign_time }}</span>
				<el-date-picker
				  v-else
				  v-model="data.sign_time"
				  type="date"
				  placeholder="日期"
          format="yyyy-MM-dd"
				  value-format="yyyy-MM-dd">
				</el-date-picker>
			</el-form-item>
      <el-form-item label="送货时间">
      	<span v-if="!edit">{{ data.delivery_time }}</span>
      	<el-date-picker
      	  v-else
      	  v-model="data.delivery_time"
      	  type="date"
      	  placeholder="日期"
      	  format="yyyy-MM-dd"
          value-format="yyyy-MM-dd">
      	</el-date-picker>
      </el-form-item>


			<el-form-item label="验收时间">
				<span v-if="!edit">{{ data.check_time }}</span>
				<el-date-picker
				  v-else
				  v-model="data.check_time"
				  type="date"
				  placeholder="日期"
				  format="yyyy-MM-dd"
          value-format="yyyy-MM-dd">
				</el-date-picker>
			</el-form-item>
			<el-form-item label="到期时间">
				<span v-if="!edit">{{ data.end_time }}</span>
				<el-date-picker
				  v-else
				  v-model="data.end_time"
				  type="date"
				  placeholder="日期"
				  format="yyyy-MM-dd"
          value-format="yyyy-MM-dd">
				</el-date-picker>
			</el-form-item>


			<el-form-item label="项目主要工作要求">
				<span v-if="!edit">{{ data.project_desc }}</span>
				<el-input type="textarea" v-else v-model.number="data.project_desc" ></el-input>
			</el-form-item>

      <el-form-item label="是否终结项目">
      	<el-switch
      	  v-model="data.end_project"
      	  active-text="是"
      	  inactive-text="否">
      	</el-switch>
      </el-form-item>

      <el-form-item label="终结项目备注">
      	<span v-if="!edit">{{ data.end_remark }}</span>
      	<el-input type="textarea" v-else v-model.number="data.end_remark" ></el-input>
      </el-form-item>



      <el-form-item label="上传中标通知书">
      	<el-upload
          :data="{project_id:data.id,type:1}"
      	  action="http://hangan.com/upload/upload_project_image"
          :headers="{'X-Token':token}"
          :class="{disabled:!edit}"
      	  list-type="picture-card"
          :auto-upload="false"
          :on-success="(resopnse,file,fileList) => {handPictureSucc(resopnse,file,fileList ,'bidding')}"
          :file-list="bidImageList"
          :on-change="(file, fileList) => {hangePictureChange(file, fileList, 'bidding')}"
          ref="bidding">

      	    <i slot="default" class="el-icon-plus"></i>
      	    <div slot="file" slot-scope="{file}">
      	      <img
      	        class="el-upload-list__item-thumbnail"
      	        :src="file.url" alt=""
      	      >
      	      <span class="el-upload-list__item-actions">
      	        <span
      	          class="el-upload-list__item-preview"
      	          @click="handlePictureCardPreview(file)"
      	        >
      	          <i class="el-icon-zoom-in"></i>
      	        </span>
      	        <span
      	          v-if="!disabled"
      	          class="el-upload-list__item-delete"
      	          @click="handleRemove(file,'bidding')"
      	        >
      	          <i class="el-icon-delete"></i>
      	        </span>
      	      </span>
      	    </div>
      	</el-upload>
      	<el-dialog :visible.sync="dialogVisible">
      	  <img width="100%" :src="dialogImageUrl" alt="">
      	</el-dialog>
      </el-form-item>

      <el-form-item label="上传送货单">
      	<el-upload
          :headers="{'X-Token':token}"
          :data="{project_id:data.id,type:2}"
      	  action="http://hangan.com/upload/upload_project_image"
          :class="{disabled:!edit}"
      	  list-type="picture-card"
          :file-list="deliveyImageList"
          :on-success="(resopnse,file,fileList) => {handPictureSucc(resopnse,file,fileList ,'delivery')}"
      	  :auto-upload="false"
          :on-change="(file, fileList) => {hangePictureChange(file, fileList, 'delivery')}"
          ref="delivery">
      	    <i slot="default" class="el-icon-plus"></i>
      	    <div slot="file" slot-scope="{file}">
      	      <img
      	        class="el-upload-list__item-thumbnail"
      	        :src="file.url" alt=""
      	      >
      	      <span class="el-upload-list__item-actions">
      	        <span
      	          class="el-upload-list__item-preview"
      	          @click="handlePictureCardPreview(file)"
      	        >
      	          <i class="el-icon-zoom-in"></i>
      	        </span>
      	        <span
      	          v-if="!disabled"
      	          class="el-upload-list__item-delete"
      	          @click="handleRemove(file,'delivery')"
      	        >
      	          <i class="el-icon-delete"></i>
      	        </span>
      	      </span>
      	    </div>
      	</el-upload>
      	<el-dialog :visible.sync="dialogVisible">
      	  <img width="100%" :src="dialogImageUrl" alt="">
      	</el-dialog>
      </el-form-item>

      <el-form-item label="上传验收报告">
      	<el-upload
          :headers="{'X-Token':token}"
          :data="{project_id:data.id,type:3}"
      	  action="http://hangan.com/upload/upload_project_image"
          :class="{disabled:!edit}"
      	  list-type="picture-card"
          :file-list="checkImageList"
          :on-success="(resopnse,file,fileList) => {handPictureSucc(resopnse,file,fileList ,'check')}"
      	  :auto-upload="false"
          :on-change="(file, fileList) => {hangePictureChange(file, fileList, 'check')}"
          ref="check">
      	    <i slot="default" class="el-icon-plus"></i>
      	    <div slot="file" slot-scope="{file}">
      	      <img
      	        class="el-upload-list__item-thumbnail"
      	        :src="file.url" alt=""
      	      >
      	      <span class="el-upload-list__item-actions">
      	        <span
      	          class="el-upload-list__item-preview"
      	          @click="handlePictureCardPreview(file)"
      	        >
      	          <i class="el-icon-zoom-in"></i>
      	        </span>
      	        <span
      	          v-if="!disabled"
      	          class="el-upload-list__item-delete"
      	          @click="handleRemove(file,'check')"
      	        >
      	          <i class="el-icon-delete"></i>
      	        </span>
      	      </span>
      	    </div>
      	</el-upload>
      	<el-dialog :visible.sync="dialogVisible">
      	  <img width="100%" :src="dialogImageUrl" alt="">
      	</el-dialog>
      </el-form-item>

      <el-form-item label="上传合同样本">
      	<el-upload
          :headers="{'X-Token':token}"
          :data="{project_id:data.id,type:4}"
      	  action="http://hangan.com/upload/upload_project_image"
      	  list-type="picture-card"
          :class="{disabled:!edit}"
          :file-list="contractImageList"
          :on-success="(resopnse,file,fileList) => {handPictureSucc(resopnse,file,fileList ,'contract')}"
      	  :auto-upload="false"
          :on-change="(file, fileList) => {hangePictureChange(file, fileList, 'contract')}"
          ref="contract">
      	    <i slot="default" class="el-icon-plus"></i>
      	    <div slot="file" slot-scope="{file}">
      	      <img
      	        class="el-upload-list__item-thumbnail"
      	        :src="file.url" alt=""
      	      >
      	      <span class="el-upload-list__item-actions">
      	        <span
      	          class="el-upload-list__item-preview"
      	          @click="handlePictureCardPreview(file)"
      	        >
      	          <i class="el-icon-zoom-in"></i>
      	        </span>
      	        <span
      	          v-if="!disabled"
      	          class="el-upload-list__item-delete"
      	          @click="handleRemove(file,'contract')"
      	        >
      	          <i class="el-icon-delete"></i>
      	        </span>
      	      </span>
      	    </div>
      	</el-upload>
      	<el-dialog :visible.sync="dialogVisible">
      	  <img width="100%" :src="dialogImageUrl" alt="">
      	</el-dialog>
      </el-form-item>
		</el-form>



	</div>
</template>

<script>

  import { getProjectPay } from '@/api/project_pay.js'
  import { delProjectImage,getProjectImage } from '@/api/upload.js'
  import { getSelectProject,findSame } from '@/api/project.js'
  import { getProjectTypeList } from '@/api/project_type.js'
  import { getProjectTradeList } from '@/api/project_trade.js'
  import { getProjectCateList } from '@/api/project_cate.js'
  import { getOprateTypeList } from '@/api/oprate_type.js'
  import { getSelectCustomer } from '@/api/customer.js'
  import { addProject,getProjectInfo,editProject } from '@/api/project.js'
  import { MessageBox } from 'element-ui'
  export default {
    data() {
      return {
		  baseUrl:process.env.BASE_API,
      token:'',
			certificate_type:[{id:1,name:'身份证'},{id:2,name:'护照'}],
      project_list:[],
      project_stage:['需求/预算','拟写相关材料','招标','投标','合同期','发票','实施','待付款','欠款','验收','免费维护期','完结'],
			params:'',//表单要提交的参数
      pay_info:[],
			server_list:[
				{id:'服务器1',name:'服务器1'},
				{id:'服务器2',name:'服务器2'},
			],
			error:{

			},
			pay_disabled:true,
      formData:{},
			data:{
        parent_id:[],
        follow_id:'',
				customer_id:'',
				project_name:'',
        contractor:'',
				project_type_id:'',
				project_type_name:'',
        project_trade_id:'',
        project_trade_name:'',
				project_cate_id:'',
				project_cate_name:'',
				oprate_type_id:'',
				oprate_type_name:'',
				project_pay:'',
				id:0,
				pay_type:'',
				info:[],
        service_info:[],
        buy_info:[],
        update_info:[],
        pay_info:[],
				sum_money:0.00,
        contractor_money:0.00,
				project_desc:'',
        sign_customer_id:'',
        paid_money:0.00,
        project_stage:'',
        plan_money:0.00,
        end_project:false,
        end_remark:'',
        //element 的fileList 实际有2个，取并集，所以需要额外的存放2个的并集值，不然就会图片重复
        contractImageList:[
        ],//合同扫描件
        bidImageList:[],//中标通知书扫描件
        deliveyImageList:[],//送货单扫描件
        checkImageList:[],//验收报告扫描件
			},
			rules:{
				project_name:[{required: true, message: '项目名不能为空', trigger: 'blur'}],
				own_year:[{required: true, message: '年份不能为空', trigger: 'blur'}],
				// certificate_number:[{required: true, message: '证件号码不能为空', trigger: 'blur'}],
				// customer_id:[{required: true, message: '上级客户不能为空', trigger: 'blur'}],
				// project_id:[{required: true, message: '项目不能为空', trigger: 'blur'}],
			},
			disable:false,
			customer_list:[],
			user_type:[],
			service_type:[],
			loading:false,
			edit:true,
			op_type:1,
			project_type:[],
			project_cate:[],
			oprate_type:[],
      project_trade:[],
      selectlistRow: [],
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,

      //element 的fileList 实际有2个，取并集，所以需要额外的存放2个的并集值，不然就会图片重复
      contractImageList:[
      ],//合同扫描件
      bidImageList:[],//中标通知书扫描件
      deliveyImageList:[],//送货单扫描件
      checkImageList:[],//验收报告扫描件

		}
	},
	methods:{
    selectRow (val) {
            this.selectlistRow = val
          },
    // 增加行
    // 删除方法
    // 删除选中行
    sum_amount(){
      this.data.plan_money = 0;
      for(var i in this.data.pay_info){
        this.data.plan_money = parseFloat(this.data.plan_money) + parseFloat(this.data.pay_info[i].amount)

      }
    },
    delData () {
      for (let i = 0; i < this.selectlistRow.length; i++) {
        let val = this.selectlistRow
        // 获取选中行的索引的方法
        // 遍历表格中tableData数据和选中的val数据，比较它们的rowNum,相等则输出选中行的索引
        // rowNum的作用主要是为了让每一行有一个唯一的数据，方便比较，可以根据个人的开发需求从后台传入特定的数据
        val.forEach((val, index) => {

          this.data.info.forEach((v, i) => {
            if (val.rowNum === v.rowNum) {
              // i 为选中的索引
              this.data.info.splice(i, 1)
            }
          })
        })
      }
    },


		removeHC(item){
			var index = this.data.info.indexOf(item)
			if (index !== -1) {
				this.data.info.splice(index, 1)
			}
		},

    addService(){
      var list = {
        item_name:'',
        num: '',
        month_rent: '',
        unit:'',
        service_content:'',
        remark:'',
        total_money:'',
        service_period:'',
        total_service_period:'',
        key: Date.now()
      }
    	this.data.service_info.push(list);
    },
    addBuy(){
      var list = {
        item_name:'',
        num: '',
        month_rent: '',
        unit:'',
        service_content:'',
        remark:'',
        total_money:'',
        service_period:'',
        total_service_period:'',
        key: Date.now()
      }
    	this.data.buy_info.push(list);
    },
    addPay(){
      var list = {
        item_name:'',
        num: '',
        price: '',
        unit:'',
        tech_config:'',
        remark:'',
        total_money:'',
        service_period:'',
        total_year_pay:'',
        key: Date.now()
      }
    	this.data.pay_info.push(list);
    },
		changePay(value) {
			if(value == '其他') {
			    this.pay_disabled = false;
			}
			else {
				this.pay_disabled = true;
			}
		},
    hangePictureChange(file,fileList,type){
    //改变与上传成功均会调用一次，所以会进行2次else操作，第二次应该判断data.fileList是否已存在
      var num=0
      for(var p in fileList) {
        if(fileList[p]['name'] == file.name) {
          num = num +1;
        }
      }
      if(num >1) {
        this.$alert('图片重复')
        fileList.splice(-1)
      }
      else{
        this.$refs[type].submit()
      }
    },
    handPictureSucc(response,file,fileList,type) {
      console.log('filetest1234',file)
      var imageList =''
      switch(type) {
        case 'bidding': imageList = 'bidImageList';break;
        case 'delivery': imageList = 'deliveyImageList';break;
        case 'check' : imageList = 'checkImageList';break;
        case 'contract': imageList = 'contractImageList';break;
      }
      // for(var p in this.data[imageList]) {
      //   if(this.data[imageList][p]['name'] == file.name) {
      //     return false;
      //   }
      // }
      var type_number = 0
      switch(type) {
        case 'bidding': type_number = '1';break;
        case 'delivery': type_number = '2';break;
        case 'check' : type_number = '3';break;
        case 'contract': type_number = '4';break;
      }
      console.log('waimian',this[imageList])
      this.data[imageList].push({
        'url':response.data.url
        'name':file.name,
        'type':type_number,
        'md5_name':response.data.md5_name,
        'project_id':this.data.id
      })

    },
    handleRemove(file,type) {
      this.$confirm("确认要删除 "+file.name+" 吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
      })
     .then(() => {
       var type_number = 0
       var imageList ='';
       switch(type) {
         case 'bidding': type_number = '1';imageList = 'bidImageList';break;
         case 'delivery': type_number = '2';imageList = 'deliveyImageList';break;
         case 'check' : type_number = '3';imageList = 'checkImageList';break;
         case 'contract': type_number = '4';imageList = 'contractImageList';break;
       }
       var md5_name = '';
       for(var p in this.data[imageList]) {
         if(this.data[imageList][p]['name'] == file.name) {
           md5_name = this.data[imageList][p]['md5_name']
         }
       }

       var data = {
         name:file.name,
         type:type_number,
         md5_name : md5_name,
         project_id:this.data.id
       }
       delProjectImage(data).then( response => {
         console.log(response)
         this.$refs[type].handleRemove(file)
         var imageList =''
         switch(type) {
           case 'bidding': imageList = 'bidImageList';break;
           case 'delivery': imageList = 'deliveyImageList';break;
           case 'contract': imageList = 'contractImageList';break;
           case 'check' : imageList = 'checkImageList';break;
         }
         for(var p in this.data[imageList]) {
           if(this.data[imageList][p]['name'] == file.name) {
             this.data[imageList].splice(p,1)
           }
         }
         console.log(imageList,this.data[imageList],file.name)
       }).catch(error => {
         return false;
       })
     }).catch(() => {
        return false;
     });
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    findSame(){
      var data = {
        project_name: this.data.project_name,
        customer_id:this.data.customer_id,
        sum_money:this.data.sum_money
      }
      findSame(data).then( response => {
        console.log(response)

        if(response.code) {
          // alert(1);
          // this.$notify({
          //   title: '警告',
          //   message:' 存在名称、单位、金额均相同的项目，请确认是否重复123',
          //   type: 'warning'
          // });
          return false;
        }
        else{
          // this.$notify({
          //   title: '警告',
          //   message:' 存在名称、单位、金额均相同的项目，请确认是否重复',
          //   type: 'warning'
          // });
          return false;
        }


      }).catch(error => {
      	// this.disable = true;
      	// this.edit = false;
      	if( typeof error == 'object') {
      		error = '操作成功'
      	}
      })
    },
		changeCid(event) {
      this.data.sign_customer_id = this.data.customer_id
			for(var p in this.customer_list) {
				if (this.customer_list[p].id == event) {
					this.data.unit_name = this.customer_list[p].name;
					break;
				}
			}
		},
    changeSCid(event) {
    	for(var p in this.customer_list) {
    		if (this.customer_list[p].id == event) {
    			this.data.sign_unit_name = this.customer_list[p].name;
    			break;
    		}
    	}
    },
		changeCetify(event) {
			switch(event) {
				case 1:this.data.certificate_type_name = '身份证';break;
				case 2:this.data.certificate_type_name = '护照';break;
			}

		},
		getProjectTypeList(data) {
			getProjectTypeList(data).then( response => {
				let data = response.data.list;
				this.project_type = data;
			})
		},
    getProjectTradeList(data) {
    	getProjectTradeList(data).then( response => {
    		let data = response.data.list;
    		this.project_trade = data;
    	})
    },
    getProject(){
    	getSelectProject({}).then(response =>{
        var list = response.data.list;
        for(var p in list) {
          if(list[p]['id'] == this.data.id) {
            list[p]['disabled'] = true;
          }
        }
    		this.project_list = list;

    	}).catch(error => {
    		this.disable = true;
    		this.$alert(error,'提示')
    	})
    },
		getProjectCateList(data) {
			getProjectCateList(data).then( response => {
				let data = response.data.list;
				this.project_cate = data;
			})
		},
		getOprateTypeList(data) {
			getOprateTypeList(data).then( response => {
				let data = response.data.list;
				this.oprate_type = data;
			})
		},
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
    getProjectPay(data) {
      getProjectPay(data).then(response =>{
      	this.pay_info = response.data;
        for(var i in this.pay_info) {
          switch(this.pay_info[i].status) {
            case 0: this.pay_info[i].status_name = '未支付';break;
            case 1: this.pay_info[i].status_name = '部分支付';break;
            case 2: this.pay_info[i].status_name = '完成支付';break;
          }
        }
      }).catch(error => {
      	this.disable = true;
      	this.$alert(error,'提示')
      })
    },
		getInfo(data){
			this.loading = true
			getProjectInfo(data).then( (response) => {
				let data = response.data;
				data.pay_type = data.pay_type.toString()
				//处理数据
				for(var i in data){
          if(data[i] == 0 || data[i] == '1970-01-01') {
            data[i] = ''
          }
					data['O_' + i] = data[i]
				}
        if(data['end_project'] == 0) {
          data['end_project'] = false
        }
        else {
          data['end_project'] = true
        }
        data.bidImageList = [];
        data.deliveyImageList = [];
        data.checkImageList = [];
        data.contractImageList = [];
				this.data = data;
				this.loading = false
			}).catch(error => {
				this.loading = false
				this.disable = true;
				this.$alert(error,'提示')
			})
		},
		getCustomer(){
			getSelectCustomer({}).then(response =>{
				this.customer_list = response.data.list;
			}).catch(error => {
				this.disable = true;
				this.$alert(error,'提示')
			})
		},
    getImage(data){
      getProjectImage(data).then(response => {
        if(!response.code) {

          var data = response.data;
          for(var p in data) {
            var imageList ='';
            switch(data[p]['type']) {
              case 1: imageList = 'bidImageList';break;
              case 2: imageList = 'deliveyImageList';break;
              case 3: imageList = 'checkImageList';break;
              case 4: imageList = 'contractImageList';break;
            }
            data[p]['url'] = 'http://hangan.com' + data[p]['url'];
            this[imageList].push(data[p]);
            this.data[imageList].push(data[p]);
          }


        }
      })
    },
		//取消编辑
		cancleEdit(){
			for(var i in this.data){
				if(typeof this.data['O_'+i] != 'undefined'){
					this.data[i] = this.data['O_'+i];
				}
			}
			this.edit = false;
		},
		//确认
		confirm(data){

			this.$refs[data].validate(valid => {
				if(valid) {
					//新增
					if(this.op_type == 1) {
						addProject(this.data).then( response => {
							let id =response.data.id;
							this.$alert('操作成功','提示')
							this.edit = false;
							this.disable = true;

						}).catch(error => {
							// this.disable = true;
							// this.edit = false;
							if( typeof error == 'object') {
								error = '操作成功'
							}
							this.$alert(error,'提示')
						})
            this.$nextTick(() => {
              this.$router.replace({
                path: '/redirect' + '/projected/index'
              })
            })

					}
					else if(this.op_type == 2) {
						editProject(this.data).then( response => {
							let id =response.data.id;
							this.$message({
								message:'操作成功',
								type:'success'
							});
							this.refreshView('')
						}).catch(error => {
							// this.disable = true;
							if( typeof error == 'object') {
								error = '操作成功'
							}
							this.$alert(error,'提示')
							this.edit = false;
						})
					}
				}
				else {
					return false;
				}
			})
		},

	},
	mounted(){
    this.formData = new FormData();
		this.select_loading = true;
		switch(this.$route.name) {
			case '新增项目':this.op_type = 1;break;
			case '项目详情':this.op_type = 2;break;
		}
		//新增
		if(this.op_type == 1) {
			this.edit=true
		}
		//详情
		else if(this.op_type == 2) {
			this.data.id = this.$route.query.id
			this.getInfo({id:this.data.id});
      this.getImage({project_id:this.data.id})
      this.getProjectPay({id:this.data.id})
			this.edit=false;

		}
    this.token = this.$store.getters.token;
		this.getCustomer();
		this.getOprateTypeList({})
		this.getProjectTypeList({});
		this.getProjectCateList({});
    this.getProjectTradeList({});
    this.getProject();
	}
 }
</script>
<style>
  .disabled .el-upload--picture-card {
    display: none!important;
  }
</style>
