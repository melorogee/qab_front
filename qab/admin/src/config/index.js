/**
 * 参数说明 { key: <Object> }
 * @type<String> 组件类型
 * @label<String> 名称
 * @isLabelHidden<Boolean> 是否显示名称
 * @prop<String> 字段
 * @list<String/Array> 列表
 * @dataKey<Object{key:<String>}> 转换列表字段
 * @api<String> 接口key
 * @apiPara<Array[String]> 接口必要参数
 * @init<Array[String]> 关联字段
 * @max<Number> 输入长度
 * @validator<String/Function> 表单验证
 * @row<Number> 站位
 * @append<String> 复合型输入框
 */
const form = {
    districtCode: { type: 'cascader', label: '地区', prop: ['provinceCode', 'cityCode', 'districtCode'], model: [], dataKey: { value: 'cityCode', label: 'cityName', children: 'childrenList' },  api: 'cityList', init: ["positionTypeId"] },
    districtCode_user: { type: 'cascader', label: '地区', prop: ['provinceCode', 'cityCode', 'districtCode','townshipCode'], model: [], dataKey: { value: 'cityCode', label: 'cityName', children: 'childrenList' },  api: 'cityList', init: ["positionTypeId"] },

    districtCode_dis: { type: 'cascader', label: '地区', prop: ['provinceCode', 'cityCode', 'districtCode'], model: [], disabled: true, dataKey: { value: 'cityCode', label: 'cityName', children: 'childrenList' },  api: 'cityList', init: [] },
    examinationPaperRulesPercentList: { type: 'examinationPaperRulesPercentList', label: '题库提取占比(1-100%)', prop: 'examinationPaperRulesPercentList', propType: 'Array', props: ['libraryId', 'percent','questionCount'], api: 'examList', dataKey: { value: 'idx', label: 'libraryName' }, row: 3 },
    serviceItemsList: { type: 'serviceItemsList', label: '服务项目', prop: 'serviceItemsList', propType: 'Array', props: ['name', 'price', 'type'], row: 3,api: 'serviceList' },
    serviceItemsList_dis: { type: 'serviceItemsList', label: '服务项目', prop: 'serviceItemsList', disabled: true, propType: 'Array', props: ['name', 'price', 'type'], row: 3 },
    industryId: { type: 'select', label: '行业', prop: 'industryId', api: 'cityIndustryList', init: ['positionTypeId', 'qualifications'] },
    industryId_dis: { type: 'select', label: '行业', prop: 'industryId', disabled: true, api: 'cityIndustryList', init: ['positionTypeId'] },
    industry: { type: 'input', label: '行业名称', prop: 'name' },
    position: { type: 'input', label: '岗位名称', prop: 'name' },
    expert: { type: 'input', label: '专家名称', prop: 'name' },
    enterpriseUser: { type: 'input', label: '企业名称', prop: 'name' },
    expertUser: { type: 'input', label: '姓名', prop: 'name' },
    superviseUser: { type: 'input', label: '姓名', prop: 'name' },
    idCode: { type: 'input', label: '统一社会信用编码', prop: 'idCode' },
    id: { type: 'input', label: '身份证号码', prop: 'id' },
    type: { type: 'select', label: '专家类型', prop: 'type', list: 'zjList', init: ['qualifications']},
    qualifications: { type: 'select', label: '专家类型/特殊作业人员类型', prop: 'qualifications', api: 'userSpecialList', apiPara: ['type'] },
    fullAddr: { type: 'input', label: '详细地址', prop: 'fullAddr' },
    contacts: { type: 'input', label: '企业联系人', prop: 'contacts' },
    phone: { type: 'input', label: '联系人手机号码', prop: 'phone' },
    password: { type: 'input', inputType: 'password', label: '密码', prop: 'password' },
    libraryName:  { type: 'input', label: '题库名称', prop: 'libraryName' },
    department:  { type: 'input', label: '所属部门', prop: 'department' },
    userName:  { type: 'input', label: '用户名', prop: 'userName' },
    loginName:  { type: 'input', label: '手机号码', prop: 'loginName' },
    title:  { type: 'input', label: '自选课标题', prop: 'title', row: 2 },
    icon:  { type: 'inputUploadPic', label: '自选课图片', prop: 'icon' },
    introduce:  { type: 'input', label: '自选课简介', prop: 'introduce' },
    menuIdList: { type: 'menuIdList', label: '菜单权限配置', prop: 'menuIdList', multiple: true, row: 3 },
    password1:  { type: 'input', inputType: 'password', label: '设置密码', prop: 'password' },
    special: { type: 'input', label: '特殊作业人员名称', prop: 'name' },
    status: { type: 'select', label: '审核状态', prop: 'status', clearable: true, list: 'statusList' },
    educationType: { type: 'select', label: '教育类型', prop: 'educationType', list: 'positionTypeList' },
    educationType1: { type: 'select', label: '教育类型', prop: 'educationType', list: 'positionTypeList' },
    educationType1_dis: { type: 'select', label: '教育类型', prop: 'educationType', disabled: true, list: 'positionTypeList' },
    educationTypes: { type: 'select', label: '教育类型', prop: 'educationTypes', multiple: true, list: 'positionTypeList' },
    'educationType2.0': { type: 'select', label: '教育类型', prop: 'educationType', list: 'educationType20' },
    'educationType3.0': { type: 'selectS', label: '教育类型', prop: 'educationTypes',multiple:true, list: 'educationType20', tempData: 'educationType1'},
    'educationType4.0': { type: 'select', label: '教育类型', prop: 'educationType', list: 'educationType40' },
    'educationType5.0': { type: 'select', label: '教育类型', prop: 'educationTypes', list: 'educationType40' },

    courseTypeId: { type: 'select', label: '选择课程', prop: 'courseTypeId',  api: 'courseList' },
    positionTypeId: { type: 'select', label: '岗位类型', prop: 'positionTypeId', api: 'industryPositionList', apiPara: ['industryId'] },
    name: { type: 'input', label: '资料名称', prop: 'name', row: 2},
    classHour: { type: 'input', label: '课时设置', prop: 'classHour',  append: '分钟/个', validator: 'Number', max: 3 },
    platformFee: { type: 'input', label: '平台服务费', prop: 'platformFee',  append: '%', validator: 'Number', max: 3 },
    
    content: { type: 'uEdit', label: '内容', isLabelHidden: true, prop: 'content', row: 3 },
    questionTitle: { type: 'textarea', label: '题目', prop: 'questionTitle', row: 3 },
    questionType: { type: 'select', label: '题型', prop: 'questionType', list: 'questionTypeList' },
    atitle: { type: 'input', label: 'A 选项', prop: 'atitle', max: 20 },
    btitle: { type: 'input', label: 'B 选项', prop: 'btitle', max: 20 },
    ctitle: { type: 'input', label: 'C 选项', prop: 'ctitle', max: 20 },
    dtitle: { type: 'input', label: 'D 选项', prop: 'dtitle', max: 20 },
    rightAnswer: { type: 'select', label: '正确答案', prop: 'rightAnswer',  list:'rightAnswer'},
    tips: { type: 'textarea', label: '试题解析', prop: 'tips', row: 3 },
    importList: { type: 'upload', label: '导入文件', isLabelHidden: true, prop: 'importList', propType: 'Array', action: 'http://www.cxzdjs.cn/manage/oss/upload/form/upload/', row: 3 },
    businessLicenseUrl: { type: 'inputUploadPic', label: '上传营业执照', prop: 'businessLicenseUrl', action: 'http://www.cxzdjs.cn/manage/upload/image' },
    certificateUrl: { type: 'inputUpload', label: '上传资质证书', prop: 'certificateUrl', action: 'http://www.cxzdjs.cn/manage/upload/image' },
    file: { type: 'file', label: '导入文件', prop: 'file', action: 'https://jsonplaceholder.typicode.com/posts/', row: 3 },
    empolyeeName: { type: 'input', label: '员工姓名', prop: 'name', row: 1 },
    dept: { type: 'input', label: '部门', prop: 'departmentName', row: 1 },
    hiredate: { type: 'date', label: '入职时间', prop: 'hiredate', row: 1 },
    hiredate1: { type: 'date1', label: '入职时间', prop: 'hiredate', row: 1 },

    positionEmploy: { type: 'select', label: '职位或岗位', prop: 'positionTypeId', row: 1,api: 'questionPositionList' },
    employPhone: { type: 'input', label: '电话', prop: 'phone', row: 1},
    planTitle:{ type: 'input', label: '标题', prop: 'title', row: 1},
    planType:{ type: 'select', label: '类型', prop: 'type', row: 1,api:'planTypeMap'},
    planContent:{ type: 'input', label: '内容', prop: 'content', row: 3},
    employeePhone:{ type: 'input', label: '手机号码', prop: 'phone', row: 1 },
    orgName:{ type: 'input', label: '机构名称', prop: 'name', row: 1 },
    orgContact:{ type: 'input', label: '联系人', prop: 'contact', row: 1 },
    orgContactNum:{ type: 'input', label: '联系方式', prop: 'phone', row: 1 },
     orgType:{ type: 'input', label: '机构类别', prop: 'category', row: 1 },
    orgType1:{ type: 'select', label: '机构类型', prop: 'typeId', row: 1, api:'orgTypeList'},
    qualificationUrl: { type: 'inputUpload', label: '上传资质证书', prop: 'qualificationUrl', action: 'http://www.cxzdjs.cn/manage/upload/image' },

    orgBusiness:{ type: 'textarea', label: '业务范围', prop: 'businessScope', row: 1 },
    orgAddress:{ type: 'input', label: '机构地址', prop: 'fullAddr', row: 1 },
    certificateNumber:{ type: 'input', label: '证书编号', prop: 'certificateNumber', row: 1 },
    certificateValidityPeriod:{ type: 'date1', label: '证书有效期', prop: 'certificateValidityPeriod', row: 1 },
    superviseLevel:{ type: 'select', label: '监管部门类型', prop: 'level', row: 1, list:'superviseLevel'},
    serviceName: { type: 'input', label: '服务名称', prop: 'name', row: 2},
    // insureItem: { type: 'select', label: '派单项目', prop: 'type', row: 1, list:'superviseLevel'},
    // insureItemType: { type: 'input', label: '服务类型', prop: 'serviceTypeId', row: 1},
    // insureExpert: { type: 'select', label: '派单至专家', prop: 'expertId', row: 1, list:'superviseLevel'},
    // insureEndTime: { type: 'date1', label: '服务截止时间', prop: 'deadline', row: 1 },
    expContacts:{ type: 'input', label: '联系人', prop: 'contacts', row: 1 },
    servedCompany:{ type: 'select', label: '服务过的企业', prop: 'enterpriseId', row: 1, api: 'getEnterpriseByExpertId',init: ["enterpriseId"]},

};
/**
 * 参数说明 { key: <Object> }
 * @label<String> 名称
 * @prop<String> 字段
 * @map<String> 替换码表
 * @width<Number> 宽度
 * @type<String> 定制化字段
 * @slot<String> 插槽
 */
const table = {
    selection: { type: 'selection', width: 70 },
    // 培训档案
    index: { type: 'index', label: '序号', width: 70 },
    archives: { prop: 'name', label: '员工姓名' },
    departmentName: { prop: 'departmentName', label: '部门' },
    positionName: { prop: 'positionName', label: '岗位/职位' },
    hiredate: { prop: 'hiredate', label: '入厂时间' },
    archivesEduType: { slot: 'archivesEduType', label: '教育类型', width: 150 },
    finishClassHour: { prop: 'finishClassHour', label: '培训时长' },
    score: { prop: 'score', label: '开始成绩' },
    isPass: { slot: 'isPass', label: '是否合格' },
    type: { prop: 'type', label: '#', map: 'type', width: 70 },
    materials: { prop: 'name', label: '文件名' },
    statutes: { prop: 'name', label: '文件名' },
    industry: { prop: 'name', label: '行业名称' },
    position: { prop: 'name', label: '岗位名称' },
    expert: { prop: 'name', label: '专家名称' },
    special: { prop: 'name', label: '特殊作业人员名称' },
    enterpriseUser: { prop: 'name', label: '企业名称' },
    expertUser: { prop: 'name', label: '姓名' },
    superviseUser: { prop: 'name', label: '专家名称' },
    template: { prop: 'name', label: '模板名称' },
    title: { prop: 'title', label: '自选课标题' },
    department: { prop: 'department', label: '所属部门' },
    addr: { prop: 'addr', label: '地区', width: 200 },
    area: { type: 'area', label: '地区', width: 200 },
    fullAddr: { prop: 'fullAddr', label: '单位地址' },
    id: { prop: 'id', label: '身份证号码', width: 160 },
    contacts: { prop: 'contacts', label: '联系人', width: 100 },
    phone: { prop: 'phone', label: '手机号码', width: 100 },
    examinationPaperRulesPercentList: { type: 'examinationPaperRulesPercentList', label: '题库占比' },
    industryName: { prop: 'industryName', label: '行业', width: 100 },
    educationType: { prop: 'educationType', map: 'educationTypes', label: '教育类型', width: 150 },
    educationTypenew: { prop: 'educationType', map: 'educationTypesNew', label: '教育类型', width: 150 },

    educationTypes: { type: 'educationTypes', label: '教育类型', width: 300 },
    positionTypeName: { prop: 'positionTypeName', label: '作业人员', width: 100 },
    classHour: { prop: 'classHour', label: '课时', after: '分钟', width: 100 },
    createTime: { prop: 'createTime', label: '上传时间' },
    questionType: { prop: 'questionType', label: '题型', map: 'questionType', width: 60 },
    questionTitle: { prop: 'questionTitle', label: '题目' },
    options: { slot: 'options', label: '选项', width: 300 },
    rightAnswer: { prop: 'rightAnswer', label: '正确答案', width: 140 },
    tips: { prop: 'tips', label: '解析', width: 140 },
    operat: { slot: 'operat', label: '操作', width: 70 },
    operat8: { slot: 'operat', label: '操作', width: 80 },
    operat10: { slot: 'operat', label: '操作', width: 100 },
    operat16: { slot: 'operat', label: '操作', width: 160 }
};

export default { form, table }