import request from '@/utils/request'
const group = 'answer'
// 默认导出，导出是可以自定义名字
export default {
  save(answer) { // 添 加
    return request({
      url: `/${group}/save`,
      method: 'post',
      data: answer
    })
  },
  delete(id) { // 根 据 id 删 除
    return request({
      url: `/${group}/delete/${id}`,
      method: 'delete',
      data: id
    })
  },
  restore(id) { //  根 据 id 恢 复 删 除
    return request({
      url: `/${group}/restore/${id}`,
      method: 'put',
      data: id
    })
  },
  update(answer) { // 修 改
    return request({
      url: `/${group}/update`,
      method: 'put',
      data: answer
    })
  },
  get(id) { // 根 据 id 查 询
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
  },
  isAdopt(id) { // 设 置 为 已 采 纳
    return request({
      url: `/${group}/Adopted/${id}`,
      method: 'put',
      data: id
    })
  },
  noAdopt(id) { // 设 置 为 未 采 纳
    return request({
      url: `/${group}/notAdopt/${id}`,
      method: 'put',
      data: id
    })
  },
  getAll() {
    return request({
      url: `/${group}/getAll`,
      method: 'get'
    })
  }
}
