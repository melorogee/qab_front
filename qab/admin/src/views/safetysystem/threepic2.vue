<template>
  <div style="width: 100%;height: 100%;overflow-y:auto;">
    <div style="display:flex;">
        <button @click="goUploadPosition()">上传</button>

        <div class="box" @click="imgBig(fourColorUrl,'安全风险四色分布图（分总平图、车间图）')">
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
      </div>


      <div class="box" @click="imgBig(fireFightingUrl,'消防设施分布及疏散图')">
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
      </div>


        <div class="box" >
            <!--          action="/manage/enterprise/three/img/upload/fourColor"-->
            <div>岗位风险告知图</div>


            <div class="box"  v-for="(item, index) in postionList" :key="index" >
                  <span @click="imgBig(item.url,item.name)">
                       <img  :src="item.url" class="avatar" @click="imgBig(item.url,'item.name')">
                        <label>{{item.name}}</label>
                      <button @click="delPosition(item.idx)">删除</button>
                  </span>
            </div>
        </div>
<!--      <div class="box" @click="imgBig(postRiskUrl,'岗位风险告知图')">-->
<!--&lt;!&ndash;        <el-upload&ndash;&gt;-->
<!--&lt;!&ndash;          class="avatar-uploader"&ndash;&gt;-->
<!--&lt;!&ndash;          action="/manage/enterprise/three/img/upload/postRisk"&ndash;&gt;-->
<!--&lt;!&ndash;          :show-file-list="false"&ndash;&gt;-->
<!--&lt;!&ndash;          :on-success="handleAvatarSuccess3"&ndash;&gt;-->
<!--&lt;!&ndash;        >&ndash;&gt;-->
<!--&lt;!&ndash;          <img v-if="postRiskUrl" :src="postRiskUrl" class="avatar" />&ndash;&gt;-->
<!--&lt;!&ndash;          <i v-else class="el-icon-plus avatar-uploader-icon"></i>&ndash;&gt;-->
<!--&lt;!&ndash;        </el-upload>&ndash;&gt;-->
<!--        <el-upload-->
<!--                action="222"-->
<!--                :http-request="upLoadPosition"-->
<!--                list-type="picture-card"-->
<!--                :on-preview="handlePictureCardPreview"-->
<!--                :on-remove="handleRemove">-->
<!--          <i class="el-icon-plus"></i>-->
<!--        </el-upload>-->
<!--        <div>岗位风险告知图</div>-->
<!--      </div>-->
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
                console.log(data)
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
                  console.log(data)
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