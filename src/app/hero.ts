export class Hero {
    constructor(
        public id: number,
        public name: string,
    ) { }
}

export interface Flyer { canFly: boolean; }
export const HEROES =  [
  {name: 'Windstorm', canFly: true},
  {name: 'Bombasto',  canFly: false},
  {name: 'Magneto',   canFly: false},
  {name: 'Tornado',   canFly: true}
];
