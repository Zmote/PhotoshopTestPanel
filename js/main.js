//TODO: add option to simulate depth --> ie. density based on angle
//TODO: check if you can bind an event to brush strokes --> ie. add pixels on brush stroke
//TODO: add mirrored drawing feature
//TODO: Refactor jsx code, optimize code

$(document).ready(function () {
    var csInterface = new CSInterface();

    //load all jsx files to host context
    (function () {
        var csInterface = new CSInterface();
        var extensionRoot = csInterface.getSystemPath(SystemPath.EXTENSION) + "/jsx/";
        csInterface.evalScript('$._ext.evalFiles("' + extensionRoot + '")');
    })();

    function getOptions() {
        var densityInput = $("#density").val();
        var radius = $("#radius").val();
        var eyeMargin = $("#eyeMargin").val();
        var startAngle = $("#startAngle").val();
        var stopAngle = $("#stopAngle").val();
        var autoRemovePath = $("#autoRemovePath").is(":checked");
        var strokePath = $("#strokePath").is(":checked");
        var simulatePressure = $("#simulatePressure").is(":checked");
        var pathMode = $("#pathMode").is(":checked");
        var simulateDepth = $("#simulateDepth").is(":checked");
        var atAngle = $("#atAngle").val();
        var easing = $("#easing").val();

        return {
            density: densityInput ? densityInput : 10,
            radius: radius ? radius : 2000,
            eyeMargin: eyeMargin ? eyeMargin : 0,
            startAngle: startAngle ? startAngle : 0,
            stopAngle: stopAngle ? stopAngle : 360,
            autoRemovePath: autoRemovePath,
            strokePath: strokePath,
            simulatePressure: simulatePressure,
            pathMode: pathMode,
            simulateDepth: simulateDepth,
            atAngle: atAngle ? atAngle : 90,
            easing : easing ? easing : 1
        };
    }

    function addOnePointPerspective() {
        csInterface.evalScript("zMotePanel.addOnePointPerspective(" + JSON.stringify(getOptions()) + ")");
    }

    function addMultiPointPerspective() {
        csInterface.evalScript("zMotePanel.addMultiPointPerspective(" + JSON.stringify(getOptions()) + ")");
    }

    //Event Listeners
    $("#panelInputForm").submit(false);
    $("#addOnePointPerspectiveButton").click(addOnePointPerspective);
    $("#addMultiPointPerspectiveButton").click(addMultiPointPerspective);

    $("#strokePath").change(function () {
        var strokePath = $("#simulatePressure");
        strokePath.attr("disabled", !$(this).is(":checked"));
        strokePath.parent("label").toggle($(this).is(":checked"));
    });
    $("#simulateDepth").change(function () {
        var easing = $("#easing");
        easing.attr("disabled", !$(this).is(":checked"));
        easing.parent("label").toggle($(this).is(":checked"));

        var atAngle = $("#atAngle");
        atAngle.attr("disabled", !$(this).is(":checked"));
        atAngle.parent("label").toggle($(this).is(":checked"));
    });
});
