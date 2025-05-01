export function createScene(engine, canvas) {
  const scene = new BABYLON.Scene(engine);
  scene.clearColor = new BABYLON.Color3(0.5, 0.8, 1);
  scene.gravity = new BABYLON.Vector3(0, -0.5, 0);
  scene.collisionsEnabled = true;

  const camera = new BABYLON.ArcRotateCamera("ArcCamera", Math.PI / 2, Math.PI / 2.5, 10, new BABYLON.Vector3(0, 1, 0), scene);
  camera.attachControl(canvas, true);
  camera.checkCollisions = true;
  camera.lowerRadiusLimit = 5;
  camera.upperRadiusLimit = 20;
  camera.wheelPrecision = 50;

  const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), scene);

  const ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 200, height: 200}, scene);
  ground.checkCollisions = true;
  const groundMat = new BABYLON.StandardMaterial("groundMat", scene);
  groundMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/grass.jpg", scene);
  ground.material = groundMat;

  let gold = 0;
  const hud = document.getElementById("hud");
  function updateHUD() {
    hud.textContent = `💰 Gold: ${gold}`;
  }

  function spawnCoin(x, z) {
    const coin = BABYLON.MeshBuilder.CreateCylinder("coin", {height: 0.1, diameter: 0.5}, scene);
    coin.position = new BABYLON.Vector3(x, 0.5, z);
    const mat = new BABYLON.StandardMaterial("coinMat", scene);
    mat.diffuseColor = new BABYLON.Color3(1, 0.84, 0);
    coin.material = mat;

    scene.registerBeforeRender(() => {
      if (BABYLON.Vector3.Distance(camera.target, coin.position) < 1.5) {
        gold += 10;
        updateHUD();
        coin.dispose();
      }
    });
  }

  for (let i = 0; i < 10; i++) {
    spawnCoin((Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100);
  }

  updateHUD();
  return scene;
}
