const express = require('express')

let messagea = require('../models/message')

let {projectModel} = require('../models/project');
const { model, Types, default: mongoose } = require('mongoose');

async function sendmessage(req,res){
    let{fullname,email,mobile,role,message} = req.body;

    let writemessage = await messagea.create({
        fullname,
        email,
        mobile,
        role,
        message,
    })
    res.send('Thank You !! we will Contact You soon !! ')

}

async function showproject (req,res){
    let projects = await projectModel.find({});

    res.render('portfolio',{projects});

}
async function showallproject (req,res){
    let projects = await projectModel.find({});

    res.render('allprojects',{projects});

}

async function getproject(req,res){
    let {description,name,image,url} = req.body;
    let addproject = await projectModel.create({
        name,
        description,
        image:`${req.file.filename}`,
        url

    })
   res.redirect('/#skills');
   console.log(addproject);

   
}

module.exports = {sendmessage,showproject,getproject,showallproject}