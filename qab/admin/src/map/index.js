const type = { 1: '文本', 2: '视频', 3: 'PDF', 4: 'WORD', 5: 'PPT' }
const positionTypeList = [ { idx: 1, name: '新员工培训' }, { idx: 2, name: '老员工培训' }, { idx: 3, name: '取证培训' }]
const educationType20 = [ { idx: 1, name: '新员工培训' }, { idx: 2, name: '老员工培训' }, { idx: 3, name: '取证培训' }]
const educationTypes = { '1': '新员工三级培训', '2': '继续教育', '3': '取证教育' }
const questionType = { '0': '判断题', '1': '单选题', '2': '多选题' }
const questionTypeList = [ { idx: 0, name: '判断题' }, { idx: 1, name: '单选题' }, { idx: 2, name: '多选题' }]
const msg = { 'form': '*为必填项，保存即可', 'import': '填写表单后选择要上传的文件，保存即可' }
const statusList = [ { idx: 1, name: '未审核' }, { idx: 3, name: '审核拒绝' } ]
const zjList = [ {idx: 1, name: '专家'}, {idx: 2, name: '特殊作业人员'}]
const orderStatusMap = { 0:'未支付', 1:'支付中', 2:'支付完成', 3:'支付失败', 4:'已完成'};
const planTypeMap =  { 1:'年度培训计划', 2:'日常培训计划'};

export default { type, positionTypeList, educationType20, educationTypes, questionType, questionTypeList, msg, statusList, zjList,orderStatusMap ,planTypeMap}