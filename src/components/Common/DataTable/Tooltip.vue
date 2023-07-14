<template>
  <CTooltip
    :content="text"
    placement="top"
  >
    <template #toggler="{ on }">
      <div :class="multipleLineEllipsis ? 'block-ellipsis' : 'truncate'" v-on="on">
        {{ text }}
      </div>
    </template>
  </CTooltip>
</template>
<script>
export default {
  name: 'DatatableTooltip',
  props: {
    text: {
      type: String,
      default: '',
    },
    multipleLineEllipsis: {
      type: Boolean,
      default: false
    }
  },
}
</script>

<style lang="scss" scoped>

.truncate {
  white-space: pre;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 21px;
}
</style>
