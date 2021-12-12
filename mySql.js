/*
 * @Author: your name
 * @Date: 2021-12-11 21:18:42
 * @LastEditTime: 2021-12-12 12:08:04
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \assets\mySql.js
 */
var db = openDatabase('myDatabase', '1.0', 'MessageBoard Database', 2 * 1024 * 1024);
var dbData=[];
insertData({id: 1, log: '你好,这是我的留言板'});
insertData({id: 2, log: '可以在MessageBoard中查看我的留言板'});
getData();
function insertData(data) {
    db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS MSGBD (id unique, log)');
        tx.executeSql('INSERT INTO MSGBD (id, log) VALUES (?,?)', [data.id, data.log]);
        console.log('insertData', data);
    });
}
function getData() {
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM MSGBD', [], function (tx, results) {
            console.log('getData', results.rows);
            dbData = {};
            dbData=results.rows;
        });
    });
}