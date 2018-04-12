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
    /*end*/

    /*文章管理*/
    '/mapis/record/changeRecordStatus': {
        'state': 1,
        'msg': ''
    },
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
    //字段需要严格一致，不可多
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
    }


};

Mock.mock(/mapis/, (req, res) => {
   let url = req.url;
   let keys = Object.keys(urls);

   if(keys.includes(url)) {
       return Mock.mock(urls[url]);
   }
});
