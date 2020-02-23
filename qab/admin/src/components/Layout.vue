<template>
    <div id="wrap" :class="type ? '' : 'close'">
        <header class="header">
            <div class="header__event">
                <i class="iconfont" :class="type ? 'iconoutdent' : 'iconindent'" @click="type = !type"></i>
            </div>
            <h1 class="header__title">安企帮<span>管理后台</span></h1>
            <ul class="header__menus">
                <li><a href="#">官网</a></li>
                <li><a href="#">数据中心</a></li>
                <li>
                    <el-dropdown @command="command">
                        <span class="el-dropdown-link">
                            {{userName}}<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="a"><span>退出</span></el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </li>
            </ul>
        </header>
        <div class="container">
            <div class="snbl">
                <el-menu :default-active="$route.path" :unique-opened="true" :collapse="!type" router>
                    <!-- <el-menu-item index="/Home"><i class="el-icon-menu"></i><router-link to="/Home">首页</router-link></el-menu-item> -->
                    <el-submenu v-for="(main, mainIndex) in nav" :key="mainIndex" :index="main.path">
                        <template slot="title">
                            <i :class="`iconfont ${main.meta.icon}`"></i>
                            <span>{{main.meta.title}}</span>
                        </template>
                        <template v-if="main.children">
                            <el-menu-item v-for="(sub, subIndex) in main.children" v-show="!sub.meta.isHide" :key="subIndex" :index="sub.path" :class="{'is-active': $route.path.indexOf(sub.path) > -1}">
                                <router-link :to="sub.path">{{sub.meta.title}}</router-link>
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </el-menu>
            </div>
            <div class="contents" :class="this.$route.name === 'Home' ? 'contents--hidden' : ''">
                <el-page-header :class="$route.meta.isBack ? '' : 'el-page-header__left--hide'" @back="goBack"
                :content="Object.prototype.toString.call($route.meta.title) == '[object String]' ? $route.meta.title : $route.query[$route.meta.title[0]]" />
                <navigation><router-view /></navigation>
            </div>
        </div>
        <!-- <footer class="footer">footer</footer> -->
    </div>
</template>
<script>
export default {
    name: 'Layout',
    data() {
        return {
            type: true,
            defaultActive: '',
            nav: [],
            userName: ''
        }
    },
    created() {
        let arr = [...this.$router.options.routes[0].children];
        // arr.splice(0,1);
        this.nav = arr;
        this.setUserName();
        window.setUserName = this.setUserName;
    },
    methods: {
        setUserName() {
            this.userName = sessionStorage.getItem('userName')
        },
        logout() {
            sessionStorage.setItem('userName', '')
            sessionStorage.setItem('phone', '')
            this.$router.push({ name: 'Login' });
        },
        command(type) {
            if(type == 'a'){
                this.logout()
            }
        },
        goBack() {
            this.$router.go(-1)
        }
    }
}
</script>