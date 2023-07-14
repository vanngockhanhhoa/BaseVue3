<template>
  <vee-field
    :id="id"
    :name="name"
    class="form-control text-right"
    type="text"
    v-model="model"
    :rules="rules"
    :label="label"
    :disabled="disabled"
    :maxLength="maxLength"
    :notNumber="notNumber"
    @keyup="$filters.inputNumber($event)"
    @keypress="$filters.inputNumber($event)"
    @focusout="onBlur(model)"
    @focusin="onFocus($event)"
    @change="onChange()"
  />
  <ErrorMessage :name="name"/>
</template>

<script>

export default {
  name: 'PriceInput',
  props: {
    modelValue: {
      type: undefined,
      default: null
    },
    id: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: null
    },
    rules: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    maxLength: {
      type: Number,
      default: null
    },
    notNumber: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    model: {
      get () {
        return this.modelValue
      },
      set (modelValue) {
        this.$emit('update:modelValue', modelValue)
      }
    }
  },
  methods: {
    onBlur(value) {
      if (this.notNumber) {
        this.model = this.$filters.convertCurrency(value, true)
      } else {
        this.model = this.$filters.convertCurrency(value)
      }
    },
    onFocus(event) {
      this.model = this.$filters.inputCurrency(event)
    },
    onChange() {
      this.$emit('onChange')
    },
  }
}
</script>

<style scoped>

</style>
