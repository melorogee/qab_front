
import instance from '@/api/instance'
export const thisplanList = data => { return instance({ url: `/enterprise/year/plan/current/year/list`, method: 'GET', params: data }) }
export const hisplanList = data => { return instance({ url: `/enterprise/year/plan/before/year/list`, method: 'GET', params: data }) }
export const newTrainList = data => { return instance({ url: `/enterprise/year/plan/new/employee/training/list`, method: 'GET', params: data }) }
export const allTrainList = data => { return instance({ url: `/enterprise/year/plan/old/employee/training/list`, method: 'GET', params: data }) }



