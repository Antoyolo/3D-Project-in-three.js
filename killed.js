var CallKill = 0;
function KilledMode(){
    CallKill++;
    if(CallKill === 1){
        renderer.setClearColor(0xff0000);
        //alert('You have been killed');
        document.getElementById('end').innerHTML = 'YOU HAVE BEEN KILLED';
    }
}