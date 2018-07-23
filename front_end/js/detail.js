var vm = new Vue({
    el: '#app',
    delimiters: ['[[', ']]'],
    data: {
        host,
        collection: true,
        collected: false,
        is_user: false,
        article_comments: [],
        article_id: '',

    },
    mounted: function () {
        this.get_comments();
    },
    methods: {
         get_comments: function () {
             axios.get(this.host + '/comments/'  + '1/', {
                 responseType: 'json',
             })
                 .then(response => {
                     this.article_comments = response.data;
                 })
                 .catch(error => {
                     console.log(error.response.data);
                     this.article_comments = [];
                 })
         }

    }
})