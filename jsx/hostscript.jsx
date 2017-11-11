function ZMotePanel() {
}

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

ZMotePanel.prototype.getCenterAnchorPathPoint = function () {
    return zMotePanel.getAnchorPathPointAt(Number(app.activeDocument.width / 2), Number(app.activeDocument.height / 2));
};

ZMotePanel.prototype.getAnchorPathPointAt = function (xPos, yPos) {
    var pathPoint = new PathPointInfo();
    pathPoint.kind = PointKind.CORNERPOINT;
    pathPoint.anchor = [xPos, yPos];
    pathPoint.leftDirection = pathPoint.anchor;
    pathPoint.rightDirection = pathPoint.anchor;
    return pathPoint;
};

ZMotePanel.prototype.addOnePointPerspective = function () {
    var lineArray = [];
    var widthIncrement = Number(app.activeDocument.width)/20;
    var heightIncrement = Number(app.activeDocument.height)/20;

    for(var iWidth = 0; iWidth <= app.activeDocument.width; iWidth = iWidth + widthIncrement){
        lineArray.push(zMotePanel.getAnchorPathPointAt(iWidth,0));
        lineArray.push(zMotePanel.getCenterAnchorPathPoint());
        lineArray.push(zMotePanel.getAnchorPathPointAt(iWidth, Number(app.activeDocument.height)));
        lineArray.push(zMotePanel.getCenterAnchorPathPoint());
    }
    for(var iHeight = heightIncrement; iHeight <= app.activeDocument.height; iHeight = iHeight + heightIncrement){
        lineArray.push(zMotePanel.getAnchorPathPointAt(0,iHeight));
        lineArray.push(zMotePanel.getCenterAnchorPathPoint());
        lineArray.push(zMotePanel.getAnchorPathPointAt(Number(app.activeDocument.width),iHeight));
        lineArray.push(zMotePanel.getCenterAnchorPathPoint());
    }

// create a SubPathInfo object, which holds the line array in its entireSubPath property.
    var lineSubPathArray = [];
    lineSubPathArray.push(new SubPathInfo());
    lineSubPathArray[0].operation = ShapeOperation.SHAPEXOR;
    lineSubPathArray[0].closed = false;
    lineSubPathArray[0].entireSubPath = lineArray;

//create the path item, passing subpath to add method
    var myPathItem = app.activeDocument.pathItems.add("A Line", lineSubPathArray);

// stroke it so we can see something
    myPathItem.strokePath(ToolType.BRUSH);
    app.activeDocument.pathItems.removeAll();
};

var zMotePanel = new ZMotePanel();