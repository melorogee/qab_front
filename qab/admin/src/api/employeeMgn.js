
import instance from '@/api/instance'
// 必选课资料
export const empList = data => { return instance({ url: `/course/required/list`, method: 'GET', params: data }) }
