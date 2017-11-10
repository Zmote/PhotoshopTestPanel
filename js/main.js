var csInterface = new CSInterface();

function addNewLayer(name){
    csInterface.evalScript("addNewLayer('"+ name +"')");
}

$("#addLayerButton").click(function(){
    addNewLayer($("#layerName").val());
});