<template>
  <li class="el-menu-item"
    :style="[itemStyle, { backgroundColor }]"
    @click="handleClick"
    :class="{
      'is-disabled': disabled
    }"
    role="menuitem"
    tabindex="-1"
  >
    <!-- <el-tooltip disabled="true"
      v-if="$parent === rootMenu && rootMenu.collapse"
      effect="dark"
      placement="right">
      <div slot="content"><slot name="title"></slot></div>
      <div style="position: absolute;left: 0;top: 0;height: 100%;width: 100%;display: inline-block;box-sizing: border-box;padding: 0 20px;">
        <slot></slot>
      </div>
    </el-tooltip>-->
    <template>
      <slot></slot>
      <slot name="title"></slot>
    </template> 
  </li>
</template>
<script>
  import Menu from './menu-mixin';
  // import ElTooltip from './tooltip';
  import Emitter from './emitter';

  export default {
    name: 'ElMenuItem',

    componentName: 'ElMenuItem',

    mixins: [Menu, Emitter],

    // components: { ElTooltip },

    props: {
      index: {
        type: String,
        required: true
      },
      route: {
        type: [String, Object],
        required: false
      },
      disabled: {
        type: Boolean,
        required: false
      },
      children: {
        type: Array,
        required: false
      },
    },
    computed: {
      active() {
        return this.index === this.rootMenu.activeIndex;
      },
      hoverBackground() {
        return this.rootMenu.hoverBackground;
      },
      backgroundColor() {
        return this.rootMenu.backgroundColor || '';
      },
      activeTextColor() {
        return this.rootMenu.activeTextColor || '';
      },
      textColor() {
        return this.rootMenu.textColor || '';
      },
      mode() {
        return this.rootMenu.mode;
      },
      itemStyle() {
        const style = {
          color: this.active ? this.activeTextColor : this.textColor
        };
        if (this.mode === 'horizontal' && !this.isNested) {
          style.borderBottomColor = this.active
            ? (this.rootMenu.activeTextColor ? this.activeTextColor : '')
            : 'transparent';
        }
        return style;
      },
      isNested() {
        return this.parentMenu !== this.rootMenu;
      }
    },
    methods: {
      onMouseEnter() {
        if (this.mode === 'horizontal' && !this.rootMenu.backgroundColor) return;
        this.$el.style.backgroundColor = this.hoverBackground;
      },
      onMouseLeave() {
        if (this.mode === 'horizontal' && !this.rootMenu.backgroundColor) return;
        this.$el.style.backgroundColor = this.backgroundColor;
      },
      handleClick() {
        this.$store.commit('set_active_menuchildren', this.children);
        this.dispatch('ElMenu', 'item-click', this);
        this.$emit('click', this);
      }
    },
    created() {
      this.parentMenu.addItem(this);
      this.rootMenu.addItem(this);
    },
    beforeDestroy() {
      this.parentMenu.removeItem(this);
      this.rootMenu.removeItem(this);
    }
  };
</script>
