const validatorConfig = {
    name: {
        isRequired: {
            message: 'Имя пользователя обязательно для заполнения'
        }
    },
    email: {
        isRequired: {
            message: 'Электронная почта обязательна для заполнения'
        },
        isEmail: {
            message: 'Email введен некорректно'
        }
    },
    profession: {
        isRequired: {
            message: 'Обязательно выберите вашу профессию'
        }
    }
}

export default validatorConfig
