/*
 * @Author: your name
 * @Date: 2021-12-11 19:43:38
 * @LastEditTime: 2021-12-11 21:09:44
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \assets\webSQL.js
 */

var datatable = null;
var db = openDatabase("MyData", "", "My Database", 1024 * 100);//创建数据库

var dresult = {
    isReturn: false,
    msg: null
}
function init() {
    datatable = document.getElementById("datatable");//获取留言文本显示区域元素
    showAllData();//执行创建表格以及查询表格信息，达到直接显示数据库中的信息
}

function removeAllData() {//创建留言文本区域固定的格式
    for (var i = datatable.childNodes.length - 1; i >= 0; i--) {//遍历datatable子元素的长度-1；
        datatable.removeChild(datatable.childNodes[i]);//移除选中子节点元素,然后执行下面创建新的格局
        console.log(datatable.childNodes[i])
    }
    var tr = document.createElement("tr");//创建行
    var th1 = document.createElement("th");//创建列1
    var th2 = document.createElement("th");//创建列2
    var th3 = document.createElement("th");//创建列3
    var th4 = document.createElement("th");//创建列3
    th1.innerHTML = "姓名";//列1的文本为“姓名”字符串
    th2.innerHTML = "留言";//列2的文本为“留言”字符串
    th3.innerHTML = "时间";//列3的文本为“时间”字符串
    tr.appendChild(th1);//
    tr.appendChild(th2);//、、把创建格式放入到创建行中
    tr.appendChild(th3);//
    datatable.appendChild(tr);//把创建行放入到留言文本显示区域
}

function showData(row) {//创建留言显示区域用户信息格式，以获取到的row长度参数
    var tr = document.createElement("tr");//创建行
    var td1 = document.createElement("td");//表格列
    td1.innerHTML = row.name;//表格第一列的文本显示为数据库查询返回值rs.row下的name值
    var td2 = document.createElement("td");//表格行的第二列
    td2.innerHTML = row.message;//表格第二列的文本显示为数据库查询返回值rs.row下的message值-也就是用户输入的留言文本
    var td3 = document.createElement("td");//表格行的第三列
    var t = new Date();//var 变量t储存最新时间
    t.setTime(row.time);//以毫秒设置对象t；
    //toLocaleDateString() 方法可根据本地时间把 Date 对象的日期部分转换为字符串，并返回结果。
    td3.innerHTML = t.toLocaleDateString() + " " + t.toLocaleTimeString();//表格第三列的文本显示为最新事件值
    tr.appendChild(td1);//
    tr.appendChild(td2);//、、把第一列第二列第三列放到一个行中。
    tr.appendChild(td3);//
    datatable.appendChild(tr);//把行放入到留言板显示区域
}

function showAllData() {//创建表格以及查询表格信息
    db.transaction(function (tx) {//控制事务
        //执行executeSql语句执行在MyData数据库创建表格MyData
        tx.executeSql("CREATE TABLE IF NOT EXISTS MyData(name TEXT,message TEXT,time INTEGER)");
        //执行executeSql语句执行查询MyData数据表；并执行回调函数
        tx.executeSql("SELECT * FROM MyData", [], function (tx, rs) {
            removeAllData();//执行创建元素函数
            console.log(tx)//SQLTransaction {}
            console.log(rs)//SQLResultSet {rows: SQLResultSetRowList, rowsAffected: 0}
            for (var i = 0; i < rs.rows.length; i++) {//使用for循环遍历rs长度
                showData(rs.rows.item(i));//执行showData函数并把遍历rs.rows长度的数值传参
                console.log(rs.rows.item(i))
                //打印值：Object {name: "king", message: "看iiiiiiiii ", time: 1496473241987}
            }
        })
    })
}
function returnRandomData() {
    db.transaction(function (tx) {//控制事务
        //执行executeSql语句执行在MyData数据库创建表格MyData
        tx.executeSql("CREATE TABLE IF NOT EXISTS MyData(name TEXT,message TEXT,time INTEGER)");
        //执行executeSql语句执行查询MyData数据表；并执行回调函数
        tx.executeSql("SELECT * FROM MyData", [], function (tx, rs) {
            removeAllData();//执行创建元素函数
            console.log(tx)//SQLTransaction {}
            console.log(rs)//SQLResultSet {rows: SQLResultSetRowList, rowsAffected: 0}
            for (var i = 0; i < rs.rows.length; i++) {//使用for循环遍历rs长度
                showData(rs.rows.item(i));//执行showData函数并把遍历rs.rows长度的数值传参
                console.log(rs.rows.item(i))
                dresult.msg=rs.rows.item(i);
                dresult.isReturn=true;
                //打印值：Object {name: "king", message: "看iiiiiiiii ", time: 1496473241987}
            }
        })
    });
    while (dresult.isReturn == false) {
        console.log("等待返回");
    }
    dresult.isReturn = false;
    return dresult.msg;
}
function addData(name, message, time) {//将输入信息保存到数据库表中
    db.transaction(function (tx) {//控制事务
        //执行executeSql语句插入将获取的信息参数插入到表格中
        tx.executeSql("INSERT INTO MyData VALUES(?,?,?)", [name, message, time], function (tx, rs) {
            alert("成功");//弹出提示框显示插入成功
            console.log(tx);
            console.log(rs);
        })
    })
}

function saveData() {//点击保存函数
    var name = document.getElementById("name").value;//获取用户输入的姓名文本
    var memo = document.getElementById("memo").value;//获取用户输入留言文本
    var time = new Date().getTime();//获取最新时间
    //by Mannix Wu 20/10/2021
    if (name == "" || memo == "") {
        alert("输点东西再保存吧");
        return false;
    }
    addData(name, memo, time);//执行插入表函数并且把获取信息传入参数
    showAllData();//执行创建表以及查询读取表函数
}