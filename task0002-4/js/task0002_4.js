window.onload = winLoad();

function winLoad() {

    var inputArea = $("input"); 
    var oUl = $("div ul");

    inputChage(); 
    clickLi();
    keydownLi(); 
    function inputChage() {
        if (inputArea.addEventListener) {
            inputArea.addEventListener("input", OnInput, false);
        } else if (inputArea.attachEvent) {
            inputArea.attachEvent("OnPropChanged", OnPropChanged);
        };
        function OnInput(event) {
            var inputValue = event.target.value;
            handleValue(inputValue);
        }
        function OnPropChanged(event) {
            if (event.propertyName.toLowerCase() === "value") {
                var inputValue = event.srcElement.value;
                handleValue(inputValue);
            }
        }
    }
    function handleValue(value) {
        var isString = "";
        var reg = new RegExp("^" + value, "i");
        if (value === "") {
            oUl.style.display = "none";
        } else {
            ajax("task0002_4.txt", {
                onsuccess: prompt
            });
        }
        function prompt(data) {
            var promptArr = eval(data);
            var liElement = "";
            for (var i = 0, len = promptArr.length; i < len; i++) {
                var valueMatch = promptArr[i].match(reg);
                if (valueMatch) {
                    liElement += "<li><span>" + valueMatch[0] + "</span>" + promptArr[i].substr(valueMatch[0].length) + "</li>";
                }
            }
            oUl.innerHTML = liElement;
            oUl.style.display = "block";
        }
    }
    function clickLi() {
        delegateEvent(oUl, "li", "mouseover", function () {
            removeLiClass();
            addClass(this, "active");
        delegateEvent(oUl, "li", "mouseout", function () {
            removeClass(this, "active");
        });
        delegateEvent(oUl, "li", "click", function () {
            inputArea.value = deleteSpan(this.innerHTML);
            oUl.style.display = "none";
        });
    }
    function keydownLi() {
        addEvent(inputArea, "keydown", function (ev) {
            var heightLi = $(".active"); 
            var oEvent = ev || window.event;
            if (oEvent.keyCode === 38) {
                if (heightLi) {
                    var previousLi = heightLi.previousElementSibling;
                    if (previousLi) {
                        removeLiClass();
                        addClass(previousLi, "active");
                    }
                } else {
                    addClass($("div li"), "active");
                }
            }
            if (oEvent.keyCode === 40) {
                if (heightLi) {
                    var nextLi = heightLi.nextElementSibling;
                    if (nextLi) {
                        removeLiClass();
                        addClass(nextLi, "active");
                    }
                } else {
                    addClass($("div li"), "active");
                }
            }
            if (oEvent.keyCode === 13) {
                inputArea.value = deleteSpan(heightLi.innerHTML);
                oUl.style.display = "none";
            }
        })
    }
    function deleteSpan(stringHtml) {
        var reg = /^<span>(\w+)<\/span>(\w+)/;
        var stringArr = stringHtml.match(reg);
        if (stringArr) {
            return stringArr[1] + stringArr[2];
        } else {
            return "";
        }
    }
    function removeLiClass() {
        var oLi = oUl.getElementsByTagName("li");
        for (var i = 0, len = oLi.length; i < len; i++) {
            oLi[i].className = "";
        }
    }

}