window.onload = winLoad();


function winLoad() {

    Slideshow($(".imgContainer"), {
    });
    function Slideshow(element, option) {
        var timer = null;
        var imgArr = document.getElementsByTagName("img");
        var imgArrLen = imgArr.length;
        var createUl = document.createElement("ul"); 
        var iCurrent = parseInt(getStyle(imgArr[0], "width"));
        element.style.width = iCurrent * imgArrLen + "px"; 
        var iSpeed;
        for (var i = 0, len = imgArrLen; i < len; i++) {
            createUl.innerHTML += "<li></li>";
        }
        element.parentNode.appendChild(createUl);
        addClass(createUl, "Slideshow-nav");
        addClass(createUl.getElementsByTagName("li")[0], "active");
        var createSpan = document.createElement("div");
        addClass(createSpan, "left-right");
        createSpan.innerHTML = "<span class='nav-left'>&lt;</span><span class='nav-right'>&gt;</span>";
        element.parentNode.appendChild(createSpan);
        if (option.intervalTime) {
            iSpeed = option.intervalTime;
        } else {
            iSpeed = 4000;
        }
        timer = setInterval(autoPlay, iSpeed);
        clickLi();
        hoverElement();
        function hoverElement() {
            addEvent(element.parentNode, "mouseover", function () {
                clearInterval(timer);
            });
            addEvent(element.parentNode, "mouseout", function () {
                timer = setInterval(autoPlay, iSpeed);
            });
        }
        function clickLi() {
            delegateEvent(createUl, "li", "click", function () {
                var iTaget = -iCurrent * getIndex(this);
                removeLiClass();
                addClass(this, "active"); 

                 startMove(element, {
                    "left": iTaget
                });
                clearInterval(timer);
            });
        }
        clickSpan();
        function clickSpan() {
            delegateEvent(createSpan, "span", "click", function () {
                var heightLi = $(".Slideshow-nav .active");
                var leftIndex = !getIndex(this);
                play(leftIndex);

            });
        }
        function autoPlay() {
            var heightLi = $(".Slideshow-nav .active");
            var iTaget;
            if (heightLi) {
                if (option.noLoop) {
                    iTaget = (getIndex(heightLi) + 1) === imgArrLen ? 0 : (-iCurrent * (getIndex(heightLi) + 1));

                    if (getIndex(heightLi) + 1 === imgArrLen - 1) {
                        clearInterval(timer);
                    }
                    var nextLi = heightLi.nextElementSibling;
                    if (nextLi) {
                        removeLiClass();
                        addClass(nextLi, "active");
                    }
                    startMove(element, {
                        "left": iTaget
                    });
                } else {
                    if (option) {
                        play(option.reverse);
                    } else {
                        play("");
                    }
                }
            }
        }
        function play(reverse) {
            var heightLi = $(".Slideshow-nav .active");
            var iTaget;
            if (reverse) {
                iTaget = getIndex(heightLi) === 0 ? -iCurrent * (imgArrLen - 1) : -iCurrent * (getIndex(heightLi) - 1); //反向循环
                var previousLi = heightLi.previousElementSibling;
                if (previousLi) {
                    removeLiClass();
                    addClass(previousLi, "active"); 
                } else {
                    removeLiClass();
                    addClass(createUl.getElementsByTagName("li")[imgArrLen - 1], "active");
                }
            } else {
                iTaget = (getIndex(heightLi) + 1) === imgArrLen ? 0 : (-iCurrent * (getIndex(heightLi) + 1));
                var nextLi = heightLi.nextElementSibling;
                if (nextLi) {
                    removeLiClass();
                    addClass(nextLi, "active");

                } else {
                    removeLiClass();
                    addClass($(".Slideshow-nav li"), "active");
                }
            }
            startMove(element, {
                "left": iTaget
            });
        }
        function removeLiClass() {
            var oLi = createUl.getElementsByTagName("li");
            for (var i = 0, len = oLi.length; i < len; i++) {
                removeClass(oLi[i], "active");
            }
        }
    }
}