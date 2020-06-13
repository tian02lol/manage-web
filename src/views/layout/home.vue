<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div class="content-box" :class="{'content-collapse':collapse}">
            <div class="content_wrapper">
                <div class="content" style="flex:1;">
                    <div class="content_inner">
                        <transition name="move" mode="out-in">
                        <keep-alive :include="tagsList">
                            <router-view></router-view>
                        </keep-alive>
                    </transition>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
<style lang="scss" scoped>
    .content_wrapper{
       display: flex;
       flex-direction: column;
       height:100%;
       .content_inner{
        //    background: #fff;
           height: 100%;
       }
    }
    .content-box {
      position: absolute;
      left: 250px;
      right: 0;
      top: 70px;
      bottom: 0;
      overflow-y: scroll;
      transition: left .3s ease-in-out;
      background: #f0f0f0;
  }
  .content-collapse{
      left: 65px;
    }
</style>
<script>
import vHead from './Header.vue'
import vSidebar from './Sidebar.vue'
import bus from './bus'
export default {
  data () {
    return {
      tagsList: [],
      collapse: false
    }
  },
  components: {
    vHead, vSidebar
  },
  methods: {
  },
  created () {
    bus.$on('collapse', msg => {
      this.collapse = msg
    })

    // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
    bus.$on('tags', msg => {
      var arr = []
      for (let i = 0, len = msg.length; i < len; i++) {
        msg[i].name && arr.push(msg[i].name)
      }
      this.tagsList = arr
    })
  }
}
</script>
