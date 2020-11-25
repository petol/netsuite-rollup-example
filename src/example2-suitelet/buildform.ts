import * as ui from 'N/ui/serverWidget'

interface createFormOptions {
  name: string
}

function buildForm(opt: createFormOptions): ui.Form {
  const f = ui.createForm({ title: 'Hello', hideNavBar: false })
  const nf = f.addField({
    id: 'custpage_field',
    label: 'Sample Field',
    type: ui.FieldType.TEXT,
  })
  nf.defaultValue = `Hello ${opt.name}!`
  nf.updateDisplayType({ displayType: ui.FieldDisplayType.INLINE })
  return f
}

export { buildForm }
