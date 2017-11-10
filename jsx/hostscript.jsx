function sayHello(){
    alert("hello from ExtendScript");
}

function addNewLayer(name){
    var newLayer = app.activeDocument.artLayers.add();
    if(name){
        newLayer.name = name;
    }
}