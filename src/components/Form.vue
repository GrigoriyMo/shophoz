<template>
  <div>
    <my-header></my-header>
    <div class="row">
      <div class="col-md-10 col-md-offset-1">
        <div class="panel panel-info">
          <div class="panel-heading">Оформление заказа</div>
          <div class="panel-body">
            <div class="form-group">
              <div class="col-md-12">
                <h4>
                  <strong>Enter Your Information</strong>
                </h4>
              </div>
              <div class="form-group">
                <div class="col-md-6">
                  <strong>Имя:</strong>
                  <input v-model.trim="order.firstName" class="form-control" />
                </div>
                <div class="col-md-6">
                  <strong>Фамилия:</strong>
                  <input v-model.trim="order.lastName" class="form-control" />
                </div>
              </div>
              <div class="form-group">
                <div class="col-md-12">
                  <strong>Адрес:</strong>
                </div>
                <div class="col-md-12">
                  <input v-model.trim="order.address" class="form-control" />
                </div>
              </div>
              <div class="form-group">
                <div class="col-md-12">
                  <strong>Город:</strong>
                </div>
                <div class="col-md-12">
                  <input v-model.trim="order.city" class="form-control" />
                </div>
              </div>
              <div class="form-group">
                <div class="col-md-2">
                  <strong>Регион\область:</strong>
                  <select v-model="order.state" class="form-control">
                    <option disabled value>Регион\область</option>
                    <option v-for="(state, key) in states" :key="key" v-bind:value="state">
                        {{key}}
                    </option>
                  </select>
                </div>
              </div>
              <div class="form-group">
                <div class="col-md-6 col-md-offset-4">
                  <strong>Индекс:</strong>
                  <input v-model.number="order.zip" class="form-control" type="number" />
                </div>
              </div>

              <div class="form-group">
                <div class="col-md-6 boxes">
                  <input
                    type="checkbox"
                    id="gift"
                    value="true"
                    v-bind:true-value="order.sendGift"
                    v-bind:false-value="order.dontSendGift"
                    v-model="order.gift"
                  />
                  <label for="checkbox">Заказываете в подарок?</label>
                </div>
              </div>
              <div class="form-group">
                <div class="col-md-6 boxes">
                  <input type="radio" id="home" v-bind:value="order.home" v-model="order.method" />
                  <label for="home">Домашний адрес</label>
                  <input
                    type="radio"
                    id="business"
                    v-bind:value="order.business"
                    v-model="order.method"
                  />
                  <label for="business">Рабочий адрес</label>
                </div>
              </div>
              <div class="form-group">
                <div class="col-md-6">
                  <button
                    type="submit"
                    class="btn btn-primary submit"
                    v-on:click="submitForm"
                  >Оформить заказ</button>
                </div>
              </div>
              <div class="col-md-12 verify">
                <pre>
                    First Name: {{order.firstName}}
                    Last Name: {{order.lastName}}
                    Address: {{order.address}}
                    Zip: {{order.zip}}
                    State: {{order.state}}
                    Method: {{order.method}}
                    Gift: {{order.gift}}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MyHeader from './Header.vue';
export default {
  name: 'Form',
  props: ['cartItemCount'],
  data () {
    return {
        states: {
            MOS: 'Москва и Московская область',
            EKB: 'Екатеринбург и Свердловская область',
            SPB: 'Санкт-Петербург и Ленинградская область',
            NSK: 'Дальневосточный округ',
        },
        order: {
            firstName: '',
            lastName: '',
            address: '',
            city: '',
            zip: '',
            state: '',
            method: 'Домашний адрес',
            business: 'Рабочий адрес',
            home: 'Домашний адрес',
            gift:'Завернуть в подарочную упаковку',
            sendGift: 'Завернуть в подарочную упаковку',
            dontSendGift: 'Не заворачивать в подарочную упаковку'
        },
    }
  },
  components: { MyHeader },
  methods: {
    submitForm() {
      alert('Submitted');
    }
  }
};
</script>
<style scoped>

.row {
  max-width: 800px;
}
</style>