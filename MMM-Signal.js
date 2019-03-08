//MMM-Signal.js:
Module.register("MMM-Signal", {
    // Default module config.
    defaults: {
        firsttext: "there should be some data around here",
    },

    getDom: function () {
        var signalLys = document.createElement('canvas');
        signalLys.setAttribute("id", "myCanvas");
        signalLys.style.width = '100%';
        signalLys.style.height = '100%';
        document.body.appendChild(signalLys);

        var tempsignalfarve = 'blue'
        var senesteTempSkift;


        function addZero(i) {
            if (i < 10) {
                i = "0" + i;
            }
            return i;
        }

        function logTime() {
            var now = new Date();
            var m = addZero(now.getMinutes());
            var h = addZero(now.getHours());
            var t = "" + h + ":" + m;
            return senesteTempSkift = String(t);


        }

        function loadVandTemp() {

            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {

                console.log('ready state change')

                if (xhttp.readyState === 4 && xhttp.status === 200) {

                    vandTempTal = xhttp.responseText; //sæt Math.round på for at kun vise Runde tal
                    console.log('vandtemp = ' + vandTempTal)

                    if (vandTempTal < 30 && vandTempTal > 20.1) {
                        if (tempsignalfarve !== 'green') {
                            console.log('changed to green')
                            logTime()

                        }
                        tempsignalfarve = 'green'

                    }

                    if (vandTempTal < 20 && vandTempTal > 10.1) {
                        if (tempsignalfarve !== 'yellow') {
                            console.log('changed to yellow')
                            logTime()
                        }
                        tempsignalfarve = 'yellow'
                    }

                    if (vandTempTal < 10 && vandTempTal > 0) {
                        if (tempsignalfarve !== 'red') {
                            console.log('changed to red')
                            logTime()
                        }
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
                var canvas = document.getElementById('myCanvas');
                var res = canvas.getContext('2d');
                res.beginPath();
                res.arc(100, 75, 50, 0, 2 * Math.PI);
                res.fillStyle = tempsignalfarve;
                res.fill();
                res.fillStyle = "red";
                res.textAlign = "center";
                res.font = "30px Arial";
                res.fillText(senesteTempSkift, canvas.width / 2, canvas.height / 2);
            }
            draw()
        }
        myloop()
        return signalLys;
    }
});