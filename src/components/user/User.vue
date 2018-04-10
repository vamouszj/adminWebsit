<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-setting"></i> 用户管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <el-dialog title="测试记录" :visible.sync="dialogRecordVisible" style="width: 130%;margin-left: -15%;">
            <el-table :data="recordTableData" style="width: 100%">
                <el-table-column label="#" width="70">
                    <template slot-scope="scope">
                        {{scope.$index + 1}}
                    </template>
                </el-table-column>
                <el-table-column property="user_name" label="用户名" width="180"></el-table-column>
                <el-table-column property="test_name" label="测试标题" width="180"></el-table-column>
                <el-table-column property="test_date" label="测试时间" width="130"></el-table-column>
                <el-table-column label="测试结果" width="300">
                    <template slot-scope="scope">
                        {{scope.row.test_result.substring(0, 80)}}
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="95" fixed="right">
                    <template slot-scope="scope">
                        <el-button size="small" type="info" @click="changeRecordState(scope.row.record_id)">修改状态</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>

        <div class="ms-doc">
            <div class="table">
                <div class="handle-box mb15 clearfix">
                    <el-button type="primary" icon="view" class="handle-del mr10" @click="changeUsersState">查看测试记录</el-button>
                    <el-button type="primary" icon="search" @click="search" class="right">搜索</el-button>
                    <el-input v-model="searchAccount" placeholder="筛选关键词" class="handle-input mr10 right" style="width: 200px;"></el-input>
                </div>
                <el-table :data="userTableData" border style="width: 100%;" ref="multipleTable" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column prop="user_id" label="ID" sortable width="150" >
                    </el-table-column>
                    <el-table-column prop="account" label="账号" width="200">
                    </el-table-column>
                    <el-table-column prop="nickname" label="昵称" width="200">
                    </el-table-column>
                    <el-table-column label="性别" width="100">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.sex == '0' ? '男' : '女' }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="birthday" label="生日" width="150">
                    </el-table-column>
                    <el-table-column prop="signature" label="个性签名" width="430">
                    </el-table-column>
                    <el-table-column label="操作" width="150">
                        <template slot-scope="scope">
                            <el-button size="small" type="info"
                                       @click="checkRecords(scope.$index, scope.row)">查看测试记录</el-button>
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
        name: 'user',
        data() {
            return {
                url: './static/vuetable.json',
                userTableData: [],
                recordTableData: [],
                currentPage: 1,
                multipleSelection: [],  // 选中的数据
                select_cate: '',
                searchAccount: '',
                del_list: [],
                is_search: false,
                dialogRecordVisible: false,
                total: ''
            }
        },
        created(){
            this.getData();
        },
        computed: {
        },
        methods: {
            handleCurrentChange(val){
                this.currentPage = val;
                this.getData();
            },
            getData(){
                let vm = this;

                vm.$axios.post('/apis/user/getUsers', {page: vm.currentPage}).then((res) => {
                    vm.userTableData = res.data.list;

                    vm.total = res.data.total;
                });
            },
            search(){
                let vm = this;

                if(vm.searchAccount) {
                    vm.$axios.post('/apis/user/searchUser', {account: vm.searchAccount}).then((res) => {
                        vm.userTableData = res.data.list;

                        vm.total = res.data.total;
                        vm.searchAccount = '';
                    });
                }else {
                    this.$message('请输入要搜索的内容');
                }
            },
            checkRecords(index, row) {
                //this.$message.error('删除第'+(index+1)+'行');
                let vm = this;

                vm.$axios.post('/apis/record/getUserRecordsByUserId', {ids: [row.user_id]}).then((res) => {
                    if(res.data.state) {
                        // 弹出框展示测试记录
                        vm.recordTableData = res.data.list;
                        vm.dialogRecordVisible = true;

                    }
                });
            },
            changeUsersState(){
                let vm = this;
                let idAry = [];

                if(vm.multipleSelection.length <= 0) {
                    vm.$message.error('请至少选择一位用户');
                    return;
                }

                idAry = vm.multipleSelection.map((item) => {
                    return item.user_id;
                });

                vm.$refs.multipleTable.clearSelection();

                vm.$axios.post('/apis/record/getUserRecordsByUserId', {ids: idAry}).then((res) => {
                    if(res.data.state) {
                        vm.recordTableData = res.data.list;
                        vm.dialogRecordVisible = true;
                    }
                });
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            changeRecordState(recordId) {
                let vm = this;

                vm.$axios.post('/apis/record/changeRecordStatus', {recordId: recordId}).then((res) => {
                    if(res.data.state) {
                        this.$message('状态已修改');
                    }else {
                        vm.$message.error('状态修改失败');
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .ms-doc{
        width:100%;
        max-width: 1500px;
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
