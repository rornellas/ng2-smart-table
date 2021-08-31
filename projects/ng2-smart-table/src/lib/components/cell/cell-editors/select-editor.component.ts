import { Component } from '@angular/core';

import { DefaultEditor } from './default-editor';

@Component({
  selector: 'select-editor',
  template: `
    <select [ngClass]="inputClass"
            class="form-control"
            [(ngModel)]="value"
            [name]="cell.getId()"
            [disabled]="!cell.isEditable()"
            (click)="onClick.emit($event)"
            (keydown.enter)="onEdited.emit($event)"
            (keydown.esc)="onStopEditing.emit()">

        <option *ngFor="let option of cell.getColumn().getConfig()?.list" [value]="findKeyPropertyValue(option, 'value')"
                [selected]="isSelectedOption(option)">{{ option.title }}
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

  isSelectedOption(option: any) {
    return this.findKeyPropertyValue(option, 'value') == this.getSelectionValue();
  }

  getSelectionValue() {
    return this.findKeyPropertyValue(this.cell.getValue());
  }

  findKeyPropertyValue(object: any, defaultProperty?: string) {
    const keyPropertyName = this.keyPropertyName();
    if (keyPropertyName) {
      return object[keyPropertyName];
    }
    return defaultProperty ? object[defaultProperty] : object;    
  }

  private keyPropertyName() {
    return this.cell.getColumn()?.getConfig()?.keyPropertyName;
  }
}
