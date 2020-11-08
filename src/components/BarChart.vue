<template>
    <canvas id="myChart" width="400" height="400"></canvas>
</template>
<script>
const Chart = window.Chart;
export default {
    props: ['features'],
    data(){
        return {
            audioFeatures: this.features
        }
    },
    mounted(){
        var ctx = document.getElementById('myChart');
new Chart(ctx, {
    type: 'horizontalBar',
    data: {
        labels: ['Acousticness', 'Danceability', 'Energy', 'Instrumentalness', 'Liveness', 'Speechiness','Valence'],
        datasets: [{
            label: 'Audio Features',
            data: [this.audioFeatures.acousticness, this.audioFeatures.danceability,this.audioFeatures.energy, this.audioFeatures.instrumentalness,this.audioFeatures.liveness,this.audioFeatures.speechiness, this.audioFeatures.valence],
            backgroundColor: [
                '#1ba74b',
                '#1ba74b',
                '#1ba74b',
                '#1ba74b',
                '#1ba74b',
                '#1ba74b',
                '#1ba74b'
            ],
            barThickness: 25,
            barPercentage: 1,
            categoryPercentage: 1,
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        responsive: true
    }
});
    }
}
</script>
<style lang="scss" scoped>
#myChart{
    margin-top: 2rem;
    max-width: 450px;
    max-height: 450px;
}
</style>