$(function(){
    (function init() {
    // renderer
    var renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('mainCanvas')
    });
    renderer.setClearColor(0x404040); // black
    renderer.setSize(window.innerWidth, window.innerHeight);

    // scene
    var scene = new THREE.Scene();

    // camera
    var camera = new THREE.PerspectiveCamera(30, window.innerWidth/window.innerHeight,1, 1000);
    camera.position.set(15, 10, 10);//位置
    camera.lookAt(scene.position);//对准的焦点
    scene.add(camera);

    // add box and toru
    var boxes = new THREE.BoxGeometry(6, 3, 3);
    var torus = new THREE.TorusGeometry(0.8, 0.2, 80, 80);
    var matarial = new THREE.MeshLambertMaterial({color: '0xf00'});
    var cube = new THREE.Mesh(boxes,matarial);
    var toru1 = new THREE.Mesh(torus,matarial);
    var toru2 = new THREE.Mesh(torus,matarial);
    toru2.position.set(1.6, -1.5, 1.45);
    toru1.position.set(-1.8,-1.5,1.45);
    scene.add(cube,toru1,toru2);
    
    //light
    var light = new THREE.SpotLight(0xffffff);
    light.position.set(20, 30, 20);
    scene.add(light);


    // render
    renderer.render(scene, camera);
    })();
});