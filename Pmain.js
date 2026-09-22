(function () {

    "use strict";


    /* =========================================================
       POSITION ENTRY WIDGET
       ========================================================= */

    var template = document.createElement("template");

    template.innerHTML = `

        <style>

            :host {
                display: block;
                width: 100%;
                height: 100%;
                font-family: Arial, sans-serif;
            }

            * {
                box-sizing: border-box;
            }

            .container {
                width: 100%;
                height: 100%;
                border: 1px solid #d5dfe8;
                border-radius: 8px;
                background: white;
                display: flex;
                flex-direction: column;
                overflow: hidden;
            }

            .toolbar {
                height: 52px;
                min-height: 52px;
                background: #f6f9fc;
                border-bottom: 1px solid #d5dfe8;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                padding: 8px;
                gap: 8px;
            }

            button {
                height: 34px;
                padding: 0 14px;
                border: 1px solid #b8c9da;
                border-radius: 7px;
                background: white;
                color: #1769aa;
                font-size: 12px;
                font-weight: 600;
                cursor: pointer;
            }

            button:hover {
                background: #eef6fd;
            }

            .delete {
                color: #c62828;
                border-color: #dfaaaa;
            }

            .primary {
                color: white;
                background: #0878df;
                border-color: #0878df;
            }

            .tabs {
                height: 34px;
                min-height: 34px;
                display: flex;
                border-bottom: 1px solid #d5dfe8;
            }

            .tab {
                padding: 0 15px;
                display: flex;
                align-items: center;
                font-size: 12px;
                color: #52677a;
                cursor: pointer;
                border-bottom: 2px solid transparent;
            }

            .tab.active {
                color: #0878df;
                font-weight: 600;
                border-bottom-color: #0878df;
            }

            .table-area {
                flex: 1;
                overflow: auto;
            }

            table {
                border-collapse: collapse;
                table-layout: fixed;
                min-width: 1900px;
                width: 1900px;
            }

            th {
                height: 38px;
                background: #edf4fb;
                color: #294863;
                border: 1px solid #d2dee8;
                padding: 5px 7px;
                font-size: 11px;
                text-align: left;
                white-space: nowrap;
                position: sticky;
                top: 0;
                z-index: 2;
            }

            td {
                height: 46px;
                border: 1px solid #d8e1e9;
                padding: 5px;
                background: white;
            }

            tr.selected-row td {
                background: #fff9df;
            }

            input.cell,
            select.cell {
                width: 100%;
                height: 34px;
                border: 1px solid #c5d4e1;
                border-radius: 6px;
                padding: 0 7px;
                font-size: 11px;
                outline: none;
                background: white;
            }

            input.cell:focus,
            select.cell:focus {
                border-color: #0878df;
            }

            input.readonly {
                background: #f4f6f8;
            }

            .checkbox-cell {
                width: 50px;
                text-align: center;
            }

            .checkbox {
                width: 17px;
                height: 17px;
                cursor: pointer;
                accent-color: #0878df;
            }

            .status {
                height: 32px;
                min-height: 32px;
                background: #f6f9fc;
                border-top: 1px solid #d5dfe8;
                display: flex;
                align-items: center;
                gap: 20px;
                padding: 0 10px;
                font-size: 11px;
                color: #52677a;
            }

        </style>


        <div class="container">

            <div class="toolbar">

                <button id="addButton">
                    Add Row
                </button>

                <button id="copyButton">
                    Copy
                </button>

                <button
                    id="deleteButton"
                    class="delete"
                    style="display:none;">
                    Delete Selected
                </button>

                <button id="validateButton">
                    Validate
                </button>

                <button
                    id="approvalButton"
                    class="primary">
                    Send for Approval
                </button>

                <button id="clearButton">
                    Clear
                </button>

            </div>


            <div class="tabs">

                <div
                    id="createTab"
                    class="tab active">
                    Create Position
                </div>

                <div
                    id="manageTab"
                    class="tab">
                    Manage Position
                </div>

            </div>


            <div class="table-area">

                <table>

                    <thead>

                        <tr>

                            <th
                                class="checkbox-cell">

                                <input
                                    id="selectAll"
                                    class="checkbox"
                                    type="checkbox">

                            </th>

                            <th style="width:110px;">
                                Company Code
                            </th>

                            <th style="width:120px;">
                                Division
                            </th>

                            <th style="width:140px;">
                                Department
                            </th>

                            <th style="width:130px;">
                                Cost Center
                            </th>

                            <th style="width:120px;">
                                Job Code
                            </th>

                            <th style="width:180px;">
                                Position Title
                            </th>

                            <th style="width:130px;">
                                Position ID
                            </th>

                            <th style="width:110px;">
                                Pay Grade
                            </th>

                            <th style="width:90px;">
                                Level
                            </th>

                            <th style="width:125px;">
                                Hire Date
                            </th>

                            <th style="width:120px;">
                                Nationality
                            </th>

                            <th style="width:130px;">
                                Accommodation
                            </th>

                            <th style="width:110px;">
                                Transport
                            </th>

                            <th style="width:130px;">
                                Employee Class
                            </th>

                            <th style="width:100px;">
                                Overtime
                            </th>

                            <th style="width:130px;">
                                Special Approval
                            </th>

                            <th style="width:200px;">
                                Comment
                            </th>

                        </tr>

                    </thead>

                    <tbody id="tbody"></tbody>

                </table>

            </div>


            <div class="status">

                <span>
                    Rows:
                    <b id="rowCount">0</b>
                </span>

                <span>
                    Selected:
                    <b id="selectedCount">0</b>
                </span>

                <span>
                    Status:
                    <b id="statusText">READY</b>
                </span>

            </div>

        </div>
    `;


    /* =========================================================
       WEB COMPONENT
       ========================================================= */

    class PositionEntry extends HTMLElement {

        constructor() {

            super();

            this.attachShadow({
                mode: "open"
            });

            this.shadowRoot.appendChild(
                template.content.cloneNode(true)
            );


            /* =================================================
               DATA
               ================================================= */

            this._rows = [];

            this._lastEvent = "";

            this._status = "READY";

            this._activeCell = null;

            this._rowOptions = {};


            this._bindButtons();

            this._render();

        }


        /* =====================================================
           BUTTON EVENTS
           ===================================================== */

        _bindButtons() {


            /* ADD ROW */

            this.shadowRoot
                .getElementById("addButton")
                .addEventListener(
                    "click",
                    () => {

                        this._addRow();

                    }
                );


            /* COPY */

            this.shadowRoot
                .getElementById("copyButton")
                .addEventListener(
                    "click",
                    () => {

                        this._copyRows();

                    }
                );


            /* DELETE */

            this.shadowRoot
                .getElementById("deleteButton")
                .addEventListener(
                    "click",
                    () => {

                        this._deleteRows();

                    }
                );


            /* CLEAR */

            this.shadowRoot
                .getElementById("clearButton")
                .addEventListener(
                    "click",
                    () => {

                        this._clear();

                    }
                );


            /* VALIDATE */

            this.shadowRoot
                .getElementById("validateButton")
                .addEventListener(
                    "click",
                    () => {

                        this._emit(
                            "onValidate",
                            "validate"
                        );

                    }
                );


            /* APPROVAL */

            this.shadowRoot
                .getElementById("approvalButton")
                .addEventListener(
                    "click",
                    () => {

                        this._emit(
                            "onSendForApproval",
                            "sendForApproval"
                        );

                    }
                );


            /* SELECT ALL */

            this.shadowRoot
                .getElementById("selectAll")
                .addEventListener(
                    "change",
                    (event) => {

                        var checked =
                            event.target.checked;


                        for (
                            var i = 0;
                            i < this._rows.length;
                            i++
                        ) {

                            this._rows[i].selected =
                                checked;

                        }


                        this._status =
                            "CHANGED";


                        this._render();


                        this._emit(
                            "onDataEntry",
                            "selectAll|" +
                            checked
                        );

                    }
                );

        }


        /* =====================================================
           ADD ROW
           ===================================================== */

        _addRow() {

            this._rows.push({

                selected: false,

                companyCode: "",
                division: "",
                department: "",
                costCenter: "",
                jobCode: "",
                positionTitle: "",
                employeeId: "",
                payGradeGroup: "",
                payGradeLevel: "",
                hireDate: "",
                nationality: "",
                accommodation: "",
                transport: "",
                employeeClass: "",
                overtime: "",
                specialApproval: "",
                comment: "",

                isModified: false

            });


            this._status =
                "CHANGED";


            this._render();


            this._emit(
                "onDataEntry",
                "addRow|" +
                (this._rows.length - 1)
            );

        }


        /* =====================================================
           COPY
           ===================================================== */

        _copyRows() {

            var copied = [];


            for (
                var i = 0;
                i < this._rows.length;
                i++
            ) {

                if (
                    this._rows[i].selected === true
                ) {

                    var row =
                        JSON.parse(
                            JSON.stringify(
                                this._rows[i]
                            )
                        );


                    row.selected =
                        false;

                    row.employeeId =
                        "";

                    copied.push(
                        row
                    );

                }

            }


            for (
                var j = 0;
                j < copied.length;
                j++
            ) {

                this._rows.push(
                    copied[j]
                );

            }


            if (
                copied.length > 0
            ) {

                this._status =
                    "CHANGED";

                this._render();

            }

        }


        /* =====================================================
           DELETE ROWS
           ===================================================== */

        _deleteRows() {

            var remaining = [];

            var deleted = 0;


            for (
                var i = 0;
                i < this._rows.length;
                i++
            ) {

                if (
                    this._rows[i].selected === true
                ) {

                    deleted++;

                } else {

                    remaining.push(
                        this._rows[i]
                    );

                }

            }


            if (
                deleted === 0
            ) {

                return;

            }


            this._rows =
                remaining;


            this._activeCell =
                null;


            this._status =
                "CHANGED";


            this._render();


            this._emit(
                "onDataEntry",
                "delete|" +
                deleted
            );

        }


        /* =====================================================
           CLEAR
           ===================================================== */

       _clear() {

    var clearedCount = 0;

    /*
     * Clear ONLY selected rows.
     * Never delete the rows.
     */

    for (
        var i = 0;
        i < this._rows.length;
        i++
    ) {

        if (
            this._rows[i].selected === true
        ) {

            this._clearRow(
                this._rows[i]
            );

            clearedCount++;

        }

    }


    /*
     * Nothing selected
     */

    if (
        clearedCount === 0
    ) {

        this._status = "NO ROW SELECTED";

        this._render();

        return;

    }


    /*
     * Update status
     */

    this._status =
        "CLEARED";


    /*
     * Send event to SAC
     */

    this._emit(
        "onClear",
        "clear|" +
        clearedCount
    );


    /*
     * Re-render table.
     *
     * IMPORTANT:
     * We are NOT removing anything
     * from this._rows.
     */

    this._render();

}

        /* =====================================================
           CLEAR ROW DATA
           ===================================================== */

       _clearRow(row) {

    row.companyCode = "";
    row.division = "";
    row.department = "";
    row.costCenter = "";
    row.jobCode = "";
    row.positionTitle = "";
    row.employeeId = "";
    row.payGradeGroup = "";
    row.payGradeLevel = "";
    row.hireDate = "";
    row.nationality = "";
    row.accommodation = "";
    row.transport = "";
    row.employeeClass = "";
    row.overtime = "";
    row.specialApproval = "";
    row.comment = "";

    row.isModified = true;

}
        
        /* =====================================================
           RENDER
           ===================================================== */

        _render() {

            var tbody =
                this.shadowRoot
                    .getElementById(
                        "tbody"
                    );


            tbody.innerHTML = "";


            for (
                var i = 0;
                i < this._rows.length;
                i++
            ) {

                tbody.appendChild(
                    this._createRow(
                        this._rows[i],
                        i
                    )
                );

            }


            this._updateCounts();

            this._updateDeleteButton();

        }


        /* =====================================================
           CREATE ROW
           ===================================================== */

        _createRow(
            row,
            rowIndex
        ) {

            var tr =
                document.createElement(
                    "tr"
                );


            if (
                row.selected === true
            ) {

                tr.classList.add(
                    "selected-row"
                );

            }


            tr.innerHTML = `

                <td class="checkbox-cell">

                    <input
                        class="checkbox"
                        type="checkbox"
                        data-field="selected"
                        ${
                            row.selected
                                ? "checked"
                                : ""
                        }
                    >

                </td>


                ${this._cell(
                    "companyCode",
                    row.companyCode,
                    rowIndex
                )}

                ${this._cell(
                    "division",
                    row.division,
                    rowIndex
                )}

                ${this._cell(
                    "department",
                    row.department,
                    rowIndex
                )}

                ${this._cell(
                    "costCenter",
                    row.costCenter,
                    rowIndex
                )}

                ${this._cell(
                    "jobCode",
                    row.jobCode,
                    rowIndex
                )}

                ${this._cell(
                    "positionTitle",
                    row.positionTitle,
                    rowIndex
                )}

                ${this._cell(
                    "employeeId",
                    row.employeeId,
                    rowIndex,
                    true
                )}

                ${this._cell(
                    "payGradeGroup",
                    row.payGradeGroup,
                    rowIndex
                )}

                ${this._cell(
                    "payGradeLevel",
                    row.payGradeLevel,
                    rowIndex
                )}

                ${this._cell(
                    "hireDate",
                    row.hireDate,
                    rowIndex,
                    false,
                    "date"
                )}

                ${this._cell(
                    "nationality",
                    row.nationality,
                    rowIndex
                )}

                ${this._cell(
                    "accommodation",
                    row.accommodation,
                    rowIndex
                )}

                ${this._cell(
                    "transport",
                    row.transport,
                    rowIndex
                )}

                ${this._cell(
                    "employeeClass",
                    row.employeeClass,
                    rowIndex
                )}

                ${this._cell(
                    "overtime",
                    row.overtime,
                    rowIndex
                )}

                ${this._cell(
                    "specialApproval",
                    row.specialApproval,
                    rowIndex
                )}

                ${this._cell(
                    "comment",
                    row.comment,
                    rowIndex
                )}

            `;


            this._attachRowEvents(
                tr,
                rowIndex
            );


            return tr;

        }


        /* =====================================================
           CELL HTML
           ===================================================== */

        _cell(
            field,
            value,
            rowIndex,
            readonly,
            type
        ) {

            var inputType =
                type || "text";


            var readOnly =
                readonly
                    ? "readonly"
                    : "";


            var className =
                readonly
                    ? "cell readonly"
                    : "cell";


            return `

                <td>

                    <input
                        class="${className}"
                        type="${inputType}"
                        data-field="${field}"
                        value="${this._escape(
                            value
                        )}"
                        ${readOnly}
                    >

                </td>

            `;

        }


        /* =====================================================
           ROW EVENTS
           ===================================================== */

        _attachRowEvents(
            tr,
            rowIndex
        ) {

            var controls =
                tr.querySelectorAll(
                    "[data-field]"
                );


            for (
                let i = 0;
                i < controls.length;
                i++
            ) {

                let control =
                    controls[i];


                /*
                 * Remember active cell.
                 */

                if (
                    control.dataset.field !==
                    "selected"
                ) {

                    control.addEventListener(
                        "focus",
                        () => {

                            this._activeCell = {

                                rowIndex:
                                    rowIndex,

                                field:
                                    control.dataset.field

                            };

                        }
                    );


                    control.addEventListener(
                        "click",
                        () => {

                            this._activeCell = {

                                rowIndex:
                                    rowIndex,

                                field:
                                    control.dataset.field

                            };

                        }
                    );

                }


                /*
                 * Change event.
                 */

                control.addEventListener(
                    "change",
                    () => {

                        var field =
                            control.dataset.field;


                        /*
                         * Row checkbox.
                         */

                        if (
                            field === "selected"
                        ) {

                            this._rows[rowIndex].selected =
                                control.checked;


                            if (
                                control.checked
                            ) {

                                tr.classList.add(
                                    "selected-row"
                                );

                            } else {

                                tr.classList.remove(
                                    "selected-row"
                                );

                            }


                            this._status =
                                "CHANGED";


                            this._updateCounts();

                            this._updateDeleteButton();


                            this._emit(
                                "onDataEntry",
                                "select|" +
                                rowIndex +
                                "|" +
                                control.checked
                            );


                            return;

                        }


                        /*
                         * Normal field.
                         */

                        this._rows[rowIndex][field] =
                            control.value;


                        this._rows[rowIndex].isModified =
                            true;


                        this._activeCell = {

                            rowIndex:
                                rowIndex,

                            field:
                                field

                        };


                        this._status =
                            "CHANGED";


                        this._emit(
                            "onFieldChange",
                            "fieldChange|" +
                            rowIndex +
                            "|" +
                            field +
                            "|" +
                            control.value
                        );


                        this._updateCounts();

                    }
                );

            }

        }


        /* =====================================================
           UPDATE DELETE BUTTON
           ===================================================== */

        _updateDeleteButton() {

            var count = 0;


            for (
                var i = 0;
                i < this._rows.length;
                i++
            ) {

                if (
                    this._rows[i].selected === true
                ) {

                    count++;

                }

            }


            var button =
                this.shadowRoot
                    .getElementById(
                        "deleteButton"
                    );


            if (
                count > 0
            ) {

                button.style.display =
                    "block";

            } else {

                button.style.display =
                    "none";

            }

        }


        /* =====================================================
           UPDATE COUNTS
           ===================================================== */

        _updateCounts() {

            var selected =
                0;


            for (
                var i = 0;
                i < this._rows.length;
                i++
            ) {

                if (
                    this._rows[i].selected === true
                ) {

                    selected++;

                }

            }


            this.shadowRoot
                .getElementById(
                    "rowCount"
                )
                .textContent =
                    this._rows.length;


            this.shadowRoot
                .getElementById(
                    "selectedCount"
                )
                .textContent =
                    selected;


            this.shadowRoot
                .getElementById(
                    "statusText"
                )
                .textContent =
                    this._status;

        }


        /* =====================================================
           EVENT
           ===================================================== */

        _emit(
            name,
            value
        ) {

            this._lastEvent =
                String(value);


            this.dispatchEvent(
                new Event(name)
            );

        }


        /* =====================================================
           GET LAST EVENT
           ===================================================== */

        getLastEvent() {

            return this._lastEvent;

        }


        /* =====================================================
           GET DATA
           ===================================================== */

        getData() {

            return JSON.stringify(
                this._rows
            );

        }


        /* =====================================================
           SET DATA
           ===================================================== */

        setData(
            data
        ) {

            try {

                if (
                    typeof data === "string"
                ) {

                    this._rows =
                        JSON.parse(data);

                } else {

                    this._rows =
                        data || [];

                }

            } catch (e) {

                this._rows = [];

            }


            this._activeCell =
                null;


            this._render();

        }


        /* =====================================================
           SET CELL VALUE
           ===================================================== */

        setCellValue(
            rowIndex,
            fieldName,
            value
        ) {

            if (
                this._rows[rowIndex]
            ) {

                this._rows[rowIndex][fieldName] =
                    value;

                this._render();

            }

        }


        /* =====================================================
           SET ROW OPTIONS
           ===================================================== */

        setRowOptions(
            rowIndex,
            fieldName,
            options
        ) {

            if (
                !this._rowOptions[rowIndex]
            ) {

                this._rowOptions[rowIndex] =
                    {};

            }


            try {

                this._rowOptions[rowIndex][fieldName] =
                    typeof options === "string"
                        ? JSON.parse(options)
                        : options;

            } catch (e) {

                this._rowOptions[rowIndex][fieldName] =
                    [];

            }

        }


        /* =====================================================
           MANAGE DATA
           ===================================================== */

        getManageData() {

            return JSON.stringify([]);

        }


        setManageData(
            data
        ) {

            /*
             * Reserved for Manage Position tab.
             */

        }


        setManageCellValue(
            rowIndex,
            fieldName,
            value
        ) {

            /*
             * Reserved for Manage Position tab.
             */

        }


        setManageRowOptions(
            rowIndex,
            fieldName,
            options
        ) {

            /*
             * Reserved for Manage Position tab.
             */

        }


        /* =====================================================
           ESCAPE
           ===================================================== */

        _escape(
            value
        ) {

            if (
                value === null ||
                value === undefined
            ) {

                return "";

            }


            return String(value)
                .replace(
                    /&/g,
                    "&amp;"
                )
                .replace(
                    /</g,
                    "&lt;"
                )
                .replace(
                    />/g,
                    "&gt;"
                )
                .replace(
                    /"/g,
                    "&quot;"
                )
                .replace(
                    /'/g,
                    "&#039;"
                );

        }

    }


    /* =========================================================
       REGISTER COMPONENT
       ========================================================= */

    if (
        !customElements.get(
            "com-madhav-positionentry"
        )
    ) {

        customElements.define(
            "com-madhav-positionentry",
            PositionEntry
        );

    }

})();
