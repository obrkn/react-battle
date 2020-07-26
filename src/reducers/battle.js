import { START, HERO_ATTACK, ENEMY_ATTACK } from '../actions';

const initialState = {
  scene: 0, // 0:戦闘開始, 1:主人公のターン, 2:相手のターン, 3:勝利, 4:敗北
  dice: 1,
  hero: {
    name: '主人公',
    vitality: 100,
    move: ['技A', '技B', '技C', '技D', '技E', '技F'],
    attack: [10, 10, 20, 30, 40, 30]
  },
  enemy: {
    name: '相手',
    vitality: 100,
    move: ['技A', '技B', '技C', '技D', '技E', '技F'],
    attack: [10, 10, 20, 30, 30, 40]
  },
  log: [],
}

export default (state = initialState, action ) => {
  switch (action.type){
    case START:
      return start(state);
    case HERO_ATTACK:
      return heroAttack(state);
    case ENEMY_ATTACK:
      return enemyAttack(state);
    default:
      return state;
  }
};

// レデュースアクション
function start(state){
  let log = state.log;
  log.unshift('戦闘開始！');
  return {
    scene: 1,
    dice: state.dice,
    hero: state.hero,
    enemy: state.enemy,
    log: log,
  };
};

function heroAttack(state){
  let dice = Math.floor(Math.random() * state.hero.attack.length);
  let vitality = state.enemy.vitality > state.hero.attack[dice] ? state.hero.vitality - state.hero.attack[dice] : 0;
  let scene = vitality === 0 ? 3 : 2
  let log = state.log;
  log.unshift(state.hero.name + 'の' + state.hero.move[dice] + '！ ' + state.enemy.name + 'へ' + state.hero.attack[dice] + 'のダメージ！');
  return {
    scene: scene,
    dice: dice,
    hero: state.hero,
    enemy: {
      name: state.enemy.name,
      vitality: vitality,
      move: state.enemy.move,
      attack: state.enemy.attack
    },
    log: log
  };
};

function enemyAttack(state){
  let dice = Math.floor(Math.random() * state.enemy.attack.length);
  let vitality = state.hero.vitality > state.enemy.attack[dice] ? state.hero.vitality - state.enemy.attack[dice] : 0;
  let scene = vitality === 0 ? 4 : 1;
  let log = state.log;
  log.unshift(state.enemy.name + 'の' + state.enemy.move[dice] + '！ ' + state.hero.name + 'へ' + state.enemy.attack[dice] + 'のダメージ！');

  return {
    scene: scene,
    dice: state.dice,
    hero: {
      name: state.hero.name,
      vitality: vitality,
      move: state.hero.move,
      attack: state.hero.attack
    },
    enemy: state.enemy,
    log: log
  };
};