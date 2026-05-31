// === THREE.JS 3D BACKGROUND SCENE ===
(function threeScene() {
  if (typeof THREE === 'undefined') return;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 16;
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  renderer.domElement.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:0';
  document.body.prepend(renderer.domElement);

  const ambient = new THREE.AmbientLight(0x404040);
  scene.add(ambient);
  const dl1 = new THREE.DirectionalLight(0xff6b35, 1);
  dl1.position.set(5, 5, 5);
  scene.add(dl1);
  const dl2 = new THREE.DirectionalLight(0x8b5cf6, 0.6);
  dl2.position.set(-5, -5, 5);
  scene.add(dl2);

  const shapes = [];
  const configs = [
    { geo: new THREE.TorusKnotGeometry(0.9, 0.25, 64, 8), color: 0xff6b35, wire: false },
    { geo: new THREE.OctahedronGeometry(1), color: 0x8b5cf6, wire: true },
    { geo: new THREE.DodecahedronGeometry(0.8), color: 0x3b82f6, wire: false },
    { geo: new THREE.IcosahedronGeometry(0.7), color: 0xff6b35, wire: true },
    { geo: new THREE.TorusGeometry(0.9, 0.25, 16, 64), color: 0x8b5cf6, wire: false },
    { geo: new THREE.ConeGeometry(0.8, 1.2, 6), color: 0x3b82f6, wire: true },
  ];

  configs.forEach((cfg, i) => {
    const mat = new THREE.MeshPhysicalMaterial({
      color: cfg.color,
      wireframe: cfg.wire,
      transparent: true,
      opacity: cfg.wire ? 0.6 : 0.2,
      roughness: 0.2,
      metalness: cfg.wire ? 0 : 0.3,
    });
    const mesh = new THREE.Mesh(cfg.geo, mat);
    mesh.position.set((Math.random() - 0.5) * 14, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 4 - 1);
    mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
    mesh.userData = { rx: (Math.random() - 0.5) * 0.008, ry: (Math.random() - 0.5) * 0.008, rz: (Math.random() - 0.5) * 0.004 };
    scene.add(mesh);
    shapes.push(mesh);

    if (!cfg.wire) {
      const edgeMat = new THREE.MeshBasicMaterial({ color: cfg.color, wireframe: true, transparent: true, opacity: 0.08 });
      const edge = new THREE.Mesh(cfg.geo.clone(), edgeMat);
      edge.position.copy(mesh.position);
      edge.rotation.copy(mesh.rotation);
      edge.scale.copy(mesh.scale);
      scene.add(edge);
      shapes.push(edge);
    }
  });

  let mx = 0, my = 0, tx = 0, ty = 0;
  document.addEventListener('mousemove', e => { mx = (e.clientX / window.innerWidth - 0.5) * 2; my = (e.clientY / window.innerHeight - 0.5) * 2; });
  document.addEventListener('touchmove', e => { const t = e.touches[0]; mx = (t.clientX / window.innerWidth - 0.5) * 2; my = (t.clientY / window.innerHeight - 0.5) * 2; }, { passive: true });

  function animate() {
    requestAnimationFrame(animate);
    tx += (mx * 0.08 - tx) * 0.03;
    ty += (my * 0.08 - ty) * 0.03;
    shapes.forEach(obj => { obj.rotation.x += obj.userData.rx + ty * 0.0003; obj.rotation.y += obj.userData.ry + tx * 0.0003; });
    camera.position.x += (tx * 0.4 - camera.position.x) * 0.02;
    camera.position.y += (-ty * 0.4 - camera.position.y) * 0.02;
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
  }
  animate();
  window.addEventListener('resize', () => { camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix(); renderer.setSize(window.innerWidth, window.innerHeight); });
})();
