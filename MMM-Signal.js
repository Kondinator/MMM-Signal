//MMM-ESP.js:
Module.register("MMM-ESP", {
    // Default module config.
    defaults: {
        firsttext: "there should be some data around here",
    },

    getDom: function () {
        var signalLys = document.createElement('canvas');
        signalLys.setAttribute("id", "canvas");
        signalLys.style.width = '50%';
        signalLys.style.height = '50%';
        document.body.appendChild(signalLys);

        var tempsignalfarve;

        function loadVandTemp() {

            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {

                console.log('ready state change')

                if (xhttp.readyState === 4 && xhttp.status === 200) {

                    vandTempTal = xhttp.responseText; //sæt Math.round på for at kun vise Runde tal
                    console.log('vandtemp = ' + vandTempTal)

                    if (vandTempTal < 30) {
                        tempsignalfarve = 'green'
                    }

                    if (vandTempTal < 20) {
                        tempsignalfarve = 'yellow'
                    }

                    if (vandTempTal < 10) {
                        tempsignalfarve = 'red'
                    }

                }

            };
            xhttp.open("GET", "http://10.10.10.191", false);
            xhttp.send();
            console.log(tempsignalfarve)

        }
        loadVandTemp();

        function draw() {

            var canvas = document.getElementById('canvas');
            var res = canvas.getContext('2d');
            res.beginPath();
            res.arc(100, 75, 50, 0, 2 * Math.PI);
            res.fillStyle = tempsignalfarve;
            res.fill();
        }
        window.onload = draw
    }
});