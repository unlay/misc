function getName(first) {
    var url = 'https://raw.githubusercontent.com/dominictarr/random-name/master/names.txt';
    first && (url = url.replace('names.txt', 'first-names.txt'));
    var http = new XMLHttpRequest();
    http.open('GET', url, false);
    http.send();
    var ls = http.responseText.split('\n');
    return ls[Math.floor(Math.random() * ls.length)].replace('\r', '')
}

function setInputValue(id, val) {
    var x = document.querySelector('[id*=' + id + ']')
    x.focus();
    if (x.type === 'select-one') {
        x.selectedIndex = val
    } else {
        x.value = val
    }
    try {
        x.onChange({
            target: {
                value: val
            }
        });
        x.blur();
    } catch (error) {/*nothing to do*/
    }
    try {
        x.onKeyDown({
            target: {
                value: val
            }
        });
        x.blur();
    } catch (error) {/*nothing to do*/
    }
    try {
        x.onKeyUp({
            target: {
                value: val
            }
        });
        x.blur();
    } catch (error) {/*nothing to do*/
    }
    try {
        x.onMouseEnter({
            target: {
                value: val
            }
        });
        x.blur();
    } catch (error) {/*nothing to do*/
    }
    Object.keys(x).filter((i=>i.includes('_react'))).forEach(function(key) {
        if (x.type === 'select-one') {
            x[key].selectedIndex = val
        } else {
            x[key].value = val
        }
        try {
            x[key].onChange({
                target: {
                    value: val
                }
            });
            x[key].blur();
        } catch (error) {/*nothing to do*/
        }
        try {
            x[key].onKeyDown({
                target: {
                    value: val
                }
            });
            x[key].blur();
        } catch (error) {/*nothing to do*/
        }
        try {
            x[key].onKeyUp({
                target: {
                    value: val
                }
            });
            x[key].blur();
        } catch (error) {/*nothing to do*/
        }
        try {
            x[key].onMouseEnter({
                target: {
                    value: val
                }
            });
            x[key].blur();
        } catch (error) {/*nothing to do*/
        }
    })
}

try {
    document.querySelector('[id*=\'accept-recommended\']').click()
} catch (error) {
}
var domains = ['nd4.us', 'iva.pw', 'rawmail.xyz', 'orb.pw'];
var domain = domains[Math.floor(Math.random() * domains.length)];
var name = [getName(true), getName(false)];
var randomDay = (parseInt(Math.random() * (28 - 1) + 1)).toString();
var randomMonth = parseInt(Math.random() * (12 - 1) + 1);
var randomYear = parseInt(Math.random() * (1970 - 2003) + 2003);
var password = "zVXHTppvm2v2ppH"
var email = name.replace(',', '') + '_' + randomYear + '@' + domain;

var displayname = name.replace(',', ' ')

setInputValue('email', email)
var a = 0
var interval = setInterval(function() {
    if (a < 3) {
        a++;
    } else {
        clearInterval(interval);
    }
}, 200)
setInputValue('confirm', email)
var a = 0
var interval = setInterval(function() {
    if (a < 3) {
        a++;
    } else {
        clearInterval(interval);
    }
}, 200)
setInputValue('password', password)
var a = 0
var interval = setInterval(function() {
    if (a < 3) {
        a++;
    } else {
        clearInterval(interval);
    }
}, 200)
var a = 0
var interval = setInterval(function() {
    if (a < 3) {
        a++;
    } else {
        clearInterval(interval);
    }
}, 200)
setInputValue('displayname', displayname)
var a = 0
var interval = setInterval(function() {
    if (a < 3) {
        a++;
    } else {
        clearInterval(interval);
    }
}, 200)
setInputValue('day', randomDay)
var a = 0
var interval = setInterval(function() {
    if (a < 3) {
        a++;
    } else {
        clearInterval(interval);
    }
}, 200)
setInputValue('month', randomMonth)
var a = 0
var interval = setInterval(function() {
    if (a < 3) {
        a++;
    } else {
        clearInterval(interval);
    }
}, 200)
setInputValue('year', randomYear)
var a = 0
var interval = setInterval(function() {
    if (a < 3) {
        a++;
    } else {
        clearInterval(interval);
    }
}, 200)
if (parseInt(Math.random() * 2) ? true : false) {
    document.getElementById('gender_option_male').click()
} else {
    document.getElementById('gender_option_female').click()
}
var a = 0
var interval = setInterval(function() {
    if (a < 3) {
        a++;
    } else {
        clearInterval(interval);
    }
}, 200)
document.forms[0].querySelectorAll('input[type="checkbox"]').forEach(function(i) {
    !i.checked && i.click()
})
var a = 0
var interval = setInterval(function() {
    if (a < 3) {
        a++;
    } else {
        clearInterval(interval);
    }
}, 200)

document.querySelector('button[type=\'submit\']').click()
