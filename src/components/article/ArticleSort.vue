<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 文章管理</el-breadcrumb-item>
                <el-breadcrumb-item>分类管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-input v-model="labelName" placeholder="分类名称" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="plus" @click="addLabel">添加</el-button>
        </div>

        <div class="div-sort mt10">
            <p class="gray">已有标签:</p>
            <div class="label-div">
                <span class="cursor label" v-for="item in labelList">
                    {{item.article_type_name}}
                    <span class="gray ml10" @click="removeLabel(item.article_type_id)">×</span>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "article-sort",
        data() {
            return {
                labelList: [],
                labelName: ''
            }
        },
        mounted() {
            this.getLabelLists();
        },
        methods: {
            getLabelLists() {
                let vm = this;

                vm.$axios.post('/mapis/article/getLabels').then((res) => {
                    if(res.data.state) {
                        vm.labelList = res.data.list;
                    }
                });
            },
            removeLabel(labelId) {
                let vm = this;

                vm.$axios.post('/mapis/article/changeLabelStatus', {labelId: labelId}).then((res) => {
                    if(res.data.state) {
                        vm.$message('标签移除成功');
                        vm.getLabelLists();
                    }
                });
            },
            addLabel() {
                let vm = this;
                if(!vm.labelName) {
                    vm.$message.error('分类名称不能为空');
                    return;
                }

                if(vm.labelName.length > 30) {
                    vm.$message.error('分类名称过长');
                    return;
                }

                vm.$axios.post('/mapis/article/addLabel', {labelName: vm.labelName}).then((res) => {
                    if(res.data.state) {
                        vm.$message('标签添加成功');
                        vm.getLabelLists();
                    }else {
                        vm.$message.error(res.data.msg);
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .handle-box{
        margin-top: 30px;
        margin-bottom: 20px;
    }
    .handle-select{
        width: 120px;
    }
    .handle-input{
        width: 300px;
        display: inline-block;
    }
    .div-sort {
        margin: 20px auto;
    }
    .label {
        border: 1px solid #EDEDED;
        display: inline-block;
        padding: 5px 5px 5px 15px;
        margin: 10px 20px;
        border-radius: 5px;
        font-size: 14px;
        color: #333333;
    }
    .label-div {
        color: #333333;
        margin-top: 8px;
    }
</style>
