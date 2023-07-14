<template>
  <CRow class="mb-3" v-if="hidden">
    <CCol
      :lg="3"
      :xs="xs"
    >
      <label class="form-label">{{ $t(label) }}<span class="required" v-if="required">*</span></label>
    </CCol>
    <CCol
      :lg="9"
      :xs="xs"
    >
      <!--    Input Normal-->
      <vee-field
        v-if="inputType === 'normal'"
        :id="id"
        :name="name"
        :class="'form-control ' + classField"
        :type="type"
        :maxlength="maxlength"
        :rules="rules"
        :label="label"
        :disabled="disabled"
        :placeholder="placeholder"
        v-model="model"
      />

      <!--    Input number-->
      <vee-field
        v-if="inputType === 'number'"
        :id="id"
        :name="name"
        :class="'form-control ' + classField"
        :type="type"
        :maxlength="maxlength"
        :rules="rules"
        :label="label"
        :disabled="disabled"
        :placeholder="placeholder"
        v-model="model"
        @keypress="$filters.inputNumber($event)"
        @keyup="$filters.inputNumber($event)"
      />

      <!--    Input Price/Decimal-->
      <CRow>
        <CCol>
          <vee-field
            v-if="inputType === 'price'"
            :id="id"
            :name="name"
            :class="'form-control price-field ' + classField"
            :type="type"
            :maxlength="maxlength"
            :rules="rules"
            :label="label"
            :disabled="disabled"
            :placeholder="placeholder"
            v-model="model"
          />
        </CCol>
        <CCol v-if="inputType === 'price'" style="flex-grow: 0;">
          <span>{{ $t(labelCurrency) }}</span>
        </CCol>
      </CRow>


      <!--    Input Phone Number-->
      <vee-field
        v-if="inputType === 'tel'"
        :id="id"
        :name="name"
        :class="'form-control ' + classField"
        type="text"
        :maxlength="14"
        :rules="required ? 'required|mobile_jp:' + $t(label) : 'mobile_jp:' + $t(label)"
        :label="label"
        :disabled="disabled"
        :placeholder="placeholder"
        v-model="model"
        @keypress="$filters.inputPhoneNumber($event)"
      />

      <!--    Input Postal Code-->
      <vee-field
        v-if="inputType === 'postalCode'"
        :id="id"
        :name="name"
        :class="'form-control ' + classField"
        type="text"
        :maxlength="8"
        :rules="'required|postal_code:' + $t(label) + ',000-0000'"
        :label="label"
        :disabled="disabled"
        :placeholder="placeholder"
        v-model="model"
        v-cleave="{ delimiter: '-', blocks: [3, 4] }"
        @keypress="$filters.inputPhoneNumber($event)"
      />

      <!--    Input Modal-->
      <CInputGroup v-if="inputType === 'modal'">
        <vee-field
          :id="id"
          :name="name"
          :class="'form-control ' + classField"
          :type="type"
          :maxlength="maxlength"
          :rules="rules"
          :label="label"
          :placeholder="placeholder"
          v-model="model"
          disabled
        />
        <CButton type="button" color="primary" variant="outline" id="button-addon2" class="btn-modal" :ref="id"
                 :disabled="disabled"
                 @click="openModal">
          <CIcon icon="cilSearch"/>
        </CButton>
      </CInputGroup>

      <!--    Input Dropdown-->
      <vee-field
        v-if="inputType === 'dropdown'"
        as="select"
        :id="id"
        :name="name"
        :class="'form-select ' + classField"
        :maxlength="maxlength"
        :rules="rules"
        :label="label"
        :disabled="disabled"
        :placeholder="placeholder"
        v-model="model"
        :ref="id"
      >
        <option
          v-for="item in dataOptions"
          :label="item.label"
          :key="item.value"
          :value="item.value"
        >
          {{ item.value }}
        </option>
      </vee-field>

      <!--    Text Area-->
      <vee-field
        v-if="inputType === 'textarea'"
        as="textarea"
        rows="4"
        :id="id"
        :name="name"
        :class="'form-control' + classField"
        :maxlength="maxlength"
        :rules="rules"
        :label="label"
        :disabled="disabled"
        :placeholder="placeholder"
        v-model="model"
      />

      <!--    Radio Button Field-->
      <div class="d-flex" v-if="inputType === 'radioButton'">
        <div v-for="(item, index) in listItemRadio" :key="index" class="mr-50">
          <input
            :name="name + index"
            class="form-check-input mr-10"
            :id="item.name"
            type="radio"
            :value="item.value"
            v-model="model"
            :checked="item.checked"
          />
          <label class="form_label form-check-label" :for="item.name + index">
            {{ item.label }}
          </label>
        </div>
      </div>
      <ErrorMessage :name="name"/>
    </CCol>
  </CRow>
</template>
<script>

export default {
  name: 'InputField',
  props: {
    id: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    classField: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    maxlength: {
      type: Number,
      default: null,
    },
    required: {
      type: Boolean,
      default: false,
    },
    firstFocus: {
      type: Boolean,
      default: false,
    },
    hidden: {
      type: Boolean,
      default: true,
    },
    type: {
      type: String,
      default: 'text'
    },
    rules: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: null
    },
    value: {
      type: [Number, String],
      default: null
    },
    lg: {
      type: Number,
      default: 12
    },
    xs: {
      type: Number,
      default: 12
    },
    inputType: {
      type: String,
      default: 'normal'
    },
    labelCurrency: {
      type: String,
      default: 'common.currency'
    },
    dataOptions: {
      type: Array,
      default: null
    },
    listItemRadio: {
      type: Array,
      default: null
    },
  },
  computed: {
    model: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('update:modelValue', value)
      }
    }
  },

  methods: {
    openModal() {
      this.$emit('openModal')
    },
  },

  mounted() {
    if (this.firstFocus) {
      if (this.inputType === 'radioButton') {
        document.getElementById(this.listItemRadio[0].name).focus()
      } else {
        this.$refs[this.id].$el.focus();
      }
    }
  }
}
</script>
