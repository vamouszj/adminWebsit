const Mock = require('mockjs');
const urls ={
    '/apis/admin/login': {
        'state|1': [0, 1],
        'msg': ''
    },
    '/apis/user/getUsers': {
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
    '/apis/record/getUserRecordsByUserId': {
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
    '/apis/user/searchUser': {
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
    '/apis/record/changeRecordStatus': {
        'state': 1,
        'msg': ''
    }
};

Mock.mock(/apis/, (req, res) => {
   let url = req.url;
   let keys = Object.keys(urls);

   if(keys.includes(url)) {
       return Mock.mock(urls[url]);
   }
});
