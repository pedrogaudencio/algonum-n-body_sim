
function mergeBodies(a, b) {
  let mass = a.m + b.m;
  let x = (a.x * a.m + b.x * b.m) / mass;
  let y = (a.y * a.m + b.y * b.m) / mass;
  let vx = (a.vx * a.m + b.vx * b.m) / mass;
  let vy = (a.vy * a.m + b.vy * b.m) / mass;
  let color = a.m > b.m ? a.color : b.color;
  bodies.push(new Body(mass, x, y, vx, vy, color));
}

function distance(body, other) {
  let dx = other.x - body.x;
  let dy = other.y - body.y;
  return  Math.sqrt(dx * dx + dy * dy);
}

function checkForCollision(body, other) {
  let a = !body.collision && !other.collision;
  let b = distance(other, body) < other.r + body.r;
  return a && b;
}

function updateTime() {
  let thisLoop = new Date();
  let thisFrameTime = thisLoop - lastLoop; // ms

  // console.log(frameTime + "\t" + (thisFrameTime - frameTime));
  frameTime += (thisFrameTime - frameTime) / 20.0;
  // frameTime += thisFrameTime - frameTime;
  lastLoop = thisLoop;
}


function createCluster(ix, iy, ivx, ivy) {
  // let sign = Math.random() > 0.5 ? 1 : -1;

  let x = 0;
  let y = 0;
  let vx = 0;
  let vy = 0;

  let dCoef = 15;
  let angleCoef = 1/2;
  let number = 1000;

  for (let i = 0; i < number; i++) {
    let angle = Math.PI * 2 * Math.random();
    let dist = (Math.random() * dCoef) ** 2;
    let cos = Math.cos(angle);
    let sin = Math.sin(angle);

    x = ix + dist * cos;
    y = iy + dist * sin;
    vx = ((dist * sin * angleCoef) + ivx) ;
    vy = ((-dist * cos * angleCoef) + ivy) ;

    let m = conf.minMass * 2;

    bodies.push(new Body(m, x, y, vx, vy));
    if (i === 0) {
      // bodies.push(new Body(conf.mass, ix, iy, ivx, ivy));
    }
  }
}
