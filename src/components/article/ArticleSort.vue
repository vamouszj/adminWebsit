<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 文章管理</el-breadcrumb-item>
                <el-breadcrumb-item>分类管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-input v-model="select_word" placeholder="分类名称" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="plus" @click="search">添加</el-button>
        </div>

        <div class="div-sort">
            <p class="gray">已有标签:</p>
            <div class="label-div">
                <span class="cursor label">
                    成长
                    <span class="gray">×</span>
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
                labelList: []
            }
        },
        mounted() {

        },
        methods: {
            getLabelLists() {
                let vm = this;

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
        margin: 15px 20px;
    }
    .label-div {
        color: #333333;
    }
</style>
