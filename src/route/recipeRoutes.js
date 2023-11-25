const express = require('express');
const router = express.Router();
const {decodeToken} = require('../middleware/authentication')

const {
    createRecipe, updateRecipe, deleteRecipe, getRecipe, getAllRecipes, uploadImage
} = require('../controller/recipeController');

router
    .route('/')
    .post(decodeToken, createRecipe)
    .get(decodeToken, getAllRecipes)

router
    .route('/:id')
    .get(decodeToken, getRecipe)
    .patch(decodeToken, updateRecipe)
    .delete(decodeToken, deleteRecipe)


router
    .route('/uploadImage')
    .post(uploadImage);

module.exports = router;
