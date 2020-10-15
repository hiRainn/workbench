
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
          format="yyyy"
          value-format="yyyy"
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

      <el-form-item label="总包签约时间">
      	<span v-if="!edit && data.contractor">{{ data.contractor_sign_time }}</span>
      	<el-date-picker
      	  v-if="edit && data.contractor"
      	  v-model="data.contractor_sign_time"
      	  type="date"
      	  placeholder="日期"
      	  format="yyyy-MM-dd"
          value-format="yyyy-MM-dd">
      	</el-date-picker>
      </el-form-item>
      <el-form-item label="总包到期时间">
      	<span v-if="!edit && data.contractor">{{ data.contractor_end_time }}</span>
      	<el-date-picker
      	  v-if="edit && data.contractor"
      	  v-model="data.contractor_end_time"
      	  type="date"
      	  placeholder="日期"
          format="yyyy-MM-dd"
      	  value-format="yyyy-MM-dd">
      	</el-date-picker>
      </el-form-item>

			<el-form-item label="项目金额">
				<span v-if="!edit">{{ data.sum_money }}</span>
				<el-input v-else v-model="data.sum_money" @change="findSame"></el-input>
			</el-form-item>

      <el-form-item label="已付金额">
      	<span v-if="!edit">{{ data.paid_money }}</span>
      	<el-input v-else v-model="data.paid_money"></el-input>
      </el-form-item>

      <el-form-item label="未付金额">
      	<span style="color:red;">{{ accDiv(data.sum_money,data.paid_money) }}</span>
      </el-form-item>
      <el-form-item label="合同编号">
      	<span v-if="!edit">{{ data.contract_number }}</span>
      	<el-input v-else v-model="data.contract_number"></el-input>
      </el-form-item>

      <el-form-item label="内容计算金额">
      	<span style="color: red;">{{ data.compute_money }}</span>
      </el-form-item>
      <el-form-item label="维护完后预算收取年度服务费">
      	<span style="color: red;">{{ data.year_price }}</span>
      </el-form-item>

      <el-form-item label="项目内容">
      </el-form-item>
      <el-form-item label="是否包含服务项">
        <el-switch
          v-model="data.has_service"
          active-text="是"
          inactive-text="否">
        </el-switch>
      </el-form-item>

			<el-form-item label="服务清单" v-show="data.has_service">
         <el-table
          v-if="edit"
           :data="data.service_info"
           ref="data.service_info"
           tooltip-effect="dark"
           :header-cell-style="{background:'#eef1f6',color:'#606266',border:'1px solid #F08047'}"
           border
           stripe
           style="width: 95%"
           @selection-change='selectServiceRow'>
           <el-table-column type="selection" width="45" align="center" rowspan='2'></el-table-column>
           <el-table-column label="序号"  type="index" width="60" align="center"></el-table-column>
           <el-table-column  label="项目名称" align="center" >
             <template slot-scope="scope">
                 <el-input v-model="scope.row.item_name"></el-input>
             </template>
           </el-table-column>
           <el-table-column  label="服务内容" align="center" >
             <template slot-scope="scope">
                 <el-input type="textarea" v-model="scope.row.service_content"></el-input>
             </template>
           </el-table-column>
           <el-table-column  label="数量" align="center" >
             <template slot-scope="scope">
                 <el-input v-model="scope.row.num" @input="inputServiceNum(scope.row,scope.row.num)"></el-input>
             </template>
           </el-table-column>
           <el-table-column  label="月租" align="center" >
             <template slot-scope="scope">
                 <el-input v-model="scope.row.month_rent" @input="inputServiceRent(scope.row,scope.row.month_rent)"></el-input>
             </template>
           </el-table-column>
           <el-table-column  label="合同合约期" align="center" >
             <template slot-scope="scope">
                 <el-input v-model="scope.row.contract_period" @input="inputServicePeriod(scope.row,scope.row.contract_period)"></el-input>
             </template>
           </el-table-column>
           <el-table-column  label="合同金额" align="center" >
             <template slot-scope="scope">
                 <el-input v-model="scope.row.contract_money"></el-input>
             </template>
           </el-table-column>
           <el-table-column  label="小计" align="center" >
             <template slot-scope="scope">
                 <el-input v-model="scope.row.subtotal"></el-input>
             </template>
           </el-table-column>
           <el-table-column  label="总合约期" align="center" >
             <template slot-scope="scope">
                 <el-input v-model="scope.row.sum_period" @input="inputServiceSumPeriod(scope.row,scope.row.sum_period)"></el-input>
             </template>
           </el-table-column>
           <el-table-column  label="待续签期" align="center" >
             <template slot-scope="scope">
                 <el-input v-model="scope.row.wait_period"></el-input>
             </template>
           </el-table-column>
           <el-table-column  label="待签金额" align="center" >
             <template slot-scope="scope">
                 <el-input v-model="scope.row.wait_money"></el-input>
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
          <el-button @click="delService">删除所选</el-button>
				</el-form-item>
				<el-form-item v-if="!edit">
					<el-table
					  :data="data.service_info"
            style="width: 95%"
            :header-cell-style="{background:'#eef1f6',color:'#606266',border:'1px solid #F08047'}"
            border
            stripe
					  >
					  </el-table-column>
            <el-table-column  label="项目名称" align="center" >
              <template slot-scope="scope">
                <span>{{ scope.row.item_name }} </span>
              </template>
            </el-table-column>
            <el-table-column  label="服务内容" align="center" >
              <template slot-scope="scope">
                <span>{{ scope.row.service_content }} </span>
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
            <el-table-column  label="合同合约期" align="center" >
              <template slot-scope="scope">
                <span>{{ scope.row.contract_period }} </span>
              </template>
            </el-table-column>

            <el-table-column  label="合同金额" align="center" >
              <template slot-scope="scope">
                <span>{{ scope.row.contract_money }} </span>
              </template>
            </el-table-column>
            <el-table-column  label="小计" align="center" >
              <template slot-scope="scope">
                <span>{{ scope.row.subtotal }} </span>
              </template>
            </el-table-column>
            <el-table-column  label="总续约期" align="center" >
              <template slot-scope="scope">
                <span>{{ scope.row.sum_period }} </span>
              </template>
            </el-table-column>
            <el-table-column  label="待续约期" align="center" >
              <template slot-scope="scope">
                <span>{{ scope.row.wait_period }} </span>
              </template>
            </el-table-column>

            <el-table-column  label="待签金额" align="center" >
              <template slot-scope="scope">
                <span>{{ scope.row.wait_money }} </span>
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


      <el-form-item label="是否包含购置项">
        <el-switch
          v-model="data.has_buy"
          active-text="是"
          inactive-text="否">
        </el-switch>
      </el-form-item>

      <el-form-item label="购置清单" v-show="data.has_buy">
         <el-table
          v-if="edit"
           :data="data.buy_info"
           ref="data.buy_info"
           tooltip-effect="dark"
           :header-cell-style="{background:'#eef1f6',color:'#606266',border:'1px solid #F08047'}"
           border
           stripe
           style="width: 95%"
           @selection-change='selectBuyRow'>
           <el-table-column type="selection" width="45" align="center" rowspan='2'></el-table-column>
           <el-table-column label="序号"  type="index" width="60" align="center"></el-table-column>
           <el-table-column  label="项目名称" align="center" >
             <template slot-scope="scope">
                 <el-input v-model="scope.row.item_name"></el-input>
             </template>
           </el-table-column>
           <el-table-column  label="主要技术参数" align="center" >
             <template slot-scope="scope">
                 <el-input type="textarea" v-model="scope.row.tec_param"></el-input>
             </template>
           </el-table-column>
           <el-table-column  label="数量" align="center" >
             <template slot-scope="scope">
                 <el-input v-model="scope.row.num" @input="inputBuyNum(scope.row,scope.row.num)"></el-input>
             </template>
           </el-table-column>
           <el-table-column  label="单价" align="center" >
             <template slot-scope="scope">
                 <el-input v-model="scope.row.price" @input="inputBuyPrice(scope.row,scope.row.price)"></el-input>
             </template>
           </el-table-column>
           <el-table-column  label="单位" align="center" >
             <template slot-scope="scope">
                 <el-input v-model="scope.row.unit"></el-input>
             </template>
           </el-table-column>
           <el-table-column  label="小计" align="center" >
             <template slot-scope="scope">
                 <el-input v-model="scope.row.subtotal"></el-input>
             </template>
           </el-table-column>

           <el-table-column  label="维护期(月)" align="center" >
             <template slot-scope="scope">
                 <el-input v-model="scope.row.weihu_period"></el-input>
             </template>
           </el-table-column>
           <el-table-column  label="维护费比例" align="center" >
            <template slot-scope="scope">
                <el-input v-model="scope.row.rate"  @input="inputBuyRate(scope.row,scope.row.rate)"></el-input>
            </template>
           </el-table-column>
           <el-table-column  label="年度维护费" align="center" >
             <template slot-scope="scope">
                 <el-input v-model="scope.row.year_price"></el-input>
             </template>
           </el-table-column>
           <el-table-column  label="备注" align="center" >
             <template slot-scope="scope">
                 <el-input v-model="scope.row.remark"></el-input>
             </template>
           </el-table-column>


         </el-table>


      	<el-form-item v-if="edit">
      		<el-button @click="addBuy">新增购置</el-button>
          <el-button @click="delBuy">删除所选</el-button>
      	</el-form-item>
      	<el-form-item v-if="!edit">
      		<el-table
      		  :data="data.buy_info"
            style="width: 95%"
            :header-cell-style="{background:'#eef1f6',color:'#606266',border:'1px solid #F08047'}"
            border
            stripe
      		  >
      		  </el-table-column>
            <el-table-column  label="项目名称" align="center" >
              <template slot-scope="scope">
                <span>{{ scope.row.item_name }} </span>
              </template>
            </el-table-column>
            <el-table-column  label="主要技术参数" align="center" >
              <template slot-scope="scope">
                <span>{{ scope.row.tec_param }} </span>
              </template>
            </el-table-column>
            <el-table-column  label="数量" align="center" >
              <template slot-scope="scope">
                <span>{{ scope.row.num }} </span>
              </template>
            </el-table-column>
            <el-table-column  label="单价" align="center" >
              <template slot-scope="scope">
                <span>{{ scope.row.price }} </span>
              </template>
            </el-table-column>
            <el-table-column  label="单位" align="center" >
              <template slot-scope="scope">
                <span>{{ scope.row.unit }} </span>
              </template>
            </el-table-column>
            <el-table-column  label="小计" align="center" >
              <template slot-scope="scope">
                <span>{{ scope.row.subtotal }} </span>
              </template>
            </el-table-column>

            <el-table-column  label="维护期(月)" align="center" >
              <template slot-scope="scope">
                <span>{{ scope.row.weihu_period }} </span>
              </template>
            </el-table-column>
            <el-table-column  label="维护费比例" align="center" >
              <template slot-scope="scope">
                <span>{{ scope.row.rate }} </span>
              </template>
            </el-table-column>
            <el-table-column  label="年度维护费" align="center" >
              <template slot-scope="scope">
                <span>{{ scope.row.year_price }} </span>
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

      <el-form-item label="是否包含置换/更新">
        <el-switch
          v-model="data.has_update"
          active-text="是"
          inactive-text="否">
        </el-switch>
      </el-form-item>

      <el-form-item label="置换/更新" v-show="data.has_update">
         <el-table
          v-if="edit"
           :data="data.update_info"
           ref="data.update_info"
           tooltip-effect="dark"
           :header-cell-style="{background:'#eef1f6',color:'#606266',border:'1px solid #F08047'}"
           border
           stripe
           style="width: 95%"
           @selection-change='selectUpdateRow'>
           <el-table-column type="selection" width="45" align="center" rowspan='2'></el-table-column>
           <el-table-column label="序号"  type="index" width="60" align="center"></el-table-column>
           <el-table-column  label="项目名称" align="center" >
             <template slot-scope="scope">
                 <el-input v-model="scope.row.item_name"></el-input>
             </template>
           </el-table-column>
           <el-table-column  label="原购置情况" align="center" >
             <template slot-scope="scope">
                 <el-input v-model="scope.row.origin_buy_desc"></el-input>
             </template>
           </el-table-column>
           <el-table-column  label="技术参数,规格" align="center" >
             <template slot-scope="scope">
                 <el-input v-model="scope.row.tec_parm"></el-input>
             </template>
           </el-table-column>
           <el-table-column  label="数量" align="center" >
             <template slot-scope="scope">
                 <el-input v-model="scope.row.num" @input="inputUpdateNum(scope.row,scope.row.num)"></el-input>
             </template>
           </el-table-column>
           <el-table-column  label="置换价" align="center" >
             <template slot-scope="scope">
                 <el-input v-model="scope.row.displace_price" @input="inputUpdatePrice(scope.row,scope.row.displace_price)"></el-input>
             </template>
           </el-table-column>
           <el-table-column  label="单位" align="center" >
             <template slot-scope="scope">
                 <el-input v-model="scope.row.unit"></el-input>
             </template>
           </el-table-column>
           <el-table-column  label="小计" align="center" >
             <template slot-scope="scope">
                 <el-input v-model="scope.row.subtotal"></el-input>
             </template>
           </el-table-column>
           <el-table-column  label="维护期(月)" align="center" >
             <template slot-scope="scope">
                 <el-input v-model="scope.row.weihu_period"></el-input>
             </template>
           </el-table-column>
           <el-table-column  label="年度维护费" align="center" >
             <template slot-scope="scope">
                 <el-input v-model="scope.row.year_price" @input="computeAlltheMoney"></el-input>
             </template>
           </el-table-column>

           <el-table-column  label="备注" align="center" >
             <template slot-scope="scope">
                 <el-input v-model="scope.row.remark"></el-input>
             </template>
           </el-table-column>
         </el-table>


      	<el-form-item v-if="edit">
      		<el-button @click="addUpdate">新增更新/置换</el-button>
          <el-button @click="delUpdate">删除所选</el-button>
      	</el-form-item>
      	<el-form-item v-if="!edit">
      			<el-table
      			  :data="data.update_info"
      	      style="width: 95%"
      	      :header-cell-style="{background:'#eef1f6',color:'#606266',border:'1px solid #F08047'}"
      	      border
      	      stripe
      			  >
      			  </el-table-column>
      	      <el-table-column  label="项目名称" align="center" >
      	        <template slot-scope="scope">
      	          <span>{{ scope.row.item_name }} </span>
      	        </template>
      	      </el-table-column>
      	      <el-table-column  label="原购置情况" align="center" >
      	        <template slot-scope="scope">
      	          <span>{{ scope.row.origin_buy_desc }} </span>
      	        </template>
      	      </el-table-column>
              <el-table-column  label="技术规格,参数" align="center" >
                <template slot-scope="scope">
                  <span>{{ scope.row.tec_parm }} </span>
                </template>
              </el-table-column>
      	      <el-table-column  label="数量" align="center" >
      	        <template slot-scope="scope">
      	          <span>{{ scope.row.num }} </span>
      	        </template>
      	      </el-table-column>

      	      <el-table-column  label="置换价" align="center" >
      	        <template slot-scope="scope">
      	          <span>{{ scope.row.displace_price }} </span>
      	        </template>
      	      </el-table-column>
      	      <el-table-column  label="单位" align="center" >
      	        <template slot-scope="scope">
      	          <span>{{ scope.row.unit }} </span>
      	        </template>
      	      </el-table-column>

      	      <el-table-column  label="小计" align="center" >
      	        <template slot-scope="scope">
      	          <span>{{ scope.row.subtotal }} </span>
      	        </template>
      	      </el-table-column>
              <el-table-column  label="维护期(月)" align="center" >
                <template slot-scope="scope">
                  <span>{{ scope.row.weihu_period }} </span>
                </template>
              </el-table-column>
              <el-table-column  label="年度维护费" align="center" >
                <template slot-scope="scope">
                  <span>{{ scope.row.year_price }} </span>
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

      <el-form-item label="是否包含通信">
        <el-switch
          v-model="data.has_commute"
          active-text="是"
          inactive-text="否">
        </el-switch>
      </el-form-item>

      <el-form-item label="通信" v-show="data.has_commute">
         <el-table
          v-if="edit"
           :data="data.commute_info"
           ref="data.commute_info"
           tooltip-effect="dark"
           :header-cell-style="{background:'#eef1f6',color:'#606266',border:'1px solid #F08047'}"
           border
           stripe
           style="width: 95%"
           @selection-change='selectCommuteRow'>
           <el-table-column type="selection" width="45" align="center" rowspan='2'></el-table-column>
           <el-table-column label="序号"  type="index" width="60" align="center"></el-table-column>
           <el-table-column  label="项目名称" align="center" >
             <template slot-scope="scope">
                 <el-input v-model="scope.row.item_name"></el-input>
             </template>
           </el-table-column>
           <el-table-column  label="包含内容" align="center" >
             <template slot-scope="scope">
                 <el-input v-model="scope.row.content"></el-input>
             </template>
           </el-table-column>
           <el-table-column  label="数量" align="center" >
             <template slot-scope="scope">
                 <el-input v-model="scope.row.num" @input="inputCommuteNum(scope.row,scope.row.num)"></el-input>
             </template>
           </el-table-column>
           <el-table-column  label="月租" align="center" >
             <template slot-scope="scope">
                 <el-input v-model="scope.row.month_rent" @input="inputCommuteRent(scope.row,scope.row.month_rent)"></el-input>
             </template>
           </el-table-column>
           <el-table-column  label="单位" align="center" >
             <template slot-scope="scope">
                 <el-input v-model="scope.row.unit"></el-input>
             </template>
           </el-table-column>

           <el-table-column  label="通信服务期" align="center" >
             <template slot-scope="scope">
                 <el-input v-model="scope.row.period"></el-input>
             </template>
           </el-table-column>
          <el-table-column  label="小计" align="center" >
            <template slot-scope="scope">
                <el-input v-model="scope.row.subtotal"></el-input>
            </template>
          </el-table-column>
           <el-table-column  label="备注" align="center" >
             <template slot-scope="scope">
                 <el-input v-model="scope.row.remark"></el-input>
             </template>
           </el-table-column>


         </el-table>


      	<el-form-item v-if="edit">
      		<el-button @click="addCommute">新增通信</el-button>
          <el-button @click="delCommute">删除所选</el-button>
      	</el-form-item>
      	<el-form-item v-if="!edit">
      		<el-table
      		  :data="data.commute_info"
            style="width: 95%"
            :header-cell-style="{background:'#eef1f6',color:'#606266',border:'1px solid #F08047'}"
            border
            stripe
      		  >
      		  </el-table-column>
            <el-table-column  label="项目名称" align="center" >
              <template slot-scope="scope">
                <span>{{ scope.row.item_name }} </span>
              </template>
            </el-table-column>
            <el-table-column  label="包含内容" align="center" >
              <template slot-scope="scope">
                <span>{{ scope.row.content }} </span>
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
            <el-table-column  label="通信服务期" align="center" >
              <template slot-scope="scope">
                <span>{{ scope.row.period }} </span>
              </template>
            </el-table-column>
            <el-table-column  label="小计" align="center" >
              <template slot-scope="scope">
                <span>{{ scope.row.subtotal }} </span>
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
          v-if="op_type != 2"
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
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd">
                  </el-date-picker>
             </template>
           </el-table-column>
           <el-table-column  label="备注" align="center" >
             <template slot-scope="scope">
                 <el-input type="textarea" v-model="scope.row.remark"></el-input>
             </template>
           </el-table-column>

         </el-table>


      	<el-form-item v-if="op_type != 2">
      		<el-button @click="addPay">新增内容</el-button>
      	</el-form-item>

        <el-table
          v-if="op_type == 2"
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
      	<el-input v-else v-model="data.plan_money" :disabled="true"></el-input>
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
      <el-form-item label="是否需签合同">
      	<el-switch
      	  v-model="data.contract_need"
      	  active-text="是"
      	  inactive-text="否">
      	</el-switch>
      </el-form-item>

      <el-form-item label="是否重点项目">
      	<el-switch
      	  v-model="data.is_important"
      	  active-text="是"
      	  inactive-text="否">
      	</el-switch>
      </el-form-item>

      <el-form-item label="是否终结项目">
      	<el-switch
      	  v-model="data.end_project"
      	  active-text="是"
      	  inactive-text="否">
      	</el-switch>
      </el-form-item>

      <el-form-item label="是否参与统计">
      	<el-switch
      	  v-model="data.is_stat"
      	  active-text="是"
      	  inactive-text="否">
      	</el-switch>
      </el-form-item>

      <el-form-item label="终结项目备注">
      	<span v-if="!edit">{{ data.end_remark }}</span>
      	<el-input type="textarea" v-else v-model.number="data.end_remark" ></el-input>
      </el-form-item>



      <el-form-item label="中标通知书">
      	<el-upload
          :data="{project_id:data.id,type:1}"
      	  action="http://hangan.com/upload/upload_project_image"
          :headers="{'X-Token':token}"
          :class="{disabled:!edit}"

          :auto-upload="false"
          :on-success="(resopnse,file,fileList) => {handPictureSucc(resopnse,file,fileList ,'bidding')}"
          :file-list="bidImageList"
          :on-change="(file, fileList) => {hangePictureChange(file, fileList, 'bidding')}"
          ref="bidding">

      	   <div slot="file" slot-scope="{file}">
      	     <!-- <img
      	       class="el-upload-list__item-thumbnail"
      	       :src="file.url" alt=""
      	     > -->
      	     <span> {{ file.name }} </span>
             <span><el-button type="text" icon="el-icon-zoom-in" v-if="/\.(jpg|jpeg|png|bmp|JPG|PNG|JPEG|BMP)$/.test(file.name)"  @click="handlePictureCardPreview(file)" ></el-button></span>
      	     <span><el-button type="text" icon="el-icon-download" @click="download(file.url,file.name)"></el-button></span>
      	     <span><el-button type="text" icon="el-icon-delete" @click="handleRemove(file,'bidding')" ></el-button></span>
      	   </div>
      	    <el-button size="small" type="primary">点击上传</el-button>
      	</el-upload>
      	<el-dialog :visible.sync="dialogVisible">
      	  <img width="100%" :src="dialogImageUrl" alt="">
      	</el-dialog>
      </el-form-item>

      <el-form-item label="合同扫描件">
      	<el-upload
          :headers="{'X-Token':token}"
          :data="{project_id:data.id,type:4}"
      	  action="http://hangan.com/upload/upload_project_image"

          :class="{disabled:!edit}"
          :file-list="contractImageList"
          :on-success="(resopnse,file,fileList) => {handPictureSucc(resopnse,file,fileList ,'contract')}"
      	  :auto-upload="false"
          :on-change="(file, fileList) => {hangePictureChange(file, fileList, 'contract')}"
          ref="contract">

      	    <div slot="file" slot-scope="{file}">
      	      <!-- <img
      	        class="el-upload-list__item-thumbnail"
      	        :src="file.url" alt=""
      	      > -->
              <span> {{ file.name }} </span>
              <span><el-button type="text" icon="el-icon-zoom-in" v-if="/\.(jpg|jpeg|png|bmp|JPG|PNG|JPEG|BMP)$/.test(file.name)"  @click="handlePictureCardPreview(file)" ></el-button></span>
              <span><el-button type="text" icon="el-icon-download" @click="download(file.url,file.name)"></el-button></span>
              <span><el-button type="text" icon="el-icon-delete" @click="handleRemove(file,'contract')" ></el-button></span>
      	    </div>
             <el-button size="small" type="primary">点击上传</el-button>
      	</el-upload>
      	<el-dialog :visible.sync="dialogVisible">
      	  <img width="100%" :src="dialogImageUrl" alt="">
      	</el-dialog>
      </el-form-item>

      <el-form-item label="送货单">
      	<el-upload
          :headers="{'X-Token':token}"
          :data="{project_id:data.id,type:2}"
      	  action="http://hangan.com/upload/upload_project_image"
          :class="{disabled:!edit}"

          :file-list="deliveyImageList"
          :on-success="(resopnse,file,fileList) => {handPictureSucc(resopnse,file,fileList ,'delivery')}"
      	  :auto-upload="false"
          :on-change="(file, fileList) => {hangePictureChange(file, fileList, 'delivery')}"
          ref="delivery">
      	   <div slot="file" slot-scope="{file}">
      	     <!-- <img
      	       class="el-upload-list__item-thumbnail"
      	       :src="file.url" alt=""
      	     > -->
      	     <span> {{ file.name }} </span>
             <span><el-button type="text" icon="el-icon-zoom-in" v-if="/\.(jpg|jpeg|png|bmp|JPG|PNG|JPEG|BMP)$/.test(file.name)"  @click="handlePictureCardPreview(file)" ></el-button></span>
      	     <span><el-button type="text" icon="el-icon-download" @click="download(file.url,file.name)"></el-button></span>
      	     <span><el-button type="text" icon="el-icon-delete" @click="handleRemove(file,'delivery')" ></el-button></span>
      	   </div>
      	    <el-button size="small" type="primary">点击上传</el-button>
      	</el-upload>
      	<el-dialog :visible.sync="dialogVisible">
      	  <img width="100%" :src="dialogImageUrl" alt="">
      	</el-dialog>
      </el-form-item>

      <el-form-item label="验收报告">
      	<el-upload
          :headers="{'X-Token':token}"
          :data="{project_id:data.id,type:3}"
      	  action="http://hangan.com/upload/upload_project_image"
          :class="{disabled:!edit}"

          :file-list="checkImageList"
          :on-success="(resopnse,file,fileList) => {handPictureSucc(resopnse,file,fileList ,'check')}"
      	  :auto-upload="false"
          :on-change="(file, fileList) => {hangePictureChange(file, fileList, 'check')}"
          ref="check">
      	    <div slot="file" slot-scope="{file}">
      	      <!-- <img
      	        class="el-upload-list__item-thumbnail"
      	        :src="file.url" alt=""
      	      > -->
      	      <span> {{ file.name }} </span>
              <span><el-button type="text" icon="el-icon-zoom-in" v-if="/\.(jpg|jpeg|png|bmp|JPG|PNG|JPEG|BMP)$/.test(file.name)"  @click="handlePictureCardPreview(file)" ></el-button></span>
      	      <span><el-button type="text" icon="el-icon-download" @click="download(file.url,file.name)"></el-button></span>
      	      <span><el-button type="text" icon="el-icon-delete" @click="handleRemove(file,'check')" ></el-button></span>
      	    </div>
      	     <el-button size="small" type="primary">点击上传</el-button>
      	</el-upload>
      	<el-dialog :visible.sync="dialogVisible">
      	  <img width="100%" :src="dialogImageUrl" alt="">
      	</el-dialog>
      </el-form-item>

      <el-form-item label="培训/维护">
      	<el-upload
          :headers="{'X-Token':token}"
          :data="{project_id:data.id,type:5}"
      	  action="http://hangan.com/upload/upload_project_image"
          :class="{disabled:!edit}"

          :file-list="trainImageList"
          :on-success="(resopnse,file,fileList) => {handPictureSucc(resopnse,file,fileList ,'train')}"
      	  :auto-upload="false"
          :on-change="(file, fileList) => {hangePictureChange(file, fileList, 'train')}"
          ref="train">
      	    <div slot="file" slot-scope="{file}">
      	      <!-- <img
      	        class="el-upload-list__item-thumbnail"
      	        :src="file.url" alt=""
      	      > -->
      	      <span> {{ file.name }} </span>
              <span><el-button type="text" icon="el-icon-zoom-in" v-if="/\.(jpg|jpeg|png|bmp|JPG|PNG|JPEG|BMP)$/.test(file.name)"  @click="handlePictureCardPreview(file)" ></el-button></span>
      	      <span><el-button type="text" icon="el-icon-download" @click="download(file.url,file.name)"></el-button></span>
      	      <span><el-button type="text" icon="el-icon-delete" @click="handleRemove(file,'train')" ></el-button></span>
      	    </div>
      	     <el-button size="small" type="primary">点击上传</el-button>
      	</el-upload>
      	<el-dialog :visible.sync="dialogVisible">
      	  <img width="100%" :src="dialogImageUrl" alt="">
      	</el-dialog>
      </el-form-item>

      <el-form-item label="其他资料">
      	<el-upload
          :headers="{'X-Token':token}"
          :data="{project_id:data.id,type:6}"
      	  action="http://hangan.com/upload/upload_project_image"
          :class="{disabled:!edit}"

          :file-list="otherImageList"
          :on-success="(resopnse,file,fileList) => {handPictureSucc(resopnse,file,fileList ,'other')}"
      	  :auto-upload="false"
          :on-change="(file, fileList) => {hangePictureChange(file, fileList, 'other')}"
          ref="other">
      	    <div slot="file" slot-scope="{file}">
      	      <!-- <img
      	        class="el-upload-list__item-thumbnail"
      	        :src="file.url" alt=""
      	      > -->
      	      <span> {{ file.name }} </span>
              <span><el-button type="text" icon="el-icon-zoom-in" v-if="/\.(jpg|jpeg|png|bmp|JPG|PNG|JPEG|BMP)$/.test(file.name)"  @click="handlePictureCardPreview(file)" ></el-button></span>
      	      <span><el-button type="text" icon="el-icon-download" @click="download(file.url,file.name)"></el-button></span>
      	      <span><el-button type="text" icon="el-icon-delete" @click="handleRemove(file,'other')" ></el-button></span>
      	    </div>
      	     <el-button size="small" type="primary">点击上传</el-button>
      	</el-upload>
      	<el-dialog :visible.sync="dialogVisible">
      	  <img width="100%" :src="dialogImageUrl" alt="">
      	</el-dialog>
      </el-form-item>

      <el-form-item label="总包商合同扫描件">
      	<el-upload
          :headers="{'X-Token':token}"
          :data="{project_id:data.id,type:7}"
      	  action="http://hangan.com/upload/upload_project_image"

          :class="{disabled:!edit}"
          :file-list="general_contractImageList"
          :on-success="(resopnse,file,fileList) => {handPictureSucc(resopnse,file,fileList ,'general_contract')}"
      	  :auto-upload="false"
          :on-change="(file, fileList) => {hangePictureChange(file, fileList, 'general_contract')}"
          ref="general_contract">

      	    <div slot="file" slot-scope="{file}">
      	      <!-- <img
      	        class="el-upload-list__item-thumbnail"
      	        :src="file.url" alt=""
      	      > -->
              <span> {{ file.name }} </span>
              <span><el-button type="text" icon="el-icon-zoom-in" v-if="/\.(jpg|jpeg|png|bmp|JPG|PNG|JPEG|BMP)$/.test(file.name)"  @click="handlePictureCardPreview(file)" ></el-button></span>
              <span><el-button type="text" icon="el-icon-download" @click="download(file.url,file.name)"></el-button></span>
              <span><el-button type="text" icon="el-icon-delete" @click="handleRemove(file,'contract')" ></el-button></span>
      	    </div>
             <el-button size="small" type="primary">点击上传</el-button>
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
    name:"project_add",
    data() {
      return {
		  baseUrl:process.env.BASE_API,
      token:'',
			certificate_type:[{id:1,name:'身份证'},{id:2,name:'护照'}],
      project_list:[],
      project_stage:['预签约','需求/预算','拟写相关材料','招标','投标','合同流程','中止','发票','实施','待收款','欠款','验收','免费维护期','完结'],
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
        contract_need:true,
        is_important:false,
				oprate_type_id:'',
				oprate_type_name:'',
				project_pay:'',
        contract_number:'',
				id:0,
				pay_type:'',
				info:[],
        service_info:[],
        buy_info:[],
        update_info:[],
        commute_info:[],
        pay_info:[],
        commute_info:[],
				sum_money:0.00,
        year_price:0.00,
        contractor_money:0.00,
        compute_money:0.00,
				project_desc:'',
        sign_customer_id:'',
        paid_money:0.00,
        project_stage:'',
        plan_money:0.00,
        end_project:false,
        is_stat:true,
        contractor_end_time:'',
        contractor_sign_time:'',
        end_remark:'',
        //element 的fileList 实际有2个，取并集，所以需要额外的存放2个的并集值，不然就会图片重复
        contractImageList:[
        ],//合同扫描件
        bidImageList:[],//中标通知书扫描件
        deliveyImageList:[],//送货单扫描件
        checkImageList:[],//验收报告扫描件
        trainImageList:[],//培训维护
        otherImageList:[],//其他
        general_contractImageList:[],//总包商合同扫描件

        has_service:false,
        has_buy:false,
        has_update:false,
        has_commute:false
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
      ServiceRow: [], //选中的服务列表
      BuyRow:[],
      UpdateRow:[],
      CommuteRow:[],
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,


      //element 的fileList 实际有2个，取并集，所以需要额外的存放2个的并集值，不然就会图片重复
      contractImageList:[
      ],//合同扫描件
      bidImageList:[],//中标通知书扫描件
      deliveyImageList:[],//送货单扫描件
      checkImageList:[],//验收报告扫描件
      trainImageList:[],//培训维护
      otherImageList:[],//其他
      general_contractImageList:[]//总包商合同扫描件

		}
	},
	methods:{
    selectServiceRow (val) {
      this.ServiceRow = val
    },
    selectBuyRow (val) {
      this.BuyRow = val
    },
    selectUpdateRow (val) {
      this.UpdateRow = val
    },
    selectCommuteRow (val) {
      this.CommuteRow = val
    },
    // 增加行
    // 删除方法
    // 删除选中行
    sum_amount(){
      this.data.plan_money = 0;
      for(var i in this.data.pay_info){
        if(this.data.pay_info[i].amount == false) {
          this.data.pay_info[i].amount = 0;
        }
        this.data.plan_money = parseFloat(this.data.plan_money) + parseFloat(this.data.pay_info[i].amount)

      }
    },
    //计算服务价格

    //小计  合同金额 x 数量
    inputServiceNum(row,num) {
      if(num == false ) {
        row.num = ''
        return false;
      }
      if(isNaN(parseInt(num))) {
        return false;
      }
      row.num = parseInt(num);
      if(isNaN(parseFloat(row.month_rent))) {
        row.month_rent = 0
      } else {
        row.month_rent = parseFloat(row.month_rent)
      }
      if(isNaN(parseInt(row.contract_period))) {
        row.contract_period = 0
      } else {
        row.contract_period = parseInt(row.contract_period)
      }
      if(isNaN(parseInt(row.sum_period))) {
        row.sum_period = 0
      } else {
        row.sum_period = parseInt(row.sum_period)
      }
      this.comuteServiceOn(row,row.num,row.month_rent,row.contract_period,row.sum_period);
      this.computeAlltheMoney()

    },
    //合同金额   合约期 x 月租
    inputServiceRent(row,rent){
       if(rent == false ) {
         row.rent = ''
         return false;
       }
       if(isNaN(parseFloat(rent)) || rent.indexOf('.') == (rent.length - 1)) {
         return false;
       }
       row.month_rent = parseFloat(rent);
       if(isNaN(parseInt(row.contract_period))) {
         row.contract_period = 0
       } else {
         row.contract_period = parseInt(row.contract_period)
       }
       if(isNaN(parseInt(row.num))) {
         row.num = 0
       } else {
         row.num = parseInt(row.num)
       }
       if(isNaN(parseInt(row.sum_period))) {
         row.sum_period = 0
       } else {
         row.sum_period = parseInt(row.sum_period)
       }
       this.comuteServiceOn(row,row.num,row.month_rent,row.contract_period,row.sum_period);
       this.computeAlltheMoney()

    },
    //合同金额   合约期 x 月租
    inputServicePeriod(row,period){
       if(period == false ) {
         row.period = ''
         return false;
       }
       if(isNaN(parseInt(period))) {
         return false;
       }
       row.contract_period = parseInt(period);
       if(isNaN(parseFloat(row.month_rent))) {
         row.month_rent = 0
       } else {
         row.month_rent = parseFloat(row.month_rent)
       }
       if(isNaN(parseInt(row.num))) {
         row.num = 0
       } else {
         row.num = parseInt(row.num)
       }
       if(isNaN(parseInt(row.sum_period))) {
         row.sum_period = 0
       } else {
         row.sum_period = parseInt(row.sum_period)
       }
       this.comuteServiceOn(row,row.num,row.month_rent,row.contract_period,row.sum_period);
       this.computeAlltheMoney()
    },
    //总合约期 计算待续约期，待签金额
    inputServiceSumPeriod(row,period){
       if(period == false ) {
         row.period = ''
         return false;
       }
       if(isNaN(parseInt(period))) {
         return false;
       }
       row.sum_period = parseInt(period);
       if(isNaN(parseFloat(row.month_rent))) {
         row.month_rent = 0
       } else {
         row.month_rent = parseFloat(row.month_rent)
       }
       if(isNaN(parseInt(row.num))) {
         row.num = 0
       } else {
         row.num = parseInt(row.num)
       }
       if(isNaN(parseInt(row.contract_period))) {
         row.contract_period = 0
       } else {
         row.contract_period = parseInt(row.contract_period)
       }

       this.comuteServiceOn(row,row.num,row.month_rent,row.contract_period,row.sum_period);
       this.computeAlltheMoney()
    },
    //计算所有显示金额，
    //合同金额   合约期 x 月租
    //小计  合同金额 x 数量
    //待续约期  总续约期 - 合约期
    //待签金额 合同金额 x 待续约期
    //参数，row，数量，月租，合约期，总合约期
    comuteServiceOn(row,num,rent,period,sum_period) {
      row.contract_money = this.accMul(period,rent)
      row.subtotal = this.accMul(row.contract_money,num)
      row.wait_period = this.accSub(sum_period,period)
      row.wait_money = this.accMul(row.wait_period,rent)
      row.wait_money = this.accMul(row.wait_money,num)
      this.computeAlltheMoney()
    },
    //计算购置价格
    inputBuyNum(row,num) {
      if(num == false ) {
        row.num = ''
        return false;
      }
      if(isNaN(parseInt(num))) {
        return false;
      }
      row.num = parseInt(num);
      if(isNaN(parseFloat(row.price))) {
        row.price = 0
      } else {
        row.price = parseFloat(row.price)
      }
      if(isNaN(parseFloat(row.rate))) {
        row.rate = 0
      } else {
        row.rate = parseFloat(row.rate)
      }

      row.subtotal = this.accMul(row.num,row.price)
      row.year_price = this.accMul(row.subtotal,row.rate)
      this.computeAlltheMoney()
    },
    inputBuyPrice(row,price){
      if(price == false) {
        row.price = '';
        return false;
      }
      if(isNaN(parseFloat(price)) || price.indexOf('.') == (price.length - 1)) {
        return false;
      }
      row.price = parseFloat(price);
      if(isNaN(parseInt(row.num))) {
        row.num = 0
      } else {
        row.num = parseInt(row.num)
      }
      if(isNaN(parseFloat(row.rate))) {
        row.rate = 0
      } else {
        row.rate = parseFloat(row.rate)
      }
      row.subtotal = this.accMul(row.num,row.price)
      row.year_price = this.accMul(row.subtotal,row.rate)
      this.computeAlltheMoney()
    },
    inputBuyRate(row,rate){
      if(rate == false) {
        row.rate = '';
        return false;
      }
      if(isNaN(parseFloat(rate)) || rate.indexOf('.') == (rate.length - 1)) {
        return false;
      }
      row.rate = parseFloat(rate);
      if(isNaN(parseInt(row.num))) {
        row.num = 0
      } else {
        row.num = parseInt(row.num)
      }
      if(isNaN(parseFloat(row.price))) {
        row.price = 0
      } else {
        row.price = parseFloat(row.price)
      }
      row.subtotal = this.accMul(row.num,row.price)
      row.year_price = this.accMul(row.subtotal,rate)
      this.computeAlltheMoney()
    },
    //计算置换更新价格
    inputUpdateNum(row,num) {
      if(num == false ) {
        row.num = ''
        return false;
      }
      if(isNaN(parseInt(num))) {
        return false;
      }
      row.num = parseInt(num);
      if(isNaN(parseFloat(row.displace_price))) {
        row.displace_price = 0
      } else {
        row.displace_price = parseFloat(row.displace_price)
      }

      row.subtotal = this.accMul(row.num,row.displace_price)
      this.computeAlltheMoney()
    },
    inputUpdatePrice(row,price){
      if(price == false) {
        row.displace_price = '';
        return false;
      }
      if(isNaN(parseFloat(price)) || price.indexOf('.') == (price.length - 1)) {
        return false;
      }
      row.displace_price = parseFloat(price);
      if(isNaN(parseInt(row.num))) {
        row.num = 0
      } else {
        row.num = parseInt(row.num)
      }
      row.subtotal = this.accMul(row.num,row.displace_price)
      this.computeAlltheMoney()
    },
    //计算通信价格
    inputCommuteNum(row,num) {
      if(num == false ) {
        row.num = ''
        return false;
      }
      if(isNaN(parseInt(num))) {
        return false;
      }
      row.num = parseInt(num);
      if(isNaN(parseFloat(row.month_rent))) {
        row.month_rent = 0
      } else {
        row.month_rent = parseFloat(row.month_rent)
      }

      row.subtotal = this.accMul(row.num,row.month_rent)
      this.computeAlltheMoney()
    },
    inputCommuteRent(row,rent){
      if(rent == false) {
        row.month_rent = '';
        return false;
      }
      if(isNaN(parseFloat(rent)) || rent.indexOf('.') == (rent.length - 1)) {
        return false;
      }
      row.month_rent = parseFloat(rent);
      if(isNaN(parseInt(row.num))) {
        row.num = 0
      } else {
        row.num = parseInt(row.num)
      }
      row.subtotal = this.accMul(row.num,row.month_rent)
      this.computeAlltheMoney()
    },
    computeAlltheMoney() {
      var money = '0.00'
      var year_price = '0.00'
      for(let i=0;i<this.data.service_info.length;i++) {
        money = this.accAdd(money,this.data.service_info[i]['subtotal'])
      }
      for(let i=0;i<this.data.buy_info.length;i++) {
        money = this.accAdd(money,this.data.buy_info[i]['subtotal'])
        year_price = this.accAdd(year_price,this.data.buy_info[i]['year_price'])
      }
      for(let i=0;i<this.data.update_info.length;i++) {
        money = this.accAdd(money,this.data.update_info[i]['subtotal'])
        year_price = this.accAdd(year_price,this.data.update_info[i]['year_price'])
      }
      for(let i=0;i<this.data.commute_info.length;i++) {
        money = this.accAdd(money,this.data.commute_info[i]['subtotal'])
      }
       this.data.compute_money = money
       this.data.year_price = year_price
       this.$set(this.data, 'compute_money', money)
       this.$set(this.data, 'year_price', year_price)
    },


    addService(){
      var list = {
        item_name:'',  //项目
        service_content:'', //服务内容
        num:'', //数量
        month_rent:'',//月租
        contract_period:'',//合同合约期
        contract_money:'', //合同金额   合约期 x 月租 x 数量
        subtotal:'', //小计  合同金额 x 数量
        sum_period:'',//总合约期
        wait_period:'', //待续约期
        wait_money:'', //待签金额
        remark:'', //备注
        key: Date.now()
      }
    	this.data.service_info.push(list);
    },
    delService() {
      for(var p in this.ServiceRow) {
        for(var q in this.data.service_info) {
          if(this.data.service_info[q]['key'] == this.ServiceRow[p]['key']) {
            this.data.service_info.splice(q,1);
            this.ServiceRow.splice(p,1);
          }
        }
      }
    },
    addBuy(){

      var list = {
        item_name:'',//项目名
        tec_parm:'',//技术参数、规格
        num:'',//数量
        price:'',//单价
        unit:'',//单位
        subtotal:'',//小计  单价 x 数量
        weihu_period:'',//维护期
        rate:'',
        year_price:'',//年度维护费  小计 x 0.1
        remark:'',//备注
        key: Date.now()
      }
    	this.data.buy_info.push(list);
    },
    delBuy() {
      for(var p in this.BuyRow) {
        for(var q in this.data.buy_info) {
          if(this.data.buy_info[q]['key'] == this.BuyRow[p]['key']) {
            this.data.buy_info.splice(q,1);
            this.BuyRow.splice(p,1);
          }
        }
      }
    },
    addUpdate(){

      var list = {
        item_name:'',//项目名称
        origin_buy_desc:'',//原购置情况
        tec_parm:'',//技术参数、规格
        num:'',//数量
        displace_price:'',//置换价
        unit:'',//单位
        subtotal:'',//小计
        weihu_period:'',//维护期(月)
        year_price:'',//年度维护费  关联原来项目的年度维护费
        remark:'',//备注
        key: Date.now()
      }
    	this.data.update_info.push(list);
    },
    delUpdate() {
      for(var p in this.UpdateRow) {
        for(var q in this.data.update_info) {
          if(this.data.update_info[q]['key'] == this.UpdateRow[p]['key']) {
            this.data.update_info.splice(q,1);
            this.UpdateRow.splice(p,1);
          }
        }
      }
    },
    addCommute(){

      var list = {
        item_name:'',//名称
        content:'',//包含内容
        num:'',//数量
        month_rent:'',//月租
        unit:'',//单位
        period:'',//通信服务期
        subtotal:'',//小计  数量x月租x服务期
        remark:'',//备注
        key: Date.now()
      }
    	this.data.commute_info.push(list);
    },
    delCommute() {
      for(var p in this.CommuteRow) {
        for(var q in this.data.update_info) {
          if(this.data.update_info[q]['key'] == this.CommuteRow[p]['key']) {
            this.data.update_info.splice(q,1);
            this.CommuteRow.splice(p,1);
          }
        }
      }
    },
    addPay(){
      var list = {
        amount:'',
        pay_type:'',
        scale:'',
        dead_line:'',
        remark:'',
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
        this.$alert('文件重复')
        fileList.splice(-1)
      }
      else{
        this.$refs[type].submit()
      }
    },
    handPictureSucc(response,file,fileList,type) {
      var imageList =''
      switch(type) {
        case 'bidding': imageList = 'bidImageList';break;
        case 'delivery': imageList = 'deliveyImageList';break;
        case 'check' : imageList = 'checkImageList';break;
        case 'contract': imageList = 'contractImageList';break;
        case 'train': imageList = 'trainImageList';break;
        case 'other': imageList = 'otherImageList';break;
        case 'general_contract': imageList = 'general_contractImageList';break;
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
        case 'train': type_number = '5';break;
        case 'other': type_number = '6';break;
        case 'general_contract': type_number = '7';break;
      }

      var data = {
        'url':'http://hangan.com' + response.data.url,
        'name':file.name,
        'type':type_number,
        'md5_name':response.data.md5_name,
        'project_id':this.data.id
      }
      this.data[imageList].push(data)
      this[imageList].push(data)

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
         case 'train' : type_number = '5';imageList = 'trainImageList';break;
         case 'other': type_number = '6';imageList = 'otherImageList';break;
         case 'general_contract': type_number = '7'; imageList = 'general_contractImageList';break;
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

         this.$refs[type].handleRemove(file)
         var imageList =''
         switch(type) {
           case 'bidding': imageList = 'bidImageList';break;
           case 'delivery': imageList = 'deliveyImageList';break;
           case 'contract': imageList = 'contractImageList';break;
           case 'check' : imageList = 'checkImageList';break;
           case 'train': imageList = 'trainImageList';break;
           case 'other': imageList = 'otherImageList';break;
           case 'general_contract': imageList = 'general_contractImageList';break;
         }
         for(var p in this.data[imageList]) {
           if(this.data[imageList][p]['name'] == file.name) {
             this.data[imageList].splice(p,1)
           }
         }
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
        if(data['contract_need'] == 0) {
          data['contract_need'] = false
        }
        else {
          data['contract_need'] = true
        }
        if(data['is_important'] == 0) {
          data['is_important'] = false
        }
        else {
          data['is_important'] = true
        }

        if(data['is_stat'] == 0) {
          data['is_stat'] = false
        }
        else {
          data['is_stat'] = true
        }
        data.bidImageList = [];
        data.deliveyImageList = [];
        data.checkImageList = [];
        data.contractImageList = [];
        data.trainImageList = [];
        data.otherImageList = [];
        data.general_contractImageList = [];
        if(data.buy_info == false) {
          data.buy_info = [];
        }
        if(data.service_info == false) {
          data.service_info = [];
        }
        if(data.update_info == false) {
          data.update_info = [];
        }
        if(this.op_type == 3) {
          data.pay_info = [];
          data.plan_money = 0.00;
        }
				this.data = data;
				this.loading = false
        this.computeAlltheMoney()
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
              case 5: imageList = 'trainImageList';break;
              case 6: imageList = 'otherImageList';break;
              case 7: imageList = 'general_contractImageList';break;
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
          else if(this.op_type == 3) {
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
				}
				else {
					return false;
				}
			})
		},
    //下载且重命名文件的3个方法，放在最后
    getBlob(url) {
        return new Promise(resolve => {
            const xhr = new XMLHttpRequest();

            xhr.open('GET', url, true);
            xhr.responseType = 'blob';
            xhr.onload = () => {
                if (xhr.status === 200) {
                    resolve(xhr.response);
                }
            };

            xhr.send();
        });
    },
    saveAs(blob, filename) {
        if (window.navigator.msSaveOrOpenBlob) {
            navigator.msSaveBlob(blob, filename);
        } else {
            const link = document.createElement('a');
            const body = document.querySelector('body');

            link.href = window.URL.createObjectURL(blob);
            link.download = filename;

            // fix Firefox
            link.style.display = 'none';
            body.appendChild(link);

            link.click();
            body.removeChild(link);

            window.URL.revokeObjectURL(link.href);
        }
    },
    download(url, filename) {
        this.getBlob(url).then(blob => {
            this.saveAs(blob, filename);
        });
    },
    accAdd(arg1, arg2) {
        var r1, r2, max;
        try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
        try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
        max = Math.pow(10, Math.max(r1, r2))
        return (arg1 * max + arg2 * max) / max
    },
    accDiv(arg1, arg2) {
        var r1, r2, max, min;
            try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
            try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
            max = Math.pow(10, Math.max(r1, r2));
            //动态控制精度长度
            min = (r1 >= r2) ? r1 : r2;
            return ((arg1 * max - arg2 * max) / max).toFixed(min)
    },
    accMul(arg1, arg2) {
        var max = 0, s1 = arg1.toString(), s2 = arg2.toString();
        try { max += s1.split(".")[1].length } catch (e) { }
        try { max += s2.split(".")[1].length } catch (e) { }
        return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, max)
    },
    accSub(arg1, arg2) {
        var r1, r2, max, min;
        try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
        try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
        max = Math.pow(10, Math.max(r1, r2));
        //动态控制精度长度
        min = (r1 >= r2) ? r1 : r2;
        return ((arg1 * max - arg2 * max) / max).toFixed(min)
    }

	},
	mounted(){
    this.formData = new FormData();
		this.select_loading = true;
		switch(this.$route.name) {
			case 'project_add':this.op_type = 1;break;
			case 'project_detail':this.op_type = 2;break;
      case 'project_copy':this.op_type = 3;break;
		}
    console.log(this.$route.name,this.op_type)
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
    else if(this.op_type == 3) {
      var data_id = this.$route.query.id
      this.getInfo({id:data_id});
      this.$forceUpdate();
      this.getImage({project_id:this.data.id})
      this.getProjectPay({id:this.data.id})
      this.edit=true;
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
