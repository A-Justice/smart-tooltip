// module.exports.smartTooltip = smartTooltip;

export const smartTooltip = function smartTooltip() {
    var btnArray = document.querySelectorAll(".smart-tooltip-container");
    //var body = document.querySelector("body");
    var classes = ["right", "right-t", "right-b", "left", "left-t", "left-b", "bottom", "bottom-r", "bottom-l", "top", "top-r", "top-l"];

    let offSetValue = 5;

    //var bodyclient = body.getClientRects()[0];

    

    btnArray.forEach(element => {
        if (myfunc)
            element.addEventListener("mouseover", myfunc);

        element.addEventListener("mouseleave", mouseLeft);
    });

    function myfunc(event) {
        let windowWidth = window.innerWidth;
         let windowHeight = window.innerHeight;
        if (!event)
            return;

        let btn = event.target;
        if (!btn) return;

        let tooltip = btn.querySelector(".smart-tooltip");

        if (!tooltip) return;

        tooltip.style.visibility = "visible";
        tooltip.style.opacity = "1";
        tooltip.style.display = "block";

        var tooltipclient = tooltip.getBoundingClientRect();
        var btnclient = btn.getBoundingClientRect();
        

        var spaces = {
            left: btnclient.left > tooltipclient.width,
            right: (windowWidth - btnclient.right) > tooltipclient.width,
            top: btnclient.top > tooltipclient.height,
            bottom: (windowHeight - btnclient.bottom) > tooltipclient.height,
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

        removeTooltipClass(tooltip);

        if (spaces.getSpace("left")) {

            let topHalf = (btnclient.bottom - (btnclient.height / 2));
            let bottomHalf = windowHeight - topHalf;
            let halfTooltip = (tooltipclient.height / 2);

            let isContainerBigger = btnclient.height >= tooltipclient.height;

            if (isContainerBigger || ((topHalf > halfTooltip) && (bottomHalf > halfTooltip))) {
                if (!manipulateOverlayIfPresent(btnclient, tooltip, "left")) {
                    tooltip.classList.add('left');
                }
            } else if (topHalf <= halfTooltip) {
                if (!manipulateOverlayIfPresent(btnclient, tooltip, "left-b")) {
                    tooltip.classList.add('left-b');
                }

            } else if (bottomHalf <= halfTooltip) {
                if (!manipulateOverlayIfPresent(btnclient, tooltip, "left-t")) {
                    tooltip.classList.add('left-t');
                }

            }

        } else if (spaces.getSpace("right")) {

            let topHalf = (btnclient.bottom - (btnclient.height / 2));
            let bottomHalf = windowHeight - topHalf;
            let halfTooltip = (tooltipclient.height / 2);

            let isContainerBigger = btnclient.height >= tooltipclient.height;

            if (isContainerBigger || ((topHalf > halfTooltip) && (bottomHalf > halfTooltip))) {
                if (!manipulateOverlayIfPresent(btnclient, tooltip, "right")) {
                    tooltip.classList.add('right');
                }
            } else if (topHalf <= halfTooltip) {
                if (!manipulateOverlayIfPresent(btnclient, tooltip, "right-b")) {
                    tooltip.classList.add('right-b');
                }
            } else if (bottomHalf <= halfTooltip) {
                if (!manipulateOverlayIfPresent(btnclient, tooltip, "right-t")) {
                    tooltip.classList.add('right-t');
                }
            }

        } else if (spaces.getSpace("top")) {

            let leftHalf = (btnclient.right - (btnclient.width / 2));
            let rightHalf = windowWidth - leftHalf;
            let halfTooltip = (tooltipclient.width / 2);

            let isContainerBigger = btnclient.width >= tooltipclient.width;

            if (isContainerBigger || ((leftHalf > halfTooltip) && (rightHalf > halfTooltip))) {
                if (!manipulateOverlayIfPresent(btnclient, tooltip, "top")) {
                    tooltip.classList.add('top');
                }
            } else if (leftHalf <= halfTooltip) {
                if (!manipulateOverlayIfPresent(btnclient, tooltip, "top-r")) {
                    tooltip.classList.add('top-r');
                }

            } else if (rightHalf <= halfTooltip) {
                if (!manipulateOverlayIfPresent(btnclient, tooltip, "top-l")) {
                    tooltip.classList.add('top-l');
                }
            }

        } else if (spaces.getSpace("bottom")) {

            let leftHalf = (btnclient.right - (btnclient.width / 2));
            let rightHalf = windowWidth - leftHalf;
            let halfTooltip = (tooltipclient.width / 2);

            let isContainerBigger = btnclient.width >= tooltipclient.width;

           

            if (isContainerBigger || ((leftHalf > halfTooltip) && (rightHalf > halfTooltip))) {
                if (!manipulateOverlayIfPresent(btnclient, tooltip, "bottom")) {
                    tooltip.classList.add('bottom');
                }

            } else if (leftHalf <= halfTooltip) {
                if (!manipulateOverlayIfPresent(btnclient, tooltip, "bottom-r")) {
                    tooltip.classList.add('bottom-r');
                }

            } else if (rightHalf <= halfTooltip) {
                if (!manipulateOverlayIfPresent(btnclient, tooltip, "bottom-l")) {
                    tooltip.classList.add('bottom-l');
                }
            }


        } else {
            if (!manipulateOverlayIfPresent(btnclient, tooltip, "bottom")) {
                tooltip.classList.add('bottom');
            }
        }

    }

    /**
     * Remove all classes associated with the tooltips position
     * @param {ElementRef} tooltip The tooltip element
     */
    function removeTooltipClass(tooltip) {
        let classList = tooltip.classList;
        //search through a predefined classlist if tooltip has any on
        //then remove it
        classList.forEach(element => {
            if (classes.includes(element)) {
                classList.remove(element);
            }
        });
    }

    /**
     * Gets the position the element is supposed to stay if it has a stay class 
     * eg. returns 'right' if stay-right class is present
     * @param {HtmlElement} tooltip the tooltip element
     */
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

    function mouseLeft(event) {
        if (!event)
            return;

        let btn = event.target;
        if (!btn) return;

        let tooltip = btn.querySelector(".smart-tooltip");

        if (!tooltip) return;

        if (removeOverlayClass(tooltip)) {

            let tooltipRect = tooltip.getBoundingClientRect();

            //Reset Inline Styles
            tooltip.style.position = "";
            tooltip.style.top = "";
            tooltip.style.left = "";
            tooltip.style.bottom = "";
            tooltip.style.right = "";

            tooltip.classList.add("overlay");
        }

         //Make sure its not visible after mouse has left
         tooltip.style.visibility = "collapse"
         tooltip.style.opacity = "0";
         tooltip.style.display = "none";
    }

    function removeOverlayClass(tooltip) {
        let hasOverlay = false

        if (tooltip.classList.contains("overlayed")) {
            hasOverlay = true;
            tooltip.classList.remove("overlayed");
        }

        return hasOverlay;
    }

    function removeOverlayMarkClass(tooltip) {
        let hasOverlay = false

        if (tooltip.classList.contains("overlay")) {
            hasOverlay = true;
            tooltip.classList.remove("overlay");
        }

        return hasOverlay;
    }

    /**
     * Calculate the position of the tooltip based on the fixed position of the container
     * @param {DOMClientRect} btnclient The Rectangle that defines the button element
     * @param {string} tooltipPostion The position the tooltip should be displayed
     */
    function getOverlayCoordinates(btnclient,tooltipclient, tooltipPostion) {
        let windowWidth = window.innerWidth;
         let windowHeight = window.innerHeight;

        if (tooltipPostion.includes("right")) {
            
            let overlayCoordinates = {
                left: btnclient.right + offSetValue,
                top: (btnclient.top + (btnclient.height/2)) - (tooltipclient.height/2),
                props: ["left", "top"]
            }

            if (tooltipPostion == "right-t") {
                overlayCoordinates.bottom = windowHeight - btnclient.bottom;
                overlayCoordinates.props = ["left","bottom"];
            } else if (tooltipPostion == "right-b") {
                overlayCoordinates.top = btnclient.top + offSetValue;
            }

            return overlayCoordinates;
        }else if (tooltipPostion.includes("left")) {


            console.log(tooltipclient.height);
            
            let overlayCoordinates = {
                right: (windowWidth - btnclient.left) + offSetValue,
                top: (btnclient.top + (btnclient.height/2)) - (tooltipclient.height/2),
                props: ["right", "top"]
            }

            if (tooltipPostion == "left-t") {
                overlayCoordinates.bottom = windowHeight - btnclient.bottom;
                overlayCoordinates.props = ["right","bottom"];
            } else if (tooltipPostion == "left-b") {
                overlayCoordinates.top = btnclient.top + offSetValue;
            }

            return overlayCoordinates;
        }else if (tooltipPostion.includes("top")) {

            let overlayCoordinates = {
                left:(btnclient.right - (btnclient.width/2)) - (tooltipclient.width/2),
                bottom: (windowHeight - btnclient.top) + offSetValue,
                props: ["left","bottom"]
            }

            if (tooltipPostion == "top-l") {
                overlayCoordinates.right = (windowWidth - btnclient.right) + offSetValue;
                overlayCoordinates.props = ["right","bottom"]
            } else if (tooltipPostion == "top-r") {
                overlayCoordinates.left = btnclient.left + offSetValue;
            }

            return overlayCoordinates;
        }else if (tooltipPostion.includes("bottom")) {

            let overlayCoordinates = {
                left:(btnclient.right - (btnclient.width/2)) - (tooltipclient.width/2),
                top: btnclient.bottom + offSetValue,
                props: ["left","top"]
            }

            if (tooltipPostion == "bottom-l") {
                overlayCoordinates.right = (windowWidth - btnclient.right) + offSetValue;
                overlayCoordinates.props = ["right","top"]
            } else if (tooltipPostion == "bottom-r") {
                overlayCoordinates.left = btnclient.left + offSetValue;
            }

            return overlayCoordinates;
        }
    }

    /**
     * Checks for overlay class and manipulate it
     * Responsible for assigning the position if overlay class is detected on the element
     * @param {any} tooltip the tooltip element
     * @param {string} position the string that show which side the tooltip is
     */
    function manipulateOverlayIfPresent(btnBClientRect, tooltip, tooltipPosition) {
        //removeOverlayMarkClass checks for the presence of the overlay mark i.e
        //overlay .. remove it and add the overlayed class which has the css declarations
        //debugger;
        if (removeOverlayMarkClass(tooltip)) {

           // debugger;
            //Get the overlay coordinates
            let overlayCoordinates = getOverlayCoordinates(btnBClientRect,tooltip.getBoundingClientRect(), tooltipPosition);

            //Get the set properties base the tooltip position based on the tooltipPosition

            //Overlay styles to tooltip control
            tooltip.style.position = "fixed";

            for(let prop of overlayCoordinates.props){
                tooltip.style[prop] = overlayCoordinates[prop] + "px";
            }
            

            //Add the actual overlayed class which resets old styles
            tooltip.classList.add("overlayed");

            return true;
        }

        return false;
    }

}



