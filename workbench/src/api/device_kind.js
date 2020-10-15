import request from '@/utils/request'

export function getDeviceKindList(data) {
  return request({
    url: '/device_kind/list',
		// url: '/index.php',
    method: 'post',
    data : data
  })
}

export function addDeviceKind(data) {
  return request({
    url: '/device_kind/add',
		// url: '/index.php',
    method: 'post',
		data : data
  })
}

export function editDeviceKind(data) {
  return request({
    url: '/device_kind/edit',
    method: 'post',
		data : data
  })
}

export function delDeviceKind(data) {
  return request({
    url: '/device_kind/del',
    method: 'post',
		data : data
  })
}
