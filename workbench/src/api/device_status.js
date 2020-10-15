import request from '@/utils/request'

export function getDeviceStatusList(data) {
  return request({
    url: '/device_status/list',
		// url: '/index.php',
    method: 'post',
    data : data
  })
}

export function addDeviceStatus(data) {
  return request({
    url: '/device_status/add',
		// url: '/index.php',
    method: 'post',
		data : data
  })
}

export function editDeviceStatus(data) {
  return request({
    url: '/device_status/edit',
    method: 'post',
		data : data
  })
}

export function delDeviceStatus(data) {
  return request({
    url: '/device_status/del',
    method: 'post',
		data : data
  })
}
