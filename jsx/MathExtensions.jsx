Math.clamp = function (value, min, max) {
    if (value <= min) {
        return min;
    } else if (value >= max) {
        return max;
    } else {
        return value;
    }
};

Math.generateRange = function (start, end, accumulator, easing, timeout) {
    var numbers = [];
    var index = 1;
    var startValue = Math.min(start, end);
    var endValue = Math.max(start, end);
    var value = start;
    numbers.push(start);
    try {
        value = accumulator(value, index, easing);
    } catch (ex) {
        console.log("accumulator needs to be a function of type 'function(value,index, easing){...}'");
        return;
    }
    var breakTime = Date.now() + (timeout ? timeout : 1000);
    while (value >= startValue && value <= endValue) {
        index++;
        numbers.push(value);
        value = accumulator(value, index, easing);
        if (Date.now() >= breakTime) {
            console.log("Function timed out, check your accumulator function");
            return;
        }
    }
    numbers.push(end);
    return numbers;
};