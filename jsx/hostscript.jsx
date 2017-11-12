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

ZMotePanel.prototype.getAnchorPathPointAt = function (xPos, yPos) {
    var pathPoint = new PathPointInfo();
    pathPoint.kind = PointKind.CORNERPOINT;
    var resMultiplier = 72/ app.activeDocument.resolution;
    pathPoint.anchor = [xPos * resMultiplier, yPos * resMultiplier];
    pathPoint.leftDirection = pathPoint.anchor;
    pathPoint.rightDirection = pathPoint.anchor;
    return pathPoint;
};

ZMotePanel.prototype.getCenterAnchorPathPoint = function () {
    //init with Center of document for perspective center
    var xPos = Number(app.activeDocument.width / 2);
    var yPos = Number(app.activeDocument.height / 2);
    //if a selection is available, use this as new center
    try {
        var selectionBounds = app.activeDocument.selection.bounds;
        xPos = Number(selectionBounds[0]) + ((Number(selectionBounds[2]) - Number(selectionBounds[0])) / 2);
        yPos = Number(selectionBounds[1]) + ((Number(selectionBounds[3]) - Number(selectionBounds[1])) / 2);
    } catch (ex) {}
    return zMotePanel.getAnchorPathPointAt(xPos, yPos);
};

ZMotePanel.prototype.getPointFromCentralAnchor = function (anchorPoint, distance, angle) {
    var pathPoint = new PathPointInfo();
    pathPoint.kind = PointKind.CORNERPOINT;
    var xPos = anchorPoint.anchor[0] + (Math.sin(angle * Math.PI / 180) * distance);
    var yPos = anchorPoint.anchor[1] + (Math.cos(angle * Math.PI / 180) * -distance);
    pathPoint.anchor = [xPos, yPos];
    pathPoint.leftDirection = pathPoint.anchor;
    pathPoint.rightDirection = pathPoint.anchor;
    return pathPoint;
};

ZMotePanel.prototype.prepareLineForPerspective = function (distance, angle, eyeMargin) {
    var lineArray = [];
    var anchorPoint = zMotePanel.getCenterAnchorPathPoint();
    lineArray.push(zMotePanel.getPointFromCentralAnchor(anchorPoint, eyeMargin, angle));
    lineArray.push(zMotePanel.getPointFromCentralAnchor(anchorPoint, distance, angle));
    return lineArray;
};

ZMotePanel.prototype.generateSubPathFromDisconnectedLines = function (startAngle, stopAngle, density, distance, eyeMargin) {
    var invertedDensity = (stopAngle - startAngle) / density;
    var subPathArray = [];
    for (var iAngle = startAngle; iAngle <= stopAngle; iAngle = iAngle + invertedDensity) {
        var subPath = new SubPathInfo();
        subPath.operation = ShapeOperation.SHAPEXOR;
        subPath.closed = false;
        subPath.entireSubPath = zMotePanel.prepareLineForPerspective(distance, iAngle, eyeMargin);
        subPathArray.push(subPath);
    }
    return subPathArray;
};

//TODO: Extract calculations into own file
//TODO: Replace with parameter object
ZMotePanel.prototype.addOnePointPerspective = function (startAngle, stopAngle, density, distance, eyeMargin) {
    var doc = app.activeDocument;
    var resMultiplier = 72/ app.activeDocument.resolution;
    var myPathItem = doc.pathItems.add("Perspective", zMotePanel.generateSubPathFromDisconnectedLines(startAngle, stopAngle, density, distance *resMultiplier, eyeMargin * resMultiplier));
    doc.selection.deselect();
    var layer = doc.artLayers.add();
    layer.name = "Perspective Grid";
    myPathItem.strokePath(ToolType.BRUSH);
    app.activeDocument.pathItems.removeAll();
};

ZMotePanel.prototype.addTwoPointPerspective = function(density, distance){
    var selection = app.activeDocument.selection;
};

var zMotePanel = new ZMotePanel();