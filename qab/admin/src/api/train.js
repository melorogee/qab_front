
import instance from '@/api/instance'
// 必选课资料
export const materialsList = data => { return instance({ url: `/course/required/list`, method: 'GET', params: data }) }
export const materialsSave = data => { return instance({ url: `/course/required/save`, method: 'POST', data }) }
export const materialsDelete = data => { return instance({ url: `/course/required/delete`, method: 'GET', params: data }) }
export const materialsImport = data => { return instance({ url: `/course/required/import/save`, method: 'POST', data }) }

// 法规条文
export const statutesList = data => { return instance({ url: `/statutes/list`, method: 'GET', params: data }) }
export const statutesSave = data => { return instance({ url: `/statutes/save`, method: 'POST', data }) }
export const statutesDelete = data => { return instance({ url: `/statutes/delete`, method: 'GET', params: data }) }
export const statutesImport = data => { return instance({ url: `/statutes/import/save`, method: 'POST', data }) }

//培训档案
export const archivesList = data => { return instance({ url: `/training/record/list`, method: 'GET', params: data }) }
export const exportArchives = '/manage/training/record/export'
//培训计划
export const planList = data => { return instance({ url: `/training/arrange/list`, method: 'GET', params: data }) }
export const planAdd  = data => { return instance({ url: `/training/arrange/save`, method: 'POST', data }) }
export const planDelete = data => { return instance({ url: `/training/arrange/delete`, method: 'GET', params: data }) }
export const viewData  = data => { return instance({ url: `/training/arrange/detail`, method: 'GET',  params: data }) }
//考试报名
export const trainexamList = data => { return instance({ url: `/examination/enroll/list`, method: 'GET', params: data }) }
export const examApply  = data => { return instance({ url: `/examination/enroll/import`, method: 'POST', data }) }
export const getPayUrl  = data => { return instance({ url: `/pay/create`, method: 'GET', params: data }) }
export const checkPay  = data => { return instance({ url: `/order/examination/enroll/detail`, method: 'GET', params: data }) }
export const template  = data => { return instance({ url: `/examination/enroll/template/download/list`, method: 'GET', params: data }) }




