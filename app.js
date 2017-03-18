var keyboard = {};
var player = { height: 1.8, speed: 30, turnSpeed: Math.PI * 0.02 };

var nor = 400;  //taille arbre normal
var sma = 240;  //taille petit arbre
var mapL = 15000;
var mapl = 15000;
var renderer, scene, camera, small, big, circle, material, pers;
var intensitythree = 1500;   //plus le nombre est grand moins il y a d'arbre. IL est conseille d'appleque une valeur au dessus de 700
var numberofthree = (mapL / intensitythree) * (mapl / intensitythree);
var camerasensibility = 5;
var defaultColor = 'white';
var jumpforce = 40;
var gravity = 0.8;
var velocity = 0;
var maxheight = 200;
var p = 0;

var btnActive = false;
var ready = true;

var animation = false;
var kill = false;
var intro = true;

var Threelock = true;   //option
var mapLock = true;          //activation 
var Ennemy = true;      //elements

var BeginNight = 20;  //le mode nuit commence a cette heure la
var EndNight = 8;     //le mode nuit fini a cette heure la


var i = 0;
var active = document.getElementById('turnOn');
function init() {
    var k = 0;
    //document.getElementById('turnOn').style.height = '0px';
    //document.getElementById('turnOn').style.lineHeight = '0px';
    console.log("arbre: " + Threelock);
    console.log("ennemie: " + Ennemy);
    console.log("map: " + mapLock);
    var now = new Date();
    var hours = now.getHours();
    console.log('3D Game:');
    //RENDERER
    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('myCanvas'), antialias: true });
    console.log(hours + 'h');
    if (hours >= BeginNight || hours < EndNight) {
        renderer.setClearColor(0x000000);
        console.log('mode nuit');
    }
    else {
        renderer.setClearColor(0x00ff00);
        console.log('mode jour');
    }
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    //CAMERA
    camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 300, 10000);
    camera.position.x = 0;
    camera.position.y = player.height + 500;
    camera.position.z = 10000;

    //SCENE
    scene = new THREE.Scene();
    //LIGHTS
    var light = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(light);

    var light1 = new THREE.PointLight(0xffffff, 1);
    light1.position.x = 1000;
    light1.position.z = 100;
    scene.add(light1);

    //MATERIAL

    material = new THREE.MeshLambertMaterial({
        color: 0xF3FFE2
    });

    pers = new THREE.Mesh(ball, material);
    pers.position.set(0, 0, 0);
    scene.add(pers);


    var Sunlight = new THREE.DirectionalLight(0xffffff);
    Sunlight.position.set(100, 100, 100);
    Sunlight.target = pers


    //OBJECT
    if (Threelock) {

        big = new THREE.CubeGeometry(90, sma, 90);
        small = new THREE.CubeGeometry(90, sma, 90);
        circle = new THREE.SphereGeometry(100, 50, 50);
        generateThree(numberofthree);
        //generateThree(50);
        console.log(numberofthree);
    }
    if (mapLock) {
        var plane = new THREE.PlaneGeometry(mapL, mapl, 100, 100);
        var grood = new THREE.Mesh(plane, material);
        grood.rotation.x = -90 * Math.PI / 180;
        grood.position.y = -100;

        scene.add(grood);
    }

    camera.lookAt(light.position);
    renderer.render(scene, camera);
    //RENDER LOOP
    var delta = 0;
    if (ready) {
        if (btnActive) {
            active.addEventListener('click', function () {
                if (k === 0) {
                    active.style.background = '#e74c3c';
                    animation = true;
                    k = 1;
                    init();
                }
            })
        }
        if (animation) {
            requestAnimationFrame(render);
            function render() {
                delta += 0.02;
                camera.lookAt(light.position);
                camera.position.x = Math.sin(delta) * 5000;
                camera.position.y = 150;
                camera.position.z = Math.cos(delta) * 5000;
                renderer.render(scene, camera);
                requestAnimationFrame(render);
            }
        }
        document.addEventListener('mousemove', onMouseMove, false);
        function onMouseMove(event) {
            var MouseX = event.clientX - window.innerWidth / 2;
            var MouseY = event.clientY - window.innerHeight / 2;
            //camera.position.x = - MouseX;
            if (MouseY >= 40) {
                camera.rotation.x = -40 * (0.001 * camerasensibility);
            }
            else if (MouseY <= -75) {
                camera.rotation.x = 75 * (0.001 * camerasensibility);
            }
            else {
                camera.rotation.x = -MouseY * (0.001 * camerasensibility);
            }

            if (MouseX >= 100) {
                camera.rotation.y = -100 * 0.002;
            }
            else if (MouseX <= -100) {
                camera.rotation.y = 100 * 0.002;
            }
            else {
                camera.rotation.y = -MouseX * 0.002;
            }

            //if(MouseX !== 0){                                 //I try to change the rotation
            //    camera.rotation.y += MouseX;                  //of the camera and still have
            //    event.clientX = 0 + window.innerWidth / 2;    //the cursor in the middle
            //}
            renderer.render(scene, camera);
        }
        animate();
        if (Ennemy) {
            AddEnnemy(1);
        }
    }
}
function animate() {
    requestAnimationFrame(animate);
    renderer.setSize(window.innerWidth, window.innerHeight);
    velocity += gravity;
    velocity *= 0.9;
    camera.position.y -= velocity;
    if (intro) {
        if (camera.position.z > 0) {
            camera.position.z = camera.position.z - 100;
        }
        else {
            intro = false;
        }
        if (camera.position.y > player.height) {
            camera.position.y = camera.position.y - 5;
        }
    }
    if (intro === false) {
        if (generate) {
            follow(enn);
        }
        if (kill) {
            KilledMode();
        }
    }

    if (camera.position.y < player.height) {
        camera.position.y = player.height;
        velocity = 0;
        p = 0;
    }
    // Keyboard movement inputs
    if (keyboard[87]) { // W key
        camera.position.x -= Math.sin(camera.rotation.y) * player.speed;
        camera.position.z += -Math.cos(camera.rotation.y) * player.speed;

        pers.position.x -= Math.sin(camera.rotation.y) * player.speed;
        pers.position.z += -Math.cos(camera.rotation.y) * player.speed;

    }
    if (keyboard[83]) { // S key
        camera.position.x += Math.sin(camera.rotation.y) * player.speed;
        camera.position.z -= -Math.cos(camera.rotation.y) * player.speed;

        pers.position.x += Math.sin(camera.rotation.y) * player.speed;
        pers.position.z -= -Math.cos(camera.rotation.y) * player.speed;
    }
    if (keyboard[68]) { // D key
        // Redirect motion by 90 degrees
        camera.position.x += Math.sin(camera.rotation.y + Math.PI / 2) * player.speed;
        camera.position.z += -Math.cos(camera.rotation.y + Math.PI / 2) * player.speed;

        pers.position.x += Math.sin(camera.rotation.y + Math.PI / 2) * player.speed;
        pers.position.z += -Math.cos(camera.rotation.y + Math.PI / 2) * player.speed;

    }
    if (keyboard[65]) { // A key
        camera.position.x += Math.sin(camera.rotation.y - Math.PI / 2) * player.speed;
        camera.position.z += -Math.cos(camera.rotation.y - Math.PI / 2) * player.speed;

        pers.position.x += Math.sin(camera.rotation.y - Math.PI / 2) * player.speed;
        pers.position.z += -Math.cos(camera.rotation.y - Math.PI / 2) * player.speed;
    }

    // Keyboard turn inputs
    if (keyboard[37]) { // left arrow key
        camera.rotation.y += player.turnSpeed;

        camera.rotation.y += player.turnSpeed;
    }
    if (keyboard[39]) { // right arrow key
        camera.rotation.y -= player.turnSpeed;

        camera.rotation.y -= player.turnSpeed;
    }
    if (keyboard[32]) { // SPACE key
        if (p === 0) {
            camera.position.y += jumpforce;

            camera.position.y += jumpforce;

            if (camera.position.y >= maxheight) {
                for (var i = 0; i < 3; i++) {
                    camera.position.y += 5;

                    camera.position.y += 5;
                }
                p = 1;
            }
        }
    }
    renderer.render(scene, camera);
}

function keyDown(event) {
    keyboard[event.keyCode] = true;
}

function keyUp(event) {
    keyboard[event.keyCode] = false;
}

window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);

window.onload = init;