/**
 * Created by Zmote on 12.11.2017.
 */
function PathUtility(){
    this.baseMultiplier = 72;
}

PathUtility.prototype.resMultiplier = function(){
    return pathUtility.baseMultiplier/app.activeDocument.resolution;
};

PathUtility.prototype.getAnchorPathPointAt = function (xPos, yPos) {
    var pathPoint = new PathPointInfo();
    pathPoint.kind = PointKind.CORNERPOINT;
    pathPoint.anchor = [xPos * pathUtility.resMultiplier(), yPos * pathUtility.resMultiplier()];
    pathPoint.leftDirection = pathPoint.anchor;
    pathPoint.rightDirection = pathPoint.anchor;
    return pathPoint;
};

PathUtility.prototype.getCenterAnchorPathPoint = function () {
    //init with Center of document for perspective center
    var xPos = Number(app.activeDocument.width / 2);
    var yPos = Number(app.activeDocument.height / 2);
    //if a selection is available, use this as new center
    try {
        var selectionBounds = app.activeDocument.selection.bounds;
        xPos = Number(selectionBounds[0]) + ((Number(selectionBounds[2]) - Number(selectionBounds[0])) / 2);
        yPos = Number(selectionBounds[1]) + ((Number(selectionBounds[3]) - Number(selectionBounds[1])) / 2);
    } catch (ex) {
    }
    return pathUtility.getAnchorPathPointAt(xPos, yPos);
};

PathUtility.prototype.getPointFromCentralAnchor = function (anchorPoint, distance, angle) {
    var pathPoint = new PathPointInfo();
    pathPoint.kind = PointKind.CORNERPOINT;
    var xPos = anchorPoint.anchor[0] + (Math.sin(angle * Math.PI / 180) * distance);
    var yPos = anchorPoint.anchor[1] + (Math.cos(angle * Math.PI / 180) * -distance);
    pathPoint.anchor = [xPos, yPos];
    pathPoint.leftDirection = pathPoint.anchor;
    pathPoint.rightDirection = pathPoint.anchor;
    return pathPoint;
};

PathUtility.prototype.prepareLineForPerspective = function (distance, angle, eyeMargin) {
    var lineArray = [];
    var anchorPoint = pathUtility.getCenterAnchorPathPoint();
    lineArray.push(pathUtility.getPointFromCentralAnchor(anchorPoint, eyeMargin, angle));
    lineArray.push(pathUtility.getPointFromCentralAnchor(anchorPoint, distance, angle));
    return lineArray;
};

PathUtility.prototype.generateSubPathFromDisconnectedLines = function (options) {
    var invertedDensity = (options.stopAngle - options.startAngle) / options.density;
    var subPathArray = [];
    for (var iAngle = options.startAngle; iAngle <= options.stopAngle; iAngle = iAngle + invertedDensity) {
        var subPath = new SubPathInfo();
        subPath.operation = ShapeOperation.SHAPEXOR;
        subPath.closed = false;
        subPath.entireSubPath = pathUtility.prepareLineForPerspective(options.radius, iAngle, options.eyeMargin);
        subPathArray.push(subPath);
    }
    return subPathArray;
};

$.global.pathUtility = new PathUtility();