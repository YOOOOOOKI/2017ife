$(function(){
    (function init() {
    // renderer
    var renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('mainCanvas')
    });
    renderer.setClearColor(0x404040); // gray
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;
    renderer.shadowMapSoft = true;
    // scene
    var scene = new THREE.Scene();

    // camera
    var camera = new THREE.PerspectiveCamera(25, window.innerWidth/window.innerHeight,1, 1000);
    camera.position.set(15,8,10);//位置
    camera.lookAt(scene.position);//对准的焦点
    scene.add(camera);

    // add box and toru
    var boxes = new THREE.BoxGeometry(6, 3, 3);
    var torus = new THREE.TorusGeometry(0.8, 0.3, 80, 80);
    var matarial = new THREE.MeshLambertMaterial({color: '0xf00'});
    var matarialMirror = new THREE.MeshPhongMaterial({color: '0xf00'});
    var cube = new THREE.Mesh(boxes,matarial);
    var toru1 = new THREE.Mesh(torus,matarialMirror);
    var toru2 = new THREE.Mesh(torus,matarialMirror);
    toru2.position.set(1.6, -1.5, 1.45);
    toru1.position.set(-1.8,-1.5,1.45);
    cube.castShadow = true; toru1.castShadow = true; toru2.castShadow = true;
    toru1.receiveShadow = true; toru2.receiveShadow = true;
    scene.add(cube,toru1,toru2);
    
    //plane
    var plane = new THREE.Mesh(new THREE.PlaneGeometry(20, 20, 16, 16),
    new THREE.MeshLambertMaterial({color: 0xADFF2F}));
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -2.35;
    plane.receiveShadow = true;
    scene.add(plane);
    //light
    var light = new THREE.DirectionalLight(0xffffff,0.6,100);
    light.position.set(2, 5, 10);
    light.target = cube; light.target = toru1;   light.target = toru2;
    light.castShadow = true;
    light.shadowMapWidth = light.shadowMapHeight = 5000;
    scene.add(light);
    // render
    renderer.render(scene, camera);
    })();
});