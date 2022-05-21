import request from '@/utils/request'

export default{
    getPatentList(current,limit,searchObj){
        return request ({
            url:`/ResearchProjectCollectionSpringBoot/getPatentInfo/pageConditionFind/${current}/${limit}`,
            method:'post',
            data: searchObj  //使用json
        })
    },
    getPatentAll(items){
        return request ({
            url:'/ResearchProjectCollectionSpringBoot/getPatentInfo/findAll',
            method:'get',
            data: items  //使用json
        })
    },
    //添加专利
    addPatent(patentList){
        return request({
            url:'/ResearchProjectCollectionSpringBoot/getPatentInfo/addPatentManagement',
            method:'post',
            data: patentList
        })
    },
    //删除
    deletePatent(id){
        return request({
            url:`/ResearchProjectCollectionSpringBoot/getPatentInfo/${id}`,
            method:'delete'
        })
    },
    //批量删除
    batchPatent(idList){
        return request({
            url:`/ResearchProjectCollectionSpringBoot/getPatentInfo/batchRemove`,
            method:'delete'
        })
    },

    //锁定和取消锁定 P53

    //id查询
    getPatentId(patent_id){
        return request({
            url:`/ResearchProjectCollectionSpringBoot/getPatentInfo/GetPatent/${patent_id}`,
            method:'get',
        })
    },

    //修改
    updatePatent(patentList){
        return request({
            url:`/ResearchProjectCollectionSpringBoot/getPatentInfo/updatePatent`,
            method:'post',
            data: patentList
        })
    }

}