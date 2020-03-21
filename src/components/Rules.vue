<template>
  <div>
    <div id="rules-wrapper">
      <h1 id="header">Regler</h1>
      <p>
        Sjuan går ut på att man så fort som möjligt ska bli av med alla sina kort.
        <br />
        <br />
        Den spelare som har hjärter 7 börjar varje omgång. 
        <br />
        <br />        
        Spelaren som står på tur kan sedan välja att lägga ut en ny sjua om han eller hon har ett sådant kort på handen, annars måste spelaren lägga hjärter åtta eller sex, lodrätt över eller under hjärter sju. 
        <br />
        <br />
        Det gäller sedan att bygga stegar genom att placera kort på högarna som bildas. I den ena högen över sjuan kommer till exempel korten att växa genom att man lägger åtta, nio, tio, knekt och så vidare. Och i motsatt hög sjunker kortet genom att man lägger sex, fem, fyra och så vidare. 
        <br />
        <br />
        Spelaren som lägger det sista kortet i någon hög (ess eller kung) vänder den högen och får lägga ytterligare ett kort.
        <br />
        <br />
        Kan man inte lägga ut något kort måste man passa och får då även bomben - <span><i class="fa fa-bomb"></i></span>. 
        <br />
        <br />
        Spelaren som blir av med sina kort först vinner ronden. Övriga spelare får bestraffningspoäng för varje kort man har kvar (15 p för ess, 10 p för klätt kort, 5 p för varje övrigt kort och 25 p extra för den som har bomben).
        <br />
        <br />
        Spelet är slut när någon spelare kommer över en viss totalsumma. Personen med minst antal bestraffningspoäng vinner spelet. 
        <br />
        <br />
        <br />
        
        <br />
      </p>
      
    </div>
    <!-- <FooterBar></FooterBar> -->
  </div>
</template>

<script>
// import FooterBar from "./FooterBar.vue";
export default {
  components: {
    // FooterBar
  }
};
</script>

<style scoped>

#rules-wrapper {
  margin: 0;
  padding: 0;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 18px;
  text-shadow: 0 0 10px #000;
}

p {
  text-align: center;
  margin: 20px;
}
p span{
  font-size: 18px;
}
</style>