
//TODO: add option to simulate depth --> ie. density based on angle
//TODO: add two point perspective (multi selection to put two perspective grids at the same time
//TODO: add option to leave path on
//TODO: add option to stroke path
//TODO: check if you can bind an event to brush strokes --> ie. add pixels on brush stroke
//TODO: add mirrored drawing feature

$(document).ready(function(){
    var csInterface = new CSInterface();

    //load all jsx files to host context
    (function() {
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

        return {
            density: densityInput ? densityInput : 10,
            radius: radius ? radius : 1000,
            eyeMargin: eyeMargin ? eyeMargin : 0,
            startAngle: startAngle ? startAngle : 0,
            stopAngle: stopAngle ? stopAngle : 360,
            autoRemovePath : autoRemovePath,
            strokePath: strokePath,
            simulatePressure: simulatePressure,
            toString: function () {
                return "density: " + this.density + ", radius: " + this.radius + ", eyeMargin: " + this.eyeMargin + ", startAngle: " + this.startAngle
                    + ", stopAngle: " + this.stopAngle;
            }
        };
    }

    function addNewLayer() {
        var layerInput = $("#layerName");
        csInterface.evalScript("zMotePanel.addNewLayer('" + layerInput.val() + "')");
        layerInput.val("");
    }

    function addNewGroup() {
        var groupInput = $("#groupName");
        csInterface.evalScript("zMotePanel.addNewGroup('" + groupInput.val() + "')");
        groupInput.val("");
    }

    function addOnePointPerspective() {
        csInterface.evalScript("zMotePanel.addOnePointPerspective(" + JSON.stringify(getOptions()) + ")");
    }

    function addTwoPointPerspective() {
        csInterface.evalScript("zMotePanel.addTwoPointPerspective(" + JSON.stringify(getOptions()) + ")");
    }

    //Event Listeners
    $("#panelInputForm").submit(false);
    $("#addLayerButton").click(addNewLayer);
    $("#addGroupButton").click(addNewGroup);
    $("#addOnePointPerspectiveButton").click(addOnePointPerspective);
    $("#addTwoPointPerspectiveButton").click(addTwoPointPerspective);

    $("#strokePath").change(function(){
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
