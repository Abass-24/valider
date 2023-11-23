class Ufr 
{
    constructor(id, name, filieres){
        this.id = id;
        this.name = name;
        this.filieres = filieres;
    }
}
class Filiere
{
    constructor(id, name, classes){
        this.id = id;
        this.name = name;
        this.classes = classes;
    }
}
class Classe{
    constructor(id, name, matieres){
        this.id = id;
        this.name = name;
        this.matieres = matieres;
    }
}
class Matiere{
    constructor(id, name, evaluations){
        this.id = id;
        this.name = name;
        this.evaluations = evaluations;
    }
}
class Evaluation{
    constructor(id, name, sujet, correction){
        this.id = id;
        this.name = name;
        this.sujet = sujet;
        this.correction = correction;
    }
}

var evals = []
for(i = 0; i < 10; i++)
{
    evals[i] = new Evaluation(i, "devoir"+i, "SOCIETE2.pdf", "SOCIETE2.pdf")
}

var matieres = []
for(i = 0; i < 3; i++)
{
    matieres[i] = new Matiere(i, "matiere"+i, evals)
}

var classes = []
for(i = 0; i < 4; i++)
{
    classes[i] = new Classe(i, "classe"+i, matieres)
}

var filieres = []
for(i = 0; i < 4; i++)
{
    filieres[i] = new Filiere(i, "filiere"+i, classes)
}

var ufrs = []
for(i = 0; i < 9; i++)
{
    ufrs[i] = new Ufr(i, "ufr"+i, filieres)
}


/*
var ufrsName = ["IPSL", "SAT", "SEG", "S2ATA", "LSH", "CRAC", "SJP", "MEDECINE"]
var filiereIpslName = ["CPI", "ING INFO", "ING MECA", "ING CIVIL"]
var ClasseIpslName

Filiere(0, "CPI", classesCPI)


var ufrs = []
for (i = 0; i < 8; i++)
{

    ufrs[i] = Ufr(i, ufrsName[i], filieres[0][i]);
}
*/


var app = angular.module("MyApp",['ngRoute']);

app.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/evaluation/:id',{templateUrl : 'evaluation.html', controller : 'EvaluationCtrl'})
        .when('/matiere/:id',{templateUrl : 'matiere.html', controller : 'MatiereCtrl'})
        .when('/classe/:id',{templateUrl : 'classe.html', controller : 'ClasseCtrl'})
        .when('/filiere/:id',{templateUrl : 'filiere.html', controller : 'FiliereCtrl'})
        .when('/',{templateUrl : 'home.html', controller : 'HomeCtrl'})
        .otherwise({redirectTo : '/'});

    $locationProvider.html5Mode(true);
});

app.controller("HomeCtrl", function ($scope) {
    $scope.ufrs = ufrs;
});

var param = []
app.controller("FiliereCtrl", function ($scope, $routeParams) {
    $scope.ufr = ufrs[$routeParams.id]
    param[0] = $routeParams.id
})

app.controller("ClasseCtrl", function ($scope, $routeParams) {
    $scope.filiere = ufrs[param[0]].filieres[$routeParams.id]
    param[1] = $routeParams.id
})

app.controller("MatiereCtrl", function ($scope, $routeParams) {
    $scope.classe = ufrs[param[0]].filieres[param[1]].classes[$routeParams.id]
    param[2] = $routeParams.id
})

app.controller("EvaluationCtrl", function ($scope, $routeParams) {
    $scope.matiere = ufrs[param[0]].filieres[param[1]].classes[param[2]].matieres[$routeParams.id]
})

/*
app.factory("ufrFactory",function(){
    var factory = {
        ufrs : [
            {
                "id" : 0,
                "name" : "IPSL",
                "filieres" : []
            },
            {
                "id" : 1,
                "name" : "SAT",
                "filieres" : ["L1", "L2", "L3"]
            },
            {
                "id" : 2,
                "name" : "SEG",
                "filieres" : ["L1", "L2", "L3"]
            },
            {
                "id" : 3,
                "name" : "LSH",
                "filieres" : ["L1", "L2", "L3"]
            },
            {
                "id" : 4,
                "name" : "SJP",
                "filieres" : ["L1", "L2", "L3"]
            },
            {
                "id" : 5,
                "name" : "MEDECINE",
                "filieres" : ["L1", "L2", "L3,"]
            },
            {
                "id" : 6,
                "name" : "S2ATA",
                "filieres" : ["L1", "L2", "L3,"]
            },
            {
                "id" : 7,
                "name" : "CRAC",
                "filieres" : ["L1", "L2", "L3,"]
            }
        ],
        getFiliere : function(id){
            for (el in factory.ufrs){
                if (el.id == id){
                    return el.filiere
                }
            }
        }
    }
    return factory;
});

*/

/*
            app.factory('PostFactory', function($http, $q, $timeout){
                var factory = {
                    posts : false,
                    getPosts : function() {
                        var deffered = $q.defer();
                        if(factory.posts == false)
                        {
                            $http.get('posts.json')
                                .then(function(response) {
                                    factory.posts = response.data;
                                    $timeout(() => {
                                        deffered.resolve(factory.posts);
                                    }, 1000)
                    
                                }).catch(function(error) {
                                    deffered.reject("Impossible de recupèrer les articles");
                                });
                        }else{
                            deffered.resolve(factory.posts);
                        }

                        return deffered.promise;
                    },
                    getPost : function(id) {
                        var deffered = $q.defer();
                        factory.getPosts()
                            .then(function(response) {
                                var post = {};
                                angular.forEach(response, function(value, key) {
                                if(value.id == id)
                                    post = value;
                                })
                                deffered.resolve(post);
                            }).catch(function(error) {
                                deffered.reject("Impossible de recupèrer les commentaires");
                            });

                        return deffered.promise;
                    },
                    add : function (params) {
                        let deffered = $q.defer();
                        //envoyer les donnees au serveur ou base de donnee
                        deffered.resolve();
                        return deffered.promise;
                    }
                };
                return factory;
            })
            app.controller('PostsCtrl',function ($scope, PostFactory) {
                $scope.loading = true;
                PostFactory.getPosts().then((posts) => {
                    $scope.loading = false;
                    $scope.posts = posts;
                }).catch((msg) => {
                    alert(msg);
                });
            })
            app.controller('CommentsCtrl',function($scope, PostFactory, $routeParams) {
                $scope.loading = true;
                PostFactory.getPost($routeParams.id).then(function(post) {
                    $scope.loading = false;
                    $scope.comments = post.comments;
                    $scope.title = post.name;
                }).catch(function() {
                    alert(msg);
                });

                $scope.newComment = {};
                $scope.addComment = function() {
                    $scope.comments.push($scope.newComment)
                    $scope.newComment = {};
                    //PostFactory.add().then().catch()
                }
            });
*/