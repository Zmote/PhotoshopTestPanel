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
    try {
        selBounds = selection.bounds;
    } catch (ex) {
        selBounds = false;
    }
    if (selBounds) {
        xPos = Number(selection.bounds[0]) + ((Number(selection.bounds[2]) - Number(selection.bounds[0])) / 2);
        yPos = Number(selection.bounds[1]) + ((Number(selection.bounds[3]) - Number(selection.bounds[1])) / 2);
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

ZMotePanel.prototype.getPointFromCentralAnchor = function (anchorPoint, distance, angle) {
    var pathPoint = new PathPointInfo();
    pathPoint.kind = PointKind.CORNERPOINT;
    var xPos = anchorPoint.anchor[0] + (Math.sin(angle * Math.PI / 180) * distance);
    var yPos = anchorPoint.anchor[1] + (Math.cos(angle * Math.PI / 180) * distance);
    pathPoint.anchor = [xPos, yPos];
    pathPoint.leftDirection = pathPoint.anchor;
    pathPoint.rightDirection = pathPoint.anchor;
    return pathPoint;
};

ZMotePanel.prototype.prepareLineForPerspective = function (distance, angle) {
    var lineArray = [];
    var anchorPoint = zMotePanel.getCenterAnchorPathPoint();
    lineArray.push(anchorPoint);
    lineArray.push(zMotePanel.getPointFromCentralAnchor(anchorPoint, distance, angle));
    return lineArray;
};

ZMotePanel.prototype.generateSubPathFromDisconnectedLines = function (density, distance) {
    var invertedDensity = 360 / density;
    var subPathArray = [];
    for (var iAngle = 0; iAngle < 360; iAngle = iAngle + invertedDensity) {
        var subPath = new SubPathInfo();
        subPath.operation = ShapeOperation.SHAPEXOR;
        subPath.closed = false;
        subPath.entireSubPath = zMotePanel.prepareLineForPerspective(distance, iAngle);
        subPathArray.push(subPath);
    }
    return subPathArray;
};

ZMotePanel.prototype.addOnePointPerspective = function (density, distance) {
    var myPathItem = app.activeDocument.pathItems.add("Perspective", zMotePanel.generateSubPathFromDisconnectedLines(density, distance));
    app.activeDocument.selection.deselect();
    myPathItem.strokePath(ToolType.BRUSH);
    app.activeDocument.pathItems.removeAll();
};

ZMotePanel.prototype.addTwoPointPerspective = function(density, distance){
    var selection = app.activeDocument.selection;
};

var zMotePanel = new ZMotePanel();