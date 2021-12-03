import {
  ref,
  watch,
  computed,
  nextTick,
  PropType,
  onMounted,
  CSSProperties,
  defineComponent,
  ExtractPropTypes,
  Teleport
} from 'vue';

// Utils
import {
  isDef,
  isHidden,
  truthProp,
  getScrollTop,
  preventDefault,
  createNamespace,
  getRootScrollTop,
  setRootScrollTop,
  ComponentInstance,
} from 'vant/lib/utils';

// Composables
import {
  useRect,
  useChildren,
  useScrollParent,
  useEventListener,
} from '@vant/use';
import { useTouch } from 'vant/lib/composables/use-touch';
import { useExpose } from 'vant/lib/composables/use-expose';


function genAlphabet() {
  const charCodeOfA = 'A'.charCodeAt(0);
  const indexList = Array(26)
    .fill('')
    .map((_, i) => String.fromCharCode(charCodeOfA + i));

  return indexList;
}

const [name, bem] = createNamespace('index-bar-x');

// 高亮样式接口
interface ITagStyle {
  width: string,
  height: string,
  color?: string,
  backgroundColor?: string
}


export const INDEX_BAR_KEY = Symbol(name);

// index bar 模式
export enum DisplayMode {
  // 有赞 默认
  Default = "default",
  // 左侧弹出 微信通讯录样式
  Pop = "pop",
  // 居中弹出
  Center = "center"
}

const props = {
  sticky: truthProp,
  zIndex: [Number, String],
  // 高亮时标签 文字颜色
  highlightColor: String,
  // 高亮时背景色
  highlightBackgroundColor: String,

  stickyOffsetTop: {
    type: Number,
    default: 0,
  },
  // index bar item 大小
  itemWidth: {
    type: Number,
    default: 16,
  },
  itemHeight: {
    type: Number,
    default: 16,
  },
  indexList: {
    type: Array as PropType<string[]>,
    default: genAlphabet,
  },
  /// 忽略的Tags，这些忽略Tag, 不会高亮显示，点击或长按 不会弹出 tagHint
  ignoreTags: {
    type: Array as PropType<string[]>,
    default: () => []
  },
  /// 展示模式 default/pop/center
  displayMode: {
    type: String,
    default: DisplayMode.Default
  }
};

export type IndexBarProvide = {
  props: ExtractPropTypes<typeof props>;
};

export default defineComponent({
  name,

  props,

  emits: ['select', 'change'],

  setup(props, { emit, slots }) {
    const root = ref<HTMLElement>();
    // 活跃的锚点
    const activeAnchor = ref('');
    // 按下状态下活跃的锚点
    const touchActiveAnchor = ref('');
    // 是否是按下状态
    const isTouchDown = ref(false)

    const touch = useTouch();
    const scrollParent = useScrollParent(root);
    const { children, linkChildren } = useChildren<ComponentInstance>(
      INDEX_BAR_KEY
    );

    linkChildren({ props });

    const sidebarStyle = computed<CSSProperties | undefined>(() => {
      if (isDef(props.zIndex)) {
        return {
          zIndex: +props.zIndex + 1,
        };
      }
    });

    const getScrollerRect = () => {
      if ('getBoundingClientRect' in scrollParent.value!) {
        return useRect(scrollParent);
      }
      return {
        top: 0,
        left: 0,
      };
    };

    const getActiveAnchor = (
      scrollTop: number,
      rects: Array<{ top: number; height: number }>
    ) => {
      for (let i = children.length - 1; i >= 0; i--) {
        const prevHeight = i > 0 ? rects[i - 1].height : 0;
        const reachTop = props.sticky ? prevHeight + props.stickyOffsetTop : 0;

        if (scrollTop + reachTop >= rects[i].top) {
          return i;
        }
      }
      return -1;
    };

    const onScroll = () => {
      if (isHidden(root)) {
        return;
      }

      const { sticky, indexList } = props;
      const scrollTop = getScrollTop(scrollParent.value!);
      const scrollParentRect = getScrollerRect();

      const rects = children.map((item) =>
        item.getRect(scrollParent.value, scrollParentRect)
      );

      const active = getActiveAnchor(scrollTop, rects);

      activeAnchor.value = indexList[active];

      if (sticky) {
        children.forEach((item, index) => {
          const { state, $el } = item;
          if (index === active || index === active - 1) {
            const rect = $el.getBoundingClientRect();
            state.left = rect.left;
            state.width = rect.width;
          } else {
            state.left = null;
            state.width = null;
          }

          if (index === active) {
            state.active = true;
            state.top =
              Math.max(props.stickyOffsetTop, rects[index].top - scrollTop) +
              scrollParentRect.top;
          } else if (index === active - 1) {
            const activeItemTop = rects[active].top - scrollTop;
            state.active = activeItemTop > 0;
            state.top =
              activeItemTop + scrollParentRect.top - rects[index].height;
          } else {
            state.active = false;
          }
        });
      }
    };

    const init = () => nextTick(onScroll);

    useEventListener('scroll', onScroll, { target: scrollParent });

    onMounted(init);

    watch(() => props.indexList, init);

    watch(activeAnchor, (value) => {
      if (value) {
        emit('change', value);
      }
    });
    // 渲染索引 tag + hint
    const renderIndexes = () => {
      return props.indexList.map((index) => {
        // 这里区分一下 按下和松手 这两个状态的 活跃索引 
        const active = isTouchDown.value ? (index === touchActiveAnchor.value) : (index === activeAnchor.value);
        const ignore = props.ignoreTags.some((value) => {
          return value === index
        })
        // 给其父元素增加一个 data-index 这样子类元素无需设置
        return (
          <div class={bem('index', { active: active&&!ignore })} data-index={index}>
            {renderIndexTag(index,active,ignore)}
            {renderIndexHint(index,active,ignore)}
          </div>
        );
      });
    }

    // 渲染索引tag
    const renderIndexTag = (index: string, active: boolean, ignore: boolean) => {
      // 默认状态下的样式
      const style: ITagStyle = {
        width: props.itemWidth + 'px',
        height: props.itemHeight + 'px'
      }
      // 高亮状态下
      if (active&&!ignore) {
        if (props.highlightColor) {
          style.color = props.highlightColor;
        }
        if (props.highlightBackgroundColor) {
          style.backgroundColor = props.highlightBackgroundColor;
        }
      }
      // 提供tag插槽
      if (slots.tag) {
        return slots.tag({index, active, ignore})
      }
      return <span style={style} data-index={index}>{index}</span>
    }

    // 渲染索引Hint
    const renderIndexHint = (index: string, active: boolean, ignore: boolean) => {
      // 提供tag插槽
      if (slots.hint) {
        // 这里需要满足条件才去渲染 hint
        return !ignore&&active&&isTouchDown.value ? slots.hint({index}) : ''
      }
      const modifys:string[] = [props.displayMode]
      return (
        <Teleport to="body" disabled={props.displayMode !== DisplayMode.Center}>
          <div v-show={!ignore&&active&&isTouchDown.value&&props.displayMode!==DisplayMode.Default} class={bem('hint',modifys)}>
            <span>{index}</span>
          </div>
        </Teleport>
      )
    }

    const scrollTo = (index: string) => {
      if (!index) {
        return;
      }

      const match = children.find((item) => String(item.index) === index);
      if (match) {
        match.$el.scrollIntoView();

        if (props.sticky && props.stickyOffsetTop) {
          setRootScrollTop(getRootScrollTop() - props.stickyOffsetTop);
        }

        emit('select', match.index);
      }
    };

    const scrollToElement = (element: HTMLElement) => {
      const index = findDatasetIndex(element);
      if (index) {
        scrollTo(index);
      }
    };

    const onClickSidebar = (event: MouseEvent) => {
      scrollToElement(event.target as HTMLElement);
    };

    let touchActiveIndex: string;

    // 查询dataset index
    const findDatasetIndex: (target: HTMLElement|null) => string|undefined = (target: HTMLElement|null) => {
      if (target) {
        const { index } = target.dataset;
        if (index) {
          return index
        }
        return findDatasetIndex(target.parentElement)
      }
      return undefined
    }

    // 处理touch时间
    const handleTouchEvent = (event: TouchEvent) => {
      const { clientX, clientY } = event.touches[0];
      const target = document.elementFromPoint(
        clientX,
        clientY
      ) as HTMLElement;
      if (target) {
        // 查询index
        const index = findDatasetIndex(target)
        if (index && touchActiveIndex !== index) {
          touchActiveIndex = index;
          // 记录按下的活跃锚点
          touchActiveAnchor.value = index
          // 滚动
          scrollToElement(target);
        }
      }
    }

    // 触摸开始
    const onTouchStart = (event: TouchEvent) => {
      // 按下
      isTouchDown.value = true
      // 调用touch start方法
      touch.start(event)
      // 处理事件
      handleTouchEvent(event)
    }

    const onTouchMove = (event: TouchEvent) => {
      touch.move(event);
      if (touch.isVertical()) {
        preventDefault(event);
        // 处理事件
        handleTouchEvent(event)
      }
    };

    const onTouchEnd = () => {
      // 松手
      isTouchDown.value = false
    }

    useExpose({ scrollTo });

    return () => (
      <div ref={root} class={bem()}>
        <div
          class={bem('sidebar')}
          style={sidebarStyle.value}
          onClick={onClickSidebar}
          onTouchstart={onTouchStart}
          onTouchmove={onTouchMove}
          onTouchend={onTouchEnd}
        >
          {renderIndexes()}
        </div>
        {slots.default?.()}
      </div>
    );
  },
});
