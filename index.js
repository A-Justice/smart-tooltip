
export const smartTooltip = function smartTooltip() {
    var btnArray = document.querySelectorAll(".smart-tooltip-container");
    var body = document.querySelector("body");

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
        
        if(!tooltip)return;



        var tooltipclient = tooltip.getBoundingClientRect();
        var btnclient = btn.getBoundingClientRect();
        var bodyclient = body.getClientRects()[0];


        if (btnclient.left > tooltipclient.width) {

            let topHalf = (btnclient.bottom - (btnclient.height / 2));
            let bottomHalf = bodyclient.height - topHalf;
            let halfTooltip = (tooltipclient.height / 2);

            if ((topHalf > halfTooltip) && (bottomHalf > halfTooltip)) {
                tooltip.classList.remove(tooltip.classList[1]);
                tooltip.classList.add('left');

            } else if (topHalf < halfTooltip) {
                tooltip.classList.remove(tooltip.classList[1]);
                tooltip.classList.add('left-t');

            } else if (bottomHalf < halfTooltip) {
                tooltip.classList.remove(tooltip.classList[1]);
                tooltip.classList.add('left-b');

            }

        } else if ((bodyclient.width - btnclient.right) > tooltipclient.width) {

            let topHalf = (btnclient.bottom - (btnclient.height / 2));
            let bottomHalf = bodyclient.height - topHalf;
            let halfTooltip = (tooltipclient.height / 2);


            if ((topHalf > halfTooltip) && (bottomHalf > halfTooltip)) {
                tooltip.classList.remove(tooltip.classList[1]);
                tooltip.classList.add('right');
            } else if (topHalf < halfTooltip) {
                tooltip.classList.remove(tooltip.classList[1]);
                tooltip.classList.add('right-t');


            } else if (bottomHalf < halfTooltip) {
                tooltip.classList.remove(tooltip.classList[1]);
                tooltip.classList.add('right-b');


            }

        } else if (btnclient.top > tooltipclient.height) {
            tooltip.classList.remove(tooltip.classList[1]);
            tooltip.classList.add('top');
        } else if ((bodyclient.height - btnclient.bottom) > tooltipclient.height) {
            if (btnclient.left > (bodyclient.width - btnclient.right) || btnclient.left > btnclient.bottom || btnclient.left > btnclient.top) {
                tooltip.classList.remove(tooltip.classList[1]);
                tooltip.classList.add('bottom');
            } else {
                tooltip.classList.remove(tooltip.classList[1]);
                tooltip.classList.add('bottom');
            }
        }else{
            tooltip.classList.remove(tooltip.classList[1]);
            tooltip.classList.add('bottom');
        }

    }
}

//module.exports.smartTooltip = smartTooltip;

