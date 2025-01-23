import { atom } from 'recoil'

export const updateExpense = atom({
    key: 'updateExpense',
    default: {
        id: "",
        title: "",
        category: "",
        amount: ""
    }
  });