<template>
<div class="page">
  <p>【Date.now() - 60000 * 5】: {{ (Date.now() - 60000 * 5) | foretime }}</p>
  <p>【Date.now() - 60000 * 60 * 3】: {{ (Date.now() - 60000 * 60 * 3) | foretime }}</p>
  <p>【Date.now() - 60000 * 60 * 24 * 2】: {{ (Date.now() - 60000 * 60 * 24 * 2) | foretime }}</p>
  <p>【Date.now()】：{{ Date.now() | dateFormat }}</p>
  <p>【Date.now()】：{{ Date.now() | dateFormat('HH:mm') }}</p>
  <p>【123456】：{{ 123456 | numberFormat }}</p>
  <p>【123456】：{{ 123456 | numberFormat({ average: true }) }}</p>
</div>
</template>

<script>
export default {
  name: 'Utils',
};
</script>
