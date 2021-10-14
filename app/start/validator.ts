import { validator } from '@ioc:Adonis/Core/Validator'

validator.rule('integer', (value, _, options) => {
  if (Number.isInteger(value)) {
    return
  }

  if (!Number.isInteger(value)) {
    options.errorReporter.report(
      options.pointer,
      'integer',
      'integer validation failed',
      options.arrayExpressionPointer
    )
  }
})


