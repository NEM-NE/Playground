# 소마 시험 대비 Web 정리

## HTML DOM

```js
//finding HTML el

document.querySelector("~~~");
document.getElementById(id);
document.getElementsByTagName(tagname);
document.getElementsByClassName(className);

//changing HTML el
const el = document.querySelector(~~);

el.innerHTML = "change inner HTML";
el.attribute = ?
el.style.backgroundColor = "red";
el.setAttribute(key, value);

// adding and deleting elements
const el = document.createElement("div");
document.removeChild(el);
document.appendChild(el);
document.replaceChild(new, old);
document.wirte(text);

// add event handlers
el.onClick = function(){};

```

### DOM Forms

```js
<form name="myForm" action="/action_page.php" onsubmit="return validateForm()" method="post">
Name: <input type="text" name="fname">
<input type="submit" value="Submit">
</form>

function validateForm() {
  let x = document.forms["myForm"]["fname"].value; // document.forms를 통해 접근 가능
  if (x == "") {
    alert("Name must be filled out");
    return false;
  }
}

```

### DOM Animations

```js
function myMove() {
  let id = null;
  const elem = document.getElementById("animate");
  let pos = 0;
  clearInterval(id);
  id = setInterval(frame, 5);
  function frame() {
    if (pos == 350) {
      clearInterval(id);
    } else {
      pos++;
      elem.style.top = pos + "px";
      elem.style.left = pos + "px";
    }
  }
}
```

### DOM Event Listener

```js
// 이벤트 추가하기
const el = document.querySelector("~~~");

el.addEventListener("click", eventHandler, false); // 마지막 매개변수는 이벤트 캡쳐링 여부, 기본값으로는 false이다.

function eventHandler(e) {
  e.stopPropagation(); // 이벤트 버블링 중단
}

el.removeEventListener("click", eventHandler);
```

## Browser BOM

```js

window.innerWidth;
window.innerHeight;
window.open();
window.close();
window.moveTo();
window.resizeTo();

screen.width;
screen.height;
screen.availWidth;
screen.availHeight;

window.location.href returns the href (URL) of the current page
window.location.hostname returns the domain name of the web host
window.location.pathname returns the path and filename of the current page
window.location.protocol returns the web protocol used (http: or https:)
window.location.assign() loads a new document

history.back() - same as clicking back in the browser
history.forward() - same as clicking forward in the browser

navigator.appName
navigator.appCodeName
navigator.platform


document.cookie = "username=John Doe";
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}


```

## Web APIs

### Web Storage API

```js
localStorage.setItem(key, value);
localStorage.getItem(key);
```

## JS Canvas

```js
const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");

context.beginPath();
context.moveTo(GRAPH_LEFT, GRAPH_BOTTOM);
context.lineTo(GRAPH_RIGHT, GRAPH_BOTTOM);
context.lineTo(GRAPH_RIGHT, GRAPH_TOP);
context.lineTo(GRAPH_LEFT, GRAPH_TOP);
context.lineTo(GRAPH_LEFT, GRAPH_BOTTOM);
context.stroke();

ctx.beginPath();
ctx.ellipse(x, y, 3, 3, 0, 0, Math.PI * 2);
ctx.fill();
```
