<template>
    <el-form :model="queryForm" :rules="rules" ref="queryForm">
        <el-form-item
            v-for="(item, index) in options" :label-width="labelWidth"
            :key="index" :label="item.isLabelHidden ? '' : item.label" :prop="Object.prototype.toString.call(item.prop) == '[object String]' ? item.prop : item.prop[item.prop.length -1]"
            class="submitForm__item" :class="`submitForm__item--row${item.row || 1}`">
            <el-select v-if="item.type == 'select' && item.list" v-model="queryForm[item.prop]" :disabled="item.list.length == 0||item.disabled" :multiple="item.multiple" :collapse-tags="item.multiple" clearable :maxlength="60" :placeholder="`请选择${item.label}`" @change="selectChange(item)">
                <el-option v-for="(option, index) in item.list" 
                    :key="index"
                    :label="(item.valuePrefix ? item.valuePrefix : '') + option[item.dataKey ? item.dataKey.label : 'name'] + (item.valueSuffix ? item.valueSuffix : '')"
                    :value="option[item.dataKey ? item.dataKey.value : 'idx']"></el-option>
            </el-select>
            <template v-if="item.type == 'examinationPaperRulesPercentList'">
                <div class="submitForm__selectAndInput"
                    v-for="(listItem,index) in queryForm.examinationPaperRulesPercentList" :key="index">
                    <el-input v-model.trim="listItem.percent" :disabled="item.disabled" clearable :placeholder="`输入数字`">
                        <el-select v-model="listItem.libraryId"  slot="prepend" :disabled="item.list.length == 0"  clearable :placeholder="`请选择题库`" @change="selectChange(item)">
                            <el-option v-for="(option, index) in item.list" 
                                :key="index"
                                :label="(item.valuePrefix ? item.valuePrefix : '') + option[item.dataKey ? item.dataKey.label : 'name'] + (item.valueSuffix ? item.valueSuffix : '')"
                                :value="option[item.dataKey ? item.dataKey.value : 'idx']"></el-option>
                        </el-select>
                        <template slot="append">%</template>
                    </el-input>
                    <div class="submitForm__minus" @click="removeOptions(queryForm.examinationPaperRulesPercentList, index)"><i class="el-icon-remove"></i></div>
                </div>
                <div class="submitForm__selectAndInputAdd" @click="pushOptions(queryForm.examinationPaperRulesPercentList, item.props)"><i class="el-icon-plus"></i>添加题库占比</div>
            </template>
            <template v-if="item.type == 'serviceItemsList'">
                <div class="serviceItemsList">
                    <div class="serviceItemsList-item" v-for="(listItem, index) in queryForm.serviceItemsList" :key="index">
                        <el-input class="serviceItemsList-name" v-model="listItem.name" :disabled="item.disabled" placeholder="请输入项目名称"></el-input>
                        <span class="serviceItemsList-line">-</span>
                        <el-input class="serviceItemsList-price" v-model="listItem.price" placeholder="约叫价格">
                            <span slot="append">元/天</span>
                            <!-- <el-select v-model="listItem.type" slot="append" placeholder="请选择">
                                <el-option label="元/次" :value="1"></el-option>
                                <el-option label="元/小时" :value="2"></el-option>
                            </el-select> -->
                        </el-input>
                        <template v-if="!item.disabled">
                            <el-button v-if="index == queryForm.serviceItemsList.length - 1" @click="pushOptions(queryForm.serviceItemsList, item.props)">添加</el-button>
                            <el-button v-else  @click="removeOptions(queryForm.serviceItemsList, index)">删除</el-button>
                        </template>
                    </div>
                </div>
            </template>
            <template v-if="item.type == 'menuIdList'">
                <div>
                    <el-transfer v-model="queryForm[item.prop]" :data="menuIdList"></el-transfer>
                </div>
            </template>
            <!-- <span v-if="item.type == 'cascader' && item.list">{{  queryForm[item.prop] }}</span> -->
            <el-cascader v-if="item.type == 'cascader' && item.list" v-model="queryForm[item.prop]" :disabled="item.disabled" :options="item.list" :props="{ ...item.dataKey }" :show-all-levels="false" clearable @change="value => { cascaderChange(value, item) }" :placeholder="`请输入${item.label}`" />
            <el-input v-if="item.type == 'input'" v-model.trim="queryForm[item.prop]" :disabled="item.disabled" clearable :maxlength="item.max" :placeholder="`请输入${item.label}`">
                <template v-if="item.append" slot="append">{{item.append}}</template>
            </el-input>
            <el-input v-if="item.type == 'getUrl'" v-model.trim="queryForm[item.prop]" :disabled="item.disabled"  clearable :maxlength="item.max" :placeholder="`请输入${item.label}`">
                <template slot="append">
                    <el-upload v-if="item.type == 'upload'" drag :action="item.action"
                        :file-list="fileList"
                        :on-success="(res, file) => onSuccess(res, file, item.prop)" :on-remove="onRemove(item.prop)">
                        选择文件
                    </el-upload>
                </template>
            </el-input>
            <div class="inputUpload" v-if="item.type == 'inputUpload'">
                <el-input v-model.trim="queryForm[item.prop]" :readonly="true" :placeholder="`请上传${item.label}`">
                    <template slot="append">
                        <span>上传</span>
                        <input type="file" name="file" id="file" @change="(file) => { inputUpload(file, item.prop) }">
                    </template>
                </el-input>
            </div>
            <div class="inputUpload" v-if="item.type == 'file'">
                <el-input v-model.trim="fileName" :readonly="true" :placeholder="`请上传${item.label}`">
                    <template slot="append">
                        <span>上传</span>
                        <input type="file" name="file" id="file" @change="(file) => { fileUpload(file, item.prop) }">
                    </template>
                </el-input>
            </div>
            <!-- <el-upload v-if="item.type == 'upload'" drag :action="item.action"
                :file-list="fileList"
                :on-success="(res, file) => onSuccess(res, file, item.prop)" :on-remove="onRemove(item.prop)">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </el-upload> -->
            <!-- <el-upload v-if="item.type == 'file'" :action="''"
                :file-list="file"
                :on-change="(file) => onPreview(file, item.prop)" :on-remove="onRemove(item.prop)">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            </el-upload> -->
            <div v-if="item.type == 'upload'">
                <div id="upload-container"><div class="el-upload-dragger"><i class="el-icon-upload"></i> <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div> </div></div>
                <div id="upload-list"></div>
                <button id="picker" style="display: none;">点击上传文件</button>
            </div>
            <!-- <el-input v-if="item.type == 'uEdit'" type="textarea" placeholder="请输入内容" v-model="queryForm[item.prop]" maxlength="200" show-word-limit /> -->
            <vue-editor v-if="item.type == 'uEdit'" v-model="queryForm[item.prop]" :editorToolbar="customToolbar"></vue-editor>
            <el-input v-if="item.type == 'textarea'" type="textarea" :placeholder="`请输入${item.label}`" v-model="queryForm[item.prop]" maxlength="200" show-word-limit />
            <el-date-picker v-if="item.type == 'date'"  type="datetime"
                            placeholder="选择日期"
                            value-format="yyyy-MM-dd hh:mm:ss"
                            format="yyyy-MM-dd hh:mm:ss" v-model="queryForm[item.prop]" maxlength="200" />

        </el-form-item>
    </el-form>
</template>
<script>
import { VueEditor } from "vue2-editor";
export default {
    name: 'MaterialsForm',
    props: {
        form: { type: Array, default: () => [] },
        isRequired: [String, Array],
        labelWidth: { type: String, default: () => 'auto' },
        setValue: { type: Object, default: () => {} }
    },
    components: {
        VueEditor
    },
    data() {
        return {
            customToolbar: [
                ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                // ['blockquote', 'code-block'],
                // ['link','image'],
                // [{ 'header': 1 }, { 'header': 2 }],               // custom button values
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                // [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
                [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
                // [{ 'direction': 'rtl' }],                         // text direction
                // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
                // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                // [{ 'font': [] }],
                [{ 'align': [] }],
            ],
            map: {
                'input': '请输入',
                'textarea': '请输入',
                'uEdit': '请输入',
                'cascader': '请选择',
                'select': '请选择',
                'upload': '请上传',
                'inputUpload': '请上传',
                'file': '请上传',
            },
            options: [],
            required: [],
            queryForm: {},
            rules: {},
            fileList: [],
            file: [],
            menuIdList: [],
            fileName: '',
        }
    },
    created() {
        // 重定向数据源
        this.options = this.form.map(item => {
            if(Object.prototype.toString.call(item) == '[object String]'){
                return this.$config.form[item]
            }else{
                return item;
            }
        });
        let isRequired =  this.isRequired;
        this.required = isRequired == 'all' ? this.options.map(v => v.prop) : isRequired ? isRequired : [];
        this.initForm(); // 初始化列表数据
    },
    mounted() {
        for(let key in this.queryForm){
            if(key === 'importList'){
                window.setEvent(this);
            }
        }
    },
    methods: {
        initForm() { // 初始化列表数据
            for(let item of this.options){
                if(Object.prototype.toString.call(item.prop) == '[object String]'){
                    if(item.type == 'menuIdList'){
                        this.$api.menuList().then(res => {
                            for(let main of res){
                                this.menuIdList.push({
                                    key: `${main.idx}`,
                                    label: main.name
                                })
                                if(main.childList && main.childList.length > 0){
                                    for(let sub of main.childList){
                                        this.menuIdList.push({
                                            key: `${sub.idx}`,
                                            label: `${main.name}-${sub.name}`
                                        })
                                    }
                                }
                            }
                        })
                    }
                    if(item.propType == 'Array'){
                        this.$set(this.queryForm, item.prop, []);
                        this.pushOptions(this.queryForm[item.prop], item.props);
                    }else{
                        this.$set(this.queryForm, item.prop, item.multiple ? [] : '');
                    }
                } else {
                    for(let index in item.prop){
                        this.$set(this.queryForm, item.prop[index], '');
                    }
                    this.$set(this.queryForm, item.prop, []);
                }
                item.list = item.list ? Object.prototype.toString.call(item.list) == '[object String]' ? this.$map[item.list] : item.list : [];
                this.optionsGetList(item);
                if(this.required.indexOf(item.prop) > -1){
                    this.$set(this.rules, Object.prototype.toString.call(item.prop) == '[object String]' ? item.prop : item.prop[item.prop.length -1], [
                        {required: true, message: `${this.map[item.type]}${item.label}`, trigger: 'change'}
                    ])
                }
            }
            if(this.setValue == null){
                // this.initForm();
            } else {
                for(let key in this.setValue){
                    this.$set(this.queryForm, key, this.setValue[key]);
                    if(key == 'provinceCode,cityCode,districtCode' && this.form.indexOf('industryId') > -1){
                        this.optionsGetList(this.options[this.form.indexOf('industryId')]);
                    }
                    if(key == 'provinceCode,cityCode,districtCode' && this.form.indexOf('industryId_dis') > -1){
                        this.optionsGetList(this.options[this.form.indexOf('industryId_dis')]);
                    }
                    if(key == 'industryId' && this.form.indexOf('positionTypeId') > -1){
                        this.optionsGetList(this.options[this.form.indexOf('positionTypeId')]);
                    }
                }
            }
            
        },
        pushOptions(target, props) {
            let obj = {};
            for(let key of props){
                obj[key] = ''
            }
            target.push(obj)
        },
        removeOptions(target, index) {
            target.splice(index, 1);
        },
        optionsGetList(item) { // 获取筛选列表数据
            if(item.api){
                let para = {};
                // console.log({...item})
                if(item.apiPara){
                    let checker = false;
                    for(let key of item.apiPara){
                        if(!this.queryForm[key]){
                            checker = true;
                            this.$set(item, 'list', []);
                            this.targetList(item);
                            break;
                        }
                        para[key] = this.queryForm[key];
                    }
                    if(checker){ return false; }
                }
                this.$api[item.api](para).then(res => {
                    this.$set(item, 'list', Object.assign([], res))
                    this.options = Object.assign([], this.options)
                })
            }
        },
        selectChange(item) { // 下拉框切换事件
            this.targetList(item);
        },
        cascaderChange(value, item) { // 联机下拉框切换事件
            for(let index in item.prop){
                this.$set(this.queryForm, item.prop[index], value[index]);
            }
            this.targetList(item);
        },
        targetList(item) { // 获取筛选联动列表
            if(item.init){
                for(let item of item.init){
                    let index = this.form.indexOf(item);
                    if(index > -1){
                        this.$set(this.queryForm, this.options[index].prop, '');
                        this.optionsGetList(this.options[index]);
                    }
                    
                }
            }
        },
        onSuccess(res, fileName) {
            let arr = this.queryForm.importList;
            arr.push({ fileName: fileName, url: res.url })
            this.queryForm.importList = arr;
        },
        importListRemove(index) {
            this.queryForm.importList.splice(index, 1)
        },
        onPreview(file, target) {
             this.queryForm[target] = file.raw;
             this.file = [...file]
        },
        onRemove(target) {
            this.queryForm[target] = []
            // this.file = [];
        },
        inputUpload(file, prop){
            let dataForm = new FormData();
            dataForm.append('file', file.target.files[0])
            this.$api.upload(dataForm).then(res => {
                 this.queryForm[prop] = res.url;
            })
        },
        fileUpload(file, prop){
            this.queryForm[prop] = file.target.files[0];
            this.fileName = file.target.files[0].name
        },
    }
}
</script>