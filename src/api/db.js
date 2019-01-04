import Vue from "vue";

/**
 * 本地历史消息存储封装
 */
export default {
  db:null,
  install(){
    Vue.prototype.$db = this
    if (this.db == null){
      this.db = openDatabase('history', '1.0', 'storage history message', 20 * 1024 * 1024);
      this.db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS MESSAGE (messageId unique, code,msgType,contentType,content,sentFrom,sentTo,sentAt)');
      });
    }
  },
  insert(message){
    this.db.transaction(function (tx) {
      tx.executeSql('CREATE TABLE IF NOT EXISTS MESSAGE (messageId unique, code,msgType,contentType,content,sentFrom,sentTo,sentAt)');
      tx.executeSql(`INSERT INTO MESSAGE (messageId,code,msgType,contentType,content,sentFrom,sentTo,sentAt) 
      VALUES (${message.messageId},"${message.code}","${message.msgType}","${message.contentType}","${message.content}","${message.from}","${message.to}",${message.sentAt})`);
    },function (a) {
      console.log(a)
    },function (b) {
      console.log(b)
    });
  },
  select(from,to,before,callback){
    if (before === undefined){
      before = 9999999999999999999
    }
    this.db.transaction(function (tx) {
      tx.executeSql(`select * from MESSAGE where ((sentFrom = '${from}' and sentTo = '${to}') or (sentFrom = '${to}' and sentTo = '${from}')) and messageId < ${before} order by messageId desc limit 20`,[],function (tx, results) {
        callback(results)
      });
    },function (a) {
      console.log(a)
    },function (b) {
      console.log(b)
    });
  }
}
