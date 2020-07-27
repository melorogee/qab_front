
import instance from '@/api/instance'
export const thisplanList = data => { return instance({ url: `/enterprise/year/plan/current/year/list`, method: 'GET', params: data }) }
export const hisplanList = data => { return instance({ url: `/enterprise/year/plan/before/year/list`, method: 'GET', params: data }) }
export const newTrainList = data => { return instance({ url: `/enterprise/year/plan/new/employee/training/list`, method: 'GET', params: data }) }
export const allTrainList = data => { return instance({ url: `/enterprise/year/plan/old/employee/training/list`, method: 'GET', params: data }) }
export const saveYearPlan = data => { return instance({ url: `/enterprise/year/plan/single/save`, method: 'POST', data }) }
export const updateYearPlan = data => { return instance({ url: `/enterprise/year/plan/update`, method: 'POST', data }) }

export const delYearPlan = data => { return instance({ url: `/enterprise/year/plan/delete`, method: 'GET', params: data }) }
export const newExamList = data => { return instance({ url: `/enterprise/training/exam/employee/already/training?examType=1`, method: 'GET', params: data }) }
export const allExamList = data => { return instance({ url: `/enterprise/training/exam/employee/already/training?examType=2`, method: 'GET', params: data }) }

export const trainnewData1 = data => { return instance({ url: `/enterprise/training/stas/enterprise/data?type=1`, method: 'GET', params: data }) }
export const trainnewData2 = data => { return instance({ url: `/enterprise/training/stas/enterprise/data?type=2`, method: 'GET', params: data }) }
export const saveTrainNew = data => { return instance({ url: `/enterprise/year/plan/new/employee/training/save`, method: 'POST', data }) }
export const saveTrainNew1 = data => { return instance({ url: `/enterprise/year/plan/old/employee/training/save`, method: 'POST', data }) }

