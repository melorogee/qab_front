
import instance from '@/api/instance'
// 教育培训配置 - 行业类型配置
export const industryList = data => { return instance({ url: `/industry/list`, method: 'GET', params: data }) }
export const industrySave = data => { return instance({ url: `/industry/save`, method: 'POST', data }) }
export const industryUpdate = data => { return instance({ url: `/industry/update`, method: 'POST', data }) }
export const industryDelete = data => { return instance({ url: `/industry/delete`, method: 'GET', params: data }) }
export const industryImport = data => { return instance({ url: `/industry/import`, method: 'POST', data }) }
export const industryDownload = 'https://cxzdjs.oss-cn-hangzhou.aliyuncs.com/import/template/%E8%A1%8C%E4%B8%9A%E7%B1%BB%E5%9E%8B%E6%A8%A1%E6%9D%BF.xlsx'
// 教育培训配置 - 岗位类型配置
export const positionList = data => { return instance({ url: `/position/type/list`, method: 'GET', params: data }) }
export const positionSave = data => { return instance({ url: `/position/type/save`, method: 'POST', data }) }
export const positionUpdate = data => { return instance({ url: `/position/type/update`, method: 'POST', data }) }
export const positionDelete = data => { return instance({ url: `/position/type/delete`, method: 'GET', params: data }) }
export const positionImport = data => { return instance({ url: `/position/type/import`, method: 'POST', data }) }
export const positionDownload = 'https://cxzdjs.oss-cn-hangzhou.aliyuncs.com/import/template/%E5%B2%97%E4%BD%8D%E7%B1%BB%E5%9E%8B%E6%A8%A1%E6%9D%BF.xlsx'
// 专家类型配置
export const expertList = data => { return instance({ url: `/expert/type/list`, method: 'GET', params: data }) }
export const expertSave = data => { return instance({ url: `/expert/type/save`, method: 'POST', data }) }
export const expertUpdate = data => { return instance({ url: `/expert/type/update`, method: 'POST', data }) }
export const expertDelete = data => { return instance({ url: `/expert/type/delete`, method: 'GET', params: data }) }
export const expertImport = data => { return instance({ url: `/expert/type/import`, method: 'POST', data }) }
export const expertDownload = 'https://cxzdjs.oss-cn-hangzhou.aliyuncs.com/import/template/%E4%B8%93%E5%AE%B6%E7%B1%BB%E5%9E%8B%E6%A8%A1%E6%9D%BF.xlsx'
// 特殊作业人员配置
export const specialList = data => { return instance({ url: `/special/operation/type/list`, method: 'GET', params: data }) }
export const specialSave = data => { return instance({ url: `/special/operation/type/save`, method: 'POST', data }) }
export const specialUpdate = data => { return instance({ url: `/special/operation/type/update`, method: 'POST', data }) }
export const specialDelete = data => { return instance({ url: `/special/operation/type/delete`, method: 'GET', params: data }) }
export const specialImport = data => { return instance({ url: `/special/operation/type/import`, method: 'POST', data }) }
export const specialDownload = 'https://cxzdjs.oss-cn-hangzhou.aliyuncs.com/import/template/%E7%89%B9%E6%AE%8A%E4%BD%9C%E4%B8%9A%E4%BA%BA%E5%91%98%E7%B1%BB%E5%9E%8B%E6%A8%A1%E6%9D%BF.xlsx'