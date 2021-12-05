import * as Yup from 'yup';

const CourseSchema = Yup.object().shape({
    name: Yup.string().required('זהו שדה חובה'),
    weight: Yup.number()
        .moreThan(0, 'ערך זה צריך להיות מספר חיובי')
        .required('זהו שדה חובה')
        .typeError('ערך זה צריך להיות מספר'),
    grade: Yup.number()
        .nullable(true)
        .integer('הציון צריך להיות מספר שלם')
        .moreThan(-1, 'הציון צריך להיות גדול מאפס')
        .lessThan(101, 'הציון לא יכול להיות גדול מ-100')
        .typeError('ערך זה צריך להיות מספר'),
    year: Yup.string()
        .matches(/^[0-9]+$/, "שנה יכולה להכיל ספרות בלבד")
        .min(4, 'שנה צריכה להכיל 4 ספרות')
        .max(4, 'שנה צריכה להכיל 4 ספרות')
        .required('זהו שדה חובה')
        .typeError('ערך זה צריך להיות מספר')
});

export { CourseSchema };