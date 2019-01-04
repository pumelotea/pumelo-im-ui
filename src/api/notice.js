import Vue from 'vue';
import NoticeMsgView from '../components/Notice/NoticeMsg'
import NoticeSysMsgView from '../components/Notice/NoticeSysMsg'
import NoticeVTalkView from '../components/Notice/NoticeVTalk'
let NoticeMsg = Vue.extend(NoticeMsgView);
let NoticeSysMsg = Vue.extend(NoticeSysMsgView);
let NoticeVTalk = Vue.extend(NoticeVTalkView);
let instance;
export default {
  install(){
    Vue.prototype.$notice = this
  },
  openChatMsg(msg){
    //生成组件
    instance = new NoticeMsg({
      data:msg
    })
    //组件需要挂载在dom元素上
    instance.vm = instance.$mount();
    let wrap = document.getElementById('notice_wrap')
    if (wrap == null){
      let div = document.createElement('div')
      div.setAttribute('class','notice-wrap')
      div.setAttribute('id','notice_wrap')
      document.body.appendChild(div)
      wrap = document.getElementById('notice_wrap')
    }
    wrap.appendChild(instance.vm.$el);
    return instance.vm;
  },
  openSysMsg(msg){
//生成组件
    instance = new NoticeSysMsg({
      data:msg
    })
    //组件需要挂载在dom元素上
    instance.vm = instance.$mount();
    let wrap = document.getElementById('notice_wrap')
    if (wrap == null){
      let div = document.createElement('div')
      div.setAttribute('class','notice-wrap')
      div.setAttribute('id','notice_wrap')
      document.body.appendChild(div)
      wrap = document.getElementById('notice_wrap')
    }
    wrap.appendChild(instance.vm.$el);
    return instance.vm;
  },
  openVTalkMsg(name){
//生成组件
    instance = new NoticeVTalk({
      data:name
    })
    //组件需要挂载在dom元素上
    instance.vm = instance.$mount();
    let wrap = document.getElementById('notice_wrap')
    if (wrap == null){
      let div = document.createElement('div')
      div.setAttribute('class','notice-wrap')
      div.setAttribute('id','notice_wrap')
      document.body.appendChild(div)
      wrap = document.getElementById('notice_wrap')
    }
    wrap.appendChild(instance.vm.$el);
    return instance.vm;
  },
}
