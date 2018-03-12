<template>
  <div class="member-intro" ref="wrapper" :style="{height: computedHeight - 120+ 'px'}">
    <ul class="member-list">
      <li class="item" v-for="item in intros">
        <img :src="item.img"> 
        <div class="scroll-wrapper" ref="intros">
          <div class="main-wrapper">
            <div class="name">{{item.name}}</div>
            <ul class="intro-list">
              <li v-for="tag in item.tag" :title="tag">
                {{tag}}
              </li>
            </ul>
            <div class="info">{{item.abstract}}</div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
  data() {
    return {
      intros: [],
      computedHeight: 0
    }
  },
  created() {
    this.$http.get('https://www.chronos-wood.com/information/team').then(response => {
      let body = response.body;
      if (body.code === '1') {
        this.intros = body.model;
        setTimeout(() => {
          for (let intro of this.$refs.intros) {
            this.scroll = new BScroll(intro, {
              scrollX: false,
              scrollY: true,
            });
          }
        }, 20)
      }
    }, response => {

    });
  },
  methods: {

  },
  mounted() {
    this.$nextTick(() => {
      this.computedHeight = document.body.clientHeight;
      this.scroll = new BScroll(this.$refs.wrapper, {
        scrollX: true,
        scrollY: false,
        momentum: true,
        eventPassthrough: 'vertical',
        click: true
      })
    })

  }
}

</script>
<style scoped lang="scss">
.member-intro {
  display: flex;
  width: 100%;
  margin: 0 auto;
  align-items: center;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
  margin-top: 120px;
  .member-list {
    padding-left: 20px;
    margin: 0;
    list-style: none; // padding: 0 10px;
    white-space: nowrap; // display: inline;
    .item {
      position: relative;
      display: inline-block;
      vertical-align: middle;
      width: 240px;
      height: 400px;
      box-shadow: 0 0 15px 2px #ccc;
      margin: 20px;
      padding: 10px;
      box-sizing: border-box;
      transition: all .2s ease-in;
      &:hover {
        transform: scale(1.1, 1.1);
      }
      @media screen and(max-width: 1024px) {
        width: 200px;
        margin: 10px;
        height: 360px;
      }
      img {
        position: relative;
        top: -35px;
        width: 80px;
        height: 80px;
        border-radius: 50%;
      }
      >.scroll-wrapper {
        position: relative;
        top: -40px;
        height: 343px;
        @media screen and(max-width: 1024px) {
          height: 300px;
        }
        overflow: hidden;
        .intro-list {
          list-style: none;
          margin: 0;
          padding: 0;
          >li {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
        .name {
          font-size: 25px;
          height: 35px;
          border-bottom: 3px solid;
          @media screen and (max-width: 1024px) {
            font-size: 20px;
            height: 25px;
            border-bottom: 3px solid;
          }
        }
        ul {
          list-style: none;
          white-space: normal;
          word-break: break-all;
          padding: 0;
          li {
            text-align: left;
            font-weight: 400;
            border-bottom: 1px solid black;
            margin: 5px 0;
            &:last-of-type {
              border-bottom: 0;
            }
          }
        }
        .info {
          border-top: 3px solid;
          text-indent: 2em;
          text-align: left;
          white-space: normal;
          word-break: break-all;
          font-size: 1em;
        }
      }
    }
  }
}

</style>
