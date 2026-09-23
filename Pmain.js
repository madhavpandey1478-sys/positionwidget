(function () {
    "use strict";

    class PositionEntry extends HTMLElement {

        constructor() {
            super();

            this.attachShadow({ mode: "open" });

            this.rows = [];
            this.lastEvent = "";
            this.rowOptions = {};

            this.fields = [
                {
                    key: "companyCode",
                    label: "Company Code",
                    type: "dropdown",
                    width: 170
                },
                {
                    key: "division",
                    label: "Division",
                    type: "dropdown",
                    width: 165
                },
                {
                    key: "department",
                    label: "Department",
                    type: "dropdown",
                    width: 190
                },
                {
                    key: "costCenter",
                    label: "Cost Center",
                    type: "dropdown",
                    width: 180
                },
                {
                    key: "jobCode",
                    label: "Job Code",
                    type: "dropdown",
                    width: 165
                },
                {
                    key: "positionTitle",
                    label: "Position Title",
                    type: "text",
                    width: 230
                },
                {
                    key: "positionId",
                    label: "Position ID",
                    type: "readonly",
                    width: 175
                },
                {
                    key: "payGrade",
                    label: "Pay Grade",
                    type: "dropdown",
                    width: 145
                },
                {
                    key: "level",
                    label: "Level",
                    type: "dropdown",
                    width: 125
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
                    type: "dropdown",
                    width: 175
                },
                {
                    key: "accommodation",
                    label: "Accommodation",
                    type: "dropdown",
                    width: 175
                },
                {
                    key: "transport",
                    label: "Transport",
                    type: "dropdown",
                    width: 160
                },
                {
                    key: "employeeClass",
                    label: "Employee Class",
                    type: "dropdown",
                    width: 175
                },
                {
                    key: "overtime",
                    label: "Overtime",
                    type: "dropdown",
                    width: 150
                },
                {
                    key: "specialApproval",
                    label: "Special Approval",
                    type: "dropdown",
                    width: 180
                },
                {
                    key: "comment",
                    label: "Comment",
                    type: "text",
                    width: 240
                }
            ];

            /*
             * Default dropdown values.
             *
             * These are only sample/default values.
             * SAC can replace them using setRowOptions().
             */
            this.defaultOptions = {
                companyCode: [
                    "ALL_SBU",
                    "SBU_001",
                    "SBU_002",
                    "SBU_003"
                ],

                division: [
                    "Division 01",
                    "Division 02",
                    "Division 03"
                ],

                department: [
                    "Finance",
                    "HR",
                    "IT",
                    "Sales",
                    "Operations"
                ],

                costCenter: [
                    "CC1000",
                    "CC2000",
                    "CC3000",
                    "CC4000"
                ],

                jobCode: [
                    "JC001",
                    "JC002",
                    "JC003",
                    "JC004"
                ],

                payGrade: [
                    "Grade 01",
                    "Grade 02",
                    "Grade 03",
                    "Grade 04"
                ],

                level: [
                    "L1",
                    "L2",
                    "L3",
                    "L4",
                    "L5"
                ],

                nationality: [
                    "Saudi",
                    "Indian",
                    "Emirati",
                    "Other"
                ],

                accommodation: [
                    "Provided",
                    "Not Provided"
                ],

                transport: [
                    "Provided",
                    "Not Provided"
                ],

                employeeClass: [
                    "Permanent",
                    "Contract",
                    "Temporary"
                ],

                overtime: [
                    "Eligible",
                    "Not Eligible"
                ],

                specialApproval: [
                    "Required",
                    "Not Required"
                ]
            };

            this.requiredFields = [
                "companyCode",
                "division",
                "department",
                "costCenter",
                "jobCode",
                "positionTitle",
                "payGrade",
                "level",
                "hireDate"
            ];
        }


        connectedCallback() {

            /*
             * Always start with one row.
             */
            if (!this.rows.length) {
                this.addRow(false);
            }

            this.render();
        }


        /* =========================================================
           DATA STRUCTURE
        ========================================================= */

        createEmptyRow() {

            const row = {
                _selected: false,
                _valid: true
            };

            this.fields.forEach(field => {
                row[field.key] = "";
            });

            return row;
        }


        /* =========================================================
           RENDER
        ========================================================= */

        render() {

            this.shadowRoot.innerHTML = "";

            const style = document.createElement("style");

            style.textContent = `
                * {
                    box-sizing: border-box;
                }

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
                    background: #ffffff;
                }

                .widget {
                    width: 100%;
                    height: 100%;
                    min-height: 300px;

                    display: flex;
                    flex-direction: column;

                    background: #ffffff;
                    border: 1px solid #d6e0ea;
                    border-radius: 6px;

                    overflow: hidden;
                }


                /* =====================================================
                   TOOLBAR
                ===================================================== */

                .toolbar {
                    min-height: 62px;

                    display: flex;
                    align-items: center;
                    justify-content: flex-end;

                    gap: 10px;

                    padding: 10px 14px;

                    background:
                        linear-gradient(
                            to bottom,
                            #ffffff,
                            #f8fafc
                        );

                    border-bottom: 1px solid #d9e2ec;
                }


                button {
                    font-family: inherit;
                }

                .action-btn {
                    height: 38px;

                    padding: 0 18px;

                    border-radius: 7px;

                    border: 1px solid #b9cfe5;

                    background: #ffffff;

                    color: #0064b4;

                    font-size: 14px;
                    font-weight: 600;

                    cursor: pointer;

                    transition:
                        background 0.15s ease,
                        border-color 0.15s ease,
                        box-shadow 0.15s ease;

                    white-space: nowrap;
                }

                .action-btn:hover {
                    background: #f0f7ff;
                    border-color: #7faed6;
                }

                .action-btn:active {
                    background: #e6f2fc;
                }

                .action-btn.primary {
                    background: #0878d1;
                    color: #ffffff;
                    border-color: #0878d1;
                }

                .action-btn.primary:hover {
                    background: #006bbd;
                }

                .action-btn.danger {
                    color: #bb0000;
                    border-color: #e4aaaa;
                }

                .action-btn.danger:hover {
                    background: #fff4f4;
                    border-color: #d87979;
                }

                .action-btn.hidden {
                    display: none;
                }


                /* =====================================================
                   TABLE AREA
                ===================================================== */

                .table-wrapper {
                    flex: 1;

                    width: 100%;

                    overflow: auto;

                    position: relative;

                    background: #ffffff;
                }


                table {
                    border-collapse: separate;
                    border-spacing: 0;

                    table-layout: fixed;

                    min-width: 2850px;

                    width: max-content;
                }


                /* =====================================================
                   HEADER
                ===================================================== */

                thead th {
                    position: sticky;
                    top: 0;

                    z-index: 20;

                    height: 48px;

                    padding: 0 12px;

                    background: #edf4fb;

                    border-right: 1px solid #d2deea;
                    border-bottom: 1px solid #c7d6e5;

                    color: #123f67;

                    font-size: 14px;
                    font-weight: 700;

                    text-align: left;

                    white-space: nowrap;
                }

                thead th:first-child {
                    text-align: center;
                }


                /* =====================================================
                   BODY
                ===================================================== */

                tbody td {
                    height: 60px;

                    padding: 5px 10px;

                    background: #ffffff;

                    border-right: 1px solid #d6e0e9;
                    border-bottom: 1px solid #d6e0e9;

                    vertical-align: middle;

                    position: relative;
                }

                tbody tr:hover td {
                    background: #f9fcff;
                }

                tbody tr.selected td {
                    background: #fff8dc;
                }

                tbody tr.invalid td {
                    background: #fff2f2;
                }


                /* =====================================================
                   SELECTION
                ===================================================== */

                .selection-cell {
                    width: 54px;

                    text-align: center;

                    padding: 0 !important;
                }

                input[type="checkbox"] {
                    width: 19px;
                    height: 19px;

                    accent-color: #0878d1;

                    cursor: pointer;
                }


                /* =====================================================
                   INPUTS
                ===================================================== */

                .cell-input {
                    width: 100%;
                    height: 40px;

                    padding: 0 10px;

                    border: 1px solid #bfd0e0;

                    border-radius: 5px;

                    background: #ffffff;

                    color: #1d2d3e;

                    font-family: inherit;
                    font-size: 14px;

                    outline: none;
                }

                .cell-input:focus {
                    border-color: #0878d1;

                    box-shadow:
                        0 0 0 1px #0878d1;
                }

                .readonly-input {
                    background: #f3f6f9;

                    color: #617487;

                    cursor: default;
                }


                /* =====================================================
                   CUSTOM DROPDOWN
                ===================================================== */

                .dropdown {
                    width: 100%;

                    height: 40px;

                    position: relative;
                }

                .dropdown-trigger {
                    width: 100%;
                    height: 40px;

                    border: 0;

                    background: transparent;

                    padding: 0 30px 0 8px;

                    text-align: left;

                    font-family: inherit;
                    font-size: 14px;

                    color: #1d2d3e;

                    cursor: pointer;

                    position: relative;

                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .dropdown-trigger::after {
                    content: "";

                    position: absolute;

                    right: 8px;
                    top: 50%;

                    width: 7px;
                    height: 7px;

                    border-right: 2px solid #617d98;
                    border-bottom: 2px solid #617d98;

                    transform:
                        translateY(-65%)
                        rotate(45deg);
                }

                .dropdown-trigger:hover {
                    background: #f5f9fd;
                }

                .dropdown.open .dropdown-trigger {
                    background: #eef7ff;

                    color: #005fa8;
                }

                .dropdown-menu {
                    position: fixed;

                    min-width: 270px;

                    max-width: 360px;

                    background: #ffffff;

                    border: 1px solid #c6d5e3;

                    border-radius: 7px;

                    box-shadow:
                        0 8px 25px rgba(0, 0, 0, 0.16);

                    z-index: 100000;

                    display: none;

                    overflow: hidden;
                }

                .dropdown-menu.open {
                    display: block;
                }

                .dropdown-search-container {
                    padding: 10px;

                    background: #ffffff;

                    border-bottom: 1px solid #e0e7ee;
                }

                .dropdown-search {
                    width: 100%;
                    height: 36px;

                    padding: 0 10px;

                    border: 1px solid #b9ccdf;

                    border-radius: 5px;

                    outline: none;

                    font-family: inherit;
                    font-size: 14px;
                }

                .dropdown-search:focus {
                    border-color: #0878d1;

                    box-shadow:
                        0 0 0 1px #0878d1;
                }

                .dropdown-options {
                    max-height: 230px;

                    overflow-y: auto;
                }

                .dropdown-option {
                    min-height: 38px;

                    display: flex;
                    align-items: center;

                    padding: 8px 12px;

                    font-size: 14px;

                    color: #1d2d3e;

                    cursor: pointer;
                }

                .dropdown-option:hover {
                    background: #eaf4ff;
                }

                .dropdown-option.selected {
                    background: #e5f2ff;

                    color: #0064b4;

                    font-weight: 600;
                }

                .no-results {
                    padding: 18px 12px;

                    text-align: center;

                    color: #7b8b9a;

                    font-size: 13px;
                }


                /* =====================================================
                   FOOTER
                ===================================================== */

                .footer {
                    min-height: 42px;

                    display: flex;
                    align-items: center;

                    gap: 22px;

                    padding: 0 14px;

                    background: #f8fafc;

                    border-top: 1px solid #d5e0ea;

                    font-size: 13px;

                    color: #41566b;
                }

                .footer strong {
                    color: #173f61;
                }

                .status-valid {
                    color: #107e3e;
                    font-weight: 600;
                }

                .status-invalid {
                    color: #bb0000;
                    font-weight: 600;
                }


                /* =====================================================
                   SCROLLBAR
                ===================================================== */

                .table-wrapper::-webkit-scrollbar {
                    width: 10px;
                    height: 10px;
                }

                .table-wrapper::-webkit-scrollbar-track {
                    background: #f1f4f7;
                }

                .table-wrapper::-webkit-scrollbar-thumb {
                    background: #aebdca;

                    border-radius: 6px;
                }

                .table-wrapper::-webkit-scrollbar-thumb:hover {
                    background: #879aaa;
                }


                /* =====================================================
                   ERROR
                ===================================================== */

                .field-error {
                    border-color: #d04343 !important;

                    box-shadow:
                        0 0 0 1px #d04343 !important;
                }
            `;

            this.shadowRoot.appendChild(style);


            const widget = document.createElement("div");
            widget.className = "widget";


            /* =====================================================
               TOOLBAR
            ===================================================== */

            const toolbar = document.createElement("div");
            toolbar.className = "toolbar";

            const addButton = this.createButton(
                "Add Row",
                "action-btn",
                () => this.addRow()
            );

            const deleteButton = this.createButton(
                "Delete Selected",
                "action-btn danger hidden",
                () => this.deleteSelected()
            );

            deleteButton.id = "deleteButton";

            const validateButton = this.createButton(
                "Validate",
                "action-btn",
                () => this.validate()
            );

            const clearButton = this.createButton(
                "Clear",
                "action-btn",
                () => this.clearSelected()
            );

            toolbar.appendChild(addButton);
            toolbar.appendChild(deleteButton);
            toolbar.appendChild(validateButton);
            toolbar.appendChild(clearButton);


            /* =====================================================
               TABLE
            ===================================================== */

            const tableWrapper = document.createElement("div");
            tableWrapper.className = "table-wrapper";

            const table = document.createElement("table");

            const colgroup = document.createElement("colgroup");

            const selectCol = document.createElement("col");
            selectCol.style.width = "54px";
            colgroup.appendChild(selectCol);

            this.fields.forEach(field => {
                const col = document.createElement("col");
                col.style.width = field.width + "px";
                colgroup.appendChild(col);
            });

            table.appendChild(colgroup);


            /* =====================================================
               HEADER
            ===================================================== */

            const thead = document.createElement("thead");

            const headerRow = document.createElement("tr");

            const selectionHeader = document.createElement("th");
            selectionHeader.className = "selection-cell";

            const selectAll = document.createElement("input");
            selectAll.type = "checkbox";
            selectAll.id = "selectAll";

            selectAll.addEventListener("change", () => {

                this.rows.forEach(row => {
                    row._selected = selectAll.checked;
                });

                this.lastEvent = "selectAll";

                this.dispatchEvent(
                    new CustomEvent("onSelectionChange", {
                        detail: {
                            selectedRows: this.getSelectedIndexes()
                        }
                    })
                );

                this.render();
            });

            selectionHeader.appendChild(selectAll);
            headerRow.appendChild(selectionHeader);


            this.fields.forEach(field => {

                const th = document.createElement("th");

                th.textContent = field.label;

                headerRow.appendChild(th);
            });

            thead.appendChild(headerRow);
            table.appendChild(thead);


            /* =====================================================
               BODY
            ===================================================== */

            const tbody = document.createElement("tbody");

            this.rows.forEach((row, rowIndex) => {

                row.__index = rowIndex;

                const tr = document.createElement("tr");

                if (row._selected) {
                    tr.classList.add("selected");
                }

                if (row._valid === false) {
                    tr.classList.add("invalid");
                }


                /* Row checkbox */

                const selectionCell = document.createElement("td");
                selectionCell.className = "selection-cell";

                const checkbox = document.createElement("input");

                checkbox.type = "checkbox";
                checkbox.checked = !!row._selected;

                checkbox.addEventListener("change", () => {

                    row._selected = checkbox.checked;

                    this.lastEvent = "selectionChange";

                    this.dispatchEvent(
                        new CustomEvent("onSelectionChange", {
                            detail: {
                                rowIndex: rowIndex,
                                selected: row._selected,
                                selectedRows: this.getSelectedIndexes()
                            }
                        })
                    );

                    this.render();
                });

                selectionCell.appendChild(checkbox);
                tr.appendChild(selectionCell);


                /* Data cells */

                this.fields.forEach(field => {

                    const td = document.createElement("td");

                    const element = this.createField(
                        row,
                        rowIndex,
                        field
                    );

                    td.appendChild(element);

                    tr.appendChild(td);
                });

                tbody.appendChild(tr);
            });

            table.appendChild(tbody);

            tableWrapper.appendChild(table);


            /* =====================================================
               FOOTER
            ===================================================== */

            const footer = document.createElement("div");
            footer.className = "footer";

            const total = document.createElement("span");

            total.innerHTML =
                "Total Rows: <strong>" +
                this.rows.length +
                "</strong>";

            const selected = document.createElement("span");

            selected.innerHTML =
                "Selected Rows: <strong>" +
                this.getSelectedIndexes().length +
                "</strong>";

            const validation = document.createElement("span");

            const errorRows = this.rows.filter(
                row => row._valid === false
            ).length;

            if (errorRows > 0) {

                validation.className = "status-invalid";

                validation.innerHTML =
                    "Validation: Error";

            } else {

                validation.className = "status-valid";

                validation.innerHTML =
                    "Validation: true";
            }

            const errors = document.createElement("span");

            errors.innerHTML =
                "Error Rows: <strong>" +
                errorRows +
                "</strong>";

            footer.appendChild(total);
            footer.appendChild(selected);
            footer.appendChild(validation);
            footer.appendChild(errors);


            widget.appendChild(toolbar);
            widget.appendChild(tableWrapper);
            widget.appendChild(footer);

            this.shadowRoot.appendChild(widget);


            /*
             * Update delete button visibility.
             */
            this.updateDeleteButton();


            /*
             * Recalculate select-all state.
             */
            const selectedCount =
                this.getSelectedIndexes().length;

            selectAll.checked =
                this.rows.length > 0 &&
                selectedCount === this.rows.length;

            selectAll.indeterminate =
                selectedCount > 0 &&
                selectedCount < this.rows.length;
        }


        /* =========================================================
           BUTTON CREATOR
        ========================================================= */

        createButton(text, className, handler) {

            const button = document.createElement("button");

            button.type = "button";

            button.className = className;

            button.textContent = text;

            button.addEventListener("click", handler);

            return button;
        }


        /* =========================================================
           FIELD CREATOR
        ========================================================= */

        createField(row, rowIndex, field) {

            if (field.type === "dropdown") {

                return this.createDropdown(
                    row,
                    rowIndex,
                    field
                );
            }


            if (field.type === "date") {

                const input =
                    document.createElement("input");

                input.type = "date";

                input.className = "cell-input";

                input.value =
                    row[field.key] || "";

                input.addEventListener("change", () => {

                    row[field.key] = input.value;

                    this.handleDataChange(
                        rowIndex,
                        field.key,
                        input.value
                    );
                });

                return input;
            }


            if (field.type === "readonly") {

                const input =
                    document.createElement("input");

                input.type = "text";

                input.className =
                    "cell-input readonly-input";

                input.value =
                    row[field.key] || "";

                input.readOnly = true;

                return input;
            }


            const input =
                document.createElement("input");

            input.type = "text";

            input.className = "cell-input";

            input.value =
                row[field.key] || "";

            input.placeholder = "";

            input.addEventListener("input", () => {

                row[field.key] =
                    input.value;

                this.handleDataChange(
                    rowIndex,
                    field.key,
                    input.value
                );
            });

            return input;
        }


        /* =========================================================
           SEARCHABLE DROPDOWN
        ========================================================= */

        createDropdown(row, rowIndex, field) {

            const wrapper =
                document.createElement("div");

            wrapper.className = "dropdown";


            const trigger =
                document.createElement("button");

            trigger.type = "button";

            trigger.className =
                "dropdown-trigger";

            trigger.textContent =
                row[field.key] || "Select";


            const menu =
                document.createElement("div");

            menu.className =
                "dropdown-menu";


            const searchContainer =
                document.createElement("div");

            searchContainer.className =
                "dropdown-search-container";


            const search =
                document.createElement("input");

            search.type = "text";

            search.className =
                "dropdown-search";

            search.placeholder =
                "Search...";


            searchContainer.appendChild(search);


            const optionsContainer =
                document.createElement("div");

            optionsContainer.className =
                "dropdown-options";


            const options =
                this.getOptions(
                    rowIndex,
                    field.key
                );


            const renderOptions =
                (filter = "") => {

                    optionsContainer.innerHTML = "";

                    const searchText =
                        filter.toLowerCase().trim();

                    const filtered =
                        options.filter(option => {

                            return String(option)
                                .toLowerCase()
                                .includes(searchText);
                        });


                    if (!filtered.length) {

                        const empty =
                            document.createElement("div");

                        empty.className =
                            "no-results";

                        empty.textContent =
                            "No results found";

                        optionsContainer.appendChild(empty);

                        return;
                    }


                    filtered.forEach(option => {

                        const item =
                            document.createElement("div");

                        item.className =
                            "dropdown-option";


                        if (
                            String(row[field.key]) ===
                            String(option)
                        ) {
                            item.classList.add("selected");
                        }


                        item.textContent =
                            option;


                        item.addEventListener(
                            "mousedown",
                            event => {

                                event.preventDefault();

                                row[field.key] =
                                    option;

                                this.handleDataChange(
                                    rowIndex,
                                    field.key,
                                    option
                                );

                                closeDropdown();
                            }
                        );


                        optionsContainer.appendChild(item);
                    });
                };


            const closeDropdown = () => {

                menu.classList.remove("open");

                wrapper.classList.remove("open");

                menu.remove();

                document.removeEventListener(
                    "mousedown",
                    outsideClick
                );
            };


            const outsideClick = event => {

                if (
                    !wrapper.contains(event.target) &&
                    !menu.contains(event.target)
                ) {
                    closeDropdown();
                }
            };


            const positionMenu = () => {

                const rect =
                    trigger.getBoundingClientRect();

                menu.style.left =
                    rect.left + "px";

                menu.style.top =
                    (rect.bottom + 4) + "px";

                menu.style.width =
                    Math.max(
                        rect.width,
                        270
                    ) + "px";
            };


            trigger.addEventListener(
                "click",
                event => {

                    event.stopPropagation();


                    /*
                     * Close all dropdowns currently
                     * open in the widget.
                     */
                    this.shadowRoot
                        .querySelectorAll(
                            ".dropdown-menu.open"
                        )
                        .forEach(existing => {

                            existing.classList.remove(
                                "open"
                            );

                            existing.remove();
                        });


                    if (menu.classList.contains("open")) {

                        closeDropdown();

                        return;
                    }


                    document.body.appendChild(menu);

                    menu.classList.add("open");

                    wrapper.classList.add("open");

                    positionMenu();

                    renderOptions();

                    search.value = "";

                    setTimeout(() => {
                        search.focus();
                    }, 0);


                    document.addEventListener(
                        "mousedown",
                        outsideClick
                    );
                }
            );


            search.addEventListener(
                "input",
                () => {

                    renderOptions(
                        search.value
                    );
                }
            );


            /*
             * Reposition while scrolling/resizing.
             */
            const reposition = () => {

                if (menu.classList.contains("open")) {
                    positionMenu();
                }
            };

            window.addEventListener(
                "resize",
                reposition
            );

            this.shadowRoot
                .querySelector(".table-wrapper")
                ?.addEventListener(
                    "scroll",
                    reposition
                );


            /*
             * The menu is temporarily appended to
             * document.body when opened.
             */
            menu.appendChild(searchContainer);

            menu.appendChild(optionsContainer);


            wrapper.appendChild(trigger);

            return wrapper;
        }


        /* =========================================================
           DROPDOWN OPTIONS
        ========================================================= */

        getOptions(rowIndex, fieldName) {

            if (
                this.rowOptions[rowIndex] &&
                Array.isArray(
                    this.rowOptions[rowIndex][fieldName]
                )
            ) {
                return this.rowOptions[rowIndex][fieldName];
            }


            if (
                Array.isArray(
                    this.rowOptions[fieldName]
                )
            ) {
                return this.rowOptions[fieldName];
            }


            return (
                this.defaultOptions[fieldName] ||
                []
            );
        }


        /* =========================================================
           DATA CHANGE
        ========================================================= */

        handleDataChange(
            rowIndex,
            fieldName,
            value
        ) {

            this.rows[rowIndex][fieldName] =
                value;

            this.rows[rowIndex]._valid =
                true;

            this.lastEvent =
                "dataChange";


            this.dispatchEvent(
                new CustomEvent(
                    "onDataChange",
                    {
                        detail: {
                            rowIndex: rowIndex,
                            fieldName: fieldName,
                            value: value,
                            data: this.getData()
                        }
                    }
                )
            );


            /*
             * Also expose a generic event
             * for SAC scripting.
             */
            this.dispatchEvent(
                new CustomEvent(
                    "onEvent",
                    {
                        detail: {
                            type: "dataChange",
                            rowIndex: rowIndex,
                            fieldName: fieldName,
                            value: value
                        }
                    }
                )
            );


            this.render();
        }


        /* =========================================================
           ADD ROW
        ========================================================= */

        addRow(triggerEvent = true) {

            const row =
                this.createEmptyRow();

            this.rows.push(row);

            this.lastEvent =
                "addRow";


            if (triggerEvent) {

                this.dispatchEvent(
                    new CustomEvent(
                        "onEvent",
                        {
                            detail: {
                                type: "addRow",
                                rowIndex:
                                    this.rows.length - 1
                            }
                        }
                    )
                );
            }

            this.render();
        }


        /* =========================================================
           DELETE SELECTED
        ========================================================= */

        deleteSelected() {

            const selectedIndexes =
                this.getSelectedIndexes();

            if (!selectedIndexes.length) {
                return;
            }


            /*
             * Delete only selected rows.
             */
            this.rows =
                this.rows.filter(
                    row => !row._selected
                );


            /*
             * Never allow a completely empty widget.
             */
            if (!this.rows.length) {
                this.addRow(false);
            }


            this.lastEvent =
                "deleteSelected";


            this.dispatchEvent(
                new CustomEvent(
                    "onEvent",
                    {
                        detail: {
                            type: "deleteSelected",
                            rows: selectedIndexes
                        }
                    }
                )
            );


            this.render();
        }


        /* =========================================================
           CLEAR SELECTED ROW DATA
        ========================================================= */

        clearSelected() {

            const selectedIndexes =
                this.getSelectedIndexes();

            if (!selectedIndexes.length) {
                return;
            }


            selectedIndexes.forEach(index => {

                const row =
                    this.rows[index];

                this.fields.forEach(field => {

                    /*
                     * Clear all actual data.
                     */
                    row[field.key] = "";
                });


                /*
                 * IMPORTANT:
                 * Keep the row.
                 * Only clear its data.
                 */
                row._selected = false;

                row._valid = true;
            });


            this.lastEvent =
                "clearSelected";


            this.dispatchEvent(
                new CustomEvent(
                    "onClear",
                    {
                        detail: {
                            rows: selectedIndexes,
                            data: this.getData()
                        }
                    }
                )
            );


            this.dispatchEvent(
                new CustomEvent(
                    "onEvent",
                    {
                        detail: {
                            type: "clearSelected",
                            rows: selectedIndexes
                        }
                    }
                )
            );


            this.render();
        }


        /* =========================================================
           VALIDATION
        ========================================================= */

        validate() {

            let errorCount = 0;

            this.rows.forEach(row => {

                let valid = true;

                this.requiredFields.forEach(
                    fieldName => {

                        if (
                            !row[fieldName] ||
                            String(
                                row[fieldName]
                            ).trim() === ""
                        ) {
                            valid = false;
                        }
                    }
                );


                row._valid = valid;

                if (!valid) {
                    errorCount++;
                }
            });


            const isValid =
                errorCount === 0;


            this.lastEvent =
                "validate";


            this.dispatchEvent(
                new CustomEvent(
                    "onValidate",
                    {
                        detail: {
                            valid: isValid,
                            errorRows: errorCount,
                            data: this.getData()
                        }
                    }
                )
            );


            this.dispatchEvent(
                new CustomEvent(
                    "onEvent",
                    {
                        detail: {
                            type: "validate",
                            valid: isValid,
                            errorRows: errorCount
                        }
                    }
                )
            );


            this.render();

            return isValid;
        }


        /* =========================================================
           SELECTED ROWS
        ========================================================= */

        getSelectedIndexes() {

            const indexes = [];

            this.rows.forEach(
                (row, index) => {

                    if (row._selected) {
                        indexes.push(index);
                    }
                }
            );

            return indexes;
        }


        /* =========================================================
           DELETE BUTTON VISIBILITY
        ========================================================= */

        updateDeleteButton() {

            const button =
                this.shadowRoot.getElementById(
                    "deleteButton"
                );

            if (!button) {
                return;
            }


            const selected =
                this.getSelectedIndexes();


            if (selected.length > 0) {

                button.classList.remove(
                    "hidden"
                );

            } else {

                button.classList.add(
                    "hidden"
                );
            }
        }


        /* =========================================================
           PUBLIC METHOD:
           GET DATA
        ========================================================= */

        getData() {

            return JSON.stringify(
                this.rows.map(row => {

                    const cleanRow = {};

                    this.fields.forEach(
                        field => {

                            cleanRow[field.key] =
                                row[field.key];
                        }
                    );

                    return cleanRow;
                })
            );
        }


        /* =========================================================
           PUBLIC METHOD:
           SET DATA
        ========================================================= */

        setData(data) {

            try {

                const parsed =
                    typeof data === "string"
                        ? JSON.parse(data)
                        : data;


                if (!Array.isArray(parsed)) {
                    return;
                }


                this.rows =
                    parsed.map(item => {

                        const row =
                            this.createEmptyRow();

                        this.fields.forEach(
                            field => {

                                if (
                                    item.hasOwnProperty(
                                        field.key
                                    )
                                ) {
                                    row[field.key] =
                                        item[field.key];
                                }
                            }
                        );

                        return row;
                    });


                if (!this.rows.length) {
                    this.addRow(false);
                }


                this.lastEvent =
                    "setData";

                this.render();

            } catch (error) {

                console.error(
                    "PositionEntry setData error:",
                    error
                );
            }
        }


        /* =========================================================
           PUBLIC METHOD:
           SET CELL VALUE
        ========================================================= */

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
                    .hasOwnProperty(fieldName)
            ) {
                return;
            }


            this.rows[rowIndex][fieldName] =
                value;


            this.lastEvent =
                "setCellValue";


            this.dispatchEvent(
                new CustomEvent(
                    "onDataChange",
                    {
                        detail: {
                            rowIndex: rowIndex,
                            fieldName: fieldName,
                            value: value
                        }
                    }
                )
            );


            this.render();
        }


        /* =========================================================
           PUBLIC METHOD:
           SET DROPDOWN OPTIONS
        ========================================================= */

        setRowOptions(
            rowIndex,
            fieldName,
            options
        ) {

            try {

                const parsed =
                    typeof options === "string"
                        ? JSON.parse(options)
                        : options;


                if (!Array.isArray(parsed)) {
                    return;
                }


                if (
                    !this.rowOptions[rowIndex]
                ) {
                    this.rowOptions[rowIndex] = {};
                }


                this.rowOptions[rowIndex][fieldName] =
                    parsed;


                this.lastEvent =
                    "setRowOptions";


                this.render();

            } catch (error) {

                console.error(
                    "setRowOptions error:",
                    error
                );
            }
        }


        /* =========================================================
           PUBLIC METHOD:
           LAST EVENT
        ========================================================= */

        getLastEvent() {

            return this.lastEvent;
        }
    }


    /* =============================================================
       REGISTER WEB COMPONENT
    ============================================================= */

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
