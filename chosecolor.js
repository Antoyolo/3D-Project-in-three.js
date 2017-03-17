var c = 0;
var persoColor = "white";
var ready = true;

var persoOption = false;  //true to active de color perso option
var button = document.getElementById('changeColor');
function color(){
    if(persoOption){
        var presentation = document.getElementById('presentation');
        var next = document.getElementById('next');
        var before = document.getElementById('before');
        next.innerHTML = 'Next';
        before.innerHTML = 'Before';
        button.innerHTML = 'Select color';
        button.style.height = '40px';
        button.style.width = '120px';
        var color = [
            "white",
            "blue",
            "red",
            "green"
        ];

        var count = color.length;

        function Next() {
            console.log(color[c]);
            c++;
            if (c == count) {
                c = 0;
            }
            presentation.style.backgroundColor = color[c];
        }

        function Before() {
            console.log(color[c]);
            c--;
            if (c < 0) {
                c = count + 1;
            }
            presentation.style.backgroundColor = color[c];
        }

        function Select() {
            if (c === 0 || c === 1 || c === 2 || c === 3) {
                persoColor = color[c];
            }
            else {
                persoColor = defaultColor;
            }
            alert('CLIQUE !!!');
            /*
            document.getElementById('turnOn').style.height = '20px';        //apparition of the
            document.getElementById('turnOn').style.lineHeight = '20px';    //"button" at the top

            document.getElementById('section').style.visibility = 'hidden';
            document.getElementById('changeColor').style.visibility = 'hidden';
            document.getElementById('presentation').style.visibility = 'hidden';
            document.getElementById('next').style.visibility = 'hidden';
            document.getElementById('before').style.visibility = 'hidden';

            document.getElementById('section').style.height = '0px';
            document.getElementById('changeColor').style.height = '0px';
            document.getElementById('presentation').style.height = '0px';
            document.getElementById('next').style.height = '0px';
            document.getElementById('before').style.height = '0px';
            
            document.getElementById('next').style.lineHeight = '0px';
            document.getElementById('before').style.lineHeight = '0px';*/
            ready = true;
        }
    }
    else if(persoOption === false){
            document.getElementById('turnOn').style.height = '20px';        //apparition of the
            document.getElementById('turnOn').style.lineHeight = '20px';    //"button" at the top
            button.style.height = '0';
            button.style.width = '0';
            renderer.render(scene, camera);
    }
}
window.onload  = color;