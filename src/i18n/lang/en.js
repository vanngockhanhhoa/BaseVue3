const en = {
  admins: {
    title_list: 'Account List',
    title_create: 'Account Create',
    title_update: 'Account Edit',
    role: 'Role',
    name: 'Name',
    email: 'Email',
    status: 'Status',
    search: 'Search',
  },

  hotels: {
    title_list: 'Hotel List',
    title_create: 'Create Hotel',
    title_update: 'Edit Hotel',
    hotel_name: 'Hotel name',
    name: 'Name',
    plan: 'Plan',
    rate: 'Rate',
    start_date: 'Start date',
    address: 'Address',
    postal_code: 'Postal code',
    phone: 'Phone',
    fax: 'FAX',
    dotw_id: 'DOTW ID',
    dotw_pw: 'DOTW PW',
    tl_lincoln_id: 'TL Lincoln ID',
    tl_lincoln_pw: 'TL Lincoln PW',
    dotw_hotel_id: 'DOTW Hotel code',
    dotw_chain_id: 'DOTW Chain code',
    contact_name: 'Contact name',
    contact_email: 'Contact email',
    contact_phone: 'Contact phone',
    alert_email: 'Alert email',
    tool_login_email: 'Tool login email',
    tool_login_pw: 'Tool login PW',
  },

  login: {
    email: 'Email',
    password: 'Password',
    new_password: 'New password',
    new_password_confirmation: 'Confirm new password',
  },

  auth: {
    login: 'LOGIN',
    forgot_password: 'Forgot your password?',
    remember_me: 'Remember me?',
    request_password: 'Reset Password',
    guide_reset_password: 'Enter your Email address. We will send you a link to reset password.',
    reset_password: 'Reset password',
    send_mail: 'Send mail',
    back_to_login: 'Back to login',
    go_to_login: 'Go to login',
    update_password: 'Change Password',
    request_mail_sent: `Password reset request was sent succcessfully, please check your email to reset your password.`,
  },

  transmission: {
    title_list: 'Transmission Log',
    period: 'Execution Date From～To',
    process: 'Process',
    hotel: 'Hotel',
    status: 'Status',
    endpoint: 'Endpoint',
    method: 'Method',
    start_time: 'Start time',
    end_time: 'End time',
    result: 'Result',
    process_options: {
      from_tll: 'From TL-Lincoln',
      from_rs: 'From relay system',
    },
    endpoint_options: {
      update_rate: 'Update rate',
      plan_master: 'Plan master',
    },
    status_options: {
      not_done: 'Not done',
      in_progress: 'In progress',
      completed: 'Completed',
      error: 'Error',
    },
    method_options: {
      get: 'Get',
      post: 'Post',
      put: 'Put',
      delete: 'Delete',
      patch: 'Patch'
    },
  },
}

en.messages = {
  auth: {
    //MS04-001
    login_success: 'Logged in successfully.',
    login_failed: 'Login failed',
  },
}

en.menu = {
  dashboard: 'Dashboard',
  hotel_create: 'Hotel Create',
  account_setting: 'Account Setting',
  account_add_new: 'Add New Account',
  block_account: "Account",
  account_management: "Accounts",
  account_list: "Account List",
  account_add: "Add Account",
  hotel_management: "Hotels",
  hotel_list: "Hotel List",
  hotel_add: "Add Hotel",
  transmission_management: "Transmission Logs",
  logout: 'Log Out',
}

// Validations text
en.validations = {
  required: '{0} is required.',
  min: '{1} must be more than {0} characters.',
  password: 'The password must be between 8 and 255 characters in length.',
  confirmed: '{1} must be the same as the one entered in {2}.',
  wrong_format: 'Invalid {0} format. Please try again.',
  password_format: 'Please include at least three of the following: uppercase letters, lowercase letters, numbers, and symbols (!""#$%&\'()*+,-./:;<=>?@[]^_`{|}~)', // wrong format password
}

en.fields = {
  valid: 'Valid',
  in_valid: 'Invalid',
}

// Common text for screens
en.buttons = {
  save: 'Save',
  search: 'Search',
  reset: 'Reset',
  cancel: 'Cancel',
  create: 'Create',
  update: 'Update',
  send_email: 'Send Mail',
  no: 'No',
  yes: 'Yes',
  confirm: 'Confirm',
  plan_info: 'Plan list',
  rate_info: 'Rate info',
}

// Common text for screens
en.common = {
  id: 'ID',
  action: 'Action',
  account_view: {
    title: 'Account Setting',
    email_search: 'Email/Name',
    account_id: 'Account ID',
    account_name: 'Name',
    account_email: 'Mail address',
    account_status: 'Status',
    edit: 'Edit',
    action: 'Action',
    Resend_Login_Url: 'Resend login URL'
  },
  modal_check_info: {
    title: 'Back to list',
    body: 'You want to go back to the list screen ?',
  },
  no_data: 'No data found',
  label_perpage: 'Page',
  label_column_no: 'No.',
}

// modal
en.modals = {
  logout_modal: {
    title: 'Logout Confirm',
    content: 'Are you sure ?',
  },
  popup: {
    delete_title: 'Delete',
    text_delete: 'You want to delete it'
  }
}

export default en
