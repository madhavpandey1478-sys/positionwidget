(function () {

    let template = document.createElement("template");

    template.innerHTML = `

        <style>

            :host {
                display: block;
                width: 100%;
                height: 100%;
                overflow: hidden;
                font-family: Arial, Helvetica, sans-serif;
                box-sizing: border-box;
            }

            * {
                box-sizing: border-box;
            }

            .widget-container {
                width: 100%;
                height: 100%;
                border: 1px solid #8aa4bd;
                background: #ffffff;
                overflow: hidden;
            }

            /* HEADER */

            .header {
                height: 38px;
                display: flex;
                align-items: center;
                padding: 0 8px;
                border-bottom: 1px solid #d5dfe8;
                background: #f4f7fa;
            }

            .title {
                font-size: 12px;
                font-weight: 600;
                color: #3a556d;
            }

            .header-actions {
                margin-left: auto;
                display: flex;
                gap: 5px;
            }

            button {
                height: 25px;
                padding: 0 12px;
                border: 1px solid #8aa4bd;
                border-radius: 3px;
                background: #ffffff;
                color: #1f4e79;
                font-size: 11px;
                cursor: pointer;
            }

            button:hover {
                background: #eef5fb;
            }

            button.primary {
                background: #0a6ed1;
                border-color: #0a6ed1;
                color: white;
            }

            /* TABS */

            .tabs {
                height: 34px;
                display: flex;
                align-items: center;
                border-bottom: 1px solid #d4dce5;
                background: #ffffff;
            }

            .tab {
                height: 33px;
                padding: 0 12px;
                display: flex;
                align-items: center;
                font-size: 11px;
                color: #435b70;
                cursor: pointer;
                border-bottom: 2px solid transparent;
            }

            .tab.active {
                color: #0a6ed1;
                font-weight: 600;
                border-bottom: 2px solid #0a6ed1;
            }

            /* TABLE */

            .table-wrapper {
                width: 100%;
                height: calc(100% - 72px);
                overflow: auto;
            }

            table {
                border-collapse: collapse;
                min-width: 1800px;
                width: max-content;
                table-layout: fixed;
            }

            th {
                height: 31px;
                padding: 4px 6px;
                background: #eef3f7;
                border-right: 1px solid #cbd6df;
                border-bottom: 1px solid #cbd6df;
                color: #334b60;
                font-size: 9px;
                font-weight: 600;
                text-align: left;
                white-space: nowrap;
            }

            td {
                height: 34px;
                padding: 3px;
                border-right: 1px solid #d7dfe7;
                border-bottom: 1px solid #d7dfe7;
                background: white;
            }

            td input,
            td select {
                width: 100%;
                height: 25px;
                border: 1px solid #c9d4df;
                border-radius: 3px;
                background: #ffffff;
                font-size: 10px;
                padding: 2px 5px;
                color: #334b60;
            }

            td input:focus,
            td select:focus {
                outline: none;
                border-color: #0a6ed1;
            }

            .checkbox-cell {
                width: 35px;
                text-align: center;
            }

            .checkbox-cell input {
                width: auto;
                height: auto;
            }

            .status-bar {
                height: 25px;
                display: flex;
                align-items: center;
                padding: 0 8px;
                border-top: 1px solid #d5dfe8;
                background: #f8fafc;
                color: #617487;
                font-size: 9px;
            }

            .empty-message {
                padding: 20px;
                color: #7a8b99;
                font-size: 11px;
            }

        </style>


        <div class="widget-container">

            <div class="header">

                <div class="title">
                    New Position Creation
                </div>

                <div class="header-actions">

                    <button id="addRowButton">
                        Add Row
                    </button>

                    <button id="validateButton">
                        Validate
                    </button>

                    <button id="approvalButton" class="primary">
                        Send for Approval
                    </button>

                    <button id="clearButton">
                        Clear
                    </button>

                </div>

            </div>


            <div class="tabs">

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


            <div class="table-wrapper">

                <table>

                    <thead>

                        <tr>

                            <th style="width:35px;">
                                Sel
                            </th>

                            <th style="width:90px;">
                                Company Code
                            </th>

                            <th style="width:120px;">
                                Division
                            </th>

                            <th style="width:120px;">
                                Department
                            </th>

                            <th style="width:120px;">
                                Cost Center
                            </th>

                            <th style="width:120px;">
                                Job Code
                            </th>

                            <th style="width:135px;">
                                Position Title
                            </th>

                            <th style="width:120px;">
                                Position ID
                            </th>

                            <th style="width:90px;">
                                Pay Grade
                            </th>

                            <th style="width:80px;">
                                Level
                            </th>

                            <th style="width:110px;">
                                Hire Date
                            </th>

                            <th style="width:110px;">
                                Nationality
                            </th>

                            <th style="width:110px;">
                                Accommodation
                            </th>

                            <th style="width:100px;">
                                Transport
                            </th>

                            <th style="width:100px;">
                                Employee Class
                            </th>

                            <th style="width:80px;">
                                Overtime
                            </th>

                            <th style="width:110px;">
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

                    Click "Add Row" to create a new position.

                </div>

            </div>


            <div class="status-bar">

                <span id="statusText">
                    Total Rows: 0 &nbsp;&nbsp; Validation: True &nbsp;&nbsp; Error Rows: 0
                </span>

            </div>

        </div>
    `;


    class PositionEntry extends HTMLElement {

        constructor() {

            super();

            this.attachShadow({
                mode: "open"
            });

            this.shadowRoot.appendChild(
                template.content.cloneNode(true)
            );

            this._rows = [];

            this._manageRows = [];

            this._lastEvent = "";

            this._activeTab = "create";

            this._rowOptions = {};

            this._manageRowOptions = {};

            this._bindEvents();

            this._render();

        }


        /* =====================================================
           EVENT HANDLING
        ===================================================== */

        _bindEvents() {

            this.shadowRoot
                .getElementById("addRowButton")
                .addEventListener("click", () => {

                    this._addRow();

                });


            this.shadowRoot
                .getElementById("clearButton")
                .addEventListener("click", () => {

                    this._rows = [];

                    this._emitEvent("clear");

                    this._render();

                });


            this.shadowRoot
                .getElementById("validateButton")
                .addEventListener("click", () => {

                    this._emitEvent("validate");

                });


            this.shadowRoot
                .getElementById("approvalButton")
                .addEventListener("click", () => {

                    this._emitEvent("sendForApproval");

                });


            this.shadowRoot
                .getElementById("createTab")
                .addEventListener("click", () => {

                    this._activeTab = "create";

                    this._emitEvent("tabChange|create");

                    this._updateTabs();

                });


            this.shadowRoot
                .getElementById("manageTab")
                .addEventListener("click", () => {

                    this._activeTab = "manage";

                    this._emitEvent("tabChange|manage");

                    this._updateTabs();

                });

        }


        /* =====================================================
           ADD ROW
        ===================================================== */

        _addRow() {

            const row = {

                rowId: this._rows.length + 1,

                selected: false,

                employeeId: "",

                companyCode: "",

                division: "",

                department: "",

                costCenter: "",

                jobCode: "",

                positionTitle: "",

                payGradeGroup: "",

                payGradeLevel: "",

                hireDate: "",

                nationality: "",

                accommodation: "",

                transport: "",

                employeeClass: "",

                overtime: "",

                specialApproval: "",

                comment: ""

            };


            this._rows.push(row);

            this._render();

        }


        /* =====================================================
           RENDER
        ===================================================== */

        _render() {

            const tbody =
                this.shadowRoot
                    .getElementById("createTableBody");


            tbody.innerHTML = "";


            const empty =
                this.shadowRoot
                    .getElementById("emptyMessage");


            if (this._rows.length === 0) {

                empty.style.display = "block";

            } else {

                empty.style.display = "none";

            }


            for (
                let i = 0;
                i < this._rows.length;
                i++
            ) {

                tbody.appendChild(
                    this._createRowElement(
                        this._rows[i],
                        i
                    )
                );

            }


            this._updateStatus();

        }


        /* =====================================================
           CREATE ROW
        ===================================================== */

        _createRowElement(row, index) {

            const tr =
                document.createElement("tr");


            tr.innerHTML = `

                <td class="checkbox-cell">

                    <input
                        type="checkbox"
                        data-field="selected"
                        ${row.selected ? "checked" : ""}
                    >

                </td>

                <td>
                    ${this._selectHTML(
                        "companyCode",
                        index
                    )}
                </td>

                <td>
                    ${this._selectHTML(
                        "division",
                        index
                    )}
                </td>

                <td>
                    ${this._selectHTML(
                        "department",
                        index
                    )}
                </td>

                <td>
                    ${this._selectHTML(
                        "costCenter",
                        index
                    )}
                </td>

                <td>
                    ${this._selectHTML(
                        "jobCode",
                        index
                    )}
                </td>

                <td>
                    <input
                        type="text"
                        data-field="positionTitle"
                        value="${this._escape(row.positionTitle)}"
                    >
                </td>

                <td>
                    <input
                        type="text"
                        data-field="employeeId"
                        value="${this._escape(row.employeeId)}"
                        readonly
                    >
                </td>

                <td>
                    <input
                        type="text"
                        data-field="payGradeGroup"
                        value="${this._escape(row.payGradeGroup)}"
                    >
                </td>

                <td>
                    <input
                        type="text"
                        data-field="payGradeLevel"
                        value="${this._escape(row.payGradeLevel)}"
                    >
                </td>

                <td>
                    <input
                        type="date"
                        data-field="hireDate"
                        value="${this._escape(row.hireDate)}"
                    >
                </td>

                <td>
                    <input
                        type="text"
                        data-field="nationality"
                        value="${this._escape(row.nationality)}"
                    >
                </td>

                <td>
                    <input
                        type="text"
                        data-field="accommodation"
                        value="${this._escape(row.accommodation)}"
                    >
                </td>

                <td>
                    <input
                        type="text"
                        data-field="transport"
                        value="${this._escape(row.transport)}"
                    >
                </td>

                <td>
                    <input
                        type="text"
                        data-field="employeeClass"
                        value="${this._escape(row.employeeClass)}"
                    >
                </td>

                <td>
                    <input
                        type="text"
                        data-field="overtime"
                        value="${this._escape(row.overtime)}"
                    >
                </td>

                <td>
                    <input
                        type="text"
                        data-field="specialApproval"
                        value="${this._escape(row.specialApproval)}"
                    >
                </td>

                <td>
                    <input
                        type="text"
                        data-field="comment"
                        value="${this._escape(row.comment)}"
                    >
                </td>
            `;


            this._attachRowEvents(
                tr,
                index
            );


            return tr;

        }


        /* =====================================================
           SELECT HTML
        ===================================================== */

        _selectHTML(field, index) {

            let options = [];

            if (
                this._rowOptions[index] &&
                this._rowOptions[index][field]
            ) {

                options =
                    this._rowOptions[index][field];

            }


            let html =
                `<select data-field="${field}">`;

            html += `<option value="">Select</option>`;


            for (
                let i = 0;
                i < options.length;
                i++
            ) {

                const option =
                    options[i];

                html += `
                    <option
                        value="${this._escape(option.key)}">
                        ${this._escape(option.text)}
                    </option>
                `;

            }


            html += `</select>`;


            return html;

        }


        /* =====================================================
           ROW EVENTS
        ===================================================== */

        _attachRowEvents(tr, index) {

            const controls =
                tr.querySelectorAll(
                    "[data-field]"
                );


            controls.forEach(
                control => {

                    control.addEventListener(
                        "change",
                        () => {

                            const field =
                                control.dataset.field;


                            let value;


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


                            this._rows[index][field] =
                                value;


                            this._emitEvent(
                                "fieldChange|" +
                                index +
                                "|" +
                                field +
                                "|" +
                                value
                            );

                        }
                    );

                }
            );

        }


        /* =====================================================
           EVENTS TO SAC
        ===================================================== */

        _emitEvent(eventText) {

            this._lastEvent =
                eventText;


            this.dispatchEvent(
                new Event("onEvent")
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

            let result = [];


            for (
                let i = 0;
                i < this._rows.length;
                i++
            ) {

                const row =
                    this._rows[i];


                let fields = [];


                for (
                    const key in row
                ) {

                    fields.push(
                        key +
                        "::" +
                        row[key]
                    );

                }


                result.push(
                    fields.join("~~")
                );

            }


            return result.join("||");

        }


        /* =====================================================
           SET DATA
        ===================================================== */

        setData(data) {

            if (
                !data ||
                data === ""
            ) {

                this._rows = [];

                this._render();

                return;

            }


            const rows =
                data.split("||");


            this._rows = [];


            rows.forEach(
                rowText => {

                    if (
                        rowText === ""
                    ) {

                        return;

                    }


                    const row = {};


                    const fields =
                        rowText.split("~~");


                    fields.forEach(
                        pair => {

                            const index =
                                pair.indexOf("::");


                            if (
                                index > -1
                            ) {

                                const key =
                                    pair.substring(
                                        0,
                                        index
                                    );

                                const value =
                                    pair.substring(
                                        index + 2
                                    );


                                row[key] =
                                    value;

                            }

                        }
                    );


                    this._rows.push(row);

                }
            );


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
           SET DROPDOWN OPTIONS
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
                    JSON.parse(options);

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


        setManageData(data) {

            try {

                this._manageRows =
                    JSON.parse(data);

            } catch (e) {

                this._manageRows = [];

            }

        }


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

                this._manageRowOptions[rowIndex][fieldName] =
                    JSON.parse(options);

            } catch (e) {

                this._manageRowOptions[rowIndex][fieldName] =
                    [];

            }

        }


        /* =====================================================
           TAB UI
        ===================================================== */

        _updateTabs() {

            const createTab =
                this.shadowRoot
                    .getElementById("createTab");

            const manageTab =
                this.shadowRoot
                    .getElementById("manageTab");


            createTab.classList.toggle(
                "active",
                this._activeTab === "create"
            );


            manageTab.classList.toggle(
                "active",
                this._activeTab === "manage"
            );

        }


        /* =====================================================
           STATUS
        ===================================================== */

        _updateStatus() {

            this.shadowRoot
                .getElementById("statusText")
                .textContent =
                    "Total Rows: " +
                    this._rows.length +
                    "    Validation: True    Error Rows: 0";

        }


        /* =====================================================
           ESCAPE HTML
        ===================================================== */

        _escape(value) {

            if (
                value === undefined ||
                value === null
            ) {

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


    customElements.define(
        "com-madhav-positionentry",
        PositionEntry
    );

})();