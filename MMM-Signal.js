//MMM-Signal.js:
Module.register("MMM-Signal", {
    // Default module config.
    defaults: {
        firsttext: "there should be some data around here",
    },

    getDom: function () {
        var signalLys = document.createElement('myCanvas');
        var res = signalLys.getContext('2d');
        signalLys.setAttribute("id", "canvas");
        signalLys.style.width = '100%';
        signalLys.style.height = '100%';
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
        function myloop() {
            setTimeout(myloop, 20000) //opdatering af grafen i milli-sekunder
            loadVandTemp();

            function draw() {

                res.beginPath();
                res.arc(100, 75, 50, 0, 2 * Math.PI);
                res.fillStyle = tempsignalfarve;
                res.fill();
            }
            window.onload = draw
        }
        myloop()
        return signalLys;
    }
});