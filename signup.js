/* jslint browser: true */
/* global window document location */

let lastTime
let counter = 0
let clickOnPlayTries = 0
let clearBrowserData = 0

document.body.style.zoom = '30%'
document.body.style.marginTop = '70px'
document.body.style.height = 'calc(100% - 70px)'

function somethingWentWrong() {
  try {
    document.body.innerHTML.match(new RegExp(/502 bad gateway/i)) && location.reload(true);
  } catch (e) {/* no match */
  }
  // try {
  //   document.querySelector('.main-view-container').innerHTML.match(new RegExp(/went wrong|not load|error/gi)) && location.reload(true);
  // } catch (e) {/* no match */
  // }
  // try {
  //   document.querySelector('body > pre').innerHTML.includes('connection failure') && location.reload(true);
  // } catch (e) {/* no match */
  // }
  // try {
  //   document.body.innerText.match(new RegExp(/Page not found/gi)) && location.reload(true);
  // } catch (e) {/* no match */
  // }
}


function checkLogin() {
  let loginButton = document.querySelector('[data-testid=\'login-button\']')
  loginButton !== null && loginButton.click()
}

function removeDialog() {
  document.querySelectorAll('[class*=\'overlay\']').forEach(function(i) {
    if (i.firstChild.ariaLabel.includes('In-App Message Modal')) {
      i.parentElement.remove()
    }
  })
}
function setPlaylist() {
  if (document.querySelector('[aria-live=\'polite\']') === null) {
    if (!document.URL.includes('/playlist')) {
      document.querySelector('[href=\'/collection\']').click()
    } else if (document.URL.includes('/playlists')) {
      let user = document.querySelector('[data-testid=\'user-widget-link\']').firstChild.title
      let grid = document.querySelector('[data-testid=\'grid-container\']')
      for (let i = 1; i < grid.childElementCount; i++) {
        let el = grid.children[i]
        if (el.innerHTML.includes(user) && el.innerHTML.includes('src="https://mosaic')) {
          el.querySelector('a').click()
          break
        }
      }
    }
    if (document.URL.match(new RegExp(/playlist\/[A-Za-z0-9a-z]+/)) !== null) {
      let meta = ['[data-testid=\'creator-link\']', '[data-testid=\'user-widget-link\']', 'h1'].map(e=>document.querySelector(e))
      let check = meta.every(function(value) {
        return value === null;
      });

      try {
        var gridRows = parseInt(document.querySelector('[role="grid"]').ariaRowCount)
      } catch (e) {
        var gridRows = 0;
      }
      if (check === false && gridRows > 0) {
        let creator = meta[0].innerText === meta[1].firstChild.title
        let name = meta[2].innerText.includes('Benjamin Westgard')
        let anyBW = Array.prototype.slice.call(document.querySelectorAll('[data-testid="tracklist-row"]')).some((i=>i.querySelector('[href*=\'artist\']').textContent.includes('Benjamin Westgard')))
        let play = document.querySelector('[data-testid=\'playlist-page\']').querySelector('[data-testid=\'play-button\']')

        if ((creator === true || name === true) && play !== null) {
          //play.ariaLabel.includes('Play') && play.click()
        } else {
          document.querySelector('[href=\'/collection\']').click()
        }
      }
      return
    }
  }
}

//  }
//  window.setTimeout(()=>{

//  }, 1000)

function alreadyAdded() {
  let msg = document.querySelector('[aria-label=\'Already added\']')
  if (msg !== null) {
    msg.querySelectorAll('button')[1].click()
  }
}

function config() {
  const config = document.querySelector('#config')
  const record = JSON.parse(config.innerHTML)
  const userCountry = record.userCountry
  const market = record.market
  return '(' + userCountry + String(market.includes(userCountry) ? '' : ', ' + market) + ')'
}

async function ipAddress() {
  const http = new window.XMLHttpRequest()
  return new Promise((resolve,reject)=>{
    http.open('GET', 'https://ipaddress.sh/', false)
    http.send()
    resolve(http.responseText.replace('\n', ''));
  }
);
}

function skipForward() {
  document.querySelector('[data-testid=\'control-button-skip-forward\']').click()
}

function clickNext() {
  let artist = document.querySelector('[data-testid=\'context-item-info-artist\']')
  let progress = document.querySelector('[data-testid=\'playback-progressbar\']')
  let position = document.querySelector('[data-testid=\'playback-position\']')
  let elapsed = parseInt(position.innerText.match(/[0-9]{2}$/)[0])
  if (elapsed > 30 && !artist.innerHTML.includes('Benjamin Westgard')) {
    let t = parseFloat(progress.children[1].style.cssText.match(/[0-9.]+/)[0])
    let r = Math.random() * (80 - 50) + 50;
    (t >= r) && skipForward()
  }
}

function probPlaybackProgress() {
  let playbackElement = document.querySelector('[data-testid=\'playback-position\']')
  if (playbackElement !== null) {
    const repeat = document.querySelector('[data-testid=\'control-button-repeat\']')
    const shuffle = document.querySelector('[data-testid=\'control-button-shuffle\']')
    !repeat.ariaLabel.includes('Enable repeat one') && repeat.click()
    !shuffle.ariaLabel.includes('Disable shuffle') && shuffle.click()
    return playbackElement.innerHTML
  }
}

async function checkConnection() {
  try {
    await window.fetch('https://google.com', {
      mode: 'no-cors'
    })
    return true
  } catch {
    return false
  }
}

function showStatus(status, bgColour) {
  const statusElement = document.querySelector('[id=\'endless\']')
  if (!statusElement) {
    const div = document.createElement('div')
    div.style.width = '100%'
    div.style.height = '65px'
    div.style.background = bgColour
    div.style.color = 'white'
    div.style.display = 'block'
    div.style.zIndex = 999999999
    div.style.position = 'absolute'
    div.style.textAlign = 'center'
    div.style.top = '0px'
    div.style.fontSize = '45px'
    div.style.fontFamily = 'monospace'
    div.id = 'endless'
    document.body.appendChild(div)
  }
  statusElement.innerHTML = `<div id="endless" style="background: ${bgColour}">${status}</div>`
}

function clickOnPlay() {
  const node = document.querySelector('[data-testid=\'play-button\']') || document.evaluate('/html/body/div[4]/div/div[2]/div[2]/footer/div/div[2]/div/div[1]/div[2]/button[1]', document, null, window.XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
  document.URL.includes('/playlist/') && node.click()
  node === null && location.reload(true)
}

function acceptCookies() {
  try {
    const cookies = document.querySelector('[id=\'onetrust-accept-btn-handler\']')
    cookies.innerText.toLowerCase().includes('cookies') && cookies.click()
  } catch (e) {// try {
    //   document.querySelector('[aria-label=\'Privacy\']').parentElement.querySelector('button').click()
    // } catch (e) {
    //   /* nothing to see */
    // }
  }
}

if (document.URL.includes('ipunblock.com')) {
  window.setInterval(async()=>{
    if (document.querySelectorAll('[class*=\'disconnect selected\']').length) {
      const flags = []
      document.querySelectorAll('img').forEach((f)=>f.getAttribute('src').match('uni|fr|ca|net|spa|nor|hong|por|aus') ? flags.push(f.parentNode) : null)
      flags[Math.floor(Math.random() * flags.length)].click()
    }
    document.querySelectorAll('div').forEach((a)=>a.getAttributeNames().forEach((b)=>a.querySelectorAll('[' + b + ']').forEach((c)=>c.getAttributeNames().forEach((d)=>c.querySelectorAll('[' + d + ']').forEach((e)=>{
      const f = e.innerHTML.toLowerCase()
      if (f.includes('adver') || f.includes('adpage') || f.includes('google') || f.includes('ads')) {
        e.parentElement.remove()
      }
    }
  )))))

  const g = document.querySelector('#servers').children[3].children[0]
  !g.childElementCount && g.remove()
  document.querySelector('h1').remove()
}
, 1000)
} else if (document.URL.includes('open.spotify.com')) {

  window.setInterval(async()=>{
    var readyStateCheckInterval = setInterval(function() {
      if (document.readyState === "complete") {
        clearInterval(readyStateCheckInterval);
      }
    }, 500);

    let ip = await ipAddress();
    let currentTime = probPlaybackProgress()

    if (currentTime) {
      try {
        if (currentTime === lastTime) {
          counter += 1
        } else {
          lastTime = currentTime
          clickOnPlayTries = 0
          counter = 0
        }
      } catch (e) {/* nothing here */
      }
      somethingWentWrong()
      acceptCookies()
      // alreadyAdded()
      removeDialog()
      checkLogin()
      setPlaylist()

      try {
        let colour = ip === '80.112.181.102' ? 'red' : 'green'
        showStatus(counter === 0 ? `${ip} ${config()}` : `paused (${counter}), tries: ${clickOnPlayTries}`, colour)
      } catch (e) {
        showStatus(counter === 0 ? `playing ${config()}` : `paused (${counter}), tries: ${clickOnPlayTries}`, 'blue')
      }

      clickNext()

      if (counter > 3) {
        clickOnPlay()
        counter = 0
        clickOnPlayTries += 1
      }

      if (counter > 5) {
        skipForward()
        counter = 0
        clickOnPlayTries += 1
      }

      if (clickOnPlayTries >= 10) {
        const isConnected = await checkConnection()
        if (isConnected) {
          location.reload(true)
        } else {
          location.reload(true)
        }
      }

      if (counter > 20) {
        location.reload(true)
      }
    }
  }
  , 1000)
}

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
