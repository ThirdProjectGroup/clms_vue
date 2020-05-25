import request from '@/utils/request'
const group = 'question'

export default {
  save(question) { // 添 加
    return request({
      url: `/${group}/save`,
      method: 'post',
      data: question
    })
  },
  delete(id) { // 根 据 id 删 除
    return request({
      url: `/${group}/delete/${id}`,
      method: 'delete',
      data: id
    })
  },
  restore(id) { // 根 据 id 恢 复 删 除
    return request({
      url: `/${group}//restore/${id}`,
      method: 'put',
      data: id
    })
  },
  update(question) { // 修 改 
    return request({
      url: `/${group}/update`,
      method: 'put',
      data: question
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
  isSolve(id) { // 设 置 为 已 解 答
    return request({
      url: `/${group}/isSolve/${id}`,
      method: 'put',
      data: id
    })
  },
  noSolve(id) { // 设 置 为 未 解 答
    return request({
      url: `/${group}/noSolve/${id}`,
      method: 'put',
      data: id
    })
  }
}
