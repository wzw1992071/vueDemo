<template>
  <div class="home">
    <div class="mapBox" id="mapBox">
      
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderShow",
  data() {
    return {
      map: null,
      geocoder: null,
      markerList: [],
      timeInterval:null
    };
  },
  methods: {
    initMap() {
      this.map = new AMap.Map("mapBox", {
        zoom: 12, //级别
        center: this.defaultXY, //中心点坐标
        resizeEnable: true,
        mapStyle: "amap://styles/blue"
      });
      this.map.setDefaultCursor("pointer");

      // 添加比例尺
      this.map.addControl(new AMap.Scale({ visible: true }));
      AMap.plugin("AMap.ToolBar", () => {
        var toolbar = new AMap.ToolBar();
        this.map.addControl(toolbar);
      });

      this.geocoder = new AMap.Geocoder({
        city: "028" //城市设为成都，默认：“全国”
      });
    },
    getNowData() {
      let that = this;
      this.$axios.get("/provider/purchases/sales/map-show/list").then(res => {
        this.markerList = [];
        Promise.all(
          res.data.data.lists.map(item => {
            return new Promise((resolve, reject) => {
              that.geocoder.getLocation(
                item.receipt_address,
                (status, result) => {
                  if (status === "complete" && result.geocodes.length) {
                    resolve(result.geocodes[0].location);
                  } else {
                    reject("获取坐标失败");
                  }
                }
              );
            });
          })
        )
          .then(res => {
            let icon = new AMap.Icon({
              size: new AMap.Size(12, 12), // 图标尺寸
              image: "http://img.idongpin.com/Public/oa/images/marker.gif", // Icon的图像
              imageOffset: new AMap.Pixel(0, 0), // 图像相对展示区域的偏移量，适于雪碧图等
              imageSize: new AMap.Size(12, 12) // 根据所设置的大小拉伸或压缩图片
            });
            res.forEach(item => {
              let marker = new AMap.Marker({
                position: new AMap.LngLat(item.lng, item.lat),
                icon: icon
              });
              this.markerList.push(marker);
            });
            this.map.clearMap();
            this.map.add(this.markerList);
          })
          .catch(err => {
            console.log(err);
          });
      });
    },
    getData() {
      let that = this;
      this.timeInterval=setInterval(()=> {
        that.getNowData();
      }, 60000);
    }
  },
  mounted() {
    this.initMap();
    this.getNowData();
    this.getData()
  },
  beforeDestroy(){
      clearInterval(this.timeInterval)
  }
};
</script>


<style lang="less" scoped>
.home {
  height: 100%;
  .mapBox {
    height: 100%;
  }
}
</style>
