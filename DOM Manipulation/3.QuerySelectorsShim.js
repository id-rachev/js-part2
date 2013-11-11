(function () {
    'use strict';

    if (!document.querySelector || !document.querySelectorAll) {
        document.querySelectorAll = function (selector) {
            switch (selector.charAt(0)) {
                case "#": return document.getElementById(selector.substring(1, selector.length));
                case ".": return document.getElementsByClassName(selector.substring(1, selector.length));
                default: return document.getElementsByTagName(selector);
            }
        }

        document.querySelector = function (selector) {
            switch (selector.charAt(0)) {
                case "#": return document.getElementById(selector.substring(1, selector.length))[0];
                case ".": return document.getElementsByClassName(selector.substring(1, selector.length))[0];
                default: return document.getElementsByTagName(selector)[0];
            }
        }
    }
})();

