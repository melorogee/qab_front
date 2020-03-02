
import instance from '@/api/instance'
// 教育培训配置 - 行业类型配置
export const enterpriseSelfExamination = data => { return instance({ url: `/securityRiskOrder/enterpriseSelfExamination`, method: 'GET', params: data }) }

export const employeeReport = data => { return instance({ url: `/securityRiskOrder/employeeReport`, method: 'GET', params: data }) }
export const employeeSuggest = data => { return instance({ url: `/securityRiskOrder/employeeSuggest`, method: 'GET', params: data }) }
export const orderService = data => { return instance({ url: `/securityRiskOrder/orderService`, method: 'GET', params: data }) }
export const statistics = data => { return instance({ url: `/securityRiskOrder/statistics`, method: 'GET', params: data }) }

// export const employeeReportExport = data => { return instance({ url: `/securityRiskOrder/employeeReportExport`, method: 'GET', params: data }) }
export const employeeReportExport = '/manage/securityRiskOrder/employeeReportExport'

export const employeeSuggestExport = '/manage/securityRiskOrder/employeeSuggestExport'
export const orderServiceExport = '/manage/securityRiskOrder/orderServiceExport'
export const enterpriseSelfExaminationExport = '/manage/securityRiskOrder/enterpriseSelfExaminationExport'

