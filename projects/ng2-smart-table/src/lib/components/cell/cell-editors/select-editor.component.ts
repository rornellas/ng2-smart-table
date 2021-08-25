import { Component } from '@angular/core';

import { DefaultEditor } from './default-editor';

@Component({
  selector: 'select-editor',
  template: `
    <select [ngClass]="inputClass"
            class="form-control"
            [(ngModel)]="cell.newValue"
            [name]="cell.getId()"
            [disabled]="!cell.isEditable()"
            (click)="onClick.emit($event)"
            (keydown.enter)="onEdited.emit($event)"
            (keydown.esc)="onStopEditing.emit()">

        <option *ngFor="let option of cell.getColumn().getConfig()?.list" [value]="option.value"
                [selected]="option.value === cell.getValue()">{{ option.title }}
        </option>
    </select>
    `,
})
export class SelectEditorComponent extends DefaultEditor {

  public get value(): any {
    const keyPropertyName = this.keyPropertyName();
    if (keyPropertyName) {
      return this.cell.newValue[keyPropertyName];
    }
    return this.cell.newValue;
  }

  public set value(value: any) {
    const keyPropertyName = this.keyPropertyName();
    if (keyPropertyName) {
      const json = {};
      json[keyPropertyName] = value;
      this.cell.newValue = json;
      return;
    }
    this.cell.newValue = value;
  }

  constructor() {
    super();
  }

  getSelectionValue() {
    const keyPropertyName = this.keyPropertyName();
    if (keyPropertyName) {
      return this.cell.getValue()[keyPropertyName];
    }
    return this.cell.getValue();
  }

  private keyPropertyName() {
    return this.cell.getColumn()?.getConfig()?.keyPropertyName;
  }
}
