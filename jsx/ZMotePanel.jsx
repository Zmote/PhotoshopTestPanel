function ZMotePanel() {}

ZMotePanel.prototype.addOnePointPerspective = function (options) {
    options = jsonUtility.parseOptions(options);
    pathUtility.pathMode = options.pathMode;
    if(pathUtility.pathMode && !options.hasOwnProperty("multiPoint")){
        pathUtility.pathPoint = pathUtility.calculateMedianOfPoints();
    }
    var doc = app.activeDocument;
    var myPathItem = doc.pathItems.add("", pathUtility.generatePerspectivePathsFromDisconnectedLines(options));
    doc.selection.deselect();
    if(options.strokePath){
        var layer = doc.artLayers.add();
        layer.name = "Perspective Grid";
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


ZMotePanel.prototype.addMultiPointPerspective = function (options) {
    options = jsonUtility.parseOptions(options);
    options.multiPoint = true;
    var originalPathMode = options.pathMode;
    options.pathMode = true;
    var pathItems = app.activeDocument.pathItems;
    if(pathItems.length > 0){
        try{
            var collectedPathPoints = pathUtility.collectPathPointsFromWorkingPath(pathItems);
            for(var z = 0; z < collectedPathPoints.length;z++){
                pathUtility.updatePathPoint(collectedPathPoints[z][0],collectedPathPoints[z][1]);
                zMotePanel.addOnePointPerspective(options);
            }
            pathUtility.pathMode = originalPathMode;
        }catch(ex){
            alert("Whoops, something went wrong: " + ex.message);
        }
    }else{
        alert("No path to work with, check that you have a path in Path Tab. This tool selects the" +
            "bottom most path in the Path's layer, which is usually the Work Path.");
    }
};

$.global.zMotePanel = new ZMotePanel();