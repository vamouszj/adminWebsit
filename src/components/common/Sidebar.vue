<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index">
                        <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index">
                        <i :class="item.icon"></i>{{ item.title }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                items: [
                    {
                        index: 'user',
                        title: '用户管理'
                    },
                    {
                        index: '2',
                        title: '文章管理',
                        subs: [
                            {
                                index: '/articlelist',
                                title: '文章列表'
                            },
                            {
                                index: '/articlesort',
                                title: '分类管理'
                            },
                            {
                                index: '/article/0',
                                title: '添加文章'
                            }
                        ]
                    },
                    {
                        index: '3',
                        title: '音乐管理',
                        subs: [
                            {
                                index: '/musicList',
                                title: '音乐列表'
                            },
                            {
                                index: '/musicsort',
                                title: '分类管理'
                            },
                            {
                                index: '/music/0',
                                title: '添加音乐'
                            }
                        ]
                    },
                    {
                        index: '4',
                        title: '论坛管理',
                        subs: [
                            {
                                index: '/forumlist',
                                title: '论坛列表'
                            },
                            {
                                index: '/forumsort',
                                title: '分类管理'
                            }
                        ]
                    },
                    {
                        index: '5',
                        title: '测试管理',
                        subs: [
                            {
                                index: '/testlist',
                                title: '测试列表'
                            },
                            {
                                index: '/testsort',
                                title: '分类管理'
                            },
                            {
                                index: '/addtest',
                                title: '添加测试'
                            }
                        ]
                    },
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 250px;
        left: 0;
        top: 70px;
        bottom:0;
        background: #2E363F;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
