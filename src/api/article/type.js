import request from '@/utils/request'
const group = 'articleType'

export default {
  save(articleType) { // 添 加
    return request({
      url: `/${group}/save`,
      method: 'post',
      data: articleType
    })
  },
  delete(id) { // 根 据 id 删 除
    return request({
      url: `/${group}/delete/${id}`,
      method: 'delete',
      data: id
    })
  },
  update(articleType) { // 修 改 
    return request({
      url: `/${group}/update`,
      method: 'put',
      data: articleType
    })
  },
  get(id) { // 根 据 id 查 询
    return request({
      url: `/${group}/select/${id}`,
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
