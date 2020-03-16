<template>
  <div>
    <nav>
      <div id="logo">SE7EN</div>

      <div id="options">{{'&#x2699;'}}</div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Navbar"
};
</script>

<style>
nav{
    height: 80px;
    display: flex;
    justify-content:space-between;
    align-items: center;
}

#logo{
    font-size: 24px;
    margin: 0 20px;
}

#options{
    font-size: 50px;
    margin: 0 20px;
}
</style>