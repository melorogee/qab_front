
import instance from '@/api/instance'
export const caseList = data => { return instance({ url: `/typical/case/publish/list`, method: 'GET', params: data }) }
export const unCaseList = data => { return instance({ url: `/course/optional/list`, method: 'GET', params: data }) }
export const casePublish = data => { return instance({ url: `/typical/case/publish`, method: 'GET', params: data }) }
export const caseSave = data => { return instance({ url: `/course/optional/save`, method: 'POST', data }) }
export const caseUpdate = data => { return instance({ url: `/course/optional/update`, method: 'POST', data }) }
export const caseDelete = data => { return instance({ url: `/course/optional/delete`, method: 'GET', params: data }) }
export const caseDetail = data => { return instance({ url: `/course/optional/detail`, method: 'GET', params: data }) }


export const templateList = data => { return instance({ url: `/examination/enroll/template/list`, method: 'GET', params: data }) }
export const templateImport = data => { return instance({ url: `/examination/enroll/template/import`, method: 'POST', data }) }
export const templateUpdate = data => { return instance({ url: `/examination/enroll/template/update`, method: 'POST', data }) }
export const templateDelete = data => { return instance({ url: `/examination/enroll/template/delete`, method: 'GET', params: data }) }



