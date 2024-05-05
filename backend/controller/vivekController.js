import { testVivek } from "../models/testVivek.js";


export const postDetails = async (req, res, next) => {
    const { name,age,dob,email } = req.body;
   const newRecord = await testVivek.create({
    name:name,
    age: age,
    dob: dob,
    email : email
    });
 res.status(201).json({
    success: true,
    message: 'Record created successfully',
    data: newRecord,
 });
  };

  export const getDetails = async (req, res, next) => {
    try {
        // Assuming you're passing parameters as query parameters (e.g., /getDetails?name=John&age=25)
        const { name, age, dob, email } = req.query;

        // Building the query object based on the provided parameters
        const query = {};
        if (name) query.name = name;
        if (age) query.age = age;
        if (dob) query.dob = dob;
        if (email) query.email = email;

        const records = await testVivek.find(query);

        res.status(200).json({
            success: true,
            message: 'Records retrieved successfully',
            data: records,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};