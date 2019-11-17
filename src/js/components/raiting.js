;(function (window) {

    'use strict';

    /**
     * SimpleAlert function
     */
    function Raiting() {
        this.count = 0;
        this.value = 0;
        this._init();
    }

    /**
     * Initialise the message
     */
    Raiting.prototype._init = function () {
        this.component = document.getElementById("reviewStarsComponent");
        var raiting = this;

        const request = new XMLHttpRequest();
        const url = "http://apirrm/api/votes/1";

        //	Здесь нужно указать в каком формате мы будем принимать данные вот и все	отличие
        request.responseType = "json";
        request.open("GET", url);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        request.addEventListener("readystatechange", function () {
            if (request.readyState === 4 && request.status === 200) {
                var obj = request.response;
                raiting.count = obj.count;
                raiting.value = obj.value;

                raiting.component.querySelectorAll('.votes-count')[0].innerHTML = obj.count;
                document.getElementById("star-" + Math.floor(obj.value)).checked = true;
            }
        });

        request.send();

        if (getCookie('setRaiting')) {
            for (var i = 1; i <= 5; i++) {
                var raiting_btn = document.getElementById("star-" + i);
                raiting_btn.disabled = true;
            }
        }

        this._initUIActions;
    }

    Raiting.prototype._initUIActions = function () {
    }

    /**
     * Add SimpleAlert to global namespace
     */
    window.Raiting = Raiting;

})(window);

// EVENTS
//
// Код для создания нового экземпляра объекта
// и .
////////////////////////////////////////////////////////////
;(function () {
    var raitingComponent = new Raiting();

    for (var i = 1; i <= 5; i++) {
        var raiting_btn = document.getElementById("star-" + i);

        raiting_btn.addEventListener("click", function () {
            if (getCookie('setRaiting')) {
                return
            }
            console.log('click');
            const request = new XMLHttpRequest();
            var data = {};
            data.val = this.dataset.val;

            var json = JSON.stringify(data);
            const url = "http://apirrm/api/votes/1";
            //
            // //	Здесь нужно указать в каком формате мы будем принимать данные вот и все	отличие
            // request.responseType = "json";
            request.open("PUT", url);
            // request.setRequestHeader("Content-Type", "application/json");
            // request.setRequestHeader("Access-Control-Allow-Origin", "*");
            // request.setRequestHeader("Access-Control-Allow-Methods", "PUT");
            // request.setRequestHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
            //
            request.addEventListener("readystatechange", function () {
                if (request.readyState === 4 && request.status === 200) {
                    var obj = request.response;
                    setCookie('setRaiting', 1, {path: window.location});
                    raitingComponent._init();
                    delete window["raitingComponent"];

                }
            });

            request.send(json);

        });
    }


})();