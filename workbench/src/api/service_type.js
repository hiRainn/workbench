import request from '@/utils/request'

export function getServiceTypeList(data) {
  return request({
    url: '/service_type/list',
		// url: '/index.php',
    method: 'post',
    data : data
  })
}

export function addServiceType(data) {
  return request({
    url: '/service_type/add',
		// url: '/index.php',
    method: 'post',
		data : data
  })
}

export function editServiceType(data) {
  return request({
    url: '/service_type/edit',
    method: 'post',
		data : data
  })
}

export function delServiceType(data) {
  return request({
    url: '/service_type/del',
    method: 'post',
		data : data
  })
}

