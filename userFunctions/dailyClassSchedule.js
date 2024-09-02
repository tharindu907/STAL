let classFunctions = require('./classes');
let dailyClassSchedule = require('../models/dailyClassSchedule.model');

async function updateDailyClassSchedule(date, { classId, startTime, endTime } = {}) { // '2024-08-26'
    try {     
        // Check if the date exists in the database
        let isDateExists = await dailyClassSchedule.findOne({ _id: date });

        if (!isDateExists) {
            const day = new Date(date).toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
        
            // Get the list of classes for the specific day
            const classSchedule = await classFunctions.getClassesForDay(date, day);

            // If the date doesn't exist, create a new record
            await dailyClassSchedule.create({
                _id: date,
                classes: classSchedule
            });
            
        } else if (classId && startTime && endTime) {

            const classCode = `${classId}.${date}.${startTime}`;

            const existingClass = isDateExists.classes.find(cls => cls.classCode === classCode);

            if (!existingClass) {
                // If the class doesn't exist, add it to the array
                await dailyClassSchedule.updateOne(
                    { _id: date }, 
                    { $push: { classes: { classCode, classId, startTime, endTime } } } // Add the new class to the classes array
                );
            } else {
                console.log(`Class ${classId} already exists for date ${date} from ${startTime} to ${endTime}.`);
            }
        }
      
    } catch (err) {
        console.error('Error updating class schedule for the date', date, ':', err);
        throw err;
    }
}

const timetablehandlerfilter = async (req,res) => {
    const { date, grade, subject, teacher } = req.query;
    // req.query contains the query parameters sent by the client. If any of these parameters are included in the request, they will be assigned to the corresponding variables

    updateDailyClassSchedule(date);

    try{
        const schedule = await dailyClassSchedule.findOne({ _id: date });
        const classIDs = schedule.classes.map(cls => cls.classes.classId);

        // Call the getDetialsForTimeTable function with the extracted parameters
        const filter = await classFunctions.getDetialsForTimeTable({
            classIDs: classIDs,
            grade: grade,
            subject: subject,
            teacher: teacher
        });

        console.log(filter);

    } catch (error) {
        res.status(500).json({ message: "Error updating query based on the user's selected criteria ", error });
    }
}


module.exports = {
    updateDailyClassSchedule,
    timetablehandlerfilter
}