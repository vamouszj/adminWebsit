<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 文章管理</el-breadcrumb-item>
                <el-breadcrumb-item>文章列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <div class="table">
                <div class="handle-box mb15">
                    <el-button type="primary" icon="delete" class="handle-del mr10" @click="deleteArticles">批量删除</el-button>
                    <el-button type="primary" icon="search" @click="search" class="right">搜索</el-button>
                    <el-input v-model="selectWord" placeholder="筛选关键词" class="handle-input mr10 right" style="width: 200px;"></el-input>

                </div>
                <el-table :data="tableData" border style="width: 100%;" ref="multipleTable" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column label="#" width="70">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{scope.$index + 1}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="title" label="标题" width="200">
                    </el-table-column>
                    <el-table-column prop="upload_date" label="上传日期" width="120">
                    </el-table-column>
                    <el-table-column prop="typeName" label="类型" width="100">
                    </el-table-column>
                    <el-table-column prop="author" label="作者" width="200">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button size="small" type="info"
                                       @click="checkArticleDetails(scope.row)">详情</el-button>
                            <el-button size="small"
                                       @click="getFirstLevelComment(scope.row)">一级评论</el-button>
                            <el-button size="small"
                                       @click="getMoreLevelComment(scope.row)">多级评论</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="pagination" v-if="total > 10">
                    <el-pagination
                        @current-change="handleCurrentChange"
                        :current-page.sync="currentPage"
                        :page-size="10"
                        layout="total, prev, pager, next"
                        :total="total">
                    </el-pagination>
                </div>
            </div>

            <el-dialog title="一级评论" :visible.sync="firstLevelVisible" style="width: 110%;margin-left: -8%;">
                <el-table :data="firstLevelComment">
                    <el-table-column property="user_name" label="账号" width="150"></el-table-column>
                    <el-table-column property="comment_date" label="日期" width="120"></el-table-column>
                    <el-table-column property="content" label="内容" width="330"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button size="small" type="info"
                                       @click="deleteFirstComment(scope.row.comment_id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-dialog>

            <el-dialog title="多级评论" :visible.sync="moreLevelVisible" style="width: 130%;margin-left: -14%;">
                <el-table :data="moreLevelComment">
                    <el-table-column property="user_one" label="评论者" width="150"></el-table-column>
                    <el-table-column property="user_two" label="被评论者" width="150"></el-table-column>
                    <el-table-column property="aml_comment_date" label="日期" width="120"></el-table-column>
                    <el-table-column property="aml_content" label="内容" width="330"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button size="small" type="info"
                                       @click="deleteMoreComment(scope.row.ml_comment_id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-dialog>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'user',
        data() {
            return {
                tableData: [],
                firstLevelComment: [],
                moreLevelComment: [],
                currentPage: 1,
                multipleSelection: [],  // 选中的数据
                select_cate: '',
                selectWord: '',
                total: '',
                firstLevelVisible: false,
                moreLevelVisible: false,
                currentArticleId: ''
            }
        },
        created(){
            this.getData();

        },
        methods: {
            handleCurrentChange(val){
                this.currentPage = val;
                this.getData();
            },
            getData(){
                let vm = this;

                vm.$axios.post('/mapis/article/getArticleList', {page:vm.currentPage}).then((res) => {
                    if(res.data.state) {
                        vm.tableData = res.data.list;
                        vm.total = res.data.total;
                    }
                });
            },
            search(){
                let vm = this;

                if(typeof vm.selectWord != 'string'  || vm.selectWord.length <= 0) {
                    vm.$message.error('搜索内容不可为空');
                    return;
                }

                vm.$axios.post('/mapis/article/searchArticles', {keyWord: vm.selectWord}).then((res) => {
                    if(res.data.state) {
                        vm.tableData = res.data.list;
                        vm.total = res.data.total;
                    }
                })
            },
            checkArticleDetails(row) {
                //this.$message.error('删除第'+(index+1)+'行');
                let vm = this;

                vm.$router.push({
                    name: 'article',
                    params: {
                        articleId: row.article_id
                    }
                })
            },
            deleteArticles(){
                let vm = this;
                let articlesId = [];

                if(vm.multipleSelection.length <= 0) {
                    vm.$message.error('请至少选择一条数据');
                    return;
                }

                articlesId = vm.multipleSelection.map((item) => {
                    return item.article_id;
                });


                vm.$axios.post('/mapis/article/deleteArticles', {articlesId: articlesId}).then((res) => {
                    vm.multipleSelection = [];
                    if(res.data.state) {
                        vm.getData();
                    }
                });

            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            deleteMoreComment(commentId) {
                let vm = this;

                vm.$axios.post('/mapis/article/deleteMoreLevelComment', {commentId: commentId}).then((res) => {
                    if(res.data.state) {
                        vm.$message('复合评论删除成功');
                    }
                });
            },
            deleteFirstComment(commentId) {
                let vm = this;

                vm.$axios.post('/mapis/article/deleteFirstLevelComment', {commentId: commentId}).then((res) => {
                    if(res.data.state) {
                        vm.$message('评论删除成功');
                    }
                });
            },
            getMoreLevelComment(row) {
                let vm = this;

                vm.currentArticleId = row.article_id;
                vm.$axios.post('/mapis/article/getMoreLevelComment', {articleId: row.article_id}).then((res) => {
                    if(res.data.state) {
                        vm.moreLevelComment = res.data.list;
                        vm.moreLevelVisible = true;
                    }
                });
            },
            getFirstLevelComment(row) {
                let vm = this;

                vm.currentArticleId = row.article_id;
                vm.$axios.post('/mapis/article/getFirstLevelComment', {articleId: row.article_id}).then((res) => {
                    if(res.data.state) {
                        vm.firstLevelComment = res.data.list;
                        vm.firstLevelVisible = true;
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .ms-doc{
        width:100%;
        max-width: 980px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
    }
    .ms-doc h3{
        padding: 9px 10px 10px;
        margin: 0;
        font-size: 14px;
        line-height: 17px;
        background-color: #f5f5f5;
        border: 1px solid #d8d8d8;
        border-bottom: 0;
        border-radius: 3px 3px 0 0;
    }
    .ms-doc article{
        padding: 45px;
        word-wrap: break-word;
        background-color: #fff;
        border: 1px solid #ddd;
        border-bottom-right-radius: 3px;
        border-bottom-left-radius: 3px;
    }
    .ms-doc article h1{
        font-size:32px;
        padding-bottom: 10px;
        margin-bottom: 15px;
        border-bottom: 1px solid #ddd;
    }
    .ms-doc article h2 {
        margin: 24px 0 16px;
        font-weight: 600;
        line-height: 1.25;
        padding-bottom: 7px;
        font-size: 24px;
        border-bottom: 1px solid #eee;
    }
    .ms-doc article p{
        margin-bottom: 15px;
        line-height: 1.5;
    }
    .ms-doc article .el-checkbox{
        margin-bottom: 5px;
    }
</style>

