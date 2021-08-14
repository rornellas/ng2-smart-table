import {Component, Input, Output, EventEmitter, } from '@angular/core';

import { Grid } from '../../lib/grid';
import { DataSource } from '../../lib/data-source/data-source';
import { Row } from '../../lib/data-set/row';

@Component({
  selector: '[ng2-st-tbody]',
  styleUrls: ['./tbody.component.scss'],
  templateUrl: './tbody.component.html',
})
export class Ng2SmartTableTbodyComponent {

  @Input() grid: Grid;
  @Input() source: DataSource;
  @Input() deleteConfirm: EventEmitter<any>;
  @Input() editConfirm: EventEmitter<any>;
  @Input() rowClassFunction: Function;

  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() custom = new EventEmitter<any>();
  @Output() edited = new EventEmitter<any>();
  @Output() userSelectRow = new EventEmitter<any>();
  @Output() editRowSelect = new EventEmitter<any>();
  @Output() multipleSelectRow = new EventEmitter<any>();
  @Output() rowHover = new EventEmitter<any>();
  @Output() sort = new EventEmitter<any>();

  isMultiSelectVisible: boolean;
  showActionColumnLeft: boolean;
  showActionColumnRight: boolean;
  mode: string;
  editInputClass: string;
  isActionAdd: boolean;
  isActionEdit: boolean;
  isActionDelete: boolean;
  noDataMessage: boolean;

  get displayConfig() {
    return this.grid?.settings?.displayConfig;
  }

  get displayConfigGroups() {
    return this.displayConfig?.groups;
  }

  get tableColumnsCount() {
    const actionColumns = this.isActionAdd || this.isActionEdit || this.isActionDelete ? 1 : 0;
    return this.grid.getColumns().length + actionColumns;
  }

  getCollapseDisplay(row: Row, group: any) {
    if (group.collapseConfig) {

      if (row[group.name]) {
        return !row[group.name]?.collapsed ? '' : 'none';
      }

      return !group.collapseConfig?.default ? '' : 'none';

    } else {
      return '';
    }
  }

  defineIfCollapsable(row: Row, group: any) {
    this.collapseGroup(row, group);
    if (group.collapseConfig) {
      return true;
    }
    return false;
  }

  getByCollapsed(row: Row, group: any, property: string) {
    if (row[group.name] === undefined) {
      this.collapseGroup(row, group);
    }

    const collapsed = row[group.name]?.collapsed;

    if (!collapsed) {
      if (!group.collapseConfig.collapsed) {
        group.collapseConfig.collapsed = {};
      }
      return group.collapseConfig?.collapsed[property];
    }
    if (!group.collapseConfig.expanded) {
      group.collapseConfig.expanded = {};
    }
    return group.collapseConfig?.expanded[property];
  }

  collapseGroup(row: Row, group: any) {
    if (row[group.name]?.collapsed === undefined) {
      if (group?.collapseConfig?.default) {
        row[group.name] = { collapsed: group?.collapseConfig?.default };
      } else {
        row[group.name] = { collapsed: true };
      }
    } else {
      row[group.name].collapsed = !row[group.name].collapsed;
    }
  }

  ngOnChanges() {
    this.isMultiSelectVisible = this.grid.isMultiSelectVisible();
    this.showActionColumnLeft = this.grid.showActionColumn('left');
    this.mode = this.grid.getSetting('mode');
    this.editInputClass = this.grid.getSetting('edit.inputClass');
    this.showActionColumnRight = this.grid.showActionColumn('right');
    this.isActionAdd = this.grid.getSetting('actions.add');
    this.isActionEdit = this.grid.getSetting('actions.edit');
    this.isActionDelete = this.grid.getSetting('actions.delete');
    this.noDataMessage = this.grid.getSetting('noDataMessage');
  }
}
