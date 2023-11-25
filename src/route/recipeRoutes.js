const express = require('express');
const router = express.Router();
const {authorizePermissions, decodeToken} = require('../middleware/authentication')

const {
    createRecipe, updateRecipe, deleteRecipe, getRecipe, getAllRecipes, uploadImage
} = require('../controller/recipeController');

router
    .route('/')
    .post([decodeToken, authorizePermissions('owner')], createRecipe)
    .get([decodeToken, authorizePermissions('owner')], getAllRecipes)

router
    .route('/:id')
    .get([decodeToken, authorizePermissions('owner')], getRecipe)
    .patch([decodeToken, authorizePermissions('owner')], updateRecipe)
    .delete([decodeToken, authorizePermissions('owner')], deleteRecipe)


router
    .route('/uploadImage')
    .post(uploadImage);

module.exports = router;
