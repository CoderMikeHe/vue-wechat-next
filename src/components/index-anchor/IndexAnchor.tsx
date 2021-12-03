import { ref, reactive, computed, CSSProperties, defineComponent } from 'vue';

// Utils
import { createNamespace, extend, getZIndexStyle } from 'vant/lib/utils';
import { BORDER_BOTTOM } from 'vant/lib/utils/constant';
import { INDEX_BAR_KEY, IndexBarProvide } from '../index-bar/IndexBar';
import { getScrollTop, getRootScrollTop } from 'vant/lib/utils/dom/scroll';

// Composables
import { useRect, useParent } from '@vant/use';
import { useExpose } from 'vant/lib/composables/use-expose';

const [name, bem] = createNamespace('index-anchor-x');

export default defineComponent({
  name,

  props: {
    index: [Number, String],
    // 高亮时标签 文字颜色
    highlightColor: String,
  },

  setup(props, { slots }) {
    const state = reactive({
      top: 0,
      left: null,
      rect: { top: 0, height: 0 },
      width: null,
      active: false,
    });

    const root = ref<HTMLElement>();
    const { parent } = useParent<IndexBarProvide>(INDEX_BAR_KEY);

    if (!parent) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(
          '[Vant] <IndexAnchor> must be a child component of <IndexBar>.'
        );
      }
      return;
    }

    const isSticky = () => state.active && parent.props.sticky;

    const anchorStyle = computed<CSSProperties | undefined>(() => {
      const { zIndex, highlightColor } = parent.props;

      if (isSticky()) {
        return extend(getZIndexStyle(zIndex), {
          left: state.left ? `${state.left}px` : undefined,
          width: state.width ? `${state.width}px` : undefined,
          transform: state.top
            ? `translate3d(0, ${state.top}px, 0)`
            : undefined,
          color: props.highlightColor || highlightColor,
        });
      }
    });

    const getRect = (
      scrollParent: Window | Element,
      scrollParentRect: { top: number }
    ) => {
      const rootRect = useRect(root);
      state.rect.height = rootRect.height;

      if (scrollParent === window || scrollParent === document.body) {
        state.rect.top = rootRect.top + getRootScrollTop();
      } else {
        state.rect.top =
          rootRect.top + getScrollTop(scrollParent) - scrollParentRect.top;
      }

      return state.rect;
    };

    useExpose({
      state,
      getRect,
    });

    return () => {
      const sticky = isSticky();

      return (
        <div
          ref={root}
          style={{ height: sticky ? `${state.rect.height}px` : undefined }}
        >
          <div
            style={anchorStyle.value}
            class={[bem({ sticky }), { [BORDER_BOTTOM]: sticky }]}
          >
            {slots.default ? slots.default() : props.index}
          </div>
        </div>
      );
    };
  },
});
