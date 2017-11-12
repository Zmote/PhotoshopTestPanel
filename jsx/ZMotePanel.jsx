function ZMotePanel() {}

ZMotePanel.prototype.addNewLayer = function (name) {
    var newLayer = app.activeDocument.artLayers.add();
    if (name) {
        newLayer.name = name;
    }
};

ZMotePanel.prototype.addNewGroup = function (name) {
    var newGroup = app.activeDocument.layerSets.add();
    if (name) {
        newGroup.name = name;
    }
};

ZMotePanel.prototype.addOnePointPerspective = function (options) {
    options = jsonUtility.parseOptions(options);
    var doc = app.activeDocument;
    var myPathItem = doc.pathItems.add("", pathUtility.generateSubPathFromDisconnectedLines(options));
    doc.selection.deselect();
    var layer = doc.artLayers.add();
    layer.name = "Perspective Grid";
    if(options.strokePath){
        if(options.simulatePressure){
            myPathItem.strokePath(ToolType.BRUSH,true);
        }else{
            myPathItem.strokePath(ToolType.BRUSH);
        }
    }
    if(options.autoRemovePath){
        myPathItem.remove();
    }
};

ZMotePanel.prototype.addTwoPointPerspective = function (options) {
    alert("lallla");
    var selection = app.activeDocument.selection;
};

$.global.zMotePanel = new ZMotePanel();