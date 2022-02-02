<template>
  <div class="pic-img">
    <!-- 外部容器，都是400*400 -->
    <div class="img-container" @mousemove="!moveEvent && mouseMove($event)" @mouseleave="!leaveEvent && mouseLeave($event)">
      <!-- 图片 -->
      <img ref="img" @load="!lazyload && imgLoaded($event)" :src="!lazyload ? url : (imgLoadedFlag && url)" width="100%" height="100%" />
      <!-- 鼠标选中框 -->
      <div v-if="!hideZoom && imgLoadedFlag &&!hideSelector" :class="['img-selector', {'circle': type === 'circle'}]" :style="[imgSelectorStyle, imgSelectorSize, imgSelectorPosition, !outShow && imgBg, !outShow && imgBgSize, !outShow && imgBgPosition]">
        <slot></slot>
      </div>
      <!-- 外部放大框 -->
      <div v-if="outShow" v-show="!hideOutShow" :class="['img-out-show', {'base-line': baseline}]" :style="[imgOutShowSize, imgOutShowPosition, imgBg, imgBgSize, imgBgPosition]">
        <div v-if="pointer" class="img-selector-point"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "vue-photo-zoom-pro",
  props: {
    url: String, //商品原图
    highUrl: String,//放大精细图，条件有限，不用这个
    width: { //选择器宽高
      type: Number,
      // default: 160
      default: 200
    },
    type: { //形状
      type: String,
      default: "square",
      validator: function (value) {
        return ["circle", "square"].indexOf(value) !== -1;
      }
    },
    selectorStyle: {
      type: Object,
      default() {
        return {};
      }
    },
    outShowStyle: {},
    scale: { //默认放大3倍
      type: Number,
      // default: 3
      default: 2
    },
    lazyload: {
      type: Boolean,
      default: false
    },
    moveEvent: {
      type: [Object, MouseEvent],
      default: null
    },
    leaveEvent: {
      type: [Object, MouseEvent],
      default: null
    },
    hideZoom: {
      type: Boolean,
      default: false
    },
    outShow: { //放大在右侧外部显示还是在内部显示
      type: Boolean,
      default: true
    },
    pointer: {
      type: Boolean,
      default: false
    },
    baseline: { //外部放大图是否有十字杠
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selector: {
        width: this.width, //选中区域宽度
        top: 0,
        left: 0,
        bgTop: 0,
        bgLeft: 0,
        rightBound: 0,
        bottomBound: 0,
        absoluteLeft: 0,
        absoluteTop: 0
      },
      imgInfo: {}, //左侧大图节点信息的getBoundingClientRect。包括大图宽高等信息
      $img: null, //左侧大图节点信息
      screenWidth: document.body.clientWidth,
      outShowInitTop: 0,
      outShowTop: 0,
      hideOutShow: true,
      imgLoadedFlag: false,
      highImgLoadedFlag: false,
      hideSelector: true,
      timer: null
    };
  },
  watch: {
    moveEvent(e) {
      this.mouseMove(e);
    },
    leaveEvent(e) {
      this.mouseLeave(e);
    },
    url() {
      this.handlerUrlChange();
    },
    width(n) { //选择框宽度width改变。初始化选择框
      this.initSelectorProperty(n);
    },
    screenWidth(val) {
      if (!this.timer) {
        this.screenWidth = val;
        this.timer = setTimeout(() => {
          this.imgLoaded();
          clearTimeout(this.timer);
          this.timer = null;
        }, 400);
      }
    }
  },
  computed: {
    addWidth() { //选择器图片的坐标位置。如果是内部展示,则为图片宽度的一半*（1-缩放比例）
      return !this.outShow ? (this.width / 2) * (1 - this.scale) : 0;
    },
    imgSelectorPosition() {
      let { top, left } = this.selector;
      return {
        top: `${top}px`,
        left: `${left}px`
      };
    },
    imgSelectorSize() { //选择器宽高样式计算方法
      let width = this.selector.width;
      return {
        width: `${width}px`,
        height: `${width}px`
      };
    },
    imgSelectorStyle() {
      return this.selectorStyle;
    },
    // 外部放大框的整体宽高（鼠标选中框宽度x放大倍数）
    imgOutShowSize() {
      // let {
      //   scale,
      //   selector: { width }
      // } = this;
      return {
        // width: `${width * scale}px`,
        // height: `${width * scale}px`
        width: `400px`,
        height: `400px`
      };
    },
    // 外部放大框相对左侧的位置
    imgOutShowPosition() {
      return {
        top: `${this.outShowTop}px`,
        right: `${-8}px`
      };
    },
    //外部放大框的大图的地址，如果传有更清晰的就用上，没有就用产品原图
    imgBg() {
      return {
        backgroundImage: `url(${this.highUrl || this.url})`
      };
    },
    // 外部放大框的大图的尺寸
    imgBgSize() {
      let {
        scale,
        imgInfo: { height, width }
      } = this; //直接走vue实例的data中结构赋值拿值
      return {
        backgroundSize: `${width * scale}px ${height * scale}px`
      };
    },
    // 外部放大框背景图片位置
    imgBgPosition() {
      let { bgLeft, bgTop } = this.selector;
      return {
        backgroundPosition: `${bgLeft}px ${bgTop}px`
      };
    }
  },
  created() {
    //&&true取后值，||true取前值。这里this.lazyload为false，所以初始不调用handlerUrlChange。只有通过url改变调用handlerUrlChange
    this.url && this.lazyload && this.handlerUrlChange();
  },
  mounted() {
    this.$img = this.$refs["img"];
  },
  methods: {
    handlerUrlChange() {
      this.imgLoadedFlag = false;
      this.lazyload &&
        this.loadImg(this.url).then(this.imgLoaded, err => console.error(err));
    },
    loadImg(url) {
      return new Promise((resolve, reject) => {
        const img = document.createElement("img");
        img.addEventListener("load", resolve);
        img.addEventListener("error", reject);
        img.src = url;
      });
    },
    imgLoaded() {
      // console.log("xxxx",this.$img.width) //400
      //左侧大图信息。getBoundingClientRect的left、right、top、bottom对应元素距离可视区距离。width、height对应元素可视宽高
      let imgInfo = this.$img.getBoundingClientRect(); 
      if (JSON.stringify(this.imgInfo) != JSON.stringify(imgInfo)) {
        this.imgInfo = imgInfo;
        this.initSelectorProperty(this.width);
        this.resetOutShowInitPosition();
      }
      if (!this.imgLoadedFlag) {
        this.imgLoadedFlag = true;
        this.$emit("created", imgInfo);
      }
    },
    mouseMove(e) {
      if (!this.hideZoom && this.imgLoadedFlag) {
        this.imgLoaded();
        const { pageX, pageY, clientY } = e; //pageX相对于页面左侧的位置，pageY相对于页面上方的位置，clientY相对于可视区顶部的位置
        const { scale, selector, outShow, addWidth, outShowAutoScroll } = this;
        let { outShowInitTop } = this;
        const scrollTop = pageY - clientY;
        const { absoluteLeft, absoluteTop, rightBound, bottomBound } = selector;
        const x = pageX - absoluteLeft; // 选择器相对于图片的x坐标 (absoluteLeft图片距离左侧的绝对距离，固定的)
        const y = pageY - absoluteTop; // 选择器相对于图片的y坐标（absoluteTop是图片距离顶部的绝对距离，固定的）
        if (outShow) { //如果放大图外部显示，才执行以下
          if (!outShowInitTop) {
            outShowInitTop = this.outShowInitTop = scrollTop + this.imgInfo.top;
          }
          this.hideOutShow && (this.hideOutShow = false);
          this.outShowTop =
            scrollTop > outShowInitTop ? scrollTop - outShowInitTop : 0;
        }
        this.hideSelector && (this.hideSelector = false);
        let newy = y > 0 ? (y < bottomBound ? y : bottomBound) : 0;//bottomBound为图片高度-选择器高度
        let newx = x > 0 ? (x < rightBound ? x : rightBound) : 0; //新的x，y用于判断边界问题。
        selector.top = newy;//bottomBound为图片高度-选择器高度
        selector.left = newx;
        selector.bgLeft = addWidth - newx * scale; // 选择器图片的坐标位置（addWidth默认为0）
        selector.bgTop = addWidth - newy * scale;
      }
    },
    //初始化选中区域的宽度。这里selectorWidth选择器宽高width值
    initSelectorProperty(selectorWidth) {
      // console.log("selectorWidth",selectorWidth) //为width值160
      const selectorHalfWidth = selectorWidth / 2;
      const selector = this.selector; //获取selector所有属性。其中width已经是父级传递值了
      const { width, height, left, top } = this.imgInfo;//width、height可视宽高，left、top左侧详情图距离可视区左侧、顶部的距离
      console.log("left top", left, top)
      const scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
      const scrollLeft = document.documentElement.scrollLeft || window.pageXOffset || document.body.scrollLeft;
      console.log("scrollTop screenLeft", scrollTop, screenLeft) //滚轮上下、左右滚动距离
      selector.width = selectorWidth;
      selector.rightBound = width - selectorWidth; //400-160
      selector.bottomBound = height - selectorWidth;//400-160
      selector.absoluteLeft = left + selectorHalfWidth + scrollLeft;
      selector.absoluteTop = top + selectorHalfWidth + scrollTop;
    },
    mouseLeave() {
      this.hideSelector = true;
      if (this.outShow) {
        this.hideOutShow = true;
      }
    },
    reset() {
      Object.assign(this.selector, {
        top: 0,
        left: 0,
        bgLeft: 0,
        bgTop: 0
      });
      this.resetOutShowInitPosition();
    },
    resetOutShowInitPosition() {
      this.outShowInitTop = 0;
    }
  }
};
</script>

<style scoped>
.pic-img {
  width: 400px;
  height: 400px;
}
.img-container {
  width: 400px;
  height: 400px;
  position: relative;
}
.img-selector {
  position: absolute;
  cursor: move;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-repeat: no-repeat;
  background-color: rgba(0, 0, 0, 0.6);
}
.img-selector.circle {
  border-radius: 50%;
}
.img-out-show {
  position: absolute;
  background-repeat: no-repeat;
  transform: translate(100%, 0);
  border: 1px solid rgba(0, 0, 0, 0.1);
  z-index: 1000;
  background-color: #fff;
}
.img-selector-point {
  position: absolute;
  width: 4px;
  height: 4px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: black;
}
.img-out-show.base-line::after {
  position: absolute;
  box-sizing: border-box;
  content: "";
  width: 1px;
  border: 1px dashed rgba(0, 0, 0, 0.36);
  top: 0;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}
.img-out-show.base-line::before {
  position: absolute;
  box-sizing: border-box;
  content: "";
  height: 1px;
  border: 1px dashed rgba(0, 0, 0, 0.36);
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
</style>