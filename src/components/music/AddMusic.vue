<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i>音乐管理</el-breadcrumb-item>
                <el-breadcrumb-item>音乐</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <div class="table">
                <el-form :model="music" ref="music" label-width="120px" class="demo-admin">
                    <el-form-item prop="name" label="歌名">
                        <el-input v-model="music.name" placeholder="请输入歌名" :disabled="disabled"></el-input>
                    </el-form-item>
                    <el-form-item prop="musician" label="演唱者">
                        <el-input v-model="music.musician" placeholder="" :disabled="disabled"></el-input>
                    </el-form-item>
                    <el-form-item prop="upload_date" label="上传日期">
                        <el-input v-model="music.upload_date" placeholder="" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item  label="类型">
                        <el-select v-model="music.typeId" placeholder="类型" @change="" :disabled="disabled">
                            <el-option v-for="(type, index) in typeList" :label="type.music_label_name" :value="type.music_label_id" :key="index" :disabled="disabled"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item prop="description" label="描述">
                        <el-input
                            type="textarea"
                            :rows="5"
                            placeholder="请输入内容"
                            v-model="music.description"
                            :disabled="disabled">
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="play_num" label="播放次数" v-if="disabled">
                        <el-input v-model.number="music.play_num" placeholder="" :disabled="disabled"></el-input>
                    </el-form-item>
                    <el-form-item prop="picture_addr" label="照片">
                        <img :src="music.img_addr" v-if="disabled" style="width: 270px;">

                        <span href="javascript:void 0;" v-else class="file">选择文件
                            <input type="file" name="img_addr" accept="image/*"  multiple="multiple" ref="picture">
                        </span>
                    </el-form-item>
                    <el-form-item prop="picture_addr" label="音频">
                        <audio :src="music.save_addr" controls="controls" v-if="disabled">
                            请升级浏览器
                        </audio>
                        <span href="javascript:void 0;" class="file" v-else>选择文件
                            <input type="file" name="save_addr" accept="audio/*"  multiple="multiple" ref="audio">
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
        name: "add-music",
        data() {
            let vm = this;
            return {
                musicId: this.$route.params.musicId,
                music: {

                },
                typeList: [],
                disabled: false,
            }
        },
        created() {
            this.getMusicType();
        },
        mounted() {
            let vm = this;

            if(vm.musicId > 0) {
                vm.disabled = true;
                vm.getMusicById(vm.musicId);
            }else {
                let day = new Date();

                vm.music.upload_date = day.getFullYear() + '-' + (day.getMonth() + 1) + '-' + day.getDate();
                vm.music.play_num = 1;
            }
        },
        methods:{
            getMusicType() {
                let vm = this;

                vm.$axios.post('/mapis/music/getLabels').then((res) => {
                    if(res.data.state) {
                        vm.typeList = res.data.list;
                    }
                })
            },
            getMusicById(id) {
                let vm = this;

                vm.$axios.post('/mapis/music/getMusicById', {musicId: id}).then((res) => {
                    if(res.data.state) {
                        vm.music = res.data.list;
                    }
                });
            },
            getFormData(keyArray, formData) {
                let vm = this;

                if(Object.keys(vm.music).length < keyArray.length) {
                    vm.$message.error('请检查内容，内容都不可为空');
                    return;
                }

                for(let key in vm.music) {
                    if(vm.music[key] && keyArray.indexOf(key) != -1) {
                        formData.append(key, vm.music[key]);
                    }else {
                        console.log('err ' + key);
                        vm.$message.error('请检查内容，内容都不可为空')
                        return;
                    }
                }
                console.log('11 ' + formData.get('typeId'));
                //return formData;
            },
            //TODO
            editArticle() {
                let vm = this;
                let keyArray = ['music_id', 'name', 'musician', 'typeId', 'upload_date', 'description', 'play_num', 'img_addr', 'save_addr'];
                let formData = new FormData();
                let params = null;

                for(let item in vm.music) {

                }

                if(vm.$refs.picture.files[0]) {  //新选择了文件
                    // 需要创建formData

                    delete vm.music.picture_addr;
                    vm.getFormData(keyArray, formData);
                    formData.append('img_addr', vm.$refs.file.files[0]);
                    params = formData;
                }else {
                    // 不需要创建formData
                    for(let key in vm.music) {
                        if(!vm.music[key]) {
                            vm.$message.error('请检查内容，内容都不可为空')
                            return;
                        }
                    }
                    params = vm.music;
                }

                vm.$axios.post('/mapis/music/editArticle', {music: params}).then((res) => {
                    if(res.data.state) {
                        vm.getMusicById(res.data.musicId);
                        vm.disabled = true;
                    }
                });
            },
            addArticle() {
                let vm = this;
                let keyArray = ['title', 'upload_date', 'typeId', 'author', 'description', 'content', 'read_num'];
                let formData = new FormData();

                if(!vm.$refs.file.files[0]) {
                    vm.$message.error('请检查内容，内容都不可为空')
                    return;
                }

                //read_num和upload_date在钩子函数中已经初始化，保证在getFormData不因为此两个字段而出错
                vm.getFormData(keyArray, formData);
                formData.append('picture_addr', vm.$refs.file.files[0]);

                console.log(formData.get('typeId'), formData.get('title'));

                vm.$axios.post('/mapis/music/addArticle', {music: vm.music}).then((res) => {
                    if(res.data.state) {
                        vm.getMusicById(res.data.musicId);
                        vm.disabled = true;

                        vm.$router.push({
                            name: 'music',
                            params: {
                                musicId: res.data.musicId
                            }
                        })
                    }
                });
            },
            sendArticle() {
                let vm = this;
                if(vm.musicId > 0) {
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
