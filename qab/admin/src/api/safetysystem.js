
import instance from '@/api/instance'
export const threeImgList = data => { return instance({ url: `/enterprise/three/img/list`, method: 'GET', params: data }) }
export const threeImgDetail = data => { return instance({ url: `/enterprise/three/img/detail`, method: 'GET', params: data }) }
export const positionDelete = data => { return instance({ url: `/enterprise/three/img/delete`, method: 'GET', params: data }) }

export const oneCaseDetail = data => { return instance({ url: `/enterprise/case/listByEnterprise`, method: 'GET', params: data }) }

export const oneCaseImport = data => { return instance({ url: `/enterprise/case/upload/case`, method: 'POST', data }) }
export const oncaseDelete = data => { return instance({ url: `/enterprise/case/delete`, method: 'GET', params: data }) }

export const adminCaseList = data => { return instance({ url: `/enterprise/case/list`, method: 'GET', params: data }) }

export const troubleshootList = data => { return instance({ url: `/riskAssessment/troubleshootList`, method: 'GET', params: data }) }

export const processStatus = data => { return instance({ url: `/riskAssessment/processStatus`, method: 'GET', params: data }) }

export const onelist = data => { return instance({ url: `/riskAssessment/list`, method: 'GET', params: data }) }


export const updateById = data => { return instance({ url: `/riskAssessment/updateById`, method: 'POST', data }) }

export const generateUploadQdan = data => { return instance({ url: `/riskAssessment/generateUploadQdan`, method: 'GET', params: data }) }
export const generateUploadBiao = data => { return instance({ url: `/riskAssessment/generateUploadBiao`, method: 'GET', params: data }) }
export const getEnterpriseByExpertId = data => { return instance({ url: `/riskAssessment/getEnterpriseByExpertId`, method: 'GET', params: data }) }


export const exportList = '/manage/riskAssessment/export'

export const normal = data => { return instance({ url: `/riskAssessment/v2/processStatus`, method: 'POST', data }) }

