<template>
    <div class="searchPage" :class="{
        'searchPage--hasSearchForm': options.length > 1,
        'searchPage--hasPagination': true,
    }">
        <div class="searchPage__mainButtons">
            <div class="searchPage__mainButtons--left"><slot name="mainButtons--left"></slot></div>    
            <div class="searchPage__mainButtons--right">
                <el-input v-if="options.length == 1 && options[0].type == 'input'" v-model.trim="queryForm[options[0].prop]" :clearable="!options[0].clearable" :maxlength="60" :placeholder="`请输入${options[0].label}`">
                    <el-button slot="append" icon="el-icon-search" @click="getData"></el-button>
                </el-input>
                <el-select v-if="options.length == 1 && options[0].type == 'select'" v-model="queryForm[options[0].prop]" :multiple="options[0].multiple" :collapse-tags="options[0].multiple" :clearable="!options[0].clearable" :maxlength="60" :placeholder="`请选择${options[0].label}`" @change="selectChange">
                    <el-option v-for="(option, index) in options[0].list" 
                        :key="index"
                        :label="(options[0].valuePrefix ? options[0].valuePrefix : '') + option[options[0].dataKey ? options[0].dataKey.label : 'name'] + (options[0].valueSuffix ? options[0].valueSuffix : '')"
                        :value="option[options[0].dataKey ? options[0].dataKey.value : 'idx']"></el-option>
                </el-select>
                <el-cascader v-if="options.length == 1 && options[0].type == 'cascader' && options[0].list" :options="options[0].list" :props="{ ...options[0].dataKey }" :show-all-levels="false" :clearable="!options[0].clearable" @change="value => { cascaderChange(value, options[0]) }" :placeholder="`请选择${options[0].label}`" />
                <slot v-if="options.length != 1" name="mainButtons--right"></slot>
            </div>    
        </div><!-- // main buttons -->
        <div v-if="options.length > 1" class="searchPage__searchForm">
            <div class="searchPage__searchForm__item" v-for="(item, index) in options" :key="index">
                <el-select v-if="item.type == 'select' && item.list" v-model="queryForm[item.prop]" :disabled="item.list.length == 0" :multiple="item.multiple" :collapse-tags="item.multiple" :clearable="!options[0].clearable" :maxlength="60" :placeholder="`请选择${item.label}`" @change="selectChange(item)">
                    <el-option v-for="(option, index) in item.list" 
                        :key="index"
                        :label="(item.valuePrefix ? item.valuePrefix : '') + option[item.dataKey ? item.dataKey.label : 'name'] + (item.valueSuffix ? item.valueSuffix : '')"
                        :value="option[item.dataKey ? item.dataKey.value : 'idx']"></el-option>
                </el-select>
                <el-input v-if="item.type == 'input'" v-model.trim="queryForm[item.prop]" :clearable="!item.clearable" :maxlength="60" :placeholder="`请输入${item.label}`">
                    <el-button slot="append" icon="el-icon-search" @click="getData"></el-button>
                </el-input>
                <el-cascader v-if="item.type == 'cascader' && item.list" :options="item.list" :props="{ ...item.dataKey }" :show-all-levels="false" :clearable="!item.clearable" @change="value => { cascaderChange(value, item) }" :placeholder="`请选择${item.label}`" />
            </div>
        </div><!-- // search Form -->
        <div class="searchPage__table">
            <el-table :data="tableData" :height="`100%`" @selection-change="handleSelectionChange">
                <template v-for="(item, index) in tableProp">
                    <el-table-column v-if="item.prop" :key="index" :label="item.label" :width="item.width" :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                            {{item.before}}{{item.map ? $map[item.map][scope.row[item.prop]] : scope.row[item.prop]}}{{item.after}}
                        </template>
                    </el-table-column>
                    <el-table-column v-if="item.type == 'index'" :key="index" :label="item.label" :width="item.width">
                        <template slot-scope="scope">
                            <span v-if="scope.$index < 9">00{{scope.$index+1}}</span>
                            <span v-else-if="8 < scope.$index < 99">0{{scope.$index+1}}</span>
                            <span v-else>{{scope.$index+1}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column v-if="item.type == 'area'" :key="index" :label="item.label" :width="item.width">
                        <template slot-scope="scope">
                            {{scope.row.provinceName}} {{scope.row.cityName}} {{scope.row.districtName}}
                        </template>
                    </el-table-column>
                    <el-table-column v-if="item.type == 'selection'" type="selection" :key="index" :width="item.width"></el-table-column>
                    <el-table-column v-if="item.type == 'examinationPaperRulesPercentList'" :key="index" :label="item.label" :width="item.width">
                        <template slot-scope="scope">
                            <span v-for="(item, index) in scope.row.examinationPaperRulesPercentList" :key="index">{{index > 0 ? ' | ' : ''}}{{item.libraryName}}{{item.percent+'%'}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column v-if="item.type == 'educationTypes'" :key="index" :label="item.label" :width="item.width">
                        <template slot-scope="scope">
                            <template v-for="(item, index) in scope.row.educationTypes.split(',')">
                                <span :key="index">{{index > 0 ? ' | ' : ''}}{{$map.educationTypes[item]}}</span>
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column v-if="item.slot" :key="index" :label="item.label" :width="item.width">
                        <template slot-scope="scope">
                            <slot :row="scope.row" :name="item.slot"></slot>
                        </template>
                    </el-table-column>
                </template>
            </el-table>
        </div><!-- // table -->
        <div class="searchPage__pagination">
            <el-pagination
                :current-page="queryForm.current" :page-sizes="[10, 20, 50, 100]" :page-size="queryForm.size" :total="total"
                layout="total, sizes, prev, pager, next, jumper" @size-change="size => { queryForm.size = size; getData() }" @current-change="current => { queryForm.current = current; getData() }" />
        </div><!-- // pagination  -->
    </div>
</template>
<script>
export default {
    name: 'SearchPage',
    props: {
        searchForm: { type: Array, default: () => [] }, // 筛选渲染
        table: { type: Array, default: () => [] }, // 列表数据
        api: { type: String, default: () => '' }, // 列表接口地址
        setValue: { type: Object, default: () => {} }
    },
    data() {
        return {
            options: [], // 筛选渲染
            queryForm: {}, // 列表提交对象
            tableProp: [],
            tableData: [], // 列表数据
            total: 0 // 总记录数
        }
    },
    created() {
        // 重定向数据源
        this.options = this.searchForm.map(item => {
            if(Object.prototype.toString.call(item) == '[object String]'){
                return this.$config.form[item] || {}
            }else{
                return item;
            }
        });
        this.tableProp = this.table.map(item => {
            if(Object.prototype.toString.call(item) == '[object String]'){
                return this.$config.table[item] || {}
            }else{
                return item;
            }
        })
        this.initOptions(); // 初始化列表数据
        this.$parent.SearchPageInit = this.getData; // 给父级绑定 => 获取列表数据 方法
    },
    methods: {
        initOptions() { // 初始化列表数据
            for(let item of this.options){
                if(Object.prototype.toString.call(item.prop) == '[object String]'){
                    this.$set(this.queryForm, item.prop, item.multiple ? [] : '');
                } else {
                    for(let index in item.prop){
                        this.$set(this.queryForm, item.prop[index], '');
                    }
                    this.$set(this.queryForm, item.prop, []);
                }
                item.list = item.list ? Object.prototype.toString.call(item.list) == '[object String]' ? this.$map[item.list] : item.list : [];
                this.optionsGetList(item);
            }
            for(let key in this.setValue){
                this.$set(this.queryForm, key, this.setValue[key]);
            }
            this.$set(this.queryForm, 'current', 1);
            this.$set(this.queryForm, 'size', 10);
            this.getData();
        },
        optionsGetList(item) { // 获取筛选列表数据
            if(item.api){
                let para = {};
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
                    this.$set(item, 'list', res)
                    this.options = Object.assign([],this.options)
                })
            }
        },
        selectChange(item) { // 下拉框切换事件
            this.targetList(item);
            this.getData();
        },
        cascaderChange(value, item) { // 联机下拉框切换事件
            for(let index in item.prop){
                this.$set(this.queryForm, item.prop[index], value[index]);
            }
            this.targetList(item);
            this.getData();
        },
        targetList(item) { // 获取筛选联动列表
            if(item.init){
                for(let item of item.init){
                    let index = this.searchForm.indexOf(item);
                    if(index > -1){
                        this.$set(this.queryForm, this.options[index].prop, '');
                        this.targetList(item);
                        this.optionsGetList(this.options[index]);
                    }

                    
                }
            }
        },
        handleSelectionChange(val) {
            this.$emit('multSelection',val)
        },
        async getData() { // 获取列表数据
            let para = {};
            for(let key in this.queryForm){
                if(this.queryForm[key] || this.queryForm[key] === 0){
                    para[key] = this.queryForm[key];
                }
            }
            let res = await this.$api[this.api](para);
            this.total = res.total;
            this.tableData = res.records;
            // this.tableData = Object.prototype.toString.call(res) == '[object Object]' ? res.records : res;
        }
    }
}
</script>