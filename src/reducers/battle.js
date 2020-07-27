import { SETTING, START, HERO_ATTACK, ENEMY_ATTACK } from '../actions';

const initialState = {
  scene: 0, // 0:戦闘開始, 1:主人公のターン, 2:相手のターン, 3:勝利, 4:敗北
  dice: 1,
  hero: {
    name: '主人公',
    vitality: 100,
    attack: [['技A', 10], ['技B', 10], ['技C', 20], ['技D', 30], ['技E', 40], ['技F', 30]],
  },
  enemy: {
    name: '相手',
    vitality: 100,
    attack: [['技A', 10], ['技B', 10], ['技C', 20], ['技D', 30], ['技E', 40], ['技F', 30]],
  },
  log: [],
}

export default (state = initialState, action ) => {
  switch (action.type){
    case SETTING:
      return setting(state, action);
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
function setting(state, action){
  console.log(action);
  return {
    scene: state.scene,
    dice: state.dice,
    hero: {
      name: state.hero.name,
      vitality: state.hero.vitality,
      attack: action.text
    },
    enemy: state.enemy,
    log: state.log,
  };
}

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
  let vitality = state.enemy.vitality > state.hero.attack[dice][1] ? state.enemy.vitality - state.hero.attack[dice][1] : 0;
  let scene = vitality === 0 ? 3 : 2
  let log = state.log;
  log.unshift(state.hero.name + 'の' + state.hero.attack[dice][1] + '！ ' + state.enemy.name + 'へ' + state.hero.attack[dice][1] + 'のダメージ！');
  if (scene === 3){
    log.unshift(state.enemy.name + 'を倒した！')
  }
  return {
    scene: scene,
    dice: dice,
    hero: state.hero,
    enemy: {
      name: state.enemy.name,
      vitality: vitality,
      attack: state.enemy.attack
    },
    log: log
  };
};

function enemyAttack(state){
  let dice = Math.floor(Math.random() * state.enemy.attack.length);
  let vitality = state.hero.vitality > state.enemy.attack[dice][1] ? state.hero.vitality - state.enemy.attack[dice][1] : 0;
  let scene = vitality === 0 ? 4 : 1;
  let log = state.log;
  log.unshift(state.enemy.name + 'の' + state.enemy.attack[dice][1] + '！ ' + state.hero.name + 'へ' + state.enemy.attack[dice][1] + 'のダメージ！');
  if (scene === 4){
    log.unshift(state.hero.name + 'は倒された。。。')
  }
  return {
    scene: scene,
    dice: state.dice,
    hero: {
      name: state.hero.name,
      vitality: vitality,
      attack: state.hero.attack
    },
    enemy: state.enemy,
    log: log
  };
};