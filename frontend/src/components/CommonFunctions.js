export const getBookTypeName = (typeId, bookTypes) => {
    const type = bookTypes?.find(type => type.id === typeId);
    return type ? type.type : "--";
};

export const getGenreName = (genreId, genres) => {
    const genre = genres?.find(genre => genre.id === genreId);
    return genre ? genre.name : "--";
};