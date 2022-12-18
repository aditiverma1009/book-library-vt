const formatData = (data) => {
    const authorBasedData = {}
    data.forEach(element => {
        if(Object.keys(authorBasedData).indexOf(element.Author)!== -1) {
            authorBasedData[element.Author].push(element)
        } else {
            authorBasedData[element.Author] = []
            authorBasedData[element.Author].push(element)
        }
    });
    console.log('final', authorBasedData)
    return authorBasedData
}

const mergeData = (books, rating) => {
    return books.map((eachBook, index)=> {
        return {...eachBook, ...rating[index]}
    })
}

module.exports =  {formatData, mergeData}