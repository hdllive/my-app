// 用户模块
import { makeAutoObservable } from 'mobx'
import { http } from '@/utils'

class UserStore {
  userInfo = {}
  constructor() {
    makeAutoObservable(this)
  }
  getUserInfo = async () => {
    //调用接口数据
    const res = await http.get('/user/profile')
    // console.log(res)
    this.userInfo = res.data
  }
}

export default UserStore
