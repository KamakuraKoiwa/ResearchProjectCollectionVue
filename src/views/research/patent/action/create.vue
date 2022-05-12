<template>
  <div class="app-container" style="width: 100%; padding: 30px;">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>关键信息</span>
        <el-button style="float: right; padding: 3px 0" type="text">保存</el-button>
      </div>
      <div class="text item">
        <el-form  :model="patentList" :label-position='left' label-width="80px">
            <el-form-item label="专利类型">
                  <el-select v-model="patentList.patent_type" placeholder="请选择专利类型">
                    <el-option label="PCT" value="PCT"></el-option>
                    <el-option label="发明专利" value="invention"></el-option>
                    <el-option label="实用新型专利" value="utilityModel"></el-option>
                    <el-option label="外观设计专利" value="industrialTesign"></el-option>
                    <el-option label="其他" value="otherTypes"></el-option>
                  </el-select>
            </el-form-item>
            <el-form-item  label="专利号">
                  <el-input style="width: 250px" v-model="patentList.patent_grant_number"></el-input>
            </el-form-item>

            <el-form-item label="专利名称">
                <el-input style="width: 55%" v-model="patentList.patentName" placeholder="请输入专利名称"></el-input>
            </el-form-item>

            <el-form-item class="grid-content bg-purple" label="申请时间">
                  <el-date-picker
                    v-model="patentAppTime"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
                  </el-date-picker>
            </el-form-item> 

            <el-form-item class="grid-content bg-purple" label="公开时间">
                  <el-date-picker
                    v-model="patentPubTime"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
                  </el-date-picker>
            </el-form-item> 

            <!-- <el-row>
              <el-col :span="8">
                <el-form-item label="专利类型">
                  <el-select v-model="patentList.patent_type" placeholder="请选择专利类型">
                    <el-option label="PCT" value="PCT"></el-option>
                    <el-option label="发明专利" value="invention"></el-option>
                    <el-option label="实用新型专利" value="utilityModel"></el-option>
                    <el-option label="外观设计专利" value="industrialTesign"></el-option>
                    <el-option label="其他" value="otherTypes"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item  label="专利号">
                  <el-input style="width: 250px" v-model="patentList.patent_grant_number"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="专利名称">
                <el-input style="width: 55%" v-model="patentList.patent_name"></el-input>
            </el-form-item>

            <el-row>
              <el-col :span="8">
                <el-form-item class="grid-content bg-purple" label="申请时间">
                  <el-date-picker
                    v-model="value1"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item> 
              </el-col>
              <el-col :span="8">
                <el-form-item class="grid-content bg-purple" label="公开时间">
                  <el-date-picker
                    v-model="value1"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item> 
              </el-col>
            </el-row> -->

            <el-form-item label="所有单位">
              <el-radio-group v-model="patentList.patent_unit">
                <el-radio label="1">西北大学</el-radio>
                <el-radio label="2">其他</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="单位名称">
              <el-input v-if="patentList.patent_unit == 2" placeholder="请输入专利所属单位名称"></el-input>
              <el-input v-if="patentList.patent_unit == 1" :disabled="true"></el-input>
            </el-form-item>

            
            <el-form-item label="本人排序">
              <el-input v-model="patentList.patent_author_sort" placeholder="请输入本人排序"></el-input>
              
            </el-form-item>
            <el-form-item label="作者总数">
              <el-input v-model="patentList.patent_author_num" placeholder="请输入作者总数"></el-input>
            </el-form-item>
           
            <el-form-item >
                <el-button type="primary">提交</el-button>
                <el-button type="warning">取消</el-button>
            </el-form-item> 

        </el-form>
      </div>


    </el-card>
    <!-- <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>作者信息</span>
      </div>
       <div class="text item">
         
       </div>

    </el-card> -->
    <router-view />
  </div>
</template>
<script>
  import Sticky from '@/components/Sticky' // 粘性header组件
  export default {
    data() {
      return {
        patentList: {
          patent_app_time:'',
          patent_pub_time:'',
          patent_aut_time:'',
          patent_type:'',
          patent_name: '',
          patent_grant_number:'',
          patent_author_name: '',
          patent_author_sort: '',
          patent_prove_materials:'',
          patent_status:'',  //审核状态： '1':通过, '-1':未通过, '0':正在审核
          patent_unit:'1', //专利所有单位：'1':西北大学， '2':其他
          patent_owner:''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>

<style>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
    
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    margin: auto;
    width: 98%;
  }
</style>