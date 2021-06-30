<template>
  <div class="hello">
    <input v-model.number="operand1" name="operand1" />
    <input v-model.number="operand2" name="operand2" />
    = {{ result }}
    <div class = "blockmain">
      <button @click="calculate('+')" name="+">+</button>
      <button @click="calculate('-')" name="-">-</button>
      <button @click="calculate('/')" name="/">/</button>
      <button @click="calculate('*')" name="*">*</button>
      <button @click="calculate('pow')" name="pow">X<sup>y</sup></button>
      <button @click="calculate('div')" name="div">div</button>
    </div>
    <div class="error" v-if="error">
      {{ error }}
    </div>
    <div>
      <input type="checkbox" id="checkbox" v-model="checked">
      <label for="checkbox">Отобразить экранную клавиатуру</label>
    </div>
    <div v-if="checked">
      <div>
        <button
          v-for="numb in numbers"
          :key="numb"
          :data-number="numb"
          @click="setnum(numb)"
          >{{ numb }}</button>
          <button name="delnumber"
          @click="delnum"
          >&larr;</button>
      </div>
      <div>
        <input type="radio" id="one" value="1" v-model="picked" >
        <label for="one">Операнд 1</label>
        <input type="radio" id="two" value="2" v-model="picked" >
        <label for="two">Операнд 2</label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    operand1: 0,
    operand2: 0,
    result: 0,
    checked: false,
    numbers: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    picked: '1',
    error: ''
  }),
  props: {
  },
  methods: {
    calculate (op) {
      this.error = null
      const { operand1, operand2 } = this
      if (op === '/' && operand2 === 0) {
        this.error = 'Division by zero!'
        return
      }
      const calcop = {
        '+': () => operand1 + operand2,
        '-': () => operand1 - operand2,
        '/': () => operand1 / operand2,
        '*': () => operand1 * operand2,
        pow: () => Math.pow(operand1, operand2),
        div: () => Math.floor(operand1 / operand2)
      }
      this.result = calcop[op]()
    },
    setnum (n) {
      if (this.picked === '1') {
        this.operand1 += n
        this.operand1 = +this.operand1
      } else {
        this.operand2 += n
        this.operand2 = +this.operand2
      }
    },
    delnum () {
      if (this.picked === '1') {
        this.operand1 = Math.floor(this.operand1 / 10)
      } else {
        this.operand2 = Math.floor(this.operand2 / 10)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.blockmain {
  margin-bottom: 50px;
}
.error {
  color: red;
  font-size: 20px;
}
</style>
