// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等

var cloneObject = function(src){
	var Result;
	switch(Object.prototype.toString.call(src)){
        case "[object Number]": 
            Result = (typeof src === "object"?new Number(src):parseInt(src.toString()));
            break;
        case "[object String]":
            Result = (typeof src === "object"?new String(src):src.toString());
            break;
        case "[object Boolean]":
            Result = (typeof src === "Boolean"?new Boolean(src):src);
            break;
        case "[object Date]":
            Result = new Date(src);
            break;
        case "[object Array]":
            var temp = new Array
            for(var i=0,a;a = src[i];i++)
            {
                temp[i] = cloneObject(a);
            }
            Result = temp;
            delete temp;
            break;
        case "[object Object]":
            var temp = {}; 
            var keys = Object.keys(src);
            for(var i=0,a;a=keys[i];i++)
            {
                temp[a] = cloneObject(src[a]);
            }
            Result = temp;
            delete temp;
            delete keys;
            break;
        default:
            break;
	}
	return Result;
}

// 测试用例：
var srcObj = {
    a: 1,
    b: {
        b1: ["hello", "hi"],
        b2: "JavaScript"
    }
};
var abObj = srcObj;
var tarObj = cloneObject(srcObj);

srcObj.a = 2;
srcObj.b.b1[0] = "Hello";

console.log(abObj.a);
console.log(abObj.b.b1[0]);

console.log(tarObj.a);      // 1
console.log(tarObj.b.b1[0]);    // "hello"

// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组

function uniqArray(arr) {
    var uniqarr = [];
    for (i = 0; i < arr.length; i++) {
        if (uniqarr.indexOf(arr[i]) == -1) {
            uniqarr.push(arr[i]);
        }

    }
    return uniqarr;
}
// 实例
var a = [1, 3, 5, 7, 5, 3];
var b = uniqArray(a);
console.log(b); // [1, 3, 5, 7]

// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 尝试使用一行简洁的正则表达式完成该题目

 function trim(str) {
    var reg = /^\s+|\s+$/g;
    return str.replace(reg, "");
}

// 实例
var str = '   hi!  ';
str = trim(str);
console.log(str); // 'hi!'

// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递

function each(arr, fn) {
    for(var i = 0, length1 = arr.length; i < length1; i++){
        fn(arr[i], i);
    }
}
// 实例
var arr = ['java', 'c', 'php', 'html'];
function output(item) {
    console.log(item)
}
each(arr, output);  // java, c, php, html

// 使用示例
var arr = ['java', 'c', 'php', 'html'];
function output(item, index) {
    console.log(index + ': ' + item)
}
each(arr, output);  // 0:java, 1:c, 2:php, 3:html

// 获取一个对象里面第一层元素的数量，返回一个整数

function getObjectLength(obj) {
    var length = 0;
    for (item in obj) {
        length += 1;
    }
    return length;
}

// 使用示例
var obj = {
    a: 1,
    b: 2,
    c: {
        c1: 3,
        c2: 4
    }
};
console.log(getObjectLength(obj)); // 3

// 接下来挑战一个`mini $`，它和之前的`$`是不兼容的，它应该是`document.querySelector`的
// 功能子集，在不直接使用`document.querySelector`的情况下，在你的`util.js`中完成以下任务：

function domQuery(selector, root) {
    var text;
    var elements = [];
    //if root is not defined, root = document
    if (!root) {
        root = document;
    }
    if (selector.charAt(0) === "#") {
        text = selector.replace(/^\#/, "");
        elements = document.getElementById(text);
    } else if (selector.charAt(0) === ".") {
        text = selector.replace(/^\./, "");
        elements = root.getElementsByClassName(text);
    } else if ((selector.charAt(0) === "[") && (selector.charAt(selector.length - 1) === "]")) {
        //get all the elements
        var eles = root.getElementsByTagName("*");
        //delete "[" and "]"
        selector = selector.replace(/^\[/, "");
        selector = selector.replace(/\]$/, "");
        var texts = selector.split("=");
        var attr = texts[0];
        var value = texts[1];
        //有属性值的情况
        if (texts[1]) {
            for (var i = 0, length1 = eles.length; i < length1; i++) {
                if (eles[i].hasAttribute(attr)) {
                    if (eles[i].getAttribute(attr) === value) {
                        elements = eles[i];
                    }
                }
            }
        }
        //没有属性值
        else {
            for (var i = 0, length1 = eles.length; i < length1; i++) {
                if (eles[i].hasAttribute(attr)) {
                    elements = eles[i];
                }
            }
        }
    } else {
        elements = root.getElementsByTagName(selector);
    }
    return elements;
}
function $(selector) {
    //multiple queries
    var result = [];
    if (selector.indexOf(" ") !== -1) {
        //split selector by space
        var selectors = selector.split(" ");
        parents = domQuery(selectors[0]);
        for (var i = 1, length1 = selectors.length; i < length1; i++) {
            if (parents.length) {
                parents = domQuery(selectors[i], parents[0]);
            } else {
                parents = domQuery(selectors[i], parents);
            }
        }
        result = parents;
    }
    //single query
    else {
        var result = domQuery(selector, document);
    }
    if (result.length) {
        return result[0];
    } else {
        return result;
    }
}

// 我们来继续用封装自己的小jQuery库来实现我们对于JavaScript事件的学习，还是在你的`util.js`，实现以下函数

// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
    if (element.addEventListener) {
        element.addEventListener(event, listener, false)
    }
}

// 移除element对象对于event事件发生时执行listener的响应
function removeEvent(element, event, listener) {
    if (element.removeEventListener) { //标准
        element.removeEventListener(event, listener, false);
    }
}
// 实现对click事件的绑定
function addClickEvent(element, listener) {
    addEvent(element, 'click', listener);
}

// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
    addEvent(element, "keydown", function(e) {
        if (e.keyCode === 13) {
            listener();
        }
    });
}
function delegateEvent(element, tag, eventName, listener) {
    $.eventName(element, function(e) {
        var e = e || window.event;　　　　
        var target = e.target || e.srcElement;　　　　
        if (target.nodeName.toLowerCase() === tag) {
            listener.call(target, e);　　　　
        }
    });
}

//函数封装

$.on = function(selector, event, listener) {
    return addEvent($(selector), event, listener);
};

$.un = function(selector, event, listener) {
    return removeEvent($(selector), event, listener);
};

$.click = function(selector, listener) {
    return addClickEvent($(selector), listener);
};

$.enter = function(selector, listener) {
    return addEnterEvent($(selector), listener);
};

$.delegate = function(selector, tag, event, listener) {
    return delegateEvent($(selector), tag, eventName, listener);
};

// 判断是否为IE浏览器，返回-1或者版本号

function isIE() {
    if (!!window.ActiveXObject || "ActiveXObject" in window) {
        var version = getIEVersion();
        return version;
    } else {
        return -1;
    }
}

function getIEVersion () {
    var reg = /(Trident.*rv\:|MSIE\s)((\d+)\.0)/;
    var uaString = navigator.userAgent;
    var versionMatch = uaString.match(reg);
    if (versionMatch) {
        return versionMatch[3];
    }
}
function setCookie(c_name,value,expiredays)
{
var exdate=new Date()
exdate.setDate(exdate.getDate()+expiredays)
document.cookie=c_name+ "=" +escape(value)+
((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
}

function getCookie(c_name)
{
if (document.cookie.length>0)
  {
  c_start=document.cookie.indexOf(c_name + "=")
  if (c_start!=-1)
    { 
    c_start=c_start + c_name.length+1 
    c_end=document.cookie.indexOf(";",c_start)
    if (c_end==-1) c_end=document.cookie.length
    return unescape(document.cookie.substring(c_start,c_end))
    } 
  }
return "";
}

// 习Ajax，并尝试自己封装一个Ajax方法。实现如下方法：

function ajax(url, options) {
    //新建一个XHR对象
    var xmlhttp;
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    //若没有设置type，则默认为get

    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        options.onsuccess();
    } else {
        options.onfail();
    }
    type = options.type || get;
    xmlhttp.open(type, url, true);
    if (type === "get") {
        xmlhttp.send();
    } else {
        xmlhttp.send(options.data);
    }
}