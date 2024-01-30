import {Api} from "../axios-config";
import {IDetalheTarefa} from "../tarefas/TarefasService";
export interface IRedis  {
    "key": string;
}
const get = async (dados: IRedis): Promise<string | Error> => {
    try {
        const { data } = await Api.post<string>('/redis', dados);

            return data;


    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || 'Erro pegar valor da chave.');
    }
};
export const RedisService = {
    get,
}