<template>
  <v-container>
    <v-card-text  class="statistic">
      <div class="all-static">
        <apexchart type="area" height="300" :options="optionsYear" :series="series"></apexchart>
      </div>
      <v-divider></v-divider>
      <v-row>
        <apexchart height="300" width="700" type="bar" :options="optionsWeek" :series="seriesWeek"></apexchart>
        <apexchart height="300" width="700" type="bar" :options="optionsDay" :series="seriesDay"></apexchart>
      </v-row>
      <v-divider></v-divider>
      <v-dialog v-model="dialog" max-width="500px" >
        <v-card>
          <v-card-text>
            <apexchart width="380" type="radialBar" :options="optionsAlert" :series="seriesAlert"></apexchart>
          </v-card-text>
          <v-spacer></v-spacer>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text color="green darken-1" @click="close">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-text>
  </v-container>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import axios from 'axios'
import {mindateweek, maxdateweek, maxdateday, mindateday} from '../utils/apexConfig'

export default {
  name: "Dashboard",
  components: {
    apexchart: VueApexCharts,
  },
  data(){
    return {
      dialog: false,
      dataChartWeek: {},
      dataListWeek: [],
      dataTimeWeek: [],
      dataChartDay: {},
      dataListDay: [],
      dataTimeDay: [],
      dataChart: {},
      dataTimeAllR: [],
      dataTimeAllT: [],
      optionsDay: {
        chart: {
          id: 'chartDay',
          //type: 'bar',
          type: 'scatter',
          zoom: {
            type: 'xy'
          },
          events: {
            dataPointSelection: this.handelBarClick
          }
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '100%',
            dataLabels: {
              position: 'top', // top, center, bottom
            },
          },
        },
        colors: ['#098b34', '#e77436', '#ead251'],
        dataLabels: {
          enabled: false,
          // offsetY: -20,
          // style: {
          //   fontSize: '12px',
          //   colors: ["#356d2b"]
          // }
        },
        fill: {
          opacity: 0.8
        },
        title: {
          text: 'График Статистики отправленых сообщений за День',
          align: 'left'
        },
        xaxis: {
          type: 'datetime',
          min: mindateday,
          max: maxdateday,
        },
        yaxis: {
          max: 6
        }
      },
      seriesDay: [{
        name: 'Отправлено',
        data: []
      }],
      optionsWeek: {
        chart: {
          id: 'vuechart-example',
          type: 'bar',
          events: {
            dataPointSelection: function(event, chartContext, config) {
              // eslint-disable-next-line no-console
              console.log("dataPointSelection",chartContext, config);
            }
          }
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '100%',
            endingShape: 'rounded',
            dataLabels: {
              position: 'top', // top, center, bottom
            },
          },
        },
        colors: ['#ae48b4', '#00E396', '#6c71d0',
          '#098b34', '#e77436', '#ead251'],
        dataLabels: {
          enabled: false,
          offsetY: -20,
          style: {
            fontSize: '12px',
            colors: ["#356d2b"]
          }
        },
        title: {
          text: 'График Статистики отправленых сообщений за Неделю',
          align: 'left'
        },
        xaxis: {
          type: 'datetime',
          min: mindateweek,
          max: maxdateweek,
        }
      },
      seriesWeek: [{
        name: 'Оправлено',
        data: []
      }],
      series: [
        {
          name: 'Отправлено',
          data: []
        },
        {
          name: 'Доставленные',
          data: []
        }
      ],
      optionsYear: {
        chart: {
          type: 'area',
          height: 200,
        },
        colors: ['#008FFB', '#00E396', '#CED4DC'],
        dataLabels: {
          enabled: true
        },
        stroke: {
          curve: 'smooth'
        },
        title: {
          text: 'График Статистики отправленых сообщений за один год',
          align: 'left'
        },
        fill: {
          type: 'gradient',
          gradient: {
            opacityFrom: 0.1,
            opacityTo: 0.6,
          }
        },
        legend: {
          position: 'top',
          horizontalAlign: 'left'
        },
        xaxis: {
          type: 'datetime',
          min: new Date('01 Jan 2020').getTime(),
          max: new Date('31 Dec 2020').getTime(),
        }
      },
      optionsAlert: {
        theme: {
          palette: 'palette1'
        },
        chart: {
          height: 350,
          type: 'radialBar',
          events: {
            click: function(event, chartContext, config) {
              // eslint-disable-next-line no-console
              console.log("click",chartContext, config);
            }
          }
        },
        plotOptions: {
          radialBar: {
            dataLabels: {
              name: {
                fontSize: '22px',
              },
              value: {
                fontSize: '16px',
                formatter: this.formatterAlertValue
              },
              total: {
                show: true,
                label: 'Total',
                formatter: this.formatterAlert
              }
            }
          }
        },
        labels: ['Отправлено', 'Доставлено', 'Ожидает'],
      },
      seriesAlert: [50,20,30],
      factor: null
    }
  },
  methods: {
    getStatistick() {
      const senderId = this.$store.getters.getUserId
      //var oneWeekFromNow = new Date()
      const dateOneYear = new Date(2020, 0, 1)
      axios.get(`/api/alerts/sender/${senderId}`,{ params: { "start_date": dateOneYear.toISOString().slice(0, -1) } })
        .then( res => this.dataChart = res.data)
        .catch(err => { throw err })
    },
    getStatistickWeek() {
      //TODO ИСПОЛЬЗОВАТЬ ЗАМЕСТО ВСЕХ ПОДСЧЕТОВ mindateweek
      const senderId = this.$store.getters.getUserId
      var oneWeekFromNow = new Date()
      oneWeekFromNow.setDate(oneWeekFromNow.getDate() - oneWeekFromNow.getDate() + (- 6)) //(date.getDay() === 0 ? -6 : 1)
      const dateOneWeek = oneWeekFromNow.toISOString().slice(0, -1)
      axios.get(`/api/alerts/sender/${senderId}`,{ params: { "start_date": dateOneWeek }})
        .then( res => this.dataChartWeek = res.data)
        .catch(err => { throw err })
    },
    getStatistickdDay() {
      const senderId = this.$store.getters.getUserId
      axios.get(`/api/alerts/sender/${senderId}`,{ params: { "start_date": mindateday.toISOString().slice(0, -1) }})
        .then( res => this.dataChartDay = res.data)
        .catch(err => { throw err })
    },
    spliceOneYear(){
      const timeAllT = []
      const timeAllR = []
      for(const [key, value] of Object.entries(this.dataChart)) {
        const started = new Date(value.Started).setSeconds(0,0)//.getTime()
        timeAllT.push(Array.of(started, value.Total) )
        const received = key && value["Received"] ? value.Received : 0
        timeAllR.push(Array.of(started, received ))
      }
      // this.dataTimeAllT = timeAllT
      // this.dataTimeAllR = timeAllR
      this.series = [
        {
          name: 'Total',
          data: timeAllT
        },
        {
          name: 'Received',
          data: timeAllR
        }
      ]
    },
    spliceOneWeek(){
      const timeWeek = []
      const listWeek = []
      for(const [key, value] of Object.entries(this.dataChartWeek)) {
        const started = new Date(value.Started)//.getTime()
        timeWeek.push(Array.of(started.setSeconds(0,0), value.Total) )
        listWeek.push({ ...value, index: key })
      }
      this.dataTimeWeek = timeWeek
      this.dataListWeek = listWeek
      this.seriesWeek = [{
        name: 'Total week',
        data: timeWeek
      }]
    },
    spliceOneDay(){
      const timeday = []
      const listday= []
      for(const [key, value] of Object.entries(this.dataChartDay)) {
        const started = new Date(value.Started)//.getTime()
        timeday.push(Array.of(started.setSeconds(0,0), value.Total) )
        listday.push({ ...value, index: key })
      }
      this.dataTimeDay = timeday
      this.dataListDay = listday
      this.seriesDay= [{
        name: 'Total Day',
        data: timeday
      }]
    },
    handelBarClick(event, chartContext, config){
      // eslint-disable-next-line no-console
      console.log("dataPointSelection",chartContext, "config",config);
      this.activatedDialog(config.dataPointIndex)
    },
    activatedDialog(index) {
      this.dialog = true
      const state = this.dataListDay[index]
      this.factor = (100 / state.Total) / 2
      this.seriesAlert = Array.of(state.Total * this.factor, state.Received * this.factor || 0 , state.WaitSent * this.factor || 0)
    },
    close() {
      this.dialog = false
    },
    formatterAlert() {
      return this.seriesAlert[0] / this.factor
    },
    formatterAlertValue(val) {
      return val / this.factor
    }
  },
  watch: {
    dataChartDay() {
      this.spliceOneDay()
    },
    dataChartWeek() {
      this.spliceOneWeek()
    },
    dataChart() {
      this.spliceOneYear()
    }
  },
  mounted() {
    this.getStatistick()
    this.getStatistickWeek()
    this.getStatistickdDay()
  }
}
</script>

<style scoped>
.statistic {
  min-width: 400px;
}
.all-static {
}
</style>