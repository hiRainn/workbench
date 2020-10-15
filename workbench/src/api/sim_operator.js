
import request from '@/utils/request'

export function getSimOperatorList(data) {
  return request({
    url: '/sim_operator/list',
		// url: '/index.php',
    method: 'post',
    data : data
  })
}

export function addSimOperator(data) {
  return request({
    url: '/sim_operator/add',
		// url: '/index.php',
    method: 'post',
		data : data
  })
}

export function editSimOperator(data) {
  return request({
    url: '/sim_operator/edit',
    method: 'post',
		data : data
  })
}

export function delSimOperator(data) {
  return request({
    url: '/sim_operator/del',
    method: 'post',
		data : data
  })
}
