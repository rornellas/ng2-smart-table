import { DataSet } from './data-set';

export class Column {

  title: string = '';
  type: string = '';
  class: string = '';
  style: string = '';
  width: string = '';
  isSortable: boolean = false;
  isEditable: boolean = true;
  isAddable: boolean = true;
  isFilterable: boolean = false;
  sortDirection: string = '';
  defaultSortDirection: string = '';
  editor: { type: string, config: any, component: any } = { type: '', config: {}, component: null };
  filter: { type: string, config: any, component: any } = { type: '', config: {}, component: null };
  renderComponent: any = null;
  compareFunction: Function;
  valuePrepareFunction: Function;
  filterFunction: Function;
  onComponentInitFunction: Function;

  private _group: any;
  public get group(): any {
    return this._group;
  }
  public set group(value: any) {
    this._group = value;
  }

  private _labelClass: any;
  public get labelClass(): any {
    return this._labelClass;
  }
  public set labelClass(value: any) {
    this._labelClass = value;
  }

  private _labelStyle: any;
  public get labelStyle(): any {
    return this._labelStyle;
  }
  public set labelStyle(value: any) {
    this._labelStyle = value;
  }

  private _valueClass: any;
  public get valueClass(): any {
    return this._valueClass;
  }
  public set valueClass(value: any) {
    this._valueClass = value;
  }

  private _valueStyle: any;
  public get valueStyle(): any {
    return this._valueStyle;
  }
  public set valueStyle(value: any) {
    this._valueStyle = value;
  }

  constructor(public id: string, protected settings: any, protected dataSet: DataSet) {
    this.process();
  }

  getOnComponentInitFunction(): Function {
    return this.onComponentInitFunction;
  }

  getCompareFunction(): Function {
    return this.compareFunction;
  }

  getValuePrepareFunction(): Function {
    return this.valuePrepareFunction;
  }

  getFilterFunction(): Function {
    return this.filterFunction;
  }

  getConfig(): any {
    return this.editor && this.editor.config;
  }

  getFilterType(): any {
    return this.filter && this.filter.type;
  }

  getFilterConfig(): any {
    return this.filter && this.filter.config;
  }

  protected process() {
    this.title = this.settings['title'];
    this.class = this.settings['class'];
    this.style = this.settings['style'];
    this.group = this.settings['group'];
    this.labelClass = this.settings['labelClass'];
    this.labelStyle = this.settings['labelStyle'];
    this.valueClass = this.settings['valueClass'];
    this.valueStyle = this.settings['valueStyle'];
    this.width = this.settings['width'];
    this.type = this.prepareType();
    this.editor = this.settings['editor'];
    this.filter = this.settings['filter'];
    this.renderComponent = this.settings['renderComponent'];

    this.isFilterable = typeof this.settings['filter'] === 'undefined' ? true : !!this.settings['filter'];
    this.defaultSortDirection = ['asc', 'desc']
      .indexOf(this.settings['sortDirection']) !== -1 ? this.settings['sortDirection'] : '';
    this.isSortable = typeof this.settings['sort'] === 'undefined' ? true : !!this.settings['sort'];
    this.isEditable = typeof this.settings['editable'] === 'undefined' ? true : !!this.settings['editable'];
    this.isAddable=typeof this.settings['addable'] === 'undefined' ? true : !!this.settings['addable'];
    this.sortDirection = this.prepareSortDirection();

    this.compareFunction = this.settings['compareFunction'];
    this.valuePrepareFunction = this.settings['valuePrepareFunction'];
    this.filterFunction = this.settings['filterFunction'];
    this.onComponentInitFunction = this.settings['onComponentInitFunction'];
  }

  prepareType(): string {
    return this.settings['type'] || this.determineType();
  }

  prepareSortDirection(): string {
    return this.settings['sort'] === 'desc' ? 'desc' : 'asc';
  }

  determineType(): string {
    // TODO: determine type by data
    return 'text';
  }
}
