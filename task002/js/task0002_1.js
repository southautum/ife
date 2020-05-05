(function handle_1() {
    var inp = $("#user_input");
    var out = $("#user_output");
    $.click("#btn", function () {
        var value = inp.value.split(/\n|\s+|\,|\，|\、|\;|\；/);
        var unValue = uniqArray(value);
        var i = 0;
        var len = unValue.length;
        if (len > 10 || unValue == "") {
            $("p").style.disautoPlay = "block";
        } else {
            $("p").style.disautoPlay = "none";
            for (; i < len; i++) {
                var trimValue = trim(unValue[i]);
                console.log(trimValue);
                if (trimValue !== "") {
                    out.innerHTML += "<label>" + "<input type='checkbox'>" + trimValue + "</label>"
                }
            }
        }
    })
})();