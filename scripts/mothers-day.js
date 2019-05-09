const GROUND = -15;
const DEFAULT_CAMERA_X = 0, DEFAULT_CAMERA_Y = 0, DEFAULT_CAMERA_Z = 5;
const AMBIENT_ENABLED = false;
const AXES_HELPER = true;

var camera, renderer;
var emitter;

var animSpin = true;
var lookAtFace = false;

// scene and camera.
var scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var aspect = window.innerWidth / window.innerHeight;
var width = 25;
var height = width / aspect;



//var camera = new THREE.OrthographicCamera( width / -2, width / 2, height / 2, height / -2, 0, 100 );
camera.position.z = 0;
//camera.position = new THREE.Vector3(0,1,0);
camera.position.set( DEFAULT_CAMERA_X, DEFAULT_CAMERA_Y, DEFAULT_CAMERA_Z );


//console.log(camera.position);

// orbit controls

var controls = new THREE.OrbitControls(camera);
controls.enableDamping = true;
controls.enableKeys = true;
controls.enableDamping = true;
controls.dampingFactor = 1;
controls.minDistance = 10;
controls.maxDistance = 100;


//controls.minZoom = 10;
//controls.maxZoom = 100;

//console.log(camera.position);

//controls.maxPolarAngle = Math.PI / 2; // can't pivot below the floor plane.

//controls.autoRotate = true;

// renderer with better shadow map
renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

scene.background = new THREE.Color( 0xccccff );


// add distance fog
scene.fog = new THREE.Fog(0x000000, 10, 80);


// add ambient light
if (AMBIENT_ENABLED) {
    var light = new THREE.AmbientLight(0xffffff, 1);
    scene.add(light);    
}


// add ground plane, receiving shadow from object that cast(s)Shadow
var geometry = new THREE.PlaneGeometry(300, 300, 100, 100);
var material = new THREE.MeshStandardMaterial({color: 0xC0C0C0, side: THREE.DoubleSide});

var plane = new THREE.Mesh(geometry, material);
//scene.add(plane);
plane.position.y = GROUND;
plane.rotation.x = Math.PI / 2;
plane.receiveShadow = true;    

var spotLight;

function addSpotLight(helper) {
// add spotlight that casts shadow onto objects that recieve it
    spotLight = new THREE.SpotLight(0xffffff);

    //spotLight.position.set(5, 30, 3);
    spotLight.position.set(5, 10, 30);
    spotLight.castShadow = true;
    spotLight.shadow.radius = 3; // makes the edge blurrier at the expense of making it look like copies
    spotLight.penumbra = 0.5;
    spotLight.intensity = 0.5;

    // make higher res
    // = 1024 is faster, but edges are more jagged looking
    spotLight.shadow.mapSize.width = 2048;
    spotLight.shadow.mapSize.height = 2048;

    scene.add(spotLight);

    if (helper) {
        // add spotlight helper
        var spotLightHelper = new THREE.SpotLightHelper(spotLight);
        scene.add(spotLightHelper);
    }
}

// cube light
//var cubeLight = new THREE.PointLight(0xffffff, 1, 100);
//scene.add(cubeLight);


// add axis helper
if (AXES_HELPER) {
    var axesHelper = new THREE.AxesHelper(15);
    scene.add(axesHelper);    
}

// load Mother's Day light-up sign model
var loader = new THREE.GLTFLoader();
loader.load('models/mothers-day.glb',
function(gltf) {
    // loader callback

    // add gltf scene and make crossCube cast shadow from light
    
    scene.add(gltf.scene);
    
/*
    crossCube = scene.getObjectByName('Cube777');
    //crossCube.castShadow = true;
    crossCube.receiveShadow = true;
    crossCube.material.fog = false; // Makes it so the crossCube isn't affected by distance fog.

    crossCube.material = new THREE.MeshPhysicalMaterial({color: 0xffd700});
    
    crossCube.scale.set(0.3, 0.3, 0.3);
    crossCube.position.set(0, 0, 0);
*/
    
    scene.getObjectByName('M1').rotation.set(Math.PI / 2, 0, -.2);
    scene.getObjectByName('O1').rotation.set(Math.PI / 2, 0, 0);
    scene.getObjectByName('M2').rotation.set(Math.PI / 2, 0, .2);
    
    scene.getObjectByName('M1').position.y = -.2;
    scene.getObjectByName('M1').position.z = .4;

	document.querySelector('#load-message').style.display = 'none';

    setupLights();
    
    //addSpotLight(true);
    
    animate();

    console.log(scene);
}, undefined, function(error) {
    console.error(error);
	notifyLoadFail();
});

animate();

var ctr= 0;
var rotateDeg = 0.0;

// tick variables for timed actions.

var t0 = new Date().getTime();
var t1 = new Date().getTime();
var tick = 500; // tick interval
var tickElapsed = 0;


function animate() {
    requestAnimationFrame(animate);

    controls.update();

    t1 = new Date().getTime();    
    tickElapsed = t1 - t0;
    // tick occurred
    if (tickElapsed >= tick) {  
        t0 = new Date().getTime();
        blinkLights();
    }
    
   
    renderer.render(scene, camera);
}

// blinking lights on model.
var lights = [
    'LightSphere',
    'LightSphere001',
    'LightSphere002',
    'LightSphere003',
    'LightSphere004',
    'LightSphere005',
    'LightSphere006',
    
    'LightSphere007',
    'LightSphere008',
    'LightSphere009',
    'LightSphere010',
    'LightSphere011',
    'LightSphere012',
    
    'LightSphere013',
    'LightSphere014',
    'LightSphere015',
    'LightSphere016',
    'LightSphere017',
    'LightSphere018',
    'LightSphere019'
];
var even = true;

function setupLights() {
    for (var x = 0; x < lights.length; x++) {
        var light = scene.getObjectByName(lights[x]);
        
        var emissiveColor = x % 2 == 0 && x != 1? new THREE.Color(0xffffff) : new THREE.Color(0x000000);
        var emissiveColor = new THREE.Color(0xffffff);
        var emissiveIntensity = x % 2 == 0 && x != 1? 1 : 0;
        
        light.material = new THREE.MeshLambertMaterial({ color: 0x000000, emissive: emissiveColor, emissiveIntensity: emissiveIntensity });
        
        var pointLight = new THREE.PointLight(0xffffff, 1, 5);
        pointLight.name = lights[x]+'-PointLight';
        light.add(pointLight);
        pointLight.position.y = 1;
        console.log(pointLight.position.z);
        //scene.add(new THREE.PointLightHelper(pointLight, 2));
    }
    
        /*var pl = new THREE.PointLight(0xffffff, 0.1, 5);
        scene.add(pl);
        pl.add(new THREE.PointLightHelper(pointLight, 20));*/
}

// odd / even blink function.
function blinkLights() {    
    /*for (var x = 0; x < lights.length; x++) {   
        scene.getObjectByName(lights[x]).visible = true;
    }*/
    
    
    for (var x = 0; x < lights.length; x++) {
        var light = scene.getObjectByName(lights[x]);
        var pointLight = scene.getObjectByName(lights[x]+'-PointLight');
        
        var lIntensity = light.material.emissiveIntensity;
        
        if (lIntensity == 0) {
            light.material.emissiveIntensity = 1;
            pointLight.intensity = 1;
        } else {
            light.material.emissiveIntensity = 0;
            pointLight.intensity = 0;
        }
        //if (even && ) scene.getObjectByName(lights[x]).visible = x % 2 == 0 && x != 1;
        //if (!even) scene.getObjectByName(lights[x]).visible = x % 2 != 0 || x == 1;
    }
    
    even = !even;
	//console.log('blinking lights.');
}

function notifyLoadFail() {
	document.querySelector('#load-message').classList.add('load-message-fail');
	document.querySelector('#load-message').classList.remove('load-message');
	document.querySelector('#load-message').innerHTML = 'Scene failed to load. Refresh page and if that doesn\'t work, contact <a href="/">@SirKoik!</a>';
}


document.querySelector('#pause').onclick = function(e) {
    animSpin = !animSpin;
}

document.querySelector('#credits-link').onclick = function(e) {
    e.preventDefault();
    document.querySelector('.credits-container').style.display = 'flex';
}

document.querySelector('.credits-container').onclick = function() {
    this.style.display = 'none';
}

// prevent credits screen from closing when clicking a link within.
document.querySelector('.credits-container a').onclick = function(e) {
    e.stopPropagation();
}    


// update on resize
window.onresize = function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// disable iOS Safari scrolling / bouncing effects when trying to pan.
// https://stackoverflow.com/questions/7768269/ipad-safari-disable-scrolling-and-bounce-effect
function preventDefault(e) { e.preventDefault(); }
document.body.addEventListener('touchmove', preventDefault, { passive: false });