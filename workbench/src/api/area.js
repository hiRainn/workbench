import request from '@/utils/request'

export function getArea(data) {
  
  return request({
		url: 'area',
    method: 'post',
    data : data
  })
}