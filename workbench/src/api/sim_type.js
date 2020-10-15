import request from '@/utils/request'

export function getSimTypeList(data) {
  return request({
    url: '/sim_type/list',
		// url: '/index.php',
    method: 'post',
    data : data
  })
}

export function addSimType(data) {
  return request({
    url: '/sim_type/add',
		// url: '/index.php',
    method: 'post',
		data : data
  })
}

export function editSimType(data) {
  return request({
    url: '/sim_type/edit',
    method: 'post',
		data : data
  })
}

export function delSimType(data) {
  return request({
    url: '/sim_type/del',
    method: 'post',
		data : data
  })
}

