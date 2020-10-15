import request from '@/utils/request'

export function getSimList(data) {
  return request({
    url: '/service/simlist',
		// url: '/index.php',
    method: 'post',
    data : data
  })
}

export function getAuthList(data) {
  return request({
    url: '/service/authlist',
		// url: '/index.php',
    method: 'post',
    data : data
  })
}

export function getDeviceList(data) {
  return request({
    url: '/service/devicelist',
		// url: '/index.php',
    method: 'post',
    data : data
  })
}




