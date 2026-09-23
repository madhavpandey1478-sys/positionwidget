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
                height: auto;
                min-height: 160px;

                font-family:
                    "72",
                    "72full",
                    Arial,
                    Helvetica,
                    sans-serif;

                color: #1d2d3e;

                --blue: #0070f2;
                --blue-dark: #0040c1;
                --blue-light: #e5f1ff;

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
                height: auto;
                min-height: 160px;
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
                flex-wrap: wrap;
                align-items: center;
                justify-content: flex-end;
                gap: 8px;
                row-gap: 8px;
                padding: 10px 14px;
                background: linear-gradient(to bottom, #fbfcfd, #f7f9fb);
                border-bottom: 1px solid var(--border);
            }

            /* =================================================
               BUTTONS
               ================================================= */

            button {
                height: 36px;
                padding: 0 15px;
                border: 1px solid #b8c8d8;
                border-radius: 7px;
                background: #ffffff;
                color: var(--blue);
                font-family: inherit;
                font-size: 12px;
                font-weight: 600;
                letter-spacing: 0.1px;
                cursor: pointer;
                display: inline-flex;
                align-items: center;
                gap: 6px;
                transition:
                    background 0.15s ease,
                    border-color 0.15s ease,
                    box-shadow 0.15s ease,
                    transform 0.05s ease;
                white-space: nowrap;
            }

            button:hover {
                background: #f0f7fd;
                border-color: #8eb9df;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
            }

            button:active {
                transform: translateY(1px);
            }

            button:focus-visible {
                outline: 2px solid rgba(10, 110, 209, 0.25);
                outline-offset: 1px;
            }

            button.primary {
                color: #ffffff;
                background: var(--blue);
                border-color: var(--blue);
                box-shadow: 0 1px 3px rgba(10, 110, 209, 0.22);
            }

            button.primary:hover {
                background: var(--blue-dark);
                border-color: var(--blue-dark);
            }

            button.delete {
                color: #bb0000;
                border-color: #e4b2b2;
                background: #fffafa;
            }

            button.delete:hover {
                background: #fff0f0;
                border-color: #d98c8c;
            }

            button svg {
                flex: 0 0 auto;
            }

            /* =================================================
               TABLE AREA
               ================================================= */

            .table-area {
                flex: 0 1 auto;
                min-width: 0;
                min-height: 0;
                max-height: 520px;
                overflow: auto;
                background: #ffffff;
                scrollbar-width: thin;
                scrollbar-color: #aebdca #f2f5f7;
            }

            .table-area::-webkit-scrollbar {
                width: 10px;
                height: 10px;
            }

            .table-area::-webkit-scrollbar-track {
                background: #f3f6f8;
            }

            .table-area::-webkit-scrollbar-thumb {
                background: #b5c2cd;
                border-radius: 8px;
                border: 2px solid #f3f6f8;
            }

            .table-area::-webkit-scrollbar-thumb:hover {
                background: #9eafbd;
            }

            /* =================================================
               TABLE
               ================================================= */

            table {
                border-collapse: separate;
                border-spacing: 0;
                table-layout: fixed;
                min-width: 2050px;
                width: 2050px;
            }

            /* =================================================
               HEADER
               ================================================= */

            th {
                position: sticky;
                top: 0;
                z-index: 6;
                height: 40px;
                padding: 0 9px;
                background: var(--header);
                color: #29465f;
                border-bottom: 1px solid #cbd8e3;
                font-size: 11px;
                font-weight: 700;
                text-align: left;
                white-space: nowrap;
                vertical-align: middle;
            }

            /* =================================================
               BODY CELLS
               ================================================= */

            td {
                height: 46px;
                padding: 6px 8px;
                background: #ffffff;
                border-bottom: 1px solid #e9edf1;
                vertical-align: middle;
                position: relative;
            }

            tr:hover td {
                background: #f9fbfd;
            }

            tr.selected-row td {
                background: var(--warning);
            }

            tr.selected-row:hover td {
                background: #fff6d1;
            }

            /* =================================================
               INPUTS
               ================================================= */

            input.cell {
                width: 100%;
                height: 34px;
                padding: 0 9px;
                border: 1px solid #bfd0df;
                border-radius: 6px;
                background: #ffffff;
                color: #253746;
                font-family: inherit;
                font-size: 12px;
                outline: none;
                transition:
                    border-color 0.15s ease,
                    box-shadow 0.15s ease,
                    background 0.15s ease;
            }

            input.cell::placeholder {
                color: #8797a6;
                opacity: 1;
            }

            input.cell:hover {
                border-color: #9fb5c8;
            }

            input.cell:focus {
                border-color: var(--blue);
                box-shadow: 0 0 0 2px rgba(10, 110, 209, 0.10);
            }

            input.cell.readonly {
                background: #f1f4f7;
                color: #607487;
                cursor: not-allowed;
            }

            input.cell[type="date"] {
                padding-right: 7px;
            }

            /* =================================================
               SEARCHABLE DROPDOWN (COMBOBOX)
               ================================================= */

            .combo-wrap {
                position: relative;
                width: 100%;
            }

            .combo-toggle {
                width: 100%;
                height: 34px;
                padding: 0 9px;
                border: 1px solid #bfd0df;
                border-radius: 6px;
                background: #ffffff;
                color: #253746;
                font-family: inherit;
                font-size: 12px;
                font-weight: 400;
                letter-spacing: normal;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 6px;
                cursor: pointer;
                transition: border-color 0.15s ease, box-shadow 0.15s ease;
            }

            .combo-toggle:hover {
                background: #ffffff;
                border-color: #9fb5c8;
                box-shadow: none;
            }

            .combo-toggle.is-open {
                border-color: var(--blue);
                box-shadow: 0 0 0 2px rgba(10, 110, 209, 0.10);
            }

            .combo-toggle-text {
                flex: 1;
                min-width: 0;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                text-align: left;
                color: #253746;
            }

            .combo-toggle-text.is-placeholder {
                color: #8797a6;
            }

            .combo-chevron {
                flex: 0 0 auto;
                color: #5f7284;
                transition: transform 0.15s ease, color 0.15s ease;
            }

            .combo-toggle.is-open .combo-chevron {
                transform: rotate(180deg);
                color: var(--blue);
            }

            .combo-panel {
                position: absolute;
                top: calc(100% + 4px);
                left: 0;
                width: max(230px, 100%);
                background: #ffffff;
                border: 1px solid var(--border-dark);
                border-radius: 8px;
                box-shadow:
                    0 10px 26px rgba(15, 40, 65, 0.16),
                    0 2px 6px rgba(15, 40, 65, 0.08);
                z-index: 50;
                overflow: hidden;
            }

            .combo-search {
                display: flex;
                align-items: center;
                gap: 6px;
                padding: 8px 10px;
                border-bottom: 1px solid var(--border);
                background: var(--surface-soft);
            }

            .combo-search-icon {
                flex: 0 0 auto;
                color: var(--blue);
            }

            .combo-search-input {
                flex: 1;
                min-width: 0;
                border: none;
                outline: none;
                background: transparent;
                font-family: inherit;
                font-size: 12px;
                color: #253746;
            }

            .combo-search-input::placeholder {
                color: #8797a6;
            }

            .combo-clear {
                flex: 0 0 auto;
                border: none;
                background: transparent;
                color: #8797a6;
                font-size: 15px;
                line-height: 1;
                cursor: pointer;
                padding: 2px 4px;
                border-radius: 4px;
            }

            .combo-clear:hover {
                color: #5f7284;
                background: rgba(0, 0, 0, 0.04);
            }

            .combo-options {
                max-height: 210px;
                overflow-y: auto;
            }

            .combo-option {
                padding: 9px 12px;
                font-size: 12px;
                color: #253746;
                cursor: pointer;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .combo-option:hover {
                background: var(--blue-light);
            }

            .combo-option.is-selected {
                background: var(--blue-light);
                color: var(--blue-dark);
                font-weight: 600;
            }

            .combo-empty {
                padding: 14px 12px;
                font-size: 12px;
                color: #8797a6;
                text-align: center;
            }

            /* =================================================
               CHECKBOX
               ================================================= */

            .checkbox-cell {
                width: 50px;
                min-width: 50px;
                max-width: 50px;
                padding: 0;
                text-align: center;
            }

            .checkbox {
                width: 18px;
                height: 18px;
                margin: 0;
                cursor: pointer;
                accent-color: var(--blue);
                vertical-align: middle;
            }

            /* =================================================
               STATUS BAR
               ================================================= */

            .status {
                min-height: 36px;
                height: 36px;
                display: flex;
                align-items: center;
                gap: 22px;
                padding: 0 12px;
                background: #f7f9fb;
                border-top: 1px solid var(--border);
                color: #5f7284;
                font-size: 11px;
                white-space: nowrap;
            }

            .status-item {
                display: inline-flex;
                align-items: center;
                gap: 4px;
            }

            .status-value {
                color: #314a60;
                font-weight: 700;
            }

            .status-value.valid {
                color: #107e3e;
            }

            .status-value.invalid {
                color: #bb0000;
            }

            /* =================================================
               EMPTY STATE
               ================================================= */

            .empty-message {
                padding: 30px;
                text-align: center;
                color: #728495;
                font-size: 12px;
            }

        </style>

        <div class="container">

            <!-- TOOLBAR -->
            <div class="toolbar">

                <button id="addButton" type="button">
                    <svg width="13" height="13" viewBox="0 0 20 20" fill="none"><path d="M10 4v12M4 10h12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
                    Add Row
                </button>

                <button id="copyButton" type="button">
                    <svg width="13" height="13" viewBox="0 0 20 20" fill="none"><rect x="7" y="7" width="9" height="9" rx="1.5" stroke="currentColor" stroke-width="1.6"/><path d="M4 12.5V5.5A1.5 1.5 0 0 1 5.5 4h7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
                    Copy
                </button>

                <button id="deleteButton" class="delete" type="button" style="display:none;">
                    <svg width="13" height="13" viewBox="0 0 20 20" fill="none"><path d="M4 6h12M8 6V4.5A1 1 0 0 1 9 3.5h2a1 1 0 0 1 1 1V6M6 6l.6 9.4a1 1 0 0 0 1 .9h4.8a1 1 0 0 0 1-.9L14 6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    Delete Selected
                </button>

                <button id="validateButton" type="button">
                    <svg width="13" height="13" viewBox="0 0 20 20" fill="none"><path d="M4 10.5l3.5 3.5L16 5.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    Validate
                </button>

                <button id="approvalButton" class="primary" type="button">
                    <svg width="13" height="13" viewBox="0 0 20 20" fill="none"><path d="M3 10l14-6-6 14-2-6-6-2z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" fill="currentColor"/></svg>
                    Send for Approval
                </button>

                <button id="clearButton" type="button">
                    <svg width="13" height="13" viewBox="0 0 20 20" fill="none"><path d="M5 5l10 10M15 5L5 15" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
                    Clear
                </button>

            </div>

            <!-- TABLE -->
            <div class="table-area">
                <table>
                    <thead>
                        <tr>
                            <th class="checkbox-cell" title="Select all">
                                <input id="selectAll" class="checkbox" type="checkbox">
                            </th>
                            <th style="width:120px;">Company Code</th>
                            <th style="width:125px;">Division</th>
                            <th style="width:145px;">Department</th>
                            <th style="width:135px;">Cost Center</th>
                            <th style="width:125px;">Job Code</th>
                            <th style="width:190px;">Position Title</th>
                            <th style="width:135px;">Position ID</th>
                            <th style="width:110px;">Pay Grade</th>
                            <th style="width:90px;">Level</th>
                            <th style="width:125px;">Hire Date</th>
                            <th style="width:125px;">Nationality</th>
                            <th style="width:140px;">Accommodation</th>
                            <th style="width:115px;">Transport</th>
                            <th style="width:135px;">Employee Class</th>
                            <th style="width:105px;">Overtime</th>
                            <th style="width:140px;">Special Approval</th>
                            <th style="width:220px;">Comment</th>
                        </tr>
                    </thead>
                    <tbody id="tbody"></tbody>
                </table>
            </div>

            <!-- STATUS -->
            <div class="status">
                <span class="status-item">Total Rows: <span id="rowCount" class="status-value">1</span></span>
                <span class="status-item">Selected Rows: <span id="selectedCount" class="status-value">0</span></span>
                <span class="status-item">Validation: <span id="validationStatus" class="status-value">-</span></span>
                <span class="status-item">Error Rows: <span id="errorCount" class="status-value">0</span></span>
            </div>

        </div>
    `;

    /* =========================================================
       WEB COMPONENT
       ========================================================= */

    class PositionEntry extends HTMLElement {

        constructor() {

            super();

            this.attachShadow({ mode: "open" });

            this.shadowRoot.appendChild(template.content.cloneNode(true));

            /* INTERNAL DATA */

            this._rows = [];
            this._rowOptions = {};
            this._lastEvent = "";
            this._status = "READY";
            this._validation = null;

            /* Combobox (searchable dropdown) UI state - not part of row data */
            this._openDropdown = null; // { rowIndex, field }
            this._dropdownSearch = "";

            /* START WITH ONE ROW */
            this._rows.push(this._createEmptyRow());

            /* BIND UI */
            this._bindButtons();
            this._bindGlobalCloseHandler();

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

            this.shadowRoot.getElementById("addButton")
                .addEventListener("click", () => { this._addRow(); });

            this.shadowRoot.getElementById("copyButton")
                .addEventListener("click", () => { this._copyRows(); });

            this.shadowRoot.getElementById("deleteButton")
                .addEventListener("click", () => { this._deleteRows(); });

            this.shadowRoot.getElementById("clearButton")
                .addEventListener("click", () => { this._clear(); });

            this.shadowRoot.getElementById("validateButton")
                .addEventListener("click", () => { this._validate(); });

            this.shadowRoot.getElementById("approvalButton")
                .addEventListener("click", () => { this._sendForApproval(); });

            this.shadowRoot.getElementById("selectAll")
                .addEventListener("change", (event) => {

                    var checked = event.target.checked;

                    for (var i = 0; i < this._rows.length; i++) {
                        this._rows[i].selected = checked;
                    }

                    this._status = "CHANGED";

                    this._render();

                    this._emit("onDataEntry", "selectAll|" + checked);
                });
        }

        /* =====================================================
           GLOBAL CLICK HANDLER - CLOSES OPEN DROPDOWN
           ===================================================== */

        _bindGlobalCloseHandler() {

            this.shadowRoot.addEventListener("click", () => {

                if (this._openDropdown) {

                    this._openDropdown = null;
                    this._dropdownSearch = "";

                    this._render();
                }
            });
        }

        /* =====================================================
           ADD ROW
           ===================================================== */

        _addRow() {

            this._rows.push(this._createEmptyRow());

            this._status = "CHANGED";
            this._validation = null;

            this._render();

            this._emit("onDataEntry", "addRow|" + (this._rows.length - 1));
        }

        /* =====================================================
           COPY SELECTED ROWS
           ===================================================== */

        _copyRows() {

            var copied = [];

            for (var i = 0; i < this._rows.length; i++) {

                if (this._rows[i].selected === true) {

                    var newRow = JSON.parse(JSON.stringify(this._rows[i]));

                    newRow.selected = false;

                    /* Position ID should not be copied as a final ID. */
                    newRow.employeeId = "";

                    newRow.isModified = false;

                    copied.push(newRow);
                }
            }

            if (copied.length === 0) {
                return;
            }

            for (var j = 0; j < copied.length; j++) {
                this._rows.push(copied[j]);
            }

            this._status = "CHANGED";
            this._validation = null;

            this._render();

            this._emit("onDataEntry", "copy|" + copied.length);
        }

        /* =====================================================
           DELETE SELECTED ROWS
           ===================================================== */

        _deleteRows() {

            var remaining = [];
            var deleted = 0;

            for (var i = 0; i < this._rows.length; i++) {

                if (this._rows[i].selected === true) {
                    deleted++;
                } else {
                    remaining.push(this._rows[i]);
                }
            }

            if (deleted === 0) {
                return;
            }

            this._rows = remaining;

            /* Always leave one empty row in the widget. */
            if (this._rows.length === 0) {
                this._rows.push(this._createEmptyRow());
            }

            this._status = "CHANGED";
            this._validation = null;

            this._render();

            this._emit("onDataEntry", "delete|" + deleted);
        }

        /* =====================================================
           CLEAR SELECTED ROW DATA
           ===================================================== */

        _clear() {

            var cleared = 0;

            for (var i = 0; i < this._rows.length; i++) {

                var row = this._rows[i];

                if (row.selected === true) {

                    this._clearRow(row);

                    /* IMPORTANT: keep row, untick checkbox. */
                    row.selected = false;

                    cleared++;
                }
            }

            if (cleared === 0) {
                return;
            }

            this._status = "CLEARED";
            this._validation = null;

            this._render();

            this._emit("onClear", "clear|" + cleared);
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
           VALIDATE
           ===================================================== */

        _validate() {

            var errorRows = 0;

            for (var i = 0; i < this._rows.length; i++) {

                var row = this._rows[i];

                var hasData = this._rowHasData(row);

                if (hasData === false) {
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
                    errorRows++;
                }
            }

            if (errorRows === 0) {

                this._validation = true;
                this._status = "VALID";

                this._emit("onValidate", "VALID|0");

            } else {

                this._validation = false;
                this._status = "INVALID";

                this._emit("onValidate", "INVALID|" + errorRows);
            }

            this._updateStatus();
        }

        /* =====================================================
           CHECK IF ROW CONTAINS DATA
           ===================================================== */

        _rowHasData(row) {

            var fields = [
                "companyCode", "division", "department", "costCenter",
                "jobCode", "positionTitle", "employeeId", "payGradeGroup",
                "payGradeLevel", "hireDate", "nationality", "accommodation",
                "transport", "employeeClass", "overtime", "specialApproval",
                "comment"
            ];

            for (var i = 0; i < fields.length; i++) {

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
            this._emit("onSendForApproval", "sendForApproval");
        }

        /* =====================================================
           RENDER
           ===================================================== */

        _render() {

            var tbody = this.shadowRoot.getElementById("tbody");

            tbody.innerHTML = "";

            for (var i = 0; i < this._rows.length; i++) {
                tbody.appendChild(this._createRow(this._rows[i], i));
            }

            this._updateCounts();
            this._updateDeleteButton();
            this._updateSelectAll();
            this._updateStatus();

            this._attachOpenComboPanelEvents();
        }

        /* =====================================================
           CREATE TABLE ROW
           ===================================================== */

        _createRow(row, rowIndex) {

            var tr = document.createElement("tr");

            if (row.selected === true) {
                tr.classList.add("selected-row");
            }

            tr.innerHTML = `

                <td class="checkbox-cell">
                    <input class="checkbox" type="checkbox" data-field="selected" ${row.selected ? "checked" : ""}>
                </td>

                ${this._cell("companyCode", row.companyCode, rowIndex, false, "select")}
                ${this._cell("division", row.division, rowIndex, false, "select")}
                ${this._cell("department", row.department, rowIndex, false, "select")}
                ${this._cell("costCenter", row.costCenter, rowIndex, false, "select")}
                ${this._cell("jobCode", row.jobCode, rowIndex, false, "select")}
                ${this._cell("positionTitle", row.positionTitle, rowIndex, false, "text")}
                ${this._cell("employeeId", row.employeeId, rowIndex, true, "text")}
                ${this._cell("payGradeGroup", row.payGradeGroup, rowIndex, false, "select")}
                ${this._cell("payGradeLevel", row.payGradeLevel, rowIndex, false, "select")}
                ${this._cell("hireDate", row.hireDate, rowIndex, false, "date")}
                ${this._cell("nationality", row.nationality, rowIndex, false, "select")}
                ${this._cell("accommodation", row.accommodation, rowIndex, false, "select")}
                ${this._cell("transport", row.transport, rowIndex, false, "select")}
                ${this._cell("employeeClass", row.employeeClass, rowIndex, false, "select")}
                ${this._cell("overtime", row.overtime, rowIndex, false, "select")}
                ${this._cell("specialApproval", row.specialApproval, rowIndex, false, "select")}
                ${this._cell("comment", row.comment, rowIndex, false, "text")}
            `;

            this._attachRowEvents(tr, rowIndex);

            return tr;
        }

        /* =====================================================
           GET OPTIONS FOR A CELL
           ===================================================== */

        _getOptionsFor(rowIndex, field) {

            if (this._rowOptions[rowIndex] && this._rowOptions[rowIndex][field]) {
                return this._rowOptions[rowIndex][field];
            }

            return [];
        }

        /* =====================================================
           OPTION VALUE / TEXT HELPERS
           ===================================================== */

        _optionValue(option) {
            return typeof option === "object" ? option.value : option;
        }

        _optionText(option) {
            if (typeof option === "object") {
                return option.text !== undefined ? option.text : option.value;
            }
            return option;
        }

        _getOptionText(options, value) {

            if (!value) {
                return "";
            }

            for (var i = 0; i < options.length; i++) {

                if (String(this._optionValue(options[i])) === String(value)) {
                    return this._optionText(options[i]);
                }
            }

            /* Fall back to the raw stored value if it no longer matches a known option. */
            return String(value);
        }

        _filterOptions(options, searchText) {

            if (!searchText) {
                return options;
            }

            var needle = String(searchText).toLowerCase();

            var result = [];

            for (var i = 0; i < options.length; i++) {

                var text = String(this._optionText(options[i])).toLowerCase();
                var value = String(this._optionValue(options[i])).toLowerCase();

                if (text.indexOf(needle) !== -1 || value.indexOf(needle) !== -1) {
                    result.push(options[i]);
                }
            }

            return result;
        }

        /* =====================================================
           CREATE CELL
           ===================================================== */

        _cell(field, value, rowIndex, readonly, type) {

            if (type === "select") {
                return this._comboCell(field, value, rowIndex);
            }

            return `
                <td>
                    <input
                        class="cell ${readonly ? "readonly" : ""}"
                        type="${type || "text"}"
                        data-field="${field}"
                        value="${this._escape(value)}"
                        ${readonly ? "readonly" : ""}
                    >
                </td>
            `;
        }

        /* =====================================================
           CREATE SEARCHABLE DROPDOWN (COMBOBOX) CELL
           ===================================================== */

        _comboCell(field, value, rowIndex) {

            var options = this._getOptionsFor(rowIndex, field);

            var isOpen = !!(
                this._openDropdown &&
                this._openDropdown.rowIndex === rowIndex &&
                this._openDropdown.field === field
            );

            var selectedText = this._getOptionText(options, value);
            var toggleLabel = selectedText || "Select";

            var panelHTML = "";

            if (isOpen) {

                var searchText = this._dropdownSearch || "";
                var filtered = this._filterOptions(options, searchText);

                panelHTML = `
                    <div class="combo-panel">
                        <div class="combo-search">
                            <svg class="combo-search-icon" width="14" height="14" viewBox="0 0 20 20" fill="none">
                                <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" stroke-width="1.6"/>
                                <path d="M13 13l4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
                            </svg>
                            <input type="text" class="combo-search-input" placeholder="Search" value="${this._escape(searchText)}" autocomplete="off">
                            ${searchText ? '<button type="button" class="combo-clear" title="Clear search">&times;</button>' : ""}
                        </div>
                        <div class="combo-options">
                            ${this._renderComboOptionsHTML(filtered, value)}
                        </div>
                    </div>
                `;
            }

            return `
                <td>
                    <div class="combo-wrap" data-combo-row="${rowIndex}" data-combo-field="${field}">
                        <button type="button" class="combo-toggle ${isOpen ? "is-open" : ""}" data-field="${field}">
                            <span class="combo-toggle-text ${selectedText ? "" : "is-placeholder"}">${this._escape(toggleLabel)}</span>
                            <svg class="combo-chevron" width="12" height="12" viewBox="0 0 20 20" fill="none">
                                <path d="M5 7.5l5 5 5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                        ${panelHTML}
                    </div>
                </td>
            `;
        }

        /* =====================================================
           RENDER COMBO OPTION LIST HTML
           ===================================================== */

        _renderComboOptionsHTML(options, selectedValue) {

            if (options.length === 0) {
                return `<div class="combo-empty">No matches</div>`;
            }

            var html = "";

            for (var i = 0; i < options.length; i++) {

                var optValue = this._optionValue(options[i]);
                var optText = this._optionText(options[i]);

                var isSelected = String(optValue) === String(selectedValue);

                html += `
                    <div class="combo-option ${isSelected ? "is-selected" : ""}" data-value="${this._escape(optValue)}">
                        ${this._escape(optText)}
                    </div>
                `;
            }

            return html;
        }

        /* =====================================================
           ROW EVENT HANDLING
           ===================================================== */

        _attachRowEvents(tr, rowIndex) {

            var controls = tr.querySelectorAll("[data-field]");

            for (var i = 0; i < controls.length; i++) {

                var control = controls[i];
                var field = control.dataset.field;

                /* CHECKBOX */
                if (field === "selected") {

                    control.addEventListener("change", (event) => {

                        var checked = event.target.checked;

                        this._rows[rowIndex].selected = checked;

                        this._status = "CHANGED";

                        this._updateCounts();
                        this._updateDeleteButton();
                        this._updateSelectAll();

                        if (checked) {
                            tr.classList.add("selected-row");
                        } else {
                            tr.classList.remove("selected-row");
                        }

                        this._emit("onDataEntry", "select|" + rowIndex + "|" + checked);
                    });

                    continue;
                }

                /* SEARCHABLE DROPDOWN TOGGLE */
                if (control.classList.contains("combo-toggle")) {

                    control.addEventListener("click", (event) => {

                        event.stopPropagation();

                        var isSame = !!(
                            this._openDropdown &&
                            this._openDropdown.rowIndex === rowIndex &&
                            this._openDropdown.field === field
                        );

                        if (isSame) {
                            this._openDropdown = null;
                        } else {
                            this._openDropdown = { rowIndex: rowIndex, field: field };
                            this._dropdownSearch = "";
                        }

                        this._render();
                    });

                    continue;
                }

                /* TEXT / DATE INPUT */
                control.addEventListener("change", () => {
                    this._commitFieldChange(rowIndex, field, control.value);
                });
            }
        }

        /* =====================================================
           WIRE UP THE CURRENTLY OPEN DROPDOWN PANEL
           ===================================================== */

        _attachOpenComboPanelEvents() {

            if (!this._openDropdown) {
                return;
            }

            var rowIndex = this._openDropdown.rowIndex;
            var field = this._openDropdown.field;

            var wrap = this.shadowRoot.querySelector(
                '.combo-wrap[data-combo-row="' + rowIndex + '"][data-combo-field="' + field + '"]'
            );

            if (!wrap) {
                return;
            }

            var panel = wrap.querySelector(".combo-panel");

            if (!panel) {
                return;
            }

            /* Clicks inside the panel must not bubble to the global close handler. */
            panel.addEventListener("click", (event) => { event.stopPropagation(); });
            panel.addEventListener("mousedown", (event) => { event.stopPropagation(); });

            var options = this._getOptionsFor(rowIndex, field);

            var searchInput = panel.querySelector(".combo-search-input");
            var optionsContainer = panel.querySelector(".combo-options");

            this._attachComboOptionClicks(optionsContainer, rowIndex, field);

            var clearBtn = panel.querySelector(".combo-clear");

            if (clearBtn) {

                clearBtn.addEventListener("click", (event) => {

                    event.stopPropagation();

                    this._dropdownSearch = "";

                    if (searchInput) {
                        searchInput.value = "";
                    }

                    var filtered = this._filterOptions(options, "");

                    optionsContainer.innerHTML = this._renderComboOptionsHTML(
                        filtered,
                        this._rows[rowIndex][field]
                    );

                    this._attachComboOptionClicks(optionsContainer, rowIndex, field);

                    clearBtn.remove();

                    if (searchInput) {
                        searchInput.focus();
                    }
                });
            }

            if (searchInput) {

                /* Focus and place the caret at the end without re-rendering. */
                searchInput.focus();

                var len = searchInput.value.length;

                try {
                    searchInput.setSelectionRange(len, len);
                } catch (error) {
                    /* Some input states do not support selection ranges; ignore. */
                }

                searchInput.addEventListener("input", (event) => {

                    this._dropdownSearch = event.target.value;

                    var filtered = this._filterOptions(options, this._dropdownSearch);

                    optionsContainer.innerHTML = this._renderComboOptionsHTML(
                        filtered,
                        this._rows[rowIndex][field]
                    );

                    this._attachComboOptionClicks(optionsContainer, rowIndex, field);

                    var existingClear = panel.querySelector(".combo-clear");

                    if (this._dropdownSearch && !existingClear) {

                        var searchBar = panel.querySelector(".combo-search");

                        var newClear = document.createElement("button");

                        newClear.type = "button";
                        newClear.className = "combo-clear";
                        newClear.title = "Clear search";
                        newClear.innerHTML = "&times;";

                        newClear.addEventListener("click", (clickEvent) => {

                            clickEvent.stopPropagation();

                            this._dropdownSearch = "";
                            searchInput.value = "";

                            var refiltered = this._filterOptions(options, "");

                            optionsContainer.innerHTML = this._renderComboOptionsHTML(
                                refiltered,
                                this._rows[rowIndex][field]
                            );

                            this._attachComboOptionClicks(optionsContainer, rowIndex, field);

                            newClear.remove();

                            searchInput.focus();
                        });

                        searchBar.appendChild(newClear);

                    } else if (!this._dropdownSearch && existingClear) {

                        existingClear.remove();
                    }
                });

                searchInput.addEventListener("keydown", (event) => {

                    if (event.key === "Escape") {

                        this._openDropdown = null;
                        this._dropdownSearch = "";

                        this._render();
                    }
                });
            }
        }

        /* =====================================================
           ATTACH CLICK HANDLERS TO OPTION ITEMS
           ===================================================== */

        _attachComboOptionClicks(container, rowIndex, field) {

            var items = container.querySelectorAll(".combo-option");

            for (var i = 0; i < items.length; i++) {

                items[i].addEventListener("click", (event) => {

                    var value = event.currentTarget.dataset.value;

                    this._openDropdown = null;
                    this._dropdownSearch = "";

                    this._commitFieldChange(rowIndex, field, value);

                    this._render();
                });
            }
        }

        /* =====================================================
           COMMIT A FIELD CHANGE (shared by text/date inputs
           and the searchable dropdown)
           ===================================================== */

        _commitFieldChange(rowIndex, field, value) {

            this._rows[rowIndex][field] = value;
            this._rows[rowIndex].isModified = true;

            this._status = "CHANGED";
            this._validation = null;

            this._updateStatus();

            /* Field-specific event */
            this._emit("onFieldChange", "fieldChange|" + rowIndex + "|" + field + "|" + value);

            /* General data-entry event */
            this._emit("onDataEntry", "dataEntry|" + rowIndex + "|" + field + "|" + value);
        }

        /* =====================================================
           DELETE BUTTON VISIBILITY
           ===================================================== */

        _updateDeleteButton() {

            var selected = 0;

            for (var i = 0; i < this._rows.length; i++) {
                if (this._rows[i].selected === true) {
                    selected++;
                }
            }

            var button = this.shadowRoot.getElementById("deleteButton");

            button.style.display = selected > 0 ? "inline-flex" : "none";
        }

        /* =====================================================
           SELECT ALL
           ===================================================== */

        _updateSelectAll() {

            var checkbox = this.shadowRoot.getElementById("selectAll");

            if (this._rows.length === 0) {
                checkbox.checked = false;
                checkbox.indeterminate = false;
                return;
            }

            var selected = 0;

            for (var i = 0; i < this._rows.length; i++) {
                if (this._rows[i].selected === true) {
                    selected++;
                }
            }

            checkbox.checked = selected === this._rows.length;
            checkbox.indeterminate = selected > 0 && selected < this._rows.length;
        }

        /* =====================================================
           COUNTS
           ===================================================== */

        _updateCounts() {

            var selected = this._getSelectedCount();

            this.shadowRoot.getElementById("rowCount").textContent = this._rows.length;
            this.shadowRoot.getElementById("selectedCount").textContent = selected;
        }

        /* =====================================================
           STATUS
           ===================================================== */

        _updateStatus() {

            var validation = this.shadowRoot.getElementById("validationStatus");
            var errorCount = this.shadowRoot.getElementById("errorCount");

            validation.classList.remove("valid", "invalid");

            if (this._validation === true) {

                validation.textContent = "true";
                validation.classList.add("valid");

                errorCount.textContent = "0";

            } else if (this._validation === false) {

                validation.textContent = "false";
                validation.classList.add("invalid");

                errorCount.textContent = this._getValidationErrorCount();

            } else {

                validation.textContent = "-";
                errorCount.textContent = "0";
            }

            this.shadowRoot.getElementById("rowCount").textContent = this._rows.length;
            this.shadowRoot.getElementById("selectedCount").textContent = this._getSelectedCount();
        }

        /* =====================================================
           GET SELECTED COUNT
           ===================================================== */

        _getSelectedCount() {

            var count = 0;

            for (var i = 0; i < this._rows.length; i++) {
                if (this._rows[i].selected === true) {
                    count++;
                }
            }

            return count;
        }

        /* =====================================================
           VALIDATION ERROR COUNT
           ===================================================== */

        _getValidationErrorCount() {

            var errors = 0;

            for (var i = 0; i < this._rows.length; i++) {

                var row = this._rows[i];

                if (!this._rowHasData(row)) {
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

        _emit(name, value) {

            this._lastEvent = String(value);

            this.dispatchEvent(new Event(name));
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
            return JSON.stringify(this._rows);
        }

        /* =====================================================
           SET DATA
           ===================================================== */

        setData(data) {

            try {

                var parsed;

                if (typeof data === "string") {
                    parsed = JSON.parse(data);
                } else {
                    parsed = data;
                }

                if (Array.isArray(parsed)) {
                    this._rows = parsed;
                } else {
                    this._rows = [];
                }

                /* Never allow completely empty widget on load. */
                if (this._rows.length === 0) {
                    this._rows.push(this._createEmptyRow());
                }

                this._openDropdown = null;
                this._dropdownSearch = "";

                this._render();

            } catch (error) {

                this._rows = [this._createEmptyRow()];

                this._render();
            }
        }

        /* =====================================================
           SET CELL VALUE
           ===================================================== */

        setCellValue(rowIndex, fieldName, value) {

            if (!this._rows[rowIndex]) {
                return;
            }

            this._rows[rowIndex][fieldName] = value;
            this._rows[rowIndex].isModified = true;

            this._validation = null;

            this._render();
        }

        /* =====================================================
           SET ROW OPTIONS
           ===================================================== */

        setRowOptions(rowIndex, fieldName, options) {

            if (!this._rowOptions[rowIndex]) {
                this._rowOptions[rowIndex] = {};
            }

            try {

                this._rowOptions[rowIndex][fieldName] =
                    typeof options === "string" ? JSON.parse(options) : options;

                /* Re-render so new options immediately appear. */
                this._render();

            } catch (error) {

                this._rowOptions[rowIndex][fieldName] = [];
            }
        }

        /* =====================================================
           ESCAPE HTML
           ===================================================== */

        _escape(value) {

            if (value === null || value === undefined) {
                return "";
            }

            return String(value)
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
        }
    }

    /* =========================================================
       REGISTER COMPONENT
       ========================================================= */

    if (!customElements.get("com-madhav-positionentry")) {
        customElements.define("com-madhav-positionentry", PositionEntry);
    }

})();
