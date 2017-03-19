var body = new THREE.CubeGeometry(90, 120, 90);
var ball = new THREE.CubeGeometry(120, 120, 120);
var skin = new THREE.MeshLambertMaterial({
    color: 0xF3FFE2
});
var enn;
var generate = false;
function AddEnnemy(number) {
    for (var n = 0; n < number; n++) {
        enn = new THREE.Mesh(body, skin);
        var x = Math.floor(Math.random() * 10000) - 5000;
        var z = Math.floor(Math.random() * 10000) - 5000;
        while( x > -500 && x < 500){
            x = Math.floor(Math.random() * 10000) - 5000;
        }
        while( z > -500 && z < 500){
            z = Math.floor(Math.random() * 10000) - 5000;
        }
        //enn.position.set(x, 150, y);
        enn.position.set(x, 15, z);
        scene.add(enn);
        generate = true;
    }
}


//function fall(elem) {
//    for (var i = 150; i >= 0; i--) {
//        elem.position.z = i;
//        //console.log(elem.position.z);
//        renderer.render(scene, camera);
//    }
//}



var d,dy;  
var m,z,ex,ez;
var Step;

function StepCalc(x){
    var f = -x/1225 + 249/215;  //f(1000) = 0.2 ; f(20) = 1
    f = f * 20;
    return f;
}

var less = false;
var more = false;

function follow(ennemy) {                      //calculation of distance
    m = Math.floor(pers.position.x);
    ex = Math.floor(ennemy.position.x);
    if(ex !== m){
        if (ex > 0 && ex > m) {
            d = ex - m;
            less = true;
            more = false;
        }
        else if (ex > 0 && ex < m) {
            d = m - ex;
            less = false;
            more = true;
        }
        else if (ex < 0 && ex < m) {
            d = -ex + m;
            less = false;
            more = true;
        }
        else if (ex < 0 && ex > m) {
            d = -m + ex;
            less = true;
            more = false;
        }
        else if (ex === 0 && m > 0) {
            d = m;
            less = false;
            more = true;
        }
        else if (ex === 0 && m < 0) {
            d = -m;
            less = true;
            more = false;
        }
        else if(ex === m){
            less = false;
            more = false;
        }
        if(d > 0){
            if (d < 1000) {                        //calculation of the size of the step
                Step = StepCalc(d);
            }
            else {
                Step = StepCalc(1000);
            }
            if(less){
                ennemy.position.x -= Step;
            }
            if(more){
                ennemy.position.x += Step;
            }
            renderer.render(scene,camera);
        }
    }

    z = Math.floor(pers.position.z);
    ez = Math.floor(ennemy.position.z);

    if(z !== ez){
        if (ez > 0 && ez > z) {
            dy = ez - z;
            less = true;
            more = false;
        }
        else if (ez > 0 && ez < z) {
            dy = z - ez;
            less = false;
            more = true;
        }
        else if (ez < 0 && ez < z) {
            dy = -ez + z;
            less = false;
            more = true;
        }
        else if (ez < 0 && ez > z) {
            dy = -z + ez;
            less = true;
            more = false;
        }
        else if (ez === 0 && z > 0) {
            dy = z;
            less = false;
            more = true;
        }
        else if (ez === 0 && z < 0) {
            dy = -z;
            less = true;
            more = false;
        }
        else if(ez === z){
            less = false;
            more = false;
        }
        if(dy > 0){
            if (dy < 1000) {                        //calculation of the size of the step
                Step = StepCalc(dy);
            }
            else {
                Step = StepCalc(1000);
            }
            if(less){
                ennemy.position.z -= Step;
            }
            if(more){
                ennemy.position.z += Step;
            }
            renderer.render(scene,camera);
        }
    }
    if(ex === m && ez === z){
        kill = true;
    }
}


function generateThree(nbr) {
    for (var t = 0; t < nbr; t++) {
        if (t <= nbr / 2) {
            var three = new THREE.Mesh(small, material);
            var threetop = new THREE.Mesh(circle, material);
            three.position.set(-600, 0, 400);
            threetop.position.set(-600, sma / 2, 400);
            scene.add(three);
            scene.add(threetop);
        }
        else {
            var three = new THREE.Mesh(big, material);
            var threetop = new THREE.Mesh(circle, material);
            var x = Math.floor(Math.random() * mapL) - mapL / 2;
            var y = Math.floor(Math.random() * mapl) - mapl / 2;
            three.position.set(x, 0, y);
            threetop.position.set(x, nor / 2, y);
            scene.add(three);
            scene.add(threetop);
        }
    }
}





/*
var Sunform;
function sun() {
    Sunform = new THREE.Mesh(ball, material);
    Sunform.position.set(50, 50, 50);
    scene.add(Sunform);
}
var time = 0;
requestAnimationFrame(sunMove);
function sunMove() {
    time += 0.01;
    Sunform.position.x = Math.sin(time) * 2000;
    Sunform.position.y = 150;
    Sunform.position.z = Math.cos(time) * 2000;
    renderer.sunMove(scene, Sunform);
    requestAnimationFrame(sunMove);
}
*/



//thes guittan