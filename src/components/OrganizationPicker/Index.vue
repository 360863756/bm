<template>
<div class="c-organization-picker">
  <el-scrollbar
    class="c-organization-picker-scrollbar"
    wrap-class="c-organization-picker-scrollbar__wrap"
  >
    <el-tree
      v-if="treeData.length > 0"
      class="c-organization-picker-tree"
      :data="treeData"
      ref="elTree"
      :props="treeProps"
      show-checkbox
      :check-strictly="false"
      :node-key="nodeKey"
      :default-checked-keys="value"
      @check-change="handleCheckChange"
    ></el-tree>
    <el-tree
      v-if="treeData.length === 0"
      class="c-organization-picker-tree"
      ref="elTree"
      lazy
      :load="loadMethod"
      :props="treeProps"
      show-checkbox
      :check-strictly="false"
      :node-key="nodeKey"
      :default-checked-keys="checkedKeys"
      @check-change="handleCheckChange"
    ></el-tree>
  </el-scrollbar>
</div>
</template>

<script>
import emitterMixin from 'element-ui/lib/mixins/emitter';

export default {
  name: 'OrganizationPicker',
  mixins: [emitterMixin],
  props: {
    value: {
      type: Array,
      required: true,
    },
    nodeKey: {
      type: String,
      default: 'value',
    },
    loadMethod: {
      type: Function,
      required: true,
    },
    treeData: {
      type: Array,
      default: () => {
        return [];
      }
    },
  },
  data() {
    const {
      ORG_TREE_TYPE,
    } = this.$const.orgMgr;
    return {
      ORG_TREE_TYPE,
      treeProps: {
        label: 'text',
        children: 'children',
        disabled: 'disabled',
        isLeaf: 'isLeaf'
      },
      checkedKeys: [],
    };
  },
  mounted() {},
  watch: {
    value: {
      immediate: true,
      handler(newVal) {
        if (Array.isArray(newVal)) {
          this.checkedKeys = newVal.map(item => item.modelId);
          const elTree = this.$refs.elTree;
          elTree && elTree.setCheckedKeys(this.checkedKeys);
        }
      }
    },
  },
  methods: {
    handleCheckChange() {
      const elTree = this.$refs.elTree;
      if (elTree) {
        const checkedNodes = elTree.getCheckedNodes();
        const checkedKeys = checkedNodes.map(node => node[this.nodeKey]);
        const {
          GROUP,
          ORG,
        } = this.$const.orgMgr.ORG_TREE_TYPE;
        const checkedValues = checkedNodes.map(item => {
          if (item.type === GROUP.value) {
            return {
              type: GROUP.value,
              modelId: item.value,
            };
          } else {
            return {
              type: ORG.value,
              modelId: item.value,
            };
          }
        });
        this.$emit('input', checkedValues || []);
        this.$emit('check-change', ...arguments);
        this.$emit('change', checkedNodes || []);
        this.dispatch('ElFormItem', 'el.form.change', [checkedKeys || []]);
      }
    },
  },
};
</script>

<style lang="scss">
@import "@/style/var.scss";
.c-organization-picker {
  width: 285px;
  border: $--border-base;
  &-scrollbar {
    height: 350px;
    padding: 16px 0;
    &__wrap {
      overflow-x: hidden;
    }
  }
}
</style>
