/*
 * @Author: Rex Joush
 * @Date: 2022-01-04 01:31:09
 * @LastEditors: Rex Joush
 * @LastEditTime: 2022-01-04 01:32:09
 */
import { baseUrl } from '@/api/url'
import request from '@/utils/request'
// 后台的 hello 接口
export function getFirstPage(applyId) {
  return request({
    url: `${baseUrl}/hello/test`,
    method: 'get'
  })
}
