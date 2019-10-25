var app = new Vue({
    el: "#app",
    data: {
        title: "",
        image: "",
        ingredients: [],
    },
    methods: {
        async fetchREST() {
            const value = document.getElementById("recipeInput").value;
            if (value == "")
                return;
            console.log("HI");

            let response = await axios({
                method: "get",
                url: "https://cors-anywhere.herokuapp.com/" + "https://community-food2fork.p.rapidapi.com/search?q=" + value + "&key=59e1b3a1b1a4a63a2b8060a4358a3a77",
                headers: {
                    "x-rapidapi-host": "community-food2fork.p.rapidapi.com",
                    "x-rapidapi-key": "76fa0a82f0msh2d0eb9052d4c7f1p103ca5jsneb2a318a3260"
                },
            });

            console.log(response.data);


            let id = "";
            id = response.data.recipes[0].recipe_id;
            let newResponse = await axios({
                method: "get",
                url: "https://cors-anywhere.herokuapp.com/" + "https://community-food2fork.p.rapidapi.com/get?rId=" + id + "&key=59e1b3a1b1a4a63a2b8060a4358a3a77",
                "headers": {
                    "x-rapidapi-host": "community-food2fork.p.rapidapi.com",
                    "x-rapidapi-key": "76fa0a82f0msh2d0eb9052d4c7f1p103ca5jsneb2a318a3260"
                }
            })

            this.title = newResponse.data.recipe.title;
            console.log(this.title);

            this.image = newResponse.data.recipe.image_url;
            console.log(this.image);

            for (let i = 0; i < newResponse.data.recipe.ingredients.length; i++) {
                this.ingredients.push({ name: newResponse.data.recipe.ingredients[i]});
                console.log(this.ingredients[i]);
            }


            //         fetch("https://cors-anywhere.herokuapp.com/" + "https://community-food2fork.p.rapidapi.com/search?q=" + value + "&key=59e1b3a1b1a4a63a2b8060a4358a3a77", {
            //                 "method": "GET",
            //                 "headers": {
            //                     "x-rapidapi-host": "community-food2fork.p.rapidapi.com",
            //                     "x-rapidapi-key": "76fa0a82f0msh2d0eb9052d4c7f1p103ca5jsneb2a318a3260"
            //                 }
            //             })
            //             .then(response => {
            //                 console.log(response);
            //                 return response.json();
            //             }).then(function(json) {
            //                 console.log(json);
            // let id = "";
            // id = json.recipes[0].recipe_id;
            // console.log(id);

            // fetch("https://cors-anywhere.herokuapp.com/" + "https://community-food2fork.p.rapidapi.com/get?rId=" + id + "&key=59e1b3a1b1a4a63a2b8060a4358a3a77", {
            //         "method": "GET",
            //         "headers": {
            //             "x-rapidapi-host": "community-food2fork.p.rapidapi.com",
            //             "x-rapidapi-key": "76fa0a82f0msh2d0eb9052d4c7f1p103ca5jsneb2a318a3260"
            //         }
            //     })
            //     .then(response => {
            //         console.log(response);
            //         return response.json();
            //     }).then(function(json) {
            //         console.log(json);

            //         this.title = json.recipe.title;
            //         console.log(this.title);

            //         this.image = json.recipe.image_url;
            //         console.log(this.image);

            //         for (let i = 0; i < json.recipe.ingredients.length; i++) {
            //             this.ingredients.push(json.recipe.ingredients[i]);
            //             console.log(this.ingredients[i]);
            //         }

            //     })
            //                     .catch(err => {
            //                         console.log(err);
            //                     });
            //             })
            //             .catch(err => {
            //                 console.log(err);
            //             });
        }
    },
});
