<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 测试管理</el-breadcrumb-item>
                <el-breadcrumb-item>测试列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <div class="table">
                <div class="handle-box mb15">
                    <el-button type="primary" icon="delete" class="handle-del mr10" @click="deleteTest">批量删除</el-button>
                    <el-button type="primary" icon="search" @click="search" class="right">搜索</el-button>
                    <el-input v-model="selectWord" placeholder="筛选关键词" class="handle-input mr10 right" style="width: 200px;"></el-input>

                </div>
                <el-table :data="tableData" border style="width: 100%;" ref="multipleTable" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column label="#" width="60">
                        <template slot-scope="scope">
                            <span style="margin-left: 6px">{{scope.$index + 1}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="test_name" label="测试标题" width="220">
                    </el-table-column>
                    <el-table-column prop="test_name" label="类型" width="170">
                    </el-table-column>
                    <el-table-column prop="test_num" label="测试人数" width="100">
                    </el-table-column>
                    <el-table-column label="图片" width="150">
                        <template slot-scope="scope">
                            <img :src="scope.row.picture_addr" style="width: 100px">
                        </template>
                    </el-table-column>
                    <el-table-column label="测试题目" width="95">
                        <template slot-scope="scope">
                            <el-button size="small"
                                       @click="checkTestQuestionDetails(scope.row)">查看</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="测试结果" width="95">
                        <template slot-scope="scope">
                            <el-button size="small"
                                       @click="checkTestAnswerDetails(scope.row)">查看</el-button>
                        </template>
                    </el-table-column>

                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button size="small" type="info"
                                       @click="editTestDetails(scope.row)">编辑</el-button>
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
        </div>

    </div>
</template>

<script>
    export default {
        name: "test-list",
        data() {
            return {
                tableData: [],
                currentPage: 1,
                multipleSelection: [],  // 选中的数据
                selectWord: '',
                total: '',
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

                vm.$axios.post('/mapis/test/getTestList', {page:vm.currentPage}).then((res) => {
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

                vm.$axios.post('/mapis/test/searchTest', {keyWord: vm.selectWord}).then((res) => {
                    if(res.data.state) {
                        vm.tableData = res.data.list;
                        vm.total = res.data.total;
                    }
                })
            },
            checkTestQuestionDetails(row) {
                let vm = this;

                vm.$router.push({
                    name: 'testquestion',
                    params: {
                        testId: row.test_id
                    }
                })
            },
            checkTestAnswerDetails(row) {
                let vm = this;

                vm.$router.push({
                    name: 'testanswer',
                    params: {
                        testId: row.test_id
                    }
                })
            },
            editTestDetails(row) {
                let vm = this;

                vm.$router.push({
                    name: 'testpaper',
                    params: {
                        testId: row.test_id
                    }
                })
            },
            deleteTest(){
                let vm = this;
                let testsId = [];

                if(vm.multipleSelection.length <= 0) {
                    vm.$message.error('请至少选择一条数据');
                    return;
                }

                testsId = vm.multipleSelection.map((item) => {
                    return item.test_id;
                });

                vm.$axios.post('/mapis/test/deleteTest', {testsId: testsId}).then((res) => {
                    vm.multipleSelection = [];
                    if(res.data.state) {
                        vm.getData();
                    }
                });
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
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

