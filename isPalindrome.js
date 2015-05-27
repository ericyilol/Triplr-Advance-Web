var isPalindrome = function() {
    var x = 11;
    if (x < 0){
        return false;
    }
    while (x >= 10) {
        var div = 1;
        while (x / div > 0) {
            div *= 10;
        }
        div /= 10;
        if (x/10 != x/div) {
            return false
        }
        console.log(div);
        x -= x/10;
        x -= x/div;
    }
    return true;
};