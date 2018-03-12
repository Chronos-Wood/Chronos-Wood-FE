<template>
  <div class="top-bar">
    <span class="label" v-on:mouseenter="eactive" v-on:mouseleave="deactive">Join us</span>
    <span>|</span>
    <span class="label" v-on:mouseenter="show" v-on:mouseleave="hide">Schedule</span>
    <span>|</span>
    <div class="content-wrapper" :class="{active: active}">
      <div class="title-wrapper">
        <div>Name</div>
        <div>Deadline</div>
      </div>
      <div class="schedule-wrapper">
        <ul>
          <li class="schedule-item" v-for="schedule in scheduleList">
            <div class="title-wrapper">
              <div>{{schedule.name}}</div>
              <div>{{schedule.deadline}}</div>
            </div>
          </li>
        </ul>
      </div>
      <div class="dot-top"></div>
    </div>
    <div class="join-wrapper" :class="{jactive: jactive}">
    	Send us Email to join us!
      <div class="dot-top">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: false,
      jactive: false,
      scheduleList: []
    }
  },
  methods: {
    show() {
      this.active = true;
      this.jactive = false;
    },
    hide() {
      this.active = false;
    },
    eactive() {
      this.jactive = true;
      this.active = false;
    },
    deactive() {
      this.jactive = false;
    }
  },
  created() {
    this.$http.get('https://www.chronos-wood.com/information/schedule').then(response => {
      let body = response.body;
      if (body.code === '1') {
        this.scheduleList = body.model;
      }
    }, response => {

    });
  }
}

</script>
<style scoped lang="scss">
.top-bar {
  position: relative;
  font-size: 15px;
  font-family: sans-serif;
  text-align: right;
  padding: 10px;
  @media screen and(min-width: 320px) {
    font-size: 13px;
  }
  @media screen and(min-width: 375px) {
    font-size: 15px;
  }
  @media screen and(min-width: 512px) {
    font-size: 20px;
    padding: 20px;
  }
  .join-wrapper {
    position: absolute;
    background-color: black;
    left: -80px;
    border-radius: 10px;
    right: 10px;
    display: none;
    color: #fff;
    padding: 10px;
    text-align: center;
    &.jactive {
      display: block;
    }
    @media screen and(min-width: 320px) {
      top: 35px;
    }
    @media screen and(min-width: 375px) {
      top: 35px;
    }
    @media screen and(min-width: 512px) {
      top: 55px;
    }
    >.dot-top {
      position: absolute;
      width: 10px;
      top: -8px;
      font-size: 0;
      line-height: 0;
      border-width: 10px;
      border-color: black;
      border-top-width: 0;
      border-style: dashed;
      border-bottom-style: solid;
      border-left-color: transparent;
      border-right-color: transparent;
      @media screen and(min-width: 320px) {
        right: 100px;
      }
      @media screen and(min-width: 375px) {
        right: 120px;
      }
      @media screen and(min-width: 512px) {
        right: 160px;
      }
    }
  }
  .content-wrapper {
    position: absolute;
    background-color: black;
    left: -80px;
    border-radius: 10px;
    right: 10px;
    display: none;
    &.active {
      display: block;
    }
    @media screen and(min-width: 320px) {
      top: 35px;
    }
    @media screen and(min-width: 375px) {
      top: 35px;
    }
    @media screen and(min-width: 512px) {
      top: 55px;
    }
    >.schedule-wrapper {
      ul {
        padding: 0;
        margin: 0;
        list-style: none;
        >.schedule-item {
          >.title-wrapper {
            overflow: hidden;
            padding: 5px;
            >div {
              width: 50%;
              float: left;
              text-align: center;
              font-size: 0.8em;
              color: #fff;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }
        }
      }
    }
    >.title-wrapper {
      overflow: hidden;
      padding: 5px;
      >div {
        font-weight: 600;
        width: 50%;
        float: left;
        text-align: center;
        font-size: 0.8em;
        color: #fff;
      }
    }
    >.dot-top {
      position: absolute;
      width: 10px;
      top: -8px;
      font-size: 0;
      line-height: 0;
      border-width: 10px;
      border-color: black;
      border-top-width: 0;
      border-style: dashed;
      border-bottom-style: solid;
      border-left-color: transparent;
      border-right-color: transparent;
      @media screen and(min-width: 320px) {
        right: 35px;
      }
      @media screen and(min-width: 375px) {
        right: 40px;
      }
      @media screen and(min-width: 512px) {
        right: 60px;
      }
    }
  }
  span {
    padding-right: 5px;
    &.label {
      cursor: pointer;
    }
  }
}

</style>
