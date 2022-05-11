<template>
  <div class="app-container" style="width: 100%; padding: 30px;">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>关键信息录入</span>
        <el-button style="float: right; padding: 3px 0" type="text">保存草稿</el-button>
      </div>
      <div class="text item">
        <el-form  :model="paperList" label-width="80px">
          
           <!-- <el-form-item label="文章类型">
              <el-select v-model="paperList.paper_type" >
                <el-option label="期刊" value="1"></el-option>
                <el-option label="会议" value="2"></el-option>
              </el-select>
            </el-form-item> -->

            <el-form-item label="文章标题">
                <el-input  style="width: 95%" v-model="paperList.paperName" placeholder="请输入文章标题"></el-input>
            </el-form-item>

            <el-form-item class="grid-content bg-purple" label="发表时间">
              <el-date-picker
                v-model="paperList.paperDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="请选择日期">
              </el-date-picker>
            </el-form-item> 
            <el-form-item label="期刊名称">
                <el-input style="width: 95%" v-model="paperList.periodicalName" placeholder="请输入期刊名称"></el-input>
            </el-form-item>
            <el-form-item label="期刊级别">
              <el-input style="width: 95%" v-model="paperList.periodicalLevel" placeholder="请输入期刊级别"></el-input>
            </el-form-item>

            <el-form-item label="期刊语言">
              <el-radio-group v-model="paperList.periodicalLanguage">
                <el-radio label="1">中文</el-radio>
                <el-radio label="2">英文</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="通讯单位">
              <el-select v-model="paperList.paperUnitName" placeholder="请选择通讯单位">
                <el-option label="西北大学" value="1"></el-option>
                <el-option label="其他" value="2"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="单位名称">
              <el-input style="width: 95%" v-if="paperList.paperUnitName == 2" placeholder="请输入文章所属单位名称"></el-input>
              <el-input style="width: 95%" v-else placeholder="西北大学" :disabled="true"></el-input>
            </el-form-item>

             <el-form-item label="作者总数">
              <el-input style="width: 95%" v-model="paperList.paperAuthorNum" placeholder="请输入作者总数"></el-input>
            </el-form-item>
            
            <el-form-item label="第一作者">
              <el-input style="width: 95%" v-model="paperList.firstAuthorName" placeholder="请输入第一作者"></el-input>
            </el-form-item>

            <el-form-item label="本人排序">
              <el-input style="width: 95%" v-model="paperList.authorSort" placeholder="请输入本人排序"></el-input>
              
            </el-form-item>
           
            <el-form-item >
                <el-button type="primary" @click="saveOrUpdate">提交</el-button>
                <el-button type="warning" @click="cancel">取消</el-button>
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

    </el-card>-->
    <router-view />
  </div>
</template>
<script>
  import paper from '@/api/paper'
  export default{
    data(){
      return{
        paperList:{
          periodicalLanguage: '1',
          paperUnitName: '1'
        },
      }
    },
    created(){
      //获取路由id值
      //调取接口得到论文信息
      if(this.$route.params  && this.$route.params.id){
        const id =  this.$route.params.id
        this.getPaperInform(id)
      }

    },
    methods:{
      //根据id查询
      getPaperInform(paper_id){
        paper.getPaperId(paper_id) 
          .then(response => {
            this.paperList = response.data
        })
      },
      //添加
      save(){
        paper.addPaper(this.paperList)
          .then(respense => {
            //提示信息
             this.$message({
              type: 'success',
              message: '论文信息录入成功!',
            });
            //跳转回列表页面
            this.$router.push({path:'/research/paper/list'})
          })
      },
      //修改
      update(){
        paper.updatePaper(this.paperList)
          .then(respense => {
            //提示信息
             this.$message({
              type: 'success',
              message: '论文信息修改成功!',
            });
            //跳转回列表页面
            this.$router.push({path:'/research/paper/list'})
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
            this.$router.push({path:'/research/paper/list'})
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