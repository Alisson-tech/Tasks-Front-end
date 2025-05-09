// plugins/vuetify.ts (ou onde você cria o Vuetify)

import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'customLight',
    themes: {
      customLight: {
        dark: false,
        colors: {
          background:'#E3F2FD',
          primary: '#0044d0',    
          secondary: '#ff9800',   
          accent: '#e91e63',       
          error: '#f44336',
          info: '#2196f3',
          success: '#4caf50',
          warning: '#ffc107',
          surface: '#ffffff',
          card: '#ffffff'
        },
      },
    },
  },
})

export default vuetify
