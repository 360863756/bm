<template>
<div class="c-permission-picker">
  <el-scrollbar
    class="c-permission-picker-scrollbar"
    wrap-class="c-permission-picker-scrollbar__wrap"
  >
    <el-tree
      class="c-permission-picker-tree"
      ref="elTree"
      :data="parsedMenus"
      :props="treeProps"
      show-checkbox
      :check-strictly="false"
      :node-key="nodeKey"
      :default-checked-keys="defaultCheckedKeys"
      @check="handleCheck"
      @check-change="handleCheckChange"
    ></el-tree>
  </el-scrollbar>
</div>
</template>

<script>
import emitterMixin from 'element-ui/lib/mixins/emitter';

export default {
  name: 'PermissionPicker',
  mixins: [emitterMixin],
  props: {
    value: {
      type: Array,
      required: true,
    },
    nodeKey: {
      type: String,
      default: 'moduleId',
    },
    organizationId: String,
    type: String, // 模块类型判断默认菜单的展示
    defaultCheckAll: Boolean, // 默认选中所有菜单
    role: String, // 角色编码，主要用来实现仅管理员可见的菜单
  },
  data() {
    return {
      treeData: [],
      cantChangeValue: [],
      defaultCheckedKeys: [],
      treeProps: {
        label: 'moduleName',
        children: 'children',
        disabled: '_disabled',
      },
    };
  },
  computed: {
    parsedMenus() {
      const {
        disabled: disabledKey,
        children: childrenKey,
      } = this.treeProps;
      // 递归获取可见菜单
      const getParsedMenus = (menus, ancestors = []) => {
        return menus.reduce((acc, menu) => {
          if (this.isVisible(menu, ancestors)) {
            return [
              ...acc,
              {
                ...menu,
                [childrenKey]: getParsedMenus(menu[childrenKey] || [], [menu, ...ancestors]),
                [disabledKey]: this.isDisabled(menu, ancestors),
                _checked: this.isChecked(menu, ancestors),
              }
            ];
          }
          return [...acc];
        }, []);
      };
      return getParsedMenus(this.treeData);
    },
  },
  created() {
    this.fetchTreeData();
  },
  watch: {
    value: {
      handler(newVal) {
        this.defaultCheckedKeys = newVal;
        const elTree = this.$refs.elTree;
        elTree && elTree.setCheckedKeys(this.defaultCheckedKeys);
        console.log(this.defaultCheckedKeys, elTree);
      }
    },
    role: {
      handler(role) {
        if (role) {
          if (this.parsedMenus.length) {
            this.defaultCheckedKeys = this.getCheckedKeys(this.parsedMenus);
            this.$emit('input', this.defaultCheckedKeys);
            this.dispatch('ElFormItem', 'el.form.change', [this.defaultCheckedKeys]);
          }
        }
      }
    },
    parsedMenus: {
      handler(parsedMenus) {
        if (this.value.length) {
          return;
        }
        this.defaultCheckedKeys = this.getCheckedKeys(parsedMenus);
        this.$emit('input', this.defaultCheckedKeys);
        this.dispatch('ElFormItem', 'el.form.change', [this.defaultCheckedKeys]);
      }
    }
  },
  methods: {
    getCheckedKeys(menus) {
      const {
        children: childrenKey,
      } = this.treeProps || {};
      return menus.reduce((acc, menu) => {
        const {
          _checked,
        } = menu;
        const key = menu[this.nodeKey];
        const children = menu[childrenKey] || [];
        return _checked
          ? [...acc, key, ...this.getCheckedKeys(children)]
          : [...acc, ...this.getCheckedKeys(children)];
      }, []);
    },
    /**
     * 判断菜单是否可见
     */
    isVisible(menu, ancestors) {
      const {
        moduleStatus,
      } = menu;
      if (+moduleStatus === 0) {
        return false;
      }
      const isTypeVisible = this.getTypeVisible(menu, ancestors);
      const isRoleVisible = this.getRoleVisible(menu, ancestors);
      return isTypeVisible && isRoleVisible;
    },
    getTypeVisible(menu, ancestors) {
      // 找到包含visible配置的祖先元素，moduleConfig继承祖先的配置
      const foundMenu = [menu, ...ancestors].find(item => {
        const {
          visible,
        } = JSON.parse(item.moduleConfig) || {};
        return !!visible;
      });
      if (foundMenu) {
        const {
          visible = [],
        } = JSON.parse(foundMenu.moduleConfig) || {};
        if (!visible.includes(this.type)) {
          return false;
        }
      }
      return true;
    },
    getRoleVisible(menu, ancestors) {
      if (this.role) {
        // 找到包含visibleRoles配置的祖先元素，moduleConfig继承祖先的配置
        const foundMenu = [menu, ...ancestors].find(item => {
          const {
            visibleRoles,
          } = JSON.parse(item.moduleConfig) || {};
          return !!visibleRoles;
        });
        if (foundMenu) {
          const {
            visibleRoles = [],
          } = JSON.parse(foundMenu.moduleConfig) || {};
          if (!visibleRoles.includes(this.role)) {
            return false;
          }
        }
      }
      return true;
    },
    isDisabled(menu, ancestors) {
      const foundMenu = [menu, ...ancestors].find(item => {
        const {
          disable
        } = JSON.parse(item.moduleConfig) || {};
        return !!disable;
      });
      if (foundMenu) {
        const {
          disable = [],
        } = JSON.parse(foundMenu.moduleConfig) || {};
        return disable.includes(this.type);
      }
    },
    isChecked(menu, ancestors) {
      // 机构人员默认选中所有菜单
      if (this.defaultCheckAll) {
        return true;
      }
      const foundMenu = [menu, ...ancestors].find(item => {
        const {
          checked
        } = JSON.parse(item.moduleConfig) || {};
        return !!checked;
      });
      if (foundMenu) {
        const {
          checked = [],
        } = JSON.parse(foundMenu.moduleConfig) || {};
        return checked.includes(this.type);
      }
    },
    fetchApi() {
      if (this.organizationId) {
        return this.$api.app.fetchMenusByOrganization(this.organizationId);
      } else {
        return this.$api.app.fetchAllMenus();
      }
    },
    async fetchTreeData() {
      const { errcode, data } = await this.fetchApi();
      if (errcode === 0) {
        this.treeData = data;
        this.$emit('fetched', this.treeData);
      }
    },
    /**
     * 选中子节点，必须选中其祖先节点
     */
    setAncestorsCheck(node) {
      const {
        checked,
        parent,
      } = node;
      if (checked && parent) {
        const {
          key: parentKey,
        } = parent;
        const elTree = this.$refs.elTree;
        elTree && elTree.setChecked(parentKey, checked);
        this.setAncestorsCheck(parent);
      }
    },
    /**
     * 选中/取消父节点同时设置后代节点
     */
    setDecendantsCheck(node) {
      const {
        checked,
        childNodes,
      } = node;
      const elTree = this.$refs.elTree;
      if (elTree) {
        childNodes.forEach(childNode => {
          const {
            key,
          } = childNode;
          elTree.setChecked(key, checked);
          this.setDecendantsCheck(childNode);
        });
      }
    },
    handleCheck(data) {
      const elTree = this.$refs.elTree;
      const node = elTree.getNode(data);
      this.setDecendantsCheck(node);
      this.setAncestorsCheck(node);
    },
    handleCheckChange() {
      const checkedKeys = this.$refs.elTree && this.$refs.elTree.getCheckedKeys();
      this.$emit('input', checkedKeys);
      this.dispatch('ElFormItem', 'el.form.change', [checkedKeys]);
    }
  },
};
</script>

<style lang="scss">
@import "@/style/var.scss";

.c-permission-picker {
  width: 240px;
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
