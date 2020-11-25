import { EntryPoints } from 'N/types'
import * as https from 'N/https'
import { buildForm } from './buildform'

function onRequest(ctx: EntryPoints.Suitelet.onRequestContext) {
  if (ctx.request.method === https.Method.GET) {
    const name = ctx.request.parameters.name || 'Person'
    const form = buildForm({ name })
    ctx.response.writePage(form)
  } else {
    throw 'Method Not Yet Implemented'
  }
}

export {onRequest}