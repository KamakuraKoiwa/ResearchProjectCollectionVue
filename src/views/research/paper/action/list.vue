<template>
  <div style="padding:30px;">
    <el-form :inline="true" :model="searchObj" class="demo-form-inline" ref="searchObj">
      <el-form-item prop="paperName" label="论文题目">
        <el-input v-model="searchObj.paperName" placeholder="论文名称"></el-input>
      </el-form-item>
       <el-form-item prop="periodicalName" label="期刊名称">
        <el-input v-model="searchObj.periodicalName" placeholder="期刊名称"></el-input>
      </el-form-item>
      <el-form-item prop="paperDate" label="发表时间">
        <el-date-picker
          v-model="searchObj.paperDate"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item >
        <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
        <el-button type="warning" @click="resetForm('searchObj')">重置</el-button>
      </el-form-item>
      <el-form-item >
        <el-button type="success" icon="el-icon-circle-plus-outline" @click="addPaper" >新增</el-button>
      </el-form-item>
    </el-form>
    
    
    <el-table :data='list' stripe border fit highlight-current-row style="width: 100%">
      <el-table-column
            label="序号"
            type="index"
            width="50"
            align="center">
          <template scope="scope">
            <!-- （当前页-1）* 每页条数 + 当前行数据的索引 -->
            <span>{{(current - 1) * limit + scope.$index + 1}}</span> 
          </template>
      </el-table-column>
      <el-table-column sortable prop="paperDate" width="180px" align="center" label="发表时间"/>
      <el-table-column sortable prop="paperName" show-overflow-tooltip align="center" label="文章题目"/>
      <el-table-column prop="periodicalName" show-overflow-tooltip align="center" label="期刊名称"/>
      <el-table-column prop="authorSort" width="130px" align="center" label="本人排序"/>
      
      <el-table-column prop="status"  width="140px" align="center" label="审核状态">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.status > '0'">
            通过
          </el-tag>
          <el-tag type="danger" v-else-if="scope.row.status < '0'">
            未通过
          </el-tag>
          <el-tag type="primary" v-else>
            正在审核
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column
        fixed="right"
        align="center"
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button type="success" size="mini" class="el-icon-view"  @click="handleClick(scope.row)"></el-button>
          <!-- <router-link :to="'/research/paper/edit/'+scope.row.paperId">
            <el-button type="warning" size="mini" icon="el-icon-edit"></el-button>
          </router-link> -->
          <el-button type="warning" size="mini" icon="el-icon-edit" @click="editPaper(scope.row.paperId)"></el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removePaper(scope.row.paperId)"></el-button>
        </template>
      </el-table-column>

    </el-table>

    <!-- 分页 -->
    <el-pagination
    :current-page="current"
    :page-size="limit"
    :total="total"
    style="padding: 30px 0; text-align: right;"
    layout="total, prev, pager, next, jumper"
    @current-change="getList"/>
    <router-view />
  </div>
</template>

<script>
import paper from '@/api/paper'

export default{
  //定义变量和初始值
  data() {
    return{
      current:1, //当前页
      limit:10, //每页显示期刊数
      searchObj:{}, //条件封装对象
      list:[], //每页数据集合
      total: 0 //总期刊数

    }
  },
  //在页面渲染之前调用created()，一般调用methods定义的方法，得到数据
  created() {
    this.getList()
  },
  //定义方法，进行请求接口调用
  methods: {
    //获取期刊列表
    getList(page = 1){ //当前页参数
      this.current = page
      paper.getPaperList(this.current,this.limit,this.searchObj)
      .then(response => { //请求成功,response是接口返回数据
        //返回response赋值给list
        this.list = response.data.rows
        //总期刊数
        this.total = response.data.total
        console.log(response)
      }) 
      .catch(error => { //请求失败调用
        consloe.log(error)
      }) 
    },
    //添加论文
    addPaper(){
      this.$router.push('create')
      console.log(this.$router)
    },
    resetForm(formName){
         this.$refs[formName].resetFields()
         this.getList()
    },
    //编辑
    editPaper(id){
       this.$router.push('edit/'+ id)
    },
    //删除
    removePaper(id){
      // alert(id)
      this.$confirm('是否删除该信息?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          paper.removePaper(id)
            .then(respense => {
              //提示信息
              this.$message({
              type: 'success',
              message: '删除成功!',
            });
            // 刷新页面
            this.getList(1)
          })
                  
        });
    }
    
  }

}
  
</script>