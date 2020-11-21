function confirmLevel(num) {
    if (num >= -5 && num < 0) {
        return 1;
    }
    if (num >= 0 && num < 5) {
        return 2;
    }
    if (num >= 5 && num < 10) {
        return 3;
    }
    if (num >= 10 && num < 15) {
        return 4;
    }
    if (num >= 15 && num <= 20) {
        return 5;
    }
}
module.exports = confirmLevel;