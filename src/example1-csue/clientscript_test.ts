import * as setmemolib from './libraryfile' // Import the whole library file, better to use pattern in userevent but this works
import { Type } from 'N/record'
import { EntryPoints } from 'N/types'

function main(ctx: EntryPoints.Client.pageInitContext) {
  setmemolib.setMemo({
    id: 1,
    type: Type.VENDOR_BILL,
    memoText: 'an updated memo',
  })
}

export { main as pageInit } // We export main as pageInit function in the clientScript
