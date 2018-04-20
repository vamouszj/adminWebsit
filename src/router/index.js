import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            component: resolve => require(['../components/Login/Login.vue'], resolve)
        },
        {
            path: '/user',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {
                    path: '/',
                    component: resolve => require(['../components/user/User.vue'], resolve)
                },
                {
                    path: '/articlelist',
                    component: resolve => require(['../components/article/ArticleList.vue'], resolve)
                },
                {
                    path: '/articlesort',
                    component: resolve => require(['../components/article/ArticleSort.vue'], resolve)
                },
                {
                    name: 'article',
                    path: '/article/:articleId',
                    component: resolve => require(['../components/article/addArticle.vue'], resolve)
                },
                {
                    path: '/musicList',
                    component: resolve => require(['../components/music/MusicList.vue'], resolve)
                },
                {
                    name: 'music',
                    path: '/music/:musicId',
                    component: resolve => require(['../components/music/AddMusic.vue'], resolve)
                },
                {
                    path: '/musicsort',
                    component: resolve => require(['../components/music/MusicSort.vue'], resolve)
                },
                {
                    path: '/forumlist',
                    component: resolve => require(['../components/forum/ForumList.vue'], resolve)
                },
                {
                    path: '/forumsort',
                    component: resolve => require(['../components/forum/ForumSort.vue'], resolve)
                },
                {
                    path: '/testlist',
                    component: resolve => require(['../components/test/TestList.vue'], resolve)
                },
                {
                    name: 'testpaper',
                    path: '/testpaper/:testId',
                    component: resolve => require(['../components/test/TestPaper.vue'], resolve)
                },
                {
                    name: 'testquestion',
                    path: '/testquestion/:testId',
                    component: resolve => require(['../components/test/TestQuestion.vue'], resolve)
                },
                {
                    name: 'testanswer',
                    path: '/testanswer/:testId',
                    component: resolve => require(['../components/test/TestAnswer.vue'], resolve)
                },
                {
                    name: 'addtest',
                    path: '/addtest',
                    component: resolve => require(['../components/test/AddTest.vue'], resolve)
                },
                {
                    name: 'testsort',
                    path: '/testsort',
                    component: resolve => require(['../components/test/TestSort.vue'], resolve)
                },


                {
                    path: '/vuetable',
                    component: resolve => require(['../components/page/VueTable.vue'], resolve)     // vue-datasource组件
                },
                {
                    path: '/baseform',
                    component: resolve => require(['../components/page/BaseForm.vue'], resolve)
                },
                {
                    path: '/vueeditor',
                    component: resolve => require(['../components/page/VueEditor.vue'], resolve)    // Vue-Quill-Editor组件
                },
                {
                    path: '/markdown',
                    component: resolve => require(['../components/page/Markdown.vue'], resolve)     // Vue-Quill-Editor组件
                },
                {
                    path: '/upload',
                    component: resolve => require(['../components/page/Upload.vue'], resolve)       // Vue-Core-Image-Upload组件
                },
                {
                    path: '/basecharts',
                    component: resolve => require(['../components/page/BaseCharts.vue'], resolve)   // vue-schart组件
                },
                {
                    path: '/drag',
                    component: resolve => require(['../components/page/DragList.vue'], resolve)    // 拖拽列表组件
                }
            ]
        },
    ]
})
