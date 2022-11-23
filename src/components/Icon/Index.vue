<script>
import svgIconNames from '@/icons';

/**
 * 获取图表类型
 * @param {string} name SVG图表名称/字体图表class/图片地址
 * @returns {string} SvgIcon|FontIcon|Image
 */
const getIconType = (name) => {
  const imageReg = /\.(png|jpe?g|gif|webp|ico)(\?.*)?$/;
  if (svgIconNames.includes(name)) {
    return 'SvgIcon';
  } else if (imageReg.test(name)) {
    return 'Image';
  } else {
    return 'FontIcon';
  }
};

export default {
  name: 'Icon',
  functional: true,
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  render(h, context) {
    const { name } = context.props;
    const FontIcon = (
      <span { ...context.data } class={`c-icon c-icon--font-icon ${name}`}></span>
    );
    const Image = (
      <img { ...context.data } class="c-icon c-icon--image" src={name} />
    );
    const SvgIcon = (
      <svg-icon { ...context.data } class="c-icon c-icon--svg-icon" iconClass={name} />
    );
    const type = getIconType(name);
    const icons = {
      FontIcon,
      Image,
      SvgIcon,
    };
    return icons[type] || FontIcon;
  },
};
</script>
