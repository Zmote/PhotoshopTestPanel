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

$("#addLayerButton").click(addNewLayer);
$("#addGroupButton").click(addNewGroup);

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