import request from '@/utils/request'

export default{
    getPaperList(current,limit,rows){
        return request ({
            url:`/ResearchProjectCollectionSpringBoot/getInfo/pageConditionFind/${current}/${limit}`,
            method:'post',
            data: rows  //使用json
        })
    },
    getPaperAll(items){
        return request ({
            url:'/ResearchProjectCollectionSpringBoot/getInfo/findAll',
            method:'get',
            data: items  //使用json
        })
    },
    //添加论文
    addPaper(paperList){
        return request({
            url:'/ResearchProjectCollectionSpringBoot/getInfo/addThesisManagement',
            method:'post',
            data: paperList
        })
    },
    //删除
    deletePaper(id){
        return request({
            url:`/ResearchProjectCollectionSpringBoot/getInfo/${id}`,
            method:'delete'
        })
    },
    //批量删除

    //锁定和取消锁定 P53

    //id查询
    getPaperId(paper_id){
        return request({
            url:`/ResearchProjectCollectionSpringBoot/getInfo/GetThesis/${paper_id}`,
            method:'get',
        })
    },

    //修改
    updatePaper(paperList){
        return request({
            url:`/ResearchProjectCollectionSpringBoot/getInfo/updateThesis`,
            method:'post',
            data: paperList
        })
    }
    
}