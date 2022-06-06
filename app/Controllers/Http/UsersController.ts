import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {

    public async store({request, response}: HttpContextContract){
        const {email, name, password} = request.body();
        if (await User.create({email: email, password:password, name: name})){
            response.status(201).json({
                created: true,
                message: "Usuario criado!"
            })
        }else{
            response.status(400).json({
                created: false
            })
        }
    }

    public async index({request, response}: HttpContextContract){
        const result = await User.all();
        if (result){
            return response.status(200).json({
                error: false,
                result
            })
        }else{
            return response.status(400).json({
                message:"Nada encontrado!"
            })
        }
    }

    public async show({params, response}: HttpContextContract){
        const result = await User.findOrFail(params.id)

        if (result){
            return response.status(200).json({
                error: false,
                result
            })
        }else{
            return response.status(400).json({
                message:"Nada encontrado!"
            })
        }
    }

   
}
