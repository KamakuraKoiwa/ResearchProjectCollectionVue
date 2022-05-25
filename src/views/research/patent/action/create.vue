<template>
  <div class="app-container" style="width: 100%; padding: 30px;">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>关键信息录入</span>
        <el-button style="float: right; padding: 3px 0" type="text">保存草稿</el-button>
      </div>
      <div class="text item">
        <el-form  :model="patentList" :label-position='left' label-width="80px">
            <el-form-item label="专利类型">
                  <el-select v-model="patentList.patentType" placeholder="请选择专利类型">
                    <el-option label="PCT" value="PCT"></el-option>
                    <el-option label="发明专利" value="invention"></el-option>
                    <el-option label="实用新型专利" value="utilityModel"></el-option>
                    <el-option label="外观设计专利" value="industrialTesign"></el-option>
                    <el-option label="其他" value="otherTypes"></el-option>
                  </el-select>
            </el-form-item>
            <el-form-item  label="专利号">
                  <el-input style="width: 250px" v-model="patentList.patentId"></el-input>
            </el-form-item>

            <el-form-item label="专利名称">
                <el-input style="width: 55%" v-model="patentList.patentName" placeholder="请输入专利名称"></el-input>
            </el-form-item>

            <el-form-item class="grid-content bg-purple" label="申请时间">
                  <el-date-picker
                    v-model="patentList.patentAppTime"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
                  </el-date-picker>
            </el-form-item> 

            <el-form-item class="grid-content bg-purple" label="公开时间">
                  <el-date-picker
                    v-model="patentList.patentPubTime"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
                  </el-date-picker>
            </el-form-item>

            <el-form-item class="grid-content bg-purple" label="授权时间">
                  <el-date-picker
                    v-model="patentList.patentAutTime"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
                  </el-date-picker>
            </el-form-item>
            
            <el-form-item label="所有单位">
              <el-radio-group v-model="patentList.patentUnitName">
                <el-radio label="1">西北大学</el-radio>
                <el-radio label="2">其他</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="单位名称">
              <el-input v-if="patentList.patentUnitName == 2" placeholder="请输入专利所属单位名称"></el-input>
              <el-input v-if="patentList.patentUnitName == 1" :disabled="true"></el-input>
            </el-form-item>
            
            <el-form-item label="作者总数">
              <el-input v-model="patentList.authorNum" placeholder="请输入作者总数"></el-input>
            </el-form-item>

            <el-form-item label="作者编号">
              <el-input style="width: 95%" v-model="patentList.authorId" placeholder="请输入作者编号"></el-input>
            </el-form-item>

            <el-form-item label="本人排序">
              <el-input v-model="patentList.authorSort" placeholder="请输入本人排序"></el-input>
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
  import patent from '@/api/patent'
  export default{
    data(){
      return{
        patentList:{
          patentType: '1',
          patentUnitName: '1'
        },
      }
    },
    created(){
      //获取路由id值
      //调取接口得到专利信息
      if(this.$route.params && this.$route.params.id){
        const id = this.$route.params.id
        this.getPatentInform(id)
      }

    },
    methods:{
      //根据id查询
      getPatentInform(patent_id){
        patent.getPatentId(patent_id) 
          .then(response => {
            this.patentList = response.data
        })
      },
      //添加
      save(){
        patent.addPatent(this.patentList)
          .then(respense => {
            //提示信息
             this.$message({
              type: 'success',
              message: '专利信息录入成功!',
            });
            //跳转回列表页面
            this.$router.push({path:'/research/patent/list'})
          })
      },
      //修改
      update(){
        patent.updatePatent(this.patentList)
          .then(respense => {
            //提示信息
             this.$message({
              type: 'success',
              message: '专利信息修改成功!',
            });
            //跳转回列表页面
            this.$router.push({path:'/research/patent/list'})
          })
      },
      //判断添加还是修改
      saveOrUpdate(){
        if(!this.$route.params.id){
          this.save();
        }else{
          this.update();
        }
      },
      //取消新增
      cancel(){
        this.$confirm('取消后编辑内容将丢失，确认取消?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            // 刷新页面
            this.$router.push({path:'/research/patent/list'})
          })
                  
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