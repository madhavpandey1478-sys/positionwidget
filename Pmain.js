(function () {

    "use strict";

    /* =========================================================
       POSITION ENTRY - SAC CUSTOM WIDGET
       Tab 1: Create Position
       Tab 2: Load / Modify / Delete
       ========================================================= */

    /* =========================================================
       ICONS (shared inline SVGs, colored via currentColor)
       ========================================================= */

    var ICONS = {

        add: '<svg width="13" height="13" viewBox="0 0 20 20" fill="none"><path d="M10 4v12M4 10h12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',

        copy: '<svg width="13" height="13" viewBox="0 0 20 20" fill="none"><rect x="7" y="7" width="9" height="9" rx="1.5" stroke="currentColor" stroke-width="1.6"/><path d="M4 12.5V5.5A1.5 1.5 0 0 1 5.5 4h7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',

        deleteIcon: '<svg width="13" height="13" viewBox="0 0 20 20" fill="none"><path d="M4 6h12M8 6V4.5A1 1 0 0 1 9 3.5h2a1 1 0 0 1 1 1V6M6 6l.6 9.4a1 1 0 0 0 1 .9h4.8a1 1 0 0 0 1-.9L14 6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',

        check: '<svg width="13" height="13" viewBox="0 0 20 20" fill="none"><path d="M4 10.5l3.5 3.5L16 5.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',

        send: '<svg width="13" height="13" viewBox="0 0 20 20" fill="none"><path d="M3 10l14-6-6 14-2-6-6-2z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" fill="currentColor"/></svg>',

        clear: '<svg width="13" height="13" viewBox="0 0 20 20" fill="none"><path d="M5 5l10 10M15 5L5 15" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',

        load: '<svg width="13" height="13" viewBox="0 0 20 20" fill="none"><path d="M10 3v9m0 0l-3.5-3.5M10 12l3.5-3.5M4 15h12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',

        save: '<svg width="13" height="13" viewBox="0 0 20 20" fill="none"><path d="M4 4h9l3 3v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M7 4v4h6V4" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><rect x="6" y="11" width="8" height="5" stroke="currentColor" stroke-width="1.4"/></svg>'
    };

    /* =========================================================
       COLUMN DEFINITIONS
       (shared field set, reordered per tab)
       ========================================================= */

    var CORE_COLUMNS = {

        companyCode:     { field: "companyCode",     label: "Company Code",     type: "select", width: 120 },
        division:        { field: "division",        label: "Division",         type: "select", width: 125 },
        department:      { field: "department",      label: "Department",       type: "select", width: 145 },
        costCenter:      { field: "costCenter",      label: "Cost Center",      type: "select", width: 135 },
        jobCode:         { field: "jobCode",          label: "Job Code",         type: "select", width: 125 },
        positionTitle:   { field: "positionTitle",   label: "Position Title",   type: "text",   width: 190 },
        employeeId:      { field: "employeeId",      label: "Position ID",      type: "text",   width: 135, readonly: true },
        payGradeGroup:   { field: "payGradeGroup",   label: "Pay Grade",        type: "select", width: 110 },
        payGradeLevel:   { field: "payGradeLevel",   label: "Level",            type: "select", width: 90  },
        hireDate:        { field: "hireDate",        label: "Hire Date",        type: "date",   width: 125 },
        nationality:     { field: "nationality",     label: "Nationality",      type: "select", width: 125 },
        accommodation:   { field: "accommodation",   label: "Accommodation",    type: "select", width: 140 },
        transport:       { field: "transport",       label: "Transport",        type: "select", width: 115 },
        employeeClass:   { field: "employeeClass",   label: "Employee Class",   type: "select", width: 135 },
        overtime:        { field: "overtime",        label: "Overtime",         type: "select", width: 105 },
        specialApproval: { field: "specialApproval", label: "Special Approval", type: "select", width: 140 },
        comment:         { field: "comment",         label: "Comment",          type: "text",   width: 220 }
    };

    var ALL_FIELDS = [
        "companyCode", "division", "department", "costCenter", "jobCode",
        "positionTitle", "employeeId", "payGradeGroup", "payGradeLevel",
        "hireDate", "nationality", "accommodation", "transport",
        "employeeClass", "overtime", "specialApproval", "comment"
    ];

    /* =========================================================
       TAB CONFIGURATION
       ========================================================= */

    var TAB_CONFIG = {

        create: {

            key: "create",
            tabLabel: "Tab 1 - Create Position",
            startingRows: 1,

            columns: [
                CORE_COLUMNS.companyCode,
                CORE_COLUMNS.division,
                CORE_COLUMNS.department,
                CORE_COLUMNS.costCenter,
                CORE_COLUMNS.jobCode,
                CORE_COLUMNS.positionTitle,
                CORE_COLUMNS.employeeId,
                CORE_COLUMNS.payGradeGroup,
                CORE_COLUMNS.payGradeLevel,
                CORE_COLUMNS.hireDate,
                CORE_COLUMNS.nationality,
                CORE_COLUMNS.accommodation,
                CORE_COLUMNS.transport,
                CORE_COLUMNS.employeeClass,
                CORE_COLUMNS.overtime,
                CORE_COLUMNS.specialApproval,
                CORE_COLUMNS.comment
            ],

            mandatoryFields: [
                "companyCode", "division", "department",
                "costCenter", "jobCode", "positionTitle"
            ],

            buttons: [
                { id: "addButton",      label: "Add Row",           icon: ICONS.add,        handler: "_addRow" },
                { id: "copyButton",     label: "Copy",              icon: ICONS.copy,       handler: "_copyRows" },
                { id: "deleteButton",   label: "Delete Selected",   icon: ICONS.deleteIcon, handler: "_deleteRows",  cssClass: "delete", hiddenUnlessSelected: true },
                { id: "validateButton", label: "Validate",          icon: ICONS.check,      handler: "_validate" },
                { id: "approvalButton", label: "Send for Approval", icon: ICONS.send,       handler: "_sendForApproval", cssClass: "primary" },
                { id: "clearButton",    label: "Clear",             icon: ICONS.clear,      handler: "_clear" }
            ],

            events: {
                fieldChange: "onFieldChange",
                dataEntry: "onDataEntry",
                validate: "onValidate",
                clearEvent: "onClear"
            }
        },

        modify: {

            key: "modify",
            tabLabel: "Tab 2 - Load / Modify / Delete",
            startingRows: 0,

            columns: [
                CORE_COLUMNS.employeeId,
                CORE_COLUMNS.companyCode,
                CORE_COLUMNS.division,
                CORE_COLUMNS.department,
                CORE_COLUMNS.costCenter,
                CORE_COLUMNS.jobCode,
                CORE_COLUMNS.positionTitle,
                CORE_COLUMNS.payGradeGroup,
                CORE_COLUMNS.payGradeLevel,
                CORE_COLUMNS.hireDate,
                CORE_COLUMNS.nationality,
                CORE_COLUMNS.accommodation,
                CORE_COLUMNS.transport,
                CORE_COLUMNS.employeeClass,
                CORE_COLUMNS.overtime,
                CORE_COLUMNS.specialApproval,
                CORE_COLUMNS.comment
            ],

            mandatoryFields: [
                "employeeId", "companyCode", "division", "department",
                "costCenter", "jobCode", "positionTitle"
            ],

            buttons: [
                { id: "loadButton",      label: "Load Data",     icon: ICONS.load,       handler: "_loadData" },
                { id: "deleteButton2",   label: "Delete Selected", icon: ICONS.deleteIcon, handler: "_deleteRows", cssClass: "delete", hiddenUnlessSelected: true },
                { id: "validateButton2", label: "Validate",      icon: ICONS.check,      handler: "_validate" },
                { id: "saveButton",      label: "Save Changes",  icon: ICONS.save,       handler: "_saveChanges", cssClass: "primary" },
                { id: "clearButton2",    label: "Clear",         icon: ICONS.clear,      handler: "_clear" }
            ],

            events: {
                fieldChange: "onFieldChange2",
                dataEntry: "onDataEntry2",
                validate: "onValidate2",
                clearEvent: "onClear2"
            }
        }
    };

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

                --error: #bb0000;
                --error-bg: #fdecec;
                --error-bg-hover: #fbdede;
                --error-border: #e2a0a0;

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
               TAB BAR
               ================================================= */

            .tab-bar {
                display: flex;
                align-items: center;
                gap: 22px;
                padding: 10px 14px 0;
                background: #ffffff;
                border-bottom: 1px solid var(--border);
            }

            .tab-link {
                height: auto;
                padding: 4px 2px 10px;
                border: none;
                border-bottom: 2px solid transparent;
                border-radius: 0;
                background: transparent;
                color: #5f7284;
                font-size: 13px;
                font-weight: 600;
                cursor: pointer;
            }

            .tab-link:hover {
                background: transparent;
                border-bottom-color: #c4d0db;
                box-shadow: none;
                color: #29465f;
            }

            .tab-link.active {
                color: var(--blue);
                border-bottom-color: var(--blue);
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
                background: #ffffff;
                border-bottom: 1px solid var(--border);
            }

            /* =================================================
               BUTTONS
               ================================================= */

            button {
                height: 34px;
                padding: 0 14px;
                border: 1px solid #c2c9d1;
                border-radius: 8px;
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
                background: var(--blue-light);
                border-color: #9fc2f2;
                box-shadow: none;
            }

            button:active {
                transform: translateY(1px);
            }

            button:focus-visible {
                outline: 2px solid var(--blue);
                outline-offset: 1px;
            }

            button.primary {
                color: #ffffff;
                background: var(--blue);
                border-color: var(--blue);
                box-shadow: none;
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
                background: #fdeaea;
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
                border-collapse: collapse;
                table-layout: fixed;
                min-width: 2330px;
                width: 2330px;
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
                min-height: 46px;
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
                background: var(--blue-light);
            }

            tr.selected-row:hover td {
                background: #d7e9ff;
            }

            tr.row-error td {
                background: var(--error-bg);
            }

            tr.row-error:hover td {
                background: var(--error-bg-hover);
            }

            tr.selected-row.row-error td {
                background: #fbdcdc;
            }

            /* =================================================
               FIELD ERROR TEXT
               ================================================= */

            .field-error {
                margin-top: 4px;
                font-size: 10px;
                line-height: 1.25;
                color: var(--error);
                white-space: normal;
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

            input.cell.has-error,
            input.cell.has-error:hover {
                border-color: var(--error-border);
                background: #fffafa;
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

            .combo-toggle.has-error {
                border-color: var(--error-border);
                background: #fffafa;
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

            .status-icon {
                display: inline-flex;
                align-items: center;
            }

            .status-icon svg {
                display: block;
            }

        </style>

        <div class="container">

            <!-- TAB BAR -->
            <div class="tab-bar" id="tabBar"></div>

            <!-- TOOLBAR -->
            <div class="toolbar" id="toolbar"></div>

            <!-- TABLE -->
            <div class="table-area">
                <table>
                    <thead>
                        <tr id="headRow"></tr>
                    </thead>
                    <tbody id="tbody"></tbody>
                </table>
            </div>

            <!-- STATUS -->
            <div class="status">
                <span class="status-item">Total Rows: <span id="rowCount" class="status-value">0</span></span>
                <span class="status-item">Selected Rows: <span id="selectedCount" class="status-value">0</span></span>
                <span class="status-item">Validation: <span id="validationIcon" class="status-icon"></span><span id="validationStatus" class="status-value">-</span></span>
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

            /* ACTIVE TAB */
            this._activeTab = "create";

            /* Combobox (searchable dropdown) UI state - not part of row data */
            this._openDropdown = null; // { rowIndex, field }
            this._dropdownSearch = "";

            this._lastEvent = "";

            /* PER-TAB STATE */
            this._tabs = {
                create: this._createTabState(TAB_CONFIG.create),
                modify: this._createTabState(TAB_CONFIG.modify)
            };

            /* BIND TAB SWITCHER (built once, only class toggling after) */
            this._buildTabBar();

            this._render();
        }

        connectedCallback() {
            this._emit("onReady", "ready");
        }

        /* =====================================================
           TAB STATE FACTORY
           ===================================================== */

        _createTabState(config) {

            var rows = [];

            for (var i = 0; i < config.startingRows; i++) {
                rows.push(this._createEmptyRow(config));
            }

            return {
                config: config,
                rows: rows,
                rowOptions: {},
                status: "READY",
                validation: null
            };
        }

        _createEmptyRow(config) {

            var row = {
                selected: false,
                isModified: false
            };

            for (var i = 0; i < ALL_FIELDS.length; i++) {
                row[ALL_FIELDS[i]] = "";
            }

            return row;
        }

        _currentTab() {
            return this._tabs[this._activeTab];
        }

        /* =====================================================
           TAB BAR
           ===================================================== */

        _buildTabBar() {

            var bar = this.shadowRoot.getElementById("tabBar");

            var html = "";

            html += this._tabButtonHTML(TAB_CONFIG.create);
            html += this._tabButtonHTML(TAB_CONFIG.modify);

            bar.innerHTML = html;

            var links = bar.querySelectorAll(".tab-link");

            for (var i = 0; i < links.length; i++) {

                links[i].addEventListener("click", (event) => {

                    var tabKey = event.currentTarget.dataset.tab;

                    if (tabKey === this._activeTab) {
                        return;
                    }

                    this._activeTab = tabKey;

                    this._openDropdown = null;
                    this._dropdownSearch = "";

                    this._render();

                    this._emit("onDataChange", "tabChange|" + tabKey);
                });
            }
        }

        _tabButtonHTML(config) {

            return `
                <button type="button" class="tab-link ${config.key === this._activeTab ? "active" : ""}" data-tab="${config.key}">
                    ${this._escape(config.tabLabel)}
                </button>
            `;
        }

        _updateTabBarActiveState() {

            var links = this.shadowRoot.querySelectorAll(".tab-link");

            for (var i = 0; i < links.length; i++) {

                if (links[i].dataset.tab === this._activeTab) {
                    links[i].classList.add("active");
                } else {
                    links[i].classList.remove("active");
                }
            }
        }

        /* =====================================================
           TOOLBAR (rebuilt per active tab)
           ===================================================== */

        _renderToolbar() {

            var toolbar = this.shadowRoot.getElementById("toolbar");
            var config = this._currentTab().config;

            var html = "";

            for (var i = 0; i < config.buttons.length; i++) {

                var btn = config.buttons[i];

                html += `
                    <button
                        id="${btn.id}"
                        type="button"
                        class="${btn.cssClass || ""}"
                        ${btn.hiddenUnlessSelected ? 'style="display:none;"' : ""}
                    >
                        ${btn.icon}
                        ${this._escape(btn.label)}
                    </button>
                `;
            }

            toolbar.innerHTML = html;

            for (var j = 0; j < config.buttons.length; j++) {

                var buttonConfig = config.buttons[j];
                var element = this.shadowRoot.getElementById(buttonConfig.id);

                if (!element) {
                    continue;
                }

                element.addEventListener("click", () => {
                    this[buttonConfig.handler]();
                });
            }
        }

        /* =====================================================
           TABLE HEADER (rebuilt per active tab)
           ===================================================== */

        _renderHead() {

            var headRow = this.shadowRoot.getElementById("headRow");
            var config = this._currentTab().config;

            var html = `
                <th class="checkbox-cell" title="Select all">
                    <input id="selectAll" class="checkbox" type="checkbox">
                </th>
            `;

            for (var i = 0; i < config.columns.length; i++) {

                var column = config.columns[i];

                html += `<th style="width:${column.width}px;">${this._escape(column.label)}</th>`;
            }

            headRow.innerHTML = html;

            this.shadowRoot.getElementById("selectAll")
                .addEventListener("change", (event) => {

                    var checked = event.target.checked;
                    var tab = this._currentTab();

                    for (var r = 0; r < tab.rows.length; r++) {
                        tab.rows[r].selected = checked;
                    }

                    tab.status = "CHANGED";

                    this._render();

                    this._emit("onDataChange", "selectAll|" + checked);
                });
        }

        /* =====================================================
           BUTTON HANDLERS (operate on the active tab)
           ===================================================== */

        _addRow() {

            var tab = this._currentTab();

            tab.rows.push(this._createEmptyRow(tab.config));

            tab.status = "CHANGED";
            tab.validation = null;

            this._render();

            this._emit("onDataChange", (tab.config.key === "modify" ? "addRow2|" : "addRow|") + (tab.rows.length - 1));
        }

        _copyRows() {

            var tab = this._currentTab();

            var copied = [];

            for (var i = 0; i < tab.rows.length; i++) {

                if (tab.rows[i].selected === true) {

                    var newRow = JSON.parse(JSON.stringify(tab.rows[i]));

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
                tab.rows.push(copied[j]);
            }

            tab.status = "CHANGED";
            tab.validation = null;

            this._render();

            this._emit("onDataChange", (tab.config.key === "modify" ? "copyRow2|" : "copyRow|") + copied.length);
        }

        _deleteRows() {

            var tab = this._currentTab();

            var remaining = [];
            var deleted = 0;

            for (var i = 0; i < tab.rows.length; i++) {

                if (tab.rows[i].selected === true) {
                    deleted++;
                } else {
                    remaining.push(tab.rows[i]);
                }
            }

            if (deleted === 0) {
                return;
            }

            tab.rows = remaining;

            /* The Create Position tab always keeps at least one empty row. */
            if (tab.rows.length === 0 && tab.config.key === "create") {
                tab.rows.push(this._createEmptyRow(tab.config));
            }

            tab.status = "CHANGED";
            tab.validation = null;

            this._render();

            this._emit("onDataChange", (tab.config.key === "modify" ? "deleteRow2|" : "deleteRow|") + deleted);
        }

        _clear() {

            var tab = this._currentTab();

            var cleared = 0;

            for (var i = 0; i < tab.rows.length; i++) {

                var row = tab.rows[i];

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

            tab.status = "CLEARED";
            tab.validation = null;

            this._render();

            this._emit("onDataChange", (tab.config.key === "modify" ? "clear2|" : "clear|") + cleared);
        }

        _clearRow(row) {

            for (var i = 0; i < ALL_FIELDS.length; i++) {
                row[ALL_FIELDS[i]] = "";
            }

            row.isModified = true;
        }

        _validate() {

            var tab = this._currentTab();

            var errorRows = 0;

            for (var i = 0; i < tab.rows.length; i++) {

                var row = tab.rows[i];

                if (this._rowHasData(row) === false) {
                    continue;
                }

                if (this._getMissingFields(row, tab.config.mandatoryFields).length > 0) {
                    errorRows++;
                }
            }

            if (errorRows === 0) {

                tab.validation = true;
                tab.status = "VALID";

                this._emit("onValidate", tab.config.key === "modify" ? "VALID2|0" : "VALID|0");

            } else {

                tab.validation = false;
                tab.status = "INVALID";

                this._emit("onValidate", (tab.config.key === "modify" ? "INVALID2|" : "INVALID|") + errorRows);
            }

            this._render();
        }

        _loadData() {

            var tab = this._tabs.modify;

            tab.status = "LOADING";

            this._emit("onDataChange", "loadData");

            /*
             * Actual row population happens when the host
             * script calls setData2() after fetching records.
             */
        }

        _saveChanges() {

            var tab = this._tabs.modify;

            this._emit("onDataChange", "saveChanges|" + tab.rows.length);
        }

        _sendForApproval() {
            this._emit("onDataChange", "sendForApproval");
        }

        /* =====================================================
           VALIDATION HELPERS
           ===================================================== */

        _rowHasData(row) {

            for (var i = 0; i < ALL_FIELDS.length; i++) {

                var value = row[ALL_FIELDS[i]];

                if (value !== "" && value !== null && value !== undefined) {
                    return true;
                }
            }

            return false;
        }

        _getMissingFields(row, mandatoryFields) {

            var missing = [];

            for (var i = 0; i < mandatoryFields.length; i++) {

                var field = mandatoryFields[i];

                if (!row[field]) {
                    missing.push(field);
                }
            }

            return missing;
        }

        _getValidationErrorCount(tab) {

            var errors = 0;

            for (var i = 0; i < tab.rows.length; i++) {

                var row = tab.rows[i];

                if (!this._rowHasData(row)) {
                    continue;
                }

                if (this._getMissingFields(row, tab.config.mandatoryFields).length > 0) {
                    errors++;
                }
            }

            return errors;
        }

        _fieldLabel(tab, field) {

            for (var i = 0; i < tab.config.columns.length; i++) {

                if (tab.config.columns[i].field === field) {
                    return tab.config.columns[i].label;
                }
            }

            return field;
        }

        /* =====================================================
           RENDER (full pipeline)
           ===================================================== */

        _render() {

            this._updateTabBarActiveState();

            this._renderToolbar();
            this._renderHead();
            this._renderBody();

            this._updateCounts();
            this._updateDeleteButtonVisibility();
            this._updateSelectAll();
            this._updateStatus();

            this._attachOpenComboPanelEvents();
        }

        _renderBody() {

            var tbody = this.shadowRoot.getElementById("tbody");
            var tab = this._currentTab();

            tbody.innerHTML = "";

            for (var i = 0; i < tab.rows.length; i++) {
                tbody.appendChild(this._createRow(tab, tab.rows[i], i));
            }
        }

        /* =====================================================
           CREATE TABLE ROW
           ===================================================== */

        _createRow(tab, row, rowIndex) {

            var tr = document.createElement("tr");

            var missingFields =
                tab.validation === false && this._rowHasData(row)
                    ? this._getMissingFields(row, tab.config.mandatoryFields)
                    : [];

            if (row.selected === true) {
                tr.classList.add("selected-row");
            }

            if (missingFields.length > 0) {
                tr.classList.add("row-error");
            }

            var html = `
                <td class="checkbox-cell">
                    <input class="checkbox" type="checkbox" data-field="selected" ${row.selected ? "checked" : ""}>
                </td>
            `;

            for (var i = 0; i < tab.config.columns.length; i++) {

                var column = tab.config.columns[i];
                var hasError = missingFields.indexOf(column.field) !== -1;

                html += this._cell(tab, column, row[column.field], rowIndex, hasError);
            }

            tr.innerHTML = html;

            this._attachRowEvents(tr, tab, rowIndex);

            return tr;
        }

        /* =====================================================
           GET OPTIONS FOR A CELL
           ===================================================== */

        _getOptionsFor(tab, rowIndex, field) {

            if (tab.rowOptions[rowIndex] && tab.rowOptions[rowIndex][field]) {
                return tab.rowOptions[rowIndex][field];
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

        _cell(tab, column, value, rowIndex, hasError) {

            var errorHTML = hasError
                ? `<div class="field-error">${this._escape(column.label)} is required</div>`
                : "";

            if (column.type === "select") {
                return this._comboCell(tab, column, value, rowIndex, hasError, errorHTML);
            }

            return `
                <td>
                    <input
                        class="cell ${column.readonly ? "readonly" : ""} ${hasError ? "has-error" : ""}"
                        type="${column.type || "text"}"
                        data-field="${column.field}"
                        value="${this._escape(value)}"
                        ${column.readonly ? "readonly" : ""}
                    >
                    ${errorHTML}
                </td>
            `;
        }

        /* =====================================================
           CREATE SEARCHABLE DROPDOWN (COMBOBOX) CELL
           ===================================================== */

        _comboCell(tab, column, value, rowIndex, hasError, errorHTML) {

            var field = column.field;
            var options = this._getOptionsFor(tab, rowIndex, field);

            var isOpen = !!(
                this._openDropdown &&
                this._openDropdown.tab === tab.config.key &&
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
                    <div class="combo-wrap" data-combo-tab="${tab.config.key}" data-combo-row="${rowIndex}" data-combo-field="${field}">
                        <button type="button" class="combo-toggle ${isOpen ? "is-open" : ""} ${hasError ? "has-error" : ""}" data-field="${field}">
                            <span class="combo-toggle-text ${selectedText ? "" : "is-placeholder"}">${this._escape(toggleLabel)}</span>
                            <svg class="combo-chevron" width="12" height="12" viewBox="0 0 20 20" fill="none">
                                <path d="M5 7.5l5 5 5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                        ${panelHTML}
                    </div>
                    ${errorHTML}
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

        _attachRowEvents(tr, tab, rowIndex) {

            var controls = tr.querySelectorAll("[data-field]");

            for (var i = 0; i < controls.length; i++) {

                var control = controls[i];
                var field = control.dataset.field;

                /* CHECKBOX */
                if (field === "selected") {

                    control.addEventListener("change", (event) => {

                        var checked = event.target.checked;

                        tab.rows[rowIndex].selected = checked;

                        tab.status = "CHANGED";

                        this._updateCounts();
                        this._updateDeleteButtonVisibility();
                        this._updateSelectAll();

                        if (checked) {
                            tr.classList.add("selected-row");
                        } else {
                            tr.classList.remove("selected-row");
                        }

                        this._emit("onDataChange", (tab.config.key === "modify" ? "selectRow2|" : "selectRow|") + rowIndex + "|" + checked);
                    });

                    continue;
                }

                /* SEARCHABLE DROPDOWN TOGGLE */
                if (control.classList.contains("combo-toggle")) {

                    control.addEventListener("click", (event) => {

                        event.stopPropagation();

                        var isSame = !!(
                            this._openDropdown &&
                            this._openDropdown.tab === tab.config.key &&
                            this._openDropdown.rowIndex === rowIndex &&
                            this._openDropdown.field === field
                        );

                        if (isSame) {
                            this._openDropdown = null;
                        } else {
                            this._openDropdown = { tab: tab.config.key, rowIndex: rowIndex, field: field };
                            this._dropdownSearch = "";
                        }

                        this._render();
                    });

                    continue;
                }

                /* TEXT / DATE INPUT */
                if (control.hasAttribute("readonly")) {
                    continue;
                }

                control.addEventListener("change", () => {
                    this._commitFieldChange(tab, rowIndex, field, control.value);
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

            var tabKey = this._openDropdown.tab;
            var rowIndex = this._openDropdown.rowIndex;
            var field = this._openDropdown.field;
            var tab = this._tabs[tabKey];

            if (!tab || tabKey !== this._activeTab) {
                return;
            }

            var wrap = this.shadowRoot.querySelector(
                '.combo-wrap[data-combo-tab="' + tabKey + '"][data-combo-row="' + rowIndex + '"][data-combo-field="' + field + '"]'
            );

            if (!wrap) {
                return;
            }

            var panel = wrap.querySelector(".combo-panel");

            if (!panel) {
                return;
            }

            panel.addEventListener("click", (event) => { event.stopPropagation(); });
            panel.addEventListener("mousedown", (event) => { event.stopPropagation(); });

            var options = this._getOptionsFor(tab, rowIndex, field);

            var searchInput = panel.querySelector(".combo-search-input");
            var optionsContainer = panel.querySelector(".combo-options");

            this._attachComboOptionClicks(optionsContainer, tab, rowIndex, field);

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
                        tab.rows[rowIndex][field]
                    );

                    this._attachComboOptionClicks(optionsContainer, tab, rowIndex, field);

                    clearBtn.remove();

                    if (searchInput) {
                        searchInput.focus();
                    }
                });
            }

            if (searchInput) {

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
                        tab.rows[rowIndex][field]
                    );

                    this._attachComboOptionClicks(optionsContainer, tab, rowIndex, field);

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
                                tab.rows[rowIndex][field]
                            );

                            this._attachComboOptionClicks(optionsContainer, tab, rowIndex, field);

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

        _attachComboOptionClicks(container, tab, rowIndex, field) {

            var items = container.querySelectorAll(".combo-option");

            for (var i = 0; i < items.length; i++) {

                items[i].addEventListener("click", (event) => {

                    var value = event.currentTarget.dataset.value;

                    this._openDropdown = null;
                    this._dropdownSearch = "";

                    this._commitFieldChange(tab, rowIndex, field, value);

                    this._render();
                });
            }
        }

        /* =====================================================
           COMMIT A FIELD CHANGE (shared by text/date inputs
           and the searchable dropdown)
           ===================================================== */

        _commitFieldChange(tab, rowIndex, field, value) {

            tab.rows[rowIndex][field] = value;
            tab.rows[rowIndex].isModified = true;

            tab.status = "CHANGED";
            tab.validation = null;

            this._updateStatus();

            this._emit("onDataChange", (tab.config.key === "modify" ? "fieldChange2|" : "fieldChange|") + rowIndex + "|" + field + "|" + value);
        }

        /* =====================================================
           DELETE BUTTON VISIBILITY
           ===================================================== */

        _updateDeleteButtonVisibility() {

            var tab = this._currentTab();

            var selected = 0;

            for (var i = 0; i < tab.rows.length; i++) {
                if (tab.rows[i].selected === true) {
                    selected++;
                }
            }

            for (var b = 0; b < tab.config.buttons.length; b++) {

                var buttonConfig = tab.config.buttons[b];

                if (!buttonConfig.hiddenUnlessSelected) {
                    continue;
                }

                var element = this.shadowRoot.getElementById(buttonConfig.id);

                if (element) {
                    element.style.display = selected > 0 ? "inline-flex" : "none";
                }
            }
        }

        /* =====================================================
           SELECT ALL
           ===================================================== */

        _updateSelectAll() {

            var checkbox = this.shadowRoot.getElementById("selectAll");

            if (!checkbox) {
                return;
            }

            var tab = this._currentTab();

            if (tab.rows.length === 0) {
                checkbox.checked = false;
                checkbox.indeterminate = false;
                return;
            }

            var selected = 0;

            for (var i = 0; i < tab.rows.length; i++) {
                if (tab.rows[i].selected === true) {
                    selected++;
                }
            }

            checkbox.checked = selected === tab.rows.length;
            checkbox.indeterminate = selected > 0 && selected < tab.rows.length;
        }

        /* =====================================================
           COUNTS
           ===================================================== */

        _updateCounts() {

            var tab = this._currentTab();

            this.shadowRoot.getElementById("rowCount").textContent = tab.rows.length;
            this.shadowRoot.getElementById("selectedCount").textContent = this._getSelectedCount(tab);
        }

        /* =====================================================
           STATUS
           ===================================================== */

        _updateStatus() {

            var tab = this._currentTab();

            var validation = this.shadowRoot.getElementById("validationStatus");
            var errorCount = this.shadowRoot.getElementById("errorCount");
            var validationIcon = this.shadowRoot.getElementById("validationIcon");

            validation.classList.remove("valid", "invalid");

            if (tab.validation === true) {

                validation.textContent = "true";
                validation.classList.add("valid");

                errorCount.textContent = "0";

                validationIcon.innerHTML =
                    '<svg width="12" height="12" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" stroke="#107e3e" stroke-width="1.6"/><path d="M6 10.3l2.6 2.6L14 7.5" stroke="#107e3e" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';

            } else if (tab.validation === false) {

                validation.textContent = "false";
                validation.classList.add("invalid");

                errorCount.textContent = this._getValidationErrorCount(tab);

                validationIcon.innerHTML =
                    '<svg width="12" height="12" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" stroke="#bb0000" stroke-width="1.6"/><path d="M10 6v5" stroke="#bb0000" stroke-width="1.8" stroke-linecap="round"/><circle cx="10" cy="13.6" r="1" fill="#bb0000"/></svg>';

            } else {

                validation.textContent = "-";
                errorCount.textContent = "0";

                validationIcon.innerHTML = "";
            }

            this.shadowRoot.getElementById("rowCount").textContent = tab.rows.length;
            this.shadowRoot.getElementById("selectedCount").textContent = this._getSelectedCount(tab);
        }

        /* =====================================================
           GET SELECTED COUNT
           ===================================================== */

        _getSelectedCount(tab) {

            var count = 0;

            for (var i = 0; i < tab.rows.length; i++) {
                if (tab.rows[i].selected === true) {
                    count++;
                }
            }

            return count;
        }

        /* =====================================================
           EVENT EMITTER
           ===================================================== */

        _emit(name, value) {

            this._lastEvent = String(value);

            this.dispatchEvent(new Event(name));
        }

        /* =====================================================
           PUBLIC API - SHARED
           ===================================================== */

        getLastEvent() {
            return this._lastEvent;
        }

        getActiveTab() {
            return this._activeTab;
        }

        setActiveTab(tabKey) {

            if (tabKey !== "create" && tabKey !== "modify") {
                return;
            }

            if (tabKey === this._activeTab) {
                return;
            }

            this._activeTab = tabKey;

            this._openDropdown = null;
            this._dropdownSearch = "";

            this._render();
        }

        /* =====================================================
           PUBLIC API - TAB 1: CREATE POSITION
           (unchanged method names for backward compatibility)
           ===================================================== */

        getData() {
            return JSON.stringify(this._tabs.create.rows);
        }

        setData(data) {
            this._setTabData(this._tabs.create, data, true);
        }

        setCellValue(rowIndex, fieldName, value) {
            this._setTabCellValue(this._tabs.create, rowIndex, fieldName, value);
        }

        setRowOptions(rowIndex, fieldName, options) {
            this._setTabRowOptions(this._tabs.create, rowIndex, fieldName, options);
        }

        /* =====================================================
           PUBLIC API - TAB 2: LOAD / MODIFY / DELETE
           ===================================================== */

        getData2() {
            return JSON.stringify(this._tabs.modify.rows);
        }

        setData2(data) {
            this._setTabData(this._tabs.modify, data, false);
        }

        setCellValue2(rowIndex, fieldName, value) {
            this._setTabCellValue(this._tabs.modify, rowIndex, fieldName, value);
        }

        setRowOptions2(rowIndex, fieldName, options) {
            this._setTabRowOptions(this._tabs.modify, rowIndex, fieldName, options);
        }

        /* =====================================================
           SHARED IMPLEMENTATIONS BEHIND THE PUBLIC API
           ===================================================== */

        _setTabData(tab, data, forceMinimumOneRow) {

            try {

                var parsed;

                if (typeof data === "string") {
                    parsed = JSON.parse(data);
                } else {
                    parsed = data;
                }

                if (Array.isArray(parsed)) {
                    tab.rows = parsed;
                } else {
                    tab.rows = [];
                }

                if (forceMinimumOneRow && tab.rows.length === 0) {
                    tab.rows.push(this._createEmptyRow(tab.config));
                }

                tab.validation = null;
                tab.status = "READY";

                if (this._openDropdown && this._openDropdown.tab === tab.config.key) {
                    this._openDropdown = null;
                    this._dropdownSearch = "";
                }

                this._render();

            } catch (error) {

                tab.rows = forceMinimumOneRow ? [this._createEmptyRow(tab.config)] : [];

                this._render();
            }
        }

        _setTabCellValue(tab, rowIndex, fieldName, value) {

            if (!tab.rows[rowIndex]) {
                return;
            }

            tab.rows[rowIndex][fieldName] = value;
            tab.rows[rowIndex].isModified = true;

            tab.validation = null;

            this._render();
        }

        _setTabRowOptions(tab, rowIndex, fieldName, options) {

            if (!tab.rowOptions[rowIndex]) {
                tab.rowOptions[rowIndex] = {};
            }

            try {

                tab.rowOptions[rowIndex][fieldName] =
                    typeof options === "string" ? JSON.parse(options) : options;

                this._render();

            } catch (error) {

                tab.rowOptions[rowIndex][fieldName] = [];
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
