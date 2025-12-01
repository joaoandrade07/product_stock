export const pagination = async (page:number=1, limit:number=10, fetchDataFunction:any, total:number) => {
    if (page < 1) {
        throw new Error("A página deve ser maior ou igual a 1.");
    }

    // 1. Calcula o 'skip' (deslocamento)
    // Ex: page 1 (limit 10) -> skip = 0
    // Ex: page 2 (limit 10) -> skip = 10
    const skip = (page - 1) * limit;
    
    // O 'take' é simplesmente o 'limit'
    const take = limit;

    // 2. Chama a função de busca (a função que contém a lógica do Prisma)
    // e passa o skip e take calculados para ela.
    const data = await fetchDataFunction(skip, limit);

    const totalPages:number = Math.ceil(total/limit);

    // 3. Retorna os dados junto com o número da página
    return {
        page: page,
        limit:limit,
        total:total,
        totalPages: totalPages,
        data:data
    };
}