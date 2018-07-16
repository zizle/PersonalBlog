window.onload = function () {

    var left = new Vue({
        el: '#leftapp',
        data: {
            host,
            show_blogger_top: true,
            show_article_category: [],
            uptodate_articles: [],
        },
        mounted: function () {
          this.show_article_category = ['最新'];
          this.get_articles();
        },
        methods: {
            get_articles: function () {
            axios.get(this.host + '/articles/', {
                responseType: 'Json'
            })
                .then(response => {
                    this.uptodate_articles = response.data
                })
                .catch(error => {
                    this.uptodate_articles = [];
                    console.log(error.response.data)
                })
            },

        },
    });
     var nav = new Vue({
    el: '#navapp',
    data: {
        host,
        knowledge_category: [],
        skill_article_category: [],


    },
    mounted: function () {
        this.get_knowledge_category();
        this.get_skill_article_category();


    },
    methods: {

        get_knowledge_category: function () {
            axios.get(this.host + '/categories/1/', {
            responseType: 'Json'
        })
            .then(response => {
                this.knowledge_category = response.data.subs;

                console.log(response.data.subs)
            })
            .catch(error => {
                console.log(error.response.data);
                this.knowledge_category = []
            })
        },
        get_skill_article_category: function () {
            axios.get(this.host + '/categories/2/', {
            responseType: 'Json'
        })
            .then(response => {
                this.skill_article_category = response.data.subs;

                console.log(response.data.subs)
            })
            .catch(error => {
                console.log(error.response.data);
                this.skill_article_category = []
            })
        },
        click_knowledge_learn: function () {
            left.$data.show_blogger_top = false;
            left.$data.show_article_category = ['知识学习'];
        }
    },
});
}

