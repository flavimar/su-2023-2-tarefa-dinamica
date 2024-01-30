import { Api } from '../axios-config';


export interface IListagemTarefa  {
    "id": number,
    "name": string,
    "description"?: string,
    "weight"?: number,
    "type": string
}

export interface IDetalheTarefa {
    "id": number,
    "name": string,
    "description"?: string,
    "weight"?: number,
    "type": string
}
export interface IRespondeAtividadeTarefa {
    activity: string
}



const getAll = async (): Promise<IListagemTarefa[] | Error> => {
    try {
        const urlRelativa = `/task`;

        const { data, headers } = await Api.get(urlRelativa);

        if (data) {
            return data
        }

        return new Error('Erro ao listar os registros.');
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || 'Erro ao listar os registros.');
    }
};

const getById = async (id: number): Promise<IDetalheTarefa | Error> => {
    try {
        const { data } = await Api.get(`/task/${id}`);

        if (data) {
            return data;
        }

        return new Error('Erro ao consultar o registro.');
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || 'Erro ao consultar o registro.');
    }
};

const create = async (dados: Omit<IDetalheTarefa, 'id'>): Promise<number | Error> => {
    try {
        const { data } = await Api.post<number>('/task', dados);

        if (data) {
            return data;
        }

        return new Error('Erro ao criar o registro.');
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || 'Erro ao criar o registro.');
    }
};

const updateById = async (id: number, dados: IDetalheTarefa): Promise<void | Error> => {
    try {
        await Api.put(`/task/${id}`, dados);
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || 'Erro ao atualizar o registro.');
    }
};
const respondActivityById = async (id: number, dados: IRespondeAtividadeTarefa): Promise<void | Error> => {
    try {
        await Api.put(`/task/${id}/respond`, dados);
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || 'Erro ao atualizar o registro.');
    }
};

const deleteById = async (id: number): Promise<void | Error> => {
    try {
        await Api.delete(`/task/${id}`);
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || 'Erro ao apagar o registro.');
    }
};


export const TarefasService = {
    getAll,
    create,
    getById,
    updateById,
    deleteById,
};