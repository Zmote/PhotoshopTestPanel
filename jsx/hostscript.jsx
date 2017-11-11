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
    //init with Center of document for perspective center
    var xPos = Number(app.activeDocument.width / 2);
    var yPos = Number(app.activeDocument.height / 2);
    //if a selection is available, use this as new center
    var selection = app.activeDocument.selection;
    var selBounds;
    try{
        selBounds = selection.bounds;
    }catch(ex){
        selBounds = false;
    }
    if(selBounds){
        xPos = Number(selection.bounds[0]) + ((Number(selection.bounds[2]) - Number(selection.bounds[0]))/2);
        yPos = Number(selection.bounds[1]) + ((Number(selection.bounds[3]) - Number(selection.bounds[1]))/2);
    }
    return zMotePanel.getAnchorPathPointAt(xPos, yPos);
};

ZMotePanel.prototype.getAnchorPathPointAt = function (xPos, yPos) {
    var pathPoint = new PathPointInfo();
    pathPoint.kind = PointKind.CORNERPOINT;
    pathPoint.anchor = [xPos, yPos];
    pathPoint.leftDirection = pathPoint.anchor;
    pathPoint.rightDirection = pathPoint.anchor;
    return pathPoint;
};

ZMotePanel.prototype.prepareLinesArrayForOnePointPerspective = function(horizontalLines, verticalLines){
    var lineArray = [];
    var widthIncrement = Number(app.activeDocument.width)/horizontalLines;
    var heightIncrement = Number(app.activeDocument.height)/verticalLines;

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
    return lineArray;
};

ZMotePanel.prototype.addOnePointPerspective = function () {
    var subPath = new SubPathInfo();
    subPath.operation = ShapeOperation.SHAPEXOR;
    subPath.closed = false;
    subPath.entireSubPath = zMotePanel.prepareLinesArrayForOnePointPerspective(10,10);

    var myPathItem = app.activeDocument.pathItems.add("Perspective", [subPath]);
    app.activeDocument.selection.deselect();
    myPathItem.strokePath(ToolType.BRUSH);
    app.activeDocument.pathItems.removeAll();
};

var zMotePanel = new ZMotePanel();