<template>
  <div style="width: 100%;height: 100%;overflow-y:auto;">
    <div style="display:flex;">

        <div class="box" >
        <!--          action="/manage/enterprise/three/img/upload/fourColor"-->
          <div>安全风险四色分布图（分总平图、车间图）</div>

        <el-upload
          class="avatar-uploader"
        :http-request="upLoadFourColor"
          action="123"
        :show-file-list="false"
        >
          <img v-if="fourColorUrl" :src="fourColorUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>

        </el-upload>
            <el-button  icon="el-icon-zoom-in" circle @click="imgBig(fourColorUrl,'安全风险四色分布图（分总平图、车间图）')"></el-button>

        </div>


      <div class="box" >
          <div>消防设施分布及疏散图</div>

          <el-upload
          class="avatar-uploader"
          action="111"
          :show-file-list="false"
          :http-request="upLoadFireFighting"
        >
          <img v-if="fireFightingUrl" :src="fireFightingUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>

          </el-upload>
          <el-button  icon="el-icon-zoom-in" circle @click="imgBig(fireFightingUrl,'消防设施分布及疏散图')"></el-button>

      </div>

    </div>


      <div  class="box" >
          <!--          action="/manage/enterprise/three/img/upload/fourColor"-->
          <div style="margin-bottom: 15px">岗位风险告知图
              <el-button type="primary" @click="goUploadPosition()" plain>上传</el-button>
          </div>

          <div style="width: 100%;overflow: hidden;">
                <div   v-for="(item, index) in postionList" :key="index" style="min-width: 24%;float:left;margin-bottom: 20px">
                      <span >
                           <img style="display:block;margin: 0 auto;"  :src="item.url" class="avatar">
                            <div>{{item.name}}</div>
                          <el-button  icon="el-icon-zoom-in" circle @click="imgBig(item.url,item.name)"></el-button>
                            <el-button size="mini" type="danger" @click="delPosition(item.idx)" plain>删除</el-button>

                      </span>

                </div>
          </div>
      </div>





      <el-dialog title="上传岗位图" :visible.sync="disDialog" width="30%">
          <el-form ref="disDialog" label-width="100px" class="hiddenBorder">


              <el-form-item label="岗位" prop="trainingNumber" >
                  <el-input  placeholder="请输入岗位名称" v-model="tempPositionName"></el-input>
              </el-form-item>

              <el-form-item label="图片" prop="trainingNumber" >
                  <el-upload
                          class="avatar-uploader"
                          action="111"
                          :show-file-list="false"
                          :http-request="upLoadPosition"
                  >
                      <img v-if="postRiskUrl" :src="postRiskUrl" class="avatar" />
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
              </el-form-item>

          </el-form>

          <span slot="footer" class="dialog-footer">
                <el-button @click="disDialog = false">取消</el-button>
<!--                <el-button type="primary" @click="goDis">保存</el-button>-->
            </span>
      </el-dialog>


      <el-dialog title="放大" :visible.sync="disDialogPic" width="70%">
          <div>
              <div class="imgBox" v-if="imgurl != ''">
                  <img :src="imgurl" alt />
                  <div>{{imgText}}</div>
              </div>
          </div>
          <span slot="footer" class="dialog-footer">
                <el-button @click="disDialogPic = false">取消</el-button>
              <!--                <el-button type="primary" @click="goDis">保存</el-button>-->
            </span>
      </el-dialog>
  </div>



</template>
<script>
    import axios from 'axios'  //引入axios

    export default {
  name: "Threepic2",
  data() {
    return {
        disDialog:false,
        disDialogPic:false,
      imgurl: "",
      imgText: "",
      imgBigShow: false,
      fourColorShow: false,
      fireFightingShow: false,
      postRiskShow: false,
      fourColorUrl: "",
      fireFightingUrl: "",
      postRiskUrl: "",
      userId:"",
        postionList:[],
        tempPositionName:""
    };
  },
  created() {
    this.userId = sessionStorage.getItem('userId')
    this.initData();
  },

  methods: {

    imgBig(url,text) {
        this.disDialogPic =true;
      this.imgBigShow = true;
      this.imgurl=url;
      this.imgText=text;

    },
    initData(){
      this.$api.threeImgDetail({"enterpriseId":this.userId}).then((data) => {
        //获取三图的地址data.fireFightingUrl
        this.fourColorUrl = data.fourColorUrl;
        this.fireFightingUrl = data.fireFightingUrl;
          this.imgurl= "";
          this.imgText=""
          this.postionList = data.postRiskList;
          this.disDialog = false;
          this.disDialogPic = false;

      });
    },


    upLoadFourColor(file){
      var userId = sessionStorage.getItem('userId')
      const formData = new FormData()
      formData.append('file',file.file)
      formData.append('enterpriseId',userId)
      axios.post(`/manage/enterprise/three/img/upload/fourColor`,formData).then(res => res.data)
              .then(data => {
                if(data.code === 200){
                  this.initData();
                }
              })
    },


      upLoadFireFighting(file){
          var userId = sessionStorage.getItem('userId')
          const formData = new FormData()
          formData.append('file',file.file)
          formData.append('enterpriseId',userId)
          axios.post(`/manage/enterprise/three/img/upload/fireFighting`,formData).then(res => res.data)
              .then(data => {
                  if(data.code === 200){
                      this.initData();
                  }
              })
      },


      upLoadPosition(file){


          var postName = this.tempPositionName
          if(null == postName || "" == postName){
              this.$message.error("请填写岗位名称");

          }else{
              var userId = sessionStorage.getItem('userId')
              const formData = new FormData()
              formData.append('file',file.file)
              formData.append('enterpriseId',userId)
              formData.append('postName',postName)
              axios.post(`/manage/enterprise/three/img/upload/postRisk`,formData).then(res => res.data)
                  .then(data => {
                      // console.log(data)
                      if(data.code === 200){
                          this.postRiskUrl = "";
                          this.tempPositionName = "";
                          this.disDialog = false;
                          this.initData();
                      }else{
                          this.$message.error("上传岗位信息失败");
                      }


                  })
          }

      },


      goUploadPosition(){
        this.disDialog = true;
        },

      delPosition(id){
          this.$api.positionDelete({idxs: id}).then(() => {
              this.$message.success('删除成功');
              this.initData();

          })
      }

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
    font-size: 16px;
  box-sizing: border-box;
}
.box:hover {
  border: 0px solid #d9d9d9;
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