var csInterface = new CSInterface();

//TODO: Implement more efficient path drawing (right now it draws the same path in both directions)
//TODO: add option to simulate depth --> ie. density based on angle
//TODO: add two point perspective (multi selection to put two perspective grids at the same time

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
    var densityInput = $("#density").val();
    var radius = $("#radius").val();
    csInterface.evalScript("zMotePanel.addOnePointPerspective("+ densityInput +"," + radius + ")");
}

$("#addLayerButton").click(addNewLayer);
$("#addGroupButton").click(addNewGroup);
$("#addOnePointPerspectiveButton").click(addOnePointPerspective);

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