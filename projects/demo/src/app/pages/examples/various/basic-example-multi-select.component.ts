import { Component } from '@angular/core';

@Component({
  selector: 'basic-example-multi-select',
  template: `
    <ng2-smart-table [settings]="settings" [source]="data"></ng2-smart-table>
  `,
})
export class BasicExampleMultiSelectComponent {

  settings = {
    selectMode: 'multi',
    displayConfig : {
      type : 'singleColumn',
      containerClass : 'row',
      groups: [
        {
          name: 'beta',
          style: 'color: red; margin-bottom: 2rem',
          collapseConfig: {

            collapsed: {
              content: '-',
            },
            expanded: {
              content: '+',
            }
          }
        },
        {
          name: 'teta',
          style: 'color: blue'
        }
      ]
    },
    columns: {
      id: {
        title: 'ID',
        style: 'width: 20%; display: table-cell',
        class: 'crazy-class',
        group: 'beta',
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
        style: 'width: 20%; display: table-cell',
        group: 'teta',
      },
    },
  };

  data = [
    {
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'Sincere@april.biz',
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      email: 'Shanna@melissa.tv',
    },
    {
      id: 3,
      name: 'Clementine Bauch',
      username: 'Samantha',
      email: 'Nathan@yesenia.net',
    },
    {
      id: 4,
      name: 'Patricia Lebsack',
      username: 'Karianne',
      email: 'Julianne.OConner@kory.org',
    },
    {
      id: 5,
      name: 'Chelsey Dietrich',
      username: 'Kamren',
      email: 'Lucio_Hettinger@annie.ca',
    },
    {
      id: 6,
      name: 'Mrs. Dennis Schulist',
      username: 'Leopoldo_Corkery',
      email: 'Karley_Dach@jasper.info',
    },
    {
      id: 7,
      name: 'Kurtis Weissnat',
      username: 'Elwyn.Skiles',
      email: 'Telly.Hoeger@billy.biz',
    },
    {
      id: 8,
      name: 'Nicholas Runolfsdottir V',
      username: 'Maxime_Nienow',
      email: 'Sherwood@rosamond.me',
    },
    {
      id: 9,
      name: 'Glenna Reichert',
      username: 'Delphine',
      email: 'Chaim_McDermott@dana.io',
    },
    {
      id: 10,
      name: 'Clementina DuBuque',
      username: 'Moriah.Stanton',
      email: 'Rey.Padberg@karina.biz',
    },
    {
      id: 11,
      name: 'Nicholas DuBuque',
      username: 'Nicholas.Stanton',
      email: 'Rey.Padberg@rosamond.biz',
    },
  ];
}
