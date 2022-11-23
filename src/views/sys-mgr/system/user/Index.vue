<template>
  <div class="page">
    <user-table></user-table>
  </div>
</template>

<script>
import UserTable from '@/views/sys-mgr/components/UserTable';

export default {
  name: 'UserMgr',
  components: {
    UserTable,
  },
};
</script>
