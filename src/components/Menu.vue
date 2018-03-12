<template>
  <div class="menu-wrapper">
    <div class="menu-button" @click="toggle()">
      <img src="static/images/menu_button.png">
    </div>
    <ul class="menu-list">
      <li class="img">
        <img src="static/images/logo4.png">
      </li>
      <li class="menu-item" @click="moveTo(1)">
        Home
      </li>
      <li class="menu-item" @click="moveTo(2)">
        Science
      </li>
      <li class="menu-item" @click="moveTo(3)">
        Team
      </li>
      <li class="menu-item" @click="moveTo(4)">
        Message
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {
    toggle() {
      this.$emit('toggle')
    },
    moveTo(index) {
    	 this.$emit('goto', index);
    }
  }
}

</script>
<style scoped lang="scss">
@import '../scss/menu-responsive.scss';
.menu-wrapper {
  height: 100%;
  .menu-list {
    height: 100%;
    list-style: none;
    padding: 0;
    margin: 0;
    background-color: black;
    >.img{
      text-align: center;
      margin-bottom: 40px;
      img{
        border-radius: 50%;
        transform: scale(0.8, 0.8);
      }
    }
    >.menu-item {
      cursor: pointer;
      padding: 15px 0;
      color: #fff;
      text-align: center;
      line-height: 2em;
      &:hover{
        background-color: #252424
      }
    }
  }
  .menu-button {
    position: absolute;
  }
}

</style>
