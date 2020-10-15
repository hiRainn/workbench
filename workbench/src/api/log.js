import request from '@/utils/request'

export function getLogList(data) {
  return request({
    url: '/log/list',
		// url: '/index.php',
    method: 'post',
    data : data
  })
}

export function getUserList(data) {
  return request({
    url: '/log/user_list',
		// url: '/index.php',
    method: 'post',
    data : data
  })
}
