function JSONUtility(){}

JSONUtility.prototype.parseOptions = function(options){
    options.density = +options.density;
    options.radius= +options.radius * pathUtility.resMultiplier();
    options.eyeMargin = +options.eyeMargin * pathUtility.resMultiplier();
    options.startAngle = +options.startAngle;
    options.stopAngle = +options.stopAngle;
    options.autoRemovePath = Boolean(options.autoRemovePath);
    options.strokePath = Boolean(options.strokePath);
    options.simulatePressure = Boolean(options.simulatePressure);
    return options;
};

$.global.jsonUtility = new JSONUtility();