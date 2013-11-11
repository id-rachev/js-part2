var controls = (function () {

    function hidePrev(item) {
        var prev = item.previousElementSibling;
        while (prev) {
            var subList = prev.querySelector("ul");
            if (subList) {
                sublist.style.display = "none";
            }
            prev = previousElementSibling;
        }
    }


    function Accordion(selector) {
        var items = [];
        var accItem = document.querySelector(selector);

        accItem.addEventListener("click",
            function (ev) {
                if (!ev) {
                    ev = window.event;
                }
                ev.stopPropagation();
                ev.preventDefault();

                //anchor
                var clickedItem = ev.target;
                if (!(clickedItem instanceof HTMLAnchorElement)) {
                    return;
                }

                hidePrev(clickedItem.parentNode);
                hideNext(clickedItem.parentNode);

                var sublist = clickedItem.nextElementSibling;
                if (!sublist) {
                    return;
                }
                if (sublist.style.display === "none") {
                    sublist.style.display = "";
                }
                else {
                    sublist.style.display = "none";
                }

                var liItem = clickedItem.parentNode;
                var list = liItem.parentNode;
                var node = list.firstChild;
                while (node) {
                    node.getElementsByTagName("ul")[0].style.display = "none";
                    node = node.nextElementSibling;
                }



            }, false);

        var itemsList = document.createElement("ul");

        this.add = function (title) {
            var newItem = new Item(title);
            items.push(newItem);
            return newItem;
        }

        this.render = function () {
            while (accItem.firstChild) {
                accItem.removeChild(accItem.firstChild);
            }

            while (itemsList.firstChild) {
                itemsList.removeChild(itemsList.firstChild);
            }

            for (var i = 0; i < items.length; i++) {
                var domItem = items[i].render();
                itemsList.appendChild(domItem);
            }
            accItem.appendChild(itemsList);
            return this;
        };

        this.serialize = function () {

        }
    };

    function Item(title) {

        var items = [];

        this.add = function (title) {
            var newItem = new Item(title);
            items.push(newItem);
            return newItem;
        }

        this.render = function () {
            var itemNode = document.createElement("li");

            itemNode.innerHTML = '<a href="#">' + title + '</a>';

            if (items.length > 0) {
                var subList = document.createElement("ul");
                sublist.style.display = "none";
                for (var i = 0; i < items.length; i++) {
                    var subItem = items[i].render();
                    subList.appendChild(subItem);
                }
                itemNode.appendChild(subList);

            }
            return itemNode;
        };

        this.serialize = function () {
            var thisItem = {
                title: title
            };
            if (items.length > 0) {
                var serializedItems = [];
                for (var i = 0; i < items.length; i++) {
                    var serItem = items[i].serialize();
                    serializedItems.push(serItem);
                }
                thisItem.items = serializedItems;
            }
            return thisItem;
        }
    }

    function addItem(item, dataItem) {
        var accItem = item.add(dataItem.title);
        for (var i = 0; i < data.length; i++) {
            if (dataItem.items) {
                for (var i = 0; i < length; i++) {

                }
            }
        }
    }

    return {
        getAccordion: function (selector) {
            return new Accordion(selector);
        },
        buildAccordion: function (selector, data) {
            var accordion = this.getAccordion(selector);

            for (var i = 0; i < data.length; i++) {
                addItem(accordion, data[i]);
            }
        }
    };

}());