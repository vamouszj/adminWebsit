<template>
    <div class="table">
        <div class="crumbs"  v-if="showCrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 测试管理</el-breadcrumb-item>
                <el-breadcrumb-item>测试答案</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <div class="table">
                <el-form :model="answer" ref="article" label-width="120px" class="demo-admin">
                    <el-form-item prop="region_one" label="结论1">
                        <el-input type="textarea" :autosize="{minRows: 3, maxRows: 6}" v-model="answer.region_one" placeholder="请输入结论" :disabled="disabled"></el-input>
                    </el-form-item>
                    <el-form-item prop="region_two" label="结论2">
                        <el-input type="textarea" :autosize="{minRows: 3, maxRows: 6}" v-model="answer.region_two" placeholder="请输入结论" :disabled="disabled"></el-input>
                    </el-form-item>
                    <el-form-item prop="region_three" label="结论3">
                        <el-input type="textarea" :autosize="{minRows: 3, maxRows: 6}" v-model="answer.region_three" placeholder="请输入结论" :disabled="disabled"></el-input>
                    </el-form-item>
                </el-form>

                <el-button size="medium" type="info" class="right" v-if="disabled"  @click="disabled=false">修改</el-button>
                <el-button size="medium" type="info" class="right" v-else @click="sendAnswers">确定</el-button>

            </div>
        </div>

    </div>
</template>

<script>
    import ElButton from "element-ui/packages/button/src/button";

    export default {
        components: {ElButton},
        name: "test-answer",
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
                answer: {},
                disabled: false,
            }
        },
        mounted() {
            let vm = this;

            if(vm.testId > 0) {
                vm.disabled = true;
                vm.getTestResults();
            }else {
                vm.disabled = false;
            }
        },
        methods:{
            getTestResults() {
                let vm = this;

                vm.$axios.post('/mapis/test/getAnswer', {testId: vm.testId}).then((res) => {
                    if(res.data.state) {
                        vm.answer = res.data.list;
                    }
                })
            },
            sendAnswers() {
                let vm = this;

                if(vm.testId > 0) {
                    vm.editAnswers();
                }else {
                    vm.addAnswers();
                }
            },
            editAnswers() {
                let vm = this;

                if(vm.answer.region_one.length <= 0 || vm.answer.region_two.length <= 0 || vm.answer.region_three.length <= 0) {
                    vm.$message.error('内容不可为空');
                    return;
                }

                vm.$axios.post('/mapis/test/editAnswer', {answers: vm.answer, testId: vm.testId}).then((res) => {
                    if(res.data.state) {
                        vm.disabled = true;
                        vm.getTestResults();
                    }
                })
            },
            addAnswers() {
                let vm = this;

                if(vm.answer.region_one.length <= 0 || vm.answer.region_two.length <= 0 || vm.answer.region_three.length <= 0) {
                    vm.$message.error('内容不可为空');
                    return;
                }

                vm.$axios.post('/mapis/test/addAnswer', {answers: vm.answer, testId: vm.newId}).then((res) => {
                    if(res.data.state) {
                        vm.$emit('test', true);
                    }else {
                        vm.$emit('test', false);
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

