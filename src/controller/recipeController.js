const {NotFoundError} = require("../errors");
const {StatusCodes} = require("http-status-codes");
const Recipe = require("../model/Recipe");
const {checkPermissions} = require("../utils");
const cloudinary = require('cloudinary').v2;
const path = require('path');

const fs = require('fs');

const getRecipe = async (req, res) => {
    const recipe = await Recipe.findOne({_id: req.params.id, user: req.user.userId})
    if (!recipe) throw new NotFoundError('recipe not found')
    res.status(StatusCodes.OK).json({success: true, message: 'get recipe successfully', recipe})
}

const createRecipe = async (req, res) => {
    const userId = req.user.userId
    // console.log("from controller")
    //console.log(req.user.userId)
    try {
        const result = await cloudinary.uploader.upload(
            req.files.image.tempFilePath,
            {
                use_filename: true,
                folder: 'file-uploads',
            }
        );

        fs.unlinkSync(req.files.image.tempFilePath);

        const image = result.secure_url;
        console.log(image)
        const {name, ingredients, steps, prepTime} = req.body

        const newRecipe = await Recipe.create({
            name, ingredients, steps, prepTime, photo: image, user: userId,
        });
        res.status(StatusCodes.CREATED).json({
            success: true,
            message: 'Recipe created successfully',
            recipe: newRecipe
        });
    } catch (error) {
        console.error('Error creating recipe:', error);
    }


}
const updateRecipe = async (req, res) => {
    const recipeId = req.params.id
    const recipe = await Recipe.findOne({_id: recipeId})
    if (!recipe) throw new NotFoundError('recipe not found')
    checkPermissions(req.user, recipe.user)
    const updatedRecipe = await Recipe.findOneAndUpdate({_id: recipeId}, req.body, {runValidators: true, new: true})
    res.status(StatusCodes.OK).json({success: true, message: 'Recipe updated successfully', recipe: updatedRecipe})


}
const deleteRecipe = async (req, res) => {
    const recipe = await Recipe.findOne({_id: req.params.id, user: req.user.userId})
    if (!recipe) throw new NotFoundError('recipe not found')
    checkPermissions(req.user, recipe.user)
    await recipe.remove()
    res.status(StatusCodes.OK).json({success: true, message: 'Recipe deleted successfully'})
}
const getAllRecipes = async (req, res) => {
    //console.log(req.user)
    const userId = req.user.userId
    const recipes = await Recipe.find({user: userId})
    res.status(StatusCodes.OK).json({
        success: true, message: 'get all recipes successfully', count: recipes.length, recipes
    })
}

const uploadImage = async (req, res) => {
    try {
        if (!req.files || !req.files.image) {
            return res.status(StatusCodes.BAD_REQUEST).json({error: 'No image found'});
        }

        const file = req.files.image;

        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            use_filename: true,
            folder: 'Recipe-uploads',
        });

        fs.unlinkSync(file.tempFilePath);

        const image = {src: result.secure_url};
        return res.status(StatusCodes.OK).json(image);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: 'Something went wrong'});
    }
};


module.exports = {
    getRecipe, createRecipe, updateRecipe, deleteRecipe, getAllRecipes, uploadImage
}