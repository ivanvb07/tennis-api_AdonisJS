import { HttpContext } from '@adonisjs/core/http';
import Player from '../models/player.ts' 

export default class PlayersController {
  //List of all players
  async index() {
    try{
      const players = await Player.all()
      return players
    } catch (error) {
      throw new Error('Error fetching players')
    }
  }

  //Add a player
  async store({ request, response }: HttpContext) {
    try{
      const data = request.only(['name', 'age', 'nationality', 'grand_slam_titles'])
      const player = await Player.create(data)
      return response.created(player)
    } catch (error) {
      return response.badRequest({ message: 'Error creating player' })
    }
  }

  //Infos about a player
  async show({ params, response }: HttpContext) {
    try{
      const player = await Player.find(params.id)
      return player
    } catch (error) {
     return response.notFound({ message: 'Player not found' })
    }
  }

  //Edit a player
  async update({ params, request, response }: HttpContext) {
    try{
      const player = await Player.findByOrFail(params.id)
      player.merge(request.only(['name', 'age', 'nationality', 'grand_slam_titles']))
      await player.save()
      return player
    } catch (error) {
      return response.notFound({ message: 'Player not found' })
    }
  }

  //Delete a player
  async destroy({ params, response }: HttpContext) {
    try{
      const player = await Player.findByOrFail(params.id)
      await player.delete()
      return response.noContent()
    } catch (error) {
      return response.notFound({ message: 'Player not found' })
    }
  }
}