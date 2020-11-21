function getRandom(min, max, length, sum) {
    return Array.from(
        { length },
        (_, i) => {
            var smin = (length - i - 1) * min,
                smax = (length - i - 1) * max,
                offset = Math.max(sum - smax, min),
                random = 1 + Math.min(sum - offset, max - offset, sum - smin - min),
                value = Math.floor(Math.random() * random + offset);

            sum -= value;
            return value;
        }
    );
}
module.exports = getRandom;