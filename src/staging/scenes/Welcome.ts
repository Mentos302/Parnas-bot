const Scene = require('telegraf/scenes/base')
import controller from '../../controllers/welcome-controller'

export default (() => {
  const scene = new Scene('welcome')

  scene.enter(controller.greeting)

  // scene.on('message', controller.resAge)

  return scene
})()
