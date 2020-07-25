
export const smartTooltip = function smartTooltip() {
    var btnArray = document.querySelectorAll(".smart-tooltip-container");
    var body = document.querySelector("body");
    var classes = ["right", "right-t", "right-b", "left", "left-t", "left-b", "bottom", "bottom-r", "bottom-l", "top", "top-r", "top-l"];
    btnArray.forEach(element => {
        if (myfunc)
            element.addEventListener("mouseover", myfunc);
    });

    function myfunc(event) {
        if (!event)
            return;

        let btn = event.target;
        if (!btn) return;

        let tooltip = btn.querySelector(".smart-tooltip");

        if (!tooltip) return;



        var tooltipclient = tooltip.getBoundingClientRect();
        var btnclient = btn.getBoundingClientRect();
        var bodyclient = body.getClientRects()[0];

        var spaces = {
            left: btnclient.left > tooltipclient.width,
            right: (bodyclient.width - btnclient.right) > tooltipclient.width,
            top: btnclient.top > tooltipclient.height,
            bottom: (bodyclient.height - btnclient.bottom) > tooltipclient.height,
            getSpace: function (key) {
                let stayClass = getStayClass(tooltip);
                // debugger;
                if (stayClass) {
                    if (stayClass == key)
                        return true;
                    else
                        return false;
                }
                return this[key];
            }
        }


        if (spaces.getSpace("left")) {

            let topHalf = (btnclient.bottom - (btnclient.height / 2));
            let bottomHalf = bodyclient.height - topHalf;
            let halfTooltip = (tooltipclient.height / 2);

            let isContainerBigger = btnclient.height >= tooltipclient.height;

            if (isContainerBigger || ((topHalf > halfTooltip) && (bottomHalf > halfTooltip))) {
                removeTooltipClass(tooltip);
                tooltip.classList.add('left');

            } else if (topHalf < halfTooltip) {
                removeTooltipClass(tooltip);
                tooltip.classList.add('left-b');

            } else if (bottomHalf < halfTooltip) {
                removeTooltipClass(tooltip);
                tooltip.classList.add('left-t');

            }

        } else if (spaces.getSpace("right")) {

            let topHalf = (btnclient.bottom - (btnclient.height / 2));
            let bottomHalf = bodyclient.height - topHalf;
            let halfTooltip = (tooltipclient.height / 2);

            let isContainerBigger = btnclient.height >= tooltipclient.height;

            if (isContainerBigger || ((topHalf > halfTooltip) && (bottomHalf > halfTooltip))) {
                removeTooltipClass(tooltip);
                tooltip.classList.add('right');
            } else if (topHalf < halfTooltip) {
                removeTooltipClass(tooltip);
                tooltip.classList.add('right-b');


            } else if (bottomHalf < halfTooltip) {
                removeTooltipClass(tooltip);
                tooltip.classList.add('right-t');


            }

        } else if (spaces.getSpace("top")) {

            let leftHalf = (btnclient.right - (btnclient.width / 2));
            let rightHalf = bodyclient.width - leftHalf;
            let halfTooltip = (tooltipclient.width / 2);

            let isContainerBigger = btnclient.width >= tooltipclient.width;

            if (isContainerBigger || ((leftHalf > halfTooltip) && (rightHalf > halfTooltip))) {
                removeTooltipClass(tooltip);
                tooltip.classList.add('top');

            } else if (leftHalf < halfTooltip) {
                removeTooltipClass(tooltip);
                tooltip.classList.add('top-r');

            } else if (rightHalf < halfTooltip) {
                removeTooltipClass(tooltip);
                tooltip.classList.add('top-l');
            }
            
        } else if (spaces.getSpace("bottom")) {

            let leftHalf = (btnclient.right - (btnclient.width / 2));
            let rightHalf = bodyclient.width - leftHalf;
            let halfTooltip = (tooltipclient.width / 2);

            let isContainerBigger = btnclient.width >= tooltipclient.width;

            if (isContainerBigger || ((leftHalf > halfTooltip) && (rightHalf > halfTooltip))) {
                removeTooltipClass(tooltip);
                tooltip.classList.add('bottom');

            } else if (leftHalf < halfTooltip) {
                removeTooltipClass(tooltip);
                tooltip.classList.add('bottom-r');

            } else if (rightHalf < halfTooltip) {
                removeTooltipClass(tooltip);
                tooltip.classList.add('bottom-l');
            }

            // debugger;
            // if (btnclient.left > (bodyclient.width - btnclient.right) || btnclient.left > btnclient.bottom || btnclient.left > btnclient.top) {
            //     removeTooltipClass(tooltip);
            //     tooltip.classList.add('bottom');
            // } else {
            //     removeTooltipClass(tooltip);
            //     tooltip.classList.add('bottom');
            // }
        } else {
            removeTooltipClass(tooltip);
            tooltip.classList.add('bottom');
        }

    }

    function removeTooltipClass(tooltip) {
        let classList = tooltip.classList;
        classList.forEach(element => {
            if (classes.includes(element)) {
                classList.remove(element);
            }
        });
    }

    function getStayClass(tooltip) {
        var classList = tooltip.classList;
        let stayPosition;
        classList.forEach(element => {
            if (element.includes(`stay-`)) {
                stayPosition = element.split("-")[1];
            }
        });

        return stayPosition;
    }
}

//module.exports.smartTooltip = smartTooltip;

