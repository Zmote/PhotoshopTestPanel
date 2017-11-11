function ZMotePanel(){}

ZMotePanel.prototype.addNewLayer = function(name) {
    var newLayer = app.activeDocument.artLayers.add();
    if (name) {
        newLayer.name = name;
    }
};

ZMotePanel.prototype.addNewGroup = function(name) {
    var newGroup = app.activeDocument.layerSets.add();
    if (name) {
        newGroup.name = name;
    }
};

var zMotePanel = new ZMotePanel();