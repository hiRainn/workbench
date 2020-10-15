import request from '@/utils/request'

export function getDeviceTypeList(data) {
  return request({
    url: '/device_type/list',
		// url: '/index.php',
    method: 'post',
    data : data
  })
}

export function addDeviceType(data) {
  return request({
    url: '/device_type/add',
		// url: '/index.php',
    method: 'post',
		data : data
  })
}

export function editDeviceType(data) {
  return request({
    url: '/device_type/edit',
    method: 'post',
		data : data
  })
}

export function delDeviceType(data) {
  return request({
    url: '/device_type/del',
    method: 'post',
		data : data
  })
}

