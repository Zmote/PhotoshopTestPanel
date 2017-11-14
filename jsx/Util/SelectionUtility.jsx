function SelectionUtility(){}

SelectionUtility.prototype.makeSelection = function(x,y,sw,sh){
    app.activeDocument.selection.select([ [x,y], [x,y+sh], [x+sw,y+sh], [x+sw,y] ]);
};

$.global.selectionUtil = new SelectionUtility();