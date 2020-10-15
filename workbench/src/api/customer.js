import request from '@/utils/request'

export function getCustomerList(data) {
  return request({
    url: '/customer/list',
		// url: '/index.php',
    method: 'post',
    data : data
  })
}

export function addCustomer(data) {
  return request({
    url: '/customer/add',
		// url: '/index.php',
    method: 'post',
		data : data
  })
}

export function editCustomer(data) {
  return request({
    url: '/customer/edit',
    method: 'post',
		data : data
  })
}

export function delCustomer(data) {
  return request({
    url: '/customer/del',
    method: 'post',
		data : data
  })
}

export function getSelectCustomer(data) {
	return request({
		// url:'/index2.php',
		url: '/customer/list_search',
		method: 'post',
		data:data
	})
}

