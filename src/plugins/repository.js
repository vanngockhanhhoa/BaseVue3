import App from '../App.vue'
import CreateRepository from '@/repositories/Repository'

export default (ctx) => {
  App.prototype.$repositories = new CreateRepository(ctx.axios)
}
