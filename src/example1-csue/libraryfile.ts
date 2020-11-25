import * as record from 'N/record' // Import Netsuites record module


// The interface the below setmemo function expects as input
interface setMemoOptions {
  id: string | number
  type: record.Type | string
  memoText: string
}

// Sets the Memo
function setMemo(opt: setMemoOptions): number {
  const r = record.load({
    id: opt.id,
    type: opt.type,
  }) // Record.Submitfields is better, but this is an example
  r.setValue({ fieldId: 'memo', value: opt.memoText })
  return r.save()
}

export { setMemoOptions, setMemo } // Export interface and function so that we can use it in other files
