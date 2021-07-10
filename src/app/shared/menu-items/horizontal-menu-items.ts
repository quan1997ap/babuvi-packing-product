import { Injectable } from '@angular/core';

export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
  subchildren? : SuperChildrenItems[];
}

export interface SuperChildrenItems {
  state: string;
  name: string;
  type?: string;
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  children?: ChildrenItems[];
}

const HORIZONTALMENUITEMS = [
];

@Injectable()
export class HorizontalMenuItems {
  getAll(): Menu[] {
    return HORIZONTALMENUITEMS;
  }
  add(menu: Menu) {
    // HORIZONTALMENUITEMS.push(Menu);
  }
}
