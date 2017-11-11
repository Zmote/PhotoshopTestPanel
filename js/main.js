var csInterface = new CSInterface();

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
    var horizontalDensityInput = $("#perspectiveHorizontalDensity").val();
    var verticalDensityInput = $("#perspectiveVerticalDensity").val();
    csInterface.evalScript("zMotePanel.addOnePointPerspective("+ horizontalDensityInput +"," + verticalDensityInput + ")");
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