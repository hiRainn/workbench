import request from '@/utils/request'

export function getFunctionsList(data) {
  return request({
    url: '/functions/list',
		// url: '/index.php',
    method: 'post',
    data : data
  })
}

export function addFunctions(data) {
  return request({
    url: '/functions/add',
		// url: '/index.php',
    method: 'post',
		data : data
  })
}

export function editFunctions(data) {
  return request({
    url: '/functions/edit',
    method: 'post',
		data : data
  })
}

export function selectFunctions(data) {
  return request({
    url: '/functions/tree_function',
    method: 'post',
		data : data
  })
}

export function delFunctions(data) {
  return request({
    url: '/functions/del',
    method: 'post',
		data : data
  })
}

export function getFunctions(data) {
  return request({
    url: '/functions/checkbox_list',
    method: 'post',
		data : data
  })
}




