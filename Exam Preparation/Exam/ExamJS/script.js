var controls = (function () {

    function GridView(selector) {
        var rowsColect = [];
        var gridHolder = document.querySelector(selector);

        gridHolder.addEventListener("click", function (ev) {
            if (!ev) {
                ev = window.event;
            }
            ev.stopPropagation();
            ev.preventDefault();

            var clickedRow = ev.target;
            if (clickedRow.parentNode.className != "sub-table-holder") {
                return;
            }
            var subTable = clickedRow.nextElementSibling;
            if (!subTable) {
                return;
            }

            if (subTable.style.display === "none") {
                subTable.style.display = "";
            }
            else {
                subTable.style.display = "none";
            }
        }, false);

        var tableNode = document.createElement("table");
        var isHeaderEmpty = true;

        this.addRow = function addRow() {
            var cells = Array.prototype.slice.call(arguments);
            var newRow = new Row(cells);
            rowsColect.push(newRow);
            return newRow;
        };

        this.addHeader = function addHeader() {
            var cells = Array.prototype.slice.call(arguments);
            var newRow = new Header(cells);
            if (isHeaderEmpty) {
                rowsColect.unshift(newRow);
                isHeaderEmpty = false;
            }
            return newRow;
        };

        this.render = function () {
            while (gridHolder.firstChild) {
                gridHolder.removeChild(gridHolder.firstChild);
            }
            var thisTable = tableNode.cloneNode(true);

            for (var i = 0; i < rowsColect.length; i += 1) {
                var rowItem = rowsColect[i].render();
                thisTable.appendChild(rowItem);
            }
            gridHolder.appendChild(thisTable);
            return this;
        };
    }

    function Row(cells) {
        var rows = [];

        this.getNestedGridView = function () { // get-NASTY-grid-view! :D
            var isTHeadEmpty = true;
            return {
                addRow: function () {
                    var cells = Array.prototype.slice.call(arguments);
                    var newRow = new Row(cells);
                    rows.push(newRow);
                    return newRow;
                },

                addHeader: function () {
                    var cells = Array.prototype.slice.call(arguments);
                    var newRow = new Header(cells);
                    if (isTHeadEmpty) {
                        rows.unshift(newRow);
                        isTHeadEmpty = false;
                    }
                    return newRow;
                }
            }
        }

        this.render = function () {
            var rowNode = document.createElement("tr");
            for (var i = 0; i < cells.length; i += 1) {
                rowNode.innerHTML += "<td>" + cells[i] + "</td>";
            }
            if (rows.length > 0) {
                var subTable = document.createElement("table");
                subTable.style.display = "none";
                for (var i = 0, len = rows.length; i < len; i += 1) {
                    var subRows = rows[i].render();
                    subTable.appendChild(subRows);
                }
                rowNode.appendChild(subTable);
                subTable.parentElement.className = "sub-table-holder";
            }
            return rowNode;
        };

    }

    function Header(cells) {

        this.render = function () {
            var headNode = document.createElement("tr");
            for (var i = 0; i < cells.length; i += 1) {
                headNode.innerHTML += "<th>" + cells[i] + "</th>";
            }
            return headNode;
        };

    }
    
    return {
        getGridView: function (selector) {
            return new GridView(selector);
        }
    }
}());