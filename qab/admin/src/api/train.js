
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