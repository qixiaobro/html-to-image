<script setup>
import domtoimage from "dom-to-image";

defineProps({
  msg: String,
});

function generateImage() {
  const node = document.getElementById("app");
  domtoimage.toPng(node)
    .then(function (dataUrl) {
      // 去除base64头部
      const base64 = dataUrl.replace(/^data:image\/png;base64,/, "");
      console.log(dataUrl);
      // console.log(base64);
      window.sendToWebview("webview:shareImg", base64, (data) => {
        console.log(data || "分享成功");
        document.getElementById("test").innerHTML = `${data}`;
        alert(data);
      });
    })
    .catch(function (error) {
      console.error("oops, something went wrong!", error);
    });
}

const handleClick=()=>{
  window.open('https://play.google.com/store/apps/details?id=com.hkmanjuu.azurlane.gp&referrer=adjust_reftag%3Dc69Y6k96lBGE1%26utm_source%3Dblhx_android_link','_blank')
}
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <div style="margin-bottom: 20px;">
     <div @click="handleClick" style="cursor:pointer;color:purple">外链跳转</div>
    </div>
    <button type="button" @click="generateImage">生成分享图片</button>
    <div id="test"></div>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
