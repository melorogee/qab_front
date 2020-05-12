
import instance from '@/api/instance'
export const threeImgList = data => { return instance({ url: `/enterprise/three/img/list`, method: 'GET', params: data }) }
export const threeImgDetail = data => { return instance({ url: `/enterprise/three/img/detail`, method: 'GET', params: data }) }
export const positionDelete = data => { return instance({ url: `/enterprise/three/img/delete`, method: 'GET', params: data }) }

