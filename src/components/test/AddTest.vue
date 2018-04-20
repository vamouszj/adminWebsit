<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 测试管理</el-breadcrumb-item>
                <el-breadcrumb-item>添加测试</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-steps :space="240" :active="step" :finish-status="status" style="margin: 10px 30px">
            <el-step title="添加测试"></el-step>
            <el-step title="添加测试题"></el-step>
            <el-step title="添加答案"></el-step>
        </el-steps>

        <div class="handle-box">
            <div style="margin: 60px auto" v-if="step == 0">
                <test-paper :showCrumb="showCrumb"  @paper="addQuestion"></test-paper>
            </div>

            <div style="margin: 60px auto" v-if="step == 1">
                <test-question :newId="testId" :showCrumb="showCrumb" @question="addResult"></test-question>
            </div>

            <div style="margin: 60px auto" v-if="step == 2">
                <test-answer :newId="testId" :showCrumb="showCrumb" @test="addFinished"></test-answer>
            </div>
        </div>
    </div>
</template>

<script>
    import TestPaper from './TestPaper'
    import TestQuestion from './TestQuestion'
    import TestAnswer from "./TestAnswer";
    export default {
        components: {
            TestAnswer,
            TestQuestion,
            TestPaper},
        name: "add-test",
        data() {
            return {
                showCrumb: false,
                step: 0,
                status: 'wait',
                testId: ''
            }
        },
        methods: {
            addQuestion(state, testId) {
                let vm = this;

                if(state) {
                    vm.step = 1;
                    vm.status = 'success';
                    vm.testId = testId;
                }else {
                    vm.$message.error('添加失败，请重新尝试');
                }
            },
            addResult(state) {
                let vm = this;

                if(state) {
                    vm.step = 2;
                }else {
                    vm.$message.error('添加失败，请重新尝试');
                }
            },
            addFinished(state) {
                let vm = this;

                if(state) {
                    vm.step = 3;

                    setTimeout(() => {
                        vm.$router.push('/testlist');
                    }, 500);
                }
            }
        }
    }
</script>

<style scoped>

</style>
