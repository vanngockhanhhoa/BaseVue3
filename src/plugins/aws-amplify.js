import Vue from 'vue'

// eslint-disable-next-line import/no-named-as-default
import Amplify, * as AmplifyModules from 'aws-amplify'
import { AmplifyPlugin } from 'aws-amplify-vue'
import awsconfig from '@/config/aws-exports'

Amplify.configure({
  ...awsconfig,
  Analytics: {
    disabled: true
  }
})
Vue.use(AmplifyPlugin, AmplifyModules)
