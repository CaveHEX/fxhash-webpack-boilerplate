import "../node_modules/p5/lib/p5.js";
import { param } from "./modules/parameters.js";
import * as emit from "./modules/emit.js";
import { coint_t } from "./modules/coin.js";

// these are the variables you can use as inputs to your algorithms
// console.log(fxhash)   // the 64 chars hex number fed to your algorithm
// console.log(fxrand())

// [NOTE] : Traits from the GT's parameters (param from parameter.js)
const config = {
  "Color palette": param.color_palette,
  "Shape": param.shape,
};

window.$fxhashFeatures = {
  ...config,
  "collection": "COLLECTION NAME", // [NOTE] : Optional
  "artwork": "ARTWORK NAME", // [NOTE] : Optional
};  

const pos = {
  w: null,
  h: null,
  s: null,
  l: null,
  t: null,
};

// Components // [NOTE] your components
let coin = null;

// Global variables
let on_screen_resize = new emit.binding_t(); // [NOTE] Signal for resizing
let captured = false;

// Resize code
function init() {
  pos.w = min(window.innerWidth, 800);
  pos.h = min(window.innerHeight, 800);
  pos.s = Math.min(window.innerWidth, window.innerHeight);
  pos.t = (pos.h - pos.s) / 2;
  pos.l = (pos.w - pos.s) / 2;
  let cvs = createCanvas(pos.w, pos.h);
  cvs.position((windowWidth - width) / 2, (windowHeight - height) / 2);
  frameRate(60);

  on_screen_resize.emit();
}
window.windowResized = () => { init(); };

////////////////////////////////////////////////////////////////////////////

window.setup = () => {
  init();
  // colorMode(HSB, 360, 100, 100, 255);

  // Init components
  coin = new coint_t();

  // Hooking up signals // [NOTE] subscribe any component that need custom resizing
  on_screen_resize.addListener(coin.on_resize.bind(coin));
};

window.draw = () => {
  background(20, 50, 127);

  // [NOTE] Render and Update your components
  coin.update();
  coin.render();

  // [NOTE] Write your own capture condition here (In this case, after 5 secs~)
  if ((frameCount == 120) && !captured) {
    fxpreview();
    captured = true;
  }
};

export { on_screen_resize };
