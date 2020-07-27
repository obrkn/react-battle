export const SETTING = 'SETTING'

export const START = 'START'
export const HERO_ATTACK = 'HERO_ATTACK'
export const ENEMY_ATTACK = 'ENEMY_ATTACK'

export const setting = text => ({
  type: SETTING,
  text: text
})

export const start = () => ({
  type: START
})

export const hero_attack = () => ({
  type: HERO_ATTACK
})

export const enemy_attack = () => ({
  type: ENEMY_ATTACK
})