var csInterface = new CSInterface();

//TODO: add option to simulate depth --> ie. density based on angle
//TODO: add two point perspective (multi selection to put two perspective grids at the same time
//TODO: add option to leave path on
//TODO: add option to stroke path
//TODO: check if you can bind an event to brush strokes --> ie. add pixels on brush stroke
//TODO: add mirrored drawing feature

$("#panelInputForm").submit(false);

function addNewLayer(){
    var layerInput = $("#layerName");
    csInterface.evalScript("zMotePanel.addNewLayer('"+ layerInput.val() +"')");
    layerInput.val("");
}

function addNewGroup(){
    var groupInput = $("#groupName");
    csInterface.evalScript("zMotePanel.addNewGroup('" + groupInput.val()+ "')");
    groupInput.val("");
}

function addOnePointPerspective(){
    var densityInput = $("#onePointDensity").val();
    densityInput = densityInput ? densityInput : 10;
    var radius = $("#onePointRadius").val();
    radius = radius ? radius : 1000;
    var eyeMargin = $("#onePointEyeMargin").val();
    eyeMargin = eyeMargin ? eyeMargin : 0;
    var startAngle = $("#onePointStartAngle").val();
    startAngle = startAngle ? startAngle : 0;
    var stopAngle = $("#onePointStopAngle").val();
    stopAngle = stopAngle ? stopAngle : 360;
    csInterface.evalScript("zMotePanel.addOnePointPerspective(" + startAngle + "," + stopAngle + "," + densityInput +"," + radius + "," + eyeMargin + ")");
}

function addTwoPointPerspective(){
    var densityInput = $("#twoPointDensity").val();
    var radius = $("#twoPointRadius").val();
    csInterface.evalScript("zMotePanel.addTwoPointPerspective("+ densityInput + "," + radius + ")");
}

$("#addLayerButton").click(addNewLayer);
$("#addGroupButton").click(addNewGroup);
$("#addOnePointPerspectiveButton").click(addOnePointPerspective);
$("#addTwoPointPerspectiveButton").click(addTwoPointPerspective);

$("#layerName").keyup(function(e){
    if(e.which === 13){
        addNewLayer();
    }
});

$("#groupName").keyup(function(e){
    if(e.which === 13){
        addNewGroup();
    }
});