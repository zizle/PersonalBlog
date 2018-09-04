var vm = new Vue({
    el: "#app",
    data: {
        host,
        stair_categories: [],
        stair_category_id: '',
        foxbase_categories: [],
    },
    mounted: function () {
        axios.get(this.host + '/categories/', {
                responseType: 'json'
            })
            .then(response => {
                this.stair_categories = response.data;
            })
            .catch(error => {
                alert(error.response.data);
            });
    },
     watch: {
         'stair_category_id': function () {
             if (this.stair_category_id) {
                 axios.get(this.host + '/categories/' + this.stair_category_id + '/', {
                     responseType: 'json'
                 })
                     .then(response => {
                         this.foxbase_categories = response.data.subs;
                     })
                     .catch(error => {
                         console.log(error.response.data);
                         this.foxbase_categories = [];
                     });
             }
         }
     },
    methods:{
        article_submit:function () {
            console.log('文章提交')
        }
    }



})