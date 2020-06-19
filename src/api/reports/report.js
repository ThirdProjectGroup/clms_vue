import request from '@/utils/request'
const group = 'report'

export default {
  get(id) { // 根 据 报 告 id 查 询
    return request({
      url: `/${group}/get/${id}`,
      method: 'get',
      data: id
    })
  },
  getByPage(page) { // 分 页 查 询
    return request({
      url: `/${group}/getByPage`,
      method: 'post',
      data: page
    })
  }
}
