(function () {

    "use strict";

    /* =========================================================
       TEMPLATE
       ========================================================= */

    var template = document.createElement("template");

    template.innerHTML = `

        <style>

            :host {
                display: block;
                width: 100%;
                height: 100%;
                min-width: 900px;

                font-family:
                    "72",
                    "72full",
                    Arial,
                    Helvetica,
                    sans-serif;

                color: #1d2d3e;
                background: #ffffff;

                overflow: hidden;
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

                display: flex;
                flex-direction: column;

                background: #ffffff;

                border: 1px solid #d7e0e8;
                border-radius: 10px;

                overflow: hidden;

                box-shadow:
                    0 1px 3px rgba(0, 0, 0, 0.05);

            }


            /* =================================================
               TOOLBAR
               ================================================= */

            .toolbar {

                width: 100%;
                min-height: 58px;
                height: 58px;

                display: flex;
                align-items: center;
                justify-content: flex-end;

                gap: 9px;

                padding:
                    10px 14px;

                background:
                    linear-gradient(
                        to bottom,
                        #ffffff,
                        #f8fafc
                    );

                border-bottom:
                    1px solid #dce4eb;

            }


            .toolbar-spacer {

                flex: 1;

            }


            button {

                height: 36px;

                min-width: 82px;

                padding:
                    0 15px;

                border:
                    1px solid #b9c9d8;

                border-radius: 7px;

                background: #ffffff;

                color: #1268a8;

                font-family:
                    "72",
                    "72full",
                    Arial,
                    sans-serif;

                font-size: 13px;

                font-weight: 600;

                cursor: pointer;

                transition:
                    background 0.15s ease,
                    border-color 0.15s ease,
                    box-shadow 0.15s ease,
                    transform 0.05s ease;

                white-space: nowrap;

            }


            button:hover {

                background: #f1f7fc;

                border-color: #8eb5d5;

                box-shadow:
                    0 1px 3px rgba(0, 0, 0, 0.06);

            }


            button:active {

                transform: translateY(1px);

            }


            button.primary {

                color: #ffffff;

                background:
                    linear-gradient(
                        to bottom,
                        #0a83e6,
                        #0875d1
                    );

                border-color: #0875d1;

                box-shadow:
                    0 1px 2px rgba(0, 83, 160, 0.18);

            }


            button.primary:hover {

                background:
                    linear-gradient(
                        to bottom,
                        #0879d6,
                        #066bc2
                    );

                border-color: #066bc2;

            }


            button.delete {

                color: #bb1e2d;

                border-color: #e2b4b9;

                background: #ffffff;

            }


            button.delete:hover {

                background: #fff5f5;

                border-color: #d9858d;

            }


            /* =================================================
               TABLE AREA
               ================================================= */

            .table-area {

                flex: 1;

                min-height: 0;

                width: 100%;

                overflow: auto;

                background: #ffffff;

                scrollbar-width: thin;

            }


            /* =================================================
               TABLE
               ================================================= */

            table {

                border-collapse: separate;

                border-spacing: 0;

                table-layout: fixed;

                width: max-content;

                min-width: 2100px;

                background: #ffffff;

            }


            /* =================================================
               TABLE HEADER
               ================================================= */

            th {

                height: 43px;

                padding:
                    0 10px;

                background:
                    linear-gradient(
                        to bottom,
                        #f0f6fc,
                        #e8f1f9
                    );

                color: #193b5a;

                border-right:
                    1px solid #d3dee8;

                border-bottom:
                    1px solid #c9d8e5;

                font-size: 12px;

                font-weight: 700;

                text-align: left;

                white-space: nowrap;

                position: sticky;

                top: 0;

                z-index: 5;

                letter-spacing: 0.05px;

            }


            th:first-child {

                border-left:
                    1px solid #d3dee8;

            }


            /* =================================================
               TABLE BODY
               ================================================= */

            td {

                height: 58px;

                padding:
                    7px 9px;

                background: #ffffff;

                border-right:
                    1px solid #dfe6ed;

                border-bottom:
                    1px solid #dfe6ed;

                vertical-align: middle;

            }


            td:first-child {

                border-left:
                    1px solid #dfe6ed;

            }


            tr {

                transition:
                    background 0.12s ease;

            }


            tr:hover td {

                background: #f8fbfe;

            }


            tr.selected-row td {

                background:
                    #fff9e6;

            }


            tr.selected-row:hover td {

                background:
                    #fff6d7;

            }


            /* =================================================
               INPUTS
               ================================================= */

            input.cell,
            select.cell {

                width: 100%;

                height: 37px;

                padding:
                    0 10px;

                border:
                    1px solid #c4d3e0;

                border-radius: 6px;

                background: #ffffff;

                color: #1d2d3e;

                font-family:
                    "72",
                    "72full",
                    Arial,
                    sans-serif;

                font-size: 12px;

                outline: none;

                transition:
                    border-color 0.15s ease,
                    box-shadow 0.15s ease,
                    background 0.15s ease;

            }


            input.cell:hover,
            select.cell:hover {

                border-color:
                    #9db6ca;

            }


            input.cell:focus,
            select.cell:focus {

                border-color:
                    #0878d1;

                box-shadow:
                    0 0 0 2px rgba(
                        8,
                        120,
                        209,
                        0.12
                    );

                background:
                    #ffffff;

            }


            input.cell::placeholder {

                color: #8193a5;

            }


            input.readonly {

                background:
                    #f3f6f8;

                color:
                    #607487;

                cursor:
                    default;

            }


            input.readonly:focus {

                border-color:
                    #c4d3e0;

                box-shadow:
                    none;

            }


            /* =================================================
               SELECT
               ================================================= */

            select.cell {

                appearance: auto;

                cursor: pointer;

                padding-right: 7px;

            }


            /* =================================================
               CHECKBOX
               ================================================= */

            .checkbox-cell {

                width: 54px;

                min-width: 54px;

                text-align: center;

                padding:
                    0;

            }


            .checkbox {

                width: 18px;

                height: 18px;

                margin: 0;

                cursor: pointer;

                accent-color:
                    #0878d1;

                vertical-align: middle;

            }


            /* =================================================
               STATUS BAR
               ================================================= */

            .status {

                min-height: 36px;

                height: 36px;

                width: 100%;

                display: flex;

                align-items: center;

                gap: 24px;

                padding:
                    0 13px;

                background:
                    linear-gradient(
                        to bottom,
                        #f8fafc,
                        #f3f7fa
                    );

                border-top:
                    1px solid #d9e3eb;

                color:
                    #526b80;

                font-size:
                    11px;

                white-space:
                    nowrap;

            }


            .status-item {

                display: inline-flex;

                align-items: center;

                gap: 4px;

            }


            .status-label {

                color:
                    #60798d;

            }


            .status-value {

                color:
                    #263f55;

                font-weight:
                    600;

            }


            /* =================================================
               VALIDATION STATES
               ================================================= */

            input.error,
            select.error {

                border-color:
                    #d32f2f;

                background:
                    #fff7f7;

                box-shadow:
                    0 0 0 1px
                    rgba(211, 47, 47, 0.08);

            }


            /* =================================================
               SCROLLBAR
               ================================================= */

            .table-area::-webkit-scrollbar {

                width: 9px;
                height: 9px;

            }


            .table-area::-webkit-scrollbar-track {

                background: #f3f6f8;

            }


            .table-area::-webkit-scrollbar-thumb {

                background:
                    #b9c3cb;

                border-radius: 10px;

            }


            .table-area::-webkit-scrollbar-thumb:hover {

                background:
                    #929fa9;

            }


        </style>


        <div class="container">


            <!-- =============================================
                 TOOLBAR
                 ============================================= -->

            <div class="toolbar">

                <div class="toolbar-spacer"></div>


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


            <!-- =============================================
                 TABLE
                 ============================================= -->

            <div class="table-area">

                <table>

                    <thead>

                        <tr>

                            <th
                                class="checkbox-cell"
                                style="width:54px;"
                            >

                                <input
                                    id="selectAll"
                                    class="checkbox"
                                    type="checkbox"
                                    title="Select all rows"
                                >

                            </th>


                            <th style="width:150px;">
                                Company Code
                            </th>


                            <th style="width:145px;">
                                Division
                            </th>


                            <th style="width:175px;">
                                Department
                            </th>


                            <th style="width:160px;">
                                Cost Center
                            </th>


                            <th style="width:145px;">
                                Job Code
                            </th>


                            <th style="width:220px;">
                                Position Title
                            </th>


                            <th style="width:155px;">
                                Position ID
                            </th>


                            <th style="width:120px;">
                                Pay Grade
                            </th>


                            <th style="width:105px;">
                                Level
                            </th>


                            <th style="width:145px;">
                                Hire Date
                            </th>


                            <th style="width:150px;">
                                Nationality
                            </th>


                            <th style="width:165px;">
                                Accommodation
                            </th>


                            <th style="width:135px;">
                                Transport
                            </th>


                            <th style="width:165px;">
                                Employee Class
                            </th>


                            <th style="width:125px;">
                                Overtime
                            </th>


                            <th style="width:165px;">
                                Special Approval
                            </th>


                            <th style="width:240px;">
                                Comment
                            </th>

                        </tr>

                    </thead>


                    <tbody id="tbody"></tbody>

                </table>

            </div>


            <!-- =============================================
                 STATUS
                 ============================================= -->

            <div class="status">

                <span class="status-item">

                    <span class="status-label">
                        Total Rows:
                    </span>

                    <span
                        id="rowCount"
                        class="status-value"
                    >
                        1
                    </span>

                </span>


                <span class="status-item">

                    <span class="status-label">
                        Selected Rows:
                    </span>

                    <span
                        id="selectedCount"
                        class="status-value"
                    >
                        0
                    </span>

                </span>


                <span class="status-item">

                    <span class="status-label">
                        Status:
                    </span>

                    <span
                        id="statusText"
                        class="status-value"
                    >
                        READY
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


            /* =============================================
               INTERNAL DATA
               ============================================= */

            this._rows = [];

            this._rowOptions = {};

            this._lastEvent = "";

            this._status = "READY";


            /*
             * IMPORTANT:
             * Start with one blank row.
             */

            this._rows.push(
                this._createEmptyRow()
            );


            this._bindButtons();

            this._render();

        }


        /* =====================================================
           EMPTY ROW
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
                positionId: "",
                payGrade: "",
                level: "",
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

            this._rows.push(
                this._createEmptyRow()
            );


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

                    var row =
                        JSON.parse(
                            JSON.stringify(
                                this._rows[i]
                            )
                        );


                    row.selected =
                        false;


                    /*
                     * Position ID is unique,
                     * so do not copy it.
                     */

                    row.positionId =
                        "";


                    row.isModified =
                        false;


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


                this._emit(
                    "onDataEntry",
                    "copy|" +
                    copied.length
                );

            }

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
             * Always keep one blank row.
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


            this._render();


            this._emit(
                "onDataEntry",
                "delete|" +
                deleted
            );

        }


        /* =====================================================
           CLEAR SELECTED ROWS
           ===================================================== */

        _clear() {

            var clearedCount = 0;


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

                    /*
                     * Clear all data.
                     */

                    this._clearRow(
                        row
                    );


                    /*
                     * IMPORTANT:
                     * Do not delete row.
                     *
                     * Automatically untick.
                     */

                    row.selected =
                        false;


                    clearedCount++;

                }

            }


            if (
                clearedCount === 0
            ) {

                this._status =
                    "NO ROW SELECTED";


                this._render();

                return;

            }


            this._status =
                "CLEARED";


            this._render();


            this._emit(
                "onClear",
                "clear|" +
                clearedCount
            );

        }


        /* =====================================================
           CLEAR ONE ROW
           ===================================================== */

        _clearRow(row) {

            row.companyCode = "";

            row.division = "";

            row.department = "";

            row.costCenter = "";

            row.jobCode = "";

            row.positionTitle = "";

            row.positionId = "";

            row.payGrade = "";

            row.level = "";

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
             * Business validation rules can be added here
             * later.
             *
             * For now this checks whether there is at least
             * one row containing data.
             */

            var hasData =
                false;


            for (
                var i = 0;
                i < this._rows.length;
                i++
            ) {

                var row =
                    this._rows[i];


                if (
                    this._rowHasData(row)
                ) {

                    hasData =
                        true;

                    break;

                }

            }


            if (
                hasData
            ) {

                this._status =
                    "VALIDATED";

            } else {

                this._status =
                    "NO DATA";

            }


            this._render();


            this._emit(
                "onValidate",
                hasData
                    ? "VALID"
                    : "NO_DATA"
            );

        }


        /* =====================================================
           CHECK WHETHER ROW HAS DATA
           ===================================================== */

        _rowHasData(row) {

            var fields = [

                "companyCode",
                "division",
                "department",
                "costCenter",
                "jobCode",
                "positionTitle",
                "positionId",
                "payGrade",
                "level",
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
                    row[fields[i]] !== null &&
                    row[fields[i]] !== undefined &&
                    String(
                        row[fields[i]]
                    ).trim() !== ""
                ) {

                    return true;

                }

            }


            return false;

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


                ${this._fieldCell(
                    "companyCode",
                    row.companyCode,
                    rowIndex
                )}


                ${this._fieldCell(
                    "division",
                    row.division,
                    rowIndex
                )}


                ${this._fieldCell(
                    "department",
                    row.department,
                    rowIndex
                )}


                ${this._fieldCell(
                    "costCenter",
                    row.costCenter,
                    rowIndex
                )}


                ${this._fieldCell(
                    "jobCode",
                    row.jobCode,
                    rowIndex
                )}


                ${this._fieldCell(
                    "positionTitle",
                    row.positionTitle,
                    rowIndex
                )}


                ${this._fieldCell(
                    "positionId",
                    row.positionId,
                    rowIndex,
                    true
                )}


                ${this._fieldCell(
                    "payGrade",
                    row.payGrade,
                    rowIndex
                )}


                ${this._fieldCell(
                    "level",
                    row.level,
                    rowIndex
                )}


                ${this._fieldCell(
                    "hireDate",
                    row.hireDate,
                    rowIndex,
                    false,
                    "date"
                )}


                ${this._fieldCell(
                    "nationality",
                    row.nationality,
                    rowIndex
                )}


                ${this._fieldCell(
                    "accommodation",
                    row.accommodation,
                    rowIndex
                )}


                ${this._fieldCell(
                    "transport",
                    row.transport,
                    rowIndex
                )}


                ${this._fieldCell(
                    "employeeClass",
                    row.employeeClass,
                    rowIndex
                )}


                ${this._fieldCell(
                    "overtime",
                    row.overtime,
                    rowIndex
                )}


                ${this._fieldCell(
                    "specialApproval",
                    row.specialApproval,
                    rowIndex
                )}


                ${this._fieldCell(
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
           FIELD CELL
           ===================================================== */

        _fieldCell(
            field,
            value,
            rowIndex,
            readonly,
            type
        ) {

            /*
             * If options exist for this row + field,
             * render dropdown.
             */

            var options =
                this._getOptions(
                    rowIndex,
                    field
                );


            if (
                options.length > 0
            ) {

                var optionHTML =
                    `<option value="">
                        Select
                    </option>`;


                for (
                    var i = 0;
                    i < options.length;
                    i++
                ) {

                    var option =
                        options[i];


                    var optionValue;

                    var optionText;


                    if (
                        typeof option ===
                        "object"
                    ) {

                        optionValue =
                            option.value !==
                            undefined
                                ? option.value
                                : option.id;

                        optionText =
                            option.text !==
                            undefined
                                ? option.text
                                : option.label;

                    } else {

                        optionValue =
                            option;

                        optionText =
                            option;

                    }


                    optionHTML += `

                        <option
                            value="${this._escape(
                                optionValue
                            )}"
                            ${
                                String(
                                    value
                                ) ===
                                String(
                                    optionValue
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


            var inputType =
                type ||
                "text";


            var readonlyAttr =
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
                        ${readonlyAttr}
                    >

                </td>

            `;

        }


        /* =====================================================
           GET OPTIONS
           ===================================================== */

        _getOptions(
            rowIndex,
            fieldName
        ) {

            if (
                !this._rowOptions[rowIndex]
            ) {

                return [];

            }


            if (
                !this._rowOptions[rowIndex][fieldName]
            ) {

                return [];

            }


            return this._rowOptions[rowIndex][fieldName];

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


                control.addEventListener(
                    "change",
                    () => {

                        var field =
                            control.dataset.field;


                        /* =============================
                           ROW SELECTION
                           ============================= */

                        if (
                            field === "selected"
                        ) {

                            this._rows[
                                rowIndex
                            ].selected =
                                control.checked;


                            this._status =
                                "CHANGED";


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


                            this._updateCounts();

                            this._updateDeleteButton();

                            this._updateSelectAll();


                            this._emit(
                                "onDataEntry",
                                "select|" +
                                rowIndex +
                                "|" +
                                control.checked
                            );


                            return;

                        }


                        /* =============================
                           NORMAL FIELD CHANGE
                           ============================= */

                        this._rows[
                            rowIndex
                        ][field] =
                            control.value;


                        this._rows[
                            rowIndex
                        ].isModified =
                            true;


                        this._status =
                            "CHANGED";


                        /*
                         * Remove previous error
                         * styling when user changes
                         * the field.
                         */

                        control.classList.remove(
                            "error"
                        );


                        this._emit(
                            "onFieldChange",
                            "fieldChange|" +
                            rowIndex +
                            "|" +
                            field +
                            "|" +
                            control.value
                        );


                        this._emit(
                            "onDataEntry",
                            "dataEntry|" +
                            rowIndex +
                            "|" +
                            field +
                            "|" +
                            control.value
                        );


                        this._updateCounts();

                    }
                );


                /*
                 * Also handle input events so that
                 * typing is immediately reflected.
                 */

                control.addEventListener(
                    "input",
                    () => {

                        var field =
                            control.dataset.field;


                        if (
                            field ===
                            "selected"
                        ) {

                            return;

                        }


                        this._rows[
                            rowIndex
                        ][field] =
                            control.value;


                        this._rows[
                            rowIndex
                        ].isModified =
                            true;


                        this._status =
                            "CHANGED";


                        this._updateCounts();

                    }
                );

            }

        }


        /* =====================================================
           DELETE BUTTON VISIBILITY
           ===================================================== */

        _updateDeleteButton() {

            var selectedCount =
                0;


            for (
                var i = 0;
                i < this._rows.length;
                i++
            ) {

                if (
                    this._rows[i].selected === true
                ) {

                    selectedCount++;

                }

            }


            var button =
                this.shadowRoot
                    .getElementById(
                        "deleteButton"
                    );


            button.style.display =
                selectedCount > 0
                    ? "block"
                    : "none";

        }


        /* =====================================================
           SELECT ALL STATE
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


            var selectedCount =
                0;


            for (
                var i = 0;
                i < this._rows.length;
                i++
            ) {

                if (
                    this._rows[i].selected === true
                ) {

                    selectedCount++;

                }

            }


            checkbox.checked =
                selectedCount ===
                this._rows.length;


            checkbox.indeterminate =
                selectedCount > 0 &&
                selectedCount <
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


            this.shadowRoot
                .getElementById(
                    "statusText"
                )
                .textContent =
                    this._status;

        }


        /* =====================================================
           EVENT EMITTER
           ===================================================== */

        _emit(
            eventName,
            value
        ) {

            this._lastEvent =
                String(value);


            this.dispatchEvent(
                new CustomEvent(
                    eventName,
                    {
                        detail: {
                            value:
                                String(value)
                        }
                    }
                )
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
                    typeof data ===
                    "string"
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
                    ) &&
                    parsed.length > 0
                ) {

                    this._rows =
                        parsed;

                } else {

                    /*
                     * Never leave widget empty.
                     */

                    this._rows = [

                        this._createEmptyRow()

                    ];

                }

            } catch (
                error
            ) {

                this._rows = [

                    this._createEmptyRow()

                ];

            }


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
                !this._rows[rowIndex]
            ) {

                return;

            }


            this._rows[
                rowIndex
            ][fieldName] =
                value;


            this._rows[
                rowIndex
            ].isModified =
                true;


            this._status =
                "CHANGED";


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

                this._rowOptions[
                    rowIndex
                ][fieldName] =

                    typeof options ===
                    "string"

                        ? JSON.parse(
                            options
                        )

                        : options;

            } catch (
                error
            ) {

                this._rowOptions[
                    rowIndex
                ][fieldName] = [];

            }


            this._render();

        }


        /* =====================================================
           HTML ESCAPE
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
