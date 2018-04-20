const Mock = require('mockjs');
const urls ={
    '/mapis/admin/login': {
        'state|1': [0, 1],
        'msg': ''
    },
    /*用户管理*/
    '/mapis/user/getUsers': {
        'state': 1,
        'msg': '',
        'list|10': [
            {
                'user_id|+1': 13123,
                'account': '@ctitle(10)',
                'nickname': '@ctitle(10)',
                'sex|1': ['0', '1'],
                'birthday': '@date("yyyy-MM-dd")',
                'signature': '@ctitle(30)'
            }
        ],
        'total|+10': 50
    },
    '/mapis/record/getUserRecordsByUserId': {
        'state': 1,
        'msg': '',
        'list|12': [
            {
                'record_id|+1': 13123,
                'user_name': '@ctitle(10)',
                'test_name': '@ctitle(20)',
                'test_result': '@ctitle(100)',
                'test_date': '@date("yyyy-MM-dd")'
            }
        ]
    },
    '/mapis/user/searchUser': {
        'state': 1,
        'msg': '',
        'list': [
            {
                'user_id|+1': 13123,
                'account': '@ctitle(10)',
                'nickname': '@ctitle(10)',
                'sex|1': ['0', '1'],
                'birthday': '@date("yyyy-MM-dd")',
                'signature': '@ctitle(30)',
            }
        ],
        'total': 1
    },
    '/mapis/record/changeRecordStatus': {
        'state': 1,
        'msg': ''
    },
    /*end*/

    /*文章管理*/
    '/mapis/article/getLabels': {
        'state': 1,
        'msg': '',
        'list|12': [
            {
                'article_type_id|1': [1, 2, 3, 4, 5],
                'article_type_name': '@ctitle(5)',
                'article_type_status': true
            }
        ]
    },
    '/mapis/article/changeLabelStatus': {
        'state': 1,
        'msg': ''
    },
    '/mapis/article/addLabel': {
        'state': 1,
        'msg': ''
    },
    '/mapis/article/getArticleList': {
        'state': 1,
        'msg': '',
        'list|12': [
            {
                'article_id|+2': 11,
                'title': '@ctitle(15)',
                'upload_date': '@date()',
                'typeName': '@ctitle(5)',
                'typeId|1': [1, 2, 3, 4, 5],
                'author': '@ctitle(15)',
                'description': '@ctitle(100)',
                'content': '@ctitle(500)',
                'read_num|+10': 200,
                'picture_addr|1': []
            }
        ],
        total: 200
    },
    //字段需要严格一致，不可多
    '/mapis/article/getArticleById': {
        'state': 1,
        'msg': '',
        'list': {
            'article_id|+2': 11,
            'title': '@ctitle(15)',
            'upload_date': '@date()',
            /*'typeName': '@ctitle(5)',*/
            'typeId|1': [1, 2, 3, 4, 5],
            'author': '@ctitle(15)',
            'description': '@ctitle(100)',
            'content': '@ctitle(500)',
            'read_num|+10': 200,
            'picture_addr': '/static/img/img.jpg'
        }
    },
    '/mapis/article/addArticle': {
        'state': 1,
        'msg': '',
        'articleId|+12': 2324
    },
    '/mapis/article/editArticle': {
        'state': 1,
        'msg': ''
    },
    '/mapis/article/getFirstLevelComment': {
        'state': 1,
        'msg': '',
        'list|10': [
            {
                'comment_id|+5': 32424,
                'user_name': '@ctitle(10)',
                'comment_date': '@date()',
                'content': '@ctitle(100)'
            }
        ]
    },
    '/mapis/article/getMoreLevelComment': {
        'state': 1,
        'msg': '',
        'list|10': [
            {
                'ml_comment_id|+5': 32488,
                'comment_id|+5': 1111,
                'user_one': '@ctitle(10)',  //昵称
                'user_two': '@ctitle(10)',     //昵称
                'aml_comment_date': '@date()',
                'aml_content': '@ctitle(100)'
            }
        ]
    },
    '/mapis/article/deleteFirstLevelComment': {
        'state': 1,
        'msg': ''
    },
    '/mapis/article/deleteMoreLevelComment': {
        'state': 1,
        'msg': ''
    },
    '/mapis/article/deleteArticles': {
        'state': 1,
        'msg': ''
    },
    '/mapis/article/searchArticles': {
        'state': 1,
        'msg': '',
        'list|4': [
            {
                'article_id|+2': 11,
                'title': '@ctitle(15)',
                'upload_date': '@date()',
                'typeName': '@ctitle(5)',
                'typeId|1': [1, 2, 3, 4, 5],
                'author': '@ctitle(15)',
                'description': '@ctitle(100)',
                'content': '@ctitle(500)',
                'read_num|+10': 200,
                'picture_addr|1': []
            }
        ],
        'total': 4
    },
    '/mapis/music/getMusicList': {
        'state': 1,
        'msg': '',
        'list|10': [
            {
                'music_id|+1': 1,
                'typeName': '@ctitle(5)',
                'typeId|1': [1, 2, 3, 4, 5],
                'name': '@ctitle(10)',
                'musician': '@ctitle(10)',
                'upload_date': '@date()',
                'description': '@ctitle(60)',
                'play_num|+100': 1,
                'img_addr|1': ['/static/img/img.jpg'],
                'save_addr|1': ['/static/song/song1.mp3', '/static/song/song2.mp3']
            }
        ],
        'total': 200
    },
    '/mapis/music/getMusicById': {
        'state': 1,
        'msg': '',
        'list': {
            'music_id|+1': 1,
            /*'typeName': '@ctitle(5)',*/
            'typeId|1': [1, 2, 3, 4, 5],
            'name': '@ctitle(10)',
            'musician': '@ctitle(10)',
            'upload_date': '@date()',
            'description': '@ctitle(60)',
            'play_num|+100': 1,
            'img_addr|1': ['/static/img/img.jpg'],
            'save_addr|1': ['/static/song/song1.mp3', '/static/song/song2.mp3']
        }
    },
    '/mapis/music/getLabels': {
        'state': 1,
        'msg': '',
        'list|12': [
            {
                'music_label_id|1': [1, 2, 3, 4, 5],
                'music_label_name': '@ctitle(5)',
                'music_label_status': true
            }
        ]
    },
    /*入参就是一个formData*/
    '/mapis/music/editMusic': {
        'state': 1,
        'msg': ''
    },
    '/mapis/music/addMusic': {
        'state': 1,
        'msg': '',
        'musicId|+12': 2324
    },
    '/mapis/music/searchMusics': {
        'state': 1,
        'msg': '',
        'list|4': [
            {
                'music_id|+1': 1,
                'typeName': '@ctitle(5)',
                'typeId|1': [1, 2, 3, 4, 5],
                'name': '@ctitle(10)',
                'musician': '@ctitle(10)',
                'upload_date': '@date()',
                'description': '@ctitle(60)',
                'play_num|+100': 1,
                'img_addr|1': ['/static/img/img.jpg'],
                'save_addr|1': ['/static/song/song1.mp3', '/static/song/song2.mp3']
            }
        ],
        'total': 4
    },
    '/mapis/music/deleteMusics': {
        'state': 1,
        'msg': ''
    },
    '/mapis/music/getLabels': {
        'state': 1,
        'msg': '',
        'list|12': [
            {
                'music_label_id|1': [1, 2, 3, 4, 5],
                'music_label_name': '@ctitle(5)',
                'music_label_status': true
            }
        ]
    },
    '/mapis/music/changeLabelStatus': {
        'state': 1,
        'msg': ''
    },
    '/mapis/music/addLabel': {
        'state': 1,
        'msg': ''
    },
    /*论坛*/
    '/mapis/forum/getForumList': {
        'state': 1,
        'msg': '',
        'list|12': [
            {
                'forum_id|+2': 121,
                'nickname': '@ctitle(6)',
                'title': '@ctitle(15)',
                'publish_date': '@date()',
                'typeName': '@ctitle(5)',
                'typeId|1': [1, 2, 3, 4, 5],
                'content': '@ctitle(15)'
            }
        ],
        total: 200
    },
    '/mapis/forum/searchForums': {
        'state': 1,
        'msg': '',
        'list|4': [
            {
                'forum_id|+2': 121,
                'nickname': '@ctitle(6)',
                'title': '@ctitle(15)',
                'publish_date': '@date()',
                'typeName': '@ctitle(5)',
                'typeId|1': [1, 2, 3, 4, 5],
                'content': '@ctitle(15)'
            }
        ],
        'total': 4
    },
    '/mapis/forum/deleteForums': {
        'state': 1,
        'msg': ''
    },
    '/mapis/forum/getFirstLevelComment': {
        'state': 1,
        'msg': '',
        'list|10': [
            {
                'comment_id|+5': 32424,
                'user_name': '@ctitle(10)',
                'comment_date': '@date()',
                'content': '@ctitle(100)'
            }
        ]
    },
    '/mapis/forum/getMoreLevelComment': {
        'state': 1,
        'msg': '',
        'list|10': [
            {
                'ml_comment_id|+5': 32488,
                'comment_id|+5': 1111,
                'user_one': '@ctitle(10)',  //昵称
                'user_two': '@ctitle(10)',     //昵称
                'fml_comment_date': '@date()',
                'fml_content': '@ctitle(100)'
            }
        ]
    },
    '/mapis/forum/deleteFirstLevelComment': {
        'state': 1,
        'msg': ''
    },
    '/mapis/forum/deleteMoreLevelComment': {
        'state': 1,
        'msg': ''
    },
    '/mapis/forum/getLabels': {
        'state': 1,
        'msg': '',
        'list|12': [
            {
                'forum_label_id|1': [1, 2, 3, 4, 5],
                'forum_label_name': '@ctitle(5)',
                'forum_label_status': true
            }
        ]
    },
    '/mapis/forum/changeLabelStatus': {
        'state': 1,
        'msg': ''
    },
    '/mapis/forum/addLabel': {
        'state': 1,
        'msg': ''
    },

    /*测试*/
    '/mapis/test/getTestList': {
        'state': 1,
        'msg': '',
        'list|10': [
            {
                'test_id|+1': 343,
                'test_name': '@ctitle(10)',
                'test_num|+10': 34,
                'typeName': '@ctitle(10)',
                'picture_addr': '/static/img/img.jpg'
            }
        ]
    },
    '/mapis/test/getTestById': {
        'state': 1,
        'msg': '',
        'list': {
            'test_id|+1': 343,
            'test_name': '@ctitle(10)',
            'test_num|+10': 34,
            'typeId|1': [1, 2, 3, 4, 5],
            'picture_addr': '/static/img/img.jpg'
        }
    },
    '/mapis/test/editTestPaper': {
        'state': 1,
        'msg': ''
    },
    '/mapis/test/addTestPaper': {
        'state': 1,
        'msg': '',
        'testId|+12': 2324
    },
    '/mapis/test/getQuestions': {
        'state': 1,
        'msg': '',
        'list|2': [
            {
                'title_id|+2': 234,
                'test_id|+1': 2312,
                'title_name': '@ctitle(10)',
                'choose_one': '@ctitle(20)',
                'choose_two': '@ctitle(20)',
                'choose_three': '@ctitle(20)',
                'choose_four': '@ctitle(20)'
            }
        ]
    },
    '/mapis/test/editQuestions': {
        'state': 1,
        'msg': ''
    },
    '/mapis/test/deleteTestQuestions': {
        'state': 1,
        'msg': ''
    },
    '/mapis/test/addQuestions': {
        'state': 1,
        'msg': ''
    },
    '/mapis/test/getAnswer': {
        'state': 1,
        'msg': '',
        'list': {
            'answer_id|+2': 234,
            'test_id|+1': 2312,
            'region_one': '@ctitle(10)',
            'region_two': '@ctitle(20)',
            'region_three': '@ctitle(20)'
        }
    },
    '/mapis/test/editAnswer': {
        'state': 1,
        'msg': ''
    },
    '/mapis/test/addAnswer': {
        'state': 1,
        'msg': ''
    },
    '/mapis/test/searchTest': {
        'state': 1,
        'msg': '',
        'list|3': [
            {
                'test_id|+1': 343,
                'test_name': '@ctitle(10)',
                'test_num|+10': 34,
                'typeName': '@ctitle(10)',
                'picture_addr': '/static/img/img.jpg'
            }
        ],
        'total': 3
    },
    '/mapis/test/deleteTest': {
        'state': 1,
        'msg': ''
    },
    '/mapis/test/getLabels': {
        'state': 1,
        'msg': '',
        'list|12': [
            {
                'paper_label_id|1': [1, 2, 3, 4, 5],
                'paper_label_name': '@ctitle(5)',
                'paper_label_status': true
            }
        ]
    },
    '/mapis/test/changeLabelStatus': {
        'state': 1,
        'msg': ''
    },
    '/mapis/test/addLabel': {
        'state': 1,
        'msg': ''
    },

};

Mock.mock(/mapis/, (req, res) => {
   let url = req.url;
   let keys = Object.keys(urls);

   if(keys.includes(url)) {
       return Mock.mock(urls[url]);
   }
});
