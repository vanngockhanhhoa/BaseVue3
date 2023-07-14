import {
  Form as VeeForm,
  Field as VeeField,
  FieldArray as VeeFieldArray,
  ErrorMessage,
  defineRule,
  configure,
} from 'vee-validate'

import {
  alpha,
  alpha_spaces,
  digits,
  not_one_of,
  one_of,
  is_not,
  min_value,
  max_value,
  required,
  alpha_dash,
  between,
  dimensions,
  ext,
  integer,
  length,
  mimes,
  numeric,
  size,
  alpha_num,
  confirmed,
  email,
  image,
  is,
  max,
  min,
  regex,
  url,
} from '@vee-validate/rules'
import {formatDate, isEmptyArray, isNullOrUndefined, removeCommas} from "@/utils/functions";
import {DATE_FORMAT} from "@/config/consts";

export default {
  install(app) {
    const t = app.config.globalProperties.$t
    app.component('VeeForm', VeeForm)
    app.component('VeeField', VeeField)
    app.component('VeeFieldArray', VeeFieldArray)
    app.component('ErrorMessage', ErrorMessage)

    defineRule('alpha', alpha)
    defineRule('alpha_spaces', alpha_spaces)
    defineRule('digits', digits)
    defineRule('not_one_of', not_one_of)
    defineRule('one_of', one_of)
    defineRule('is_not', is_not)
    defineRule('min_value', min_value)
    defineRule('max_value', max_value)
    defineRule('required', required)
    defineRule('alpha_dash', alpha_dash)
    defineRule('between', between)
    defineRule('dimensions', dimensions)
    defineRule('ext', ext)
    defineRule('integer', integer)
    defineRule('length', length)
    defineRule('mimes', mimes)
    defineRule('numeric', numeric)
    defineRule('size', size)
    defineRule('alpha_num', alpha_num)
    defineRule('confirmed', confirmed)
    defineRule('email', email)
    defineRule('image', image)
    defineRule('is', is)
    defineRule('min', min)
    defineRule('max', max)
    defineRule('regex', regex)
    defineRule('url', url)

    defineRule('password_strength', (value) => {
      const rule = /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
      return value.match(rule) ? true : t(`validations.password_strength`)
    })

    defineRule('mobile_jp', (value, paramsMess) => {
      if (!value) {
        return true
      }
      let result = value.match(/^(\d|-)+$/)
      if (result && value.length !== result.input.length) {
        return t(`validations.format_tel`, paramsMess)
      }
      return result
        ? true
        : t(`validations.format_tel`, paramsMess)
    })


    defineRule('half_width_kana', (value, paramsMess) => {
      if (!value) {
        return true
      }
      return value.match(/^[ｦ-ﾝﾞﾟ|' ']+$/)
        ? true
        : t(`validations.format_half_width_kana`, paramsMess)
    })

    defineRule('validate_kana', (value, paramsMess) => {
      if (!value) {
        return true
      }
      return !value.match(/^[一-龥ぁ-ん]*$/)
        ? true
        : t(`validations.format_kana`, paramsMess)
    })

    defineRule('half_width_code', (value, paramsMess) => {
      if (!value) {
        return true
      }
      return value.match(/^[a-zA-Z0-9]*$/)
        ? true
        : t(`validations.wrong_format`, paramsMess)
    })

    defineRule('full_width_character', (value, paramsMess) => {
      if (!value) {
        return true
      }
      return value.match(/^[０-９ａ-ｚＡ-Ｚぁ-んァ-ン一-龥]*$/)
        ? true
        : t(`validations.format_full_width`, paramsMess)
    })

    defineRule('decimal', (value, params) => {
      if (!value) {
        return true
      }
      return value.match(/^\d[\d,]*(\.\d+)?$/)
        ? true
        : t('validations.numeric', params)
    })

    defineRule('postal_code', (value, paramsMess) => {
      if (!value) {
        return true
      }
      return value.match(/^\d{3}-\d{4}$/)
        ? true
        : t('validations.wrong_format', paramsMess)
    })

    defineRule('email', (value, paramsMess) => {
      if (!value) {
        return true
      }
      // eslint-disable-next-line
      let regex = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i)
      return regex.test(value) ? true : t('validations.wrong_format', paramsMess)
    })

    defineRule('password', (value, paramsMess) => {
      if (!value) {
        return true;
      }
      let regex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!""#$%&'()*+,-./:;<?@[\]^_`{|}~]).*$/);
      return regex.test(value) ? true : t('validations.password_format', paramsMess);
    });

    defineRule('correlation_date', (value, params) => {
      if (params[0] === 'undefined' || !value) {
        return true
      }
      const firstDate = new Date(value.toString());
      const secondDate = new Date(params[0]);

      const paramsMess = [t(params[2]), t(params[3])]

      if (params[1] === 'end' && firstDate.getTime() > secondDate.getTime()) {
        return t('validations.correlation_fields_MS03_005', paramsMess)
      }
      if (params[1] === 'start' && firstDate.getTime() < secondDate.getTime()) {
        return t('validations.correlation_fields_MS03_004', paramsMess)
      }
      return true
    })

    defineRule('correlation_transaction', (value, params) => {
      if (params[0] === 'undefined' || isNullOrUndefined(value)) {
        return true
      }

      const firstDate = new Date(value.toString());
      const secondDate = new Date(params[0]);
      if (params[1] === 'end' && firstDate.getTime() <= secondDate.getTime()) {
        return t('validations.correlation_transactions_MS03_040')
      }
      if (params[1] === 'start' && firstDate.getTime() >= secondDate.getTime()) {
        return t('validations.correlation_transactions_MS03_041')
      }
      return true
    })

    defineRule('correlation_transaction_purchase', (value, params) => {
      if (params[0] === 'undefined' || isNullOrUndefined(value)) {
        return true
      }

      const firstDate = new Date(value.toString());
      const secondDate = new Date(params[0]);
      if (params[1] === 'end' && firstDate.getTime() <= secondDate.getTime()) {
        return t('validations.correlation_transactions_MS03_040_purchase')
      }
      if (params[1] === 'start' && firstDate.getTime() >= secondDate.getTime()) {
        return t('validations.correlation_transactions_MS03_041')
      }
      return true
    })

    defineRule('gt_current_date', (value, params) => {
      if (isNullOrUndefined(value)) {
        return true
      }
      const currentDate = formatDate(new Date(), DATE_FORMAT)
      const currentDateTime = new Date(currentDate + ' 00:00:00').getTime()
      const date = new Date(value.toString() + ' 00:00:00').getTime();
      if (date < currentDateTime) {
        return t('validations.correlation_fields_MS03_004', params)
      }
      return true
    })

    defineRule('gte_current_date', (value, params) => {
      if (isNullOrUndefined(value)) {
        return true
      }
      const currentDate = formatDate(new Date(), DATE_FORMAT)
      const currentDateTime = new Date(currentDate + ' 00:00:00').getTime()
      const date = new Date(value.toString() + ' 00:00:00').getTime();
      if (date <= currentDateTime) {
        return t('validations.gte_current_date', params)
      }
      return true
    })

    defineRule('max_value', (value, params) => {
      if (isNullOrUndefined(value) || isEmptyArray(value)) {
        return true;
      }
      value = removeCommas(value)
      if (Number(value) > Number(params[1])) {
        return t('validations.max_value', params)
      }
      return true
    })

    defineRule('min_value', (value, params) => {
      if (isNullOrUndefined(value) || isEmptyArray(value)) {
        return true;
      }
      if (Number(value) < Number(params[1])) {
        return t('validations.min_value', params)
      }
      return true
    })

    defineRule('numeric', (value, params) => {
      if (isNullOrUndefined(value)) {
        return true;
      }
      value = removeCommas(value)
      if (!/^[0-9-]+$/.test(value)) {
        return t('validations.numeric', params)
      }
      return true
    })

    defineRule('integer', (value, params) => {
      if (isNullOrUndefined(value)) {
        return true;
      }
      value = removeCommas(value)
      if (!/^-?[0-9]+$/.test(value)) {
        return t('validations.integer', params)
      }
      return true
    })

    defineRule('less_than_quantity', (value, params) => {
      params[0] = removeCommas(params[0])
      params[1] = removeCommas(params[1])
      value = removeCommas(value)
      if (Number(params[0]) !== Number(value) + Number(params[1])) {
        return t('validations.MS03_107')
      }
      return true
    })

    defineRule('min_taken_maker_quantity', (value, params) => {
      params[1] = removeCommas(params[1])
      params[2] = removeCommas(params[2])
      value = removeCommas(value)
      let minMakerQuantity = Number(params[1]) - Number(params[2])
      if (Number(params[2]) < Number(params[1]) && Number(value) != minMakerQuantity) {
        let validateParams = [params[0], minMakerQuantity]
        return t('validations.min_value', validateParams)
      }
      return true
    })

    defineRule('less_than_date', (value, params) => {
      if (params[0] === 'undefined' || !value) {
        return true
      }
      const firstDate = new Date(value.toString());
      const secondDate = new Date(params[0]);

      const paramsMess = [t(params[1]), t(params[2])]

      if (firstDate.getTime() > secondDate.getTime()) {
        return t('validations.correlation_fields_MS03_005', paramsMess)
      }
      return true
    })

    defineRule('same_size', (value, params) => {
      if (!params[0] || !value) {
        return
      }
      if (params[0] === params[1]) {
        return t('validations.MS03_029')
      }
      return true
    })

    defineRule('same_item', (value, params) => {
      let currentIndex = params[0]
      params.splice(0,1);
      if (!value) {
        return
      }

      const toFindDuplicates = params => params.filter(
        (item, index) => params.indexOf(item) !== index
      )

      const duplicateArr = toFindDuplicates(params);
      const isExist = duplicateArr.find(element => element == params[currentIndex]);
      if (duplicateArr.length > 0 && isExist) {
        return t('messages.common.MS03_101')
      }

      return true
    })

    configure({
      generateMessage: (context) => {
        return t(`validations.${context.rule.name}`, context.rule.params.length === 0 ? [t(`${context.field}`)] : context.rule.params)
      },
    })
  },
}
