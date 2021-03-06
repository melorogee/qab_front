const type = { 1: '文本', 2: '视频', 3: 'PDF', 4: 'WORD', 5: 'PPT' }
const positionTypeList = [ { idx: 1, name: '新员工培训' }, { idx: 2, name: '老员工培训' }, { idx: 3, name: '取证培训' }]
const educationType20 = [ { idx: 1, name: '新员工培训' }, { idx: 2, name: '老员工培训' }, { idx: 3, name: '取证培训' },{ idx: 4, name: '专家培训' }]
const educationTypes = { '1': '新员工三级培训', '2': '继续教育', '3': '取证教育' ,'4':'专家培训'}
const educationTypesNew = { '1': '新员工培训', '2': '老员工培训', '3': '取证培训','4': '专家培训' }

const questionType = { '0': '判断题', '1': '单选题', '2': '多选题' }
const questionTypeList = [ { idx: 0, name: '判断题' }, { idx: 1, name: '单选题' }, { idx: 2, name: '多选题' }]
const msg = { 'form': '*为必填项，保存即可', 'import': '填写表单后选择要上传的文件，保存即可' }
const statusList = [ { idx: 1, name: '未审核' }, { idx: 3, name: '审核拒绝' } ]
const zjList = [ {idx: 1, name: '专家'}, {idx: 2, name: '特殊作业人员'}]
const orderStatusMap = { 0:'未支付', 1:'支付中', 2:'支付完成', 3:'支付失败', 4:'已完成'};
const planTypeMap =  { 1:'年度培训计划', 2:'日常培训计划'};
const educationType40 = [ { idx: 1, name: '新员工培训' }, { idx: 2, name: '老员工培训' }, { idx: 3, name: '取证培训' }]
const rightAnswer =   [ { idx: 'A', name: 'A' }, { idx: 'B', name: 'B' }, { idx: 'C', name: 'C' }, { idx: 'D', name: 'D' }];
const superviseLevel =   [ { idx: 1, name: '镇/街道' }, { idx: 2, name: '县/区' }, { idx: 3, name: '市' }, { idx: 4, name: '省' }];
const trainnewResult =   [ { idx: 1, name: '考核' }, { idx: 2, name: '考试' }];
const trainnewType =   [ { idx: 1, name: '线上' }, { idx: 2, name: '线下' }];
const trainnewMonth =   [ { idx: '01', name: '01' }, { idx: '02', name: '02' },{ idx: '03', name: '03' },{ idx: '04', name: '04' },
    { idx: '05', name: '05' },{ idx: '06', name: '06' },{ idx: '07', name: '07' },{ idx: '08', name: '08' },{ idx: '09', name: '09' },
    { idx: '10', name: '10' },{ idx: '11', name: '11' },{ idx: '12', name: '12' }];


export default { trainnewMonth,trainnewResult,trainnewType,superviseLevel,rightAnswer,type, educationTypesNew,positionTypeList, educationType20,educationType40, educationTypes, questionType, questionTypeList, msg, statusList, zjList,orderStatusMap ,planTypeMap}