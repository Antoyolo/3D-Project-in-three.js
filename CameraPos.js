function ChangeCamera(value){   //value is the number of the mode
    if(value === 1){
        camera.position.x = pers.position.x;
        camera.position.y = pers.position.y;
        camera.position.z = pers.position.z;

        camera.rotation.y = pers.rotation.y;
        camera.rotation.x = pers.rotation.x;
        camera.rotation.z = pers.rotation.z;
    }
    else if(value === 2){
        camera.position.y = 1000;
        camera.position.x += 920;
        camera.position.z += 950;
        camera.lookAt(pers.position);
    }
    else if(value === 3){
        camera.position.x = pers.position.x - 1500;
        camera.position.y = 400;
        camera.position.z = pers.position.z;
        camera.lookAt(pers.position);
    }
}