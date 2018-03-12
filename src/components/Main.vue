<template>
  <div id="fullpage">
    <div class="section">
      <div class="left" id="menu" :class="{open: open}">
        <ToggleMenu v-on:toggle="toggle" v-on:goto="slideTo"></ToggleMenu>
      </div>
      <div class="right first-screen" :class="{open: open}">
        <div style="position:absolute;top:10px;right:10px">
          <TopBar></TopBar>
        </div>
        <div class="center">
          <img src="static/images/tittle.png">
        </div>
      </div>
    </div>
    <div class="section">
      <div class="right" :class="{open: open}">
        <div class="intro">
          <div class="content-wrapper">
            <div class="title">Science</div>
            <p>This section is for the article which of techniques in Computer Science. The purpose is to list and explain some of them.</p>
          </div>
        </div>
        <ScienceList></ScienceList>
      </div>
    </div>
    <div class="section" style="position">
      <div class="right" :class="{open: open}">
        <IntroList></IntroList>
      </div>
    </div>
    <div class="section">
      <div class="right first-screen" :class="{open: open}">
        <div style="position:absolute;bottom:0;right:0">
          <img src="static/images/page_01.png" class="bottm-img">
        </div>
        <el-form :model="formModel" :rules="rules2" ref="form">
          <el-row>
            <el-col :md="12" :xs="24">
              <el-form-item prop="name">
                <el-input v-model="formModel.name" placeholder="NAME"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="12" :xs="24">
              <el-form-item prop="email">
                <el-input v-model="formModel.email" placeholder="EMAIL"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="24" :xs="24">
              <el-form-item prop="message">
                <el-input type="textarea" v-model="formModel.message" :rows="rows">
                </el-input>
                <div class="submit-box"><a href="#" @click="submitForm('form')" v-loading.fullscreen.lock="fullscreenLoading">ENTER</a></div>
              </el-form-item>
            </el-col>
            <!-- <el-col :md="24" :xs="24">
              <el-form-item>
                <el-button type="primary" @click="submitForm('form')">提交</el-button>
                <el-button @click="resetForm('form')">重置</el-button>
              </el-form-item>
            </el-col> -->
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import TopBar from './TopBar'
import ToggleMenu from './Menu'
import IntroList from '../pages/IntroList'
import ScienceList from '../pages/ScienceList'
import { Loading } from 'element-ui';
export default {
  data() {
    var validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter your name'));
      } else {
        let length = value.replace(/^\s*((.|\n)*\S)?\s*$/, '$1').length;
        if (length > 0 && length < 20) {
          callback();
        } else {
          callback(new Error('name length must in range 1-20'));
        }

      }
    };
    var validateEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter your email'));
      } else {
        if (!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(value)) {
          callback(new Error('invalid email'));
        }
        let length = value.replace(/^\s*((.|\n)*\S)?\s*$/, '$1').length;
        if (length > 0 && length < 100) {
          callback();
          return;
        }
        callback(new Error('email length invalid'));
      }
    };
    var validateMessage = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input messages'));
      } else {
        let length = value.replace(/^\s*((.|\n)*\S)?\s*$/, '$1').length;
        if (length > 0 && length < 200) {
          callback();
          return;
        }
        callback(new Error('messahe length invalid'));
      }
    }
    return {
      open: false,
      rows: 18,
      fullscreenLoading: false,
      formModel: {
        name: '',
        email: '',
        message: ''
      },
      rules2: {
        name: [
          { validator: validateName, trigger: 'blur' }
        ],
        email: [
          { validator: validateEmail, trigger: 'blur' }
        ],
        message: [
          { validator: validateMessage, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    toggle() {
      this.open = !this.open
    },
    slideTo(index) {
      $.fn.fullpage.moveTo(index);
    },
    submitForm() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.fullscreenLoading = true;
          let model = {
            'name': this.formModel.name,
            'email': this.formModel.email,
            'message': this.formModel.message
          };
          this.$http.post('https://www.chronos-wood.com/message/', model, { emulateJSON: true, headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(response => {
            this.fullscreenLoading = false;
            this.resetForm();
            if (response.ok) {
              this.$notify({
                title: 'success',
                message: 'we\'ll reach to you soon!',
                type: 'success'
              });
            }
          }, response => {
            this.fullscreenLoading = false;
            this.resetForm();
            this.$notify({
              title: 'error',
              message: 'oops !something goes wrong',
              type: 'error'
            });
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm() {
      this.$refs['form'].resetFields();
    },
  },
  components: {
    TopBar,
    ToggleMenu,
    IntroList,
    ScienceList
  },
  mounted() {
    var options = {
      menu: '#menu',
      css3: true,
      controlArrowColor: 'rgb(0,0,0)',
      fitToSection: true,
      normalScrollElements: '.scroll-wrapper, .item-list'
    }
    if (navigator.userAgent.match(/mobile/i)) {
      options.controlArrows = false
      this.rows = 12
    }
    $('#fullpage').fullpage(options)


  }
}

</script>
<style scoped lang="scss">
@import '../scss/main-responsive.scss';
.custom-icon-loading {
  color: #000;
}

.submit-box {
  position: absolute;
  right: 5px;
  bottom: 0;
  width: 143px;
  height: 60px;
  text-align: center;
  font-weight: 550;
  font-size: 3em;
  line-height: 60px;
  letter-spacing: 1px;
  font-family: serif;
  @media screen and(max-width: 1024px) {
    font-size: 2.5em;
  }
  >a {
    text-decoration: none;
    color: black;
  }
}

.left,
.right {
  height: 100%;
}

.left {
  position: absolute;
  top: 0;
  transition: all .4s ease-in-out;
  &.open {
    left: 0;
  }
}

.right {
  width: 100%;
  position: relative;
  transition: left .4s ease-in-out;
  left: 0;
  &.first-screen {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  >.intro {
    float: left;
    height: 100%;
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 10px;
    @media screen and(max-width: 1024px) {
      display: none;
    }
    >.content-wrapper {
      >.title {
        font-size: 40px;
      }
      >p {
        font-size: 22px;
        text-indent: 2em;
        width: 500px;
        margin: 0 auto;
        text-align: left;
        line-height: 30px;
        margin-top: 30px;
      }
    }
  }
  .el-form {
    width: 80%;
    .el-col {
      padding: 0 10px;
      textarea {
        rows: 20
      }
    }
    .el-form-item {
      box-shadow: 0 0 10px 2px #ccc
    }
  }
}

</style>
