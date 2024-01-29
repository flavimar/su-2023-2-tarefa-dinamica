import { Api } from '../axios-config';


export interface IListagemSala  {
    "id": number,
    "name": string,
    "description"?: string,
}

export interface IDetalheSala {
    "id": number,
    "name": string,
    "description"?: string,
}



const getAll = async (): Promise<IListagemSala[] | Error> => {
    try {
        const urlRelativa = `/classrooms`;

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

const getById = async (id: number): Promise<IDetalheSala | Error> => {
    try {
        const { data } = await Api.get(`/classrooms/${id}`);

        if (data) {
            return data;
        }

        return new Error('Erro ao consultar o registro.');
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || 'Erro ao consultar o registro.');
    }
};

const create = async (dados: Omit<IDetalheSala, 'id'>): Promise<number | Error> => {
    try {
        const { data } = await Api.post<number>('/classrooms', dados);

        if (data) {
            return data;
        }

        return new Error('Erro ao criar o registro.');
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || 'Erro ao criar o registro.');
    }
};

const updateById = async (id: number, dados: IDetalheSala): Promise<void | Error> => {
    try {
        await Api.put(`/classrooms/${id}`, dados);
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || 'Erro ao atualizar o registro.');
    }
};

const deleteById = async (id: number): Promise<void | Error> => {
    try {
        await Api.delete(`/classrooms/${id}`);
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || 'Erro ao apagar o registro.');
    }
};


export const SalasService = {
    getAll,
    create,
    getById,
    updateById,
    deleteById,
};