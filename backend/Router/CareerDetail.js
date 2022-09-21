const express = require('express');
const router = express.Router();
const CareerDetailsModel = require('../Schema/CareerDetails')


router.get('/careerpaths', (req, res) => {
    CareerDetailsModel.find({})
        .then(data => {
            res.json({ value: data })
        })
        .catch(error => {
            res.json({ value: 'Error' })
        })
})

router.post('/addpaths', (req, res) => {
    const NewCareerDetail = new CareerDetailsModel({
        CareerPath: 'Graphic Designer',
        Department: 'Media',
        Description: 'Graphic designers create visual text and imagery concepts, by hand or using computer software, to communicate ideas that inspire, inform, or captivate consumers. They develop the overall layout and production design for advertisements, brochures, magazines, and corporate reports, etc.',
        HighSchool: 'English, Science, Mathematics',
        Inter: 'Science / Arts',
        UG: "B.Des in Graphic Design / B.Sc Graphic Design / B.A in Graphic Design /",
        PG: "M.Des / Certificate Course in Graphic Design / Diploma in Graphic Designing",
        Skills: "Creative Skills, Sound Communication Skills, IT Skills, Critical Thinking, Problem Solving Ability, Time Management, Eyr to Details, Knowledge of HTML, CSS, Photoshop etc.",
        Exams: 'Online Certificates / Competitions / hackathons'
    })
    NewCareerDetail.save()
        .then((data) => {
            res.json({ message: `Saved ${data}` })
        })
        .catch(() => {
            res.json({ message: 'Failed' })
        })
})

module.exports = router;