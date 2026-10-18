function absMe(...numbers) {

    var result = [];

    for (var i = 0; i < numbers.length; i++) {

        if (numbers[i] < 0) {
            result.push(numbers[i] * -1);
        } else {
            result.push(numbers[i]);
        }
    }

    if (result.length == 1) {
        return result[0];
    }

    return result;
}


function ceilMe(...numbers) {

    var result = [];

    for (var i = 0; i < numbers.length; i++) {
        result.push(Math.ceil(numbers[i]));
    }

    if (result.length == 1) {
        return result[0];
    }

    return result;
}


function floorMe(...numbers) {

    var result = [];

    for (var i = 0; i < numbers.length; i++) {
        result.push(Math.floor(numbers[i]));
    }

    if (result.length == 1) {
        return result[0];
    }

    return result;
}


console.log("Absolute:", absMe(-5));
console.log("Absolute:", absMe(-5, 4, -7));

console.log("Ceil:", ceilMe(4.2));
console.log("Ceil:", ceilMe(4.2, 5.8));

console.log("Floor:", floorMe(4.7));
console.log("Floor:", floorMe(4.7, 5.9));