<template>
    <div class="table">
        <div class="crumbs" v-if="showCrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 测试管理</el-breadcrumb-item>
                <el-breadcrumb-item>测试</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <div class="table">
                <el-form :model="test" ref="test" label-width="120px" class="demo-admin">
                    <el-form-item prop="test_name" label="测试标题">
                        <el-input v-model="test.test_name" placeholder="请输入测试标题" :disabled="disabled"></el-input>
                    </el-form-item>
                    <el-form-item  label="类型">
                        <el-select v-model="test.typeId" placeholder="类型" @change="" :disabled="disabled">
                            <el-option v-for="(type, index) in typeList" :label="type.paper_label_name" :value="type.paper_label_id" :key="index" :disabled="disabled"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="test_num" label="测试人数" v-if="disabled">
                        <el-input v-model.number="test.test_num" placeholder="" :disabled="disabled"></el-input>
                    </el-form-item>
                    <el-form-item prop="picture_addr" label="照片">
                        <img :src="test.picture_addr" v-if="disabled" style="width: 270px;">

                        <span href="javascript:void 0;" class="file" v-else>选择文件
                            <input type="file" name="picture_addr"  multiple="multiple" ref="file">
                        </span>
                    </el-form-item>
                </el-form>

                <el-button size="medium" type="info" class="right" v-if="disabled"  @click="disabled=false">修改</el-button>
                <el-button size="medium" type="info" class="right" v-else @click="sendArticle">确定</el-button>

            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "test-paper",
        data() {
            let vm = this;
            return {
                testId: this.$route.params.testId,
                test: {

                },
                typeList: [],
                disabled: false,
            }
        },
        props: {
            showCrumb: {
                type: Boolean,
                required: false
            }
        },
        created() {
            this.getTestType();
        },
        mounted() {
            let vm = this;

            if(vm.testId > 0) {
                vm.disabled = true;
                vm.getTestById(vm.testId);
            }else {
                vm.test.test_num = 1;
            }
        },
        methods:{
            getTestType() {
                let vm = this;

                vm.$axios.post('/mapis/test/getLabels').then((res) => {
                    if(res.data.state) {
                        vm.typeList = res.data.list;
                    }
                })
            },
            getTestById(id) {
                let vm = this;

                vm.$axios.post('/mapis/test/getTestById', {testId: id}).then((res) => {
                    if(res.data.state) {
                        vm.test = res.data.list;
                    }
                });
            },
            getFormData(keyArray, formData, skipAry) {
                let vm = this;

                if(Object.keys(vm.test).length < keyArray.length) {
                    vm.$message.error('请检查内容，内容都不可为空');
                    return;
                }

                for(let key in vm.test) {
                    if(skipAry.indexOf(key) != -1) {
                        continue;
                    }

                    if(vm.test[key] && keyArray.indexOf(key) != -1) {
                        formData.append(key, vm.test[key]);
                    }else {
                        console.log('err ' + key);
                        vm.$message.error('请检查内容，内容都不可为空')
                        return false;
                    }
                }
            },
            editTestPaper() {
                let vm = this;
                let keyArray = ['test_id', 'test_name', 'test_num', 'typeId'];
                let formData = new FormData();
                let skipAry = ['picture_addr'];

                if(!vm.getFormData(keyArray, formData, skipAry)) {
                    return;
                }

                if(vm.$refs.file.files[0]) {
                    formData.append('picture_addr', vm.$refs.file.files[0]);
                }else {
                    formData.append('picture_addr', vm.test.picture_addr)
                }

                vm.$axios.post('/mapis/test/editTestPaper', {testPaper: formData, testId: vm.testId}).then((res) => {
                    if(res.data.state) {
                        vm.getTestById(vm.testId);
                        vm.disabled = true;
                    }
                });
            },
            addTestPaper() {
                let vm = this;
                let keyArray = ['test_name', 'test_num', 'typeId'];
                let formData = new FormData();

                if(!vm.$refs.file.files[0]) {
                    vm.$message.error('请检查内容，内容都不可为空')
                    return;
                }

                //test_num在钩子函数中已经初始化，保证在getFormData不因为此两个字段而出错
                if(!vm.getFormData(keyArray, formData, [])) {
                    return;
                }
                formData.append('picture_addr', vm.$refs.file.files[0]);

                vm.$axios.post('/mapis/test/addTestPaper', {testPaper: formData}).then((res) => {
                    if(res.data.state) {
                        vm.$emit('paper', true, res.data.testId);
                    }else {
                        vm.$emit('paper', false);
                    }
                });
            },
            sendArticle() {
                let vm = this;
                if(vm.testId > 0) {
                    vm.editTestPaper();
                }else {
                    vm.addTestPaper();
                }
            },
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

