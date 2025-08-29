import { createSlice } from "@reduxjs/toolkit";

const initialState = { // suggested
    fullName: '',
    size: '',
    '1': false,
    '2': false,
    '3': false,
    '4': false,
    '5': false,
}

const TOPPING_IDS = ['1', '2', '3', '4', '5']

const pizzaFormSlice = createSlice({
    name: 'pizzaForm',
    initialState,
    reducers: {
        bundleOrder: {
            prepare: (form) => {
                const payload = {
                    fullName:form.fullName.trim(),
                    size: form.size,
                    toppings: TOPPING_IDS.filter(id => form[id]),
                }
                return { payload }
            },
            reducer: (state, action) => {
                state.lastPayload = action.payload
            }
        },
        fieldChanged: (state, action) => {
            const { name, value } = action.payload
            state[name] = value
        },
        resetForm: () => initialState
    }
})

export const {
    bundleOrder,
    fieldChanged,
    resetForm
}  = pizzaFormSlice.actions

export default pizzaFormSlice.reducer