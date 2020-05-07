'use strict'

const {
  createUser,
  getUserById,
  getUserByEmail,
  getExposedUserData,
} = require('../user/handlers')
const { getLangByISO } = require('../lang/handlers')
const {
  getExercisesByCoachId,
  createExercise,
  deleteExercise,
} = require('../exercise/handlers')
const { addService, retrieveCoachServices } = require('../service/handlers')
const {
  getContactsByCoachId,
  createContact,
  getCoachLeadsById,
  getContactById,
} = require('../contact/handlers')
const {
  createWorkout,
  retrieveWorkoutsByOwnerId,
  retrieveWorkoutById,
  updateWorkout,
  deleteWorkout,
} = require('../workout/handlers')
const {
  createProgram,
  retrieveProgramsByOwnerId,
} = require('../program/handlers')
const {
  createAssignmentHandler,
} = require('../assignment/handlers')
const { LANG, ACCEPTED_LANGS } = require('../../_utils/constants')

const acceptedLanguagesValue = Object.keys(LANG).map((k) =>
  LANG[k].NAME.toLowerCase(),
)

const addServiceToCoach = async (req, res) => {
  try {
    if (!req.body.title) {
      throw new Error('Title is required')
    }

    const response = await addService({
      owner: req.user._id,
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      address: req.body.address,
      coordinates: req.body.coordinates,
      currency: req.body.currency,
    })

    res.status(201).json(response)
  } catch (error) {
    res.status(500).json({
      public_message: 'Service can not be added',
      debug_message: error.message,
    })
  }
}

const getCoachServices = async (req, res) => {
  try {
    const response = await retrieveCoachServices(req.user._id)

    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({
      public_message: 'Services can not be found',
      debug_message: error.message,
    })
  }
}

const retrieveCoachExercises = async (req, res) => {
  try {
    const response = await getExercisesByCoachId(req.user._id)

    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({
      public_message: 'Services can not be found',
      debug_message: error.message,
    })
  }
}

const addExerciseToCoach = async (req, res) => {
  try {
    const {
      body: { name, lang, instructions, videoUrl, isPrivate },
      user,
    } = req

    if (!name) throw new Error('Name is required')
    if (!lang) throw new Error('Lang is required')

    if (!acceptedLanguagesValue.includes(lang))
      throw new Error('Lang is invalid')

    const language = await getLangByISO(lang)
    const newExercise = await createExercise(
      user._id,
      language._id.toString(),
      name,
      null,
      instructions,
      videoUrl,
      isPrivate,
    )

    res.status(201).json(newExercise)
  } catch (error) {
    res.status(500).json({
      public_message: 'Exercise can not be added',
      debug_message: error.message,
    })
  }
}

//TODO: check if user ca remove this exercise
const removeExercise = async (req, res) => {
  try {
    let {
      params: { id },
    } = req
    if (!id) throw Error('exercise id needed')

    await deleteExercise(id)

    res.status(200).json('ok')
  } catch (error) {
    res.status(500).json({
      public_message: 'Could not remove exercise',
      debug_message: error.message,
    })
  }
}

const addCustomerToCoach = async (req, res) => {
  try {
    const {
      user: { _id },
      body: { email, firstName, lastName, phone, leadId },
    } = req

    let lead
    /**
     * Is no lead id we need to create the user
     */
    if (!leadId) {
      try {
        lead = await createUser(email, firstName, lastName, phone)
      } catch (error) {
        res.status(500).json({
          public_message: 'Cannot create the user',
          debug_message: error.message,
        })
      }
    } else {
      /**
       * Else we should add the existing user as a contact
       * In that case we check is the contact is not already present
       */
      lead = await getUserById(leadId)

      if (!lead) throw new Error('Lead not found')
      if (lead._id === _id) throw new Error('You cannot be your own customer')

      const leads = await getCoachLeadsById(_id, leadId)

      if (leads.length) throw new Error('Lead already a contact')
    }

    const newContact = await createContact(_id, lead._id)
    const newContactToSend = await getContactById(newContact._id)

    res.status(200).json(newContactToSend)
  } catch (error) {
    res.status(500).json({
      public_message: 'Error in adding customer to coach',
      debug_message: error.message,
    })
  }
}

const retrieveCoachCustomers = async (req, res) => {
  try {
    const {
      user: { _id },
    } = req

    const customers = await getContactsByCoachId(_id)

    res.status(200).json(customers)
  } catch (error) {
    res.status(500).json({
      public_message: 'Error in adding customer to coach',
      debug_message: error.message,
    })
  }
}

//TODO: why don't we return an array with possible matches ?
const searchUserAsCoach = async (req, res) => {
  try {
    const {
      query: { email },
    } = req

    const result = await getUserByEmail(email)

    res.status(200).json(result ? getExposedUserData(result) : null)
  } catch (error) {
    res.status(500).json({
      public_message: 'Error in adding customer to coach',
      debug_message: error.message,
    })
  }
}

const addWorkout = async (req, res) => {
  try {
    const {
      user,
      body: { isPrivate, lang, title, content, exercises },
    } = req

    if (!lang) throw new Error('Lang is required')

    if (!ACCEPTED_LANGS.includes(lang)) throw new Error('Lang is invalid')

    const language = await getLangByISO(lang)
    const newWorkout = await createWorkout(
      user._id,
      language._id.toString(),
      title,
      content,
      exercises || null,
      false,
      isPrivate,
    )
    res.status(201).json(newWorkout)
  } catch (error) {
    res.status(500).json({
      public_message: 'could not create new workout',
      debug_message: error.message,
    })
  }
}

const retrieveWorkouts = async (req, res) => {
  try {
    const {
      params: { id },
    } = req

    const workouts = await retrieveWorkoutsByOwnerId(id)

    res.status(200).json(workouts)
  } catch (error) {
    res.status(500).json({
      public_message: 'could not retrieve workout',
      debug_message: error.message,
    })
  }
}

const retrieveWorkout = async (req, res) => {
  try {
    const {
      params: { workoutId },
    } = req
    if (!workoutId) throw new Error('Workout id is required')

    const workout = await retrieveWorkoutById(workoutId)

    res.status(200).json(workout)
  } catch (error) {
    res.status(500).json({
      public_message: 'could not retrieve workout',
      debug_message: error.message,
    })
  }
}

const editWorkout = async (req, res) => {
  try {
    const {
      body,
      params: { workoutId },
    } = req

    if (!workoutId) throw new Error('workout id is required')

    const updatedWorkout = await updateWorkout(workoutId, body)

    res.status(200).json(updatedWorkout)
  } catch (error) {
    res.status(500).json({
      public_message: 'could not update workout',
      debug_message: error.message,
    })
  }
}

const removeWorkout = async (req, res) => {
  try {
    const {
      params: { workoutId },
    } = req
    if (!workoutId) throw new Error('Workout id needed')

    await deleteWorkout(workoutId)

    res.status(200).json({ message: 'workout deleted' })
  } catch (error) {
    res.status(500).json({
      public_message: 'could not delete workout',
      debug_message: error.message,
    })
  }
}

const addProgram = async (req, res) => {
  try {
    const {
      user,
      body: { isPrivate, days, workouts, lang, title, description },
    } = req
    console.log(isPrivate, days, workouts, lang, title, description)

    if (!days) throw new Error('Days is required')

    if (!title) throw new Error('Title is required')

    if (!lang) throw new Error('Lang is required')

    if (!ACCEPTED_LANGS.includes(lang)) throw new Error('Lang is invalid')

    const language = await getLangByISO(lang)
    const newProgram = await createProgram(
      user._id,
      days,
      language._id.toString(),
      title,
      description,
      workouts || [],
      false,
      isPrivate,
    )

    res.status(201).json(newProgram)
  } catch (error) {
    res.status(500).json({
      public_message: 'could not create new program',
      debug_message: error.message,
    })
  }
}

const retrievePrograms = async (req, res) => {
  try {
    const {
      params: { id },
    } = req

    const programs = await retrieveProgramsByOwnerId(id)

    res.status(200).json(programs)
  } catch (error) {
    res.status(500).json({
      public_message: 'could not retrieve workout',
      debug_message: error.message,
    })
  }
}

const createAssignment = async (req, res) => {
  try {
    const {
      params: { id },
      body: { trainees, workouts, title, description, language, startDate },
    } = req

    /*{
      trainees: [ids],
      content: [program, workouts, exercises]
    }*/

    let assignment = await createAssignmentHandler(id, trainees, workouts, title, description, language, startDate)

    res.status(200).json(assignment);
  } catch(error) {
    res.status(500).json({
      public_message: "Could not assign",
      debug_message: error.message
    })
  }
}

module.exports = {
  addServiceToCoach,
  getCoachServices,
  retrieveCoachExercises,
  addExerciseToCoach,
  addCustomerToCoach,
  retrieveCoachCustomers,
  searchUserAsCoach,
  removeExercise,
  addWorkout,
  retrieveWorkouts,
  retrieveWorkout,
  editWorkout,
  removeWorkout,
  addProgram,
  retrievePrograms,
  createAssignment,
}
