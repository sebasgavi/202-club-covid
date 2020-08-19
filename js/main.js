const app = new PIXI.Application({
  width: window.innerWidth, height: window.innerHeight, backgroundColor: 0,
});

document.body.appendChild(app.view);

const initialCount = 10;
const population = [];


const personFactory = (sickness) => {
  const g = new PIXI.Graphics();
  app.stage.addChild(g);
  return {
    x: Math.floor(Math.random() * window.innerWidth),
    y: Math.floor(Math.random() * window.innerHeight),
    sickness,
    g,
  }
}

const drawPerson = (person) => {
  // Circle
  const size = 30;
  const { g, sickness, x, y } = person;
  g.clear();
  g.lineStyle(0); // draw a circle, set the lineStyle to zero so the circle doesn't have an outline
  g.beginFill(sickness > .1 ? 0xDE3249 : 0x2222FF, 1);
  g.drawCircle(0, 0, size);
  g.endFill();
  g.position.x = x;
  g.position.y = y;
}

Array.from({ length: initialCount }).forEach((_, index) => {
  const sickness = index === 0 ? .5 : 0;
  population.push(personFactory(sickness));
})

app.ticker.add((delta) => {
  population.forEach(drawPerson);
});

let currentDay = 0;
setInterval(() => {
  currentDay++;
  console.log('day', currentDay);
}, 300);