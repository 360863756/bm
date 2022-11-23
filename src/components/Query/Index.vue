<script>
import { curry } from 'lodash';
export default {
  name: 'query',
  inheritAttrs: false,
  provide() {
    return {
      query: this,
    };
  },
  props: {
    fields: {
      type: Array,
      required: false,
    },
    value: {
      type: Object,
      default: () => ({})
    },
    showOperation: {
      type: Boolean,
      default: true
    },
    queryReverse: Boolean,
  },
  data() {
    return {
      innerValue: this.value,
      options: {},
      checkList: []
    };
  },
  watch: {
    value(val) {
      this.innerValue = val;
    }
  },
  created() {
    this.setReactive();
  },
  methods: {
    setReactive() {
      Array.isArray(this.fields) && this.fields.forEach(({ prop, value }) => {
        if (this.innerValue[prop] === undefined) {
          this.$set(this.innerValue, prop, value || undefined);
        }
      });
    },
    handleField(h, field) {
      if (!field) return;
      const {
        prop,
        type = 'input',
        options: fieldOptions,
        component: CustomInput,
        config = {},
        ...restArgs
      } = field;
      if (!prop) {
        console.warn('缺失必须的属性prop');
        return null;
      }
      if (fieldOptions) {
        if (typeof fieldOptions === 'function') {
          if (!this.options[prop]) {
            this.$set(this.options, prop, []);
            fieldOptions({
              ...this.innerValue,
            }).then(resolvedOptions => {
              this.options[prop] = resolvedOptions;
            });
          }
        } else {
          this.options[prop] = Array.isArray(fieldOptions) ? fieldOptions : [];
        }
      }
      switch (type) {
        case 'custom':
          return (
            CustomInput ? (
              <CustomInput
                { ...{ props: restArgs, on: this.$listeners } }
                value={this.innerValue[prop]}
                on-input={this.noEmitFn()(prop)}
                on-change={this.emitFn()(prop)}
              />
            ) : null
          );
        case 'input':
          return (
            <el-input
              { ...{ props: restArgs } }
              placeholder={field.placeholder}
              value={this.innerValue[prop]}
              on-input={this.noEmitFn()(prop)}
              nativeOn-keyup={this.handleKeyupEnter}
            >
              <i
                slot="suffix"
                class="el-icon-search"
                on-click={this.emitChange}
              ></i>
            </el-input>);
        case 'autocomplete':
          return (
            <el-autocomplete
              { ...{ props: restArgs } }
              value={this.innerValue[prop]}
              on-input={this.noEmitFn()(prop)}
              on-select={this.emitChange}
              nativeOn-keyup={this.handleKeyupEnter}
            >
              <i
                slot="suffix"
                class="el-input__icon el-icon-search"
                on-click={this.emitChange}
              ></i>
            </el-autocomplete>
          );
        case 'select':
          return (
            <el-select
              { ...{ props: restArgs } }
              value={this.innerValue[prop]}
              on-change={this.emitFn()(prop)}>
              {
                this.options[prop].map(option => {
                  const { value, label } = option;
                  return (
                    <el-option
                      key={value}
                      label={label}
                      value={value}
                    ></el-option>
                  );
                })
              }
            </el-select>
          );
        case 'date':
        case 'datetime':
          return (
            <el-date-picker
              { ...{ props: { ...restArgs, ...config } } }
              value={this.innerValue[prop]}
              on-input={this.emitFn()(prop)}>
            </el-date-picker>
          );
        case 'daterange':
          const daterangeData = {
            key: prop,
            props: {
              type: 'daterange',
              value: this.innerValue[prop],
              ...field
            }
          };
          return (
            <el-date-picker
              { ...{ props: restArgs } }
              on-input={this.emitFn()(prop)}
              { ...daterangeData }
            ></el-date-picker>
          );
        default:
          return null;
      }
    },
    changeFn(shouldEmitChange, prop, value) {
      this.$set(this.innerValue, prop, value);
      this.$emit('input', this.innerValue);
      shouldEmitChange && this.emitChange();
    },
    emitFn() {
      return curry(this.changeFn)(true);
    },
    noEmitFn() {
      return curry(this.changeFn)(false);
    },
    resetFields() {
      this.$refs.elForm && this.$refs.elForm.resetFields();
    },
    emitChange() {
      this.$emit('change', this.innerValue);
    },
    handleKeyupEnter(event) {
      if (event.which === 13 || event.keyCode === 13 || event.key === 'Enter') {
        this.emitChange();
      }
    },
  },
  render(h) {
    const queryWidget = Array.isArray(this.fields)
      ? this.fields.map(field => (
        <el-form-item
          { ...{ props: field } }
          label={field.label}
          prop={field.prop}
        >
          {this.handleField(h, field)}
        </el-form-item>
      )) : null;
    const form = (
      <div class={`c-query${this.queryReverse ? ' c-query--reverse' : ''}`}>
        <div class="c-query__form-wrapper">
          <el-form
            ref="elForm"
            class="c-query__form"
            { ...{ listeners: this.$listeners, props: { model: this.value, ...this.$attrs } } }
            inline={true}
            nativeOnSubmit={e => e.preventDefault()}
          >
            {
              queryWidget
            }
            {
              this.showOperation && this.$slots.operation &&
              <el-form-item>
                {
                  this.$slots.operation
                }
              </el-form-item>
            }
          </el-form>
        </div>
        {
          this.$slots.append &&
          <div class="c-query__append">
            {
              this.$slots.append
            }
          </div>
        }
      </div>
    );
    return form;
  }
};
</script>

<style lang="scss">
.c-query {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: -22px;
  &__form-wrapper {
    flex: 1;
    overflow: hidden;
    display: flex;
  }
  &__append {
    margin-bottom: 22px;
    flex-shrink: 0;
  }
  &--reverse {
    flex-direction: row-reverse;
    .c-query__form-wrapper {
      justify-content: flex-end;
    }
  }
  .el-input {
    width: 210px;
  }
  .el-date-editor--daterange.el-input,
  .el-date-editor--daterange.el-input__inner,
  .el-date-editor--timerange.el-input,
  .el-date-editor--timerange.el-input__inner {
    width: 300px;
  }
  .el-select .el-input {
    width: 120px;
  }
  .el-form{
    display: flex;
    width: 100%;
  }
  .el-form-item{
  display: flex;
}
}
</style>
