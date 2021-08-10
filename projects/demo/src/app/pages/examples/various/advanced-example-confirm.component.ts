import { Component } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'advance-example-comfirm',
  template: `
    <ng2-smart-table
      [settings]="settings"
      [source]="source"
      (deleteConfirm)="onDeleteConfirm($event)"
      (editConfirm)="onSaveConfirm($event)"
      (createConfirm)="onCreateConfirm($event)"></ng2-smart-table>
  `,
})
export class AdvancedExampleConfirmComponent {

  settings = {
    delete: {
      confirmDelete: true,
    },
    add: {
      confirmCreate: true,
    },
    edit: {
      confirmSave: true,
    },
    columns: {
      id: {
        title: 'ID',
        style: 'width: 20%; display: table-cell',
      },
      name: {
        title: 'Full Name',
        style: 'width: 20%; display: table-cell',
      },
      username: {
        title: 'User Name',
        style: 'width: 20%; display: table-cell',
      },
      email: {
        title: 'Email',
        style: 'width: 20%',
      },
    },
  };

  data = [
    {
      id: 1,
      style: 'width: 20%; display: table-cell',
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'Sincere@april.biz',
      notShownField: true,
    },
    {
      id: 2,
      style: 'width: 20%; display: table-cell',
      name: 'Ervin Howell',
      username: 'Antonette',
      email: 'Shanna@melissa.tv',
      notShownField: true,
    },
    {
      id: 3,
      style: 'width: 20%; display: table-cell',
      name: 'Clementine Bauch',
      username: 'Samantha',
      email: 'Nathan@yesenia.net',
      notShownField: false,
    },
    {
      id: 4,
      style: 'width: 20%; display: table-cell',
      name: 'Patricia Lebsack',
      username: 'Karianne',
      email: 'Julianne.OConner@kory.org',
      notShownField: false,
    },
    {
      id: 5,
      style: 'width: 20%; display: table-cell',
      name: 'Chelsey Dietrich',
      username: 'Kamren',
      email: 'Lucio_Hettinger@annie.ca',
      notShownField: false,
    },
    {
      id: 6,
      style: 'width: 20%; display: table-cell',
      name: 'Mrs. Dennis Schulist',
      username: 'Leopoldo_Corkery',
      email: 'Karley_Dach@jasper.info',
      notShownField: false,
    },
    {
      id: 7,
      style: 'width: 20%; display: table-cell',
      name: 'Kurtis Weissnat',
      username: 'Elwyn.Skiles',
      email: 'Telly.Hoeger@billy.biz',
      notShownField: false,
    },
    {
      id: 8,
      style: 'width: 20%; display: table-cell',
      name: 'Nicholas Runolfsdottir V',
      username: 'Maxime_Nienow',
      email: 'Sherwood@rosamond.me',
      notShownField: true,
    },
    {
      id: 9,
      style: 'width: 20%; display: table-cell',
      name: 'Glenna Reichert',
      username: 'Delphine',
      email: 'Chaim_McDermott@dana.io',
      notShownField: false,
    },
    {
      id: 10,
      style: 'width: 20%; display: table-cell',
      name: 'Clementina DuBuque',
      username: 'Moriah.Stanton',
      email: 'Rey.Padberg@karina.biz',
      notShownField: false,
    },
    {
      id: 11,
      style: 'width: 20%; display: table-cell',
      name: 'Nicholas DuBuque',
      username: 'Nicholas.Stanton',
      email: 'Rey.Padberg@rosamond.biz',
      notShownField: true,
    }
  ];

  source: LocalDataSource;

  constructor() {
    this.source = new LocalDataSource(this.data);
  }

  onDeleteConfirm(event) {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onSaveConfirm(event) {
    if (window.confirm('Are you sure you want to save?')) {
      event.newData['name'] += ' + added in code';
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event) {
    if (window.confirm('Are you sure you want to create?')) {
      event.newData['name'] += ' + added in code';
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }
}
