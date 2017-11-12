/**
 * Created by Zmote on 12.11.2017.
 */
function PathUtility(){
    this.baseMultiplier = 72;
    this.pathMode = false;
    this.pathPoint = {x: 0, y: 0};
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
    if(!pathUtility.pathMode){
        //if a selection is available, use this as new center
        try {
            var selectionBounds = app.activeDocument.selection.bounds;
            xPos = Number(selectionBounds[0]) + ((Number(selectionBounds[2]) - Number(selectionBounds[0])) / 2);
            yPos = Number(selectionBounds[1]) + ((Number(selectionBounds[3]) - Number(selectionBounds[1])) / 2);
        } catch (ex) {
        }
    }else{
        xPos = pathUtility.pathPoint.x;
        yPos = pathUtility.pathPoint.y;
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
    var distance = options.radius * pathUtility.resMultiplier();
    var eyeMargin = options.eyeMargin * pathUtility.resMultiplier();
    var subPathArray = [];
    for (var iAngle = options.startAngle; iAngle <= options.stopAngle; iAngle = iAngle + invertedDensity) {
        var subPath = new SubPathInfo();
        subPath.operation = ShapeOperation.SHAPEXOR;
        subPath.closed = false;
        subPath.entireSubPath = pathUtility.prepareLineForPerspective(distance, iAngle, eyeMargin);
        subPathArray.push(subPath);
    }
    return subPathArray;
};

PathUtility.prototype.updatePathPoint = function(pX, pY){
  this.pathPoint.x = pX;
  this.pathPoint.y = pY;
};

PathUtility.prototype.resetPathPoint = function(){
  this.pathPoint.x = 0;
  this.pathPoint.y = 0;
};

PathUtility.prototype.calculateMedianOfPoints = function(){
    try{
        var collectedPathPoints = pathUtility.collectPathPointsFromWorkingPath(app.activeDocument.pathItems);
        var finalPoint = {x:0, y:0};
        for(var i = 0; i < collectedPathPoints.length;i++){
            finalPoint.x += collectedPathPoints[i][0];
            finalPoint.y += collectedPathPoints[i][1];
        }
        finalPoint.x = finalPoint.x / collectedPathPoints.length;
        finalPoint.y = finalPoint.y / collectedPathPoints.length;
        return finalPoint;
    }catch(ex){
        alert("Whoops, something went wrong: " + ex.message);
    }
};

PathUtility.prototype.collectPathPointsFromWorkingPath = function(pathItems){
    var collectedPathPoints = [];
    var pathItem = pathUtility.getWorkPath(pathItems);
    for(var i = 0; i < pathItem.subPathItems.length;i++){
        var subPathItem = pathItem.subPathItems[i];
        for(var j = 0; j < subPathItem.pathPoints.length; j++){
            var pathPoint = subPathItem.pathPoints[j];
            collectedPathPoints.push(pathPoint.anchor);
        }
    }
    pathItem.remove();
    return collectedPathPoints;
};

PathUtility.prototype.getWorkPath = function(pathItems){
    for(var i = 0; i < pathItems.length; i++){
        if(pathItems[i].kind.toString() === "PathKind.WORKPATH"){
            return pathItems[i];
        }
    }
    if(pathItems.length > 0){
        return pathItems[pathItems.length-1];
    }else{
        throw new Error("Could not find a Work Path or another Path to work with");
    }
};

$.global.pathUtility = new PathUtility();