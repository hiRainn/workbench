import request from '@/utils/request'

export function getProjectPay(data) {
  return request({
    url: '/project_pay/project',
		// url: '/index.php',
    method: 'post',
    data : data
  })
}

export function getSelectProjectPay(data) {
  return request({
    url: '/project_pay/select_project_pay',
		// url: '/index.php',
    method: 'post',
    data : data
  })
}

export function addProjectPay(data) {
  return request({
    url: '/project_pay/add',
		// url: '/index.php',
    method: 'post',
		data : data
  })
}

export function editProjectPay(data) {
  return request({
    url: '/project_pay/edit',
    method: 'post',
		data : data
  })
}

export function getProjectPayList(data) {
  return request({
    url: '/project_pay/project_pay_list',
    method: 'post',
		data : data
  })
}




export function delProjectPay(data) {
  return request({
    url: '/project_pay/del',
    method: 'post',
		data : data
  })
}
