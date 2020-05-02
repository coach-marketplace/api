'use strict'

const coachRouter = require('express').Router()

const {
  requireJWTAuth,
  requireAccessMyData,
  // requireAccessMyWorkouts,
} = require('../middleware/auth')

const {
  addCustomerToCoach,
  addExerciseToCoach,
  addServiceToCoach,
  getCoachServices,
  retrieveCoachCustomers,
  retrieveCoachExercises,
  searchUserAsCoach,
  addWorkout,
  retrieveWorkouts,
  retrieveWorkout,
  editWorkout,
  removeWorkout,
  addProgram,
  retrievePrograms,
} = require('../controllers/coach')

coachRouter
  .get('/:id/services', requireJWTAuth, requireAccessMyData, getCoachServices)
  .post(
    '/:id/services/add',
    requireJWTAuth,
    requireAccessMyData,
    addServiceToCoach,
  )
  .get(
    '/:id/exercises',
    requireJWTAuth,
    requireAccessMyData,
    retrieveCoachExercises,
  )
  .post(
    '/:id/exercises/',
    requireJWTAuth,
    requireAccessMyData,
    addExerciseToCoach,
  )
  .get(
    '/:id/customers',
    requireJWTAuth,
    requireAccessMyData,
    retrieveCoachCustomers,
  )
  .post(
    '/:id/customers',
    requireJWTAuth,
    requireAccessMyData,
    addCustomerToCoach,
  )
  .get(
    '/:id/search-users',
    requireJWTAuth,
    requireAccessMyData,
    searchUserAsCoach,
  )
  .post('/:id/workouts', requireJWTAuth, requireAccessMyData, addWorkout)
  .get('/:id/workouts', requireJWTAuth, requireAccessMyData, retrieveWorkouts)
  .get(
    '/:id/workouts/:workoutId',
    requireJWTAuth,
    requireAccessMyData,
    retrieveWorkout,
  )
  .put(
    '/:id/workouts/:workoutId',
    requireJWTAuth,
    requireAccessMyData,
    editWorkout,
  )
  .delete(
    '/:id/workouts/:workoutId',
    requireJWTAuth,
    requireAccessMyData,
    removeWorkout,
  )
  .post('/:id/programs', requireJWTAuth, requireAccessMyData, addProgram)
  .get('/:id/programs', requireJWTAuth, requireAccessMyData, retrievePrograms)

module.exports = coachRouter
