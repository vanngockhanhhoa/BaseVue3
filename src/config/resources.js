import dayjs from 'dayjs'

export function selectDays () {
  const days = [{
    value: 0,
    text: '日'
  }]
  for (let i = 1; i <= 31; i++) {
    days.push({
      value: i,
      text: i + '日'
    })
  }
  return days
}

export function selectMonths () {
  const months = [{
    value: 0,
    text: '月'
  }]
  for (let i = 1; i <= 12; i++) {
    months.push({
      value: i,
      text: i + '月'
    })
  }
  return months
}

export function selectYears () {
  const years = [{
    value: 0,
    text: '年'
  }]
  for (let i = dayjs().year(); i >= dayjs().subtract(100, 'year').year(); i--) {
    years.push({
      value: i,
      text: i + '年'
    })
  }
  return years
}

export const SELECT_ADDRESS = [
  { value: '都道府県', text: '都道府県' },
  { value: '北海道', text: '北海道' },
  { value: '青森県', text: '青森県' },
  { value: '岩手県', text: '岩手県' },
  { value: '宮城県', text: '宮城県' },
  { value: '秋田県', text: '秋田県' },
  { value: '山形県', text: '山形県' },
  { value: '福島県', text: '福島県' },
  { value: '茨城県', text: '茨城県' },
  { value: '栃木県', text: '栃木県' },
  { value: '群馬県', text: '群馬県' },
  { value: '埼玉県', text: '埼玉県' },
  { value: '千葉県', text: '千葉県' },
  { value: '東京都', text: '東京都' },
  { value: '神奈川県', text: '神奈川県' },
  { value: '新潟県', text: '新潟県' },
  { value: '富山県', text: '富山県' },
  { value: '石川県', text: '石川県' },
  { value: '福井県', text: '福井県' },
  { value: '山梨県', text: '山梨県' },
  { value: '長野県', text: '長野県' },
  { value: '岐阜県', text: '岐阜県' },
  { value: '静岡県', text: '静岡県' },
  { value: '愛知県', text: '愛知県' },
  { value: '三重県', text: '三重県' },
  { value: '滋賀県', text: '滋賀県' },
  { value: '京都府', text: '京都府' },
  { value: '大阪府', text: '大阪府' },
  { value: '兵庫県', text: '兵庫県' },
  { value: '奈良県', text: '奈良県' },
  { value: '和歌山県', text: '和歌山県' },
  { value: '鳥取県', text: '鳥取県' },
  { value: '島根県', text: '島根県' },
  { value: '岡山県', text: '岡山県' },
  { value: '広島県', text: '広島県' },
  { value: '山口県', text: '山口県' },
  { value: '徳島県', text: '徳島県' },
  { value: '香川県', text: '香川県' },
  { value: '愛媛県', text: '愛媛県' },
  { value: '高知県', text: '高知県' },
  { value: '福岡県', text: '福岡県' },
  { value: '佐賀県', text: '佐賀県' },
  { value: '長崎県', text: '長崎県' },
  { value: '熊本県', text: '熊本県' },
  { value: '大分県', text: '大分県' },
  { value: '宮崎県', text: '宮崎県' },
  { value: '鹿児島県', text: '鹿児島県' },
  { value: '沖縄県', text: '沖縄県' }
]

export const TAX_OPTIONS = {
  '': '内税',
  10: '課税10%',
  8: '軽減8%',
  0: '対象外'
}


export const NUMBER_OF_DISPLAY = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4 }

// end for screen settings/form
// begin for screen system-provider
export const ACCOUNT_TYPES = [
  { value: 1, text: '普通' },
  { value: 2, text: '当座' }
]

export const INVOICE_DATES = [
  { value: '', text: '---' },
  { value: 1, text: '1日' },
  { value: 2, text: '2日' },
  { value: 3, text: '3日' },
  { value: 4, text: '4日' },
  { value: 5, text: '5日' },
  { value: 6, text: '6日' },
  { value: 7, text: '7日' },
  { value: 8, text: '8日' },
  { value: 9, text: '9日' },
  { value: 10, text: '10日' },
  { value: 11, text: '11日' },
  { value: 12, text: '12日' },
  { value: 13, text: '13日' },
  { value: 14, text: '14日' },
  { value: 15, text: '15日' },
  { value: 16, text: '16日' },
  { value: 17, text: '17日' },
  { value: 18, text: '18日' },
  { value: 19, text: '19日' },
  { value: 20, text: '20日' },
  { value: 21, text: '21日' },
  { value: 22, text: '22日' },
  { value: 23, text: '23日' },
  { value: 24, text: '24日' },
  { value: 25, text: '25日' },
  { value: 26, text: '26日' },
  { value: 27, text: '27日' },
  { value: 28, text: '28日' },
  { value: 29, text: '29日' },
  { value: 30, text: '30日' },
  { value: 31, text: '31日' },
  { value: 32, text: '月末' }
]

export const ORDER_STATUS = [
  { value: '', text: 'すべて' },
  { value: '1', text: '有効' },
  { value: '0', text: '無効' }
]

export const STATUS = {
  ACTIVE: '1',
  DEACTIVE: '0'
}