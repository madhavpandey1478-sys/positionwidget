(function () {

    "use strict";

    /* =========================================================
       POSITION ENTRY - SAC CUSTOM WIDGET
       Create Position only
       ========================================================= */

    var template = document.createElement("template");

    template.innerHTML = `

        <style>

            /* =================================================
               HOST
               ================================================= */

            :host {
                display: block;
                width: 100%;
                height: 100%;
                min-height: 300px;

                font-family:
                    "72",
                    "72full",
                    Arial,
                    Helvetica,
                    sans-serif;

                color: #1d2d3e;

                --blue: #0a6ed1;
                --blue-dark: #0854a0;
                --blue-light: #eaf3fc;

                --border: #d7e0e8;
                --border-dark: #c4d0db;

                --header: #eef4fa;
                --surface: #ffffff;
                --surface-soft: #f7f9fb;

                --text: #1d2d3e;
                --muted: #687b8d;

                --warning: #fff8df;

                box-sizing: border-box;
            }


            * {
                box-sizing: border-box;
            }


            /* =================================================
               MAIN CONTAINER
               ================================================= */

            .container {

                width: 100%;
                height: 100%;

                min-height: 300px;

                display: flex;
                flex-direction: column;

                background: var(--surface);

                border: 1px solid var(--border);

                border-radius: 10px;

                overflow: hidden;

                box-shadow:
                    0 1px 3px rgba(0, 0, 0, 0.06),
                    0 4px 12px rgba(0, 0, 0, 0.04);

            }


            /* =================================================
               TOOLBAR
               ================================================= */

            .toolbar {

                min-height: 58px;

                display: flex;

                align-items: center;

                justify-content: flex-end;

                gap: 8px;

                padding:
                    10px 14px;

                background:
                    linear-gradient(
                        to bottom,
                        #fbfcfd,
                        #f7f9fb
                    );

                border-bottom:
                    1px solid var(--border);

            }


            /* =================================================
               BUTTONS
               ================================================= */

            button {

                height: 36px;

                padding:
                    0 15px;

                border:
                    1px solid #b8c8d8;

                border-radius: 7px;

                background: #ffffff;

                color: var(--blue);

                font-family: inherit;

                font-size: 12px;

                font-weight: 600;

                letter-spacing: 0.1px;

                cursor: pointer;

                transition:
                    background 0.15s ease,
                    border-color 0.15s ease,
                    box-shadow 0.15s ease,
                    transform 0.05s ease;

                white-space: nowrap;

            }


            button:hover {

                background:
                    #f0f7fd;

                border-color:
                    #8eb9df;

                box-shadow:
                    0 1px 3px rgba(
                        0,
                        0,
                        0,
                        0.08
                    );

            }


            button:active {

                transform:
                    translateY(1px);

            }


            button:focus-visible {

                outline:
                    2px solid rgba(
                        10,
                        110,
                        209,
                        0.25
                    );

                outline-offset: 1px;

            }


            button.primary {

                color: #ffffff;

                background:
                    var(--blue);

                border-color:
                    var(--blue);

                box-shadow:
                    0 1px 3px rgba(
                        10,
                        110,
                        209,
                        0.22
                    );

            }


            button.primary:hover {

                background:
                    var(--blue-dark);

                border-color:
                    var(--blue-dark);

            }


            button.delete {

                color: #bb0000;

                border-color:
                    #e4b2b2;

                background:
                    #fffafa;

            }


            button.delete:hover {

                background:
                    #fff0f0;

                border-color:
                    #d98c8c;

            }


            /* =================================================
               TABLE AREA
               ================================================= */

            .table-area {

                flex: 1;

                min-height: 0;

                overflow: auto;

                background:
                    #ffffff;

                scrollbar-width:
                    thin;

                scrollbar-color:
                    #aebdca #f2f5f7;

            }


            .table-area::-webkit-scrollbar {

                width: 10px;
                height: 10px;

            }


            .table-area::-webkit-scrollbar-track {

                background:
                    #f3f6f8;

            }


            .table-area::-webkit-scrollbar-thumb {

                background:
                    #b5c2cd;

                border-radius:
                    8px;

                border:
                    2px solid #f3f6f8;

            }


            .table-area::-webkit-scrollbar-thumb:hover {

                background:
                    #9eafbd;

            }


            /* =================================================
               TABLE
               ================================================= */

            table {

                border-collapse:
                    separate;

                border-spacing:
                    0;

                table-layout:
                    fixed;

                min-width:
                    2050px;

                width:
                    2050px;

            }


            /* =================================================
               HEADER
               ================================================= */

            th {

                position:
                    sticky;

                top:
                    0;

                z-index:
                    5;

                height:
                    42px;

                padding:
                    0 9px;

                background:
                    var(--header);

                color:
                    #29465f;

                border-right:
                    1px solid #d4dfe8;

                border-bottom:
                    1px solid #cbd8e3;

                font-size:
                    11px;

                font-weight:
                    700;

                text-align:
                    left;

                white-space:
                    nowrap;

                vertical-align:
                    middle;

            }


            th:first-child {

                border-left:
                    0;

            }


            /* =================================================
               BODY CELLS
               ================================================= */

            td {

                height:
                    54px;

                padding:
                    7px 8px;

                background:
                    #ffffff;

                border-right:
                    1px solid #dbe3ea;

                border-bottom:
                    1px solid #dbe3ea;

                vertical-align:
                    middle;

            }


            tr:hover td {

                background:
                    #f9fbfd;

            }


            tr.selected-row td {

                background:
                    var(--warning);

            }


            tr.selected-row:hover td {

                background:
                    #fff6d1;

            }


            /* =================================================
               INPUTS
               ================================================= */

            input.cell,
            select.cell {

                width:
                    100%;

                height:
                    34px;

                padding:
                    0 9px;

                border:
                    1px solid #bfd0df;

                border-radius:
                    6px;

                background:
                    #ffffff;

                color:
                    #253746;

                font-family:
                    inherit;

                font-size:
                    12px;

                outline:
                    none;

                transition:
                    border-color 0.15s ease,
                    box-shadow 0.15s ease,
                    background 0.15s ease;

            }


            input.cell::placeholder {

                color:
                    #8797a6;

                opacity:
                    1;

            }


            input.cell:hover,
            select.cell:hover {

                border-color:
                    #9fb5c8;

            }


            input.cell:focus,
            select.cell:focus {

                border-color:
                    var(--blue);

                box-shadow:
                    0 0 0 2px rgba(
                        10,
                        110,
                        209,
                        0.10
                    );

            }


            input.cell.readonly {

                background:
                    #f1f4f7;

                color:
                    #607487;

                cursor:
                    not-allowed;

            }


            input.cell[type="date"] {

                padding-right:
                    7px;

            }


            /* =================================================
               SELECT
               ================================================= */

            select.cell {

                appearance:
                    auto;

                cursor:
                    pointer;

            }


            select.cell option {

                color:
                    #253746;

                background:
                    #ffffff;

            }


            /* =================================================
               CHECKBOX
               ================================================= */

            .checkbox-cell {

                width:
                    50px;

                min-width:
                    50px;

                max-width:
                    50px;

                padding:
                    0;

                text-align:
                    center;

            }


            .checkbox {

                width:
                    18px;

                height:
                    18px;

                margin:
                    0;

                cursor:
                    pointer;

                accent-color:
                    var(--blue);

                vertical-align:
                    middle;

            }


            /* =================================================
               STATUS BAR
               ================================================= */

            .status {

                min-height:
                    36px;

                height:
                    36px;

                display:
                    flex;

                align-items:
                    center;

                gap:
                    22px;

                padding:
                    0 12px;

                background:
                    #f7f9fb;

                border-top:
                    1px solid var(--border);

                color:
                    #5f7284;

                font-size:
                    11px;

                white-space:
                    nowrap;

            }


            .status-item {

                display:
                    inline-flex;

                align-items:
                    center;

                gap:
                    4px;

            }


            .status-value {

                color:
                    #314a60;

                font-weight:
                    700;

            }


            /* =================================================
               VALIDATION STATUS
               ================================================= */

            .status-value.valid {

                color:
                    #107e3e;

            }


            .status-value.invalid {

                color:
                    #bb0000;

            }


            /* =================================================
               EMPTY STATE
               ================================================= */

            .empty-message {

                padding:
                    30px;

                text-align:
                    center;

                color:
                    #728495;

                font-size:
                    12px;

            }

        </style>


        <div class="container">

            <!-- =================================================
                 TOOLBAR
                 ================================================= -->

            <div class="toolbar">

                <button
                    id="addButton"
                    type="button"
                >
                    Add Row
                </button>


                <button
                    id="copyButton"
                    type="button"
                >
                    Copy
                </button>


                <button
                    id="deleteButton"
                    class="delete"
                    type="button"
                    style="display:none;"
                >
                    Delete Selected
                </button>


                <button
                    id="validateButton"
                    type="button"
                >
                    Validate
                </button>


                <button
                    id="approvalButton"
                    class="primary"
                    type="button"
                >
                    Send for Approval
                </button>


                <button
                    id="clearButton"
                    type="button"
                >
                    Clear
                </button>

            </div>


            <!-- =================================================
                 TABLE
                 ================================================= -->

            <div class="table-area">

                <table>

                    <thead>

                        <tr>

                            <th
                                class="checkbox-cell"
                                title="Select all"
                            >

                                <input
                                    id="selectAll"
                                    class="checkbox"
                                    type="checkbox"
                                >

                            </th>


                            <th style="width:120px;">
                                Company Code
                            </th>


                            <th style="width:125px;">
                                Division
                            </th>


                            <th style="width:145px;">
                                Department
                            </th>


                            <th style="width:135px;">
                                Cost Center
                            </th>


                            <th style="width:125px;">
                                Job Code
                            </th>


                            <th style="width:190px;">
                                Position Title
                            </th>


                            <th style="width:135px;">
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


                            <th style="width:125px;">
                                Nationality
                            </th>


                            <th style="width:140px;">
                                Accommodation
                            </th>


                            <th style="width:115px;">
                                Transport
                            </th>


                            <th style="width:135px;">
                                Employee Class
                            </th>


                            <th style="width:105px;">
                                Overtime
                            </th>


                            <th style="width:140px;">
                                Special Approval
                            </th>


                            <th style="width:220px;">
                                Comment
                            </th>

                        </tr>

                    </thead>


                    <tbody id="tbody"></tbody>

                </table>

            </div>


            <!-- =================================================
                 STATUS
                 ================================================= -->

            <div class="status">

                <span class="status-item">

                    Total Rows:

                    <span
                        id="rowCount"
                        class="status-value"
                    >
                        1
                    </span>

                </span>


                <span class="status-item">

                    Selected Rows:

                    <span
                        id="selectedCount"
                        class="status-value"
                    >
                        0
                    </span>

                </span>


                <span class="status-item">

                    Validation:

                    <span
                        id="validationStatus"
                        class="status-value"
                    >
                        -
                    </span>

                </span>


                <span class="status-item">

                    Error Rows:

                    <span
                        id="errorCount"
                        class="status-value"
                    >
                        0
                    </span>

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
               INTERNAL DATA
               ================================================= */

            this._rows = [];

            this._rowOptions = {};

            this._lastEvent = "";

            this._status = "READY";

            this._validation = null;


            /* =================================================
               IMPORTANT:
               START WITH ONE ROW
               ================================================= */

            this._rows.push(
                this._createEmptyRow()
            );


            /* =================================================
               BIND UI
               ================================================= */

            this._bindButtons();

            this._render();

        }


        /* =====================================================
           CREATE EMPTY ROW
           ===================================================== */

        _createEmptyRow() {

            return {

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

            };

        }


        /* =====================================================
           BUTTON BINDINGS
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

                        this._validate();

                    }
                );


            /* SEND FOR APPROVAL */

            this.shadowRoot
                .getElementById("approvalButton")
                .addEventListener(
                    "click",
                    () => {

                        this._sendForApproval();

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

            this._rows.push(
                this._createEmptyRow()
            );


            this._status =
                "CHANGED";


            this._validation =
                null;


            this._render();


            this._emit(
                "onDataEntry",
                "addRow|" +
                (this._rows.length - 1)
            );

        }


        /* =====================================================
           COPY SELECTED ROWS
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

                    var newRow =
                        JSON.parse(
                            JSON.stringify(
                                this._rows[i]
                            )
                        );


                    newRow.selected =
                        false;


                    /*
                     * Position ID should not be
                     * copied as a final ID.
                     */

                    newRow.employeeId =
                        "";


                    newRow.isModified =
                        false;


                    copied.push(
                        newRow
                    );

                }

            }


            if (
                copied.length === 0
            ) {

                return;

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


            this._status =
                "CHANGED";


            this._validation =
                null;


            this._render();


            this._emit(
                "onDataEntry",
                "copy|" +
                copied.length
            );

        }


        /* =====================================================
           DELETE SELECTED ROWS
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


            /*
             * Always leave one empty row
             * in the widget.
             */

            if (
                this._rows.length === 0
            ) {

                this._rows.push(
                    this._createEmptyRow()
                );

            }


            this._status =
                "CHANGED";


            this._validation =
                null;


            this._render();


            this._emit(
                "onDataEntry",
                "delete|" +
                deleted
            );

        }


        /* =====================================================
           CLEAR SELECTED ROW DATA
           ===================================================== */

        _clear() {

            var cleared =
                0;


            for (
                var i = 0;
                i < this._rows.length;
                i++
            ) {

                var row =
                    this._rows[i];


                if (
                    row.selected === true
                ) {

                    this._clearRow(
                        row
                    );


                    /*
                     * IMPORTANT:
                     * Keep row.
                     * Untick checkbox.
                     */

                    row.selected =
                        false;


                    cleared++;

                }

            }


            if (
                cleared === 0
            ) {

                return;

            }


            this._status =
                "CLEARED";


            this._validation =
                null;


            this._render();


            this._emit(
                "onClear",
                "clear|" +
                cleared
            );

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

            row.isModified =
                true;

        }


        /* =====================================================
           VALIDATE
           ===================================================== */

        _validate() {

            /*
             * Business validation rules will be
             * added once the mandatory fields are
             * confirmed.
             *
             * For now this performs a basic
             * populated-row check.
             */

            var errorRows = 0;


            for (
                var i = 0;
                i < this._rows.length;
                i++
            ) {

                var row =
                    this._rows[i];


                var hasData =
                    this._rowHasData(
                        row
                    );


                if (
                    hasData === false
                ) {

                    continue;

                }


                /*
                 * Basic mandatory fields.
                 */

                if (
                    !row.companyCode ||
                    !row.division ||
                    !row.department ||
                    !row.costCenter ||
                    !row.jobCode ||
                    !row.positionTitle
                ) {

                    errorRows++;

                }

            }


            if (
                errorRows === 0
            ) {

                this._validation =
                    true;

                this._status =
                    "VALID";

                this._emit(
                    "onValidate",
                    "VALID|0"
                );

            } else {

                this._validation =
                    false;

                this._status =
                    "INVALID";

                this._emit(
                    "onValidate",
                    "INVALID|" +
                    errorRows
                );

            }


            this._updateStatus();

        }


        /* =====================================================
           CHECK IF ROW CONTAINS DATA
           ===================================================== */

        _rowHasData(row) {

            var fields = [

                "companyCode",
                "division",
                "department",
                "costCenter",
                "jobCode",
                "positionTitle",
                "employeeId",
                "payGradeGroup",
                "payGradeLevel",
                "hireDate",
                "nationality",
                "accommodation",
                "transport",
                "employeeClass",
                "overtime",
                "specialApproval",
                "comment"

            ];


            for (
                var i = 0;
                i < fields.length;
                i++
            ) {

                if (
                    row[fields[i]] !== "" &&
                    row[fields[i]] !== null &&
                    row[fields[i]] !== undefined
                ) {

                    return true;

                }

            }


            return false;

        }


        /* =====================================================
           SEND FOR APPROVAL
           ===================================================== */

        _sendForApproval() {

            this._emit(
                "onSendForApproval",
                "sendForApproval"
            );

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


            tbody.innerHTML =
                "";


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

            this._updateSelectAll();

            this._updateStatus();

        }


        /* =====================================================
           CREATE TABLE ROW
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
                    rowIndex,
                    false,
                    "select"
                )}


                ${this._cell(
                    "division",
                    row.division,
                    rowIndex,
                    false,
                    "select"
                )}


                ${this._cell(
                    "department",
                    row.department,
                    rowIndex,
                    false,
                    "select"
                )}


                ${this._cell(
                    "costCenter",
                    row.costCenter,
                    rowIndex,
                    false,
                    "select"
                )}


                ${this._cell(
                    "jobCode",
                    row.jobCode,
                    rowIndex,
                    false,
                    "select"
                )}


                ${this._cell(
                    "positionTitle",
                    row.positionTitle,
                    rowIndex,
                    false,
                    "text"
                )}


                ${this._cell(
                    "employeeId",
                    row.employeeId,
                    rowIndex,
                    true,
                    "text"
                )}


                ${this._cell(
                    "payGradeGroup",
                    row.payGradeGroup,
                    rowIndex,
                    false,
                    "select"
                )}


                ${this._cell(
                    "payGradeLevel",
                    row.payGradeLevel,
                    rowIndex,
                    false,
                    "select"
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
                    rowIndex,
                    false,
                    "select"
                )}


                ${this._cell(
                    "accommodation",
                    row.accommodation,
                    rowIndex,
                    false,
                    "select"
                )}


                ${this._cell(
                    "transport",
                    row.transport,
                    rowIndex,
                    false,
                    "select"
                )}


                ${this._cell(
                    "employeeClass",
                    row.employeeClass,
                    rowIndex,
                    false,
                    "select"
                )}


                ${this._cell(
                    "overtime",
                    row.overtime,
                    rowIndex,
                    false,
                    "select"
                )}


                ${this._cell(
                    "specialApproval",
                    row.specialApproval,
                    rowIndex,
                    false,
                    "select"
                )}


                ${this._cell(
                    "comment",
                    row.comment,
                    rowIndex,
                    false,
                    "text"
                )}

            `;


            this._attachRowEvents(
                tr,
                rowIndex
            );


            return tr;

        }


        /* =====================================================
           CREATE CELL
           ===================================================== */

        _cell(
            field,
            value,
            rowIndex,
            readonly,
            type
        ) {

            /*
             * Get options assigned through
             * setRowOptions().
             */

            var options = [];

            if (
                this._rowOptions[rowIndex] &&
                this._rowOptions[rowIndex][field]
            ) {

                options =
                    this._rowOptions[rowIndex][field];

            }


            if (
                type === "select"
            ) {

                var optionHTML =
                    `<option value="">Select</option>`;


                for (
                    var i = 0;
                    i < options.length;
                    i++
                ) {

                    var option =
                        options[i];


                    var optionValue =
                        typeof option === "object"
                            ? option.value
                            : option;


                    var optionText =
                        typeof option === "object"
                            ? (
                                option.text !== undefined
                                    ? option.text
                                    : option.value
                              )
                            : option;


                    optionHTML += `

                        <option
                            value="${this._escape(
                                optionValue
                            )}"
                            ${
                                String(
                                    optionValue
                                ) === String(
                                    value
                                )
                                    ? "selected"
                                    : ""
                            }
                        >
                            ${this._escape(
                                optionText
                            )}
                        </option>

                    `;

                }


                return `

                    <td>

                        <select
                            class="cell"
                            data-field="${field}"
                        >

                            ${optionHTML}

                        </select>

                    </td>

                `;

            }


            return `

                <td>

                    <input
                        class="cell ${
                            readonly
                                ? "readonly"
                                : ""
                        }"
                        type="${type || "text"}"
                        data-field="${field}"
                        value="${this._escape(
                            value
                        )}"
                        ${
                            readonly
                                ? "readonly"
                                : ""
                        }
                    >

                </td>

            `;

        }


        /* =====================================================
           ROW EVENT HANDLING
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
                var i = 0;
                i < controls.length;
                i++
            ) {

                var control =
                    controls[i];


                var field =
                    control.dataset.field;


                /* =============================================
                   CHECKBOX
                   ============================================= */

                if (
                    field === "selected"
                ) {

                    control.addEventListener(
                        "change",
                        (event) => {

                            var checked =
                                event.target.checked;


                            this._rows[rowIndex].selected =
                                checked;


                            this._status =
                                "CHANGED";


                            this._updateCounts();

                            this._updateDeleteButton();

                            this._updateSelectAll();


                            if (
                                checked
                            ) {

                                tr.classList.add(
                                    "selected-row"
                                );

                            } else {

                                tr.classList.remove(
                                    "selected-row"
                                );

                            }


                            this._emit(
                                "onDataEntry",
                                "select|" +
                                rowIndex +
                                "|" +
                                checked
                            );

                        }
                    );


                    continue;

                }


                /* =============================================
                   NORMAL FIELD
                   ============================================= */

                control.addEventListener(
                    "change",
                    () => {

                        this._rows[rowIndex][field] =
                            control.value;


                        this._rows[rowIndex].isModified =
                            true;


                        this._status =
                            "CHANGED";


                        this._validation =
                            null;


                        this._updateStatus();


                        /*
                         * Field-specific event
                         */

                        this._emit(
                            "onFieldChange",
                            "fieldChange|" +
                            rowIndex +
                            "|" +
                            field +
                            "|" +
                            control.value
                        );


                        /*
                         * General data-entry event
                         */

                        this._emit(
                            "onDataEntry",
                            "dataEntry|" +
                            rowIndex +
                            "|" +
                            field +
                            "|" +
                            control.value
                        );

                    }
                );

            }

        }


        /* =====================================================
           DELETE BUTTON VISIBILITY
           ===================================================== */

        _updateDeleteButton() {

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


            var button =
                this.shadowRoot
                    .getElementById(
                        "deleteButton"
                    );


            button.style.display =
                selected > 0
                    ? "inline-flex"
                    : "none";

        }


        /* =====================================================
           SELECT ALL
           ===================================================== */

        _updateSelectAll() {

            var checkbox =
                this.shadowRoot
                    .getElementById(
                        "selectAll"
                    );


            if (
                this._rows.length === 0
            ) {

                checkbox.checked =
                    false;

                checkbox.indeterminate =
                    false;

                return;

            }


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


            checkbox.checked =
                selected ===
                this._rows.length;


            checkbox.indeterminate =
                selected > 0 &&
                selected <
                this._rows.length;

        }


        /* =====================================================
           COUNTS
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

        }


        /* =====================================================
           STATUS
           ===================================================== */

        _updateStatus() {

            var validation =
                this.shadowRoot
                    .getElementById(
                        "validationStatus"
                    );


            var errorCount =
                this.shadowRoot
                    .getElementById(
                        "errorCount"
                    );


            validation.classList.remove(
                "valid",
                "invalid"
            );


            if (
                this._validation === true
            ) {

                validation.textContent =
                    "true";

                validation.classList.add(
                    "valid"
                );


                errorCount.textContent =
                    "0";

            } else if (
                this._validation === false
            ) {

                validation.textContent =
                    "false";

                validation.classList.add(
                    "invalid"
                );


                /*
                 * Error count will be calculated
                 * during validation.
                 */

                var errors =
                    this._getValidationErrorCount();


                errorCount.textContent =
                    errors;

            } else {

                validation.textContent =
                    "-";

                errorCount.textContent =
                    "0";

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
                    this._getSelectedCount();

        }


        /* =====================================================
           GET SELECTED COUNT
           ===================================================== */

        _getSelectedCount() {

            var count =
                0;


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


            return count;

        }


        /* =====================================================
           VALIDATION ERROR COUNT
           ===================================================== */

        _getValidationErrorCount() {

            var errors =
                0;


            for (
                var i = 0;
                i < this._rows.length;
                i++
            ) {

                var row =
                    this._rows[i];


                if (
                    !this._rowHasData(
                        row
                    )
                ) {

                    continue;

                }


                if (
                    !row.companyCode ||
                    !row.division ||
                    !row.department ||
                    !row.costCenter ||
                    !row.jobCode ||
                    !row.positionTitle
                ) {

                    errors++;

                }

            }


            return errors;

        }


        /* =====================================================
           EVENT EMITTER
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

                var parsed;


                if (
                    typeof data === "string"
                ) {

                    parsed =
                        JSON.parse(
                            data
                        );

                } else {

                    parsed =
                        data;

                }


                if (
                    Array.isArray(
                        parsed
                    )
                ) {

                    this._rows =
                        parsed;

                } else {

                    this._rows = [];

                }


                /*
                 * Never allow completely empty
                 * widget on load.
                 */

                if (
                    this._rows.length === 0
                ) {

                    this._rows.push(
                        this._createEmptyRow()
                    );

                }


                this._render();

            } catch (
                error
            ) {

                this._rows = [

                    this._createEmptyRow()

                ];


                this._render();

            }

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
                !this._rows[rowIndex]
            ) {

                return;

            }


            this._rows[rowIndex][fieldName] =
                value;


            this._rows[rowIndex].isModified =
                true;


            this._validation =
                null;


            this._render();

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
                        ? JSON.parse(
                            options
                          )
                        : options;


                /*
                 * Re-render so new options
                 * immediately appear.
                 */

                this._render();

            } catch (
                error
            ) {

                this._rowOptions[rowIndex][fieldName] =
                    [];

            }

        }


        /* =====================================================
           ESCAPE HTML
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
