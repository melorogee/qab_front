
import instance from '@/api/instance'
//
export const empUserList = data => { return instance({ url: `/employeeUser/list`, method: 'GET', params: data }) }

export const empUserDelete = data => { return instance({ url: `/employeeUser/delete`, method: 'POST', data }) }

export const employeeAdd = data => { return instance({ url: `/employeeUser/add`, method: 'POST', data }) }

export const userTemplateExport = '/manage/employeeUser/export'

export const employeeImport = data => { return instance({ url: `employeeUser/importExcel`, method: 'POST', data }) }

export const employUpdate = data => { return instance({ url: `employeeUser/updateById`, method: 'POST', data }) }

