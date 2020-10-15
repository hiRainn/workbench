import request from '@/utils/request'

export function getEndProjectList(data) {
  return request({
    url: '/tips/project',
		// url: '/index.php',
    method: 'post',
    data : data
  })
}

export function getEndServiceList(data) {
  return request({
    url: '/tips/service',
		// url: '/index.php',
    method: 'post',
		data : data
  })
}




