import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Player extends BaseModel {
  @column({ isPrimary: true })
  public id!: number

  @column()
  public name!: string

  @column()
  public age!: number

  @column()
  public nationality!: string

  @column()
  public grand_slam_titles!: number
}