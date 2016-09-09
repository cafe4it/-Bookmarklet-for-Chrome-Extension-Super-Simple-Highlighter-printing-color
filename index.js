var importScript = (function(oHead) {
    function loadError(oError) {
        throw new URIError("The script " + oError.target.src + " is not accessible.");
    }

    return function(sSrc, fOnload) {
        var oScript = document.createElement("script");
        oScript.type = "text\/javascript";
        oScript.onerror = loadError;
        if (fOnload) {
            oScript.onload = fOnload;
        }
        oHead.appendChild(oScript);
        oScript.src = sSrc;
    }

})(document.head || document.getElementsByTagName("head")[0]);
importScript("http://sources.disruptive-innovations.com/jscssp/trunk/cssParser.js", function() {
    var highlightEle = document.querySelector('style[id]')
    var headEle = document.getElementsByTagName('head')[0]
    if (highlightEle) {
        var ss = highlightEle.innerHTML
        var parser = new CSSParser()
        var objCss = parser.parse(ss, false, true)
        var cssRules = objCss["cssRules"]
        if (cssRules) {
            var cssPrint = ""
            var forceStyle = "{-webkit-print-color-adjust: exact !important;}"
            cssRules.forEach(function(obj) {
                if (obj["mSelectorText"]) {
                    cssPrint += (obj["mSelectorText"] + forceStyle)
                }
            })
            var printEle = document.createElement('style')
            printEle.setAttribute("type", "text/css")
            printEle.setAttribute("media", "print")
            printEle.setAttribute("id", "printStyle")
            printEle.innerHTML = cssPrint
            var IsExistsPrintEle = document.getElementById("printStyle")
            if (IsExistsPrintEle) {
                headEle.removeChild(IsExistsPrintEle)
            }
            headEle.appendChild(printEle)
            window.print()
        }
    }
})