
import instance from '@/api/instance'
export const urlCode = data => { return instance({ url: `/statutes/list`, method: 'GET', params: data }) }

export const cityList = data => { return instance({ url: `/city/list`, method: 'GET', params: data }) }
export const cityIndustryList = data => { return instance({ url: `/industry/city/industry/list`, method: 'GET', params: data }) }
export const industryPositionList = data => { return instance({ url: `/position/type/industry/positionList`, method: 'GET', params: data }) }


export const upload = data => { return instance({ url: `/oss/upload/form/upload/`, method: 'POST', data }) }
export const courseList = () => { return instance({ url: `/course/required/course/type/list`, method: 'GET'}) }
export const questionPositionList = () => { return instance({ url: `/employeeUser/positionTypeList`, method: 'GET'}) }
export const serviceList = () => { return instance({ url: `/serviceType/selectList`, method: 'GET'}) }
export const orgTypeList = () => { return instance({ url: `/organ/type/all/list`, method: 'GET'}) }



// export const upload = data => { return instance({ url: `http://www.cxzdjs.cn:8087/manage/oss/upload/form/upload/`, method: 'POST', data }) }
