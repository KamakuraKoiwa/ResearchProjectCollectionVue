<template>
  <div style="padding:30px;">
  
    <router-view />
  </div>
</template>

<script>

// import paper from '@/api/paper'

// export default{
//   //定义变量和初始值
//   data() {
//     return{
//       current:1, //当前页
//       limit:3, //每页显示期刊数
//       rows:{}, //条件封装对象
//       list:[], //每页数据集合
//       total:5 //总期刊数

//     }
//   },
//   //在页面渲染之前调用created()，一般调用methods定义的方法，得到数据
//   created() {
//     this.getlist()
//   },
//   //定义方法，进行请求接口调用
//   methods: {
//     //专利列表
//     getlist(){ //当前页参数
//       // this.current = page
//       paper.getPaperAll()
//       //paper.getPaperList(this.current,this.limit,this.rows)
//       .then(response => { //请求成功,response是接口返回数据
//         //返回response赋值给list
//         this.list = response.data.items
//         //总专利数
//         // this.total = response.data.total
//         console.log(response)
//       }) 
//       .catch(error => { //请求失败调用
//         consloe.log(error)
//       }) 
//     }
//   }

// }
  
</script>