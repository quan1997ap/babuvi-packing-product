import { Injectable } from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
  icon?:string;
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  link?: boolean;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

const MENUITEMS : Menu[] = [
];

@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    console.log(MENUITEMS);
    return MENUITEMS;
  }

  // add(menu: Menu) {
  //   MENUITEMS.push(menu);
  // }
}
