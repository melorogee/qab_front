<template>
  <div class="searchPage" :class="{
        'searchPage--hasSearchForm': false,
        'searchPage--hasPagination': true,
    }">
    <div class="searchPage__table">

    <el-table :data="tableData" style="width: 100%;height: 100%;overflow-y:auto;">
      <el-table-column prop="enterpriseName" label="企业名称" width="180"></el-table-column>
      <el-table-column label="安全风险四色分布图（分总平图、车间图）">
        <template slot-scope="scope">
          <el-popover placement="top" trigger="hover" v-if="scope.row.fourColorUrl !=null">
            <a :href="scope.row.fourColorUrl" target="_blank" title="查看最大化图片">
              <img :src="scope.row.fourColorUrl" style="width: 400px;height: 300px" />
            </a>
            <img
              slot="reference"
              :src="scope.row.fourColorUrl"
              style="width: 250px;height: 150px;cursor:pointer"
            />
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="fireFightingUrl" label="消防设施分布及疏散图">
        <template slot-scope="scope">
          <el-popover placement="top" trigger="hover" v-if="scope.row.fireFightingUrl !=null">
            <a :href="scope.row.fireFightingUrl" target="_blank" title="查看最大化图片">
              <img :src="scope.row.fireFightingUrl" style="width: 400px;height: 300px" />
            </a>
            <img
              slot="reference"
              :src="scope.row.fireFightingUrl"
              style="width: 250px;height: 150px;cursor:pointer"
            />
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="postRiskUrl" label="岗位风险告知图">
        <template slot-scope="scope">
          <el-popover placement="top" trigger="hover" v-if="scope.row.postRiskList !=null && scope.row.postRiskList.length >0">
            <a :href="scope.row.postRiskList" target="_blank" title="查看最大化图片">
              <img :src="scope.row.postRiskList[0].url" style="width: 400px;height: 300px" />
            </a>
            <img
              slot="reference"
              :src="scope.row.postRiskList[0].url"
              style="width: 250px;height: 150px;cursor:pointer"
            />
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column prop="postRiskUrl" label="操作">
        <template slot-scope="scope">
          <i class="el-icon-upload" @click="goUpload(scope.row.enterpriseId)">上传</i>
          <i class="el-icon-view" @click="goDetail(scope.row.enterpriseId)">详情</i>
        </template>
      </el-table-column>
    </el-table>
    </div>
    <div class="searchPage__pagination">
      <el-pagination
              :current-page="current" :page-sizes="[10, 20, 50, 100]" :page-size="size" :total="total"
              layout="total, sizes, prev, pager, next, jumper" @size-change="size => { this.size = size; loadData() }" @current-change="current => {this.current = current; loadData() }" />
    </div><!-- // pagination  -->




    <el-dialog title="上传图片" :visible.sync="disDialog" width="30%">
      <el-form ref="disDialog" label-width="100px" class="hiddenBorder">

        <el-form-item label="类型">
          <el-select  v-model="picType"  :maxlength="60" :placeholder="`请选择`"  onchange="changeType">
            <el-option v-for="(option, index) in otherList"
                       :key="index"
                       :label="option.name"
                       :value="option.idx">

            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="岗位" prop="trainingNumber" v-if="picType=='2'">
          <el-input  placeholder="请输入岗位名称" v-model="tempPositionName"></el-input>
        </el-form-item>

        <el-form-item label="图片" prop="trainingNumber" >
          <el-upload
                  class="avatar-uploader"
                  action="111"
                  :show-file-list="false"
                  :http-request="upLoadPic"
          >
            <img v-if="tempUrl" :src="tempUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

      </el-form>

      <span slot="footer" class="dialog-footer">
                <el-button @click="disDialog = false">取消</el-button>
        <!--                <el-button type="primary" @click="goDis">保存</el-button>-->
            </span>
    </el-dialog>



    <el-dialog title="详情" :visible.sync="disDialogDetail" width="100%">
      <el-form ref="disDialogDetail" label-width="100px" class="hiddenBorder">
        <div style="display:flex;">
          <div class="box" >
            <!--          action="/manage/enterprise/three/img/upload/fourColor"-->
            <div>安全风险四色分布图（分总平图、车间图）</div>
              <img v-if="fourColorUrl" :src="fourColorUrl" class="avatar" />

          </div>

          <div class="box">
            <div>消防设施分布及疏散图</div>
              <img v-if="fireFightingUrl" :src="fireFightingUrl" class="avatar" />
          </div>


          <div class="box">
            <div>消防设施分布及疏散图</div>
            <div class="box" v-for="(item, index) in postionList" :key="index">
                <img  :src="item.url" class="avatar" @click="imgBig(item.url,'item.name')">
                <label>{{item.name}}</label>
            </div>

          </div>
        </div>
      </el-form>

      <span slot="footer" class="dialog-footer">
                <el-button @click="disDialogDetail = false">取消</el-button>
        <!--                <el-button type="primary" @click="goDis">保存</el-button>-->
            </span>
    </el-dialog>
  </div>
</template>
<script>
  import axios from 'axios'  //引入axios

  export default {
  name: "Threepic",
  data() {
    return {
      picType:"",
      tableData: [],
      current:0,
      size:10,
      total:0,
      disDialog:false,
      otherList:[{"idx":"0","name":"消防设施分布及疏散图"},{"idx":"1","name":"安全风险四色分布图"},{"idx":"2","name":"岗位风险告知图"}],
      tempUrl:"",
      tempId:"",
      tempPositionName:"",
      disDialogDetail:false,
      tempIdDetail:"",
      fourColorUrl:"",
      fireFightingUrl:""
    };
  },
  created() {

    this.loadData()
  },

  methods: {
    loadData() {
      this.$api.threeImgList({"current":this.current,"size":this.size}).then((data) => {
        this.tableData = data.records;
        this.current =data.current;
        this.size =data.size;
        this.total = data.total;
        this.tempUrl="",
        this.tempId="",
        this.tempPositionName=""
        this.disDialog=false
        this.disDialogDetail=false;
        this.tempIdDetail=""
      });
    },

    goUpload(id){
      this.disDialog = true
      this.tempId = id
    },

    goDetail(id){
      this.disDialogDetail = true
      this.tempIdDetail = id

      this.$api.threeImgDetail({"enterpriseId":id}).then((data) => {
                  this.fourColorUrl = data.fourColorUrl
                  this.fireFightingUrl = data.fireFightingUrl
                  this.postionList = data.postRiskList;

              })
    },

    changeType(){

    },

    upLoadPic(file){
        if(this.picType == '0'){
          this.upLoadFireFighting(file)
        }else if(this.picType == '1'){
          this.upLoadFourColor(file)
        }else if(this.picType == '2'){
          this.upLoadPosition(file)
        }

    },



    upLoadFourColor(file){
      var userId = this.tempId
      const formData = new FormData()
      formData.append('file',file.file)
      formData.append('enterpriseId',userId)
      axios.post(`/manage/enterprise/three/img/upload/fourColor`,formData).then(res => res.data)
              .then(data => {
                console.log(data)
                if(data.code === 200){
                  this.loadData()
                  this.disDialog=false;
                }
              })
    },


    upLoadFireFighting(file){
      var userId = this.tempId
      const formData = new FormData()
      formData.append('file',file.file)
      formData.append('enterpriseId',userId)
      axios.post(`/manage/enterprise/three/img/upload/fireFighting`,formData).then(res => res.data)
              .then(data => {
                console.log(data)
                if(data.code === 200){
                  this.loadData()
                  this.disDialog=false;
                }
              })
    },


    upLoadPosition(file){

      var postName = this.tempPositionName
      if(null == postName || "" == postName){
        this.$message.error("请填写岗位名称");

      }else{
        var userId = this.tempId
        const formData = new FormData()
        formData.append('file',file.file)
        formData.append('enterpriseId',userId)
        formData.append('postName',postName)
        axios.post(`/manage/enterprise/three/img/upload/postRisk`,formData).then(res => res.data)
                .then(data => {
                  // console.log(data)
                  if(data.code === 200){
                    this.loadData()
                    this.disDialog=false;
                  }


                })
      }

    },
  }
};
</script>

<style>
  .box {
    flex: 1;
    height: max-content;
    padding: 10px 20px;
    text-align: center;
    cursor: pointer;
    box-sizing: border-box;
  }
  .box:hover {
    border: 1px solid #d9d9d9;
    border-radius: 6px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 200px;
    height: 150px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 200px;
    height: 150px;
    display: block;
  }
  .imgBox {
    display: block;
    margin: 50px auto;
    width: 550px;
    height: 300px;
    text-align: center;
  }
  .imgBox img {
    width: 100%;
    height: 100%;
  }
</style>