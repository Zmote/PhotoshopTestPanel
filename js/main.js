//TODO: add option to simulate depth --> ie. density based on angle
//TODO: check if you can bind an event to brush strokes --> ie. add pixels on brush stroke
//TODO: add mirrored drawing feature

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

        return {
            density: densityInput ? densityInput : 10,
            radius: radius ? radius : 2000,
            eyeMargin: eyeMargin ? eyeMargin : 0,
            startAngle: startAngle ? startAngle : 0,
            stopAngle: stopAngle ? stopAngle : 360,
            autoRemovePath: autoRemovePath,
            strokePath: strokePath,
            simulatePressure: simulatePressure,
            pathMode: pathMode
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

    $("#layerName").keyup(function (e) {
        if (e.which === 13) {
            addNewLayer();
        }
    });

    $("#groupName").keyup(function (e) {
        if (e.which === 13) {
            addNewGroup();
        }
    });
});
