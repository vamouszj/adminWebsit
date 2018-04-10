<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-setting"></i> 用户管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="ms-doc">
            <div class="table">
                <div class="handle-box mb15">
                    <el-button type="primary" icon="delete" class="handle-del mr10" @click="changeUsersState">批量修改状态</el-button>
                    <el-button type="primary" icon="search" @click="search" class="right">搜索</el-button>
                    <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10 right" style="width: 200px;"></el-input>

                </div>
                <el-table :data="tableData" border style="width: 100%;" ref="multipleTable" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column prop="user_id" label="ID" sortable width="150">
                    </el-table-column>
                    <el-table-column prop="account" label="账号" width="120">
                    </el-table-column>
                    <el-table-column prop="nickname" label="昵称" width="120">
                    </el-table-column>
                    <el-table-column label="性别" width="80">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.sex == '0' ? '男' : '女' }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="birthday" label="生日" width="120">
                    </el-table-column>
                    <el-table-column prop="signature" label="个性签名" width="200">
                    </el-table-column>
                    <el-table-column label="状态" width="100">
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.state ? '正常' : '锁定中' }}</span>
                        </template>
                    </el-table-column>
                    <!--                    <el-table-column label="操作" width="100">
                                            <template scope="scope">
                                                <el-button size="small" type="info"
                                                           @click="handleLock(scope.$index, scope.row)">修改状态</el-button>
                                            </template>
                                        </el-table-column>-->
                </el-table>
                <div class="pagination">
                    <el-pagination
                        @current-change ="handleCurrentChange"
                        layout="prev, pager, next"
                        :total="1000">
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
                tableData: [],
                cur_page: 1,
                multipleSelection: [],  // 选中的数据
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false
            }
        },
        created(){
            this.getData();
        },
        computed: {
            /*            data(){
                            const self = this;
                            return self.tableData.filter(function(d){
                                let is_del = false;
                                for (let i = 0; i < self.del_list.length; i++) {
                                    if(d.name === self.del_list[i].name){
                                        is_del = true;
                                        break;
                                    }
                                }
                                if(!is_del){
                                    if(d.address.indexOf(self.select_cate) > -1 &&
                                        (d.name.indexOf(self.select_word) > -1 ||
                                            d.address.indexOf(self.select_word) > -1)
                                    ){
                                        return d;
                                    }
                                }
                            })
                        }*/
        },
        methods: {
            handleCurrentChange(val){
                this.cur_page = val;
                this.getData();
            },
            getData(){
                let vm = this;

                vm.$axios.post('/apis/user/getUsers', {page:self.cur_page}).then((res) => {
                    vm.tableData = res.data.list;
                });
            },
            search(){
                this.is_search = true;
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row) {
                this.$message('编辑第'+(index+1)+'行');
            },
            /*            // 单个锁定/解除的处理
                        handleLock(index, row) {
                            //this.$message.error('删除第'+(index+1)+'行');
                            let vm = this;

                            row.state = !row.state;

                            console.log({users: [row]});
                            vm.$axios.post('/apis/user/changeUserState', {users: [row]}).then((res) => {
                                if(res.data.state) {
                                    vm.getData();
                                }
                            });
                        },*/
            changeUsersState(){
                let vm = this;

                if(vm.multipleSelection.length <= 0) {
                    vm.$message.error('请至少选择一条数据');
                    return;
                }

                vm.multipleSelection = vm.multipleSelection.map((item) => {
                    let obj = {};

                    Object.assign(obj, item);
                    obj.state = !obj.state;

                    return obj;
                });

                vm.$axios.post('/apis/user/changeUserState', {users: vm.multipleSelection}).then((res) => {
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
