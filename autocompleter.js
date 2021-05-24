Vue.component('v-autocompleter', {
  template: '<div><img src="search.svg" class="widok"><input @change="signalChange" v-model="googleSearch" type="text" class="s-input" ref="first"><div class="miasta"><ul class="numery"><li v-for="city in filteredCities" @click="handleClick(city.name)"><div class="wypisywane_miasta" v-html="highlight(city.name)"></div></li></ul></div></div>',
  propos: ['options'],
  data: function () {
    return {
      googleSearch: '',
      cities: window.cities,
    }
  },
  methods: {
    handleClick: function (name) {
      this.googleSearch = name;
    },
    highlight: function (wyraz) {
      return wyraz.replaceAll(this.googleSearch, '<span class="highlight">' + this.googleSearch + '</span>')
    },
    signalChange: function () {
      this.$emit('input')
    },
  },
  computed: {
    filteredCities: function () {
      if (this.googleSearch.length == 0) {
        return
      }
      let wynik = this.cities.filter(city => city.name.includes(this.googleSearch))
      if (wynik.length > 10) {
        wynik = wynik.slice(0, 10)
      }
      return wynik
    }
  },
})
