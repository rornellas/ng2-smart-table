import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

import { Grid } from '../../../lib/grid';
import { Row } from '../../../lib/data-set/row';
import { Cell } from '../../../lib/data-set/cell';

@Component({
  selector: '[ng2-st-thead-form-row]',
  templateUrl: './thead-form-row.component.html',
})
export class TheadFormRowComponent implements OnChanges {

  @Input() grid: Grid;
  @Input() row: Row;
  @Input() createConfirm: EventEmitter<any>;

  @Output() create = new EventEmitter<any>();

  isMultiSelectVisible: boolean;
  showActionColumnLeft: boolean;
  showActionColumnRight: boolean;
  addInputClass: string;

  public get newRow(): Row {
    return this.grid.getNewRow();
  }

  public get newRowCells(): Cell[] {
    const cells = this.newRow.getCells().filter(cell => this.checkAddableCell(cell));
    return cells;
  }

  checkAddableCell(cell: any) {
    const column = cell.getColumn();
    const settings = column?.settings;
    return (settings.addable === undefined || settings.addable);
  }

  get displayConfig() {
    return this.grid?.settings?.displayConfig;
  }

  get displayConfigGroups() {
    return this.displayConfig?.groups;
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

  onCreate(event: any) {
    event.stopPropagation();

    this.grid.create(this.grid.getNewRow(), this.createConfirm);
  }

  ngOnChanges(){
    this.isMultiSelectVisible = this.grid.isMultiSelectVisible();
    this.showActionColumnLeft = this.grid.showActionColumn('left');
    this.showActionColumnRight = this.grid.showActionColumn('right');
    this.addInputClass = this.grid.getSetting('add.inputClass');
  }
}
