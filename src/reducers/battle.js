import { ATTACK, NEXT } from '../actions';

const initialState = {
  hero: {
    vitality: 100,
    attack: [10, 10, 20, 30, 40, 30]
  },
  enemy: {
    vitality: 100,
    attack: [10, 10, 20, 30, 30, 40]
  }
}

export default (state = initialState, action ) => {
  switch (action.type){
    case ATTACK:
      return {
        hero: {
          vitality: state.hero.vitality,
          attack: [10, 10, 20, 30, 40, 30]
        },
        enemy: {
          vitality: state.enemy.vitality - 10,
          attack: [10, 10, 20, 30, 30, 40]
        }
      };
    case NEXT:
      return {
        hero: {
          vitality: state.hero.vitality - 10,
          attack: [10, 10, 20, 30, 40, 30]
        },
        enemy: {
          vitality: state.enemy.vitality,
          attack: [10, 10, 20, 30, 30, 40]
        }
      };
    default:
      return state;
  }
}