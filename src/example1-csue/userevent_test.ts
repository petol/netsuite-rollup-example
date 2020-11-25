import { EntryPoints } from 'N/types' // Contains the context for the Netsuite functions
import * as hw from './libraryfile' // Import only function and interface from library file, Preferable
import * as log from 'N/log' // Import netsuites log module
import { Type } from 'N/record'

function setMemo() {
    return 'asd'
}

function beforeSubmit(ctx: EntryPoints.UserEvent.beforeSubmitContext) {
  if (ctx.type === ctx.UserEventType.EDIT) {
    const id = ctx.newRecord.getValue({
      fieldId: 'custpage_anotherrecordreference',
    }) as number
    const b = setMemo()
    console.log(b)
    hw.setMemo({
      type: Type.VENDOR_BILL,
      id: id,
      memoText: 'Memo has been updated!',
    })
    log.debug({ title: 'Memo has been updated', details: 'Memo was updated' }) // Just a regular debug call to NetSuite
  }
}

export { beforeSubmit } // Because we use the correct netsuite name for the function we don't need to rename in export
