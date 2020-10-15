import request from '@/utils/request'

export function getTodoList(data) {
  return request({
    url: '/todo/list',
		// url: '/index.php',
    method: 'post',
    data : data
  })
}

export function getSelfTodoList(data) {
  return request({
    url: '/todo/self_list',
		// url: '/index.php',
    method: 'post',
    data : data
  })
}

export function addTodo(data) {
  return request({
    url: '/todo/add',
		// url: '/index.php',
    method: 'post',
		data : data
  })
}

export function editTodo(data) {
  return request({
    url: '/todo/edit',
    method: 'post',
		data : data
  })
}

export function delTodo(data) {
  return request({
    url: '/todo/del',
    method: 'post',
		data : data
  })
}
