import request from '@/utils/request'

export function getVersionList(data) {
  return request({
    url: '/version/list',
		// url: '/index.php',
    method: 'post',
    data : data
  })
}

export function getUploadList(data) {
  return request({
    url: '/upload/log',
		// url: '/index.php',
    method: 'post',
    data : data
  })
}

