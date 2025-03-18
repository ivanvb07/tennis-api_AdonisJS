/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import PlayersController from '../app/controllers/players_controller.js'
import AutoSwagger from "adonis-autoswagger";
import swagger from "#config/swagger";

// Routes for the players
router.get('/players', [PlayersController, 'index'])
router.post('/players', [PlayersController, 'store'])
router.get('/players/:id', [PlayersController, 'show'])
router.put('/players/:id', [PlayersController, 'update'])
router.delete('/players/:id', [PlayersController, 'destroy'])

//Routes for swagger
router.get("/swagger", async () => {
    return AutoSwagger.default.docs(router.toJSON(), swagger);
  });
// Renders Swagger-UI and passes YAML-output of /swagger
router.get("/docs", async () => {
    return AutoSwagger.default.ui("/swagger", swagger);
    // return AutoSwagger.default.scalar("/swagger"); to use Scalar instead
    // return AutoSwagger.default.rapidoc("/swagger", "view"); to use RapiDoc instead (pass "view" default, or "read" to change the render-style)
  });