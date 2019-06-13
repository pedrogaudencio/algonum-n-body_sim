let tracking = false;
let zoomLevel = 1;

let frameTime = 0;
let lastLoop = new Date();

function run() {
  prevBodies = [];

  draw();
  drawVelocityLine();
  if (tracking) return;

  // prevBodies permet de garder une copie clean des particules
  // pour appliquer les modifications lors du step partir des
  // donnees non modifiees.
  for (let i = 0; i < bodies.length; i++) {
    prevBodies.push(bodies[i].clone());
  }

  for (let i = 0; i < bodies.length; i++) {
    takeStep(i);
  }

  for (let i = 0; i < bodies.length; i++) {
    let body = bodies[i];

    for (let j = i + 1; j < bodies.length; j++) {
      let other = bodies[j];

      if (checkForCollision(body, other)) {
        body.collision = true;
        other.collision = true;
        mergeBodies(body, other);
      }
    }
  }

  for (let i = 0; i < bodies.length; i++) {
    if (bodies[i].collision) {
      bodies.splice(i--, 1);
    }
  }

  updateTime();
}

function takeStep(i) {
  let body = bodies[i];

  let fX = 0;
  let fY = 0;
  let h = conf.timeStep * conf.timeMultiplicator;

  for (let j = 0; j < prevBodies.length; j++) {
    let other = prevBodies[j];

    if (j !== i) {
      let dx = other.x - body.x;
      let dy = other.y - body.y;

      // If distance is too short, we use the sum of radii
      let d = Math.max(Math.sqrt(dx * dx + dy * dy), body.r + other.r);
      let F = other.m / (d * d);

      // Update net force components
      fX += (F * dx) / d;
      fY += (F * dy) / d;
    }
  }

  fX *= conf.g;
  fY *= conf.g;

  // Semi implicit Euler method (keeps system energy (almost))
  // The major change with standard Euler is the use of
  // the updated version of the speed of the body to compute
  // the position.

  // Vi(t + h) = Vi(t) + h*F
  body.vx += h * fX;
  body.vy += h * fY;

  // Xi(t + h) = Xi(t) + hVi(t)
  body.x += h * body.vx;
  body.y += h * body.vy;
}





function init() {
  frameTime = 0;
  lastLoop = new Date();

  initUI();
  setInterval(run, 10);
}

window.onload = init;
