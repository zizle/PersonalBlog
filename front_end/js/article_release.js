var vm = new Vue({
    el: "#app",
    data: {
        host,
        stair_categories: [],
        stair_category_id: '',  // 一级分类
        foxbase_categories: [],
        // 文章标题
        title: '',
        category_id: '', // 二级分类
        digest: '', // 摘要
        content: '',// 内容
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
            // 获取文章的内容
            var formData = new FormData();
            formData.append('title', this.title);
            formData.append('stair_category_id', this.stair_category_id);
            formData.append('category_id', this.category_id);
            formData.append('digest', this.digest);
            formData.append('content', this.content);
            axios.post(this.host + '/article/add/', {
                formData: formData
            },{
                responseType: 'json'
            })
                .then(response =>{
                    alert(response.data.data)
                })
                .catch(error =>{
                    alert("提交失败")
                })





        }
    }



})