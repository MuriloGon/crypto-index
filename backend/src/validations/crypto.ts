import joi from 'joi';

export const updateCurrenciesSchema = joi.object({
  currency: joi
      .valid('EUR', 'BRL', 'CAD')
      .required()
      .messages({'*': 'Moeda inválida'}),
  value: joi
      .number()
      .positive()
      .greater(0)
      .required()
      .messages({'*': 'Valor inválido'}),

});
