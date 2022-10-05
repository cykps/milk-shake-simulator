const score = document.querySelector('#score');
const circle = document.querySelector('#circle');
const ctrler = document.querySelector('#ctrler');
const honyubin = document.querySelector('img');
const ctrlerSize = window.getComputedStyle(ctrler).getPropertyValue("height").slice(0,-2);
const circleSize = window.getComputedStyle(circle).getPropertyValue("height").slice(0,-2);
const k = (ctrlerSize - circleSize) / 2;
let a,b,c,d,point;
    a = b = c = d = point = 0;
console.log(honyubin);

function start() {
  // alert("button");
  // モーションセンサーが有効か？
  if (window.DeviceOrientationEvent) {
    // ★iOS13向け: ユーザーにアクセスの許可を求める関数があるか？
    if (DeviceOrientationEvent.requestPermission) {
      // ★モーションセンサーのアクセス許可をリクエストする
      DeviceOrientationEvent.requestPermission()
        .then(function (response) {
          // リクエストが許可されたら
          if (response === "granted") {
            // deviceorientationが有効化される
            alert("🍼モーションセンサーがONです🎉");
          }
        })
        .catch((e) => {
          console.log(e);
        });
      // iOS13以外
    } else {
      alert('🍼設定から"モーションセンサー"をONにしてください👶');
    }
  } else {
    alert("🍼モーションセンサーが使えないかも...👶");
  }
}

window.addEventListener("devicemotion", (e) => {
  let xy = keisanSikaku(e);
  circle.style.left = xy[0] + "px";
  circle.style.top = xy[1] + "px";
}, false);

function keisan(e) {
  let mx = kirisute(e.acceleration.x * 10),
      my = kirisute(e.acceleration.y * 10);
  console.log("moved" + e.acceleration.x);

  if (mx==0 || my==0) {
    let tmp = (ctrlerSize - circleSize) / 2;
    return [tmp,tmp];
  }

  let k = (ctrlerSize - circleSize) / 2,
      x = k, y = k,
      c = Math.sqrt(mx^2 + my^2)
      r = circleSize/2;
  
  x += mx * r / c;
  y += my * r / c;
  //alert(mx);
  return[x,y];
}

function keisanSikaku(e) {
  let my = e.acceleration.x * -10,
      mx = e.acceleration.y * -10,
      wa = Math.abs(mx) + Math.abs(my);

  if (wa < 20) {
    return [k, k];
  }

  let x = k, y = k;
  x += mx / wa * k;
  y += my / wa * k;

  if (mx<5) {
    if (my<0) {
      a=1;
    } else {
      b=1;
    }
  } else {
    if (my<0) {
      c=1;
    } else {
      d=1;
    }
  }

  if (a==1 && b==1 && c==1 && d==1) {
    point += 1;
    score.innerHTML=point;
    a = b = c = d = 0;
  }
  if (point > 31) {
    alert("🍼クリア~~🎉")
    point = 0
    score.innerHTML=point;
  }
  honyubin.style.transform = "rotateZ(" + kirisute(mx) / wa *　40 + "deg)";
  
  return [x,y];
}

function kirisute(n) {
  if (n<10 && -10<n) { //n<10 && -10<n
    return 0;
  }
  return n;
}


//参考にさせてもらったサイト - https://blog.ikunaga.net/entry/ios-safari-motion-sensor-not-working/
