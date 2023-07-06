const express = require('express')
const router = express.Router()
const {
    createWorkout,
    getWorkout,
    getWorkouts,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutControllers')
const requireAuth = require('../middleware/requireAuth')

//require auth for all workouts routes
router.use(requireAuth)

//Get all workouts
router.get('/',getWorkouts)

//GET a single workouts 
router.get('/:id',getWorkout)

//POST a new workout
router.post('/', createWorkout)

//DELETE a new workout
router.delete('/:id',deleteWorkout)

//Update a new workout
router.patch('/:id',updateWorkout)

module.exports = router