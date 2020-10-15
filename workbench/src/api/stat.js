import request from '@/utils/request'

export function getProjectStat() {
  return request({
    url: '/stat/project',
		// url: '/index.php',
    method: 'post'
  })
}

export function getServiceStat() {
  return request({
    url: '/stat/service',
		// url: '/index.php',
    method: 'post'
  })
}

export function getProjectMoneyStat() {
  return request({
    url: '/stat/project_money',
		// url: '/index.php',
    method: 'post'
  })
}

export function getDueProjectStat() {
  return request({
    url: '/stat/due_project',
		// url: '/index.php',
    method: 'post'
  })
}

export function getDueServiceStat() {
  return request({
    url: '/stat/due_service',
		// url: '/index.php',
    method: 'post'
  })
}

export function getOperationalServicesProject() {
  return request({
    url: '/stat/operational_services_project',
		// url: '/index.php',
    method: 'post'
  })
}

export function getPaymentReminder() {
  return request({
    url: '/stat/payment_reminder',
		// url: '/index.php',
    method: 'post'
  })
}

export function getProjectInc() {
  return request({
    url: '/stat/project_inc',
		// url: '/index.php',
    method: 'post'
  })
}

