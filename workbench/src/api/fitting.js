import request from '@/utils/request'

export function getFittingList(data) {
  return request({
    url: '/fitting/list',
		// url: '/index.php',
    method: 'post',
    data : data
  })
}

export function editFitting(data) {
  return request({
    url: '/fitting/edit',
    method: 'post',
		data : data
  })
}

export function addFitting(data) {
  return request({
    url: '/fitting/add',
		// url: '/index.php',
    method: 'post',
		data : data
  })
}

export function plusFitting(data) {
  return request({
    url: '/fitting/plus',
    method: 'post',
		data : data
  })
}

export function subFitting(data) {
  return request({
    url: '/fitting/sub',
    method: 'post',
		data : data
  })
}

export function delFitting(data) {
  return request({
    url: '/fitting/del',
    method: 'post',
		data : data
  })
}
