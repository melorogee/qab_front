
import instance from '@/api/instance'
// 必选课资料
export const settingList = data => { return instance({ url: `/v1.0/examination_paper_rules/page`, method: 'GET', params: data }) }
export const settingSave = data => { return instance({ url: `/v1.0/examination_paper_rules/save`, method: 'POST', data }) }
export const settingUpdate = data => { return instance({ url: `/v1.0/examination_paper_rules/update`, method: 'POST', data }) }
export const settingDelete = data => { return instance({ url: `/v1.0/examination_paper_rules/delete`, method: 'POST', params: data }) }

export const examList = data => { return instance({ url: `/v1.0/examination_library/list`, method: 'GET', params: data }) }
export const examForm = data => { return instance({ url: `/v1.0/examination_library/saveOrUpdate`, method: 'POST', data }) }
export const examDownload = 'https://cxzdjs.oss-cn-hangzhou.aliyuncs.com/import/template/%E8%AF%95%E9%A2%98%E6%A8%A1%E7%89%88.xlsx'


export const examDetailList = data => { return instance({ url: `/v1.0/examination_question/page`, method: 'GET', params: data }) }
export const examDetailForm = data => { return instance({ url: `/v1.0/examination_question/saveOrUpdate`, method: 'POST', data }) }
export const examDetailDelete = data => { return instance({ url: `/v1.0/examination_question/delete`, method: 'GET', params: data }) }
export const examDetailImport = data => { return instance({ url: `/v1.0/examination_question/import`, method: 'POST', data }) }
