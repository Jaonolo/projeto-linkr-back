import joi from "joi";

export const getUsersByNameSchema = joi.object({
    searchString: joi.string().required()
})
