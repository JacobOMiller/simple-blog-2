'use strict';

var app = angular.module('MyApp',['ui.router']);

app.config([
    '$stateProvider',
    function ($stateProvider){
        $stateProvider
        .state('home',{
            url:'/home',
            template:'<h2>home</h2>'
        })
        .state('about',{
            url:'/about',
            template:'<h2>about</h2>'
        })
        .state('contact',{
            url:'/contact',
            template:'<h2>contact</h2>'
        })
        .state('blogPage',{
            url:'/blog',
            templateUrl:'/templates/blog/list.html',
            controller:'Posts.postController'
        })
        .state('posts-create',{
            url:'/blog/create',
            templateUrl:'/templates/blog/edit.html',
            controller:'Posts.postController'
        })
        .state('posts-view',{
            url:'/blog/:id',
            templateUrl:'/templates/blog/postView.html',
            controller:'Posts.postController'
        })
        .state('posts-update',{
            url:'/blog/:id/update',
            templateUrl:'/templates/blog/edit.html',
            controller:'Posts.postController'
        });

    }
])
