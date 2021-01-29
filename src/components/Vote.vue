<template>
  <div v-if="this.currentVote">
      <Header :title="currentVote.affair ? currentVote.affair : currentVote.label" margin-bottom="3" />
      <b-container class="text-left">
        <VoteHeader :next="nextVote" :previous="previousVote" />
        <div class="mt-4">
          <b-alert v-if="currentVote.warning" variant="warning" show>
            <h5>
              <font-awesome-icon icon="exclamation-triangle" class="mr-2" />
              Remarque
            </h5>
            <p v-html="currentVote.warning" />
          </b-alert>
          <p class="lead" v-html="currentVote.note" />
          <b-card no-body>
             <b-card-header class="bg-dark text-light">
               <b-row>
                 <b-col sm="9">
                  <h6>Référence officielle du vote : "<b>{{ currentVote.label }}</b>"</h6>
                  <h6>Détail des articles et amendements votés :
                    <span v-if="currentVote.attachment">
                      <a :href="'/attachments/' + currentVote.attachment" download>
                        <b>télécharger le PDF</b>
                        <font-awesome-icon class="ml-1" icon="file-alt" />
                      </a>
                      -
                    </span>              
                    <a :href="'/votes/' + currentVote.affairVoteId + '.csv'" download>
                      <b>Données du vote</b>
                      <font-awesome-icon class="ml-1" icon="table" />
                    </a>
                  </h6>
                  <span class="font-italic small">Voté le {{ voteDate }}</span>
                 </b-col>
                 <b-col class="text-right mx-3">
                   <b-button variant="info" size="sm" @click="showPopup = true">
                     Comment interpréter ce vote
                    <font-awesome-icon icon="question-circle" class="ml-1" />
                   </b-button>
                 </b-col>
               </b-row>
            </b-card-header>
            <b-card-body>
              <apexchart v-if="charts.yesNo.options && charts.yesNo.series" width="100%" height="200" type="bar" :options="charts.yesNo.options" :series="charts.yesNo.series"></apexchart>      
              <b-row class="px-4 vote-distribution-labels">
                <b-col class="text-left" :style="{color: colors[0]}">
                  <b>{{ currentVote.numYes }}</b> ({{ (parseInt(currentVote.numYes) * 100 / (parseInt(currentVote.numYes) + parseInt(currentVote.numAbst) + parseInt(currentVote.numNo))).toFixed(2) }}%)
                </b-col>
                <b-col class="text-right" :style="{color: colors[2]}">
                  <b>{{ currentVote.numNo }}</b> ({{ (parseInt(currentVote.numNo) * 100 / (parseInt(currentVote.numYes) + parseInt(currentVote.numAbst) + parseInt(currentVote.numNo))).toFixed(2) }}%)
                </b-col>
              </b-row>        
              <b-row v-if="currentVote.meaningYesText && currentVote.meaningNoText" class="text-left mt-4 px-4">
                <b-col lg="6" md="12">
                  <h5 class="text-success">Signification du <b>OUI</b></h5>
                  <p v-html="currentVote.meaningYesText" />
                </b-col>
                <b-col lg="6" md="12">
                  <h5 class="text-danger">Signification du <b>NON</b></h5>
                  <p v-html="currentVote.meaningNoText" />
                </b-col>
              </b-row>
            </b-card-body>
          </b-card>
          <b-card no-body class="mt-3">
            <b-card-header class="bg-dark text-light">
              <h4>Votes par catégories socio-démographiques</h4>
            </b-card-header>
            <b-card-body>
              <b-row no-gutters>
                <b-col v-for="chart in charts.categories" :key="chart.title" md="12" lg="6">
                  <apexchart v-if="chart.options && chart.series" width="100%" height="350" type="bar" :options="chart.options" :series="chart.series"></apexchart>
                </b-col>
              </b-row>
            </b-card-body>
          </b-card>
          <b-card no-body class="mt-3">
            <b-card-header class="bg-dark text-success">
              <h4>{{ allVotes.filter((v) => v.vote == 'Oui/Ja').length }} ont voté OUI</h4>
            </b-card-header>
            <b-card-body>
              <b-table v-if="allVotes"
                :items="allVotes.filter((v) => v.vote == 'Oui/Ja')"
                :fields="yesNoFields"
                small
              >
              </b-table>
            </b-card-body>
          </b-card>
          <b-card no-body class="mt-3">
            <b-card-header class="bg-dark text-danger">
              <h4>{{ allVotes.filter((v) => v.vote == 'Non/Nein').length }} ont voté NON</h4>
            </b-card-header>
            <b-card-body>
              <b-table v-if="allVotes"
                :items="allVotes.filter((v) => v.vote == 'Non/Nein')"
                :fields="yesNoFields"
                small
              >
              </b-table>
            </b-card-body>
          </b-card>
        </div>
      </b-container>
      <b-modal title="Comment interpréter ce vote ?" 
        v-model="showPopup" 
        ok-only centered 
        ok-title="J'ai compris !"       
        header-bg-variant="dark"
        header-text-variant="light"
        size="xl"
      >
        <p>
          En votant, les membres de la Constituante expriment leur choix entre deux variantes d'un article de la future Constitution. En votant <b class="text-success">OUI</b>, on choisit l'une des deux variantes. En votant <b class="text-danger">NON</b>, on choisit l'autre. On peut aussi s'abstenir en votant <b>ABST</b>.
        </p>
        <p>
          La signification du <b class="text-success">OUI</b> et du <b class="text-danger">NON</b> (en d'autres termes, la variante d'article qui correspond au <b class="text-success">OUI</b> et au <b class="text-danger">NON</b>) est indiquée au-dessous du résultat lorsque c'est possible. Vous la trouverez aussi dans le détail des articles et amendements votés. La référence officielle du vote mentionnée au-dessus du résultat permet d'y retrouver l'article en question.
        </p>
      </b-modal>
  </div>
</template>

<script>
import * as d3 from 'd3'
import moment from 'moment'
import Header from './utils/Header'
import VoteHeader from './utils/VoteHeader'
export default {
  components: {
    Header,
    VoteHeader,
  },
  data() {
    return {
      nextVote: null,
      previousVote: null,
      currentVote: null,
      allVotes: null,
      voteDate: null,
      showPopup: false,
      charts: {
        yesNo: {
          series: null,
          options: null,
        },
        categories: []
      },
      colors: ['#238823', '#888888', '#D2222D'],
      categories: ['Genre', 'Âge', 'Groupe', 'Parti', 'Région', 'Fonction'],
      yesNoFields: [
        {
          key: 'name', 
          label: 'Nom',
          sortable: true,
        }, 
        {
          key: 'Parti',   
          sortable: true,
        },
        {
          key: 'group',
          label: 'Groupe',
          sortable: true
        },
        {
          key: 'vote',
          formatter: (val) => {
            return val == 'Oui/Ja' ? 'Oui' : 'Non'
          },
        }
      ],
      ageClasses: {
        min: [18, 31, 46, 65],
        max: [30, 45, 65, 100],
      },
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.fetchVotes(to.params.id)
    next()
  },
  created() {
    this.fetchVotes(this.$route.params.id)
  },
  methods: {
    fetchVotes(id) {
      d3.csv('/votes/AllVotes.csv').then((data) => {
        this.currentVote = data.find((d) => d.affairVoteId == id)
        this.voteDate = moment(this.currentVote.startTime).format('DD.MM.YYYY à HH:mm')
        const index = data.findIndex((d) => d.affairVoteId == id)
        this.previousVote = this.getPreviousVote(index, 0, data)
        this.nextVote = this.getPreviousVote(index, data.length, data)
        d3.csv('/votes/' + this.currentVote.affairVoteId + '.csv').then((individualVotes) => {
          this.allVotes = individualVotes
          this.generateCharts()     
        })
      })
    },
    generateCharts() {
      this.generateYesNo()
      this.charts.categories = []
      this.categories.map((c) => {
        this.generateCategory(c)
      })
    },
    generateYesNo() {
      this.charts.yesNo.series = [
        {
          name: 'OUI',
          data: [this.currentVote.numYes]
        },
        {
          name: 'ABST',
          data: [this.currentVote.numAbst]
        },
        {
          name: 'NON',
          data: [this.currentVote.numNo]
        }
      ]
      this.charts.yesNo.options = {
        chart: {
          type: 'bar',
          stacked: true,
          toolbar: {
            show: false
          }
        },
        plotOptions: {
          bar: {
            horizontal: true,
          },
        },
        annotations: {
          xaxis: [
            {
              x: (parseInt(this.currentVote.numYes) + parseInt(this.currentVote.numNo) + parseInt(this.currentVote.numAbst)) / 2,
              borderColor: '#cccccc',
            }
          ]
        },
        stroke: {
          width: 1,
          colors: ['#fff']
        },
        title: {
          text: "Vue d'ensemble des votes"
        },
        xaxis: {
          categories: [''],
          max: this.currentVote.numYes + this.currentVote.numNo + this.currentVote.numAbst,
          labels: {
            show: false
          },
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          }
        },
        grid: {
          show: false,
          borderColor: '#fff',          
        },
        yaxis: {
          title: {
            show: false 
          },
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          }
        },
        fill: {
          opacity: 1
        },
        colors: this.colors,
        tooltip: {
          y: {
            formatter: function (val) {
              return val
            }
          }
        },
        legend: {
          position: 'top',
          horizontalAlign: 'left',
          offsetX: 40
        }
      }
    },
    generateCategory(category) {
      let allOptions
      if (category !== 'Âge') {
        allOptions = [...new Set(this.allVotes.map((v) => v[category]))]
      } else {
        allOptions = []
        for(let i = 0; i < this.ageClasses.min.length; i++) {
          const label = this.ageClasses.min[i] + (this.ageClasses.max[i] !== 100 ? ('-' + this.ageClasses.max[i]) : '+')
          allOptions.push(label)
        }
      }
      const series = [
        {
          name: 'OUI',
          data: this.getData(allOptions, category, 'Oui/Ja')
        },
        {
          name: 'ABST',
          data: this.getData(allOptions, category, 'Abst./Enth.')
        },
        {
          name: 'NON',
          data: this.getData(allOptions, category, 'Non/Nein')
        },
      ]
      const options = {
        chart: {
          type: 'bar',
          stacked: true,
          toolbar: {
            show: false
          }
        },
        title: {
          text: category
        },
        plotOptions: {
          bar: {
            horizontal: false,
          },
        },
        xaxis: {
          categories: allOptions,
        },
        legend: {
          show: false
        },
        menu: {
          show: false
        },
        fill: {
          opacity: 1
        },
        colors: this.colors
      }
      this.charts.categories.push({
        title: category,
        series,
        options
      })
    },
    getData(options, category, vote) {
      const data = []
      if(category !== 'Âge') {
        options.map((o) => {
          data.push(this.allVotes.filter((v) => v[category] == o && v.vote == vote).length)
        })
      } else {
        for(let i = 0; i < this.ageClasses.min.length; i++) {
          data.push(this.allVotes.filter((v) => v.vote == vote && this.getAge(v[category]) >= this.ageClasses.min[i] && this.getAge(v[category]) <= this.ageClasses.max[i]).length)
        }
      }
      return data
    },
    getAge(birthdate) {
      return moment(this.currentVote.startTime, 'YYYY-MM-DD HH:mm:ss').year() - moment(birthdate, 'DD.MM.YYYY').year()
    },
    getPreviousVote(index, limit, data) {
      let affair = null
      let i = index
      if(limit > 0) {
        while(i < limit && affair == null) {
          i++
          try {
            if(data[i].affair !== null && data[i].affair !== '') affair = data[i].affairVoteId
          } catch(e) {
            return affair
          }
        }
      } else {
        while(i >= limit && affair == null) {
          i--
          try {
            if(data[i].affair !== null && data[i].affair !== '') affair = data[i].affairVoteId
          } catch(e) {
            return affair
          }
        }
      }
      return affair
    }
  },
  metaInfo() {
    return {
      title: this.currentVote ? (this.currentVote.affair ? this.currentVote.affair : this.currentVote.label) : 'Vote'
    }
  },
}
</script>

<style>
.vote-distribution-labels {
  margin-top: -30px
}
</style>