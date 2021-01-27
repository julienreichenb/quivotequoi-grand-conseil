<template>
    <div>
        <Header title="Historiques des votes" text="Pour les passionés !" />
        <b-container>
            <SearchBar @search="filterVotes" />
                <b-table id="my-table" 
                    class="mt-5" 
                    :items="filteredVotes"
                    :fields="fields"
                    :per-page="perPage"
                    :current-page="currentPage"
                    small
                >
                    <template #cell(result)="data">
                        <span v-html="data.value"></span>
                    </template>
                </b-table>
               <b-pagination
                    v-model="currentPage"
                    align="right"
                    :total-rows="rows"
                    :per-page="perPage"
                    aria-controls="my-table"
                ></b-pagination>
        </b-container>
    </div>
</template>

<script>
import Header from './utils/Header'
import SearchBar from './utils/SearchBar'
import * as d3 from 'd3'
import moment from 'moment'
export default {
    components: {
        Header,
        SearchBar,
    },
    computed: {
        rows() {
            return this.filteredVotes.length
        }
    },
    data() {
        return {
            isReady: false,
            votes: [],
            filteredVotes: [],
            perPage: 12,
            currentPage: 1,
            fields: [
                {
                    key: 'section',
                    label: 'Séance',
                    sortable: true
                },
                {
                    key: 'label',
                    label: 'Vote',
                    sortable: true
                },
                {
                    key: 'result',
                    label: 'Résultat',
                    sortable: true,
                    formatter: (value) => {
                        return value > 50 ? "<span class='text-success'><b>OUI</b> (" + value.toFixed(2) + "%)</span>" : "<span class='text-danger'><b>NON</b> (" + (100 - value).toFixed(2) + "%)</span>"
                    }
                },
                {
                    key: 'startTime',
                    label: 'Date et heure',
                    sortable: true,
                    formatter: (value) => {
                        return moment(value).format('DD.MM.YYYY HH:MM')
                    },
                },
            ]
        }
    },
    created() {
        d3.csv('/votes/Tous votes Constituante - Sheet1.csv').then((data) => {
            data.map((v) => {
                v.result = parseInt(v.numYes) * 100 / (parseInt(v.numYes) + parseInt(v.numNo))
            })
            this.votes = data
            this.filteredVotes = this.votes
        })
    },
    methods: {
        filterVotes(query) {
            if(!query || query === '') {
                this.filteredVotes = this.votes
                return
            }
            this.filteredVotes = this.votes.filter(v => v.label.includes(query) || v.affair.includes(query) || v.note.includes(query) || v.startTime.includes(query))
            this.currentPage = 1
        }
    },
    metaInfo: {
        titleTemplate: 'Historique des votes | %s'
    }
}
</script>

<style>

</style>