import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Player from '../../app/models/player.ts'

export default class PlayerSeeder extends BaseSeeder {
  async run() {
    await Player.createMany([
      { name: 'Roger Federer', age: 42, nationality: 'Switzerland', grand_slam_titles: 20 },
      { name: 'Rafael Nadal', age: 37, nationality: 'Spain', grand_slam_titles: 22 },
      { name: 'Novak Djokovic', age: 36, nationality: 'Serbia', grand_slam_titles: 24 },
    ])
  }
}

