import request from '@/utils/request'

export function getEventList(data) {
  return request({
    url: '/remind/list',
		// url: '/index.php',
    method: 'post',
    data : data
  })
}

export function addEvent(data) {
  return request({
    url: '/remind/save',
		// url: '/index.php',
    method: 'post',
	data : data
  })
}

