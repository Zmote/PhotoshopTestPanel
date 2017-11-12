function JSONUtility(){}

JSONUtility.prototype.parseOptions = function(options){
    options.density = +options.density;
    options.radius= +options.radius;
    options.eyeMargin = +options.eyeMargin;
    options.startAngle = +options.startAngle;
    options.stopAngle = +options.stopAngle;
    options.autoRemovePath = Boolean(options.autoRemovePath);
    options.strokePath = Boolean(options.strokePath);
    options.simulatePressure = Boolean(options.simulatePressure);
    options.pathMode = Boolean(options.pathMode);
    return options;
};

$.global.jsonUtility = new JSONUtility();