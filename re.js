try {
    document.querySelector('[class*=\"simple_layout__close\"]').click();
} catch (e) {}
try {
    document.querySelector('[class*=\"agreement_agree\"]').click();
} catch (e) {}
try {
    if (document.querySelector('h1').innerText.includes('Service interruption')) {
        document.querySelector('[class*=\"button_pink\"]').click();
    }
} catch (e) {}
try {
    document.querySelector('[class*=\"switch_button--off\"]').click();
} catch (e) {}

function ip() {
    var http = new XMLHttpRequest();
    http.open('GET', 'https://ipaddress.sh/', !1);
    http.send();
    return http.responseText.includes('181.102')
}

setInterval(async()=>{
    if (ip()) {
        document.querySelector('[class*=\"play_button\"]').click();
    }
}
, 1000)
