import { EntryPoints } from 'N/types' // Contains the context for the Netsuite functions
import { setMemo, setMemoOptions } from './libraryfile' // Import only function and interface from library file, Preferable
import * as log from 'N/log' // Import netsuites log module
import { Type } from '@hitc/netsuite-types/N/record'

function beforeSubmit(ctx: EntryPoints.UserEvent.beforeSubmitContext) {
  if (ctx.type === ctx.UserEventType.EDIT) {
    const id = ctx.newRecord.getValue({
      fieldId: 'custpage_anotherrecordreference',
    }) as number
    setMemo({
      type: Type.VENDOR_BILL,
      id: id,
      memoText: 'Memo has been updated!',
    })
    log.debug({ title: 'Memo has been updated', details: 'Memo was updated' }) // Just a regular debug call to NetSuite
  }
}

export { beforeSubmit } // Because we use the correct netsuite name for the function we don't need to rename in export
