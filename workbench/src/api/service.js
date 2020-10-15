import request from '@/utils/request'

export function getServiceList(data) {
  return request({
    url: '/service/list',
		// url: '/index.php',
    method: 'post',
    data : data
  })
}

export function getServiceInfo(data) {
  return request({
    url: '/service/info',
		// url: '/index.php',
    method: 'post',
    data : data
  })
}

export function addService(data) {
  return request({
    url: '/service/add',
		// url: '/index.php',
    method: 'post',
		data : data
  })
}

export function editService(data) {
  return request({
    url: '/service/edit',
    method: 'post',
		data : data
  })
}

export function delService(data) {
  return request({
    url: '/service/del',
    method: 'post',
		data : data
  })
}


