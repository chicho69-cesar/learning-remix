import { createThemeAction } from 'remix-themes'
import { themeSessionResolver } from '~/data/session.server'

export const action = createThemeAction(themeSessionResolver)
