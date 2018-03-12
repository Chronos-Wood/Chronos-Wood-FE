<template>
  <div class="item-list" ref="content" :style="{height: computedHeight - 48 + 'px'}">
    <ul>
      <li class="item" v-for="item in scienceList">
        <div class="avatar">
          <img :src="item.img">
        </div>
        <div class="content">
          {{item.title}}
        </div>
        <div class="name">
          {{item.author}}
        </div>
      </li>
    </ul>
  </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
  data() {
    return {
      scienceList: [],
      computedHeight: 0,
    }
  },
  created() {
    this.$http.get('https://www.chronos-wood.com/science/').then(response => {
      let body = response.body;
      if (body.code === '1') {
        this.scienceList = body.model;
      }
    }, response => {
      
    });
  },
  mounted() {
    this.$nextTick(() => {
      this.computedHeight = document.body.clientHeight;
      this.scroll = new BScroll(this.$refs.content, {});
    })
  }
}

</script>
<style scoped lang="scss">
.item-list {
  box-sizing: border-box;
  overflow: hidden;
  margin:1.5em 0;
  width: 80%;
  float: right;
  ul {
    list-style: none;
    box-sizing: border-box;
    margin:0;
    padding: 0;
    >.item {
      width: 95%;
      margin: 0 auto;
      box-shadow: 0 0 8px 2px #ccc;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      position: relative;
      margin-bottom: 20px;
      padding: 5px;
      cursor: pointer;
      &:hover{
      	//box-shadow: inset -1px 1px 12px 1px #ccc;
      	background: #f7f7f7;
      }
      img {
        position: relative;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        @media screen and(max-width: 1024px) {
          width: 80px;
          height: 80px;
        }
      }
      >.content {
        flex: 1;
        padding-left: 10px;
        text-align: left;
      }
      >.name {
        position: absolute;
        right: 10px;
        bottom: 10px;
      }
    }
  }
}

</style>
