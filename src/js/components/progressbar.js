// COMPONENT
//
// The building blocks for our SimpleAlert component.
////////////////////////////////////////////////////////////
;(function( window ) {

    'use strict';

    /**
     * SimpleAlert function
     */
    function Progressbar( value ) {
        this.value = value;
        this._init();
    }

    /**
     * Инициализация компонента
     */
    Progressbar.prototype._init = function() {
        this.component = document.getElementById("brogressbarComponent");
        var valueBlock = this.component.querySelectorAll('div span.progress-bar-fill');
        var newVal = Number(valueBlock[0].dataset.progressVal) + Number(this.value);
        newVal = newVal <= 100 ? newVal : 100;
        valueBlock[0].innerHTML = newVal + '%';
        valueBlock[0].dataset.progressVal = newVal;
        valueBlock[0].style.width = newVal + '%';

        console.log(newVal);
        this._initUIActions;
    }

    Progressbar.prototype._initUIActions = function() {

    }

    /**
     * Добавляем SimpleAlert в глобальную область видимости
     */
    window.Progressbar = Progressbar;

})( window );


// EVENTS
//
// Код для создания новых экземпляров объекта
// в зависимости от нажатой кнопки.
////////////////////////////////////////////////////////////
;(function() {

    /**
     * Show default
     */
    var go_btn = document.getElementById( "go" );
    go_btn.addEventListener( "click", function() {
        const select = document.getElementById("selectProgressbar");

        var default_progressbar = new Progressbar(select.options[select.selectedIndex].value);
    } );

})();