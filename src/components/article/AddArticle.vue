<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 文章管理</el-breadcrumb-item>
                <el-breadcrumb-item>文章</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <div class="table">
                <el-form :model="article" ref="article" label-width="120px" class="demo-admin">
                    <el-form-item prop="title" label="标题">
                        <el-input v-model="article.title" placeholder="请输入标题" :disabled="disabled"></el-input>
                    </el-form-item>
                    <el-form-item prop="upload_date" label="上传日期">
                        <el-input v-model="article.upload_date" placeholder="" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item  label="类型">
                        <el-select v-model="article.typeId" placeholder="类型" @change="" :disabled="disabled">
                            <el-option v-for="(type, index) in typeList" :label="type.article_type_name" :value="type.article_type_id" :key="index" :disabled="disabled"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="author" label="作者">
                        <el-input v-model="article.author" placeholder="" :disabled="disabled"></el-input>
                    </el-form-item>
                    <el-form-item prop="description" label="keyword" v-if="!disabled">
                        <el-input placeholder="请输入关键字" v-model="article.keywords"></el-input>
                    </el-form-item>
                    <el-form-item prop="description" label="描述">
                        <el-input
                            type="textarea"
                            :rows="5"
                            placeholder="请输入内容"
                            v-model="article.description"
                            :disabled="disabled">
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="content" label="内容">
                        <el-input
                            type="textarea"
                            :rows="5"
                            placeholder="请输入内容"
                            v-model="article.description"
                            v-if="disabled"
                            :disabled="disabled">
                        </el-input>
                        <quill-editor v-else ref="myTextEditor" v-model="article.content" :config="editorOption"></quill-editor>
                    </el-form-item>
                    <el-form-item prop="read_num" label="阅读人数" v-if="disabled">
                        <el-input v-model.number="article.read_num" placeholder="" :disabled="disabled"></el-input>
                    </el-form-item>
                    <el-form-item prop="picture_addr" label="照片">
                        <img :src="article.picture_addr" v-if="disabled" style="width: 270px;">

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
    import VueCoreImageUpload from "vue-core-image-upload";
    import { quillEditor } from 'vue-quill-editor';
    export default {
        name: "add-article",
        data() {
            let vm = this;
            return {
                articleId: this.$route.params.articleId,
                article: {

                },
                typeList: [],
                editorOption: {
                },
                disabled: false,
            }
        },
        components: {
            VueCoreImageUpload,                                // 声明组件VueCoreImageUpload
            quillEditor
        },
        created() {
            this.getArticleType();
        },
        mounted() {
            let vm = this;

            if(vm.articleId > 0) {
                vm.disabled = true;
                vm.getArticleById(vm.articleId);
            }else {
                let day = new Date();

                vm.article.upload_date = day.getFullYear() + '-' + (day.getMonth() + 1) + '-' + day.getDate();
                vm.article.read_num = 1;
            }
        },
        methods:{
            getArticleType() {
                let vm = this;

                vm.$axios.post('/mapis/article/getLabels').then((res) => {
                    if(res.data.state) {
                        vm.typeList = res.data.list;
                    }
                })
            },
            getArticleById(id) {
                let vm = this;

                vm.$axios.post('/mapis/article/getArticleById', {articleId: id}).then((res) => {
                    if(res.data.state) {
                        vm.article = res.data.list;
                    }
                });
            },
            getFormData(keyArray, formData, skipAry) {
                let vm = this;

                if(Object.keys(vm.article).length < keyArray.length) {
                    vm.$message.error('请检查内容，内容都不可为空');
                    return;
                }

                for(let key in vm.article) {
                    if(skipAry.indexOf(key) != -1) {
                        continue;
                    }

                    if(vm.article[key] && keyArray.indexOf(key) != -1) {
                        formData.append(key, vm.article[key]);
                    }else {
                        console.log('err ' + key);
                        vm.$message.error('请检查内容，内容都不可为空')
                        return false;
                    }
                }
            },
            editArticle() {
                let vm = this;
                let keyArray = ['article_id', 'title', 'upload_date', 'typeId', 'author', 'description', 'content', 'read_num'];
                let formData = new FormData();
                let skipAry = ['picture_addr'];
                let params = null;

                if(!vm.getFormData(keyArray, formData, skipAry)) {
                    return;
                }

                if(vm.$refs.file.files[0]) {
                    formData.append('picture_addr', vm.$refs.file.files[0]);
                }else {
                    formData.append('picture_addr', vm.article.picture_addr)
                }


                vm.$axios.post('/mapis/article/editArticle', {article: formData}).then((res) => {
                    if(res.data.state) {
                        vm.getArticleById(vm.articleId);
                        vm.disabled = true;
                    }
                });
            },
            addArticle() {
                let vm = this;
                let keyArray = ['title', 'upload_date', 'typeId', 'author', 'description', 'content', 'read_num', 'keywords'];
                let formData = new FormData();

                if(!vm.$refs.file.files[0]) {
                    vm.$message.error('请检查内容，内容都不可为空')
                    return;
                }

                //read_num和upload_date在钩子函数中已经初始化，保证在getFormData不因为此两个字段而出错
                if(!vm.getFormData(keyArray, formData, [])) {
                    return;
                }

                formData.append('picture_addr', vm.$refs.file.files[0]);
                console.log(formData.get('keywords'));

                vm.$axios.post('/mapis/article/addArticle', {article: formData}).then((res) => {
                    if(res.data.state) {
                        vm.getArticleById(res.data.articleId);
                        vm.disabled = true;

                        vm.$router.push({
                            name: 'article',
                            params: {
                                articleId: res.data.articleId
                            }
                        })
                    }
                });
            },
            sendArticle() {
                let vm = this;
                if(vm.articleId > 0) {
                    vm.editArticle();
                }else {
                    vm.addArticle();
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
