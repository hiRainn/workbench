import request from '@/utils/request'

export function getOprateTypeList(data) {
  return request({
    url: '/oprate_type/list',
		// url: '/index.php',
    method: 'post',
    data : data
  })
}

export function addOprateType(data) {
  return request({
    url: '/oprate_type/add',
		// url: '/index.php',
    method: 'post',
		data : data
  })
}

export function editOprateType(data) {
  return request({
    url: '/oprate_type/edit',
    method: 'post',
		data : data
  })
}

export function delOprateType(data) {
  return request({
    url: '/oprate_type/del',
    method: 'post',
		data : data
  })
}

