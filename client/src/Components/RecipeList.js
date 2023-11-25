import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Button, Form, Input, InputNumber, message, Modal, Table, Upload} from "antd";

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const token = window.localStorage.getItem('token');
    const [form] = Form.useForm();
    const [selectedFile, setSelectedFile] = useState(null);
    const handleAddRecipe = () => {
        form.resetFields();
        setModalVisible(true);
    };
    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/v1/recipes', {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                });
                //console.log('Token:', token)
                console.log('Recipes:', response.data.recipes)
                setRecipes(response.data?.recipes);
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        };

        fetchRecipes();
    }, []);

    const handleCreate = async (values) => {
        try {
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('ingredients', values.ingredients.split('\n'));
            formData.append('steps', values.steps);
            formData.append('prepTime', parseInt(values.prepTime));
            formData.append('image', selectedFile);
            console.log('Recipe data:', formData)

            const response = await axios.post(
                'http://localhost:5001/api/v1/recipes',
                formData,
                {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                }
            );

            console.log('Recipe created:', response.data.recipe);
            setModalVisible(false);
            message.success('Recipe created successfully!');
            setRecipes([...recipes, response.data.recipe]);
        } catch (error) {
            console.error('Error creating recipe:', error);
            message.error('Failed to create recipe');
        }
    };

    const handleUpdate = async (recipe) => {
        try {
            const response = await axios.patch(
                `http://localhost:5001/api/v1/recipes/${recipe._id}`,
                recipe, // Pass updated recipe data
                {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                }
            );
            console.log('Updated recipe:', response.data);
            message.success('Recipe updated successfully!');

        } catch (error) {
            console.error('Error updating recipe:', error);

        }
    };

    const handleDelete = async (recipe) => {
        try {
            // Your logic for deleting the recipe goes here
            await axios.delete(`http://localhost:5001/api/v1/recipes/${recipe._id}`, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            });
            message.success('Recipe deleted successfully!');
            console.log('Deleted recipe with ID:', recipe._id);
            setRecipes(recipes.filter((r) => r._id !== recipe._id));
            // Handle success or update UI accordingly (e.g., remove the recipe from the list)
        } catch (error) {
            console.error('Error deleting recipe:', error);
            // Handle error or show error message
        }
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const columns = [
        {
            title: 'Photo',
            dataIndex: 'photo',
            key: 'photo',
            render: photo => (
                <img src={photo} alt="Recipe" style={{maxWidth: '100px', maxHeight: '100px'}}/>
            ),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },

        {
            title: 'Ingredients',
            dataIndex: 'ingredients',
            key: 'ingredients',
            render: ingredients => (
                <ul>
                    {ingredients.map((ingredient, index) => (
                        <li key={`${ingredient}-${index}`}>{ingredient}</li>
                    ))}
                </ul>
            ),
        },
        {
            title: 'Steps',
            dataIndex: 'steps',
            key: 'steps',

        },
        {
            title: 'Prep Time (mins)',
            dataIndex: 'prepTime',
            key: 'prepTime',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <span>
                    <Button onClick={() => handleUpdate(record)}>Update</Button>
                    <Button onClick={() => handleDelete(record)}>Delete</Button>
                </span>
            ),
        },
    ]
    return (
        <div>

            <Table dataSource={recipes} columns={columns}/>
            <Modal
                title="Add Recipe"
                open={modalVisible}
                onOk={() => form.submit()}
                onCancel={() => setModalVisible(false)}
            >
                <Form form={form} onFinish={handleCreate} layout="vertical">
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[{required: true, message: 'Please enter the recipe name'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        name="ingredients"
                        label="Ingredients"
                        rules={[{required: true, message: 'Please enter the ingredients'}]}
                    >
                        <Input.TextArea rows={4}/>
                    </Form.Item>
                    <Form.Item
                        name="steps"
                        label="Steps"
                        rules={[{required: true, message: 'Please enter the recipe steps'}]}
                    >
                        <Input.TextArea rows={4}/>
                    </Form.Item>
                    <Form.Item
                        name="prepTime"
                        label="Preparation Time"
                        rules={[{required: true, message: 'Please enter the preparation time'}]}
                    >
                        <InputNumber style={{width: '100%'}}/>
                    </Form.Item>

                    <input type="file" onChange={handleFileChange}/>

                </Form>
            </Modal>

            <Button type="primary" onClick={handleAddRecipe} style={{marginBottom: '1rem'}}>
                Add Recipe
            </Button>
        </div>
    );
};

export default RecipeList;
