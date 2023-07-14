import Vue from 'vue'
import CognitoService from '~/services/CognitoService'
import ChatService from '~/services/ChatService'

export default function ({ app }) {
  Vue.prototype.$cognito = CognitoService
  Vue.prototype.$chat = new ChatService(app)
}
