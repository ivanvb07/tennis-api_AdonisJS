import { test } from '@japa/runner'
import Player from '../../app/models/player.ts'

test.group('Player API', (group) => {
  //Makes sure that the table players is empty before each test
  group.each.setup(async() => {
    await Player.query().delete()
  })
  test('it should get all players', async ({ client }) => {
    //Makes sure that the table players is empty before each test
    await Player.query().delete()

    // Créer des joueurs pour tester
    await Player.create({
      name: 'Roger Federer',
      age: 43,
      nationality: 'Switzerland',
      grand_slam_titles: 20,
    })
    await Player.create({
      name: 'Rafael Nadal',
      age: 38,
      nationality: 'Spain',
      grand_slam_titles: 22,
    })

    // Envoi d'une requête GET vers l'API
    const response = await client.get('/players')

    // Vérification du statut et du corps de la réponse
    response.assertStatus(200)
    response.assertBodyContains([{"name":"Roger Federer"},
      {"name":"Rafael Nadal"}])
  })

  test('it should create a new player', async ({ client }) => {

    await Player.query().delete()

    const response = await client.post('/players').json({
        name: 'Novak Djokovic',
        age: 37,
        nationality: 'Serbia',
        grand_slam_titles: 24,
    })

    response.assertStatus(201)
    response.assertBodyContains({"name":"Novak Djokovic","age":37})
  })

  test('it should get a player by id', async ({ client }) => {

    await Player.query().delete()

    const rafa = await Player.create({
      name: 'Rafael Nadal',
      age: 38,
      nationality: 'Spain',
      grand_slam_titles: 22,
    })

    const response = await client.get(`/players/${rafa.id}`)

    response.assertStatus(200)
    response.assertBodyContains({"name":"Rafael Nadal","age":38})
  })

  test('it should update a player', async ({ client }) => {

    await Player.query().delete()
    
    const player = await Player.create({
      name: 'Carlos Alcaraz',
      age: 20,
      nationality: 'Spain',
      grand_slam_titles: 3,
    })

    const response = await client
      .put(`/players/${player.id}`)
      .json({
        name: 'Carlos Alcaraz',
        age: 21,
        nationality: 'Spain',
        grand_slam_titles: 4,
      })

    response.assertStatus(200)
    response.assertBodyContains({"name":"Carlos Alcaraz",
      "age":21})
  })

  test('it should delete a player', async ({ client }) => {
    const player = await Player.create({
      name: 'Jannik Sinner',
      age: 23,
      nationality: 'Italy',
      grand_slam_titles: 3,
    })

    console.log(player.id)
    const response = await client.delete(`/players/${player.id}`)

    response.assertStatus(204)
    response.assertBodyNotContains({"name":"Jannik Sinner","age":23})
  })
})