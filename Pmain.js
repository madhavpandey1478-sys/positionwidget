(function () {
    "use strict";

    class PositionEntry extends HTMLElement {

        constructor() {
            super();

            this.attachShadow({ mode: "open" });

            this.rows = [];
            this.lastEvent = "";
            this.dropdown = null;
            this.dropdownRow = null;
            this.dropdownField = null;

            this.fields = [
                {
                    key: "companyCode",
                    label: "Company Code",
                    type: "select",
                    width: 155,
                    options: [
                        "ALL_SBU",
                        "1000 - Corporate",
                        "1001 - HR Services",
                        "1002 - Finance",
                        "1003 - Procurement",
                        "1004 - IT Operations",
                        "1005 - Facilities"
                    ]
                },
                {
                    key: "division",
                    label: "Division",
                    type: "select",
                    width: 145,
                    options: [
                        "Select",
                        "Corporate",
                        "Operations",
                        "Finance",
                        "HR",
                        "Technology",
                        "Sales"
                    ]
                },
                {
                    key: "department",
                    label: "Department",
                    type: "select",
                    width: 170,
                    options: [
                        "Select",
                        "Human Resources",
                        "Finance",
                        "Procurement",
                        "Information Technology",
                        "Operations",
                        "Sales",
                        "Marketing"
                    ]
                },
                {
                    key: "costCenter",
                    label: "Cost Center",
                    type: "select",
                    width: 165,
                    options: [
                        "Select",
                        "1000 - Corporate",
                        "1001 - HR Services",
                        "1002 - Finance",
                        "1003 - Procurement",
                        "1004 - IT Operations",
                        "1005 - Facilities"
                    ]
                },
                {
                    key: "jobCode",
                    label: "Job Code",
                    type: "select",
                    width: 150,
                    options: [
                        "Select",
                        "JC1001",
                        "JC1002",
                        "JC1003",
                        "JC1004",
                        "JC1005",
                        "JC1006"
                    ]
                },
                {
                    key: "positionTitle",
                    label: "Position Title",
                    type: "text",
                    width: 190
                },
                {
                    key: "positionId",
                    label: "Position ID",
                    type: "readonly",
                    width: 135
                },
                {
                    key: "payGrade",
                    label: "Pay Grade",
                    type: "select",
                    width: 125,
                    options: [
                        "Select",
                        "P1",
                        "P2",
                        "P3",
                        "P4",
                        "P5",
                        "P6",
                        "P7"
                    ]
                },
                {
                    key: "level",
                    label: "Level",
                    type: "select",
                    width: 110,
                    options: [
                        "Select",
                        "L1",
                        "L2",
                        "L3",
                        "L4",
                        "L5",
                        "L6",
                        "L7"
                    ]
                },
                {
                    key: "hireDate",
                    label: "Hire Date",
                    type: "date",
                    width: 165
                },
                {
                    key: "nationality",
                    label: "Nationality",
                    type: "select",
                    width: 145,
                    options: [
                        "Select",
                        "Indian",
                        "Saudi",
                        "Emirati",
                        "Qatari",
                        "Omani",
                        "Bahraini",
                        "Kuwaiti",
                        "Other"
                    ]
                },
                {
                    key: "accommodation",
                    label: "Accommodation",
                    type: "select",
                    width: 160,
                    options: [
                        "Select",
                        "Provided",
                        "Not Provided"
                    ]
                },
                {
                    key: "transport",
                    label: "Transport",
                    type: "select",
                    width: 140,
                    options: [
                        "Select",
                        "Provided",
                        "Not Provided"
                    ]
                },
                {
                    key: "employeeClass",
                    label: "Employee Class",
                    type: "select",
                    width: 155,
                    options: [
                        "Select",
                        "Permanent",
                        "Contract",
                        "Temporary",
                        "Intern"
                    ]
                },
                {
                    key: "overtime",
                    label: "Overtime",
                    type: "select",
                    width: 125,
                    options: [
                        "Select",
                        "Eligible",
                        "Not Eligible"
                    ]
                },
                {
                    key: "specialApproval",
                    label: "Special Approval",
                    type: "select",
                    width: 155,
                    options: [
                        "Select",
                        "Required",
                        "Not Required"
                    ]
                },
                {
                    key: "comment",
                    label: "Comment",
                    type: "text",
                    width: 230
                }
            ];

            this.createInitialRow();
        }

        connectedCallback() {
            this.render();
        }

        /* ============================================================
           DATA
        ============================================================ */

        createEmptyRow() {

            const row = {
                selected: false,
                valid: null,
                error: false
            };

            this.fields.forEach(field => {
                row[field.key] = "";
            });

            // Default company code as shown in the reference design
            row.companyCode = "ALL_SBU";

            return row;
        }

        createInitialRow() {
            this.rows = [this.createEmptyRow()];
        }

        /* ============================================================
           STYLES
        ============================================================ */

        getStyles() {

            return `
                :host {
                    display: block;
                    width: 100%;
                    height: 100%;
                    min-height: 420px;
                    box-sizing: border-box;

                    font-family:
                        "72",
                        "72full",
                        Arial,
                        Helvetica,
                        sans-serif;

                    color: #1d2d3e;
                    background: #ffffff;
                }

                * {
                    box-sizing: border-box;
                }

                .widget {
                    width: 100%;
                    height: 100%;
                    min-height: 420px;
                    display: flex;
                    flex-direction: column;
                    background: #ffffff;
                    overflow: hidden;
                }

                /* ====================================================
                   TOOLBAR
                ==================================================== */

                .toolbar {
                    height: 68px;
                    min-height: 68px;

                    display: flex;
                    align-items: center;
                    justify-content: flex-end;

                    gap: 10px;

                    padding: 12px 16px;

                    background: #ffffff;

                    border-bottom: 1px solid #d9e2ec;
                }

                .toolbar-spacer {
                    flex: 1;
                }

                button {
                    font-family: inherit;
                }

                .action-btn {
                    height: 40px;
                    padding: 0 18px;

                    border-radius: 8px;

                    border: 1px solid #b9cce0;

                    background: #ffffff;

                    color: #0064d9;

                    font-size: 14px;
                    font-weight: 600;

                    cursor: pointer;

                    transition:
                        background .15s ease,
                        border-color .15s ease,
                        box-shadow .15s ease;
                }

                .action-btn:hover {
                    background: #f1f7fd;
                    border-color: #0070e0;
                }

                .action-btn:active {
                    background: #e5f1fc;
                }

                .action-btn.primary {
                    color: #ffffff;
                    background: #0879d9;
                    border-color: #0879d9;
                }

                .action-btn.primary:hover {
                    background: #0068c9;
                    border-color: #0068c9;
                }

                .action-btn.delete {
                    color: #d92d20;
                    border-color: #f2b8b5;
                }

                .action-btn.delete:hover {
                    background: #fff4f3;
                    border-color: #d92d20;
                }

                .action-btn.hidden {
                    display: none;
                }

                /* ====================================================
                   TABLE AREA
                ==================================================== */

                .table-container {
                    flex: 1;

                    min-height: 0;

                    overflow-x: auto;
                    overflow-y: auto;

                    position: relative;

                    background: #ffffff;
                }

                .table {
                    min-width: 2550px;
                    width: max-content;

                    border-collapse: separate;
                    border-spacing: 0;

                    table-layout: fixed;
                }

                /* ====================================================
                   HEADER
                ==================================================== */

                thead th {
                    position: sticky;
                    top: 0;
                    z-index: 5;

                    height: 52px;

                    padding: 0 14px;

                    text-align: left;
                    vertical-align: middle;

                    background: #edf4fb;

                    border-right: 1px solid #d7e1eb;
                    border-bottom: 1px solid #d0dce8;

                    color: #17324d;

                    font-size: 14px;
                    font-weight: 700;

                    white-space: nowrap;
                }

                thead th:first-child {
                    text-align: center;
                }

                /* ====================================================
                   BODY
                ==================================================== */

                tbody td {
                    height: 64px;

                    padding: 0 14px;

                    vertical-align: middle;

                    background: #ffffff;

                    border-right: 1px solid #e1e8ef;
                    border-bottom: 1px solid #e1e8ef;

                    color: #334e68;

                    font-size: 14px;
                }

                tbody tr:hover td {
                    background: #f8fbfe;
                }

                tbody tr.selected td {
                    background: #fff9df;
                }

                tbody tr.error td {
                    background: #fff2f1;
                }

                tbody tr.valid td {
                    background: #f5fbf7;
                }

                /* ====================================================
                   CHECKBOX
                ==================================================== */

                .check-wrap {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .check {
                    width: 21px;
                    height: 21px;

                    appearance: none;

                    border: 1.5px solid #7b8fa3;
                    border-radius: 3px;

                    background: #ffffff;

                    cursor: pointer;

                    position: relative;
                }

                .check:hover {
                    border-color: #0070e0;
                }

                .check:checked {
                    background: #0879d9;
                    border-color: #0879d9;
                }

                .check:checked::after {
                    content: "";

                    position: absolute;

                    left: 6px;
                    top: 2px;

                    width: 6px;
                    height: 11px;

                    border:
                        solid #ffffff;

                    border-width:
                        0 2px 2px 0;

                    transform: rotate(45deg);
                }

                /* ====================================================
                   CELL CONTENT
                ==================================================== */

                .cell {
                    width: 100%;
                    height: 42px;

                    display: flex;
                    align-items: center;

                    position: relative;
                }

                .cell-input {
                    width: 100%;
                    height: 42px;

                    border: none;
                    outline: none;

                    background: transparent;

                    color: #243b53;

                    font-family: inherit;
                    font-size: 14px;

                    padding: 0 4px;

                    border-bottom: 1px solid #c9d6e3;

                    transition:
                        border-color .15s ease,
                        background .15s ease;
                }

                .cell-input:hover {
                    border-bottom-color: #7c9ab6;
                }

                .cell-input:focus {
                    border-bottom: 2px solid #0070e0;
                    background: #f8fbff;
                }

                .cell-input::placeholder {
                    color: #8a9bab;
                }

                .readonly {
                    color: #6b7c8f;

                    background:
                        linear-gradient(
                            90deg,
                            #edf2f7,
                            #f4f7fa
                        );

                    border-bottom: none;

                    border-radius: 5px;

                    padding-left: 12px;
                }

                /* ====================================================
                   SELECT CELL
                ==================================================== */

                .select-cell {
                    width: 100%;
                    height: 42px;

                    display: flex;
                    align-items: center;

                    padding: 0 4px;

                    border-bottom: 1px solid #c9d6e3;

                    cursor: pointer;

                    position: relative;
                }

                .select-cell:hover {
                    border-bottom-color: #7c9ab6;
                    background: #f8fbff;
                }

                .select-cell.active {
                    border-bottom: 2px solid #0070e0;
                    background: #f8fbff;
                }

                .select-value {
                    flex: 1;

                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;

                    color: #334e68;
                }

                .select-value.placeholder {
                    color: #7b8fa3;
                }

                .select-arrow {
                    width: 18px;
                    min-width: 18px;

                    text-align: center;

                    color: #58728a;

                    font-size: 15px;
                }

                /* ====================================================
                   DATE
                ==================================================== */

                .date-input {
                    width: 100%;
                    height: 42px;

                    border: none;
                    border-bottom: 1px solid #c9d6e3;

                    background: transparent;

                    outline: none;

                    color: #334e68;

                    font-family: inherit;
                    font-size: 14px;

                    padding: 0 4px;
                }

                .date-input:focus {
                    border-bottom: 2px solid #0070e0;
                    background: #f8fbff;
                }

                /* ====================================================
                   DROPDOWN
                ==================================================== */

                .dropdown {
                    position: fixed;

                    z-index: 10000;

                    width: 310px;

                    background: #ffffff;

                    border: 1px solid #c9d7e5;

                    border-radius: 9px;

                    box-shadow:
                        0 8px 24px rgba(0, 50, 100, .16),
                        0 2px 6px rgba(0, 50, 100, .08);

                    overflow: hidden;
                }

                .dropdown-search {
                    padding: 10px;

                    background: #ffffff;

                    border-bottom: 1px solid #e0e7ef;
                }

                .search-wrap {
                    height: 40px;

                    display: flex;
                    align-items: center;

                    border: 1px solid #b7c9dc;

                    border-radius: 7px;

                    padding: 0 10px;

                    background: #ffffff;
                }

                .search-icon {
                    width: 20px;

                    color: #57718b;

                    font-size: 17px;
                }

                .search-input {
                    flex: 1;

                    height: 100%;

                    border: none;
                    outline: none;

                    font-family: inherit;
                    font-size: 14px;

                    color: #243b53;

                    background: transparent;

                    padding: 0 7px;
                }

                .search-clear {
                    width: 20px;

                    border: none;
                    background: transparent;

                    color: #607d95;

                    cursor: pointer;

                    font-size: 17px;
                }

                .options {
                    max-height: 270px;

                    overflow-y: auto;

                    padding: 5px 0;
                }

                .option {
                    min-height: 40px;

                    display: flex;
                    align-items: center;

                    padding: 0 14px;

                    cursor: pointer;

                    color: #304b65;

                    font-size: 14px;
                }

                .option:hover {
                    background: #edf5fc;
                }

                .option.selected {
                    background: #e7f2fc;

                    color: #0064d9;

                    font-weight: 600;
                }

                .no-results {
                    padding: 20px;

                    text-align: center;

                    color: #8091a5;

                    font-size: 13px;
                }

                /* ====================================================
                   FOOTER
                ==================================================== */

                .footer {
                    min-height: 45px;

                    height: 45px;

                    display: flex;
                    align-items: center;

                    padding: 0 18px;

                    gap: 22px;

                    background: #f7f9fb;

                    border-top: 1px solid #d9e2ec;

                    color: #536b82;

                    font-size: 13px;
                }

                .footer-item {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }

                .footer-value {
                    font-weight: 700;
                    color: #243b53;
                }

                .footer-separator {
                    width: 1px;
                    height: 20px;

                    background: #ccd7e2;
                }

                .status-valid {
                    color: #18794e;
                }

                .status-invalid {
                    color: #c62828;
                }

                /* ====================================================
                   SCROLLBAR
                ==================================================== */

                .table-container::-webkit-scrollbar {
                    height: 13px;
                    width: 13px;
                }

                .table-container::-webkit-scrollbar-track {
                    background: #eef2f6;
                }

                .table-container::-webkit-scrollbar-thumb {
                    background: #a9b8c7;

                    border-radius: 8px;

                    border: 3px solid #eef2f6;
                }

                .table-container::-webkit-scrollbar-thumb:hover {
                    background: #8498aa;
                }
            `;
        }

        /* ============================================================
           RENDER
        ============================================================ */

        render() {

            this.shadowRoot.innerHTML = `
                <style>
                    ${this.getStyles()}
                </style>

                <div class="widget">

                    <div class="toolbar">

                        <div class="toolbar-spacer"></div>

                        <button
                            class="action-btn"
                            id="addBtn">
                            Add Row
                        </button>

                        <button
                            class="action-btn"
                            id="copyBtn">
                            Copy
                        </button>

                        <button
                            class="action-btn delete hidden"
                            id="deleteBtn">
                            Delete Selected
                        </button>

                        <button
                            class="action-btn"
                            id="validateBtn">
                            Validate
                        </button>

                        <button
                            class="action-btn primary"
                            id="approvalBtn">
                            Send for Approval
                        </button>

                        <button
                            class="action-btn"
                            id="clearBtn">
                            Clear
                        </button>

                    </div>

                    <div class="table-container" id="tableContainer">
                        <table class="table">

                            <colgroup>
                                <col style="width:70px">
                                ${this.fields.map(
                                    field =>
                                        `<col style="width:${field.width}px">`
                                ).join("")}
                            </colgroup>

                            <thead>
                                <tr>

                                    <th>
                                        <div class="check-wrap">
                                            <input
                                                type="checkbox"
                                                class="check"
                                                id="selectAll">
                                        </div>
                                    </th>

                                    ${this.fields.map(
                                        field =>
                                            `<th>${field.label}</th>`
                                    ).join("")}

                                </tr>
                            </thead>

                            <tbody id="tbody"></tbody>

                        </table>
                    </div>

                    <div class="footer">

                        <div class="footer-item">
                            Total Rows:
                            <span
                                class="footer-value"
                                id="totalRows">
                                0
                            </span>
                        </div>

                        <div class="footer-separator"></div>

                        <div class="footer-item">
                            Selected Rows:
                            <span
                                class="footer-value"
                                id="selectedRows">
                                0
                            </span>
                        </div>

                        <div class="footer-separator"></div>

                        <div class="footer-item">
                            Validation:
                            <span
                                class="footer-value"
                                id="validationStatus">
                                -
                            </span>
                        </div>

                        <div class="footer-separator"></div>

                        <div class="footer-item">
                            Error Rows:
                            <span
                                class="footer-value"
                                id="errorRows">
                                0
                            </span>
                        </div>

                    </div>

                </div>
            `;

            this.cacheElements();
            this.renderRows();
            this.bindToolbar();
            this.updateStatus();
        }

        cacheElements() {

            this.tbody =
                this.shadowRoot.querySelector("#tbody");

            this.selectAll =
                this.shadowRoot.querySelector("#selectAll");

            this.deleteBtn =
                this.shadowRoot.querySelector("#deleteBtn");

            this.totalRows =
                this.shadowRoot.querySelector("#totalRows");

            this.selectedRows =
                this.shadowRoot.querySelector("#selectedRows");

            this.validationStatus =
                this.shadowRoot.querySelector("#validationStatus");

            this.errorRows =
                this.shadowRoot.querySelector("#errorRows");
        }

        /* ============================================================
           ROW RENDERING
        ============================================================ */

        renderRows() {

            this.tbody.innerHTML = "";

            this.rows.forEach(
                (row, rowIndex) => {

                    const tr =
                        document.createElement("tr");

                    if (row.selected) {
                        tr.classList.add("selected");
                    }

                    if (row.error) {
                        tr.classList.add("error");
                    }

                    if (
                        row.valid === true &&
                        !row.error
                    ) {
                        tr.classList.add("valid");
                    }

                    /* Selection cell */

                    const selectTd =
                        document.createElement("td");

                    selectTd.innerHTML = `
                        <div class="check-wrap">
                            <input
                                type="checkbox"
                                class="check row-check"
                                ${row.selected ? "checked" : ""}
                            >
                        </div>
                    `;

                    const rowCheck =
                        selectTd.querySelector(".row-check");

                    rowCheck.addEventListener(
                        "change",
                        () => {

                            row.selected =
                                rowCheck.checked;

                            this.updateRowSelectionClass(
                                tr,
                                row
                            );

                            this.updateStatus();

                            this.fireEvent(
                                "onSelectionChange",
                                {
                                    rowIndex: rowIndex,
                                    selected: row.selected
                                }
                            );
                        }
                    );

                    tr.appendChild(selectTd);

                    /* Data cells */

                    this.fields.forEach(
                        field => {

                            const td =
                                document.createElement("td");

                            this.renderField(
                                td,
                                row,
                                rowIndex,
                                field
                            );

                            tr.appendChild(td);
                        }
                    );

                    this.tbody.appendChild(tr);
                }
            );

            this.updateSelectAllState();
            this.updateStatus();
        }

        updateRowSelectionClass(tr, row) {

            tr.classList.toggle(
                "selected",
                row.selected
            );
        }

        /* ============================================================
           FIELD RENDERING
        ============================================================ */

        renderField(
            td,
            row,
            rowIndex,
            field
        ) {

            const value =
                row[field.key] || "";

            /* SELECT */

            if (field.type === "select") {

                const cell =
                    document.createElement("div");

                cell.className =
                    "select-cell";

                const valueElement =
                    document.createElement("span");

                valueElement.className =
                    "select-value";

                if (
                    !value ||
                    value === "Select"
                ) {
                    valueElement.classList.add(
                        "placeholder"
                    );
                }

                valueElement.textContent =
                    value || "Select";

                const arrow =
                    document.createElement("span");

                arrow.className =
                    "select-arrow";

                arrow.textContent = "⌄";

                cell.appendChild(valueElement);
                cell.appendChild(arrow);

                cell.addEventListener(
                    "click",
                    event => {

                        event.stopPropagation();

                        this.openDropdown(
                            cell,
                            rowIndex,
                            field
                        );
                    }
                );

                td.appendChild(cell);

                return;
            }

            /* DATE */

            if (field.type === "date") {

                const input =
                    document.createElement("input");

                input.type = "date";

                input.className =
                    "date-input";

                input.value =
                    value;

                input.addEventListener(
                    "change",
                    () => {

                        row[field.key] =
                            input.value;

                        row.valid = null;
                        row.error = false;

                        this.dataChanged(
                            rowIndex,
                            field.key,
                            input.value
                        );
                    }
                );

                td.appendChild(input);

                return;
            }

            /* TEXT / READONLY */

            const input =
                document.createElement("input");

            input.type = "text";

            input.className =
                "cell-input";

            if (field.type === "readonly") {

                input.classList.add(
                    "readonly"
                );

                input.readOnly = true;
            }

            input.value =
                value;

            if (field.key === "positionTitle") {

                input.placeholder =
                    "Enter position title";
            }

            if (field.key === "comment") {

                input.placeholder =
                    "Enter comment";
            }

            input.addEventListener(
                "input",
                () => {

                    row[field.key] =
                        input.value;

                    row.valid = null;
                    row.error = false;

                    this.dataChanged(
                        rowIndex,
                        field.key,
                        input.value
                    );
                }
            );

            td.appendChild(input);
        }

        /* ============================================================
           DROPDOWN
        ============================================================ */

        openDropdown(
            cell,
            rowIndex,
            field
        ) {

            this.closeDropdown();

            this.dropdownRow =
                rowIndex;

            this.dropdownField =
                field.key;

            cell.classList.add("active");

            const dropdown =
                document.createElement("div");

            dropdown.className =
                "dropdown";

            const searchArea =
                document.createElement("div");

            searchArea.className =
                "dropdown-search";

            searchArea.innerHTML = `
                <div class="search-wrap">

                    <span class="search-icon">
                        ⌕
                    </span>

                    <input
                        class="search-input"
                        type="text"
                        placeholder="Search..."
                    >

                    <button
                        class="search-clear"
                        type="button">
                        ×
                    </button>

                </div>
            `;

            dropdown.appendChild(searchArea);

            const optionsContainer =
                document.createElement("div");

            optionsContainer.className =
                "options";

            dropdown.appendChild(
                optionsContainer
            );

            document.body.appendChild(
                dropdown
            );

            this.dropdown =
                dropdown;

            this.positionDropdown(
                cell,
                dropdown
            );

            const searchInput =
                dropdown.querySelector(
                    ".search-input"
                );

            const clearSearch =
                dropdown.querySelector(
                    ".search-clear"
                );

            const renderOptions =
                () => {

                    const query =
                        searchInput.value
                            .trim()
                            .toLowerCase();

                    optionsContainer.innerHTML = "";

                    const options =
                        field.options.filter(
                            option => {

                                if (
                                    !query
                                ) {
                                    return true;
                                }

                                return option
                                    .toLowerCase()
                                    .includes(query);
                            }
                        );

                    if (!options.length) {

                        optionsContainer.innerHTML = `
                            <div class="no-results">
                                No results found
                            </div>
                        `;

                        return;
                    }

                    options.forEach(
                        option => {

                            const item =
                                document.createElement(
                                    "div"
                                );

                            item.className =
                                "option";

                            if (
                                option ===
                                this.rows[rowIndex][field.key]
                            ) {
                                item.classList.add(
                                    "selected"
                                );
                            }

                            item.textContent =
                                option;

                            item.addEventListener(
                                "click",
                                event => {

                                    event.stopPropagation();

                                    this.rows[rowIndex][
                                        field.key
                                    ] =
                                        option === "Select"
                                            ? ""
                                            : option;

                                    this.rows[rowIndex]
                                        .valid = null;

                                    this.rows[rowIndex]
                                        .error = false;

                                    this.closeDropdown();

                                    this.renderRows();

                                    this.dataChanged(
                                        rowIndex,
                                        field.key,
                                        this.rows[rowIndex][
                                            field.key
                                        ]
                                    );
                                }
                            );

                            optionsContainer.appendChild(
                                item
                            );
                        }
                    );
                };

            searchInput.addEventListener(
                "input",
                renderOptions
            );

            clearSearch.addEventListener(
                "click",
                () => {

                    searchInput.value = "";

                    searchInput.focus();

                    renderOptions();
                }
            );

            renderOptions();

            setTimeout(
                () => searchInput.focus(),
                0
            );

            this.dropdownOutsideHandler =
                event => {

                    if (
                        !dropdown.contains(
                            event.target
                        ) &&
                        !cell.contains(
                            event.target
                        )
                    ) {
                        this.closeDropdown();
                    }
                };

            document.addEventListener(
                "mousedown",
                this.dropdownOutsideHandler
            );
        }

        positionDropdown(
            cell,
            dropdown
        ) {

            const rect =
                cell.getBoundingClientRect();

            const dropdownWidth =
                310;

            let left =
                rect.left;

            let top =
                rect.bottom + 4;

            if (
                left + dropdownWidth >
                window.innerWidth - 10
            ) {

                left =
                    window.innerWidth -
                    dropdownWidth -
                    10;
            }

            const estimatedHeight =
                360;

            if (
                top + estimatedHeight >
                window.innerHeight - 10
            ) {

                top =
                    rect.top -
                    estimatedHeight -
                    4;
            }

            if (left < 10) {
                left = 10;
            }

            if (top < 10) {
                top = 10;
            }

            dropdown.style.left =
                `${left}px`;

            dropdown.style.top =
                `${top}px`;
        }

        closeDropdown() {

            if (!this.dropdown) {
                return;
            }

            this.dropdown.remove();

            this.dropdown =
                null;

            if (
                this.dropdownOutsideHandler
            ) {

                document.removeEventListener(
                    "mousedown",
                    this.dropdownOutsideHandler
                );

                this.dropdownOutsideHandler =
                    null;
            }

            this.renderRows();
        }

        /* ============================================================
           TOOLBAR
        ============================================================ */

        bindToolbar() {

            this.shadowRoot
                .querySelector("#addBtn")
                .addEventListener(
                    "click",
                    () => this.addRow()
                );

            this.shadowRoot
                .querySelector("#copyBtn")
                .addEventListener(
                    "click",
                    () => this.copySelected()
                );

            this.shadowRoot
                .querySelector("#deleteBtn")
                .addEventListener(
                    "click",
                    () => this.deleteSelected()
                );

            this.shadowRoot
                .querySelector("#validateBtn")
                .addEventListener(
                    "click",
                    () => this.validate()
                );

            this.shadowRoot
                .querySelector("#approvalBtn")
                .addEventListener(
                    "click",
                    () => this.sendForApproval()
                );

            this.shadowRoot
                .querySelector("#clearBtn")
                .addEventListener(
                    "click",
                    () => this.clearSelected()
                );

            this.selectAll.addEventListener(
                "change",
                () => {

                    const checked =
                        this.selectAll.checked;

                    this.rows.forEach(
                        row => {
                            row.selected =
                                checked;
                        }
                    );

                    this.renderRows();

                    this.fireEvent(
                        "onSelectionChange",
                        {
                            allSelected:
                                checked
                        }
                    );
                }
            );
        }

        /* ============================================================
           ADD ROW
        ============================================================ */

        addRow() {

            this.closeDropdown();

            this.rows.push(
                this.createEmptyRow()
            );

            this.renderRows();

            this.fireEvent(
                "onRowAdd",
                {
                    rowIndex:
                        this.rows.length - 1
                }
            );

            this.fireEvent(
                "onDataChange",
                {
                    action: "addRow",
                    data: this.getDataObject()
                }
            );
        }

        /* ============================================================
           COPY
        ============================================================ */

        copySelected() {

            const selected =
                this.rows.filter(
                    row => row.selected
                );

            if (!selected.length) {
                return;
            }

            selected.forEach(
                row => {

                    const copy =
                        JSON.parse(
                            JSON.stringify(row)
                        );

                    copy.selected = false;
                    copy.valid = null;
                    copy.error = false;

                    this.rows.push(copy);
                }
            );

            this.rows.forEach(
                row => {
                    row.selected = false;
                }
            );

            this.renderRows();

            this.fireEvent(
                "onDataChange",
                {
                    action: "copy",
                    data: this.getDataObject()
                }
            );
        }

        /* ============================================================
           DELETE
        ============================================================ */

        deleteSelected() {

            const selectedIndexes = [];

            this.rows.forEach(
                (row, index) => {

                    if (row.selected) {
                        selectedIndexes.push(index);
                    }
                }
            );

            if (!selectedIndexes.length) {
                return;
            }

            /*
             * Keep at least one row in the widget.
             */
            this.rows =
                this.rows.filter(
                    row => !row.selected
                );

            if (!this.rows.length) {

                this.rows.push(
                    this.createEmptyRow()
                );
            }

            this.renderRows();

            this.fireEvent(
                "onRowDelete",
                {
                    rowIndexes:
                        selectedIndexes
                }
            );

            this.fireEvent(
                "onDataChange",
                {
                    action: "delete",
                    data: this.getDataObject()
                }
            );
        }

        /* ============================================================
           CLEAR
        ============================================================ */

        clearSelected() {

            let cleared = [];

            this.rows.forEach(
                (row, index) => {

                    if (!row.selected) {
                        return;
                    }

                    const newRow =
                        this.createEmptyRow();

                    /*
                     * Clear all business fields.
                     *
                     * The row itself remains.
                     */

                    Object.keys(newRow).forEach(
                        key => {

                            if (
                                key === "selected" ||
                                key === "valid" ||
                                key === "error"
                            ) {
                                return;
                            }

                            row[key] =
                                newRow[key];
                        }
                    );

                    /*
                     * IMPORTANT:
                     * Automatically untick
                     * after clearing.
                     */

                    row.selected = false;
                    row.valid = null;
                    row.error = false;

                    cleared.push(index);
                }
            );

            if (!cleared.length) {
                return;
            }

            this.renderRows();

            this.fireEvent(
                "onClear",
                {
                    rowIndexes:
                        cleared
                }
            );

            this.fireEvent(
                "onDataChange",
                {
                    action: "clear",
                    rowIndexes:
                        cleared,
                    data:
                        this.getDataObject()
                }
            );
        }

        /* ============================================================
           VALIDATION
        ============================================================ */

        validate() {

            let errorCount = 0;

            this.rows.forEach(
                row => {

                    row.error = false;
                    row.valid = true;

                    /*
                     * Position Title is mandatory.
                     */

                    if (
                        !row.positionTitle ||
                        !row.positionTitle.trim()
                    ) {

                        row.error = true;
                        row.valid = false;
                    }

                    /*
                     * Company Code is mandatory.
                     */

                    if (
                        !row.companyCode
                    ) {

                        row.error = true;
                        row.valid = false;
                    }

                    if (row.error) {
                        errorCount++;
                    }
                }
            );

            this.renderRows();

            this.fireEvent(
                "onValidate",
                {
                    valid:
                        errorCount === 0,
                    errorRows:
                        errorCount,
                    data:
                        this.getDataObject()
                }
            );

            this.fireEvent(
                "onDataChange",
                {
                    action: "validate",
                    valid:
                        errorCount === 0,
                    data:
                        this.getDataObject()
                }
            );

            return errorCount === 0;
        }

        /* ============================================================
           SEND FOR APPROVAL
        ============================================================ */

        sendForApproval() {

            const isValid =
                this.validate();

            if (!isValid) {
                return;
            }

            this.fireEvent(
                "onSendForApproval",
                {
                    data:
                        this.getDataObject()
                }
            );
        }

        /* ============================================================
           DATA CHANGE
        ============================================================ */

        dataChanged(
            rowIndex,
            fieldName,
            value
        ) {

            this.lastEvent =
                "onFieldChange";

            this.fireEvent(
                "onFieldChange",
                {
                    rowIndex:
                        rowIndex,
                    fieldName:
                        fieldName,
                    value:
                        value
                }
            );

            this.fireEvent(
                "onDataChange",
                {
                    rowIndex:
                        rowIndex,
                    fieldName:
                        fieldName,
                    value:
                        value,
                    data:
                        this.getDataObject()
                }
            );

            this.updateStatus();
        }

        /* ============================================================
           STATUS
        ============================================================ */

        updateStatus() {

            const selected =
                this.rows.filter(
                    row => row.selected
                ).length;

            const errors =
                this.rows.filter(
                    row => row.error
                ).length;

            this.totalRows.textContent =
                this.rows.length;

            this.selectedRows.textContent =
                selected;

            this.errorRows.textContent =
                errors;

            if (errors > 0) {

                this.validationStatus.textContent =
                    "false";

                this.validationStatus.className =
                    "footer-value status-invalid";

            } else {

                const hasValidated =
                    this.rows.some(
                        row =>
                            row.valid !== null
                    );

                if (hasValidated) {

                    this.validationStatus.textContent =
                        "true";

                    this.validationStatus.className =
                        "footer-value status-valid";

                } else {

                    this.validationStatus.textContent =
                        "-";

                    this.validationStatus.className =
                        "footer-value";
                }
            }

            /*
             * Delete button only appears
             * when something is selected.
             */

            if (selected > 0) {

                this.deleteBtn.classList.remove(
                    "hidden"
                );

            } else {

                this.deleteBtn.classList.add(
                    "hidden"
                );
            }

            this.updateSelectAllState();
        }

        updateSelectAllState() {

            if (!this.rows.length) {

                this.selectAll.checked =
                    false;

                this.selectAll.indeterminate =
                    false;

                return;
            }

            const selected =
                this.rows.filter(
                    row => row.selected
                ).length;

            this.selectAll.checked =
                selected === this.rows.length;

            this.selectAll.indeterminate =
                selected > 0 &&
                selected < this.rows.length;
        }

        /* ============================================================
           EVENTS
        ============================================================ */

        fireEvent(
            eventName,
            detail
        ) {

            this.lastEvent =
                eventName;

            this.dispatchEvent(
                new CustomEvent(
                    eventName,
                    {
                        bubbles: true,
                        composed: true,
                        detail: detail
                    }
                )
            );

            /*
             * Generic event.
             *
             * Useful when SAC script
             * is listening to onEvent.
             */

            this.dispatchEvent(
                new CustomEvent(
                    "onEvent",
                    {
                        bubbles: true,
                        composed: true,
                        detail: {
                            event:
                                eventName,
                            data:
                                detail
                        }
                    }
                )
            );
        }

        /* ============================================================
           PUBLIC SAC METHODS
        ============================================================ */

        getLastEvent() {

            return this.lastEvent || "";
        }

        getDataObject() {

            return this.rows.map(
                row => {

                    const output = {};

                    this.fields.forEach(
                        field => {

                            output[field.key] =
                                row[field.key] || "";
                        }
                    );

                    return output;
                }
            );
        }

        getData() {

            return JSON.stringify(
                this.getDataObject()
            );
        }

        setData(data) {

            try {

                const parsed =
                    typeof data === "string"
                        ? JSON.parse(data)
                        : data;

                if (
                    !Array.isArray(parsed)
                ) {
                    return;
                }

                this.rows =
                    parsed.map(
                        item => {

                            const row =
                                this.createEmptyRow();

                            this.fields.forEach(
                                field => {

                                    if (
                                        Object.prototype
                                            .hasOwnProperty
                                            .call(
                                                item,
                                                field.key
                                            )
                                    ) {

                                        row[field.key] =
                                            item[field.key];
                                    }
                                }
                            );

                            return row;
                        }
                    );

                if (!this.rows.length) {

                    this.rows.push(
                        this.createEmptyRow()
                    );
                }

                this.renderRows();

                this.fireEvent(
                    "onDataChange",
                    {
                        action: "setData",
                        data:
                            this.getDataObject()
                    }
                );

            } catch (error) {

                console.error(
                    "PositionEntry setData error:",
                    error
                );
            }
        }

        setCellValue(
            rowIndex,
            fieldName,
            value
        ) {

            if (
                rowIndex < 0 ||
                rowIndex >= this.rows.length
            ) {
                return;
            }

            if (
                !this.rows[rowIndex]
            ) {
                return;
            }

            this.rows[rowIndex][
                fieldName
            ] = value;

            this.rows[rowIndex].valid =
                null;

            this.rows[rowIndex].error =
                false;

            this.renderRows();

            this.dataChanged(
                rowIndex,
                fieldName,
                value
            );
        }

        setRowOptions(
            rowIndex,
            fieldName,
            options
        ) {

            const field =
                this.fields.find(
                    item =>
                        item.key === fieldName
                );

            if (!field) {
                return;
            }

            try {

                const parsed =
                    typeof options === "string"
                        ? JSON.parse(options)
                        : options;

                if (
                    Array.isArray(parsed)
                ) {

                    field.options =
                        parsed;

                    this.renderRows();
                }

            } catch (error) {

                console.error(
                    "setRowOptions error:",
                    error
                );
            }
        }

        /* ============================================================
           WINDOW RESIZE
        ============================================================ */

        disconnectedCallback() {

            this.closeDropdown();
        }
    }

    customElements.define(
        "com-madhav-positionentry",
        PositionEntry
    );

})();
