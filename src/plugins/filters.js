import dayjs, {unix} from 'dayjs'

import {DATETIME_FORMAT} from '@/config/datetime_format'
import {isNullOrUndefined} from "@/utils/functions";

export default {
  install: (app) => {

    app.config.globalProperties.$filters = {
      toCurrency(value, decimalCount = 0, decimal = ".", thousands = ",", notNumber = null) {
        try {
          decimalCount = Math.abs(decimalCount);
          decimalCount = isNaN(decimalCount) ? 0 : decimalCount;
          if (isNaN(value)) {
            return ''
          }
          if (notNumber == true) {
            value = value.replace('-', '');   // Get absolute value
            value = value.replace(/\b(0(?!\b))+/g, ""); // Remove 0 on the first
            value = value.slice(0, 18);       // Get first 18 characters
            let i = value;
            let j = (i.length > 3) ? i.length % 3 : 0;

            return (j ? i.substring(0, j) + thousands : '') + i.substring(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
            (decimalCount ? decimal + Math.abs(value - i).toFixed(decimalCount).slice(2) : "")
          } else {
            let i = parseInt(value = Math.abs(Number(value) || 0).toFixed(decimalCount)).toString();
            let j = (i.length > 3) ? i.length % 3 : 0;

            return (j ? i.substring(0, j) + thousands : '') + i.substring(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
            (decimalCount ? decimal + Math.abs(value - i).toFixed(decimalCount).slice(2) : "")
          }
        } catch (e) {
          console.log(e)
        }
      },
      quantityFormat(value) {
        if(value === 0) {
          return 0
        }
        if (isNullOrUndefined(value)) {
          return ''
        }
        return this.toCurrency(value, 0)
      },
      dateFormat(value, format = DATETIME_FORMAT.VIEW_FULL_DATE) {
        if (!value) {
          return ''
        }
        if (typeof value === 'number') {
          return unix(value).format(format)
        }
        return dayjs(value).format(format)
      },
      statusFormat(value) {
        switch (parseInt(value)) {
          case 0:
            return app.i18n.t('client.person.status.deactive')
          case 1:
            return app.i18n.t('client.person.status.active')
          default:
            return ''
        }
      },

      objectToStrfunction(data = []) {
        if (!data) {
          return ''
        }
        let str = ''
        const length = data.length
        for (let i = 0; i < length; i++) {
          str += data[i].name
          if (i + 1 < length) {
            str += ', '
          }
        }
        return str
      },

      dateFormatOfClient(value, format = DATETIME_FORMAT.VIEW_DATE_TIME_CUSTOM) {
        if (!value) {
          return value
        }
        return dayjs(new Date(`${value} UTC`).toString()).format(format)
      },

      genderFormat(value) {
        switch (parseInt(value)) {
          case 0:
            return app.i18n.t('client.person.male')
          case 1:
            return app.i18n.t('client.person.female')
          default:
            return app.i18n.t('client.person.unknown')
        }
      },

      post_code(code) {
        if (String(code).length <= 0) {
          return code
        }
        return String(code).substr(0, 3) + '-' + String(code).substr(3, 7)
      },

      aws_photo(path) {
        if (!path || path.includes(process.env.AWS_S3_URL)) {
          return path
        }
        return process.env.AWS_S3_URL + '/' + path
      },

      /**
       * Handle the input is number
       *
       * @param event
       * @returns void
       */
      inputNumber(event) {
        let keyValue = event.key
        // When event is key up in mobile, can't roll back event
        if (keyValue === 'Unidentified') {
          keyValue = event.target.value
          if (!keyValue) {
            return
          }
          const inputValue = event.target.value;
          const sanitizedValue = inputValue.replace(/[^0-9]/g, '');
          event.target.value = sanitizedValue;
        } else { // When event is key press in PC
          if (!keyValue) {
            return
          }
          if (!/^\d+$/.test(keyValue)) {
            event.preventDefault();
          }
        }
      },

      /**
       * Input of phone number & postal code
       *
       * @param event
       * @returns void
       */
      inputPhoneNumber(event) {
        let keyValue = event.key
        if (!keyValue) {
          return
        }
        if (!/^\d|-+$/.test(keyValue)) {
          event.preventDefault();
        }
      },

      changeValueNullToBlank: (value) => {
        return value === null ? '' : value
      },

      /**
       * Handle the input is currency
       *
       * @returns string
       * @param event
       */
      inputCurrency(event) {
        const value = event.target.value
        if (isNullOrUndefined(value)) {
          return ''
        }
        return value.toString().replace(/,/g, '');
      },

      /**
       * Handle the input is currency
       *
       * @returns string
       * @param value
       */
      convertCurrency(value, notNumber = null) {
        if (isNullOrUndefined(value)) {
          return ''
        }
        value = value.toString().replace(/,/g, '')
        if (isNaN(Number(value))) {
          return value
        }
        if (notNumber == true) {
          return this.toCurrency(value, 0, ".", ",", true);
        } else {
          return this.toCurrency(Number(value));
        }
      },

      // for dirty check
      setNullValue(newEntry, keys = ['remarks']){
        return setNullValue(newEntry, keys)
      },

      // convert string to use in url
      convertStringToUrl(str) {
        if (!str) {
          return ''
        }
        return encodeURIComponent(str)
      }
    } // end arr filters

  }
}

const setNullValue = (newEntry, keys) => {
  for (let key in newEntry) {
    if(typeof newEntry[key] === 'object' && newEntry[key] !== null){
      newEntry[key] = setNullValue(newEntry[key], keys)
    }else{
      if (keys.includes(key) && newEntry[key] === '') {
        newEntry[key] = null
      }
    }
  }
  return newEntry
}
