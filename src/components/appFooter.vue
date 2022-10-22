<template>
  <div class="footer">
    <div class="blok">
      <div class="icons">
      <div class="instagram"></div>
      <div class="facebook"></div>
      <div class="telegram"></div>
    </div>
    <div class="logo">
        
    </div>
    </div>
      
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.footer{
    width: 100vw;
    height: 8vw;
    background-color: #FF3D3D;
    display: flex;
    align-items: center;
    justify-content: center;
   
}
.blok{
  width:80vw;
  height: 8vw;
  display: flex;
    align-items: center;
    justify-content: space-between;
}
.logo{
  cursor: pointer;
  width: 10vw;
  height: 3vw;
  background-image: url('../../photo/logo2.svg');
  background-repeat: no-repeat;
  background-size: cover;
  /* padding-right: 20px; */
}
.icons{
  /* padding: 20px; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 12vw;
}
.instagram{
  cursor: pointer;
  width: 3vw;
  height: 3vw;
   background-image: url('../../photo/instagram.svg');
   background-repeat: no-repeat;
   background-size: cover;
}
.facebook{
  cursor: pointer;
   width: 3vw;
  height: 3vw;
   background-image: url('../../photo/facebook.svg');
   background-repeat: no-repeat;
   background-size: cover;
}
.telegram{
  cursor: pointer;
  width: 3vw;
  height: 3vw;
   background-image: url('../../photo/telegram.svg');
   background-repeat: no-repeat;
   background-size: cover;
}
</style>