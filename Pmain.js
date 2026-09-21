(function () {

    "use strict";


    /* =========================================================
       POSITION ENTRY CUSTOM WIDGET
       UI + ROW MANAGEMENT + EVENTS + SAC API
       ========================================================= */


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
                min-width: 800px;
                min-height: 250px;
                font-family: Arial, Helvetica, sans-serif;
                box-sizing: border-box;
                overflow: hidden;
            }

            * {
                box-sizing: border-box;
            }


            /* =================================================
               MAIN CONTAINER
               ================================================= */

            .main-container {
                width: 100%;
                height: 100%;
                background: #ffffff;
                border: 1px solid #d2dce6;
                border-radius: 10px;
                overflow: hidden;
                display: flex;
                flex-direction: column;
            }


            /* =================================================
               ACTION BAR
               ================================================= */

            .title-bar {
                position: relative;
                height: 55px;
                min-height: 55px;
                background: #f6f9fc;
                border-bottom: 1px solid #d8e1ea;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                padding: 0 10px;
            }


            .action-container {
                display: flex;
                align-items: center;
                gap: 8px;
            }


            /* =================================================
               BUTTONS
               ================================================= */

            .action-button {
                height: 36px;
                min-width: 82px;
                padding: 0 15px;
                border-radius: 9px;
                border: 1px solid #b9cde1;
                background: #ffffff;
                color: #126bc4;
                font-size: 13px;
                font-weight: 600;
                cursor: pointer;
                white-space: nowrap;
                transition:
                    background 0.15s ease,
                    border-color 0.15s ease,
                    opacity 0.15s ease;
            }

            .action-button:hover {
                background: #f1f7fd;
                border-color: #8db4d9;
            }

            .action-button:active {
                background: #e8f2fc;
            }


            .action-button.primary {
                background: #0878df;
                border-color: #0878df;
                color: #ffffff;
            }

            .action-button.primary:hover {
                background: #056bc9;
                border-color: #056bc9;
            }


            .action-button.danger {
                color: #d40000;
                border-color: #e4aaaa;
                background: #ffffff;
            }

            .action-button.danger:hover {
                background: #fff3f3;
                border-color: #dc7777;
            }


            /* =================================================
               TABS
               ================================================= */

            .tabs-container {
                height: 34px;
                min-height: 34px;
                display: flex;
                align-items: stretch;
                background: #ffffff;
                border-bottom: 1px solid #d6dfe8;
                padding-left: 8px;
            }


            .tab {
                height: 34px;
                padding: 0 14px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
                color: #425a70;
                cursor: pointer;
                border-bottom: 2px solid transparent;
                white-space: nowrap;
            }


            .tab:hover {
                color: #0878df;
            }


            .tab.active {
                color: #0878df;
                font-weight: 700;
                border-bottom: 2px solid #0878df;
            }


            /* =================================================
               TABLE AREA
               ================================================= */

            .table-container {
                flex: 1;
                width: 100%;
                overflow: auto;
                background: #ffffff;
                position: relative;
            }


            table {
                border-collapse: separate;
                border-spacing: 0;
                table-layout: fixed;
                min-width: 2150px;
                width: 2150px;
            }


            /* =================================================
               TABLE HEADER
               ================================================= */

            thead th {
                height: 38px;
                min-height: 38px;
                background: #edf4fb;
                color: #163a5c;
                border-right: 1px solid #d3dfe9;
                border-bottom: 1px solid #d0dce7;
                padding: 5px 8px;
                font-size: 12px;
                font-weight: 700;
                text-align: left;
                white-space: nowrap;
                position: sticky;
                top: 0;
                z-index: 5;
            }


            thead th:first-child {
                text-align: center;
            }


            /* =================================================
               TABLE BODY
               ================================================= */

            tbody tr {
                background: #ffffff;
            }


            tbody tr.selected-row {
                background: #fffbea;
            }


            tbody td {
                height: 48px;
                padding: 6px;
                border-right: 1px solid #d9e2eb;
                border-bottom: 1px solid #d9e2eb;
                background: inherit;
                vertical-align: middle;
            }


            /* =================================================
               INPUTS
               ================================================= */

            .cell-input {
                width: 100%;
                height: 38px;
                border: 1px solid #c7d7e7;
                border-radius: 7px;
                background: #ffffff;
                padding: 0 10px;
                color: #253b50;
                font-size: 12px;
                outline: none;
            }


            .cell-input:hover {
                border-color: #9fb9d1;
            }


            .cell-input:focus {
                border-color: #0878df;
                box-shadow: 0 0 0 1px #0878df;
            }


            .cell-input.readonly {
                background: #f6f8fa;
                color: #52697e;
            }


            /* =================================================
               SELECT
               ================================================= */

            .cell-select {
                width: 100%;
                height: 38px;
                border: 1px solid #c7d7e7;
                border-radius: 7px;
                background: #ffffff;
                padding: 0 8px;
                color: #253b50;
                font-size: 12px;
                outline: none;
                cursor: pointer;
            }


            .cell-select:hover {
                border-color: #9fb9d1;
            }


            .cell-select:focus {
                border-color: #0878df;
                box-shadow: 0 0 0 1px #0878df;
            }


            /* =================================================
               CHECKBOX
               ================================================= */

            .selection-cell {
                width: 55px;
                text-align: center;
            }


            .selection-checkbox {
                width: 20px;
                height: 20px;
                cursor: pointer;
                accent-color: #0878df;
            }


            /* =================================================
               EMPTY MESSAGE
               ================================================= */

            .empty-message {
                display: none;
                padding: 30px;
                text-align: center;
                color: #6b7f91;
                font-size: 13px;
            }


            /* =================================================
               STATUS BAR
               ================================================= */

            .status-bar {
                height: 36px;
                min-height: 36px;
                background: #f6f9fc;
                border-top: 1px solid #d4dee8;
                display: flex;
                align-items: center;
                padding: 0 14px;
                gap: 22px;
                color: #28445f;
                font-size: 12px;
                white-space: nowrap;
            }


            .status-item {
                display: inline-flex;
                align-items: center;
            }


            .status-label {
                margin-right: 5px;
                color: #334f68;
            }


            .status-value {
                font-weight: 600;
            }


            .status-valid {
                color: #218739;
            }


            .status-invalid {
                color: #c62828;
            }


            /* =================================================
               SCROLLBAR
               ================================================= */

            .table-container::-webkit-scrollbar {
                width: 10px;
                height: 10px;
            }


            .table-container::-webkit-scrollbar-track {
                background: #f3f6f9;
            }


            .table-container::-webkit-scrollbar-thumb {
                background: #bdcbd8;
                border-radius: 6px;
            }


            .table-container::-webkit-scrollbar-thumb:hover {
                background: #9eafbe;
            }

        </style>


        <div class="main-container">


            <!-- =================================================
                 ACTION BAR
                 ================================================= -->

            <div class="title-bar">

                <div class="action-container">

                    <button
                        id="addRowButton"
                        class="action-button">
                        Add Row
                    </button>


                    <button
                        id="copyButton"
                        class="action-button">
                        Copy
                    </button>


                    <button
                        id="deleteButton"
                        class="action-button danger"
                        style="display:none;">
                        Delete Selected
                    </button>


                    <button
                        id="validateButton"
                        class="action-button">
                        Validate
                    </button>


                    <button
                        id="approvalButton"
                        class="action-button primary">
                        Send for Approval
                    </button>


                    <button
                        id="clearButton"
                        class="action-button">
                        Clear
                    </button>

                </div>

            </div>


            <!-- =================================================
                 TABS
                 ================================================= -->

            <div class="tabs-container">

                <div
                    id="createTab"
                    class="tab active">

                    Tab 1 - Create Position

                </div>


                <div
                    id="manageTab"
                    class="tab">

                    Tab 2 - Load / Modify / Delete

                </div>

            </div>


            <!-- =================================================
                 TABLE
                 ================================================= -->

            <div
                id="tableContainer"
                class="table-container">

                <table>

                    <thead>

                        <tr>

                            <th
                                class="selection-cell"
                                style="width:55px;">

                                <input
                                    id="selectAllCheckbox"
                                    class="selection-checkbox"
                                    type="checkbox">

                            </th>


                            <th style="width:110px;">
                                Company Code
                            </th>


                            <th style="width:130px;">
                                Division
                            </th>


                            <th style="width:140px;">
                                Department
                            </th>


                            <th style="width:140px;">
                                Cost Center
                            </th>


                            <th style="width:125px;">
                                Job Code
                            </th>


                            <th style="width:170px;">
                                Position Title
                            </th>


                            <th style="width:140px;">
                                Position ID
                            </th>


                            <th style="width:105px;">
                                Pay Grade
                            </th>


                            <th style="width:85px;">
                                Level
                            </th>


                            <th style="width:130px;">
                                Hire Date
                            </th>


                            <th style="width:120px;">
                                Nationality
                            </th>


                            <th style="width:130px;">
                                Accommodation
                            </th>


                            <th style="width:115px;">
                                Transport
                            </th>


                            <th style="width:125px;">
                                Employee Class
                            </th>


                            <th style="width:100px;">
                                Overtime
                            </th>


                            <th style="width:130px;">
                                Special Approval
                            </th>


                            <th style="width:220px;">
                                Comment
                            </th>

                        </tr>

                    </thead>


                    <tbody id="createTableBody">
                    </tbody>

                </table>


                <div
                    id="emptyMessage"
                    class="empty-message">

                    Click <b>Add Row</b> to create a new position.

                </div>

            </div>


            <!-- =================================================
                 STATUS BAR
                 ================================================= -->

            <div class="status-bar">

                <div class="status-item">

                    <span class="status-label">
                        Total Rows:
                    </span>

                    <span
                        id="totalRows"
                        class="status-value">
                        0
                    </span>

                </div>


                <div class="status-item">

                    <span class="status-label">
                        Selected Rows:
                    </span>

                    <span
                        id="selectedRows"
                        class="status-value">
                        0
                    </span>

                </div>


                <div class="status-item">

                    <span class="status-label">
                        Validation:
                    </span>

                    <span
                        id="validationStatus"
                        class="status-value status-valid">
                        true
                    </span>

                </div>


                <div class="status-item">

                    <span class="status-label">
                        Status:
                    </span>

                    <span
                        id="changeStatus"
                        class="status-value">
                        READY
                    </span>

                </div>

            </div>

        </div>
    `;


    /* =========================================================
       WEB COMPONENT
       ========================================================= */

    class PositionEntry extends HTMLElement {


        constructor() {

            super();


            /* =================================================
               SHADOW DOM
               ================================================= */

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

            this._manageRows = [];

            this._lastEvent = "";

            this._activeTab = "create";

            this._validationStatus = true;

            this._changeStatus = "READY";

            this._rowOptions = {};

            this._manageRowOptions = {};


            /* =================================================
               INITIALIZE
               ================================================= */

            this._bindEvents();

            this._render();

        }


        /* =====================================================
           EVENT SYSTEM
           ===================================================== */

        _emitEvent(
            eventName,
            eventValue
        ) {

            if (
                eventValue !== undefined &&
                eventValue !== null &&
                eventValue !== ""
            ) {

                this._lastEvent =
                    String(eventValue);

            } else {

                this._lastEvent =
                    String(eventName);

            }


            try {

                this.dispatchEvent(
                    new Event(eventName)
                );

            } catch (e) {

                /*
                 * Fallback event
                 */

                try {

                    this.dispatchEvent(
                        new Event("onEvent")
                    );

                } catch (ignore) {}

            }

        }


        /* =====================================================
           BIND EVENTS
           ===================================================== */

        _bindEvents() {


            /* =================================================
               ADD ROW
               ================================================= */

            this.shadowRoot
                .getElementById("addRowButton")
                .addEventListener(
                    "click",
                    () => {

                        this._addRow();

                    }
                );


            /* =================================================
               COPY
               ================================================= */

            this.shadowRoot
                .getElementById("copyButton")
                .addEventListener(
                    "click",
                    () => {

                        this._copySelectedRows();

                    }
                );


            /* =================================================
               DELETE
               ================================================= */

            this.shadowRoot
                .getElementById("deleteButton")
                .addEventListener(
                    "click",
                    () => {

                        this._deleteSelectedRows();

                    }
                );


            /* =================================================
               VALIDATE
               ================================================= */

            this.shadowRoot
                .getElementById("validateButton")
                .addEventListener(
                    "click",
                    () => {

                        this._emitEvent(
                            "onValidate",
                            "validate"
                        );

                    }
                );


            /* =================================================
               SEND FOR APPROVAL
               ================================================= */

            this.shadowRoot
                .getElementById("approvalButton")
                .addEventListener(
                    "click",
                    () => {

                        this._emitEvent(
                            "onSendForApproval",
                            "sendForApproval"
                        );

                    }
                );


            /* =================================================
               CLEAR
               ================================================= */

           this.shadowRoot
    .getElementById("clearButton")
    .addEventListener(
        "click",
        () => {

            /*
             * Check whether any rows are selected
             */

            var selectedCount = 0;

            for (
                var i = 0;
                i < this._rows.length;
                i++
            ) {

                if (
                    this._rows[i].selected === true ||
                    this._rows[i].selected === "true"
                ) {

                    selectedCount++;

                }

            }


            /*
             * CASE 1:
             * One or more rows are selected
             *
             * Clear data ONLY from selected rows.
             * Do NOT delete the rows.
             */

            if (
                selectedCount > 0
            ) {

                for (
                    var j = 0;
                    j < this._rows.length;
                    j++
                ) {

                    var row =
                        this._rows[j];


                    if (
                        row.selected === true ||
                        row.selected === "true"
                    ) {

                        /*
                         * Clear all editable fields
                         */

                        row.companyCode =
                            "";

                        row.division =
                            "";

                        row.department =
                            "";

                        row.costCenter =
                            "";

                        row.jobCode =
                            "";

                        row.positionTitle =
                            "";

                        row.employeeId =
                            "";

                        row.payGradeGroup =
                            "";

                        row.payGradeLevel =
                            "";

                        row.hireDate =
                            "";

                        row.nationality =
                            "";

                        row.accommodation =
                            "";

                        row.transport =
                            "";

                        row.employeeClass =
                            "";

                        row.overtime =
                            "";

                        row.specialApproval =
                            "";

                        row.comment =
                            "";


                        /*
                         * Keep the row itself.
                         */

                        row.isModified =
                            true;


                        /*
                         * Keep it selected so
                         * the user knows which
                         * rows were cleared.
                         */

                    }

                }


                this._changeStatus =
                    "CLEARED_SELECTED";


                this._emitEvent(
                    "onClear",
                    "clear|selected|" +
                    selectedCount
                );

            }


            /*
             * CASE 2:
             * Nothing selected
             *
             * Clear data from ALL rows.
             * Do NOT delete rows.
             */

            else {

                for (
                    var k = 0;
                    k < this._rows.length;
                    k++
                ) {

                    var allRow =
                        this._rows[k];


                    allRow.companyCode =
                        "";

                    allRow.division =
                        "";

                    allRow.department =
                        "";

                    allRow.costCenter =
                        "";

                    allRow.jobCode =
                        "";

                    allRow.positionTitle =
                        "";

                    allRow.employeeId =
                        "";

                    allRow.payGradeGroup =
                        "";

                    allRow.payGradeLevel =
                        "";

                    allRow.hireDate =
                        "";

                    allRow.nationality =
                        "";

                    allRow.accommodation =
                        "";

                    allRow.transport =
                        "";

                    allRow.employeeClass =
                        "";

                    allRow.overtime =
                        "";

                    allRow.specialApproval =
                        "";

                    allRow.comment =
                        "";

                    allRow.isModified =
                        true;

                }


                this._changeStatus =
                    "CLEARED_ALL";


                this._emitEvent(
                    "onClear",
                    "clear|all"
                );

            }


            /*
             * Render the table again.
             *
             * IMPORTANT:
             * _rows is NOT emptied here.
             */

            this._render();

        }
    );
            /* =================================================
               CREATE TAB
               ================================================= */

            this.shadowRoot
                .getElementById("createTab")
                .addEventListener(
                    "click",
                    () => {

                        this._activeTab =
                            "create";


                        this._changeStatus =
                            "READY";


                        this._emitEvent(
                            "onTabChange",
                            "tabChange|create"
                        );


                        this._updateTabs();

                    }
                );


            /* =================================================
               MANAGE TAB
               ================================================= */

            this.shadowRoot
                .getElementById("manageTab")
                .addEventListener(
                    "click",
                    () => {

                        this._activeTab =
                            "manage";


                        this._emitEvent(
                            "onTabChange",
                            "tabChange|manage"
                        );


                        this._updateTabs();

                    }
                );


            /* =================================================
               SELECT ALL
               ================================================= */

            this.shadowRoot
                .getElementById("selectAllCheckbox")
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


                        this._changeStatus =
                            "CHANGED";


                        this._render();


                        this._emitEvent(
                            "onDataEntry",
                            "dataEntry|selectAll|" +
                            (
                                checked
                                    ? "true"
                                    : "false"
                            )
                        );

                    }
                );

        }


        /* =====================================================
           ADD ROW
           ===================================================== */

        _addRow() {

            var newRow = {

                rowId:
                    this._rows.length + 1,

                selected:
                    false,

                employeeId:
                    "",

                companyCode:
                    "",

                division:
                    "",

                department:
                    "",

                costCenter:
                    "",

                jobCode:
                    "",

                positionTitle:
                    "",

                payGradeGroup:
                    "",

                payGradeLevel:
                    "",

                hireDate:
                    "",

                nationality:
                    "",

                accommodation:
                    "",

                transport:
                    "",

                employeeClass:
                    "",

                overtime:
                    "",

                specialApproval:
                    "",

                comment:
                    "",

                isModified:
                    false

            };


            this._rows.push(
                newRow
            );


            this._changeStatus =
                "CHANGED";


            this._validationStatus =
                true;


            this._render();


            this._emitEvent(
                "onDataEntry",
                "dataEntry|" +
                (this._rows.length - 1)
            );

        }


        /* =====================================================
           COPY SELECTED ROWS
           ===================================================== */

        _copySelectedRows() {

            var selectedRows = [];


            for (
                var i = 0;
                i < this._rows.length;
                i++
            ) {

                if (
                    this._rows[i].selected === true ||
                    this._rows[i].selected === "true"
                ) {

                    selectedRows.push(
                        this._rows[i]
                    );

                }

            }


            if (
                selectedRows.length === 0
            ) {

                return;

            }


            var startingIndex =
                this._rows.length;


            for (
                var j = 0;
                j < selectedRows.length;
                j++
            ) {

                var copied =
                    JSON.parse(
                        JSON.stringify(
                            selectedRows[j]
                        )
                    );


                copied.rowId =
                    startingIndex + j + 1;


                copied.selected =
                    false;


                /*
                 * Position ID should not be
                 * copied to a new position.
                 */

                copied.employeeId =
                    "";


                copied.isModified =
                    true;


                this._rows.push(
                    copied
                );

            }


            this._changeStatus =
                "CHANGED";


            this._render();


            this._emitEvent(
                "onDataEntry",
                "dataEntry|copy|" +
                selectedRows.length
            );

        }


        /* =====================================================
           DELETE SELECTED ROWS
           ===================================================== */

        _deleteSelectedRows() {

            var remainingRows = [];

            var deletedCount = 0;


            for (
                var i = 0;
                i < this._rows.length;
                i++
            ) {

                var isSelected =
                    this._rows[i].selected === true ||
                    this._rows[i].selected === "true";


                if (
                    isSelected
                ) {

                    deletedCount++;

                } else {

                    remainingRows.push(
                        this._rows[i]
                    );

                }

            }


            /*
             * Nothing selected
             */

            if (
                deletedCount === 0
            ) {

                this._updateDeleteButton();

                return;

            }


            /*
             * Replace data
             */

            this._rows =
                remainingRows;


            /*
             * Re-number remaining rows
             */

            for (
                var j = 0;
                j < this._rows.length;
                j++
            ) {

                this._rows[j].rowId =
                    j + 1;


                this._rows[j].selected =
                    false;

            }


            this._changeStatus =
                "CHANGED";


            /*
             * Re-render
             */

            this._render();


            /*
             * Delete event
             */

            this._emitEvent(
                "onDataEntry",
                "dataEntry|delete|" +
                deletedCount
            );

        }


        /* =====================================================
           RENDER
           ===================================================== */

        _render() {

            var tbody =
                this.shadowRoot
                    .getElementById(
                        "createTableBody"
                    );


            tbody.innerHTML = "";


            var emptyMessage =
                this.shadowRoot
                    .getElementById(
                        "emptyMessage"
                    );


            if (
                this._rows.length === 0
            ) {

                emptyMessage.style.display =
                    "block";

            } else {

                emptyMessage.style.display =
                    "none";

            }


            for (
                var i = 0;
                i < this._rows.length;
                i++
            ) {

                var rowElement =
                    this._createRowElement(
                        this._rows[i],
                        i
                    );


                tbody.appendChild(
                    rowElement
                );

            }


            this._updateStatus();

            this._updateSelectAll();

            this._updateDeleteButton();

        }


        /* =====================================================
           CREATE ROW
           ===================================================== */

        _createRowElement(
            row,
            rowIndex
        ) {

            var tr =
                document.createElement("tr");


            if (
                row.selected === true ||
                row.selected === "true"
            ) {

                tr.classList.add(
                    "selected-row"
                );

            }


            tr.innerHTML = `

                <td class="selection-cell">

                    <input
                        class="selection-checkbox"
                        type="checkbox"
                        data-field="selected"
                        ${
                            (
                                row.selected === true ||
                                row.selected === "true"
                            )
                                ? "checked"
                                : ""
                        }
                    >

                </td>


                <td>

                    ${this._createSelectHTML(
                        "companyCode",
                        row.companyCode,
                        rowIndex
                    )}

                </td>


                <td>

                    ${this._createSelectHTML(
                        "division",
                        row.division,
                        rowIndex
                    )}

                </td>


                <td>

                    ${this._createSelectHTML(
                        "department",
                        row.department,
                        rowIndex
                    )}

                </td>


                <td>

                    ${this._createSelectHTML(
                        "costCenter",
                        row.costCenter,
                        rowIndex
                    )}

                </td>


                <td>

                    ${this._createSelectHTML(
                        "jobCode",
                        row.jobCode,
                        rowIndex
                    )}

                </td>


                <td>

                    <input
                        class="cell-input"
                        type="text"
                        data-field="positionTitle"
                        value="${this._escape(
                            row.positionTitle
                        )}"
                    >

                </td>


                <td>

                    <input
                        class="cell-input readonly"
                        type="text"
                        data-field="employeeId"
                        value="${this._escape(
                            row.employeeId
                        )}"
                        readonly
                    >

                </td>


                <td>

                    <input
                        class="cell-input"
                        type="text"
                        data-field="payGradeGroup"
                        value="${this._escape(
                            row.payGradeGroup
                        )}"
                    >

                </td>


                <td>

                    <input
                        class="cell-input"
                        type="text"
                        data-field="payGradeLevel"
                        value="${this._escape(
                            row.payGradeLevel
                        )}"
                    >

                </td>


                <td>

                    <input
                        class="cell-input"
                        type="date"
                        data-field="hireDate"
                        value="${this._escape(
                            row.hireDate
                        )}"
                    >

                </td>


                <td>

                    <input
                        class="cell-input"
                        type="text"
                        data-field="nationality"
                        value="${this._escape(
                            row.nationality
                        )}"
                    >

                </td>


                <td>

                    <input
                        class="cell-input"
                        type="text"
                        data-field="accommodation"
                        value="${this._escape(
                            row.accommodation
                        )}"
                    >

                </td>


                <td>

                    <input
                        class="cell-input"
                        type="text"
                        data-field="transport"
                        value="${this._escape(
                            row.transport
                        )}"
                    >

                </td>


                <td>

                    <input
                        class="cell-input"
                        type="text"
                        data-field="employeeClass"
                        value="${this._escape(
                            row.employeeClass
                        )}"
                    >

                </td>


                <td>

                    <input
                        class="cell-input"
                        type="text"
                        data-field="overtime"
                        value="${this._escape(
                            row.overtime
                        )}"
                    >

                </td>


                <td>

                    <input
                        class="cell-input"
                        type="text"
                        data-field="specialApproval"
                        value="${this._escape(
                            row.specialApproval
                        )}"
                    >

                </td>


                <td>

                    <input
                        class="cell-input"
                        type="text"
                        data-field="comment"
                        value="${this._escape(
                            row.comment
                        )}"
                    >

                </td>

            `;


            this._attachRowEvents(
                tr,
                rowIndex
            );


            return tr;

        }


        /* =====================================================
           CREATE SELECT
           ===================================================== */

        _createSelectHTML(
            fieldName,
            currentValue,
            rowIndex
        ) {

            var options = [];


            if (
                this._rowOptions[rowIndex] &&
                this._rowOptions[rowIndex][fieldName]
            ) {

                options =
                    this._rowOptions[rowIndex][fieldName];

            }


            var html =
                '<select ' +
                'class="cell-select" ' +
                'data-field="' +
                fieldName +
                '">';


            html +=
                '<option value="">Select</option>';


            var currentExists =
                false;


            for (
                var i = 0;
                i < options.length;
                i++
            ) {

                if (
                    String(options[i].key) ===
                    String(currentValue)
                ) {

                    currentExists =
                        true;

                }

            }


            if (
                currentValue !== "" &&
                currentValue !== undefined &&
                currentValue !== null &&
                !currentExists
            ) {

                html +=
                    '<option value="' +
                    this._escape(
                        currentValue
                    ) +
                    '" selected>' +
                    this._escape(
                        currentValue
                    ) +
                    '</option>';

            }


            for (
                var j = 0;
                j < options.length;
                j++
            ) {

                var option =
                    options[j];


                var selected =
                    String(option.key) ===
                    String(currentValue)
                        ? "selected"
                        : "";


                html +=
                    '<option value="' +
                    this._escape(
                        option.key
                    ) +
                    '" ' +
                    selected +
                    '>' +
                    this._escape(
                        option.text
                    ) +
                    '</option>';

            }


            html +=
                '</select>';


            return html;

        }


        /* =====================================================
           ATTACH ROW EVENTS
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

                        var fieldName =
                            control.dataset.field;


                        var value;


                        /*
                         * Checkbox
                         */

                        if (
                            control.type ===
                            "checkbox"
                        ) {

                            value =
                                control.checked
                                    ? "true"
                                    : "false";

                        } else {

                            value =
                                control.value;

                        }


                        /*
                         * Update internal row
                         */

                        if (
                            this._rows[rowIndex]
                        ) {

                            if (
                                fieldName ===
                                "selected"
                            ) {

                                this._rows[rowIndex].selected =
                                    control.checked;

                            } else {

                                this._rows[rowIndex][fieldName] =
                                    value;

                            }

                        }


                        /* =====================================
                           ROW SELECTION
                           ===================================== */

                        if (
                            fieldName ===
                            "selected"
                        ) {

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


                            this._changeStatus =
                                "CHANGED";


                            this._updateSelectAll();

                            this._updateStatus();

                            this._updateDeleteButton();


                            /*
                             * Selection event
                             */

                            this._emitEvent(
                                "onDataEntry",
                                "dataEntry|select|" +
                                rowIndex +
                                "|" +
                                (
                                    control.checked
                                        ? "true"
                                        : "false"
                                )
                            );


                            return;

                        }


                        /* =====================================
                           NORMAL FIELD CHANGE
                           ===================================== */

                        this._rows[rowIndex].isModified =
                            true;


                        this._changeStatus =
                            "CHANGED";


                        /*
                         * Validation state becomes
                         * unknown/false after editing.
                         */

                        this._validationStatus =
                            true;


                        /*
                         * SAC event
                         *
                         * fieldChange|
                         * rowIndex|
                         * fieldName|
                         * value
                         */

                        this._emitEvent(
                            "onFieldChange",
                            "fieldChange|" +
                            rowIndex +
                            "|" +
                            fieldName +
                            "|" +
                            value
                        );


                        this._updateStatus();

                    }
                );

            }

        }


        /* =====================================================
           GET LAST EVENT
           ===================================================== */

        getLastEvent() {

            return this._lastEvent;

        }


        /* =====================================================
           GET CREATE DATA
           ===================================================== */

        getData() {

            return JSON.stringify(
                this._rows
            );

        }


        /* =====================================================
           SET CREATE DATA
           ===================================================== */

        setData(
            data
        ) {

            if (
                data === undefined ||
                data === null ||
                data === ""
            ) {

                this._rows = [];

                this._render();

                return;

            }


            try {

                if (
                    typeof data ===
                    "string"
                ) {

                    this._rows =
                        JSON.parse(data);

                } else {

                    this._rows =
                        data;

                }


                if (
                    !Array.isArray(
                        this._rows
                    )
                ) {

                    this._rows = [];

                }


                for (
                    var i = 0;
                    i < this._rows.length;
                    i++
                ) {

                    this._rows[i].rowId =
                        i + 1;


                    if (
                        this._rows[i].selected !== true
                    ) {

                        this._rows[i].selected =
                            false;

                    }

                }

            } catch (e) {

                this._rows = [];

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
                this._rows[rowIndex]
            ) {

                this._rows[rowIndex][fieldName] =
                    value;


                this._rows[rowIndex].isModified =
                    true;


                this._changeStatus =
                    "CHANGED";


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

                if (
                    typeof options ===
                    "string"
                ) {

                    this._rowOptions[rowIndex][fieldName] =
                        JSON.parse(options);

                } else {

                    this._rowOptions[rowIndex][fieldName] =
                        options;

                }

            } catch (e) {

                this._rowOptions[rowIndex][fieldName] =
                    [];

            }


            this._render();

        }


        /* =====================================================
           MANAGE DATA
           ===================================================== */

        getManageData() {

            return JSON.stringify(
                this._manageRows
            );

        }


        /* =====================================================
           SET MANAGE DATA
           ===================================================== */

        setManageData(
            data
        ) {

            if (
                data === undefined ||
                data === null ||
                data === ""
            ) {

                this._manageRows = [];

                return;

            }


            try {

                if (
                    typeof data ===
                    "string"
                ) {

                    this._manageRows =
                        JSON.parse(data);

                } else {

                    this._manageRows =
                        data;

                }


                if (
                    !Array.isArray(
                        this._manageRows
                    )
                ) {

                    this._manageRows = [];

                }

            } catch (e) {

                this._manageRows = [];

            }

        }


        /* =====================================================
           SET MANAGE CELL VALUE
           ===================================================== */

        setManageCellValue(
            rowIndex,
            fieldName,
            value
        ) {

            if (
                this._manageRows[rowIndex]
            ) {

                this._manageRows[rowIndex][fieldName] =
                    value;

            }

        }


        /* =====================================================
           SET MANAGE ROW OPTIONS
           ===================================================== */

        setManageRowOptions(
            rowIndex,
            fieldName,
            options
        ) {

            if (
                !this._manageRowOptions[rowIndex]
            ) {

                this._manageRowOptions[rowIndex] =
                    {};

            }


            try {

                if (
                    typeof options ===
                    "string"
                ) {

                    this._manageRowOptions[rowIndex][fieldName] =
                        JSON.parse(options);

                } else {

                    this._manageRowOptions[rowIndex][fieldName] =
                        options;

                }

            } catch (e) {

                this._manageRowOptions[rowIndex][fieldName] =
                    [];

            }

        }


        /* =====================================================
           UPDATE TABS
           ===================================================== */

        _updateTabs() {

            var createTab =
                this.shadowRoot
                    .getElementById(
                        "createTab"
                    );


            var manageTab =
                this.shadowRoot
                    .getElementById(
                        "manageTab"
                    );


            createTab.classList.toggle(
                "active",
                this._activeTab ===
                "create"
            );


            manageTab.classList.toggle(
                "active",
                this._activeTab ===
                "manage"
            );

        }


        /* =====================================================
           UPDATE STATUS
           ===================================================== */

        _updateStatus() {

            var totalRows =
                this._rows.length;


            var selectedCount =
                0;


            for (
                var i = 0;
                i < this._rows.length;
                i++
            ) {

                if (
                    this._rows[i].selected === true ||
                    this._rows[i].selected === "true"
                ) {

                    selectedCount++;

                }

            }


            this.shadowRoot
                .getElementById(
                    "totalRows"
                )
                .textContent =
                    String(totalRows);


            this.shadowRoot
                .getElementById(
                    "selectedRows"
                )
                .textContent =
                    String(selectedCount);


            var validation =
                this.shadowRoot
                    .getElementById(
                        "validationStatus"
                    );


            validation.textContent =
                this._validationStatus
                    ? "true"
                    : "false";


            validation.classList.remove(
                "status-valid"
            );


            validation.classList.remove(
                "status-invalid"
            );


            if (
                this._validationStatus
            ) {

                validation.classList.add(
                    "status-valid"
                );

            } else {

                validation.classList.add(
                    "status-invalid"
                );

            }


            this.shadowRoot
                .getElementById(
                    "changeStatus"
                )
                .textContent =
                    this._changeStatus;

        }


        /* =====================================================
           UPDATE SELECT ALL
           ===================================================== */

        _updateSelectAll() {

            var checkbox =
                this.shadowRoot
                    .getElementById(
                        "selectAllCheckbox"
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
                    this._rows[i].selected === true ||
                    this._rows[i].selected === "true"
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
           UPDATE DELETE BUTTON
           ===================================================== */

        _updateDeleteButton() {

            var deleteButton =
                this.shadowRoot
                    .getElementById(
                        "deleteButton"
                    );


            var selectedCount =
                0;


            for (
                var i = 0;
                i < this._rows.length;
                i++
            ) {

                if (
                    this._rows[i].selected === true ||
                    this._rows[i].selected === "true"
                ) {

                    selectedCount++;

                }

            }


            /*
             * No selection
             * -> Hide Delete
             */

            if (
                selectedCount === 0
            ) {

                deleteButton.style.display =
                    "none";

            }


            /*
             * One or more selections
             * -> Show Delete
             */

            else {

                deleteButton.style.display =
                    "inline-block";

            }

        }


        /* =====================================================
           ESCAPE HTML
           ===================================================== */

        _escape(
            value
        ) {

            if (
                value === undefined ||
                value === null
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
       REGISTER CUSTOM ELEMENT
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
