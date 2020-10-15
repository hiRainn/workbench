import request from '@/utils/request'

export function getDeviceList(data) {
  return request({
    url: '/device/list',
		// url: '/index.php',
    method: 'post',
    data : data
  })
}

export function addDevice(data) {
  return request({
    url: '/device/add',
		// url: '/index.php',
    method: 'post',
		data : data
  })
}

export function editDevice(data) {
  return request({
    url: '/device/edit',
    method: 'post',
		data : data
  })
}

export function delDevice(data) {
  return request({
    url: '/device/del',
    method: 'post',
		data : data
  })
}


