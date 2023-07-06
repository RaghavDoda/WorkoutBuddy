const { isObjectIdOrHexString } = require('mongoose')
const Workouts = require('../model/workoutsModel')
const mongoose = require('mongoose')

// Get all workouts 
const getWorkouts = async (req,res) =>{
    const user_id = req.user._id

    const workouts = await Workouts.find({user_id}).sort({createdAT:-1})
    res.status(200).json(workouts)
}

// Get a single workouts
const getWorkout = async (req,res) =>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).json({error : 'No such workout'})
    }
    const workout = await Workouts.findById(id)
    if(!workout){
        return res.status(404).json({error : 'No Such Workout'})
    }
    res.status(200).json(workout)
}

// Create new workout
const createWorkout = async (req,res) => {
    const {title,load,reps} =req.body

    let emptyFields = []
    if(!title){
        emptyFields.push('title')
    }
    if(!load){
        emptyFields.push('load')
    }
    if(!reps){
        emptyFields.push('reps')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error: ' Please Fill in all the Fields',emptyFields})
    }
    // add doc to db
    try{
        const user_id = req.user._id
        const workouts = await Workouts.create({title,load,reps,user_id})
        res.status(200).json(workouts)
    }catch(err){
        res.status(400).json({error:err.message})
    }
}

// delete a workout 
const deleteWorkout = async (req,res) =>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).json({error : 'No such workout'})
    }
    const workout = await Workouts.findOneAndDelete({_id:id})
    if(!workout){
        return res.status(404).json({error : 'No Such Workout'})
    }
    res.status(200).json(workout)
}

// update a workout
const updateWorkout = async (req,res) =>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).json({error : 'No such workout'})
    }
    const workout = await Workouts.findOneAndUpdate({_id:id},{
        ...req.body
    })
    if(!workout){
        return res.status(404).json({error : 'No Such Workout'})
    }
    res.status(200).json(workout)
}


module.exports = {
    getWorkout,
    getWorkouts,
    createWorkout,
    deleteWorkout,
    updateWorkout
}