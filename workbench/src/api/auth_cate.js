import request from '@/utils/request'

export function getAuthCateList(data) {
  return request({
    url: '/auth_cate/list',
		// url: '/index.php',
    method: 'post',
    data : data
  })
}

export function addAuthCate(data) {
  return request({
    url: '/auth_cate/add',
		// url: '/index.php',
    method: 'post',
		data : data
  })
}

export function editAuthCate(data) {
  return request({
    url: '/auth_cate/edit',
    method: 'post',
		data : data
  })
}

export function delAuthCate(data) {
  return request({
    url: '/auth_cate/del',
    method: 'post',
		data : data
  })
}

