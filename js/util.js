function shallow(d) {
    let ret = {}
    for (let attr in d)
        ret[attr] = d[attr]
    return ret
}

function isstr(v) {
    return (typeof(v) == 'string') ||
        (typeof(v) == 'object' && v instanceof String); 
}

function convert_float0_1_to_hex00_FF(num)
{
    //convert a single floating point value in the 0 to 1 range
    //to a single hex string in the 00 to FF range
    if (num <= 0.)
    {
        return "00";
    }
    if (num >= 1.)
    {
        return "FF";
    }
    var ret = Number(Math.floor(num*255)).toString(16).toUpperCase()
    if (ret.length < 2)
    {
        ret = "0" + ret;
    }
    return ret;
}

function rgb01_str(r,g,b)
{
    const res = convert_float0_1_to_hex00_FF(r) +
                convert_float0_1_to_hex00_FF(g) +
                convert_float0_1_to_hex00_FF(b);
    return "#"+res;
};
  
function rgba01_str(r,g,b,a,override_a)
{
    a = (a === undefined) ? 1 : a;
    if (override_a !== undefined)
        a = override_a;
    //convert rgba values in the 0 to 1 range to a hex string like #FF00AA80
    const res = convert_float0_1_to_hex00_FF(r) +
                convert_float0_1_to_hex00_FF(g) +
                convert_float0_1_to_hex00_FF(b) +
                convert_float0_1_to_hex00_FF(a)
    return "#"+res;
};

export {shallow, isstr, rgb01_str, rgba01_str};
