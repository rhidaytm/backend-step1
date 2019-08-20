module.exports.keys = req => {
    if (req == 'keysstatic') {
        return true;
    }else {
        return false;
    }
}