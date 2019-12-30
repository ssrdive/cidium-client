import api from '../cidium-api';

export const loadDropdownGeneric = async (type, name, setForm) => {
    try {
        const response = await api.get(`/dropdown/${type}`);
        setForm(prevForm => {
            const updatedForm = {
                ...prevForm,
                [name]: { ...prevForm[name], options: response.data, value: response.data[0].id },
            };
            return updatedForm;
        });
    } catch (err) {
        console.log(err);
    }
};

export const loadOptionalDropdownGeneric = async (type, name, label, setForm) => {
    try {
        const response = await api.get(`/dropdown/${type}`);
        setForm(prevForm => {
            const updatedForm = {
                ...prevForm,
                [name]: { ...prevForm[name], options: [{ id: 0, name: `Select ${label}`},...response.data], value: 0 },
            };
            return updatedForm;
        });
    } catch (err) {
        console.log(err);
    }
};
