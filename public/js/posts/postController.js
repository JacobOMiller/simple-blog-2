var app = angular.module('MyApp');

app.controller('Posts.postController',[
    '$scope', '$http', '$state',
    function ($scope, $http, $state){
        console.log('post controller working');

        $scope.post={};


        // for creating posts
        $scope.create = function(id){
            if($scope.editPost.$valid == true){
                if(id != null || id != undefined){
                    $scope.update(id);
                    return;
                }
                console.log('create working');

                $http({
                    method:'Post',
                    url:'/posts',
                    data: $scope.post
                })
                .success (function(resonse){
                    console.log('item saved to db')
                    $state.go('blogPage');
                })
            }
            else{
                console.error('something is wrong with the form')
            }
        }

        //for reading all the posts
        $scope.readAll = function (){
            console.log('reading posts from the db');
            $http({
                method:'GET',
                url:'/posts?_sort=id&_order=DESC'
            })
            .success(function(response){
                console.log('the objects:', response);
                $scope.postList = response;
            })
        }


        //for reading post by id
        $scope.readById = function (id){

            $http({
                method: 'GET',
                url:'/posts/' + id
            })
            .success( function(response){
                console.log('this is the post object from server:' , response);
                $scope.post = response;
            })
        }


        //for editing posts
        $scope.update = function(id){
            console.log('update post working');
            $http ({
                url:'/posts/' + id,
                method:'PUT',
                data:$scope.post
            })
            .success(function (response){
                $state.go('posts-view', {id: id});
                console.log('thisis the response', response);

            })
            .error(function (response){
                console.error('this is the error', response);
            })
        }
        // delete function
        $scope.delete = function(id){
            console.log('update post working');
            $http ({
                url:'/posts/' + id,
                method:'DELETE',
                data:$scope.post
            })
            .success(function (response){
                $state.go('blogPage');
                console.log('thisis the response', response);

            })
            .error(function (response){
                console.error('this is the error', response);
            })
        }


        function setup (){
            var pageState = $state.current.name;
            if(pageState == 'blogPage'){
                $scope.readAll();
            }
            else if(pageState == 'posts-view'){
                var postId = $state.params.id;
                $scope.readById(postId);
            }
            else if (pageState == 'posts-update'){
                var postId = $state.params.id;
                $scope.readById(postId);
                $scope.mode = 'Edit Post';
                $scope.styleClass = 'warning';
            }
            else if(pageState == 'posts-create'){
                $scope.mode = 'Create Post';
                $scope.styleClass = 'success';

            }
        }

        setup();
    }
]);
