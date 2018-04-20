<template>
    <div class="table">
        <div class="crumbs"  v-if="showCrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 测试管理</el-breadcrumb-item>
                <el-breadcrumb-item>问题</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <div class="handle-box mb15">
                <el-button type="primary" icon="edit" class="handle-del mr10" @click="editTestQuestion" v-if="disabled">编辑</el-button>
                <el-button type="primary" icon="check" class="handle-del mr10" @click="sendTestQuestions" v-show="!disabled">提交</el-button>
                <div style="float: right">
                    <el-button icon="plus" class="handle-del mr10" @click="addRow" v-show="!disabled">添加题目</el-button>
                    <el-button icon="delete" class="handle-del mr10" @click="deleteTestQuestion" v-if="disabled">批量删除</el-button>
                </div>
           </div>
            <div class="table">
                <el-table :data="tableData" border style="width: 100%;" ref="multipleTable" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55" v-if="disabled"></el-table-column>
                    <el-table-column label="#" width="70">
                        <template slot-scope="scope">
                            <span>{{scope.$index + 1}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="title_name" label="题目">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.title_name" placeholder="请输入选项" v-show="!disabled"></el-input>
                            <span v-show="disabled">{{scope.row.title_name}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="choose_one" label="选项1" width="180">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.choose_one" placeholder="请输入选项" v-show="!disabled"></el-input>
                            <span v-show="disabled">{{scope.row.choose_one ? scope.row.choose_one : ''}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="choose_two" label="选项2" width="180">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.choose_two" placeholder="请输入选项" v-show="!disabled"></el-input>
                            <span v-show="disabled">{{scope.row.choose_two ? scope.row.choose_two : ''}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="choose_three" label="选项3" width="180">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.choose_three" placeholder="请输入选项" v-show="!disabled"></el-input>
                            <span v-show="disabled">{{scope.row.choose_three ? scope.row.choose_three : ''}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="choose_four" label="选项4" width="180">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.choose_four" placeholder="请输入选项" v-show="!disabled"></el-input>
                            <span v-show="disabled">{{scope.row.choose_four ? scope.row.choose_four : ''}}</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>

    </div>
</template>

<script>
    import ElButton from "element-ui/packages/button/src/button";

    export default {
        components: {ElButton},
        name: "test-question",
        props: {
            showCrumb: {
                type: Boolean,
                required: false
            },
            newId: {
                type: Number,
                required: false
            }
        },
        data() {
            let vm = this;
            return {
                testId: this.$route.params.testId,
                tableData: [],
                disabled: false,
            }
        },
        mounted() {
            let vm = this;

            if(vm.testId > 0) {
                vm.disabled = true;
                vm.getTestQuestions(vm.testId);
            }else {
                vm.disabled = false;
                vm.addRow();
            }
        },
        methods:{
            deleteTestQuestion(){
                let vm = this;
                let titlesId = [];

                if(vm.multipleSelection.length <= 0) {
                    vm.$message.error('请至少选择一条数据');
                    return;
                }

                titlesId = vm.multipleSelection.map((item) => {
                    return item.title_id;
                });

                vm.$axios.post('/mapis/test/deleteTestQuestions', {titlesId: titlesId}).then((res) => {
                    vm.multipleSelection = [];
                    if(res.data.state) {
                        vm.getTestQuestions();
                    }
                });
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            addRow() {
                let vm = this;
                if(vm.tableData.length > 10) {
                    vm.$message.error('题目过多，请慎重');
                }else {
                    vm.tableData.push({
                        'title_name': '',
                        'choose_one': '',
                        'choose_two': '',
                        'choose_three': '',
                        'choose_four': ''
                    })
                }
            },
            editTestQuestion() {
                let vm = this;
                vm.disabled = false;
            },
            sendTestQuestions() {
                let vm = this;
                if(vm.testId > 0) {
                    vm.sendOldTestQuestions();
                }else {
                    vm.sendNewTestQuestions();
                }
            },
            sendOldTestQuestions() {
                let vm = this;

                let questionAry = vm.sortingData();
                vm.$axios.post('/mapis/test/editQuestions', {questions: questionAry, testId: vm.testId}).then((res) => {
                    if(res.data.state) {
                        vm.getTestQuestions(vm.testId);
                        vm.disabled = true;
                    }
                })
            },
            sendNewTestQuestions() {
                let vm = this;

                let questionAry = vm.sortingData();
                vm.$axios.post('/mapis/test/addQuestions', {questions: questionAry, testId: vm.newId}).then((res) => {
                    if(res.data.state) {
                        vm.$emit('question', true);
                    }else {
                        vm.$emit('question', false);
                    }
                })
            },
            sortingData() {
                let vm = this;
                let dataAry = [];

                vm.tableData.forEach((item, index) => {
                    let selectNum = 0;

                    if(item.title_name.length <= 0) {
                        return;
                    }

                    for(let key in item) {
                        if(key != 'title_name' && item[key].length > 0) {
                            selectNum++;
                        }
                    }

                    if(selectNum >= 2) {
                        dataAry.push(item);
                    }
                });

                if(dataAry.length >= 1) {
                    return dataAry;
                }
            },

            getTestQuestions() {
                let vm = this;

                vm.$axios.post('/mapis/test/getQuestions', {testId: vm.testId}).then((res) => {
                    if(res.data.state) {
                        vm.tableData = res.data.list;
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .file {
        position: relative;
        display: inline-block;
        background: #20A0FF;
        border: 1px solid #20A0FF;
        border-radius: 4px;
        padding: 4px 15px;
        overflow: hidden;
        color: #ffffff;
        text-decoration: none;
        text-indent: 0;
        line-height: 20px;
    }
    .file input {
        position: absolute;
        font-size: 100px;
        right: 0;
        top: 0;
        opacity: 0;
    }
    .file:hover {
        background: #2085C5;
        border-color: #2085C5;
        color: #ffffff;
        text-decoration: none;
    }
</style>
