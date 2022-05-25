<template>
  <div style="padding:30px;">
    <el-form :inline="true" :model="searchObj" class="demo-form-inline" ref="searchObj">
      <el-form-item prop="patentName" label="专利名称">
        <el-input v-model="searchObj.patentName" placeholder="专利名称"></el-input>
      </el-form-item>
      <el-form-item prop="patentPubTime" label="公布时间">
        <el-date-picker
          v-model="searchObj.patentPubTime"
          type="datetimerange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['12:00:00']">
        </el-date-picker>
      </el-form-item>
      <el-form-item >
        <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
        <el-button type="warning" @click="resetForm('searchObj')">重置</el-button>
      </el-form-item>
      <el-form-item >
        <el-button type="success" icon="el-icon-circle-plus-outline" @click="addPatent" >新增</el-button>
        <div><router-view/></div>
      </el-form-item>
    </el-form>
    
    <!-- 工具条 -->
    <div>
      <el-button type="danger" size="mini" @click="removeRows()">批量删除</el-button>
    </div>
    
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
    <!--  <el-table-column sortable prop="patentAppTime" width="180px" align="center" label="申请时间"/>  -->
    <el-table-column sortable prop="patentPubTime" width="180px" align="center" label="公布时间"/>
    <!--  <el-table-column prop="patentAutTime" width="180px" align="center" label="授权时间"/>  -->
    <el-table-column prop="patentType" width="150px" align="center" label="发明类型"/>
    <el-table-column prop="patentName" show-overflow-tooltip align="center" label="专利名称"/>
    <el-table-column prop="patentId" align="center" label="专利号"/>
    <el-table-column prop="authorName" show-overflow-tooltip align="center" label="作者"/>
    <!--  <el-table-column prop="authorNum" width="130px" align="center" label="作者总数"/>  -->
    <el-table-column prop="authorSort" width="130px" align="center" label="本人排序"/>
    <!-- <el-table-column prop="patentCertificate"  align="center" label="证明材料"/>  -->

    <el-table-column prop="status"  width="140px" align="center" label="审核状态">
      <template slot-scope="scope">
        <el-tag type="success" v-if="scope.row.patent_status > '0'">
          通过
        </el-tag>
        <el-tag type="danger" v-else-if="scope.row.patent_status < '0'">
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
        <el-button type="success" size="mini" class="el-icon-view" @click="handleClick(scope.row)"></el-button>
        <!-- 查看 -->
        <el-button type="warning" size="mini" icon="el-icon-edit" @click="editPatent(scope.row.patentId)"></el-button>
        <!-- 修改 -->
        <el-button type="danger" size="mini" icon="el-icon-delete" @click="removePatent(scope.row.patentId)"></el-button>
        <!-- 删除 -->
      </template>
    </el-table-column>

    </el-table>

    <!-- 分页 -->
    <el-pagination
    :current-page="current"
    :page-size="limit"
    :total="total"
    style="padding: 30px 0; text-align: right;"
    layout="prev, pager, next"
    @current-change="getList"/>
    <router-view />
  </div>
</template>

<script>
import patent from '@/api/patent'

export default{
  //定义变量和初始值
  data() {
    return{
      current:1, //当前页
      limit:5, //每页显示专利数
      searchObj:{}, //条件封装对象
      list:[], //每页数据集合
      total:0 //总专利数

    }
  },
  //在页面渲染之前调用created()，一般调用methods定义的方法，得到数据
  created() {
    this.getList()
  },
  //定义方法，进行请求接口调用
  methods: {
    //专利列表
    getList(page=1){ //当前页参数
      this.current = page
      patent.getPatentList(this.current,this.limit,this.searchObj)
      .then(response => { //请求成功,response是接口返回数据
        //返回response赋值给list
        this.list = response.data.rows
        //总专利数
        this.total = response.data.total
        console.log(response)
      }) 
      .catch(error => { //请求失败调用
        consloe.log(error)
      }) 
    },
    //添加专利
    addPatent(){
      this.$router.push('create')
      console.log(this.$router)
    },
    resetForm(formName){
         this.$refs[formName].resetFields()
         this.getList()
    },
    //编辑
    editPatent(id){
       this.$router.push('edit/'+ id)
    },
    //删除
    deletePatent(id){
      // alert(id)
      this.$confirm('是否删除该信息?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          patent.removePatent(id)
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




/*
export default {
  methods: {
      handleClick(row) {
        console.log(row);
      },
      addPatent(){
        this.$router.push('create')
        console.log(this.$router)
      }
  },
  data() {
    return {
      tableData: [{
        // patent_id:'1',
        patent_app_time:'2019-11-19',
        patent_pub_time:'2020-05-08',
        patent_aut_time:'2020-05-08',
        patent_type:'发明公开',
        patent_name: '基于区域曲率二进制描述符的点云初始配准方法',
        patent_grant_number:'CN201911133616.5',
        patent_author_name: '恒一陟; 耿国华; 张雨禾; 陆正杰',
        patent_author_sort: '2',
        patent_prove_materials:'',
        patent_status:'1',  //审核状态： '1':通过, '-1':未通过, '0':正在审核
        patent_unit:'1', //专利所有单位：'1':西北大学， '2':其他
        patent_owner:''
      }, {
        // patent_id:'2',
        patent_app_time:'2019-01-15',
        patent_pub_time:'2019-05-28',
        patent_aut_time:'2019-05-28',
        patent_type:'发明公开',
        patent_name: '一种基于三维卷积神经网络的点云物体类型识别方法',
        patent_grant_number:'CN201910034966.X',
        patent_author_name: '刘小通; 耿国华; 王毅; 徐嘉晨; 王瑶瑶',
        patent_author_sort: '2',
        patent_prove_materials:'',
        patent_status:'0'
      }, {
        // patent_id:'3',
        patent_app_time:'2018-11-30',
        patent_pub_time:'2019-05-28',
        patent_aut_time:'2019-05-28',
        patent_type:'发明公开',
        patent_name: '一种结合特征点拓扑和几何约束的文物碎片自动重组方法',
        patent_grant_number:'CN201811451796.7',
        patent_author_name: '耿国华; 胡佳贝; 田丰源; 褚彤; 张军; 丁飞; 张雨禾',
        patent_author_sort: '1',
        patent_prove_materials:'',
        patent_status:'1'
      }, {
        // patent_id:'4',
        patent_app_time:'2021-12-10',
        patent_pub_time:'2022-03-15',
        patent_aut_time:'2022-03-15',
        patent_type:'发明公开',
        patent_name: '一种高分辨率戏曲服饰的线图提取方法',
        patent_grant_number:'CN202111506856.2',
        patent_author_name: '耿国华; 冯龙; 周蓬博; 武浩东; 杨滢; 许阳; 李康; 刘阳洋',
        patent_author_sort: '1',
        patent_prove_materials:'',
        patent_status:'-1'
      }]
    }
  },

*/

</script>