//把所有的模块统一处理
import React from 'react'
import LoginStore from './login.Store'
import UserStore from './user.Store'
import ChannelStore from './channel.Store'
class RootStore {
  constructor() {
    this.loginStore = new LoginStore()
    this.useStore = new UserStore()
    this.channelStore = new ChannelStore()
    //...
  }
}

//实例化根
const rootstore = new RootStore()
const context = React.createContext(rootstore)
const useStore = () => React.useContext(context)

export { useStore }
