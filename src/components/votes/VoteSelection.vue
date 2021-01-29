<template>
    <div class="border-top border-secondary pt-3">
        <h2 class="text-nouvelliste">Sélection de votes</h2>
        <p class="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur quis pharetra quam. In eu libero tristique, vulputate tortor in, varius est.</p> 
        <div v-if="groupedVotes">
            <b-card v-for="votes in groupedVotes" 
                :key="votes.section" 
                class="w-75 my-4 border rounded"            
                no-body   
            >
            <b-card-header class="bg-dark text-light">
                <h3>{{ votes.section }}</h3>
                <h6>{{ votes.date }}</h6>
            </b-card-header>
            <router-link v-for="vote in votes.votes" :key="vote.timeStart" :to="'/vote/' + vote.affair">
                <b-card-body>
                    <p class="lead text-dark">
                        <font-awesome-icon icon="vote-yea" class="mr-3" />
                        {{ vote.affair }}
                    </p>
                </b-card-body>
            </router-link>
            </b-card>
        </div>
    </div>
</template>

<script>
import * as d3 from 'd3'
import moment from 'moment'
export default {
    data() {
        return {
            votes: null,
            sections: null,
            groupedVotes: null,
        }
    },
    created() {
        d3.csv('/votes/Tous votes Constituante - Sheet1.csv').then((data) => {
            this.votes = data.filter(d => d.affair)
            this.sections = [...new Set(this.votes.map((v) => v.section))]
            this.groupedVotes = []
            this.sections.map((s) => {
                this.groupedVotes.push({
                    section: s,
                    date: moment(this.votes.find((v) => v.section === s).startTime).format('DD.MM.YYYY'),
                    votes: this.votes.filter((v) => v.section === s)
                })
            })
        })
    },
}
</script>

<style>

</style>