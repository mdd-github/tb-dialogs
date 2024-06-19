import {useEffect, useMemo, useState} from "react";


const required = (value) => {
    if (value == null || (typeof value === 'string' && value.length === 0)) {
        return 'Поле обязательно для заполнения';
    }
    return null;
}

const validationRules = {
    required
}

export const useForm = (initialValues, validationSchema) => {
    const [values, setValues] = useState(initialValues);
    const [touchedFields, setTouchedFields] = useState([]);
    const [errors, setErrors] = useState({});

    const validateOne = (key) => {
        const rules = validationSchema[key]?.split('|');

        let firstError = null;
        for (let rule of rules) {
            firstError = validationRules[rule]?.(values[key]);
            if (firstError != null) {
                break;
            }
        }

        return firstError;
    }

    const validate = () => {
        const errors = Object.keys(values).reduce((result, key) => {
            if (validationSchema.hasOwnProperty(key)) {
                result[key] = validateOne(key);
            } else {
                result[key] = null;
            }
            return result;
        }, {});

        setErrors(errors);
    }

    const updateValue = (key, value) => {
        setValues({
            ...values,
            [key]: value,
        });

        setTouchedFields([
            ...touchedFields,
            key,
        ]);
    }

    useEffect(() => {
        validate();
    }, [values]);

    const onChangeById = (e) => {
        updateValue(e.target.id, e.target.value);
    }

    const resetValues = () => {
        setValues(initialValues);
        setTouchedFields([]);
        setErrors({});
    }

    const isFieldTouched = (key) => touchedFields.includes(key);

    const valid = useMemo(
        () => Object.values(errors).find((x) => x != null) == null,
        [errors]
    );

    return {
        values,
        setValues,
        updateValue,
        onChangeById,
        validate,
        touchedFields,
        isFieldTouched,
        resetValues,
        errors,
        valid
    }
}