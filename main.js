import * as BABYLON from "https://cdn.babylonjs.com/babylon.js";
import "https://cdn.babylonjs.com/loaders/babylonjs.loaders.min.js";
import "https://cdn.babylonjs.com/gui/babylon.gui.min.js";
import { createScene } from './scene.js';

window.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("gameCanvas");
  const engine = new BABYLON.Engine(canvas, true);

  const scene = createScene(engine, canvas);

  engine.runRenderLoop(() => {
    scene.render();
  });

  window.addEventListener("resize", () => engine.resize());

  document.getElementById("graphicsQuality").addEventListener("change", (e) => {
    const level = e.target.value;
    if (level === "low") engine.setHardwareScalingLevel(2);
    else if (level === "medium") engine.setHardwareScalingLevel(1);
    else engine.setHardwareScalingLevel(0.5);
  });

  document.getElementById("fullscreenBtn").addEventListener("click", () => {
    const element = document.documentElement;
    if (!document.fullscreenElement) {
      element.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  });
});
