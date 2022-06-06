import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product';

export default class ProductsController {
    public async store({request, response}: HttpContextContract){
        try{
            const {name, price, fornecedor} = request.body();
            if (await Product.create({name, price, fornecedor})){
                response.status(201).json({
                    created: true
                })
            }
        }catch(error){
            console.log(error);
        }
    }

    public async index({response}: HttpContextContract){
        try{
            const result = await Product.all();
            if (result.length > 0){
                return response.status(200).json({
                    message:"Success",
                    result
                })
            }else{
                return response.status(400).json({
                    message:"Não encontrado!",
                })
            }
        }catch(err){
            console.log(err);
        }
    }

    public async destroy({params, response}: HttpContextContract){
        try{
            const result = await Product.findOrFail(params.id);
            if (result){
                result.delete();
                return response.status(200).json({
                    message:"Success",
                })
            }else{
                return response.status(200).json({
                    message:"Não encontrado",
                })
            }
        }catch(err){    
            console.log(err);
        }
    }
}
