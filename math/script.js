/*
 * @Date: 2022-02-26 10:29:36
 * @LastEditors: MannixWu
 * @LastEditTime: 2022-05-09 18:50:29
 * @FilePath: \MannixWu.github.io\math\script.js
 */

// final draft
$(document).ready(function () {
    const maxResult = 40;
    const minResult = 10;
    var entry = "";
    var result = "";
    var count = [0,0];
    var question = randomQuestion(minResult,maxResult,randomNum(0,1));
    $("#question").html(question.question);
    //判断是否为数字
    function isNumber(num) {
        var reg = /^[0-9]*$/;
        return reg.test(num);
    }
    function randomNum(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    //生成20以内加减法的计算题目，且结果不大于20且不小于0
    function randomQuestion(min,max,sign) {
        var num1 = randomNum(min, max);
        var num2 = randomNum(min,max);
        var res = {
            question: "",
            answer: 0,
        };
        if (sign == 0) {
            res.question = num1 + " + " + num2;
            res.answer = num1 + num2;
        } else {
            res.question = num1 + " - " + num2;
            res.answer = num1 - num2;
        }
        if (res.answer > max || res.answer < min) {
            res = randomQuestion(min,max,sign);
        }
        return res;
    }
    $("button").click(function () {
        entry = $(this).attr("value");
        if (isNumber(entry)) {
            result += entry;
            $("#answer").html(result);
        } else if (entry == "=") {
            if (result == question.answer||(result==""&&question.answer==0)) {
                $("#answer").html("回答正确");
                count[0]++;

                question = randomQuestion( minResult,maxResult,randomNum(0,1));
                $("#question").html(question.question);
            } else {
                count[1]++;
                $("#answer").html("回答错误");
            }
                console.log("c1:"+count[0]+" c2:"+count[1]+" "+(count[0]/(count[0]+count[1])));
                $("#count").html("已回答:"+count[0]+"题，正确率："+(count[0]/(count[0]+count[1])* 100).toFixed(2) + "%");
            result = "";
        } else if (entry == "ac" || entry == "ce") {
            result = "";
            $("#answer").html("0");
        }

        console.log("entry: " + entry);
    });
}); // end doc ready function
