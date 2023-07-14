<template>
  <div style="text-align: center">
    <slot name="message">
      <h1>
        Comming soon
      </h1>
    </slot>
    <slot name="navigation">
      <ul id="formControl">
        <li class="wd20">
          <button class="grayBtn" @click="$router.push('/')">
            <span class="material-icons">arrow_back_ios</span>HOME
          </button>
        </li>
      </ul>
    </slot>
  </div>
</template>
<script>
export default {
  name: 'DefaultError',
}
</script>
